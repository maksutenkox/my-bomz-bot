export const ACTIONS = [
  { id: "bins", tab: "Еда", title: "Проверить контейнеры", detail: "Еда и случайная находка", effects: { food: 14, health: -5, joy: -3, energy: -8, time: 3 }, event: "Ты нашёл съестное и пару полезных мелочей." },
  { id: "canteen", tab: "Еда", title: "Социальная столовая", detail: "Бесплатный обед · раз в день", daily: true, effects: { food: 26, joy: 2, energy: -3, time: 4 }, event: "Горячий обед помог собраться с силами." },
  { id: "social_breakfast", tab: "Еда", title: "Социальный завтрак", detail: "Скромно, но бесплатно · раз в день", daily: true, effects: { food: 14, joy: 1, energy: 2, time: 3 }, event: "Скромный завтрак помог начать день без пустого желудка." },
  { id: "tea", tab: "Еда", title: "Горячий чай", detail: "Цена: 35 ₴ · немного согреться", cost: 35, effects: { food: 4, health: 2, joy: 3, energy: 4, time: 1 }, event: "Горячий чай помог согреться и немного прийти в себя." },
  { id: "coffee", tab: "Еда", title: "Кофе на вынос", detail: "Цена: 55 ₴ · бодрит, но не насыщает", cost: 55, effects: { food: 2, joy: 4, energy: 8, time: 1 }, event: "Кофе взбодрил, и мир стал чуть легче переносить." },
  { id: "bun", tab: "Еда", title: "Купить булочку", detail: "Цена: 30 ₴ · быстрый перекус", cost: 30, effects: { food: 8, joy: 2, time: 1 }, event: "Небольшой перекус помог не думать о голоде." },
  { id: "apple", tab: "Еда", title: "Купить яблоко", detail: "Цена: 25 ₴ · дёшево и полезно", cost: 25, effects: { food: 6, health: 3, time: 1 }, event: "Простая еда, зато полезнее случайного фастфуда." },
  { id: "banana", tab: "Еда", title: "Купить банан", detail: "Цена: 30 ₴ · быстрый источник сил", cost: 30, effects: { food: 7, health: 2, energy: 3, time: 1 }, event: "Банан быстро дал немного сил." },
  { id: "hotdog", tab: "Еда", title: "Купить хот-дог", detail: "Цена: 85 ₴ · быстро и сытно", cost: 85, effects: { food: 17, joy: 4, health: -1, time: 1 }, event: "Не самая полезная еда, но голод отступил." },
  { id: "instant_noodles", tab: "Еда", title: "Заварить лапшу", detail: "Цена: 60 ₴ · доступно и сытно", cost: 60, effects: { food: 14, joy: 2, energy: 2, time: 2 }, event: "Горячая лапша не праздник, но уже лучше пустого желудка." },
  { id: "soup", tab: "Еда", title: "Взять суп дня", detail: "Цена: 95 ₴ · тёплая полезная еда", cost: 95, effects: { food: 18, health: 4, joy: 3, time: 2 }, event: "Тёплый суп заметно улучшил самочувствие." },
  { id: "sandwich", tab: "Еда", title: "Купить бутерброд", detail: "Цена: 70 ₴ · перекус в дороге", cost: 70, effects: { food: 13, joy: 2, energy: 2, time: 1 }, event: "Бутерброд оказался простым, но вполне кстати." },
  { id: "shawarma", tab: "Еда", title: "Купить шаурму", detail: "Цена: 120 ₴", cost: 120, effects: { food: 24, health: -2, joy: 5, time: 1 }, event: "Вкусно, быстро и немного тяжеловато для желудка." },
  { id: "burger", tab: "Еда", title: "Купить бургер", detail: "Цена: 140 ₴ · вкусно и сытно", cost: 140, effects: { food: 21, joy: 7, health: -2, time: 1 }, event: "Иногда вкусная еда нужна не только телу, но и настроению." },
  { id: "pizza_slice", tab: "Еда", title: "Взять кусок пиццы", detail: "Цена: 110 ₴ · быстрая радость", cost: 110, effects: { food: 18, joy: 6, health: -1, time: 1 }, event: "Небольшая радость посреди тяжёлого дня." },
  { id: "home_meal", tab: "Еда", title: "Домашний обед", detail: "Цена: 180 ₴ · простая хорошая еда", cost: 180, effects: { food: 24, health: 5, joy: 5, time: 2 }, event: "Нормальный обед напомнил, что жизнь может быть стабильной." },
  { id: "business_lunch", tab: "Еда", title: "Взять бизнес-ланч", detail: "Цена: 260 ₴ · полноценный обед", cost: 260, effects: { food: 28, health: 6, joy: 8, energy: 3, time: 2 }, event: "Хорошая еда дала силы и ощущение нормального дня." },
  { id: "festive_dinner", tab: "Еда", title: "Праздничный ужин", detail: "Цена: 480 ₴ · дорого, но приятно", cost: 480, effects: { food: 32, health: 7, joy: 14, energy: 4, time: 3 }, event: "На пару часов получилось почувствовать, что всё действительно может измениться." },
  { id: "restaurant", tab: "Еда", title: "Поесть в кафе", detail: "Цена: 550 ₴", cost: 550, effects: { food: 35, health: 4, joy: 12, time: 2 }, event: "Нормальная еда и час спокойствия." },
  { id: "herbs", tab: "Здоровье", title: "Найти лечебные травы", detail: "Небольшая помощь здоровью", effects: { health: 8, food: -4, energy: -5, time: 3 }, event: "Ты потратил время, но нашёл способ немного подлечиться." },
  { id: "clinic", tab: "Здоровье", title: "Посетить клинику", detail: "Цена: 350 ₴", cost: 350, requires: ["passport"], effects: { health: 28, joy: 2, time: 4 }, event: "Осмотр и лечение вернули силы." },
  { id: "park", tab: "Радость", title: "Прогуляться в парке", detail: "Проветрить голову", effects: { joy: 12, food: -5, energy: -3, time: 2 }, event: "После прогулки стало легче думать о будущем." },
  { id: "cinema", tab: "Радость", title: "Сходить в кино", detail: "Цена: 250 ₴", cost: 250, effects: { joy: 24, food: -4, time: 3 }, event: "На несколько часов город перестал давить." },
  { id: "sleep", tab: "Радость", title: "Поспать", detail: "Комфорт жилья влияет на отдых", effects: { energy: 38, food: -10, joy: 2, time: 8 }, event: "Удалось немного восстановить силы." },
  { id: "bottles", tab: "Работа", title: "Сдать бутылки", detail: "Небольшой честный заработок", effects: { money: 140, workShifts: 1, food: -4, health: -2, energy: -12, time: 4 }, event: "Ты собрал и сдал бутылки." },
  { id: "flyers", tab: "Работа", title: "Раздавать листовки", detail: "Без документов · 170 ₴ за смену", effects: { money: 170, workShifts: 1, food: -4, energy: -10, joy: -2, time: 4 }, event: "Несколько часов на ногах — и первая простая смена позади." },
  { id: "cars", tab: "Работа", title: "Помыть машины", detail: "Подработка на улице · 240 ₴", effects: { money: 240, workShifts: 1, food: -6, energy: -17, joy: -3, time: 5 }, event: "К концу смены руки устали, зато появились деньги." },
  { id: "loader", tab: "Работа", title: "Разгрузить товар", detail: "Тяжёлая подработка · 320 ₴", effects: { money: 320, workShifts: 1, food: -7, health: -2, energy: -22, time: 6 }, event: "Спина гудит, но за честную тяжёлую работу заплатили сразу." },
  { id: "cleaner", tab: "Работа", title: "Смена уборщиком", detail: "Нужен паспорт · 300 ₴", requires: ["passport"], effects: { money: 300, workShifts: 1, food: -6, energy: -18, time: 5 }, event: "Обычная рабочая смена. Не мечта, но уже стабильнее улицы." },
  { id: "dishwasher", tab: "Работа", title: "Мыть посуду", detail: "Паспорт · 360 ₴", requires: ["passport"], effects: { money: 360, workShifts: 1, food: -7, energy: -20, joy: -2, time: 6 }, event: "Гора тарелок закончилась. Смена оплачена." },
  { id: "courier_walk", tab: "Работа", title: "Курьер пешком", detail: "Паспорт, 2 смены · 350 ₴", requires: ["passport"], minShifts: 2, effects: { money: 350, workShifts: 1, food: -7, energy: -20, time: 6 }, event: "Ты разнёс заказы по городу и заработал первые деньги на доставке." },
  { id: "warehouse_shift", tab: "Работа", title: "Смена на складе", detail: "Паспорт, 2 смены · 480 ₴", requires: ["passport"], minShifts: 2, effects: { money: 480, workShifts: 1, food: -8, health: -1, energy: -24, time: 8 }, event: "Полная смена на складе закончилась. Тяжело, зато оплата уже серьёзнее." },
  { id: "courier_bike", tab: "Работа", title: "Курьер на велосипеде", detail: "Паспорт, велосипед, 3 смены · 520 ₴", requires: ["passport", "bike"], minShifts: 3, effects: { money: 520, workShifts: 1, food: -8, energy: -18, joy: 1, time: 6 }, event: "С велосипедом доставок стало больше, а город — немного меньше." },
  { id: "barista", tab: "Работа", title: "Работать бариста", detail: "Паспорт, аттестат, 4 смены · 540 ₴", requires: ["passport", "diploma"], minShifts: 4, effects: { money: 540, workShifts: 1, food: -7, energy: -18, joy: 1, reputation: 1, time: 8 }, event: "Первый день за стойкой прошёл неплохо. Постоянные гости начали узнавать тебя." },
  { id: "seller", tab: "Работа", title: "Работать продавцом", detail: "Паспорт, аттестат, 5 смен · 580 ₴", requires: ["passport", "diploma"], minShifts: 5, effects: { money: 580, workShifts: 1, food: -7, energy: -17, joy: -1, reputation: 1, time: 8 }, event: "Ты отработал полноценную смену в магазине." },
  { id: "mechanic_helper", tab: "Работа", title: "Помощник механика", detail: "Паспорт, аттестат, 6 смен · 620 ₴", requires: ["passport", "diploma"], minShifts: 6, effects: { money: 620, workShifts: 1, food: -8, health: -1, energy: -21, reputation: 1, time: 8 }, event: "Сегодня ты уже не просто подаёшь инструменты — начинаешь понимать ремесло." },
  { id: "support_operator", tab: "Работа", title: "Оператор поддержки", detail: "Паспорт, аттестат, комната, 8 смен · 700 ₴", requires: ["passport", "diploma", "room"], minShifts: 8, effects: { money: 700, workShifts: 1, food: -6, energy: -16, joy: -2, reputation: 1, time: 8 }, event: "Восемь часов разговоров закончились. Это уже похоже на обычную стабильную работу." },
  { id: "guard", tab: "Работа", title: "Смена охранником", detail: "Паспорт, аттестат, комната, 6 смен · 680 ₴", requires: ["passport", "diploma", "room"], minShifts: 6, effects: { money: 680, workShifts: 1, food: -8, energy: -22, joy: -4, reputation: 1, time: 8 }, event: "Спокойная смена. Зарплата получена." },
  { id: "study", tab: "Развитие", title: "Вечерние занятия", detail: "Учёба 0/3", effects: { study: 1, food: -5, energy: -10, joy: -2, time: 4 }, event: "Один шаг к аттестату." },
  { id: "passport", tab: "Развитие", title: "Восстановить паспорт", detail: "Цена: 350 ₴", cost: 350, once: true, gives: "passport", effects: { joy: 8, time: 6 }, event: "Паспорт готов. Официальные двери начали открываться." },
  { id: "sneakers", tab: "Магазин", title: "Купить кроссовки", detail: "Цена: 450 ₴", cost: 450, once: true, gives: "sneakers", effects: { joy: 8, health: 3, time: 1 }, event: "Новые кроссовки сразу заметны на герое." },
  { id: "jacket", tab: "Магазин", title: "Купить куртку", detail: "Цена: 650 ₴", cost: 650, once: true, gives: "jacket", effects: { health: 6, joy: 8, time: 1 }, event: "В куртке теплее, а вид увереннее." },
  { id: "bike", tab: "Магазин", title: "Купить велосипед", detail: "Цена: 1200 ₴", cost: 1200, once: true, gives: "bike", effects: { joy: 12, time: 1 }, event: "Велосипед теперь стоит рядом с тобой." },
  { id: "box", tab: "Жильё", title: "Обустроить укрытие", detail: "Коробка и одеяло · 50 ₴, без аренды", cost: 50, once: true, gives: "box", effects: { joy: 3, health: 2, time: 2 }, event: "Теперь у тебя есть укрытие от ветра и место для отдыха." },
  { id: "room", tab: "Жильё", title: "Снять комнату", detail: "Укрытие, паспорт, 2 подработки · 700 ₴. Аренда 80 ₴/день", cost: 700, requires: ["box", "passport"], minShifts: 2, once: true, gives: "room", effects: { joy: 12, health: 5, time: 4 }, event: "Небольшая комната, но теперь есть дверь и ключ." },
  { id: "apartment", tab: "Жильё", title: "Снять квартиру", detail: "Комната, паспорт, 4 подработки · 1200 ₴. Аренда 200 ₴/день", cost: 1200, requires: ["room", "passport"], minShifts: 4, once: true, gives: "apartment", effects: { joy: 18, health: 8, time: 5 }, event: "Теперь у тебя отдельная квартира и больше возможностей." },
  { id: "save", tab: "Финансы", title: "Купить долю фонда", detail: "Цена: 1000 ₴. Доход раз в день", cost: 1000, requires: ["passport"], effects: { investments: 1, joy: 2, time: 2 }, event: "Ты вложил деньги. Теперь капитал может работать." },
  { id: "campaign", tab: "Политика", title: "Помочь району", detail: "Жильё, аттестат, репутация", requires: ["apartment", "diploma"], effects: { reputation: 8, joy: 5, energy: -10, food: -5, time: 5 }, event: "Жители района начали узнавать тебя." },
  { id: "election", tab: "Политика", title: "Баллотироваться в совет", detail: "Репутация 40, 2500 ₴", cost: 2500, requires: ["passport", "apartment", "diploma"], minReputation: 40, once: true, gives: "council", effects: { joy: 20, time: 8 }, event: "Ты выиграл местные выборы. Это начало политической карьеры." },
  { id: "street_trade", tab: "Теневая сторона", title: "Нелегальная торговля", detail: "Быстрые деньги, растёт внимание", effects: { money: 420, heat: 12, reputation: -4, joy: -3, energy: -9, time: 3 }, event: "Сделка состоялась. Теперь за тобой внимательнее следят." },
  { id: "warehouse", tab: "Теневая сторона", title: "Арендовать ангар", detail: "Цена: 4000 ₴, связи и паспорт", cost: 4000, requires: ["passport"], minHeat: 24, once: true, gives: "warehouse", effects: { joy: 8, heat: 12, time: 6 }, event: "Ангар открыл следующий уровень теневого бизнеса." },
  { id: "crew", tab: "Теневая сторона", title: "Нанять команду", detail: "Цена: 1600 ₴, нужен ангар", cost: 1600, requires: ["warehouse"], once: true, gives: "crew", effects: { heat: 16, joy: 6, time: 4 }, event: "Теперь операции приносят больше, но требуют расходов." }
];

