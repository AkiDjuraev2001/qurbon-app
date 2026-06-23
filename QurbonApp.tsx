import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  cream: "#FAF6EE",
  paper: "#F4EDE0",
  ink: "#1F1A14",
  inkLight: "#5C5147",
  green: "#1F3D33",
  greenDark: "#152A23",
  gold: "#B8804B",
  line: "#E8DFCD",
};

const TEXT = {
  uz: {
    nav: { howWorks: "Qanday ishlaydi", trust: "Kafolatlar", contact: "Aloqa" },
    hero: {
      eyebrow: "Toshkentdan butun O'zbekistonga",
      title: "Qurbonligingizni",
      titleAccent: "to'g'ri bajaring.",
      sub: "Uydan chiqmasdan. Halol sertifikatlangan. Muhtojlarga yetkazilgan.",
      cta: "Buyurtmani boshlash",
      stats: [
        { n: "3", l: "Qurbonlik turi" },
        { n: "100%", l: "Ochiq narx" },
        { n: "24/7", l: "Onlayn buyurtma" },
      ],
    },
    how: {
      title: "Uch oddiy qadam",
      steps: [
        { n: "01", t: "Buyurtma bering", d: "Hayvon turini va qancha taqsimlashni tanlang. Hamma narsa ilovada." },
        { n: "02", t: "Biz amalga oshiramiz", d: "Hamkor xo'jaliklarda tanlangan hayvon. Sertifikatlangan halol so'yishxonada qassob." },
        { n: "03", t: "Yetkazib beramiz", d: "Oilangizga, qarindoshlaringizga manzili bo'yicha va kambag'allarga mahalla orqali." },
      ],
    },
    wizard: {
      step: "Qadam", of: "/", back: "Orqaga", next: "Davom etish",
      review: "Buyurtmani ko'rib chiqish", pay: "To'lash va tasdiqlash",
      step1: { title: "Qurbonlik turini tanlang", sub: "Niyatingizga mos turini tanlang" },
      step2: { title: "Og'irlikni tanlang", sub: "Qo'y — 178 500 so'm/kg • Veterinariya tekshiruvidan o'tgan" },
      step3: {
        title: "Go'sht taqsimoti",
        sub: "Qanday bo'linishini tanlang",
      },
      step4: {
        title: "Buyurtma tafsilotlari",
        sub: "Ismingizni va aloqa raqamingizni qoldiring",
        nameLabel: "Ismingiz", phoneLabel: "Telefon raqami",
        summary: "Yakuniy summa", confirm: "Buyurtmani tasdiqlash",
      },
    },
    sacrificeTypes: [
      { id: "sadaqa", t: "Sadaqa", d: "Muhtojlarga yordam berish niyatida." },
      { id: "aqiqa", t: "Aqiqa", d: "Yangi tug'ilgan farzand uchun shukrona qurbonligi." },
      { id: "qurbon", t: "Qurbon Hayit", d: "Hayit kunlarida vojib ibodat. Eng keng tarqalgan turi." },
    ],
    animals: [
      { id: "sheep", t: "Qo'y", d: "Bir kishi nomidan", pricePerKg: 178500 },
    ],
    success: {
      title: "Buyurtmangiz qabul qilindi",
      sub: "Qurboningiz qabul bo'lsin!",
      reset: "Yana buyurtma",
    },
    trust: {
      title: "Nega bizga ishonish mumkin",
      items: [
        { t: "Ochiq oferta", d: "So'yish va vazn shartlari oldindan ochiq ko'rsatilgan" },
        { t: "Sog'lom hayvon", d: "Kamchiliksiz, semiz hayvonlarni tanlaymiz" },
        { t: "Shariat bo'yicha so'yish", d: "Har bir buyurtma uchun niyat belgilanadi" },
        { t: "Mahalla tarmog'i", d: "Muhtojlarga taqsimlash mahallalar orqali" },
      ],
    },
    sum: "Jami",
    currency: "so'm",
  },
  ru: {
    nav: { howWorks: "Как работает", trust: "Гарантии", contact: "Контакты" },
    hero: {
      eyebrow: "Из Ташкента по всему Узбекистану",
      title: "Совершите курбан",
      titleAccent: "правильно.",
      sub: "Не выходя из дома. Халяль сертификат. Доставлено нуждающимся.",
      cta: "Начать заказ",
      stats: [
        { n: "3", l: "Вида жертвоприношений" },
        { n: "100%", l: "Прозрачная цена" },
        { n: "24/7", l: "Приём заказов онлайн" },
      ],
    },
    how: {
      title: "Три простых шага",
      steps: [
        { n: "01", t: "Сделайте заказ", d: "Выбираете тип животного и как распределить мясо. Всё в приложении." },
        { n: "02", t: "Мы исполняем", d: "Животное из проверенного хозяйства. Забой в сертифицированном халяль-цехе." },
        { n: "03", t: "Доставляем", d: "Вашей семье, родственникам по адресам и нуждающимся через махалля." },
      ],
    },
    wizard: {
      step: "Шаг", of: "из", back: "Назад", next: "Продолжить",
      review: "Проверить заказ", pay: "Оплатить и подтвердить",
      step1: { title: "Выберите тип курбана", sub: "Подберите подходящий вашему намерению" },
      step2: { title: "Выберите вес", sub: "Баран — 178 500 сум/кг • Прошёл ветеринарную проверку" },
      step3: {
        title: "Распределение мяса",
        sub: "Выберите способ распределения",
      },
      step4: {
        title: "Детали заказа", sub: "Оставьте имя и контактный телефон",
        nameLabel: "Ваше имя", phoneLabel: "Номер телефона",
        summary: "Итоговая сумма", confirm: "Подтвердить заказ",
      },
    },
    sacrificeTypes: [
      { id: "sadaqa", t: "Садака", d: "С намерением помочь нуждающимся" },
      { id: "aqiqa", t: "Акика", d: "Жертвоприношение в честь новорождённого ребёнка" },
      { id: "qurbon", t: "Курбан Хайит", d: "Обязательное жертвоприношение в дни праздника" },
    ],
    animals: [
      { id: "sheep", t: "Баран", d: "От одного человека", pricePerKg: 178500 },
    ],
    success: {
      title: "Заказ принят",
      sub: "Пусть ваша жертва будет принята!",
      reset: "Новый заказ",
    },
    trust: {
      title: "Почему нам можно доверять",
      items: [
        { t: "Прозрачная оферта", d: "Все условия забоя и веса — заранее, в открытом доступе" },
        { t: "Здоровое животное", d: "Отбираем упитанных животных без изъянов" },
        { t: "Забой по Шариату", d: "Намерение фиксируется для каждого заказа" },
        { t: "Сеть махалля", d: "Распределение нуждающимся через махалля" },
      ],
    },
    sum: "Итого",
    currency: "сум",
  },
} as const;

