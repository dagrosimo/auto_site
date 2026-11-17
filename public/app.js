/**
 * KORO Auto Chemistry Poland — Storefront, pH Catalog & Telegram Lead Submission
 */

const PRODUCTS = [
  {
    id: 'foam-alkaline',
    category: 'wash',
    image: '/images/prod-foam.jpg',
    ph: 11.8,
    dilution: '1:10 – 1:25',
    tiers: {
      retail: { sku: 'KR-01-1L', volume: '1 L', pricePln: 59 },
      b2b: { sku: 'KR-01-20L', volume: '20 L', pricePln: 540 },
    },
    text: {
      pl: {
        name: 'Alkaliczna Piana Zima Pre-Wash',
        short: 'Bezdotykowe zmiękczanie soli drogowej, błota i filmu ulicznego bez NTA.',
        protocol: 'Nanieść opryskiem lub pianownicą PA (1:15) na chłodny lakier. Odczekać 3–4 min, spłukać myjką pod wysokim ciśnieniem.',
      },
      ru: {
        name: 'Щелочная пена Zima Pre-Wash',
        short: 'Бесконтактное удаление дорожной соли, грязи и статической плёнки без NTA.',
        protocol: 'Нанести пенокомплектом (1:15) на прохладный кузов. Подождать 3–4 мин, смыть аппаратом высокого давления.',
      },
      en: {
        name: 'Alkaline Snow Foam Zima Pre-Wash',
        short: 'Touchless removal of road salt, winter grime, and traffic film. NTA-free formula.',
        protocol: 'Apply via foam cannon (1:15) on cool paintwork. Dwell 3–4 min, rinse thoroughly under high pressure.',
      },
    },
  },
  {
    id: 'acid-shampoo',
    category: 'wash',
    image: '/images/prod-foam.jpg',
    ph: 4.5,
    dilution: '1:150',
    tiers: {
      retail: { sku: 'KR-02-500', volume: '500 ml', pricePln: 49 },
      b2b: { sku: 'KR-02-5L', volume: '5 L', pricePln: 215 },
    },
    text: {
      pl: {
        name: 'Szampon Kwaśny Ceramic Reset',
        short: 'Odetkanie powłok ceramicznych z osadów wapiennych i twardej wody.',
        protocol: 'Rozcieńczyć 35 ml na 5 L ciepłej wody. Myć rękawicą z mikrofibry na dwa wiadra, spłukać przed wyschnięciem.',
      },
      ru: {
        name: 'Кислый шампунь Ceramic Reset',
        short: 'Глубокая очистка керамических покрытий от кальциевых пятен и водного камня.',
        protocol: 'Развести 35 мл на 5 л тёплой воды. Мыть методом двух ведер мягкой варежкой, не давать высыхать.',
      },
      en: {
        name: 'Acidic Shampoo Ceramic Reset',
        short: 'Unclogs SiO2 coatings from mineral deposits and hard-water scale.',
        protocol: 'Dilute 35 ml per 5 L warm water. Wash with microfiber mitt using two-bucket method, rinse before drying.',
      },
    },
  },
  {
    id: 'iron-gel',
    category: 'wheels',
    image: '/images/prod-wheel.jpg',
    ph: 7.0,
    dilution: 'RTU (1:0)',
    tiers: {
      retail: { sku: 'KR-03-750', volume: '750 ml', pricePln: 64 },
      b2b: { sku: 'KR-03-5L', volume: '5 L', pricePln: 249 },
    },
    text: {
      pl: {
        name: 'Krwawa Felga Deironizer Gel',
        short: 'Neutralne pH, gęsty żel rozpuszczający pył z klocków hamulcowych i lotną rdzę.',
        protocol: 'Spryskać chłodne felgi lub dolne partie lakieru. Po 4–5 min (efekt krwawienia) dopracować pędzelkiem i spłukać.',
      },
      ru: {
        name: 'Айрон-гель для дисков Deironizer',
        short: 'Нейтральный pH, густой гель для растворения тормозной пыли и металлических вкраплений.',
        protocol: 'Распылить на остывшие диски или кузов. Через 4–5 мин пройтись кистью и тщательно смыть водой.',
      },
      en: {
        name: 'Bleeding Wheel Deironizer Gel',
        short: 'pH-neutral clinging gel that dissolves brake dust and embedded iron particles.',
        protocol: 'Spray onto cool rims or lower panels. Wait 4–5 min until deep purple reaction, agitate and rinse.',
      },
    },
  },
  {
    id: 'ceramic-sio2',
    category: 'ceramic',
    image: '/images/prod-ceramic.jpg',
    ph: 7.2,
    dilution: 'RTU (30 ml/auto)',
    tiers: {
      retail: { sku: 'KR-04-50', volume: '50 ml', pricePln: 289 },
      b2b: { sku: 'KR-04-100', volume: '100 ml', pricePln: 490 },
    },
    text: {
      pl: {
        name: 'Powłoka Ceramiczna SiO2 Shield 36M',
        short: 'Krystaliczna ochrona lakieru na 36 miesięcy. Kąt zwilżania 112°, głębia koloru.',
        protocol: 'Aplikować krzyżowo na odtłuszczony lakier w temperaturze 15–25°C. Dotrzeć po 2 min dwiema mikrofibrami.',
      },
      ru: {
        name: 'Керамическое покрытие SiO2 Shield 36M',
        short: 'Кристаллическая защита ЛКП до 36 месяцев. Гидрофобный угол 112° и глубокий блеск.',
        protocol: 'Наносить перекрёстно на обезжиренный лак при 15–25°C. Располировать через 2 мин двумя микрофибрами.',
      },
      en: {
        name: 'SiO2 Ceramic Coating Shield 36M',
        short: '36-month crystalline paint protection with 112° contact angle and deep gloss.',
        protocol: 'Apply cross-hatch onto degreased paint at 15–25°C. Buff off after 2 min flash with two clean towels.',
      },
    },
  },
  {
    id: 'interior-matte',
    category: 'interior',
    image: '/images/prod-interior.jpg',
    ph: 7.4,
    dilution: 'RTU / 1:5',
    tiers: {
      retail: { sku: 'KR-05-500', volume: '500 ml', pricePln: 45 },
      b2b: { sku: 'KR-05-5L', volume: '5 L', pricePln: 185 },
    },
    text: {
      pl: {
        name: 'Interior Detailer Matte & UV',
        short: 'Antystatyczne czyszczenie kokpitu, ekranów i matowych plastików bez tłustego połysku.',
        protocol: 'Nanieść mgiełkę na mikrofibrę, przetrzeć deskę rozdzielczą i boczki, wykończyć suchą stroną ściereczki.',
      },
      ru: {
        name: 'Интерьер-детейлер Matte & UV',
        short: 'Антистатический уход за торпедо, экранами и матовым пластиком без жирного блеска.',
        protocol: 'Нанести на микрофибру, протереть пластик и декоративные вставки, располировать сухой стороной.',
      },
      en: {
        name: 'Interior Detailer Matte & UV',
        short: 'Anti-static cleaner & UV shield for dashboards, screens, and satin trims with zero glare.',
        protocol: 'Mist onto microfiber towel, wipe dashboard and door cards evenly, buff dry with clean side.',
      },
    },
  },
  {
    id: 'wax-hydro',
    category: 'ceramic',
    image: '/images/prod-ceramic.jpg',
    ph: 6.8,
    dilution: '1:50 – 1:80',
    tiers: {
      retail: { sku: 'KR-06-1L', volume: '1 L', pricePln: 74 },
      b2b: { sku: 'KR-06-20L', volume: '20 L', pricePln: 620 },
    },
    text: {
      pl: {
        name: 'Hydrowosk Polimerowy Wet Coat',
        short: 'Błyskawiczny osuszacz i hydrofobowość na mokry lakier — idealny na myjnie.',
        protocol: 'Spryskać czysty mokry lakier (1:50) lub podać przez dozownik myjni, od razu spłukać czystą wodą.',
      },
      ru: {
        name: 'Полимерный гидровоск Wet Coat',
        short: 'Мгновенная гидрофобность и быстрая сушка по мокрому кузову — идеален для моек.',
        protocol: 'Распылить на чистый влажный кузов (1:50) или подать через дозатор мойки, сразу смыть водой.',
      },
      en: {
        name: 'Polymer Hydro-Wax Wet Coat',
        short: 'Instant water beading and drying aid applied on wet paint — built for car washes.',
        protocol: 'Spray onto clean wet paint (1:50) or feed via wash bay doser, rinse immediately with pressure washer.',
      },
    },
  },
];

