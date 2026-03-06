# CLAUDE.md

本檔案為 Claude Code (claude.ai/code) 在此專案中的開發指引。

## 專案概述

GameCredit 遊戲點數商城 — 遊戲點數與禮物卡電商平台。目前為 Google Stitch 匯出的靜態 HTML 設計稿，預計轉換為 React 應用程式。

## 目前狀態

專案包含 11 個獨立 HTML 頁面（設計稿），尚未轉為可建置的應用程式。使用技術：
- Tailwind CSS（透過 CDN `cdn.tailwindcss.com`）
- Google Material Symbols 圖示
- Inter 字型
- 預設深色主題（背景 `#101622`、卡片 `#1a2332`、主色藍 `#256af4`）
- 語言：繁體中文

## 目標技術棧（轉換用）

- **框架：** React 19 + TypeScript + Vite
- **樣式：** Tailwind CSS v4（使用 `@import "tailwindcss"` 語法）
- **路由：** React Router v7
- **後端：** Supabase（JS Client）
- **套件管理：** pnpm
- **部署：** AWS Amplify（ap-southeast-1），建置輸出至 `dist/`
- **環境變數：** 使用 `VITE_` 前綴（非 `NEXT_PUBLIC_`）

## 目標檔案結構

```
src/
├── components/
│   ├── layout/        # Navbar、Footer、MemberSidebar（跨頁面共用）
│   └── ui/            # Button、Input、Card（可複用基礎元件）
├── pages/
│   ├── member/        # 控制台、購買紀錄、帳號設定、帳號安全
│   └── admin/         # 庫存管理、網站設定
├── lib/
│   └── supabase.ts
├── App.tsx
└── main.tsx
```
## Skills 使用提醒
- 部署相關工作請使用 /amplify-deploy skill
- 資料庫操作請使用 /supabase-setup skill
- 建立前端元件請使用 /react-component skill
- 環境變數變更請使用 /env-manager skill
- 商品資料匯入請使用 /product-import skill


## 頁面清單

**前台：** 首頁、商品詳情、購物車、結帳、常見問題、服務條款、隱私權政策
**會員：** 會員中心（控制台）、購買紀錄
**後台：** 網站管理設定、庫存管理系統

**尚缺頁面（詳見 `GameCredit-頁面分析與Claude提示詞.md`）：**
- P0：登入/註冊、商品列表/分類頁、訂單完成確認頁
- P1：帳號設定、帳號安全
- P2/P3：關於我們、聯絡我們、搜尋結果頁、404 錯誤頁、忘記密碼

## 設計規範

- 深色模式：`<html class="dark">`
- 圓角：0.25rem（預設）、0.5rem（lg）、0.75rem（xl）
- 響應式設計，行動裝置優先
- 導覽列：Logo「GameCredit 遊戲點數」+ 導覽連結 + 搜尋框 + 購物車 + 會員圖示 + 登入按鈕
- 頁尾：四欄佈局（品牌資訊 / 公司資訊 / 客戶服務 / 訂閱電子報）

## 部署

Amplify 建置指令：`pnpm install --frozen-lockfile && pnpm run build`。SPA 路由將所有非靜態資源路徑重寫至 `/index.html`。完整 `amplify.yml` 與重寫規則請參閱 `GameCredit-頁面分析與Claude提示詞.md` 第五節。