type Lang = keyof typeof TEXT;

const TELEGRAM_TOKEN = "8928692621:AAFLh9zDRTg8jkMDbvfMgdKO7FtSQQAAJ2w";
const TELEGRAM_CHAT_ID = "53533360";

const PRESETS = [
  { id: 'sunnah',     icon: '📖',       uz: "Sunna bo'yicha",        ru: "По Сунне",              subUz: "1/3 oila • 1/3 qarindosh • 1/3 muhtoj",   subRu: "1/3 семье • 1/3 родственникам • 1/3 нуждающимся", badge: true  },
  { id: 'family_all', icon: '👨‍👩‍👧',   uz: "Hammasi oilaga",         ru: "Всё семье",             subUz: "Barcha go'sht oilaga qoladi",              subRu: "Всё мясо остаётся семье",                          badge: false },
  { id: 'more_needy', icon: '🤲',       uz: "Ko'proq muhtojlarga",   ru: "Больше нуждающимся",   subUz: "1/3 oila • 2/3 muhtojlar",                 subRu: "1/3 семье • 2/3 нуждающимся",                     badge: false },
  { id: 'custom',     icon: '✏️',       uz: "O'z variantim",          ru: "Свой вариант",          subUz: "Foizlarni o'zim belgilayman",              subRu: "Укажу проценты сам",                               badge: false },
];

const OFERTA_TEXT = {
  ru: `ПУБЛИЧНАЯ ОФЕРТА

1. Общие положения
1.1. Настоящий документ является публичной офертой (далее — «Оферта») сервиса Qurbon.uz (далее — «Исполнитель»).
1.2. Оформляя заказ через приложение или сайт qurbon.uz, Заказчик принимает условия настоящей Оферты в полном объёме.
1.3. Исполнитель оказывает услугу по организации халяль-жертвоприношения (қурбон, ақиқа, назр, садақа), разделке и доставке мяса по поручению Заказчика.

2. Предмет оферты
2.1. Исполнитель организует приобретение животного, его забой в соответствии с нормами Шариата, разделку и распределение мяса согласно выбору Заказчика.
2.2. Услуга осуществляется по принципу вакала (поручение): Заказчик поручает Исполнителю провести жертвоприношение от своего имени.

3. Вес и выход мяса (ВАЖНО)
3.1. Вес, указанный при оформлении заказа, является весом туши (мяса после забоя до финальной обработки).
3.2. После разделки, обвалки (отделения мяса от кости), удаления непригодных частей и стекания крови итоговый вес чистого мяса меньше веса туши примерно на 12–15%.
3.3. Пример: при заказе туши 40 кг Заказчик получает примерно 34–35 кг готового мяса.
3.4. Данная разница является естественной для процесса разделки и не считается недостачей. Заказчик подтверждает понимание этого условия при оформлении заказа.

4. Порядок оформления заказа
4.1. Заказчик выбирает тип жертвоприношения, животное, вес и способ распределения мяса.
4.2. После подтверждения заказ поступает Исполнителю. Оператор связывается с Заказчиком для уточнения деталей.

5. Цена и оплата
5.1. Цена указывается за килограмм веса туши и включает стоимость животного, забой, разделку и услугу Исполнителя.
5.2. Итоговая стоимость рассчитывается как: вес туши × цена за кг.
5.3. Способ и сроки оплаты согласовываются с оператором.

6. Доставка
6.1. Мясо доставляется по адресам, указанным Заказчиком для категорий «Семья» и «Родственники».
6.2. Доля, предназначенная нуждающимся, передаётся через махаллинские комитеты, детские дома и благотворительные фонды.

7. Распределение мяса
7.1. Распределение осуществляется согласно выбранному Заказчиком варианту (по Сунне, всё семье, больше нуждающимся или свой вариант).
7.2. Конкретные части туши для каждой категории определяются Исполнителем, если иное не указано Заказчиком в поле «особые пожелания».

8. Отмена и возврат
8.1. Заказчик вправе отменить заказ до момента забоя животного.
8.2. После осуществления забоя отмена и возврат средств невозможны в силу специфики услуги.

9. Ответственность сторон
9.1. Исполнитель обязуется провести жертвоприношение в соответствии с нормами Шариата и санитарными требованиями.
9.2. Исполнитель не несёт ответственности за задержки, вызванные форс-мажорными обстоятельствами.

10. Контакты
• Telegram: +998 97 705 08 00
• Телефон: +998 99 008 85 55
• Сайт: qurbon.uz`,

  uz: `OMMAVIY OFERTA

1. Umumiy qoidalar
1.1. Ushbu hujjat Qurbon.uz xizmatining (keyingi oʻrinlarda — «Ijrochi») ommaviy ofertasidir.
1.2. Ilova yoki qurbon.uz sayti orqali buyurtma berib, Buyurtmachi ushbu Oferta shartlarini toʻliq qabul qiladi.
1.3. Ijrochi Buyurtmachi topshirigʻiga koʻra halol soʻyish (qurbon, aqiqa, nazr, sadaqa), goʻshtni boʻlish va yetkazib berish xizmatini koʻrsatadi.

2. Oferta predmeti
2.1. Ijrochi hayvonni sotib olish, uni Shariat qoidalariga muvofiq soʻyish, goʻshtni boʻlish va Buyurtmachi tanloviga koʻra taqsimlashni tashkil etadi.
2.2. Xizmat vakala (topshiriq) tamoyili asosida amalga oshiriladi: Buyurtmachi Ijrochiga oʻz nomidan qurbonlik qilishni topshiradi.

3. Goʻsht vazni va chiqishi (MUHIM)
3.1. Buyurtma berishda koʻrsatilgan vazn — bu tana vazni (soʻyishdan keyingi, yakuniy ishlovdan oldingi goʻsht).
3.2. Boʻlish, suyakdan ajratish, yaroqsiz qismlarni olib tashlash va qon oqib chiqqandan soʻng tayyor goʻshtning yakuniy vazni tana vaznidan taxminan 12–15% ga kam boʻladi.
3.3. Misol: 40 kg tana buyurtma qilinganda, Buyurtmachi taxminan 34–35 kg tayyor goʻsht oladi.
3.4. Ushbu farq boʻlish jarayoni uchun tabiiy boʻlip, kamomad hisoblanmaydi. Buyurtmachi buyurtma berishda ushbu shartni tushunganini tasdiqlaydi.

4. Buyurtma berish tartibi
4.1. Buyurtmachi qurbonlik turi, hayvon, vazn va goʻshtni taqsimlash usulini tanlaydi.
4.2. Tasdiqlangandan soʻng buyurtma Ijrochiga yetib boradi. Operator tafsilotlarni aniqlash uchun Buyurtmachi bilan bogʻlanadi.

5. Narx va toʻlov
5.1. Narx tana vaznining bir kilogrammi uchun koʻrsatiladi va hayvon qiymati, soʻyish, boʻlish hamda Ijrochi xizmatini oʻz ichiga oladi.
5.2. Yakuniy qiymat quyidagicha hisoblanadi: tana vazni × 1 kg narxi.
5.3. Toʻlov usuli va muddati operator bilan kelishiladi.

6. Yetkazib berish
6.1. Goʻsht «Oila» va «Qarindoshlar» toifalari uchun Buyurtmachi koʻrsatgan manzillarga yetkaziladi.
6.2. Muhtojlar uchun moʻljallangan ulush mahalla qoʻmitalari, bolalar uylari va xayriya jamgʻarmalari orqali topshiriladi.

7. Goʻshtni taqsimlash
7.1. Taqsimlash Buyurtmachi tanlagan variantga koʻra amalga oshiriladi (Sunna boʻicha, hammasi oilaga, koʻproq muhtojlarga yoki oʻz varianti).
7.2. Har bir toifa uchun aniq qismlar, agar Buyurtmachi «maxsus xohishlar» maydonida boshqacha koʻrsatmagan boʻlsa, Ijrochi tomonidan belgilanadi.

8. Bekor qilish va qaytarish
8.1. Buyurtmachi hayvon soʻyilgunga qadar buyurtmani bekor qilish huquqiga ega.
8.2. Soʻyish amalga oshirilgandan soʻng, xizmat oʻziga xosligi sababli bekor qilish va mablagʻni qaytarish mumkin emas.

9. Tomonlarning javobgarligi
9.1. Ijrochi qurbonlikni Shariat qoidalari va sanitariya talablariga muvofiq amalga oshirish majburiyatini oladi.
9.2. Ijrochi fors-major holatlari sabab boʻlgan kechikishlar uchun javobgar emas.

10. Aloqa
• Telegram: +998 97 705 08 00
• Telefon: +998 99 008 85 55
• Sayt: qurbon.uz`,
};