const KITS = {
  weekend: {
    sku: 'KIT-DRIVER',
    volume: '4 × szt.',
    pricePln: 189,
    names: {
      pl: 'Zestaw Weekendowy Detailing',
      ru: 'Набор Weekend Detailing',
      en: 'Weekend Detailing Kit',
    },
  },
  studio: {
    sku: 'KIT-STUDIO',
    volume: 'Komplet + 5 L',
    pricePln: 640,
    names: {
      pl: 'Zestaw Studio & Powłoka SiO2',
      ru: 'Набор Studio & Керамика SiO2',
      en: 'Studio & SiO2 Coating Kit',
    },
  },
  carwash: {
    sku: 'KIT-B2B-20L',
    volume: '4 × 20 L',
    pricePln: 1490,
    names: {
      pl: 'Pakiet Myjnia Bezdotykowa (4×20 L)',
      ru: 'Пакет для бесконтактной мойки (4×20 л)',
      en: 'Touchless Car Wash Pack (4×20 L)',
    },
  },
};

const I18N = {
  pl: {
    'utility.shipping': 'Wysyłka 24h InPost & DPD • Darmowa dostawa od 249 zł',
    'nav.catalog': 'Katalog',
    'nav.formulas': 'Standard Lab',
    'nav.b2b': 'Dla Myjni & B2B',
    'nav.request': 'Zostaw zgłoszenie',
    'hero.eyebrow': 'FORMUŁY DETAILINGOWE • PRODUKCJA UE',
    'hero.title': 'Precyzyjna chemia do lakieru, kół i wnętrza.',
    'hero.subtitle':
      'Koncentraty o kontrolowanym pH dla studiów detailingu, myjni bezdotykowych i wymagających kierowców w całej Polsce. Złóż zamówienie lub zapytaj o dobór — zgłoszenie trafia od razu na Telegram właściciela.',
    'hero.ctaPrimary': 'Wyślij zgłoszenie w 30 sek.',
    'hero.ctaSecondary': 'Przeglądaj formuły ↓',
    'hero.spec1Label': 'ZAKRES pH',
    'hero.spec2Label': 'ROZCIEŃCZENIE',
    'hero.spec2Val': 'do 1:100',
    'hero.spec3Label': 'ODPOWIEDŹ',
    'hero.spec3Val': '< 15 min (TG)',
    'page.title': 'KORO — Laboratorium Chemii Samochodowej | Kraków, Polska',
    'strip.item1': 'Karty charakterystyki (MSDS) i faktura VAT 23% do każdego zamówienia B2B',
    'strip.item2': 'Bezpieczne dla wosków, folii PPF i powłok ceramicznych (formuły bez NTA)',
    'strip.item3': 'Odbiór osobisty Kraków (ul. Igołomska) lub wysyłka tego samego dnia',
    'catalog.eyebrow': 'KATALOG FORMUŁ // 2026',
    'catalog.title': 'Dobór chemii według etapu pracy',
    'catalog.tierRetail': 'Detailing (0.5–1 L)',
    'catalog.tierB2b': 'B2B / Kanistry (5–20 L)',
    'cat.all': 'Wszystkie',
    'cat.wash': 'Piany i Mycie',
    'cat.ceramic': 'Ceramika i Ochrona',
    'cat.wheels': 'Koła i Deironizacja',
    'cat.interior': 'Wnętrze i Skóra',
    'lab.eyebrow': 'PROTOKÓŁ KORO // KONTROLA pH',
    'lab.title': 'Nie sprzedajemy przypadkowych mieszanek. Liczy się bilans chemiczny.',
    'lab.copy':
      'W polskich warunkach drogowych (sól zimą, pył z klocków, twarda woda na myjniach) sama piana nie wystarczy. Każdy produkt ma przypisaną skalę pH, rekomendowane rozcieńczenie i czas reakcji na lakierze.',
    'lab.colStage': 'Etap',
    'lab.colProduct': 'Preparat',
    'lab.colDilution': 'Rozcieńczenie',
    'lab.colDwell': 'Czas',
    'b2b.eyebrow': 'GOTOWE ZESTAWY & B2B',
    'b2b.title': 'Pakiety startowe z szybką wyceną',
    'kit1.title': 'Zestaw Weekendowy Detailing',
    'kit1.desc': 'Piana neutralna 1 L + Szampon Reset 500 ml + Krwawa Felga 750 ml + Wnętrze Matte 500 ml.',
    'kit2.title': 'Zestaw Studio & Powłoka SiO2',
    'kit2.desc': 'Pełna dekontaminacja lakieru i kół + powłoka ceramiczna SiO2 50 ml + aplikatory zamszowe i kanister 5 L piany.',
    'kit3.title': 'Pakiet Myjnia Bezdotykowa (4 × 20 L)',
    'kit3.desc': 'Zestaw testowy pod dozowniki myjni: piana aktywna, wosk hydropolimerowy i chemia do felg. Faktura VAT 23%.',
    'kit.btn': 'Dodaj pakiet do zgłoszenia',
    'lead.eyebrow': 'BEZPOŚREDNIE ZAMÓWIENIE // TELEGRAM',
    'lead.title': 'Zostaw zgłoszenie właścicielowi',
    'lead.desc':
      'Nie musisz zakładać konta ani płacić z góry. Wybierz produkty albo opisz swój cel, a właściciel sklepu otrzyma Twoje zgłoszenie w Telegramie i oddzwoni z potwierdzeniem wysyłki lub rabatem B2B.',
    'basket.title': 'WYBRANE POZYCJE',
    'basket.clear': 'Wyczyść',
    'basket.empty': 'Brak wybranych produktów — możesz wysłać samo pytanie o dobór chemii.',
    'basket.totalLabel': 'Szacunkowa wartość',
    'tg.refresh': 'Odśwież',
    'form.typePrivate': 'Klient indywidualny',
    'form.typeB2b': 'Firma / Studio / Myjnia (VAT)',
    'form.nameLabel': 'Imię lub nazwa firmy *',
    'form.cityLabel': 'Miasto / Paczkomat',
    'form.channelLabel': 'Preferowany kontakt *',
    'form.chPhone': 'Telefon (+48)',
    'form.contactLabel': 'Numer telefonu lub @nick *',
    'form.nipLabel': 'NIP (do faktury VAT)',
    'form.objectLabel': 'Auto lub typ obiektu',
    'form.carLabel': 'Model auta lub zadanie (opcjonalnie)',
    'form.notesLabel': 'Komentarz lub pytania do doboru',
    'form.submit': 'Wyślij zgłoszenie do Telegrama →',
    'form.legal': 'Dane trafiają bezpośrednio do właściciela sklepu KORO. Zero spamu.',
    'dialog.dilution': 'Rozcieńczenie',
    'dialog.volume': 'Pojemność',
    'dialog.price': 'Cena',
    'dialog.protocol': 'PROTOKÓŁ UŻYCIA',
    'dialog.add': 'Dodaj do zgłoszenia',
    'card.spec': 'Specyfikacja',
    'card.add': '+ Dodaj',
    'card.added': 'Dodano ✓',
    'card.dilution': 'Rozcieńczenie',
    'tg.connected': 'Bot Telegram aktywny',
    'tg.needStart': 'Bot gotowy, czeka na /start od właściciela',
    'tg.offline': 'Brak połączenia z Telegram API',
    'tg.hintNeedStart': 'Otwórz bota @{bot} w Telegramie i wyślij /start, potem kliknij „Odśwież”.',
    'form.sending': 'Wysyłanie zgłoszenia…',
    'form.errRequired': 'Wpisz imię (min. 2 znaki) oraz dane kontaktowe.',
    'form.okDelivered': 'Zgłoszenie {id} wysłane bezpośrednio na Telegram właściciela!',
    'form.okSaved': 'Zgłoszenie {id} zapisane, ale właściciel nie aktywował jeszcze czatu z botem (@{bot}). Wyślij /start do bota.',
    'form.errServer': 'Nie udało się wysłać zgłoszenia. Sprawdź dane i spróbuj ponownie.',
  },
  ru: {
    'utility.shipping': 'Отправка за 24ч InPost & DPD • Бесплатно по Польше от 249 zł',
    'nav.catalog': 'Каталог',
    'nav.formulas': 'Стандарт Lab',
    'nav.b2b': 'Для моек и B2B',
    'nav.request': 'Оставить заявку',
    'hero.eyebrow': 'ПРОФ. АВТОХИМИЯ • ПРОИЗВОДСТВО ЕС',
    'hero.title': 'Точная химия для кузова, дисков и салона.',
    'hero.subtitle':
      'Концентраты с контролируемым pH для детейлинг-студий, автомоек и владельцев авто по всей Польше. Соберите набор или опишите задачу — заявка сразу улетает в Telegram владельцу магазина.',
    'hero.ctaPrimary': 'Отправить заявку за 30 сек.',
    'hero.ctaSecondary': 'Смотреть формулы ↓',
    'hero.spec1Label': 'ДИАПАЗОН pH',
    'hero.spec2Label': 'РАЗВЕДЕНИЕ',
    'hero.spec2Val': 'до 1:100',
    'hero.spec3Label': 'ОТВЕТ',
    'hero.spec3Val': '< 15 мин (TG)',
    'page.title': 'KORO — Лаборатория автохимии | Краков, Польша',
    'strip.item1': 'Паспорта безопасности (MSDS) и фактура VAT 23% для каждого B2B-заказа',
    'strip.item2': 'Безопасно для восков, полиуретановых плёнок PPF и керамики (без NTA)',
    'strip.item3': 'Самовывоз в Кракове (ул. Igołomska) или отправка по Польше в день заказа',
    'catalog.eyebrow': 'КАТАЛОГ ФОРМУЛ // 2026',
    'catalog.title': 'Подбор химии под этап работы',
    'catalog.tierRetail': 'Детейлинг (0.5–1 л)',
    'catalog.tierB2b': 'B2B / Канистры (5–20 л)',
    'cat.all': 'Все составы',
    'cat.wash': 'Пены и шампуни',
    'cat.ceramic': 'Керамика и защита',
    'cat.wheels': 'Диски и деиронизация',
    'cat.interior': 'Салон и кожа',
    'lab.eyebrow': 'ПРОТОКОЛ KORO // КОНТРОЛЬ pH',
    'lab.title': 'Никаких случайных смесей. Важен химический баланс.',
    'lab.copy':
      'В условиях польских дорог (зимняя соль, тормозная пыль, жёсткая вода на мойках) одной пены мало. У каждого состава указан точный pH, пропорция разведения и время выдержки на ЛКП.',
    'lab.colStage': 'Этап',
    'lab.colProduct': 'Состав',
    'lab.colDilution': 'Разведение',
    'lab.colDwell': 'Время',
    'b2b.eyebrow': 'ГОТОВЫЕ НАБОРЫ И B2B',
    'b2b.title': 'Стартовые пакеты с быстрым расчётом',
    'kit1.title': 'Набор Weekend Detailing',
    'kit1.desc': 'Нейтральная пена 1 л + Кислый шампунь 500 мл + Айрон-гель 750 мл + Интерьер 500 мл.',
    'kit2.title': 'Набор Studio & Керамика SiO2',
    'kit2.desc': 'Полная деконтаминация кузова и дисков + керамика SiO2 50 мл + замшевые аппликаторы и канистра 5 л пены.',
    'kit3.title': 'Пакет для бесконтактной мойки (4 × 20 л)',
    'kit3.desc': 'Тестовый комплект под дозаторы мойки: активная пена, гидровоск и химия для дисков. Фактура VAT 23%.',
    'kit.btn': 'Добавить набор в заявку',
    'lead.eyebrow': 'ПРЯМОЙ ЗАКАЗ // TELEGRAM',
    'lead.title': 'Оставить заявку владельцу',
    'lead.desc':
      'Не нужно регистрироваться или платить картой на сайте. Выберите составы или просто опишите задачу — владелец получит заявку в Telegram и свяжется для подтверждения доставки или B2B-скидки.',
    'basket.title': 'ВЫБРАННЫЕ ПОЗИЦИИ',
    'basket.clear': 'Очистить',
    'basket.empty': 'Позиции не выбраны — можно отправить просто вопрос по подбору химии.',
    'basket.totalLabel': 'Ориентировочная сумма',
    'tg.refresh': 'Обновить',
    'form.typePrivate': 'Частный клиент',
    'form.typeB2b': 'Компания / Студия / Мойка (VAT)',
    'form.nameLabel': 'Имя или название компании *',
    'form.cityLabel': 'Город / Пачкомат InPost',
    'form.channelLabel': 'Удобный способ связи *',
    'form.chPhone': 'Телефон (+48)',
    'form.contactLabel': 'Номер телефона или @ник *',
    'form.nipLabel': 'NIP (для фактуры VAT)',
    'form.objectLabel': 'Авто или тип объекта',
    'form.carLabel': 'Модель авто или задача (необязательно)',
    'form.notesLabel': 'Комментарий или вопрос по подбору',
    'form.submit': 'Отправить заявку в Telegram →',
    'form.legal': 'Заявка уходит напрямую владельцу магазина KORO. Без спама.',
    'dialog.dilution': 'Разведение',
    'dialog.volume': 'Объём',
    'dialog.price': 'Цена',
    'dialog.protocol': 'ПРОТОКОЛ ПРИМЕНЕНИЯ',
    'dialog.add': 'Добавить в заявку',
    'card.spec': 'Спецификация',
    'card.add': '+ В заявку',
    'card.added': 'Добавлено ✓',
    'card.dilution': 'Разведение',
    'tg.connected': 'Telegram-бот подключён',
    'tg.needStart': 'Бот готов, ждёт /start от владельца',
    'tg.offline': 'Нет связи с Telegram API',
    'tg.hintNeedStart': 'Откройте бота @{bot} в Telegram, нажмите /start и затем «Обновить».',
    'form.sending': 'Отправляем заявку…',
    'form.errRequired': 'Укажите имя (минимум 2 символа) и контакт для связи.',
    'form.okDelivered': 'Заявка {id} отправлена напрямую в Telegram владельцу!',
    'form.okSaved': 'Заявка {id} сохранена на сервере, но владелец ещё не нажал /start в боте (@{bot}).',
    'form.errServer': 'Не удалось отправить заявку. Проверьте поля и попробуйте ещё раз.',
  },
  en: {
    'utility.shipping': '24h Dispatch InPost & DPD • Free PL shipping from 249 zł',
    'nav.catalog': 'Catalog',
    'nav.formulas': 'Lab Standard',
    'nav.b2b': 'Car Wash & B2B',
    'nav.request': 'Send Request',
    'hero.eyebrow': 'DETAILING FORMULAS • EU MANUFACTURED',
    'hero.title': 'Precision chemistry for paint, wheels & interior.',
    'hero.subtitle':
      'pH-controlled concentrates for detailing studios, touchless car washes, and enthusiasts across Poland. Build a list or ask for advice — your request goes straight to the owner on Telegram.',
    'hero.ctaPrimary': 'Send request in 30s',
    'hero.ctaSecondary': 'Browse formulas ↓',
    'hero.spec1Label': 'pH RANGE',
    'hero.spec2Label': 'DILUTION',
    'hero.spec2Val': 'up to 1:100',
    'hero.spec3Label': 'REPLY TIME',
    'hero.spec3Val': '< 15 min (TG)',
    'page.title': 'KORO — Automotive Chemistry Lab | Kraków, Poland',
    'strip.item1': 'MSDS safety sheets & 23% Polish VAT invoice included for B2B orders',
    'strip.item2': 'Safe for waxes, PPF films, and ceramic coatings (NTA-free)',
    'strip.item3': 'Local pickup in Kraków (Igołomska St.) or same-day shipping',
    'catalog.eyebrow': 'FORMULA CATALOG // 2026',
    'catalog.title': 'Chemistry by detailing stage',
    'catalog.tierRetail': 'Detailing (0.5–1 L)',
    'catalog.tierB2b': 'B2B / Canisters (5–20 L)',
    'cat.all': 'All Formulas',
    'cat.wash': 'Foams & Shampoos',
    'cat.ceramic': 'Ceramic & Protection',
    'cat.wheels': 'Wheels & Iron',
    'cat.interior': 'Interior & Trim',
    'lab.eyebrow': 'KORO PROTOCOL // pH CONTROL',
    'lab.title': 'No generic blends. Balanced chemistry matters.',
    'lab.copy':
      'Polish road conditions—winter salt, brake dust, hard wash-bay water—require calibrated chemistry. Every KORO formula ships with verified pH, dilution ratio, and dwell time.',
    'lab.colStage': 'Stage',
    'lab.colProduct': 'Formula',
    'lab.colDilution': 'Dilution',
    'lab.colDwell': 'Dwell',
    'b2b.eyebrow': 'READY KITS & B2B',
    'b2b.title': 'Starter packs with instant quote',
    'kit1.title': 'Weekend Detailing Kit',
    'kit1.desc': 'Neutral Foam 1 L + Reset Shampoo 500 ml + Iron Gel 750 ml + Matte Interior 500 ml.',
    'kit2.title': 'Studio & SiO2 Ceramic Kit',
    'kit2.desc': 'Full paint & wheel decontamination + SiO2 50 ml ceramic coating + suede applicators & 5 L snow foam.',
    'kit3.title': 'Touchless Car Wash Pack (4 × 20 L)',
    'kit3.desc': 'Dosing-ready trial set: active foam, polymer hydro-wax, and rim cleaner. 23% VAT invoice.',
    'kit.btn': 'Add kit to request',
    'lead.eyebrow': 'DIRECT ORDER // TELEGRAM',
    'lead.title': 'Send a request to the owner',
    'lead.desc':
      'No account or prepayment needed. Pick your formulas or describe your goal — the store owner gets your request in Telegram and confirms shipping or B2B pricing.',
    'basket.title': 'SELECTED ITEMS',
    'basket.clear': 'Clear',
    'basket.empty': 'No items selected — you can still send a product consultation request.',
    'basket.totalLabel': 'Estimated total',
    'tg.refresh': 'Refresh',
    'form.typePrivate': 'Private driver',
    'form.typeB2b': 'Company / Studio / Wash (VAT)',
    'form.nameLabel': 'Name or company *',
    'form.cityLabel': 'City / InPost Locker',
    'form.channelLabel': 'Preferred contact *',
    'form.chPhone': 'Phone (+48)',
    'form.contactLabel': 'Phone number or @handle *',
    'form.nipLabel': 'Polish NIP (VAT ID)',
    'form.objectLabel': 'Vehicle or facility type',
    'form.carLabel': 'Car model or task (optional)',
    'form.notesLabel': 'Notes or questions',
    'form.submit': 'Send request to Telegram →',
    'form.legal': 'Sent directly to the KORO store owner. Zero spam.',
    'dialog.dilution': 'Dilution',
    'dialog.volume': 'Volume',
    'dialog.price': 'Price',
    'dialog.protocol': 'APPLICATION PROTOCOL',
    'dialog.add': 'Add to request',
    'card.spec': 'Specs',
    'card.add': '+ Add',
    'card.added': 'Added ✓',
    'card.dilution': 'Dilution',
    'tg.connected': 'Telegram bot connected',
    'tg.needStart': 'Bot ready, awaiting /start from owner',
    'tg.offline': 'Telegram API unreachable',
    'tg.hintNeedStart': 'Open @{bot} in Telegram, send /start, then click "Refresh".',
    'form.sending': 'Sending request…',
    'form.errRequired': 'Please enter your name (min 2 chars) and contact details.',
    'form.okDelivered': 'Request {id} delivered straight to the owner on Telegram!',
    'form.okSaved': 'Request {id} saved, but the owner has not sent /start to @{bot} yet.',
    'form.errServer': 'Could not submit request. Please check fields and try again.',
  },
};

