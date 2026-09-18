const unsupported = {
  en: "I’m sorry, but I don’t have confirmed information about that yet. Please leave your email so our official team can follow up.",
  zh: "很抱歉，目前我没有关于该信息的确切资料。请留下你的邮箱，以便官方团队后续跟进。"
};

const emailReply = {
  en: 'Thanks, I’ve noted your email. Our official team can follow up with you.',
  zh: '谢谢，我已经记录你的邮箱。官方团队会进一步联系你。'
};

const replies = [
  {
    keywords: ['full box', 'whole box', 'box set', 'case', '端盒', '整盒'],
    en: 'A full box is $49.',
    zh: '端盒价格为49美元。'
  },
  {
    keywords: ['one blind box', 'single blind box', 'single box', '单盒', '一个盲盒'],
    en: 'One blind box is $9.9.',
    zh: '单盒价格为9.9美元。'
  },
  {
    keywords: ['ship to the us', 'ship to us', 'shipping to the us', '配送至美国', '美国配送'],
    en: 'Yes, MOMO TOY supports shipping to the United States.',
    zh: '是的，MOMO TOY 支持配送至美国。'
  },
  {
    keywords: ['shipping time', 'delivery time', 'how long', 'arrive', 'shipping', 'delivery', '多久', '配送时效'],
    en: 'US orders usually take around 5-10 business days to arrive.',
    zh: '美国订单预计配送时间为5-10个工作日。'
  },
  {
    keywords: ['opened blind box', 'open blind box', '拆开', '不喜欢', 'character'],
    en: 'Sorry, opened blind boxes cannot be returned simply because you do not like the character you received.',
    zh: '很抱歉，已经拆开的盲盒不能因为不喜欢抽到的款式而退换。'
  },
  {
    keywords: ['return', 'exchange', '退货', '换货'],
    en: 'Unopened, undamaged products can be returned or exchanged within 30 days.',
    zh: '未拆封且无破损的产品支持30天内退换。'
  },
  {
    keywords: ['damaged', 'damage', 'broken', '损坏', '破损'],
    en: 'If your item was damaged during shipping, please contact official support and provide photos of the item and packaging.',
    zh: '如果商品在运输过程中损坏，请联系官方客服，并提供商品和包装照片。'
  },
  {
    keywords: ['free shipping', 'shipping fee', '运费', '免运费'],
    en: 'US orders of $50 or more qualify for free shipping.',
    zh: '美国订单满50美元免运费。'
  },
  {
    keywords: ['tracking', 'track my order', '追踪', '物流单号'],
    en: 'After your order ships, tracking information will be sent to you by email.',
    zh: '订单发货后，你会通过邮箱收到物流追踪信息。'
  },
  {
    keywords: ['blind box', '盲盒'],
    en: 'Blind boxes contain random designs, including regular and sometimes hidden figures, so a specific style cannot be selected in advance.',
    zh: '盲盒包含随机款式，部分系列有普通款和隐藏款，购买前无法指定具体款式。'
  },
  {
    keywords: ['original', 'authentic', '原创', '正品'],
    en: 'MOMO TOY products are original designer works.',
    zh: 'MOMO TOY 产品为原创设计师作品。'
  },
  {
    keywords: ['collect', 'collection', '收藏'],
    en: 'MOMO TOY creates art toys for collectors and everyday display.',
    zh: 'MOMO TOY 主要为收藏和日常展示打造艺术潮玩。'
  },
  {
    keywords: ['gift', 'present', '礼物'],
    en: 'Sure! MOMO TOY products can be purchased as gifts.',
    zh: '当然可以！MOMO TOY 产品可以作为礼物购买。'
  },
  {
    keywords: ['bulk', 'wholesale', 'business', '批量', '合作'],
    en: 'For bulk purchases or business collaborations, please leave your email and our team will follow up.',
    zh: '如需批量购买或商业合作，请留下邮箱，工作人员会进一步联系。'
  },
  {
    keywords: ['order status', 'where is my order', '订单状态', '我的订单'],
    en: 'I can help with general shipping questions, but I can’t confirm your specific order status from the information available here. Please check the tracking email sent after shipment or contact our support team.',
    zh: '我可以帮助解答一般物流问题，但无法根据现有信息确认你的具体订单状态。请查看发货后的物流邮件，或联系官方客服。'
  }
];

export function isEmail(message) {
  return /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/.test(message);
}

export function getReply(message) {
  if (isEmail(message)) return emailReply;
  const normalized = message.toLowerCase().trim();
  const matched = replies.find(({ keywords }) => keywords.some((keyword) => normalized.includes(keyword)));
  return matched ? { en: matched.en, zh: matched.zh } : unsupported;
}
