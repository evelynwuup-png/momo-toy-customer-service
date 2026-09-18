const unsupported = {
  en: "I’m sorry, but I don’t have confirmed information about that yet. Please leave your email so our official team can follow up.",
  zh: "很抱歉，目前我没有关于该信息的确切资料。请留下你的邮箱，以便官方团队后续跟进。"
};

const faqLibrary = window.MOMO_TOY_FAQ || [];

const emailReply = {
  en: 'Thanks, I’ve noted your email. Our official team can follow up with you.',
  zh: '谢谢，我已经记录你的邮箱。官方团队会进一步联系你。'
};

const replies = [
  [['full box', 'whole box', 'box set', 'case', '端盒', '整盒'], 'A full box is $49.', '端盒价格为49美元。'],
  [['price', 'prices', 'how much', '多少钱', '价格', '价钱'], 'One blind box is $9.9, and a full box is $49.', '单盒价格为9.9美元，端盒价格为49美元。'],
  [['free shipping', 'shipping fee', 'shipping cost', '运费', '免运费'], 'US orders of $50 or more qualify for free shipping.', '美国订单满50美元免运费。'],
  [['one blind box', 'single blind box', 'single box', '单盒', '一个盲盒', '一个多少钱', '单个'], 'One blind box is $9.9.', '单盒价格为9.9美元。'],
  [['ship to the us', 'ship to us', 'shipping to the us', 'do you ship', 'do you deliver', 'ship to new york', 'deliver to new york', 'new york', 'nyc', '纽约', '配送到', '配送至', '支持配送', '配送服务', 'whole us', 'all states', 'whole united states', '配送至美国', '美国配送', '全美配送', '全美', '美国全境', '美国各州'], 'Yes, MOMO TOY supports shipping to the United States.', '是的，MOMO TOY 支持配送至美国。'],
  [['shipping time', 'delivery time', 'how long', 'arrive', '物流时效', '物流多久', 'delivery days', '时效', '几天', '多久', '配送时效', '配送多久'], 'US orders usually take around 5-10 business days to arrive.', '美国订单预计配送时间为5-10个工作日。'],
  [['opened blind box', 'open blind box', '拆开', '不喜欢', 'character'], 'Sorry, opened blind boxes cannot be returned simply because you do not like the character you received.', '很抱歉，已经拆开的盲盒不能因为不喜欢抽到的款式而退换。'],
  [['return', 'exchange', '退货', '换货'], 'Unopened, undamaged products can be returned or exchanged within 30 days.', '未拆封且无破损的产品支持30天内退换。'],
  [['damaged', 'damage', 'broken', '损坏', '破损'], 'If your item was damaged during shipping, please contact official support and provide photos of the item and packaging.', '如果商品在运输过程中损坏，请联系官方客服，并提供商品和包装照片。'],
  [['tracking', 'tracking number', 'track my order', 'logistics', '单独发物流', '发物流', '查物流', '查询物流', '物流查询', '订单物流', '物流单号', '追踪'], 'After your order ships, tracking information will be sent to you by email.', '订单发货后，你会通过邮箱收到物流追踪信息。'],
  [['blind box', 'hidden style', 'hidden styles', 'hidden figure', 'hidden figures', '盲盒', '隐藏款'], 'Blind boxes contain random designs, including regular and sometimes hidden figures, so a specific style cannot be selected in advance.', '盲盒包含随机款式，部分系列有普通款和隐藏款，购买前无法指定具体款式。'],
  [['original', 'authentic', '原创', '正品'], 'MOMO TOY products are original designer works.', 'MOMO TOY 产品为原创设计师作品。'],
  [['collect', 'collection', '收藏'], 'MOMO TOY creates art toys for collectors and everyday display.', 'MOMO TOY 主要为收藏和日常展示打造艺术潮玩。'],
  [['gift', 'present', '礼物'], 'Sure! MOMO TOY products can be purchased as gifts.', '当然可以！MOMO TOY 产品可以作为礼物购买。'],
  [['bulk', 'wholesale', 'business', '批量', '批发', '合作'], 'For bulk purchases or business collaborations, please leave your email and our team will follow up.', '如需批量购买或商业合作，请留下邮箱，工作人员会进一步联系。'],
  [['order status', 'where is my order', '订单状态', '我的订单'], 'I can help with general shipping questions, but I can’t confirm your specific order status from the information available here. Please check the tracking email sent after shipment or contact our support team.', '我可以帮助解答一般物流问题，但无法根据现有信息确认你的具体订单状态。请查看发货后的物流邮件，或联系官方客服。']
];

function isEmail(message) {
  return /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/.test(message);
}

function getReply(message) {
  if (isEmail(message)) return emailReply;
  const normalized = message.toLowerCase().trim();
  if (['store', 'offline store', '线下门店', '门店'].some((keyword) => normalized.includes(keyword))) return unsupported;
  if (['probability', 'odds', 'chance', '概率', '几率'].some((keyword) => normalized.includes(keyword))) return unsupported;
  const faqMatch = faqLibrary
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce((best, keyword) => normalized.includes(keyword.toLowerCase()) ? Math.max(best, keyword.length) : best, 0)
    }))
    .sort((a, b) => b.score - a.score)[0];
  if (faqMatch && faqMatch.score > 0) return { en: faqMatch.entry.en, zh: faqMatch.entry.zh };
  const matched = replies.find(([keywords]) => keywords.some((keyword) => normalized.includes(keyword)));
  return matched ? { en: matched[1], zh: matched[2] } : unsupported;
}

const messages = document.querySelector('#messages');
const form = document.querySelector('#chat-form');
const input = document.querySelector('#user-input');
const roundStatus = document.querySelector('#round-status');
const resetButton = document.querySelector('#reset-chat');
let roundCount = 0;

function addMessage(text, role) {
  const bubble = document.createElement('div');
  bubble.className = `message ${role}`;
  bubble.textContent = text;
  messages.append(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function addReply(reply) {
  const bubble = document.createElement('div');
  bubble.className = 'message bot';
  const english = document.createElement('div');
  english.textContent = reply.en;
  const chinese = document.createElement('div');
  chinese.className = 'chinese';
  chinese.textContent = reply.zh;
  bubble.append(english, chinese);
  messages.append(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function submitQuestion(question) {
  const text = question.trim();
  if (!text) return;
  addMessage(text, 'user');
  addReply(getReply(text));
  roundCount += 1;
  roundStatus.textContent = `Demo rounds: ${Math.min(roundCount, 5)}/5`;
  if (roundCount >= 5) roundStatus.classList.add('complete');
}

function resetChat() {
  messages.innerHTML = '';
  roundCount = 0;
  roundStatus.textContent = 'Demo rounds: 0/5';
  roundStatus.classList.remove('complete');
  addReply({
    en: 'Hi! I’m the MOMO TOY customer service assistant. I can help with products, shipping, returns, orders, and other common questions.',
    zh: '你好！我是 MOMO TOY 在线客服助手，可以帮助你解答产品、物流、退换货、订单等常见问题。'
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitQuestion(input.value);
  input.value = '';
  input.focus();
});

document.querySelectorAll('[data-question]').forEach((button) => {
  button.addEventListener('click', () => submitQuestion(button.dataset.question));
});

resetButton.addEventListener('click', resetChat);

addReply({
  en: 'Hi! I’m the MOMO TOY customer service assistant. I can help with products, shipping, returns, orders, and other common questions.',
  zh: '你好！我是 MOMO TOY 在线客服助手，可以帮助你解答产品、物流、退换货、订单等常见问题。'
});