const state = {
  lang: 'pl',
  tier: 'retail',
  category: 'all',
  customerType: 'private',
  basket: new Map(), // key -> { sku, name, volume, qty, unit_price_pln }
  activeDialogProductId: null,
  lastTg: null,
};

const els = {
  grid: document.getElementById('product-grid'),
  basketItems: document.getElementById('basket-items'),
  basketTotal: document.getElementById('basket-total'),
  basketTotalVal: document.getElementById('basket-total-value'),
  clearBasketBtn: document.getElementById('clear-basket-btn'),
  navCartCount: document.getElementById('nav-cart-count'),
  tgPill: document.getElementById('tg-pill'),
  tgPillText: document.getElementById('tg-pill-text'),
  tgHint: document.getElementById('tg-hint'),
  tgRefreshBtn: document.getElementById('tg-refresh-btn'),
  orderForm: document.getElementById('order-form'),
  submitBtn: document.getElementById('submit-btn'),
  feedback: document.getElementById('form-feedback'),
  b2bRow: document.getElementById('b2b-row'),
  privateCarField: document.getElementById('private-object-field'),
  channelSelect: document.getElementById('input-channel'),
  contactInput: document.getElementById('input-contact'),
  dialog: document.getElementById('spec-dialog'),
  dialogCloseBtn: document.getElementById('dialog-close-btn'),
  dialogAddBtn: document.getElementById('dialog-add-btn'),
};

