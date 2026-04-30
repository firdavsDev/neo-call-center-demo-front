import type { DemoTimeline } from '../demoTimeline'

export const DEMO_TIMELINE_EN: DemoTimeline = {
  duration: 92,
  transcript: [
    { t: 1.0,  speaker: 'Operator', text: "Hello, thank you for calling Raqamli Bank. My name is Diyora. How can I assist you today?" },
    { t: 6.5,  speaker: 'Mijoz',    text: "Hi. I'd like to open a credit card, but I have some questions about the interest rates." },
    { t: 11.5, speaker: 'Operator', text: "Of course, I'll be happy to help. Could I start by getting your full name?" },
    { t: 15.0, speaker: 'Mijoz',    text: "Bekzod Karimov. I'm based in Tashkent." },
    { t: 18.5, speaker: 'Operator', text: "Thank you, Bekzod. We have the Premium Plus credit card with an annual rate of 24%." },
    { t: 24.0, speaker: 'Mijoz',    text: "24%? That's quite expensive! Other banks are offering 18–19%. What do you have to say about that?" },
    { t: 30.0, speaker: 'Operator', text: "I understand, Bekzod. However, our card includes a 60-day interest-free grace period — if you pay off the balance within that time, no interest is charged at all." },
    { t: 38.0, speaker: 'Mijoz',    text: "Hmm, interesting. But I'm still not sure I can decide right now. I need to think about it." },
    { t: 43.0, speaker: 'Operator', text: "Absolutely. I should also mention — this week we're waiving the annual fee for new customers and offering a 500,000 sum cashback bonus." },
    { t: 51.0, speaker: 'Mijoz',    text: "What cashback rates are we talking about? And which purchases qualify?" },
    { t: 56.0, speaker: 'Operator', text: "5% on restaurants, groceries, and fuel; 1% on everything else. The monthly cap is 200,000 sum." },
    { t: 63.5, speaker: 'Mijoz',    text: "Alright. Do I need to provide my passport details?" },
    { t: 67.0, speaker: 'Operator', text: "Yes — AB 1234567, city of Tashkent. Is that correct?" },
    { t: 71.0, speaker: 'Mijoz',    text: "That's correct. What's the next step?" },
    { t: 74.0, speaker: 'Operator', text: "I'll send you the application link via SMS. If you complete it within 24 hours, all bonuses will be retained." },
    { t: 81.0, speaker: 'Mijoz',    text: "Great, thank you. I'll be waiting." },
    { t: 84.0, speaker: 'Operator', text: "Have a wonderful day, Bekzod. Thank you for choosing Raqamli Bank." },
  ],
  suggestions: [
    {
      t: 26.0,
      trigger: 'expensive',
      bullets: [
        'Remind the customer about the 60-day interest-free grace period — no interest if paid within that window.',
        'Compare with competitors: the Raqamli Bank Premium Plus card has zero hidden fees.',
        'Offer to waive the annual service fee.',
      ],
    },
    {
      t: 39.5,
      trigger: 'need to think',
      bullets: [
        'Highlight the time-limited promotion (cashback bonus, annual fee waiver).',
        'Explain that premium benefits are preserved only if the application is submitted within 24 hours.',
        "Try to identify the customer's primary need — it will help them decide.",
      ],
    },
    {
      t: 52.5,
      trigger: 'what cashback',
      bullets: [
        '5% on restaurants, groceries, fuel. 1% on all other purchases.',
        'State the monthly maximum cap clearly: 200,000 sum.',
        'Emphasise that cashback is credited to the card automatically.',
      ],
    },
  ],
  sentimentShifts: [
    { t: 0,  sentiment: 'neutral' },
    { t: 25, sentiment: 'negative' },
    { t: 44, sentiment: 'neutral' },
    { t: 65, sentiment: 'positive' },
  ],
  intakeAppears: 19.5,
  intakeData: {
    name: 'Bekzod Karimov',
    passport: 'AB 1234567',
    region: 'Toshkent sh.',
  },
  compliance: [
    { id: 'greet',     label: 'Greeting',               tickAt: 4  },
    { id: 'intro',     label: 'Self-introduction',      tickAt: 4  },
    { id: 'name',      label: "Customer name captured", tickAt: 17 },
    { id: 'rate',      label: 'Rate disclosed',         tickAt: 20 },
    { id: 'fees',      label: 'Fees explained',         tickAt: 32 },
    { id: 'promo',     label: 'Promotion offered',      tickAt: 45 },
    { id: 'passport',  label: 'Passport confirmed',     tickAt: 68 },
    { id: 'next-step', label: 'Next step outlined',     tickAt: 75 },
    { id: 'farewell',  label: 'Farewell',               tickAt: 86 },
  ],
  summary: {
    natija: 'Customer agreed to open a Premium Plus credit card. Application link sent via SMS.',
    etirozlar: [
      'High interest rate (24%) — customer compared with other banks.',
      'Customer was not ready to decide immediately — asked for time to think.',
    ],
    etirozlarBartaraf: 'Objections successfully resolved through the 60-day interest-free period and promotional cashback offer.',
    keyingiQadam: 'Complete the application link within 24 hours. Diyora will follow up tomorrow at 14:00.',
    complianceHolati: { passed: 9, total: 9 },
    callDuration: '01:32',
    sentiment: 'positive',
    sentimentJourney: ['neutral', 'negative', 'neutral', 'positive'],
  },
}
