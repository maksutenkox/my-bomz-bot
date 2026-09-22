const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
const initData = tg?.initData ?? "";
const $ = (id) => document.getElementById(id);
const tabArt = { Еда: "canteen", Здоровье: "clinic", Радость: "park", Работа: "cars", Развитие: "study", Магазин: "sneakers", Жильё: "apartment", Финансы: "save", Политика: "campaign", "Теневая сторона": "street_trade" };
const colors = { food: "#eeb670", health: "#82bd98", joy: "#e9a5a7", energy: "#8eb5d5" };
const names = { food: "Сытость", health: "Здоровье", joy: "Радость", energy: "Энергия" };
const effectNames = { food: "еда", health: "здоровье", joy: "радость", energy: "энергия", money: "₽", reputation: "репутация", heat: "внимание", study: "учёба", investments: "инвестиции" };
const effects = (action) => Object.entries(action.effects).filter(([key]) => key !== "workShifts").map(([key, value]) => key === "time" ? `${value} ч` : `${value > 0 ? "+" : ""}${value} ${effectNames[key] ?? key}`).join(" · ");
let current = null;
let activeTab = "Еда";
let busy = false;
const preview = !initData;
document.body.classList.toggle("preview", preview);

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
  $("sceneBg").src = s.owned.includes("apartment") ? "/assets/apartment-bg.webp" : "/assets/street-bg.webp";
  const outfit = s.owned.includes("sneakers") ? (s.owned.includes("jacket") ? "both" : "sneakers") : (s.owned.includes("jacket") ? "jacket" : "base");
  $("avatar").src = `/assets/hero-${outfit}.webp`;
  $("sceneLabel").textContent = s.owned.includes("apartment") ? "Своя квартира • новый этап" : "Улица • новый шанс";
  $("pathName").textContent = s.owned.includes("council") ? "Голос района" : s.owned.includes("crew") ? "Теневой хозяин" : s.owned.includes("apartment") ? "Новая жизнь" : "Начало истории";
  $("reputation").textContent = `Репутация ${s.reputation}`;
  $("event").textContent = s.log[0];
  const tabs = [...new Set(data.actions.map((a) => a.tab))];
  $("tabs").innerHTML = tabs.map((tab) => `<button class="tab ${activeTab === tab ? "active" : ""}" data-tab="${tab}"><img src="/assets/${tabArt[tab]}.webp" alt="" />${tab}</button>`).join("");
  $("actions").innerHTML = data.actions.filter((a) => a.tab === activeTab).map((a) => `<button class="action" data-action="${a.id}" ${a.unavailable || busy || preview ? "disabled" : ""}><span class="action-icon"><img src="/assets/${a.id}.webp" alt="" loading="lazy" /></span><span class="action-copy"><span class="action-title">${a.title}</span><span class="action-detail">${a.unavailable ?? a.detail}</span><span class="action-effects">${effects(a)}</span></span><span class="action-arrow">→</span></button>`).join("");
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
  let failure = null;
  try { current = await api("/api/action", { method: "POST", body: JSON.stringify({ id }) }); tg?.HapticFeedback?.impactOccurred("light"); }
  catch (error) { failure = error.message; }
  finally { busy = false; render(current); if (failure) $("event").textContent = failure; }
});
$("menuButton").onclick = () => $("info").showModal();
$("closeInfo").onclick = () => $("info").close();
$("restartButton").onclick = async () => {
  if (preview) { window.location.href = "https://t.me/Mybomzbot"; return; }
  if (!confirm("Начать новую историю? Текущий прогресс исчезнет.")) return;
  try { activeTab = "Еда"; render(await api("/api/restart", { method: "POST" })); }
  catch (error) { $("event").textContent = error.message; }
};

if (preview) $("restartButton").textContent = "Открыть бот";
api(preview ? "/api/preview" : "/api/state").then((data) => { render(data); if (preview) $("event").textContent = "Это просмотр. Играй через @Mybomzbot в Telegram."; }).catch((error) => { $("event").textContent = error.message; });