export function newGame(name = "Герой") {
  return { name, day: 1, hour: 8, age: 25, food: 55, health: 75, joy: 55, energy: 65, money: 0, currencyVersion: 1, missedRent: 0, reputation: 0, heat: 0, study: 0, workShifts: 0, investments: 0, owned: [], lastUsedDay: {}, log: ["День 1. Всё начинается с одного решения."], ended: false };
}

export function normalizeState(state) {
  if (state.currencyVersion === 1 && state.lastUsedDay) return state;
  const money = state.currencyVersion === 1 ? Math.max(0, state.money ?? 0) : Math.max(0, Math.round((state.money ?? 0) * 10));
  return { ...state, money, currencyVersion: 1, missedRent: state.missedRent ?? 0, lastUsedDay: state.lastUsedDay ?? {} };
}

export function housingTier(state) {
  if (state.owned.includes("apartment")) return "apartment";
  if (state.owned.includes("room")) return "room";
  if (state.owned.includes("box")) return "box";
  return "street";
}

function effectiveAction(action, state) {
  if (action.id === "study") return { ...action, detail: `Учёба ${Math.min(state.study ?? 0, 3)}/3` };
  if (action.id !== "sleep") return action;
  const tier = housingTier(state);
  const bonus = { street: [0, 0], box: [5, 0], room: [10, 2], apartment: [15, 4] }[tier];
  return { ...action, effects: { ...action.effects, energy: action.effects.energy + bonus[0], ...(bonus[1] ? { health: bonus[1] } : {}) } };
}

