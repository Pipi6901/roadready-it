# Тексты пейволла RevenueCat (RR IT)

Шесть локалей, те же, что в интерфейсе приложения: `it`, `en`, `ro`, `uk`, `es`, `ar`.
Локаль по умолчанию в редакторе — `en` (подставляется, если язык телефона не из списка).

Содержание под нашу модель: бесплатны уроки, перевод, быстрый тест и офлайн (`FREE_TIER`
в `src/constants/rules.ts`); Pro даёт симуляцию экзамена и работу над ошибками (Weak Spots).
Описание в App Store (`docs/app-store-it.md`) написано так же: если они разойдутся,
расхождение поймает ревью.

Параметры экзамена: 30 утверждений, 20 минут, не более 3 ошибок (DM 27.10.2021).
Правило ошибок: вопрос уходит после двух верных ответов подряд (как в `weak.completeSubtitle`).

**Скидку числом не вписывать.** При 6,99 € в месяц и 55,99 € в год экономия около 33%,
но цену менять можно. Поставь переменную скидки из списка переменных редактора: она
считается из реальных цен.

**Ошибки, на которые уже наступили в польском проекте**
- У каждого текста есть вариант `intro_offer` (его видят новые пользователи). Он правится
  отдельно: в конструкторе переключи селектор *Offer* и проверь **оба** состояния, иначе
  новый пользователь увидит шаблонный текст.
- Без нажатия *Publish* ничего не меняется.
- Язык пейволла равен языку телефона, а не языку приложения.

---

## it

| Поле | Текст |
|---|---|
| Заголовок | Allenati per l'esame vero |
| Пункт 1 | **Simulazione d'esame come alla Motorizzazione** · 30 affermazioni, 20 minuti, al massimo 3 errori |
| Пункт 2 | **Gli errori tornano finché non li sai** · La domanda esce dopo due risposte giuste di fila |
| Пункт 3 | **Tentativi illimitati** · Rifai la simulazione quante volte vuoi |
| Кнопка | Inizia 3 giorni gratis |
| Пропустить | Non ora |
| Месяц / Год | Mensile / Annuale |
| Низ | Ripristina acquisti · Termini · Privacy |

## en

| Поле | Текст |
|---|---|
| Заголовок | Train for the real exam |
| Пункт 1 | **Exam simulation like the real one** · 30 statements, 20 minutes, at most 3 mistakes |
| Пункт 2 | **Mistakes come back until you know them** · A question leaves after two correct answers in a row |
| Пункт 3 | **Unlimited attempts** · Sit the simulation as often as you need |
| Кнопка | Start 3 days free |
| Пропустить | Not now |
| Месяц / Год | Monthly / Yearly |
| Низ | Restore purchases · Terms · Privacy |

## ro

| Поле | Текст |
|---|---|
| Заголовок | Exersează pentru examenul adevărat |
| Пункт 1 | **Simulare de examen ca la Motorizzazione** · 30 de enunțuri, 20 de minute, cel mult 3 greșeli |
| Пункт 2 | **Greșelile revin până le știi** · Întrebarea dispare după două răspunsuri corecte la rând |
| Пункт 3 | **Încercări nelimitate** · Refă simularea de câte ori vrei |
| Кнопка | Începe 3 zile gratuit |
| Пропустить | Nu acum |
| Месяц / Год | Lunar / Anual |
| Низ | Restaurează achizițiile · Termeni · Confidențialitate |

## uk

| Поле | Текст |
|---|---|
| Заголовок | Готуйся до справжнього іспиту |
| Пункт 1 | **Симуляція іспиту, як у Motorizzazione** · 30 тверджень, 20 хвилин, не більше 3 помилок |
| Пункт 2 | **Помилки повертаються, доки не засвоїш** · Запитання зникає після двох правильних відповідей поспіль |
| Пункт 3 | **Без обмежень на спроби** · Проходь симуляцію стільки разів, скільки потрібно |
| Кнопка | Почати 3 дні безкоштовно |
| Пропустить | Не зараз |
| Месяц / Год | Щомісяця / Щороку |
| Низ | Відновити покупки · Умови · Приватність |

## es

| Поле | Текст |
|---|---|
| Заголовок | Entrena para el examen de verdad |
| Пункт 1 | **Simulacro como en la Motorizzazione** · 30 enunciados, 20 minutos, como máximo 3 errores |
| Пункт 2 | **Los fallos vuelven hasta que los dominas** · Una pregunta desaparece tras dos aciertos seguidos |
| Пункт 3 | **Intentos ilimitados** · Haz el simulacro tantas veces como necesites |
| Кнопка | Empezar 3 días gratis |
| Пропустить | Ahora no |
| Месяц / Год | Mensual / Anual |
| Низ | Restaurar compras · Términos · Privacidad |

## ar

| Поле | Текст |
|---|---|
| Заголовок | تدرّب للامتحان الحقيقي |
| Пункт 1 | **محاكاة للامتحان كما في الـ Motorizzazione** · 30 عبارة، 20 دقيقة، وثلاثة أخطاء كحدّ أقصى |
| Пункт 2 | **الأخطاء تعود حتى تتقنها** · يختفي السؤال بعد إجابتين صحيحتين متتاليتين |
| Пункт 3 | **محاولات غير محدودة** · أعد المحاكاة كما تشاء |
| Кнопка | ابدأ 3 أيام مجانًا |
| Пропустить | ليس الآن |
| Месяц / Год | شهريًا / سنويًا |
| Низ | استعادة المشتريات · الشروط · الخصوصية |

Арабский: в конструкторе проверь, что экран отзеркалился (RTL) и слово Motorizzazione
не сломало порядок слов в строке; если сломало, замени на «في الامتحان الرسمي».

---

## Ссылки в подвале

Одинаковые для всех локалей, страницы двуязычные:

```
Terms:   https://pmoffice.space/roadready-it-terms.html
Privacy: https://pmoffice.space/roadready-it-privacy.html
```

## Что проверить после правки

- на устройстве цены должны быть **6,99 €** и **55,99 €**, а не доллары из превью
- кнопка про три дня подкреплена вводным предложением в обоих продуктах в App Store
  Connect (Introductory Offer, 3 days free): иначе она обещает то, чего нет
- слово Motorizzazione оставлено во всех языках намеренно: это название ведомства
