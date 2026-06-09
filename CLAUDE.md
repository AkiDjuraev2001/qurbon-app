# Qurbon.uz — Project Context

## Stack
- Expo + React Native SDK 54
- Main file: app/(tabs)/index.tsx
- Web deploy: Netlify (npx expo export --platform web)
- Orders via: Telegram Bot API (no backend)

## Languages
Always provide BOTH languages in all UI text.
- UZ = Uzbek (primary)
- RU = Russian (secondary)

## Brand Colors
- Background: #1F3D33 (dark green)
- Accent/Gold: #B8804B
- Text: #FAF6EE (cream)
- Success: #4CAF50

## Prices (update here when changed)
- Sheep (Qo'y / Баран): 178,500 sum/kg

## Order Wizard — 4 Steps
- Step 1: Sacrifice type (Qurbon Hayit, Aqiqa, Nazr, Sadaqa)
- Step 2: Animal + weight (10–60kg, step 5kg)
- Step 3: Distribution preset (Sunnah / Family / Needy / Custom)
- Step 4: Contact info + delivery addresses + order summary

## Delivery Addresses
- Family (Oila): address input in Step 4
- Relatives (Qarindoshlar): address input in Step 4
- Needy (Muhtojlar): no address, fixed info note shown instead

## Meat Distribution Presets
- 'sunnah': 1/3 family, 1/3 relatives, 1/3 needy
- 'family_all': 100% family
- 'more_needy': 1/3 family, 2/3 needy
- 'custom': user sets percentages (must total 100%)

## Telegram Bot
- Sends order on confirmation
- Message is bilingual (UZ + RU)
- Includes: animal, weight, price, distribution, addresses

## Important Rules
- NEVER use Ionicons (broken on web) — use Unicode only
- Always handle both UZ and RU text
- Keep styles consistent with existing StyleSheet
- Test mentally for both mobile and web before finishing

## Animals: Only Sheep (Qo'y) available. Price: 178,500 sum/kg. Cow removed for now.