export function actionsFor(state) {
  const current = normalizeState(state);
  return ACTIONS.map((action) => ({ ...effectiveAction(action, current), unavailable: available(action, current) }));
}

const clamp = (n) => Math.max(0, Math.min(100, n));
export function available(action, state) {
  if (state.ended) return "История закончилась. Начни новую игру.";
  if (action.id === "box" && housingTier(state) !== "street") return "Уже есть укрытие";
  if (action.id === "room" && housingTier(state) === "apartment") return "Уже есть квартира";
  if (action.once && state.owned.includes(action.gives)) return "Уже получено";
  if (action.daily && state.lastUsedDay?.[action.id] === state.day) return "Доступно снова завтра";
  const missing = (action.requires ?? []).filter((item) => !state.owned.includes(item));
  const reasons = [];
  if (missing.length) reasons.push(`Нужно: ${missing.map(label).join(", ")}`);
  if (state.money < (action.cost ?? 0)) reasons.push(`Ещё ${(action.cost ?? 0) - state.money} ₴`);
  if (state.reputation < (action.minReputation ?? 0)) reasons.push(`Репутация ${state.reputation}/${action.minReputation}`);
  if ((state.workShifts ?? 0) < (action.minShifts ?? 0)) reasons.push(`Подработки ${state.workShifts ?? 0}/${action.minShifts}`);
  if (state.heat < (action.minHeat ?? 0)) reasons.push(`Теневые связи ${state.heat}/${action.minHeat}`);
  if (state.energy < 8 && action.id !== "sleep") reasons.push("Сначала отдохни");
  return reasons.join(" · ") || null;
}
function label(id) { return ({ passport: "паспорт", diploma: "аттестат", box: "укрытие", room: "комната", apartment: "квартира", warehouse: "ангар", bike: "велосипед" })[id] ?? id; }

