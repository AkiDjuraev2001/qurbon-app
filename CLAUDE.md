# Qurbon.uz — Project Context

## Stack
- Expo + React Native SDK 54
- Main file: app/(tabs)/index.tsx
- Web deploy: Netlify (auto-deploy from GitHub)
- GitHub: github.com/AkiDjuraev2001/qurbon-app
- Orders via: Telegram Bot API (no backend)

## Languages
Always provide BOTH languages in all UI text (UZ + RU).

## Brand Colors
- Background: #1F3D33 (dark green)
- Accent/Gold: #B8804B
- Text: #FAF6EE (cream)

## Animals & Prices
- Sheep (Qo'y) ONLY: 178,500 sum/kg (market 170k + 5% fee)
- Cow removed for now

## Order Wizard — 4 Steps
- Step 1: Sacrifice type (Qurbon Hayit, Aqiqa, Nazr, Sadaqa)
- Step 2: Weight (10-60kg, step 5kg) — sheep only, auto-selected
- Step 3: Distribution preset (Sunnah/Family/Needy/Custom + optional note)
- Step 4: Contact + delivery addresses + public offer checkbox + summary

## Step 3 Presets
- sunnah: 1/3 family, 1/3 relatives, 1/3 needy
- family_all: 100% family
- more_needy: 1/3 family, 2/3 needy
- custom: user sets % (must total 100%)

## Delivery
- Family (Oila): address input in Step 4
- Relatives (Qarindoshlar): address input in Step 4
- Needy: no address, fixed info note shown

## Rules
- NEVER use Ionicons (broken on web) — Unicode only
- Always test for both mobile and web
- Public offer checkbox required before confirm button
