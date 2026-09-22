CREATE TABLE IF NOT EXISTS players (
  telegram_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  state_json TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
