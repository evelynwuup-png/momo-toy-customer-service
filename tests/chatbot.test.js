import test from 'node:test';
import assert from 'node:assert/strict';
import { getReply, isEmail } from '../src/chatbot.js';

test('answers shipping time in English and Chinese', () => {
  const reply = getReply('How long does shipping take?');
  assert.match(reply.en, /5-10 business days/);
  assert.match(reply.zh, /5-10个工作日/);
});

test('does not invent unsupported product information', () => {
  const reply = getReply('What is the hidden figure probability?');
  assert.match(reply.en, /I’m sorry, but I don’t have confirmed information about that yet\./);
  assert.match(reply.zh, /目前我没有关于该信息的确切资料/);
});

test('handles opened blind-box return requests correctly', () => {
  const reply = getReply('Can I return an opened blind box because I do not like the character?');
  assert.match(reply.en, /opened blind boxes cannot be returned/);
  assert.match(reply.zh, /已经拆开的盲盒不能因为不喜欢抽到的款式而退换/);
});

test('uses the privacy-safe response for specific order status requests', () => {
  const reply = getReply('Can you check my order status?');
  assert.match(reply.en, /can’t confirm your specific order status/);
  assert.match(reply.zh, /无法根据现有信息确认你的具体订单状态/);
});

test('answers the US shipping destination question without claiming all states', () => {
  const reply = getReply('Do you ship to the US?');
  assert.match(reply.en, /supports shipping to the United States/);
  assert.match(reply.zh, /支持配送至美国/);
  assert.doesNotMatch(reply.en, /all states/);
});

test('acknowledges a customer email for follow-up', () => {
  assert.equal(isEmail('my email is collector@example.com'), true);
  const reply = getReply('collector@example.com');
  assert.match(reply.en, /Thanks.*email/);
  assert.match(reply.zh, /邮箱/);
});

test('keeps unsupported customs questions honest', () => {
  const reply = getReply('Do I need to pay customs fees?');
  assert.match(reply.en, /don’t have confirmed information/);
  assert.match(reply.zh, /没有关于该信息的确切资料/);
});

test('answers the current single-box and full-box prices consistently', () => {
  const single = getReply('How much is one blind box?');
  const fullBox = getReply('How much is a full box?');
  assert.match(single.en, /\$9\.9/);
  assert.match(single.zh, /9\.9美元/);
  assert.match(fullBox.en, /\$49/);
  assert.match(fullBox.zh, /49美元/);
});

test('understands natural Chinese price questions by keyword', () => {
  const reply = getReply('你们家一个多少钱？');
  assert.match(reply.en, /\$9\.9/);
  assert.match(reply.zh, /9\.9美元/);
});

test('returns both prices when the customer asks generally about price', () => {
  const reply = getReply('What is the price?');
  assert.match(reply.en, /\$9\.9/);
  assert.match(reply.en, /\$49/);
});