function formatPrice(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function QurbonApp() {
  const [lang, setLang] = useState<Lang>("uz");
  const [step, setStep] = useState(0);
  const [weight, setWeight] = useState(20);
  const [selectedPreset, setSelectedPreset] = useState('sunnah');
  const [customFamily, setCustomFamily] = useState(34);
  const [customRelatives, setCustomRelatives] = useState(33);
  const [customNeedy, setCustomNeedy] = useState(33);
  const [specialNote, setSpecialNote] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showOferta, setShowOferta] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | ''>('');
  const [order, setOrder] = useState({
    type: null as string | null,
    animal: 'sheep' as string | null,
    name: "",
    phone: "",
    familyAddress: "",
    relativesAddress: "",
  });

  const t = TEXT[lang];

  const animalPrice = order.animal
    ? ((t.animals.find((a) => a.id === order.animal)?.pricePerKg ?? 0) * weight)
    : 0;
  const total = animalPrice;

  const canProceed = () => {
    if (step === 1) return !!order.type;
    if (step === 2) return weight >= 20;
    if (step === 3) return selectedPreset !== 'custom' || (customFamily + customRelatives + customNeedy === 100);
    if (step === 4) return order.name.trim().length > 1 && order.phone.trim().length > 6 && paymentMethod !== '' && agreedToTerms;
    return true;
  };

  const reset = () => {
    setStep(0);
    setWeight(20);
    setSelectedPreset('sunnah');
    setCustomFamily(34);
    setCustomRelatives(33);
    setCustomNeedy(33);
    setSpecialNote('');
    setAgreedToTerms(false);
    setPaymentMethod('');
    setOrder({ type: null, animal: 'sheep', name: "", phone: "", familyAddress: "", relativesAddress: "" });
  };

  const submitOrder = () => {
    const animalUz = TEXT.uz.animals.find((a) => a.id === order.animal)?.t ?? order.animal;
    const animalRu = TEXT.ru.animals.find((a) => a.id === order.animal)?.t ?? order.animal;
    const typeUz = TEXT.uz.sacrificeTypes.find((s) => s.id === order.type)?.t ?? order.type;
    const typeRu = TEXT.ru.sacrificeTypes.find((s) => s.id === order.type)?.t ?? order.type;
    const preset = PRESETS.find((p) => p.id === selectedPreset)!;
    const distUz = selectedPreset === 'custom'
      ? `O'z variantim: Oila ${customFamily}% • Qarindosh ${customRelatives}% • Muhtoj ${customNeedy}%`
      : `${preset.uz}: ${preset.subUz}`;
    const distRu = selectedPreset === 'custom'
      ? `Свой вариант: Семья ${customFamily}% • Родственники ${customRelatives}% • Нуждающимся ${customNeedy}%`
      : `${preset.ru}: ${preset.subRu}`;
    const msg =
      `📦 Yangi buyurtma! | Новый заказ!\n` +
      `━━━━━━━━━━━━━━━━━━\n\n` +
      `🐑 Hayvon: ${animalUz} — ${weight} kg\n` +
      `🐑 Животное: ${animalRu} — ${weight} kg\n\n` +
      `📋 Tur: ${typeUz} | Тип: ${typeRu}\n` +
      `👤 Ism / Имя: ${order.name}\n` +
      `📞 Tel: ${order.phone}\n\n` +
      `🥩 Go'sht taqsimoti | Распределение мяса:\n` +
      `  ${distUz}\n` +
      `  ${distRu}\n` +
      (specialNote ? `  📝 Izoh / Примечание: ${specialNote}\n` : '') +
      `\n📍 Yetkazib berish | Доставка:\n` +
      `  👨‍👩‍👧 Oila / Семья: ${order.familyAddress || "—"}\n` +
      `  👥 Qarindoshlar / Родственники: ${order.relativesAddress || "—"}\n` +
      `  🤲 Muhtojlar / Нуждающимся: Mahalla va xayriya jamg'armalari | Махалля и благотворительные фонды\n\n` +
      `💳 To'lov: ${paymentMethod === 'cash' ? 'Naqd pul' : 'Karta'} | Оплата: ${paymentMethod === 'cash' ? 'Наличные' : 'Карта'}\n` +
      `💰 Jami / Итого: ${formatPrice(total)} so'm\n` +
      `━━━━━━━━━━━━━━━━━━`;
    console.log("Sending to Telegram...");
    (async () => {
      try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg }),
        });
        const data = await response.json();
        console.log("Telegram response:", response.status, data);
      } catch (error) {
        console.log("Telegram error:", error);
      }
    })();
    setStep(5);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cream }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />

      {/* ─── Header ─── */}
      <View style={s.header}>
        <View style={s.logoRow}>
          <View style={s.logoBox}>
            <Text style={s.logoLetter}>Q</Text>
          </View>
          <Text style={s.logoText}>
            Qurbon<Text style={{ color: COLORS.gold }}>.</Text>uz
          </Text>
        </View>
        <View style={s.langRow}>
          {(["uz", "ru"] as Lang[]).map((l) => (
            <TouchableOpacity
              key={l}
              onPress={() => setLang(l)}
              style={[s.langBtn, lang === l && s.langBtnActive]}
            >
              <Text style={[s.langBtnTxt, lang === l && s.langBtnTxtActive]}>
                {l.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* ─── HOME ─── */}
        {step === 0 && (
          <>
            <View style={s.heroSection}>
              <Text style={s.eyebrow}>{t.hero.eyebrow}</Text>
              <Text style={s.heroTitle}>
                {t.hero.title}{"\n"}
                <Text style={s.heroAccent}>{t.hero.titleAccent}</Text>
              </Text>
              <Text style={s.heroSub}>{t.hero.sub}</Text>
              <TouchableOpacity style={s.ctaBtn} onPress={() => setStep(1)}>
                <Text style={s.ctaTxt}>{t.hero.cta}</Text>
                <Text style={{fontSize: 16, color: COLORS.cream}}>›</Text>
              </TouchableOpacity>
              <View style={s.statsRow}>
                {t.hero.stats.map((stat, i) => (
                  <View key={i} style={s.statItem}>
                    <Text style={s.statNum}>{stat.n}</Text>
                    <Text style={s.statLbl}>{stat.l}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={s.howSection}>
              <Text style={s.sectionTitle}>{t.how.title}</Text>
              {t.how.steps.map((step, i) => (
                <View key={i} style={s.howItem}>
                  <Text style={s.howNum}>{step.n}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.howTitle}>{step.t}</Text>
                    <Text style={s.howDesc}>{step.d}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ paddingHorizontal: 24, paddingBottom: 8 }}>
              <View style={{ backgroundColor: COLORS.paper, borderLeftWidth: 2, borderLeftColor: COLORS.gold, borderRadius: 6, paddingHorizontal: 14, paddingVertical: 12, alignSelf: 'stretch', marginHorizontal: 0 }}>
                <Text style={{ fontSize: 15, color: COLORS.inkLight, lineHeight: 22 }}>
                  {lang === "uz" ? (
                    <>{"🐑 Bugungi narx: 1 kg qo'y go'shti — "}<Text style={{ fontWeight: "700", color: COLORS.gold }}>{"178 500 so'm"}</Text>{". Bu narxga so'yish, bo'lish va ko'rsatilgan manzilga yetkazib berish kiradi."}</>
                  ) : (
                    <>{"🐑 Сегодняшняя цена: 1 кг баранины — "}<Text style={{ fontWeight: "700", color: COLORS.gold }}>{"178 500 сум"}</Text>{". В эту сумму входит забой, разделка и доставка до указанного адреса."}</>
                  )}
                </Text>
              </View>
            </View>

            <View style={s.trustSection}>
              <Text style={s.trustHeading}>{t.trust.title}</Text>
              {t.trust.items.map((it, i) => (
                <View key={i} style={s.trustItem}>
                  <Text style={{fontSize: 20, color: COLORS.gold}}>🛡️</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={s.trustT}>{it.t}</Text>
                    <Text style={s.trustD}>{it.d}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={s.footer}>
              <Text style={s.footerLogo}>
                Qurbon<Text style={{ color: COLORS.gold }}>.</Text>uz
              </Text>
              <Text style={s.footerTxt}>© 2026 • Toshkent • +998 99 008 85 55</Text>
            </View>
          </>
        )}

        {/* ─── WIZARD ─── */}
        {step > 0 && step <= 4 && (
          <View style={s.wizardWrap}>
            {/* Progress bar */}
            <View style={s.progressHeader}>
              <Text style={s.progressTxt}>{t.wizard.step} {step} {t.wizard.of} 4</Text>
              <TouchableOpacity onPress={reset}>
                <Text style={s.backHomeTxt}>← {lang === "uz" ? "Bosh sahifa" : "На главную"}</Text>
              </TouchableOpacity>
            </View>
            <View style={s.progressBar}>
              {[1, 2, 3, 4].map((n) => (
                <View key={n} style={[s.seg, n <= step && s.segActive]} />
              ))}
            </View>

            {/* Step 1 */}
            {step === 1 && (
              <WizardStep title={t.wizard.step1.title} sub={t.wizard.step1.sub}>
                {t.sacrificeTypes.map((s) => (
                  <OptionCard key={s.id} selected={order.type === s.id} onPress={() => setOrder({ ...order, type: s.id })}>
                    <Text style={styles.optTitle}>{s.t}</Text>
                    <Text style={styles.optDesc}>{s.d}</Text>
                  </OptionCard>
                ))}
              </WizardStep>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <WizardStep title={t.wizard.step2.title} sub={t.wizard.step2.sub}>
                <View style={{ backgroundColor: COLORS.paper, padding: 20, borderRadius: 6, borderWidth: 1, borderColor: COLORS.line }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.line }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: COLORS.ink }}>
                      🐑 {lang === "uz" ? "Qo'y" : "Баран"}
                    </Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.priceTxt}>{formatPrice(178500)}</Text>
                      <Text style={styles.currencyTxt}>{t.currency}/kg</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "500", color: COLORS.ink, marginBottom: 16 }}>
                    {lang === "uz" ? "Og'irlikni tanlang (kg)" : "Выберите вес (кг)"}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <TouchableOpacity onPress={() => setWeight(Math.max(20, weight - 5))} style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: COLORS.line, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{fontSize: 18, color: COLORS.ink, lineHeight: 20}}>−</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 22, fontWeight: "500", minWidth: 54, textAlign: "center", color: COLORS.green }}>{weight} kg</Text>
                    <TouchableOpacity onPress={() => setWeight(Math.min(150, weight + 5))} style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: COLORS.line, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{fontSize: 18, color: COLORS.ink, lineHeight: 20}}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{ fontSize: 12, color: COLORS.gold, marginTop: 16 }}>
                    {lang === "uz"
                      ? "ℹ️ Koʻrsatilgan vazn — tana vazni. Boʻlishdan keyin tayyor goʻsht ~12-15% kam boʻladi."
                      : "ℹ️ Указан вес туши. После разделки чистого мяса ~12-15% меньше."}
                  </Text>
                </View>
              </WizardStep>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <WizardStep title={t.wizard.step3.title} sub={t.wizard.step3.sub}>
                {PRESETS.map((preset) => {
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <TouchableOpacity
                      key={preset.id}
                      onPress={() => setSelectedPreset(preset.id)}
                      style={[styles.optCard, isSelected && styles.optCardSel]}
                    >
                      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                        <Text style={{ fontSize: 24 }}>{preset.icon}</Text>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <Text style={styles.optTitle}>{lang === "uz" ? preset.uz : preset.ru}</Text>
                            {preset.badge && (
                              <View style={styles.badge}>
                                <Text style={styles.badgeTxt}>{lang === "uz" ? "Sunna" : "Сунна"}</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.optDesc}>{lang === "uz" ? preset.subUz : preset.subRu}</Text>
                        </View>
                      </View>
                      {isSelected && (
                        <View style={styles.optCheck}>
                          <Text style={{ fontSize: 14, color: COLORS.gold }}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}

                {selectedPreset === 'custom' && (
                  <View style={{ backgroundColor: COLORS.paper, padding: 16, borderRadius: 6, borderWidth: 1, borderColor: COLORS.line, gap: 12 }}>
                    <Text style={{ fontSize: 13, fontWeight: "500", color: COLORS.ink, marginBottom: 4 }}>
                      {lang === "uz" ? "Foizlarni belgilang (jami 100%)" : "Укажите проценты (сумма 100%)"}
                    </Text>
                    {[
                      { label: lang === "uz" ? "👨‍👩‍👧 Oila" : "👨‍👩‍👧 Семья", val: customFamily, set: setCustomFamily },
                      { label: lang === "uz" ? "👥 Qarindoshlar" : "👥 Родственники", val: customRelatives, set: setCustomRelatives },
                      { label: lang === "uz" ? "🤲 Muhtojlar" : "🤲 Нуждающимся", val: customNeedy, set: setCustomNeedy },
                    ].map((row) => (
                      <View key={row.label} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: COLORS.ink, flex: 1 }}>{row.label}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                          <TouchableOpacity onPress={() => row.set(Math.max(0, row.val - 1))} style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: COLORS.ink, lineHeight: 18 }}>−</Text>
                          </TouchableOpacity>
                          <Text style={{ fontSize: 15, fontWeight: "500", minWidth: 36, textAlign: "center", color: COLORS.green }}>{row.val}%</Text>
                          <TouchableOpacity onPress={() => row.set(Math.min(100, row.val + 1))} style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: COLORS.ink, lineHeight: 18 }}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                    {customFamily + customRelatives + customNeedy !== 100 && (
                      <Text style={{ fontSize: 12, color: "#c0392b", fontWeight: "500" }}>
                        {lang === "uz" ? `Jami: ${customFamily + customRelatives + customNeedy}% (100% bo'lishi kerak)` : `Итого: ${customFamily + customRelatives + customNeedy}% (должно быть 100%)`}
                      </Text>
                    )}
                  </View>
                )}

                <View style={{ backgroundColor: COLORS.paper, padding: 14, borderRadius: 6, borderWidth: 1, borderColor: COLORS.line }}>
                  <Text style={[styles.inputLabel, { marginBottom: 8 }]}>
                    {lang === "uz" ? "Izoh (ixtiyoriy)" : "Примечание (необязательно)"}
                  </Text>
                  <TextInput
                    value={specialNote}
                    onChangeText={setSpecialNote}
                    placeholder={lang === "uz" ? "Qo'shimcha xohishlar..." : "Дополнительные пожелания..."}
                    style={[styles.textInput, { marginBottom: 0 }]}
                    placeholderTextColor={COLORS.inkLight}
                    multiline
                  />
                </View>

                <Text style={{ fontSize: 12, color: COLORS.gold, marginTop: 4 }}>
                  {lang === "uz"
                    ? "ℹ️ Muhtojlar uchun go'sht mahalla qo'mitasi, bolalar uylari va xayriya jamg'armalari orqali yetkaziladi."
                    : "ℹ️ Мясо для нуждающихся передаётся через махаллю, детские дома и благотворительные фонды."}
                </Text>
              </WizardStep>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <WizardStep title={t.wizard.step4.title} sub={t.wizard.step4.sub}>
                <View style={styles.inputCard}>
                  <Text style={styles.inputLabel}>{t.wizard.step4.nameLabel}</Text>
                  <TextInput
                    value={order.name}
                    onChangeText={(v) => setOrder({ ...order, name: v })}
                    placeholder={lang === "uz" ? "Ism Familiya" : "Имя Фамилия"}
                    style={styles.textInput}
                    placeholderTextColor={COLORS.inkLight}
                  />
                  <Text style={styles.inputLabel}>{t.wizard.step4.phoneLabel}</Text>
                  {(() => {
                    const hasFamilyParts = selectedPreset === 'sunnah' || selectedPreset === 'family_all' || selectedPreset === 'more_needy' || (selectedPreset === 'custom' && customFamily > 0);
                    const hasRelativesParts = selectedPreset === 'sunnah' || (selectedPreset === 'custom' && customRelatives > 0);
                    const hasAnyAddress = hasFamilyParts || hasRelativesParts;
                    return (
                      <>
                        <TextInput
                          value={order.phone}
                          onChangeText={(v) => setOrder({ ...order, phone: v })}
                          placeholder="+998 90 123 45 67"
                          keyboardType="phone-pad"
                          style={[styles.textInput, !hasAnyAddress && { marginBottom: 0 }]}
                          placeholderTextColor={COLORS.inkLight}
                        />
                        {hasFamilyParts && (
                          <>
                            <Text style={styles.inputLabel}>👨‍👩‍👧 Oila yetkazib berish manzili / Адрес доставки для Семьи</Text>
                            <TextInput
                              value={order.familyAddress}
                              onChangeText={(v) => setOrder({ ...order, familyAddress: v })}
                              placeholder={lang === "uz" ? "Ko'cha, uy raqami, xonadon" : "Улица, дом, квартира"}
                              style={[styles.textInput, !hasRelativesParts && { marginBottom: 0 }]}
                              placeholderTextColor={COLORS.inkLight}
                            />
                          </>
                        )}
                        {hasRelativesParts && (
                          <>
                            <Text style={styles.inputLabel}>👥 Qarindoshlar manzili / Адрес для Родственников</Text>
                            <TextInput
                              value={order.relativesAddress}
                              onChangeText={(v) => setOrder({ ...order, relativesAddress: v })}
                              placeholder={lang === "uz" ? "Ko'cha, uy raqami, xonadon" : "Улица, дом, квартира"}
                              style={[styles.textInput, { marginBottom: 0 }]}
                              placeholderTextColor={COLORS.inkLight}
                            />
                          </>
                        )}
                      </>
                    );
                  })()}
                </View>
                <View>
                  <Text style={[styles.inputLabel, { marginBottom: 10 }]}>
                    {lang === "uz" ? "To'lov usuli" : "Способ оплаты"}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {([
                      { id: 'cash' as const, icon: '💵', uz: "Naqd pul", ru: "Наличные" },
                      { id: 'card' as const, icon: '💳', uz: "Karta",    ru: "Карта"    },
                    ]).map((opt) => (
                      <TouchableOpacity
                        key={opt.id}
                        onPress={() => setPaymentMethod(opt.id)}
                        style={[styles.optCard, { flex: 1, alignItems: "center", paddingVertical: 14 }, paymentMethod === opt.id && styles.optCardSel]}
                      >
                        <Text style={{ fontSize: 24, marginBottom: 6 }}>{opt.icon}</Text>
                        <Text style={[styles.optTitle, { fontSize: 15 }]}>{lang === "uz" ? opt.uz : opt.ru}</Text>
                        {paymentMethod === opt.id && (
                          <View style={styles.optCheck}>
                            <Text style={{ fontSize: 14, color: COLORS.gold }}>✓</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <OrderSummary order={order} t={t} animalPrice={animalPrice} total={total} lang={lang} weight={weight} selectedPreset={selectedPreset} customFamily={customFamily} customRelatives={customRelatives} customNeedy={customNeedy} specialNote={specialNote} familyAddress={order.familyAddress} relativesAddress={order.relativesAddress} />

                <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 4 }}>
                  <View style={{ width: 22, height: 22, borderRadius: 4, borderWidth: 1.5, borderColor: agreedToTerms ? COLORS.green : COLORS.inkLight, backgroundColor: agreedToTerms ? COLORS.green : "transparent", alignItems: "center", justifyContent: "center" }}>
                    {agreedToTerms && <Text style={{ fontSize: 13, color: COLORS.cream, lineHeight: 16 }}>✓</Text>}
                  </View>
                  <Text style={{ fontSize: 13, color: COLORS.ink, flex: 1, lineHeight: 20 }}>
                    {lang === "uz" ? (
                      <>Men ommaviy <Text style={{ color: COLORS.gold, textDecorationLine: "underline" }} onPress={() => setShowOferta(true)}>oferta</Text> shartlariga roziman</>
                    ) : (
                      <>Я согласен с условиями публичной <Text style={{ color: COLORS.gold, textDecorationLine: "underline" }} onPress={() => setShowOferta(true)}>оферты</Text></>
                    )}
                  </Text>
                </TouchableOpacity>
              </WizardStep>
            )}

            {/* Nav buttons */}
            <View style={styles.navBtns}>
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                disabled={step === 1}
                style={[styles.backBtn, step === 1 && { opacity: 0.3 }]}
              >
                <Text style={{fontSize: 14, color: COLORS.ink}}>‹</Text>
                <Text style={styles.backBtnTxt}>{t.wizard.back}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (step < 4 ? setStep(step + 1) : submitOrder())}
                disabled={!canProceed()}
                style={[styles.nextBtn, !canProceed() && { opacity: 0.4 }]}
              >
                <Text style={styles.nextBtnTxt}>
                  {step === 4 ? t.wizard.step4.confirm : t.wizard.next}
                </Text>
                <Text style={{fontSize: 14, color: COLORS.cream}}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Total bar */}
            {order.animal && step >= 2 && (
              <View style={styles.totalBar}>
                <Text style={styles.totalLabel}>{t.sum}</Text>
                <Text style={styles.totalAmt}>{formatPrice(total)} {t.currency}</Text>
              </View>
            )}
          </View>
        )}

        {/* ─── SUCCESS ─── */}
        {step === 5 && (
          <View style={styles.successSec}>
            <View style={styles.successIcon}>
              <Text style={{fontSize: 28, color: COLORS.gold}}>✓</Text>
            </View>
            <Text style={styles.successTitle}>{t.success.title}</Text>
            <Text style={styles.successSub}>{t.success.sub}</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
              <Text style={styles.resetTxt}>{t.success.reset}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ─── Oferta Modal ─── */}
      <Modal visible={showOferta} animationType="slide" onRequestClose={() => setShowOferta(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cream }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.line }}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: COLORS.ink }}>
              {lang === "uz" ? "Ommaviy oferta" : "Публичная оферта"}
            </Text>
            <TouchableOpacity onPress={() => setShowOferta(false)} style={{ padding: 4 }}>
              <Text style={{ fontSize: 22, color: COLORS.inkLight }}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 14, color: COLORS.ink, lineHeight: 22 }}>
              {OFERTA_TEXT[lang]}
            </Text>
          </ScrollView>
          <View style={{ padding: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.line }}>
            <TouchableOpacity
              onPress={() => { setAgreedToTerms(true); setShowOferta(false); }}
              style={{ backgroundColor: COLORS.ink, paddingVertical: 14, borderRadius: 4, alignItems: "center" }}
            >
              <Text style={{ color: COLORS.cream, fontSize: 15, fontWeight: "500" }}>
                {lang === "uz" ? "Roziman" : "Согласен"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Sub-components ───

function WizardStep({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.wTitle}>{title}</Text>
      <Text style={styles.wSub}>{sub}</Text>
      <View style={{ gap: 10 }}>{children}</View>
    </View>
  );
}

