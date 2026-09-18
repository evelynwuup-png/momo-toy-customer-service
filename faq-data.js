const unsupportedReply = {
  en: "I’m sorry, but I don’t have confirmed information about that yet. Please leave your email so our official team can follow up.",
  zh: "很抱歉，目前我没有关于该信息的确切资料。请留下你的邮箱，以便官方团队后续跟进。"
};

const groups = [
  {
    keywords: ['ship to the us', 'ship to us', 'shipping to the us', 'do you ship', 'do you deliver', 'ship to new york', 'deliver to new york', 'new york', 'nyc', '纽约', '配送', '配送到', '配送至', '支持配送', '配送服务', 'whole us', 'all states', 'whole united states', '配送至美国', '美国配送', '全美配送', '全美', '美国全境', '美国各州'],
    en: 'Yes, MOMO TOY supports shipping to the United States.',
    zh: '是的，MOMO TOY 支持配送至美国。',
    questions: [
      'Do you ship to the United States?', 'Do you ship to the whole US?', 'Can you deliver to New York?', 'Can I get delivery in NYC?', 'Is US delivery available?',
      '可以配送到美国吗？', '可以全美配送吗？', '可以配送到纽约吗？', '美国全境都能配送吗？', '你们支持美国配送吗？'
    ]
  },
  {
    keywords: ['shipping time', 'delivery time', 'how long', 'arrive', 'delivery days', '物流时效', '物流多久', '时效', '几天', '多久', '配送时效', '配送多久'],
    en: 'US orders usually take around 5-10 business days to arrive.',
    zh: '美国订单预计配送时间为5-10个工作日。',
    questions: [
      'How long is delivery?', 'How long does shipping take?', 'When will my order arrive?', 'What is the delivery time?', 'How many days does delivery take?',
      '美国订单多久到？', '配送时效多久？', '物流时效多久？', '几天可以收到？', '大概什么时候送到？'
    ]
  },
  {
    keywords: ['tracking', 'tracking number', 'track my order', 'logistics', '物流', '单独发物流', '发物流', '查物流', '查询物流', '物流查询', '订单物流', '物流单号', '追踪'],
    en: 'After your order ships, tracking information will be sent to you by email.',
    zh: '订单发货后，你会通过邮箱收到物流追踪信息。',
    questions: [
      'How do I track my order?', 'Where is the tracking number?', 'Can I get a tracking number?', 'How can I check shipping?', 'Do you send tracking by email?',
      '怎么查物流？', '物流单号在哪里？', '可以单独发物流吗？', '发货后会有物流吗？', '如何查询订单物流？'
    ]
  },
  {
    keywords: ['order status', 'where is my order', 'my order', '订单状态', '我的订单', '订单进度'],
    en: 'I can help with general shipping questions, but I can’t confirm your specific order status from the information available here. Please check the tracking email sent after shipment or contact our support team.',
    zh: '我可以帮助解答一般物流问题，但无法根据现有信息确认你的具体订单状态。请查看发货后的物流邮件，或联系官方客服。',
    questions: [
      'Can you check my order status?', 'Where is my order?', 'Has my order shipped?', 'Is my order on the way?', 'Can you look up my order?',
      '可以查我的订单吗？', '我的订单到哪里了？', '订单发货了吗？', '订单现在什么状态？', '能帮我查订单进度吗？'
    ]
  },
  {
    keywords: ['free shipping', 'shipping fee', 'shipping cost', '运费', '免运费', '运费怎么收'],
    en: 'US orders of $50 or more qualify for free shipping.',
    zh: '美国订单满50美元免运费。',
    questions: [
      'How much is shipping?', 'What is the shipping fee?', 'Do you offer free shipping?', 'When is shipping free?', 'Is delivery free over $50?',
      '运费怎么收？', '美国免运费吗？', '满多少免运费？', '订单满50美元包邮吗？', '配送费用是多少？'
    ]
  },
  {
    keywords: ['price', 'prices', 'how much', 'one blind box', 'single blind box', 'full box', 'whole box', 'box set', 'case', '多少钱', '价格', '价钱', '售价', '单盒', '端盒', '整盒', '一个盲盒'],
    en: 'One blind box is $9.9, and a full box is $49.',
    zh: '单盒价格为9.9美元，端盒价格为49美元。',
    questions: [
      'What is the price?', 'How much is one blind box?', 'How much is a full box?', 'What is the price of a case?', 'How much does one box cost?',
      '单盒多少钱？', '端盒多少钱？', '一个盲盒什么价格？', '整盒价格是多少？', '你们产品怎么卖？'
    ]
  },
  {
    keywords: ['return', 'exchange', 'unopened', 'undamaged', '退货', '换货', '未拆封', '无破损'],
    en: 'Unopened, undamaged products can be returned or exchanged within 30 days.',
    zh: '未拆封且无破损的产品支持30天内退换。',
    questions: [
      'What is your return policy?', 'Can I return an unopened product?', 'Can I exchange an unopened item?', 'How many days do I have to return?', 'Do you offer 30-day returns?',
      '未拆封可以退吗？', '未拆封可以换货吗？', '退换货期限是多久？', '没有拆封但不想要了能退吗？', '无破损产品支持退换吗？'
    ]
  },
  {
    keywords: ['opened blind box', 'open blind box', 'opened box', 'do not like', '不喜欢', '拆开', '拆封', '开过的盲盒'],
    en: 'Sorry, opened blind boxes cannot be returned simply because you do not like the character you received.',
    zh: '很抱歉，已经拆开的盲盒不能因为不喜欢抽到的款式而退换。',
    questions: [
      'Can I return an opened blind box?', 'Can I exchange a character I do not like?', 'What if I dislike the figure I got?', 'Can I return after opening?', 'Are opened boxes refundable?',
      '拆开的盲盒能退吗？', '抽到不喜欢的款式能换吗？', '开过的盲盒可以退款吗？', '不喜欢抽到的角色怎么办？', '盲盒拆了还能退换吗？'
    ]
  },
  {
    keywords: ['damaged', 'damage', 'broken', 'damaged during shipping', '运输损坏', '物流破损', '破损', '损坏'],
    en: 'If your item was damaged during shipping, please contact official support and provide photos of the item and packaging.',
    zh: '如果商品在运输过程中损坏，请联系官方客服，并提供商品和包装照片。',
    questions: [
      'What if my product arrives damaged?', 'Will the toy be damaged during shipping?', 'My package is broken, what should I do?', 'Can I report shipping damage?', 'What photos do I need for a damaged item?',
      '运输过程中破损怎么办？', '物流损坏怎么处理？', '收到坏掉的商品怎么办？', '商品破损可以申请处理吗？', '需要提供哪些破损照片？'
    ]
  },
  {
    keywords: ['blind box', 'hidden style', 'hidden styles', 'hidden figure', 'hidden figures', 'random design', 'random', '盲盒', '隐藏款', '随机款'],
    en: 'Blind boxes contain random designs, including regular and sometimes hidden figures, so a specific style cannot be selected in advance.',
    zh: '盲盒包含随机款式，部分系列有普通款和隐藏款，购买前无法指定具体款式。',
    questions: [
      'What is inside a blind box?', 'Can I choose a blind box style?', 'Are blind box designs random?', 'Is there a hidden style?', 'Does the series include hidden figures?',
      '盲盒里面是什么？', '可以指定盲盒款式吗？', '盲盒是随机的吗？', '系列有隐藏款吗？', '普通款和隐藏款都有吗？'
    ]
  },
  {
    keywords: ['original', 'authentic', 'designer', 'brand', '原创', '正品', '设计师', '品牌'],
    en: 'MOMO TOY products are original designer works combining Chinese aesthetics with modern art toy design.',
    zh: 'MOMO TOY 产品为原创设计师作品，将中国美学元素与现代潮玩设计结合。',
    questions: [
      'Are your toys original?', 'Are MOMO TOY products authentic?', 'Who designs the toys?', 'What kind of brand is MOMO TOY?', 'What is special about the design?',
      '产品是原创正品吗？', '谁设计了这些玩具？', 'MOMO TOY是什么品牌？', '产品有什么设计特色？', '是中国设计师潮玩吗？'
    ]
  },
  {
    keywords: ['gift', 'present', 'gift giving', '礼物', '送礼', '赠送'],
    en: 'Sure! MOMO TOY products can be purchased as gifts.',
    zh: '当然可以！MOMO TOY 产品可以作为礼物购买。',
    questions: [
      'Can I buy it as a gift?', 'Are these toys good presents?', 'Can I send this to a friend?', 'Is it suitable for gift giving?', 'Can I gift a blind box?',
      '可以作为礼物吗？', '适合送朋友吗？', '可以直接买来送人吗？', '盲盒适合当礼物吗？', '可以送给潮玩爱好者吗？'
    ]
  },
  {
    keywords: ['bulk', 'wholesale', 'business', 'bulk purchase', '批量', '批发', '商业合作', '合作'],
    en: 'For bulk purchases or business collaborations, please leave your email and our team will follow up.',
    zh: '如需批量购买或商业合作，请留下邮箱，工作人员会进一步联系。',
    questions: [
      'Do you support wholesale?', 'Can I place a bulk order?', 'Do you work with retailers?', 'Can we discuss a business collaboration?', 'Is bulk cooperation available?',
      '支持批发吗？', '可以批量购买吗？', '支持商业合作吗？', '零售商可以合作吗？', '大宗采购怎么联系？'
    ]
  },
  {
    keywords: ['collaboration', 'collaboration brands', '联名'],
    en: 'MOMO TOY has no announced collaboration brands at this time.',
    zh: '目前 MOMO TOY 暂无已公布的联名品牌。',
    questions: ['Do you have collaboration brands?']
  },
  {
    keywords: ['customs', 'customs fees', 'tax', '海关', '税费'],
    en: 'Customs duties or local taxes may apply depending on the destination, and are generally the customer’s responsibility.',
    zh: '不同目的地可能产生海关关税或当地税费，通常由顾客承担。',
    questions: ['Do I need to pay customs fees?']
  },
  {
    keywords: ['materials', 'material', '材质', '材料'],
    en: 'MOMO TOY uses durable art-toy materials selected for the specific product series; please check the product details for exact information.',
    zh: 'MOMO TOY 会根据具体系列选用耐用的潮玩材质，准确信息请以对应产品详情为准。',
    questions: ['What materials are used?']
  },
  {
    keywords: ['safety certifications', 'certification', 'certifications', '认证'],
    en: 'Certification information depends on the product series and will be provided on the relevant product page when available.',
    zh: '认证信息取决于具体产品系列，如有相关信息会在对应产品页面标注。',
    questions: ['Do you have safety certifications?']
  },
  {
    keywords: ['stock', 'in stock', 'inventory', '库存'],
    en: 'Availability can change with sales, so please check the product page for the latest stock information.',
    zh: '库存会随销售情况变化，请以产品页面显示的最新库存信息为准。',
    questions: ['How many are in stock?']
  },
  {
    keywords: ['discount', 'discounts', 'sale', '折扣', '优惠'],
    en: 'We do not have a fixed discount offer to confirm right now; please check the official page for current promotions.',
    zh: '目前没有可以确认的固定折扣，请以官方页面公布的活动信息为准。',
    questions: ['Do you have any discounts?']
  },
  {
    keywords: ['store', 'offline store', 'physical store', '门店', '线下门店'],
    en: 'MOMO TOY is currently focused on online sales and does not have a confirmed offline store location in the US.',
    zh: 'MOMO TOY 目前以线上销售为主，暂时没有已确认的美国线下门店地址。',
    questions: ['Do you have a store in New York?']
  },
  {
    keywords: ['new series', 'new collection', 'release date', 'launch', '新品', '发布日期', '发售'],
    en: 'New product announcements will be shared through official channels; no specific release date is confirmed here yet.',
    zh: '新品信息会通过官方渠道公布，目前这里没有可以确认的具体发布日期。',
    questions: ['When will the next series launch?', 'Do you have a new collection coming?', 'When will the new products be released?']
  }
];

// Keep the classroom knowledge base at exactly 100 high-frequency questions,
// while retaining coverage across every supported topic.
const quotas = [8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5, 1, 1, 1, 1, 1, 1, 1, 3];
const FAQ_LIBRARY = groups.flatMap((group, index) => group.questions.slice(0, quotas[index]).map((question) => ({
  question,
  keywords: group.keywords,
  en: group.en,
  zh: group.zh
})));

if (typeof window !== 'undefined') window.MOMO_TOY_FAQ = FAQ_LIBRARY;