function t(key, vars = {}) {
  let str = (I18N[state.lang] && I18N[state.lang][key]) || I18N.pl[key] || key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replaceAll(`{${k}}`, String(v));
  }
  return str;
}

function applyTranslations() {
  document.documentElement.lang = state.lang;
  document.title = t('page.title');
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    if (node.id === 'nav-cart-count' || node.classList.contains('nav-cta')) {
      const countEl = document.getElementById('nav-cart-count');
      node.textContent = `${t(key)} `;
      if (countEl) node.appendChild(countEl);
    } else {
      node.textContent = t(key);
    }
  });
  syncBasketTranslations();
  renderProducts();
  renderBasket();
  renderTelegramStatus();
  checkTelegramHealth();
}

function syncBasketTranslations() {
  for (const item of state.basket.values()) {
    const matchedKit = Object.values(KITS).find((k) => k.sku === item.sku);
    if (matchedKit) {
      item.name = matchedKit.names[state.lang] || matchedKit.names.pl;
      continue;
    }
    const matchedProd = PRODUCTS.find(
      (p) => p.tiers.retail.sku === item.sku || p.tiers.b2b.sku === item.sku
    );
    if (matchedProd) {
      item.name = (matchedProd.text[state.lang] || matchedProd.text.pl).name;
    }
  }
}

