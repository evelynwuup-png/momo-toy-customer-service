# MOMO TOY Classroom Chatbot Demo

这是一个无需安装、无需服务器、无需 API 的课堂演示版 MOMO TOY 在线客服机器人。

## 使用方法

1. 解压 ZIP 文件。
2. 双击 `index.html`。
3. 在浏览器中输入问题，或点击快捷问题按钮。

## 可演示问题

- How long does shipping take?
- How much is one blind box? / How much is a full box?
- Can I return an opened blind box?
- Can you check my order status?
- Do I need to pay customs fees?（未知信息测试）
- When will your next collection launch?（未知信息测试）
- collector@example.com（邮箱收集测试）

页面上的快捷按钮正好对应课堂要求的 5 轮演示；完成后顶部会显示 `5/5`，也可以点击 `Reset demo` 重新开始。

## 说明

回复内容仅基于 MOMO TOY 提供的演示知识库；对于没有确认的信息，机器人会明确说明无法确认，并邀请消费者留下邮箱。

当前演示价格：单盒 $9.9，端盒 $49。

为保证双击 `index.html` 就能演示，页面使用普通离线脚本加载，不依赖网络、服务器或 API。

## 开发者测试

如果电脑已安装 Node.js，可在项目目录运行：

```bash
npm test
```