function OptionCard({ children, selected, onPress }: { children: React.ReactNode; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.optCard, selected && styles.optCardSel]}>
      {children}
      {selected && (
        <View style={styles.optCheck}>
          <Text style={{fontSize: 14, color: COLORS.gold}}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function OrderSummary({ order, t, animalPrice, total, lang, weight, selectedPreset, customFamily, customRelatives, customNeedy, specialNote, familyAddress, relativesAddress }: any) {
  const animal = t.animals.find((a: any) => a.id === order.animal);
  const type = t.sacrificeTypes.find((s: any) => s.id === order.type);
  const preset = PRESETS.find((p) => p.id === selectedPreset)!;
  const distValue = selectedPreset === 'custom'
    ? `${customFamily}% / ${customRelatives}% / ${customNeedy}%`
    : (lang === "uz" ? preset.subUz : preset.subRu);
  return (
    <View style={styles.summCard}>
      <Text style={styles.summTitle}>{lang === "uz" ? "Buyurtma" : "Заказ"}</Text>
      <SRow label={lang === "uz" ? "Tur" : "Тип"} value={type?.t} />
      <SRow label={lang === "uz" ? "Hayvon" : "Животное"} value={animal?.t} price={animalPrice} curr={t.currency} />
      <SRow label={lang === "uz" ? "Og'irlik" : "Вес"} value={`${weight} kg`} />
      <SRow label={lang === "uz" ? "Taqsimot" : "Распределение"} value={lang === "uz" ? preset.uz : preset.ru} />
      <SRow label={lang === "uz" ? "Nisbat" : "Соотношение"} value={distValue} />
      {specialNote ? <SRow label={lang === "uz" ? "Izoh" : "Примечание"} value={specialNote} /> : null}
      <Text style={{ fontSize: 12, color: COLORS.gold, marginTop: 2, marginBottom: 8 }}>
        {lang === "uz"
          ? "ℹ️ Muhtojlar uchun go'sht mahalla qo'mitasi, bolalar uylari va xayriya jamg'armalari orqali yetkaziladi."
          : "ℹ️ Мясо для нуждающихся передаётся через махаллю, детские дома и благотворительные фонды."}
      </Text>
      {familyAddress ? <SRow label={lang === "uz" ? "Oila manzili" : "Адрес Семьи"} value={familyAddress} /> : null}
      {relativesAddress ? <SRow label={lang === "uz" ? "Qarindoshlar manzili" : "Адрес Родственников"} value={relativesAddress} /> : null}
      <View style={styles.summTotal}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.ink }}>{t.sum}</Text>
        <Text style={styles.summAmt}>{formatPrice(total)} {t.currency}</Text>
      </View>
    </View>
  );
}

