# NOCTURNE · Interactive Story Cards (V0.5)

本仓库仅用于原创互动抽卡 H5 的公开试玩。卡片不是传统塔罗牌。

## GitHub Pages 发布
1. 在 GitHub 创建 Public 仓库 `nocturne-play`，勾选 Add README 初始化 `main`。
2. 将本目录 `index.html`, `styles.css`, `config.js`, `app.js`, `robots.txt`, `.nojekyll` 上传到仓库**根目录**。不要把 ZIP 整包当一个文件上传，也不要上传子文件夹包住 index.html。
3. 打开 Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save。
4. 在 GitHub Pages 设置页查看实际发布 URL；新站点可能需要一些时间才能生效。
5. 真正上线后，在手机测试：进入→洗牌→选三张牌→选择结局→保存 PNG→复制好友挑战链接→另一台设备打开。

## 测试限制
- 原 V0.5 已通过浏览器模拟视口的主要交互回归，但尚未在真实安卓设备上确认滑动帧率、下载体验及跨设备邀请。
- 当前版本仅静态前端，无账号/支付/访问统计；不要声称已有用户或转化率。
- `.nojekyll` 允许 GitHub Pages 按原样托管静态文件，避免无关的 Jekyll 处理。
- 本仓库未添加开源许可证；公开可读不等于自动授权第三方商业使用。注意公开仓库源代码可被查看。