export function play(state, id) {
  const action = ACTIONS.find((a) => a.id === id);
  if (!action) throw new Error("UNKNOWN_ACTION");
  const current = normalizeState(state);
  const reason = available(action, current);
  if (reason) throw new Error(reason);
  const next = structuredClone(current);
  const applied = effectiveAction(action, next);
  next.money -= action.cost ?? 0;
  for (const [key, delta] of Object.entries(applied.effects)) {
    if (key === "time") continue;
    next[key] = (next[key] ?? 0) + delta;
  }
  if (action.gives) next.owned.push(action.gives);
  if (action.daily) next.lastUsedDay[action.id] = next.day;
  if (action.id === "room" || action.id === "apartment") next.missedRent = 0;
  if (action.id === "apartment") next.owned = next.owned.filter((item) => item !== "room");
  next.log.unshift(action.event);
  if (next.study >= 3 && !next.owned.includes("diploma")) {
    next.owned.push("diploma");
    next.log.unshift("Аттестат получен. Теперь доступна квалифицированная работа.");
  }
  next.hour += applied.effects.time ?? 1;
  while (next.hour >= 24) {
    next.hour -= 24;
    next.day += 1;
    if ((next.day - 1) % 365 === 0) next.age += 1;
    next.food -= 7;
    next.joy -= 3;
    next.health += { street: -2, box: -1, room: 0, apartment: 2 }[housingTier(next)];
    if (next.joy <= 15) next.energy -= 5;
    next.money += next.investments * 30 + (next.owned.includes("crew") ? 320 : 0);
    const tier = housingTier(next);
    const rent = { street: 0, box: 0, room: 80, apartment: 200 }[tier];
    if (rent) {
      if (next.money >= rent) { next.money -= rent; next.missedRent = 0; }
      else {
        next.money = 0;
        next.missedRent = (next.missedRent ?? 0) + 1;
        next.joy -= 6;
        next.log.unshift("Аренду сегодня оплатить не удалось.");
        if (next.missedRent >= 2) {
          next.owned = next.owned.filter((item) => item !== tier);
          next.missedRent = 0;
          next.log.unshift("После двух неоплаченных дней пришлось оставить жильё.");
        }
      }
    }
    if (next.owned.includes("crew")) next.money -= 90;
    next.heat = Math.max(0, next.heat - 2);
    if (next.food <= 0) next.health -= 10;
    if (next.money < 0) { next.money = 0; next.joy -= 10; }
  }
  for (const key of ["food", "health", "joy", "energy", "reputation", "heat"]) next[key] = clamp(next[key]);
  next.money = Math.max(0, next.money);
  if (next.heat >= 85) { next.money = Math.floor(next.money * .55); next.heat = 30; next.joy = clamp(next.joy - 25); next.log.unshift("Проверка сорвала дела и забрала часть денег."); }
  if (next.health <= 0) { next.ended = true; next.log.unshift("Сил больше нет. Эта история завершилась."); }
  next.log = next.log.slice(0, 8);
  return next;
}
