const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
const initData = tg?.initData ?? "";
const $ = (id) => document.getElementById(id);
const tabArt = { Еда: "canteen", Здоровье: "clinic", Радость: "park", Работа: "cars", Развитие: "study", Магазин: "sneakers", Жильё: "apartment", Финансы: "save", Политика: "campaign", "Теневая сторона": "street_trade" };
const sections = {
  home: { label: "Главная", icon: "nav-home" },
  care: { label: "Забота", icon: "nav-care", eyebrow: "ПОВСЕДНЕВНАЯ ЖИЗНЬ", description: "Еда, здоровье и настроение", tabs: ["Еда", "Здоровье", "Радость"] },
  work: { label: "Заработок", icon: "nav-work", eyebrow: "ШАГ ЗА ШАГОМ", description: "Подработка, документы и учёба", tabs: ["Работа", "Развитие"] },
  shop: { label: "Магазин", icon: "nav-shop", eyebrow: "НОВЫЕ ВОЗМОЖНОСТИ", description: "Вещи, жильё и вложения", tabs: ["Магазин", "Жильё", "Финансы"] },
  path: { label: "Путь", icon: "nav-path", eyebrow: "КЕМ ТЫ СТАНЕШЬ", description: "Разные дороги — разные последствия", tabs: ["Политика", "Теневая сторона"] }
};
const colors = { food: "#eeb670", health: "#82bd98", joy: "#e9a5a7", energy: "#8eb5d5" };
const names = { food: "Сытость", health: "Здоровье", joy: "Радость", energy: "Энергия" };
const effectNames = { food: "еда", health: "здоровье", joy: "радость", energy: "энергия", money: "₴", reputation: "репутация", heat: "внимание", study: "учёба", investments: "инвестиции" };
const moneyFormat = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 });
const effects = (action) => Object.entries(action.effects).filter(([key]) => key !== "workShifts").map(([key, value]) => key === "time" ? `${value} ч` : `${value > 0 ? "+" : ""}${value} ${effectNames[key] ?? key}`).join(" · ");
let current = null;
let activeSection = "home";
const activeTabs = { care: "Еда", work: "Работа", shop: "Магазин", path: "Политика" };
let busy = false;
const preview = !initData;
document.body.classList.toggle("preview", preview);

const THEME_KEY = "my-bomz-theme";
const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");

function preferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  if (tg?.colorScheme === "dark" || tg?.colorScheme === "light") return tg.colorScheme;
  return themeMedia.matches ? "dark" : "light";
}

function applyTheme(theme, persist = false) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  const dark = next === "dark";
  const button = $("themeButton");
  const icon = $("themeIcon");
  const themeLabel = $("themeLabel");
  const label = dark ? "Включить светлую тему" : "Включить тёмную тему";
  if (button) {
    button.setAttribute("aria-label", label);
    button.title = label;
    button.setAttribute("aria-pressed", String(dark));
  }
  if (icon) icon.textContent = dark ? "☀" : "☾";
  if (themeLabel) themeLabel.textContent = "Тема";
  $("themeColor")?.setAttribute("content", dark ? "#111817" : "#f4f1e9");
  try {
    tg?.setHeaderColor?.(dark ? "#111817" : "#f4f1e9");
    tg?.setBackgroundColor?.(dark ? "#111817" : "#f4f1e9");
    tg?.setBottomBarColor?.(dark ? "#151f1d" : "#fffaf4");
  } catch {}
  if (persist) localStorage.setItem(THEME_KEY, next);
}

applyTheme(preferredTheme());