function SRow({ label, value, price, curr }: { label: string; value?: string; price?: number; curr?: string }) {
  return (
    <View style={styles.sRow}>
      <Text style={styles.sRowLbl}>{label}</Text>
      <Text style={styles.sRowVal}>{value}{price ? `  ${formatPrice(price)} ${curr}` : ""}</Text>
    </View>
  );
}

// ─── Styles ───

const s = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.line, backgroundColor: COLORS.cream },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoBox: { width: 32, height: 32, backgroundColor: COLORS.green, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  logoLetter: { color: COLORS.gold, fontSize: 18, fontWeight: "600" },
  logoText: { fontSize: 18, fontWeight: "500", color: COLORS.ink },
  langRow: { flexDirection: "row", gap: 4 },
  langBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 },
  langBtnActive: { backgroundColor: COLORS.ink },
  langBtnTxt: { fontSize: 11, fontWeight: "500", color: COLORS.inkLight, textTransform: "uppercase" },
  langBtnTxtActive: { color: COLORS.cream },
  heroSection: { padding: 24, paddingTop: 40, paddingBottom: 32 },
  eyebrow: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.gold, fontWeight: "600", marginBottom: 16 },
  heroTitle: { fontSize: 38, fontWeight: "400", letterSpacing: -1, marginBottom: 16, color: COLORS.ink, lineHeight: 44 },
  heroAccent: { color: COLORS.green, fontStyle: "italic", fontWeight: "500" },
  heroSub: { fontSize: 16, lineHeight: 24, color: COLORS.inkLight, marginBottom: 28 },
  ctaBtn: { backgroundColor: COLORS.ink, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 4, alignSelf: "flex-start" },
  ctaTxt: { color: COLORS.cream, fontSize: 15, fontWeight: "500" },
  statsRow: { flexDirection: "row", marginTop: 40, paddingTop: 24, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.line },
  statItem: { flex: 1 },
  statNum: { fontSize: 28, fontWeight: "500", color: COLORS.green, letterSpacing: -0.5 },
  statLbl: { fontSize: 11, color: COLORS.inkLight, marginTop: 4, lineHeight: 16 },
  howSection: { backgroundColor: COLORS.paper, padding: 24 },
  sectionTitle: { fontSize: 28, fontWeight: "400", fontStyle: "italic", color: COLORS.green, marginBottom: 28, letterSpacing: -0.5 },
  howItem: { flexDirection: "row", gap: 16, marginBottom: 24 },
  howNum: { fontSize: 32, fontWeight: "300", color: COLORS.gold, width: 44 },
  howTitle: { fontSize: 16, fontWeight: "600", color: COLORS.ink, marginBottom: 6 },
  howDesc: { fontSize: 13, color: COLORS.inkLight, lineHeight: 20 },
  trustSection: { padding: 24 },
  trustHeading: { fontSize: 22, fontWeight: "500", color: COLORS.ink, marginBottom: 20 },
  trustItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: 20 },
  trustT: { fontSize: 15, fontWeight: "600", color: COLORS.ink, marginBottom: 4 },
  trustD: { fontSize: 13, color: COLORS.inkLight, lineHeight: 18 },
  footer: { backgroundColor: COLORS.greenDark, padding: 28, alignItems: "center" },
  footerLogo: { fontSize: 20, fontWeight: "500", color: COLORS.cream, marginBottom: 8 },
  footerTxt: { fontSize: 12, color: COLORS.cream, opacity: 0.7 },
  wizardWrap: { padding: 20 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  progressTxt: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: COLORS.inkLight },
  backHomeTxt: { fontSize: 12, color: COLORS.inkLight, textDecorationLine: "underline" },
  progressBar: { flexDirection: "row", gap: 4, marginBottom: 28 },
  seg: { flex: 1, height: 2, backgroundColor: COLORS.line, borderRadius: 1 },
  segActive: { backgroundColor: COLORS.green },
});

