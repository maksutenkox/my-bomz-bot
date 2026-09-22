const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
const initData = tg?.initData ?? "";
const $ = (id) => document.getElementById(id);
const icons = { Еда: "🍲", Здоровье: "✚", Радость: "✦", Работа: "⚒", Развитие: "📚", Магазин: "🛍", Жильё: "⌂", Финансы: "◈", Политика: "★", "Теневая сторона": "◆" };
const colors = { food: "#eeb670", health: "#82bd98", joy: "#e9a5a7", energy: "#8eb5d5" };
const names = { food: "Сытость", health: "Здоровье", joy: "Радость", energy: "Энергия" };
let current = null;
let activeTab = "Еда";
let busy = false;

async function api(path, options = {}) {
  const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", "X-Telegram-Init-Data": initData, ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Ошибка соединения");
  return data;
}

function render(data) {
  current = data;
  const s = data.state;
  $("day").textContent = `День ${s.day}`;
  $("age").textContent = `${s.age} лет`;
  $("time").textContent = `${String(s.hour).padStart(2, "0")}:00`;
  $("money").textContent = `${s.money} ₽`;
  $("bars").innerHTML = Object.keys(names).map((key) => `<div><div class="bar-line"><span>${names[key]}</span><span>${s[key]}%</span></div><div class="track"><div class="fill" style="width:${s[key]}%;background:${colors[key]}"></div></div></div>`).join("");
  $("scene").classList.toggle("has-apartment", s.owned.includes("apartment"));
  $("scene").classList.toggle("has-bike", s.owned.includes("bike"));
  $("avatar").classList.toggle("has-sneakers", s.owned.includes("sneakers"));
  $("avatar").classList.toggle("has-jacket", s.owned.includes("jacket"));
  $("sceneLabel").textContent = s.owned.includes("apartment") ? "Своя квартира • новый этап" : "Улица • новый шанс";
  $("pathName").textContent = s.owned.includes("council") ? "Голос района" : s.owned.includes("crew") ? "Теневой хозяин" : s.owned.includes("apartment") ? "Новая жизнь" : "Начало истории";
  $("reputation").textContent = `Репутация ${s.reputation}`;
  $("event").textContent = s.log[0];
  const tabs = [...new Set(data.actions.map((a) => a.tab))];
  $("tabs").innerHTML = tabs.map((tab) => `<button class="tab ${activeTab === tab ? "active" : ""}" data-tab="${tab}">${icons[tab]} ${tab}</button>`).join("");
  $("actions").innerHTML = data.actions.filter((a) => a.tab === activeTab).map((a) => `<button class="action" data-action="${a.id}" ${a.unavailable || busy ? "disabled" : ""}><span class="action-icon">${icons[a.tab]}</span><span class="action-copy"><span class="action-title">${a.title}</span><span class="action-detail">${a.unavailable ?? a.detail}</span></span><span class="action-arrow">→</span></button>`).join("");
}

$("tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]")?.dataset.tab;
  if (tab) { activeTab = tab; render(current); }
});
$("actions").addEventListener("click", async (event) => {
  const id = event.target.closest("[data-action]")?.dataset.action;
  if (!id || busy) return;
  busy = true;
  render(current);
  try { render(await api("/api/action", { method: "POST", body: JSON.stringify({ id }) })); tg?.HapticFeedback?.impactOccurred("light"); }
  catch (error) { $("event").textContent = error.message; }
  finally { busy = false; render(current); }
});
$("menuButton").onclick = () => $("info").showModal();
$("closeInfo").onclick = () => $("info").close();
$("restartButton").onclick = async () => {
  if (!confirm("Начать новую историю? Текущий прогресс исчезнет.")) return;
  try { activeTab = "Еда"; render(await api("/api/restart", { method: "POST" })); }
  catch (error) { $("event").textContent = error.message; }
};

if (!initData) {
  $("event").textContent = "Открой игру через кнопку в Telegram-боте.";
  $("actions").innerHTML = "<p>Игровой прогресс привязан к Telegram.</p>";
} else {
  api("/api/state").then(render).catch((error) => { $("event").textContent = error.message; });
}
