import { actionsFor, newGame, normalizeState, play } from "./game.js";

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
const encoder = new TextEncoder();

async function telegramUser(request, token) {
  const raw = request.headers.get("X-Telegram-Init-Data") ?? "";
  if (!raw || raw.length > 4096) throw new Error("INVALID_AUTH");
  const p = new URLSearchParams(raw);
  const hash = p.get("hash");
  const authDate = Number(p.get("auth_date"));
  if (!hash || !authDate || Math.abs(Date.now() / 1000 - authDate) > 86400) throw new Error("INVALID_AUTH");
  p.delete("hash");
  const data = [...p.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join("\n");
  const seed = await crypto.subtle.importKey("raw", encoder.encode("WebAppData"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const secret = await crypto.subtle.sign("HMAC", seed, encoder.encode(token));
  const key = await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(data)));
  const expected = Uint8Array.from(hash.match(/.{2}/g) ?? [], (x) => parseInt(x, 16));
  if (!constantTimeEqual(expected, signature)) throw new Error("INVALID_AUTH");
  const user = JSON.parse(p.get("user") ?? "null");
  if (!Number.isSafeInteger(user?.id)) throw new Error("INVALID_AUTH");
  return user;
}

async function getPlayer(env, user) {
  let row = await env.DB.prepare("SELECT state_json, version FROM players WHERE telegram_id = ?").bind(user.id).first();
  if (!row) {
    const state = newGame(user.first_name ?? "Герой");
    await env.DB.prepare("INSERT OR IGNORE INTO players (telegram_id, name, state_json) VALUES (?, ?, ?)").bind(user.id, state.name, JSON.stringify(state)).run();
    row = await env.DB.prepare("SELECT state_json, version FROM players WHERE telegram_id = ?").bind(user.id).first();
  }
  return { state: normalizeState(JSON.parse(row.state_json)), version: row.version };
}

async function sendTelegram(token, chatId, url) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text: "🏙 My bomz bot\nНачни свою историю в городе. Каждое решение меняет доступные пути.", reply_markup: { inline_keyboard: [[{ text: "Играть", web_app: { url } }]] } }) });
  if (!response.ok) console.error(JSON.stringify({ event: "telegram_send_failed", status: response.status }));
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/api/health") return json({ ok: true, service: "my-bomz-bot" });
      if (url.pathname === "/api/preview" && request.method === "GET") {
        const state = newGame();
        return json({ state, actions: actionsFor(state) });
      }
      if (url.pathname === "/telegram/webhook" && request.method === "POST") {
        const supplied = encoder.encode(request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "");
        const expected = encoder.encode(env.TELEGRAM_WEBHOOK_SECRET);
        if (!constantTimeEqual(supplied, expected)) return json({ error: "UNAUTHORIZED" }, 401);
        const update = await request.json();
        if (update.message?.text?.startsWith("/start") || update.message?.text?.startsWith("/play")) ctx.waitUntil(sendTelegram(env.TELEGRAM_BOT_TOKEN, update.message.chat.id, url.origin));
        return json({ ok: true });
      }
      if (url.pathname.startsWith("/api/")) {
        const user = await telegramUser(request, env.TELEGRAM_BOT_TOKEN);
        const player = await getPlayer(env, user);
        if (url.pathname === "/api/state" && request.method === "GET") return json({ state: player.state, actions: actionsFor(player.state) });
        if (url.pathname === "/api/action" && request.method === "POST") {
          const body = await request.json();
          if (typeof body?.id !== "string") return json({ error: "INVALID_ACTION" }, 400);
          let next;
          try { next = play(player.state, body.id); } catch (error) { return json({ error: error.message }, 400); }
          const result = await env.DB.prepare("UPDATE players SET state_json = ?, version = version + 1, updated_at = unixepoch() WHERE telegram_id = ? AND version = ?").bind(JSON.stringify(next), user.id, player.version).run();
          if (result.meta.changes !== 1) return json({ error: "STATE_CHANGED" }, 409);
          return json({ state: next, actions: actionsFor(next) });
        }
        if (url.pathname === "/api/restart" && request.method === "POST") {
          const next = newGame(user.first_name ?? "Герой");
          await env.DB.prepare("UPDATE players SET state_json = ?, version = version + 1 WHERE telegram_id = ?").bind(JSON.stringify(next), user.id).run();
          return json({ state: next, actions: actionsFor(next) });
        }
        return json({ error: "NOT_FOUND" }, 404);
      }
      const asset = await env.ASSETS.fetch(request);
      if (url.pathname === "/" || url.pathname === "/index.html") {
        const headers = new Headers(asset.headers);
        headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.set("X-Game-Version", "0.5.0");
        return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers });
      }
      return asset;
    } catch (error) {
      const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
      if (message === "INVALID_AUTH") return json({ error: message }, 401);
      console.error(JSON.stringify({ event: "request_failed", path: url.pathname, message }));
      return json({ error: "INTERNAL_ERROR" }, 500);
    }
  }
};

function constantTimeEqual(left, right) {
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  return difference === 0;
}