function renderProducts() {
  const filtered =
    state.category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === state.category);

  els.grid.replaceChildren();
  for (const product of filtered) {
    const tierInfo = product.tiers[state.tier];
    const copy = product.text[state.lang] || product.text.pl;
    const phPct = Math.max(4, Math.min(96, (product.ph / 14) * 100));

    const card = document.createElement('article');
    card.className = 'product-card';

    const media = document.createElement('div');
    media.className = 'product-card__media';

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = copy.name;
    img.width = 480;
    img.height = 360;
    img.loading = 'lazy';

    const skuTag = document.createElement('span');
    skuTag.className = 'product-card__sku';
    skuTag.textContent = tierInfo.sku;

    media.append(img, skuTag);

    const body = document.createElement('div');
    body.className = 'product-card__body';

    const title = document.createElement('h3');
    title.className = 'product-card__title';
    title.textContent = copy.name;

    const desc = document.createElement('p');
    desc.className = 'product-card__desc';
    desc.textContent = copy.short;

    const phMeter = document.createElement('div');
    phMeter.className = 'ph-meter';

    const phRow = document.createElement('div');
    phRow.className = 'ph-meter__row';
    const phLabel = document.createElement('span');
    phLabel.className = 'mono-val';
    phLabel.textContent = `pH ${product.ph.toFixed(1)}`;
    const dilLabel = document.createElement('span');
    dilLabel.className = 'mono-val';
    dilLabel.textContent = `${t('card.dilution')}: ${product.dilution}`;
    phRow.append(phLabel, dilLabel);

    const phTrack = document.createElement('div');
    phTrack.className = 'ph-track';
    const phMarker = document.createElement('span');
    phMarker.className = 'ph-marker';
    phMarker.style.left = `${phPct}%`;
    phTrack.append(phMarker);
    phMeter.append(phRow, phTrack);

    const footer = document.createElement('div');
    footer.className = 'product-card__footer';

    const priceBox = document.createElement('div');
    priceBox.className = 'product-price';
    const priceStrong = document.createElement('strong');
    priceStrong.textContent = `${tierInfo.pricePln} zł`;
    const volSpan = document.createElement('span');
    volSpan.textContent = tierInfo.volume;
    priceBox.append(priceStrong, volSpan);

    const actions = document.createElement('div');
    actions.className = 'product-actions';

    const specBtn = document.createElement('button');
    specBtn.type = 'button';
    specBtn.className = 'btn btn--outline btn-sm';
    specBtn.textContent = t('card.spec');
    specBtn.addEventListener('click', () => openSpecDialog(product.id));

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn btn--primary btn-sm';
    addBtn.textContent = t('card.add');
    addBtn.addEventListener('click', () => {
      addProductToBasket(product);
      addBtn.textContent = t('card.added');
      window.setTimeout(() => {
        addBtn.textContent = t('card.add');
      }, 900);
    });

    actions.append(specBtn, addBtn);
    footer.append(priceBox, actions);
    body.append(title, desc, phMeter, footer);
    card.append(media, body);
    els.grid.append(card);
  }
}

