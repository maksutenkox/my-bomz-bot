# Визуальное направление

Игра использует нарисованные растровые иллюстрации с фактурой гуаши и карандаша. Герой выглядит уставшим, но сохраняет достоинство и узнаваемость. Палитра: приглушённые оливковый, бирюзовый, терракотовый и кремовый; мягкий тёплый свет. Интерфейс минималистичен, с крупной сценой и короткими карточками действий под экран телефона.

## Промпты для продолжения набора

Каждый предмет создаётся отдельным запросом к встроенному ImageGen. Общая основа промпта: «Use case: stylized-concept. Asset type: mobile game action card. One isolated subject, centered with generous padding, readable at 64 px. Hand-painted gouache and pencil texture, tactile materials, muted olive/ochre/terracotta/cream palette, warm light. True transparent alpha background. No text, logos, watermark, people or UI.» В предмет подставляется конкретное блюдо, покупка или действие.

Персонаж: «Full-body adult man experiencing homelessness, dignified and expressive, messy dark hair, scruffy beard, worn olive hoodie, patched charcoal trousers and muddy brown shoes. Neutral standing pose, hand-painted gouache and pencil texture, genuine transparent background, no props or text.» Варианты одежды создаются по базовому портрету с сохранением лица, позы и пропорций.

Фоны: «Portrait mobile game environment, hand-painted gouache and pencil narrative art, eye-level perspective, center kept clear for a full-body character overlay, ground in lower quarter, muted teal/olive/terracotta/cream palette, no people, UI, text or logos.» Отдельные сюжеты: тихий городской угол, угол с укрытием из коробки, скромная съёмная комната и квартира.

Новые фоны получены встроенным ImageGen как точечные правки существующих сцен. `box-bg`: «Keep the exact camera angle, architecture, daylight, painterly texture and open center of street-bg; add only a humble cardboard sleeping shelter with a folded blanket on the left.» `room-bg`: «Keep the perspective, daylight, texture and clear center of apartment-bg; turn it into a smaller bare rented room with worn plaster, narrow bed and sparse furnishings.» Без персонажей, надписей и логотипов.

Новые предметы созданы отдельными запросами ко встроенному ImageGen. `box`: «One isolated makeshift cardboard sleeping shelter with a folded blanket, clear silhouette at 64 px, hand-painted gouache and pencil, warm muted palette, genuine transparent background.» `room`: «One isolated old brass key and folded linen towel symbolizing a rented room, clear silhouette at 64 px, hand-painted gouache and pencil, warm muted palette, genuine transparent background.» Без людей, текста, плитки интерфейса и водяных знаков.

Нижняя навигация: «Use case: stylized-concept. Asset type: tiny bottom-navigation icon for portrait mobile game. Make one centered, bold, instantly recognizable silhouette with only a few painted details, designed to remain clear at 28 pixels. Hand-painted gouache and pencil texture, muted olive, warm ochre, terracotta, cream palette, soft light. Genuine transparent alpha background, generous clear padding. No text, letters, logos, square tile, UI, or watermark.» Отдельные сюжеты: дверь с тёплым окном (Главная), миска с листом (Забота), рабочие перчатки на монете (Заработок), сумка из магазина с одеждой (Магазин), указатель расходящихся дорог (Путь).

Финальные оптимизированные файлы находятся в `public/assets/`. Локальный `art-sources.local.json` содержит пути к исходным PNG и не включается в Git; `scripts/prepare_art.py` преобразует выбранные PNG в WebP без изменения композиции.