themeMedia.addEventListener?.("change", () => {
  if (!localStorage.getItem(THEME_KEY)) applyTheme(preferredTheme());
});
tg?.onEvent?.("themeChanged", () => {
  if (!localStorage.getItem(THEME_KEY)) applyTheme(preferredTheme());
});

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
  $("money").textContent = `${moneyFormat.format(s.money)} ₴`;
  $("bars").innerHTML = Object.keys(names).map((key) => `<div><div class="bar-line"><span>${names[key]}</span><span>${s[key]}%</span></div><div class="track"><div class="fill" style="width:${s[key]}%;background:${colors[key]}"></div></div></div>`).join("");
  const housing = s.owned.includes("apartment") ? "apartment" : s.owned.includes("room") ? "room" : s.owned.includes("box") ? "box" : "street";
  const housingNames = { street: "Улица", box: "Укрытие", room: "Комната", apartment: "Квартира" };
  $("scene").classList.toggle("has-apartment", housing === "apartment");
  $("scene").classList.toggle("has-bike", s.owned.includes("bike"));
  $("sceneBg").src = `/assets/${housing === "street" ? "street-bg" : `${housing}-bg`}.webp`;
  const outfit = s.owned.includes("sneakers") ? (s.owned.includes("jacket") ? "both" : "sneakers") : (s.owned.includes("jacket") ? "jacket" : "base");
  $("avatar").src = `/assets/hero-${outfit}.webp`;
  $("sceneLabel").textContent = { street: "Улица • новый шанс", box: "Укрытие • первый шаг", room: "Комната • свой ключ", apartment: "Квартира • новый этап" }[housing];
  $("pathName").textContent = s.owned.includes("council") ? "Голос района" : s.owned.includes("crew") ? "Теневой хозяин" : housing === "apartment" ? "Новая жизнь" : housing === "room" ? "Твоя комната" : housing === "box" ? "Первое укрытие" : "Начало истории";
  $("reputation").textContent = `Репутация ${s.reputation}`;
  $("housingTitle").textContent = housingNames[housing];
  const housingOrder = ["street", "box", "room", "apartment"];
  $("housingSteps").innerHTML = housingOrder.map((tier, index) => `<span class="housing-step ${index <= housingOrder.indexOf(housing) ? "reached" : ""}" title="${housingNames[tier]}">${housingNames[tier]}</span>`).join("");
  const nextHousing = { street: "box", box: "room", room: "apartment" }[housing];
  const nextAction = data.actions.find((a) => a.id === nextHousing);
  $("housingNext").textContent = nextAction ? `Следующий шаг: ${nextAction.title.toLowerCase()}. ${nextAction.unavailable ?? nextAction.detail}` : "Последний этап: отдельная квартира. Следи за арендой.";
  const rent = { street: 0, box: 0, room: 80, apartment: 200 }[housing];
  $("housingRent").textContent = rent ? `Аренда: ${rent} ₴ в день${s.missedRent ? ` · пропусков оплаты: ${s.missedRent}/2` : ""}` : "Аренды нет";
  $("housingRent").classList.toggle("warning", Boolean(s.missedRent));
  $("event").textContent = s.log[0];
  $("sectionEvent").textContent = s.log[0];
  $("bottomNav").innerHTML = Object.entries(sections).map(([key, section]) => `<button class="bottom-nav-item ${activeSection === key ? "active" : ""}" data-section="${key}" aria-current="${activeSection === key ? "page" : "false"}"><img src="/assets/${section.icon}.webp" alt="" /><span>${section.label}</span></button>`).join("");
  $("homePanel").hidden = activeSection !== "home";
  $("actionPanel").hidden = activeSection === "home";
  const actionCard = (a) => `<button class="action" data-action="${a.id}" ${a.unavailable || busy || preview ? "disabled" : ""}><span class="action-icon"><img src="/assets/${a.art ?? a.id}.webp" alt="" loading="lazy" /></span><span class="action-copy"><span class="action-title">${a.title}</span><span class="action-detail">${a.detail}</span>${a.unavailable ? `<span class="action-lock">${a.unavailable}</span>` : ""}<span class="action-effects">${effects(a)}</span></span><span class="action-arrow">→</span></button>`;
  $("homeActions").innerHTML = ["canteen", "bottles", "sleep"].map((id) => data.actions.find((a) => a.id === id)).filter(Boolean).map(actionCard).join("");
  if (activeSection !== "home") {
    const section = sections[activeSection];
    $("sectionEyebrow").textContent = section.eyebrow;
    $("sectionTitle").textContent = section.label;
    $("sectionDescription").textContent = section.description;
    $("tabs").innerHTML = section.tabs.map((tab) => `<button class="tab ${activeTabs[activeSection] === tab ? "active" : ""}" data-tab="${tab}" aria-current="${activeTabs[activeSection] === tab ? "page" : "false"}"><img src="/assets/${tabArt[tab]}.webp" alt="" />${tab}</button>`).join("");
    $("actions").innerHTML = data.actions.filter((a) => a.tab === activeTabs[activeSection]).map(actionCard).join("");
  }
}

$("bottomNav").addEventListener("click", (event) => {
  const section = event.target.closest("[data-section]")?.dataset.section;
  if (section && sections[section] && current) { activeSection = section; render(current); window.scrollTo(0, 0); }
});
$("tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]")?.dataset.tab;
  if (tab && sections[activeSection]?.tabs?.includes(tab)) { activeTabs[activeSection] = tab; render(current); }
});
async function handleAction(event) {
  const id = event.target.closest("[data-action]")?.dataset.action;
  if (!id || busy) return;
  busy = true;
  render(current);
  let failure = null;
  try { current = await api("/api/action", { method: "POST", body: JSON.stringify({ id }) }); tg?.HapticFeedback?.impactOccurred("light"); }
  catch (error) { failure = error.message; }
  finally { busy = false; render(current); if (failure) { $("event").textContent = failure; $("sectionEvent").textContent = failure; } }
}
$("actions").addEventListener("click", handleAction);
$("homeActions").addEventListener("click", handleAction);
$("themeButton").onclick = () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(currentTheme === "dark" ? "light" : "dark", true);
  tg?.HapticFeedback?.selectionChanged?.();
};
$("menuButton").onclick = () => $("info").showModal();
$("closeInfo").onclick = () => $("info").close();
$("restartButton").onclick = async () => {
  if (preview) { window.location.href = "https://t.me/Mybomzbot"; return; }
  if (!confirm("Начать новую историю? Текущий прогресс исчезнет.")) return;
  try { activeSection = "home"; activeTabs.care = "Еда"; render(await api("/api/restart", { method: "POST" })); }
  catch (error) { $("event").textContent = error.message; }
};

if (preview) $("restartButton").textContent = "Открыть бот";
api(preview ? "/api/preview" : "/api/state").then((data) => { render(data); if (preview) $("event").textContent = "Это просмотр. Играй через @Mybomzbot в Telegram."; }).catch((error) => { $("event").textContent = error.message; });