function addProductToBasket(product) {
  const tierInfo = product.tiers[state.tier];
  const copy = product.text[state.lang] || product.text.pl;
  const existing = state.basket.get(tierInfo.sku);
  if (existing) {
    existing.qty += 1;
  } else {
    state.basket.set(tierInfo.sku, {
      sku: tierInfo.sku,
      name: copy.name,
      volume: tierInfo.volume,
      qty: 1,
      unit_price_pln: tierInfo.pricePln,
    });
  }
  renderBasket();
}

function addKitToBasket(kitKey) {
  const kit = KITS[kitKey];
  if (!kit) return;
  const existing = state.basket.get(kit.sku);
  if (existing) {
    existing.qty += 1;
  } else {
    state.basket.set(kit.sku, {
      sku: kit.sku,
      name: kit.names[state.lang] || kit.names.pl,
      volume: kit.volume,
      qty: 1,
      unit_price_pln: kit.pricePln,
    });
  }
  renderBasket();
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
}

function renderBasket() {
  const items = Array.from(state.basket.values());
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.unit_price_pln, 0);

  if (totalCount > 0) {
    els.navCartCount.hidden = false;
    els.navCartCount.textContent = String(totalCount);
    els.clearBasketBtn.hidden = false;
    els.basketTotal.hidden = false;
    els.basketTotalVal.textContent = `${totalPrice.toFixed(0)} zł`;
  } else {
    els.navCartCount.hidden = true;
    els.clearBasketBtn.hidden = true;
    els.basketTotal.hidden = true;
  }

  els.basketItems.replaceChildren();
  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'basket-empty';
    empty.textContent = t('basket.empty');
    els.basketItems.append(empty);
    return;
  }

  for (const item of items) {
    const row = document.createElement('div');
    row.className = 'basket-item';

    const info = document.createElement('div');
    const nameEl = document.createElement('strong');
    nameEl.textContent = item.name;
    const metaEl = document.createElement('div');
    metaEl.className = 'mono-tag';
    metaEl.textContent = `${item.volume} • ${item.unit_price_pln} zł`;
    info.append(nameEl, metaEl);

    const qtyBox = document.createElement('div');
    qtyBox.className = 'qty-controls';

    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.className = 'qty-btn';
    minusBtn.textContent = '−';
    minusBtn.setAttribute('aria-label', 'Zmniejsz ilość');
    minusBtn.addEventListener('click', () => {
      item.qty -= 1;
      if (item.qty <= 0) state.basket.delete(item.sku);
      renderBasket();
    });

    const qtyText = document.createElement('span');
    qtyText.className = 'mono-val';
    qtyText.textContent = String(item.qty);

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.className = 'qty-btn';
    plusBtn.textContent = '+';
    plusBtn.setAttribute('aria-label', 'Zwiększ ilość');
    plusBtn.addEventListener('click', () => {
      item.qty += 1;
      renderBasket();
    });

    qtyBox.append(minusBtn, qtyText, plusBtn);
    row.append(info, qtyBox);
    els.basketItems.append(row);
  }
}

