import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { ACTIONS, actionsFor, available, housingTier, newGame, normalizeState, play } from "../src/game.js";

const action = (id) => ACTIONS.find((item) => item.id === id);

test("existing balances convert to hryvnias once without losing progress", () => {
  const old = { ...newGame(), money: 42, owned: ["apartment", "jacket"], currencyVersion: undefined };
  const updated = normalizeState(old);
  assert.equal(updated.money, 420);
  assert.deepEqual(updated.owned, old.owned);
  assert.equal(normalizeState(updated).money, 420);
  assert.equal(housingTier(updated), "apartment");
});

test("housing unlocks in order and changes the displayed sleep bonus", () => {
  let state = { ...newGame(), money: 5000, workShifts: 4, owned: ["passport"] };
  assert.match(available(action("room"), state), /укрытие/);
  assert.match(available(action("apartment"), state), /комната/);
  const streetSleep = actionsFor(state).find((item) => item.id === "sleep");
  assert.equal(streetSleep.effects.energy, 38);
  state = play(state, "box");
  assert.equal(housingTier(state), "box");
  assert.equal(actionsFor(state).find((item) => item.id === "sleep").effects.energy, 43);
  state = play(state, "room");
  assert.equal(housingTier(state), "room");
  assert.equal(actionsFor(state).find((item) => item.id === "sleep").effects.energy, 48);
  state = play(state, "apartment");
  assert.equal(housingTier(state), "apartment");
  assert.equal(state.owned.includes("room"), false);
  const apartmentSleep = actionsFor(state).find((item) => item.id === "sleep");
  assert.equal(apartmentSleep.effects.energy, 53);
  assert.equal(apartmentSleep.effects.health, 4);
});

test("two missed rent days remove rented housing but keep the box shelter", () => {
  let state = { ...newGame(), hour: 23, money: 0, owned: ["box", "room"] };
  state = play(state, "sleep");
  assert.equal(state.missedRent, 1);
  assert.equal(housingTier(state), "room");
  state.hour = 23;
  state = play(state, "sleep");
  assert.equal(state.missedRent, 0);
  assert.equal(housingTier(state), "box");
  assert.match(state.log[0], /оставить жильё/);
});

test("all paid actions show the hryvnia currency", () => {
  for (const item of ACTIONS.filter((entry) => entry.cost)) {
    assert.match(item.detail, /₴/, item.id);
  }
  assert.match(available(action("shawarma"), newGame()), /₴/);
});

test("locked actions explain every missing requirement", () => {
  const reason = available(action("apartment"), newGame());
  assert.match(reason, /комната/);
  assert.match(reason, /паспорт/);
  assert.match(reason, /1200 ₴/);
  assert.match(reason, /0\/4/);
});


test("new food pack is wired to illustrated assets", () => {
  const ids = ["tea", "coffee", "bun", "apple", "banana", "hotdog", "instant_noodles", "soup", "sandwich", "social_breakfast", "home_meal", "burger", "pizza_slice", "business_lunch", "festive_dinner"];
  for (const id of ids) {
    assert.ok(action(id), `missing action ${id}`);
    assert.ok(existsSync(new URL(`../public/assets/${id}.webp`, import.meta.url)), `missing asset ${id}`);
  }
});

test("social meals can only be used once per game day", () => {
  let state = newGame();
  state = play(state, "social_breakfast");
  assert.match(available(action("social_breakfast"), state), /завтра/);
  assert.equal(available(action("canteen"), state), null);
  state = play(state, "canteen");
  assert.match(available(action("canteen"), state), /завтра/);
});

test("study progress text reflects the current state", () => {
  const state = { ...newGame(), study: 2 };
  assert.equal(actionsFor(state).find((item) => item.id === "study").detail, "Учёба 2/3");
});
