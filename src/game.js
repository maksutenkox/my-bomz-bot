export const ACTIONS = [
  { id: "bins", tab: "Еда", title: "Проверить контейнеры", detail: "Еда и случайная находка", effects: { food: 14, health: -5, joy: -3, energy: -8, time: 3 }, event: "Ты нашёл съестное и пару полезных мелочей." },
  { id: "canteen", tab: "Еда", title: "Социальная столовая", detail: "Бесплатный обед", effects: { food: 26, joy: 2, energy: -3, time: 4 }, event: "Горячий обед помог собраться с силами." },
  { id: "shawarma", tab: "Еда", title: "Купить шаурму", detail: "Цена: 12 ₽", cost: 12, effects: { food: 24, health: -2, joy: 5, time: 1 }, event: "Вкусно, быстро и немного тяжеловато для желудка." },
  { id: "restaurant", tab: "Еда", title: "Поесть в кафе", detail: "Цена: 55 ₽", cost: 55, effects: { food: 35, health: 4, joy: 12, time: 2 }, event: "Нормальная еда и час спокойствия." },
  { id: "herbs", tab: "Здоровье", title: "Найти лечебные травы", detail: "Небольшая помощь здоровью", effects: { health: 8, food: -4, energy: -5, time: 3 }, event: "Ты потратил время, но нашёл способ немного подлечиться." },
  { id: "clinic", tab: "Здоровье", title: "Посетить клинику", detail: "Цена: 35 ₽", cost: 35, requires: ["passport"], effects: { health: 28, joy: 2, time: 4 }, event: "Осмотр и лечение вернули силы." },
  { id: "park", tab: "Радость", title: "Прогуляться в парке", detail: "Проветрить голову", effects: { joy: 12, food: -5, energy: -3, time: 2 }, event: "После прогулки стало легче думать о будущем." },
  { id: "cinema", tab: "Радость", title: "Сходить в кино", detail: "Цена: 25 ₽", cost: 25, effects: { joy: 24, food: -4, time: 3 }, event: "На несколько часов город перестал давить." },
  { id: "sleep", tab: "Радость", title: "Поспать", detail: "Восстановить энергию", effects: { energy: 38, food: -10, joy: 2, time: 8 }, event: "Новый день начался." },
  { id: "bottles", tab: "Работа", title: "Сдать бутылки", detail: "Небольшой честный заработок", effects: { money: 14, workShifts: 1, food: -4, health: -2, energy: -12, time: 4 }, event: "Ты собрал и сдал бутылки." },
  { id: "cars", tab: "Работа", title: "Помыть машины", detail: "Подработка на улице", effects: { money: 24, workShifts: 1, food: -6, energy: -17, joy: -3, time: 5 }, event: "К концу смены руки устали, зато появились деньги." },
  { id: "guard", tab: "Работа", title: "Смена охранником", detail: "Паспорт, аттестат, жильё", requires: ["passport", "diploma", "apartment"], effects: { money: 68, food: -8, energy: -22, joy: -4, time: 8 }, event: "Спокойная смена. Зарплата получена." },
  { id: "study", tab: "Развитие", title: "Вечерние занятия", detail: "Учёба 0/3", effects: { study: 1, food: -5, energy: -10, joy: -2, time: 4 }, event: "Один шаг к аттестату." },
  { id: "passport", tab: "Развитие", title: "Восстановить паспорт", detail: "Цена: 35 ₽", cost: 35, once: true, gives: "passport", effects: { joy: 8, time: 6 }, event: "Паспорт готов. Официальные двери начали открываться." },
  { id: "sneakers", tab: "Магазин", title: "Купить кроссовки", detail: "Цена: 45 ₽", cost: 45, once: true, gives: "sneakers", effects: { joy: 8, health: 3, time: 1 }, event: "Новые кроссовки сразу заметны на герое." },
  { id: "jacket", tab: "Магазин", title: "Купить куртку", detail: "Цена: 65 ₽", cost: 65, once: true, gives: "jacket", effects: { health: 6, joy: 8, time: 1 }, event: "В куртке теплее, а вид увереннее." },
  { id: "bike", tab: "Магазин", title: "Купить велосипед", detail: "Цена: 120 ₽", cost: 120, once: true, gives: "bike", effects: { joy: 12, time: 1 }, event: "Велосипед теперь стоит рядом с тобой." },
  { id: "apartment", tab: "Жильё", title: "Снять квартиру", detail: "Паспорт, 4 подработки, 120 ₽. Аренда 20 ₽ в день", cost: 120, requires: ["passport"], minShifts: 4, once: true, gives: "apartment", effects: { joy: 18, health: 8, time: 5 }, event: "Наконец появились собственные четыре стены." },
  { id: "save", tab: "Финансы", title: "Купить долю фонда", detail: "Цена: 100 ₽. Доход раз в день", cost: 100, requires: ["passport"], effects: { investments: 1, joy: 2, time: 2 }, event: "Ты вложил деньги. Теперь капитал может работать." },
  { id: "campaign", tab: "Политика", title: "Помочь району", detail: "Жильё, аттестат, репутация", requires: ["apartment", "diploma"], effects: { reputation: 8, joy: 5, energy: -10, food: -5, time: 5 }, event: "Жители района начали узнавать тебя." },
  { id: "election", tab: "Политика", title: "Баллотироваться в совет", detail: "Репутация 40, 250 ₽", cost: 250, requires: ["passport", "apartment", "diploma"], minReputation: 40, once: true, gives: "council", effects: { joy: 20, time: 8 }, event: "Ты выиграл местные выборы. Это начало политической карьеры." },
  { id: "street_trade", tab: "Теневая сторона", title: "Нелегальная торговля", detail: "Быстрые деньги, растёт внимание", effects: { money: 42, heat: 12, reputation: -4, joy: -3, energy: -9, time: 3 }, event: "Сделка состоялась. Теперь за тобой внимательнее следят." },
  { id: "warehouse", tab: "Теневая сторона", title: "Арендовать ангар", detail: "Цена: 400 ₽, связи и паспорт", cost: 400, requires: ["passport"], minHeat: 24, once: true, gives: "warehouse", effects: { joy: 8, heat: 12, time: 6 }, event: "Ангар открыл следующий уровень теневого бизнеса." },
  { id: "crew", tab: "Теневая сторона", title: "Нанять команду", detail: "Цена: 160 ₽, нужен ангар", cost: 160, requires: ["warehouse"], once: true, gives: "crew", effects: { heat: 16, joy: 6, time: 4 }, event: "Теперь операции приносят больше, но требуют расходов." }
];