function openSpecDialog(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  state.activeDialogProductId = productId;

  const tierInfo = product.tiers[state.tier];
  const copy = product.text[state.lang] || product.text.pl;

  document.getElementById('dialog-sku').textContent = tierInfo.sku;
  const imgEl = document.getElementById('dialog-img');
  imgEl.src = product.image;
  imgEl.alt = copy.name;
  document.getElementById('dialog-title').textContent = copy.name;
  document.getElementById('dialog-desc').textContent = copy.short;
  document.getElementById('dialog-ph').textContent = product.ph.toFixed(1);
  document.getElementById('dialog-dilution').textContent = product.dilution;
  document.getElementById('dialog-volume').textContent = tierInfo.volume;
  document.getElementById('dialog-price').textContent = `${tierInfo.pricePln} zł`;
  document.getElementById('dialog-protocol').textContent = copy.protocol;

  els.dialog.showModal();
}

function renderTelegramStatus() {
  const tg = state.lastTg;
  els.tgHint.hidden = true;
  els.tgHint.replaceChildren();

  if (!tg) return;

  if (tg.bot_reachable && tg.chat_connected) {
    els.tgPill.classList.add('is-online');
    els.tgPillText.textContent = `${t('tg.connected')} (@${tg.bot_username})`;
  } else if (tg.bot_reachable && !tg.chat_connected) {
    els.tgPill.classList.remove('is-online');
    els.tgPillText.textContent = t('tg.needStart');
    if (tg.bot_username) {
      els.tgHint.hidden = false;
      els.tgHint.textContent = t('tg.hintNeedStart', { bot: tg.bot_username });
    }
  } else {
    els.tgPill.classList.remove('is-online');
    els.tgPillText.textContent = t('tg.offline');
  }
}

