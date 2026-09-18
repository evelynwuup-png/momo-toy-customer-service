import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const unsupported = {
  en: "I’m sorry, but I don’t have confirmed information about that yet. Please leave your email so our official team can follow up.",
  zh: '很抱歉，目前我没有关于该信息的确切资料。请留下你的邮箱，以便官方团队后续跟进。'
};

const emailReply = {
  en: 'Thanks, I’ve noted your email. Our official team can follow up with you.',
  zh: '谢谢，我已经记录你的邮箱。官方团队会进一步联系你。'
};

const context = { window: {} };
const faqSource = readFileSync(new URL('../faq-data.js', import.meta.url), 'utf8');
vm.runInNewContext(faqSource, context);
const faqLibrary = context.window.MOMO_TOY_FAQ || [];

export function getFaqCount() {
  return faqLibrary.length;
}

export function isEmail(message) {
  return /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/.test(message);
}

function normalize(text) {
  return text.toLowerCase().replace(/[?？!！,，。\.\s]/g, '');
}

export function getReply(message) {
  if (isEmail(message)) return emailReply;
  const normalized = normalize(message);
  if (['store', 'offline store', '线下门店', '门店'].some((keyword) => normalized.includes(normalize(keyword)))) return unsupported;
  if (['probability', 'odds', 'chance', '概率', '几率'].some((keyword) => normalized.includes(normalize(keyword)))) return unsupported;

  let best = null;
  let bestScore = 0;
  for (const entry of faqLibrary) {
    const score = entry.keywords.reduce((bestKeywordScore, keyword) => {
      const normalizedKeyword = normalize(keyword);
      return normalized.includes(normalizedKeyword) ? Math.max(bestKeywordScore, normalizedKeyword.length) : bestKeywordScore;
    }, 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best ? { en: best.en, zh: best.zh } : unsupported;
}