const styles = StyleSheet.create({
  wTitle: { fontSize: 26, fontWeight: "500", fontStyle: "italic", color: COLORS.ink, marginBottom: 8, letterSpacing: -0.5 },
  wSub: { fontSize: 14, color: COLORS.inkLight, marginBottom: 20, lineHeight: 20 },
  optCard: { backgroundColor: COLORS.cream, borderWidth: 1, borderColor: COLORS.line, borderRadius: 6, padding: 18, position: "relative" },
  optCardSel: { borderColor: COLORS.green, backgroundColor: COLORS.green + "08" },
  optCheck: { position: "absolute", top: 14, right: 14, width: 20, height: 20, backgroundColor: COLORS.green, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  optTitle: { fontSize: 18, fontWeight: "500", color: COLORS.ink, marginBottom: 4 },
  optDesc: { fontSize: 13, color: COLORS.inkLight, lineHeight: 18 },
  badge: { backgroundColor: COLORS.gold + "22", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeTxt: { fontSize: 10, color: COLORS.gold, fontWeight: "600", textTransform: "uppercase" },
  priceTxt: { fontSize: 18, fontWeight: "500", color: COLORS.green },
  currencyTxt: { fontSize: 11, color: COLORS.inkLight },
  catBtn: { width: "100%", marginBottom: 10, padding: 14, borderRadius: 6, borderWidth: 1, alignItems: "center" },
  partGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  partChip: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 6, borderWidth: 1 },
  addonIcon: { width: 36, height: 36, backgroundColor: COLORS.paper, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  addonIconOn: { backgroundColor: COLORS.green },
  addonPrice: { fontSize: 13, color: COLORS.green, fontWeight: "600" },
  inputCard: { backgroundColor: COLORS.paper, padding: 20, borderRadius: 6, borderWidth: 1, borderColor: COLORS.line, marginBottom: 16 },
  inputLabel: { fontSize: 11, color: COLORS.inkLight, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1, fontWeight: "500" },
  textInput: { width: "100%", padding: 12, borderWidth: 1, borderColor: COLORS.line, borderRadius: 4, fontSize: 15, backgroundColor: COLORS.cream, color: COLORS.ink, marginBottom: 16 },
  navBtns: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, gap: 12 },
  backBtn: { paddingHorizontal: 16, paddingVertical: 13, borderWidth: 1, borderColor: COLORS.line, borderRadius: 4, flexDirection: "row", alignItems: "center", gap: 6 },
  backBtnTxt: { fontSize: 14, color: COLORS.ink },
  nextBtn: { flex: 1, paddingHorizontal: 20, paddingVertical: 13, backgroundColor: COLORS.ink, borderRadius: 4, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  nextBtnTxt: { fontSize: 14, fontWeight: "500", color: COLORS.cream },
  totalBar: { marginTop: 16, padding: 14, backgroundColor: COLORS.green, borderRadius: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { fontSize: 13, color: COLORS.cream, opacity: 0.8 },
  totalAmt: { fontSize: 22, fontWeight: "500", color: COLORS.gold, letterSpacing: -0.5 },
  summCard: { backgroundColor: COLORS.cream, borderWidth: 1, borderColor: COLORS.line, borderRadius: 6, padding: 20 },
  summTitle: { fontSize: 18, fontWeight: "500", fontStyle: "italic", marginBottom: 14, color: COLORS.ink },
  summTotal: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.line, marginTop: 12, paddingTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summAmt: { fontSize: 22, fontWeight: "500", color: COLORS.green, letterSpacing: -0.5 },
  sRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  sRowLbl: { fontSize: 13, color: COLORS.inkLight, flex: 1 },
  sRowVal: { fontSize: 13, color: COLORS.ink, flex: 2, textAlign: "right" },
  successSec: { flex: 1, padding: 32, alignItems: "center", paddingTop: 80 },
  successIcon: { width: 64, height: 64, backgroundColor: COLORS.green, borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  successTitle: { fontSize: 30, fontWeight: "500", fontStyle: "italic", color: COLORS.green, textAlign: "center", marginBottom: 14, letterSpacing: -0.5 },
  successSub: { fontSize: 16, color: COLORS.inkLight, lineHeight: 24, textAlign: "center", marginBottom: 32 },
  resetBtn: { paddingHorizontal: 24, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.ink, borderRadius: 4 },
  resetTxt: { fontSize: 14, color: COLORS.ink },
});