async function checkTelegramHealth() {
  try {
    const resp = await fetch('/api/health');
    if (!resp.ok) throw new Error('health_http_error');
    const data = await resp.json();
    state.lastTg = data.telegram || {};
    renderTelegramStatus();
  } catch {
    state.lastTg = { bot_reachable: false, chat_connected: false };
    renderTelegramStatus();
  }
}

function showFeedback(kind, text) {
  els.feedback.hidden = false;
  els.feedback.className = `form-feedback is-${kind}`;
  els.feedback.textContent = text;
}

function bindEvents() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang || 'pl';
      document.querySelectorAll('.lang-btn').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      applyTranslations();
    });
  });

  document.querySelectorAll('[data-tier]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.tier = btn.dataset.tier || 'retail';
      document.querySelectorAll('[data-tier]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderProducts();
    });
  });

  document.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category || 'all';
      document.querySelectorAll('[data-category]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      renderProducts();
    });
  });

  document.querySelectorAll('.kit-select-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      addKitToBasket(btn.dataset.kit);
    });
  });

  els.clearBasketBtn.addEventListener('click', () => {
    state.basket.clear();
    renderBasket();
  });

  document.querySelectorAll('[data-customer-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.customerType = btn.dataset.customerType || 'private';
      document.querySelectorAll('[data-customer-type]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      const isB2b = state.customerType === 'b2b';
      els.b2bRow.hidden = !isB2b;
      els.privateCarField.hidden = isB2b;
    });
  });

  els.channelSelect.addEventListener('change', () => {
    const channel = els.channelSelect.value;
    if (channel === 'phone' || channel === 'whatsapp') {
      els.contactInput.type = 'tel';
      els.contactInput.placeholder = '+48 500 600 700';
    } else if (channel === 'email') {
      els.contactInput.type = 'email';
      els.contactInput.placeholder = 'jan@studio-detailing.pl';
    } else {
      els.contactInput.type = 'text';
      els.contactInput.placeholder = '@username';
    }
  });

  els.tgRefreshBtn.addEventListener('click', checkTelegramHealth);

  els.dialogCloseBtn.addEventListener('click', () => els.dialog.close());
  els.dialog.addEventListener('click', (event) => {
    if (event.target === els.dialog) {
      els.dialog.close();
    }
  });
  els.dialogAddBtn.addEventListener('click', () => {
    const product = PRODUCTS.find((p) => p.id === state.activeDialogProductId);
    if (product) addProductToBasket(product);
    els.dialog.close();
  });

  els.orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(els.orderForm);
    const name = String(formData.get('name') || '').trim();
    const contact = String(formData.get('contact') || '').trim();

    if (name.length < 2 || contact.length < 3) {
      showFeedback('error', t('form.errRequired'));
      return;
    }

    const carOrBusiness =
      state.customerType === 'b2b'
        ? String(formData.get('car_or_business') || '').trim()
        : String(formData.get('car_private') || '').trim();

    const payload = {
      name,
      contact,
      contact_channel: String(formData.get('contact_channel') || 'phone'),
      customer_type: state.customerType,
      city: String(formData.get('city') || '').trim(),
      nip: state.customerType === 'b2b' ? String(formData.get('nip') || '').trim() : '',
      car_or_business: carOrBusiness,
      notes: String(formData.get('notes') || '').trim(),
      items: Array.from(state.basket.values()),
      lang: state.lang,
    };

    els.submitBtn.disabled = true;
    showFeedback('warn', t('form.sending'));

    try {
      const resp = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await resp.json();
      if (!resp.ok || !result.ok) {
        throw new Error(result.error || 'submit_failed');
      }

      if (result.telegram_delivered) {
        showFeedback('success', t('form.okDelivered', { id: result.lead_id }));
        els.orderForm.reset();
        state.basket.clear();
        renderBasket();
      } else {
        showFeedback(
          'warn',
          t('form.okSaved', {
            id: result.lead_id,
            bot: result.bot_username || 'bot',
          })
        );
      }
      checkTelegramHealth();
    } catch {
      showFeedback('error', t('form.errServer'));
    } finally {
      els.submitBtn.disabled = false;
    }
  });
}

bindEvents();
applyTranslations();
