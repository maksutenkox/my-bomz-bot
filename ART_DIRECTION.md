# Визуальное направление

Игра использует нарисованные растровые иллюстрации с фактурой гуаши и карандаша. Герой выглядит уставшим, но сохраняет достоинство и узнаваемость. Палитра: приглушённые оливковый, бирюзовый, терракотовый и кремовый; мягкий тёплый свет. Интерфейс минималистичен, с крупной сценой и короткими карточками действий под экран телефона.

## Промпты для продолжения набора

Каждый предмет создаётся отдельным запросом к встроенному ImageGen. Общая основа промпта: «Use case: stylized-concept. Asset type: mobile game action card. One isolated subject, centered with generous padding, readable at 64 px. Hand-painted gouache and pencil texture, tactile materials, muted olive/ochre/terracotta/cream palette, warm light. True transparent alpha background. No text, logos, watermark, people or UI.» В предмет подставляется конкретное блюдо, покупка или действие.

Персонаж: «Full-body adult man experiencing homelessness, dignified and expressive, messy dark hair, scruffy beard, worn olive hoodie, patched charcoal trousers and muddy brown shoes. Neutral standing pose, hand-painted gouache and pencil texture, genuine transparent background, no props or text.» Варианты одежды создаются по базовому портрету с сохранением лица, позы и пропорций.

Фоны: «Portrait mobile game environment, hand-painted gouache and pencil narrative art, eye-level perspective, center kept clear for a full-body character overlay, ground in lower quarter, muted teal/olive/terracotta/cream palette, no people, UI, text or logos.» Отдельные сюжеты: тихий городской угол и скромная съёмная квартира.

Финальные оптимизированные файлы находятся в `public/assets/`. Локальный `art-sources.local.json` содержит пути к исходным PNG и не включается в Git; `scripts/prepare_art.py` преобразует выбранные PNG в WebP без изменения композиции.