export function newGame(name = "Герой") {
  return { name, day: 1, hour: 8, age: 25, food: 55, health: 75, joy: 55, energy: 65, money: 0, reputation: 0, heat: 0, study: 0, workShifts: 0, investments: 0, owned: [], log: ["День 1. Всё начинается с одного решения."], ended: false };
}

const clamp = (n) => Math.max(0, Math.min(100, n));
export function available(action, state) {
  if (state.ended) return "История закончилась. Начни новую игру.";
  if (action.once && state.owned.includes(action.gives)) return "Уже получено";
  for (const item of action.requires ?? []) if (!state.owned.includes(item)) return `Нужно: ${label(item)}`;
  if (state.money < (action.cost ?? 0)) return `Нужно ещё ${(action.cost ?? 0) - state.money} ₽`;
  if (state.reputation < (action.minReputation ?? 0)) return `Нужна репутация ${action.minReputation}`;
  if ((state.workShifts ?? 0) < (action.minShifts ?? 0)) return `Нужны подработки: ${state.workShifts ?? 0}/${action.minShifts}`;
  if (state.heat < (action.minHeat ?? 0)) return `Нужны теневые связи ${action.minHeat}`;
  if (state.energy < 8 && action.id !== "sleep") return "Сначала отдохни";
  return null;
}
function label(id) { return ({ passport: "паспорт", diploma: "аттестат", apartment: "квартира", warehouse: "ангар" })[id] ?? id; }

export function play(state, id) {
  const action = ACTIONS.find((a) => a.id === id);
  if (!action) throw new Error("UNKNOWN_ACTION");
  const reason = available(action, state);
  if (reason) throw new Error(reason);
  const next = structuredClone(state);
  next.money -= action.cost ?? 0;
  for (const [key, delta] of Object.entries(action.effects)) {
    if (key === "time") continue;
    next[key] = (next[key] ?? 0) + delta;
  }
  if (action.gives) next.owned.push(action.gives);
  if (next.study >= 3 && !next.owned.includes("diploma")) {
    next.owned.push("diploma");
    next.log.unshift("Аттестат получен. Теперь доступна квалифицированная работа.");
  }
  next.hour += action.effects.time ?? 1;
  while (next.hour >= 24) {
    next.hour -= 24;
    next.day += 1;
    if ((next.day - 1) % 365 === 0) next.age += 1;
    next.food -= 7;
    next.joy -= 3;
    next.health += next.owned.includes("apartment") ? 2 : -2;
    if (next.joy <= 15) next.energy -= 5;
    next.money += next.investments * 3 + (next.owned.includes("crew") ? 32 : 0);
    if (next.owned.includes("apartment")) next.money -= 20;
    if (next.owned.includes("crew")) next.money -= 9;
    next.heat = Math.max(0, next.heat - 2);
    if (next.food <= 0) next.health -= 10;
    if (next.money < 0) { next.money = 0; next.joy -= 10; }
  }
  for (const key of ["food", "health", "joy", "energy", "reputation", "heat"]) next[key] = clamp(next[key]);
  next.money = Math.max(0, next.money);
  if (next.heat >= 85) { next.money = Math.floor(next.money * .55); next.heat = 30; next.joy = clamp(next.joy - 25); next.log.unshift("Проверка сорвала дела и забрала часть денег."); }
  if (next.health <= 0) { next.ended = true; next.log.unshift("Сил больше нет. Эта история завершилась."); }
  next.log.unshift(action.event);
  next.log = next.log.slice(0, 8);
  return next;
}
