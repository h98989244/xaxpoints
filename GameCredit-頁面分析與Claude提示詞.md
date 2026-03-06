# GameCredit 遊戲點數商城 — 頁面分析與開發提示詞

## 一、現有頁面清單（共 11 頁）

| # | 頁面名稱 | 類型 | 說明 |
|---|---------|------|------|
| 1 | 首頁 (Homepage) | 前台 | Hero Banner、精選平台、熱銷點數、推薦好友獎勵、Footer |
| 2 | 商品詳情頁 (Product Detail) | 前台 | 商品圖片、面額選擇、加入購物車/立即購買、商品描述/兌換教學/使用限制 |
| 3 | 購物車 (Shopping Cart) | 前台 | 購物車商品列表、折扣碼、紅利折抵、訂單摘要 |
| 4 | 結帳頁 (Checkout) | 前台 | 進度條、聯絡資訊、支付方式、電子發票設定 |
| 5 | 會員中心 (Member Dashboard) | 前台 | 紅利點數總覽、最近購買紀錄、專屬兌換優惠 |
| 6 | 購買紀錄 (Purchase History) | 前台 | 訂單列表、點數卡序號與密碼查看 |
| 7 | 常見問題 FAQ | 前台 | 問題分類、搜尋、兌換教學圖文 |
| 8 | 庫存管理系統 (Inventory) | 後台 | 商品庫存管理、上架/下架、低庫存警告 |
| 9 | 網站管理後台 (Admin Settings) | 後台 | 一般資訊設定（網站名稱/統一編號/Logo/聯絡資訊） |
| 10 | 服務條款 (Terms of Service) | 前台 | 帳戶條款、交易規則、退貨政策、免責聲明 |
| 11 | 隱私權政策 (Privacy Policy) | 前台 | 隱私權相關條款 |

---

## 二、缺少的頁面

### 🔴 必要頁面（核心流程缺漏）

| 優先級 | 頁面名稱 | 說明 |
|--------|---------|------|
| P0 | **登入 / 註冊頁** | 首頁有「登入」按鈕但無對應頁面 |
| P0 | **商品列表 / 分類頁** | 首頁有分類入口但無商品瀏覽頁 |
| P0 | **訂單完成確認頁** | 結帳流程第三步「完成訂購」無對應頁面 |

### 🟡 會員中心子頁面（側邊欄有連結但缺頁面）

| 優先級 | 頁面名稱 | 說明 |
|--------|---------|------|
| P1 | **帳號設定** | 個人資料編輯、密碼修改 |
| P1 | **帳號安全** | 登入紀錄、二步驗證、社群綁定 |

### 🟢 補充頁面

| 優先級 | 頁面名稱 | 說明 |
|--------|---------|------|
| P2 | **關於我們** | 公司介紹、聯絡方式 |
| P2 | **聯絡我們** | 聯絡表單、客服資訊 |
| P3 | **搜尋結果頁** | 全站搜尋結果 |
| P3 | **404 錯誤頁** | 找不到頁面提示 |
| P3 | **忘記密碼** | 密碼重設流程 |

---

## 三、建議開發順序

```
第一階段（核心購物流程）
  ├── 登入 / 註冊頁
  ├── 商品列表 / 分類頁
  └── 訂單完成確認頁

第二階段（會員功能）
  ├── 帳號設定
  └── 帳號安全

第三階段（輔助頁面）
  ├── 關於我們 / 聯絡我們
  ├── 搜尋結果頁
  ├── 404 錯誤頁
  └── 忘記密碼
```

---

## 四、Google Stitch UI 設計提示詞

### 共通風格描述（每個提示詞前面都要加上這段）

```
設計風格說明：
- 深色主題（背景 #101622，卡片背景 #1a2332）
- 主色調藍色 #256af4
- 字體 Inter，中文用系統預設
- 圓角 0.25rem ~ 0.75rem
- 所有文字使用繁體中文
- 響應式設計，行動裝置優先
- 導覽列：左側 Logo「GameCredit 遊戲點數」+ 導覽連結，右側搜尋框 + 購物車 + 會員圖示 + 登入按鈕
- Footer：四欄（品牌資訊/公司資訊/客戶服務/訂閱電子報）
```

---

### 4-1. 登入 / 註冊頁

```
請設計一個遊戲點數商城的「登入與註冊」頁面。

頁面結構：
- 頂部導覽列（與首頁一致）
- 頁面中央放置登入/註冊切換卡片
- 卡片上方有「登入」「註冊」兩個 Tab 可切換

登入 Tab 內容：
- Email 輸入框
- 密碼輸入框（可切換顯示/隱藏）
- 「記住我」勾選框
- 「忘記密碼？」連結
- 「登入」按鈕（藍色主色 #256af4）
- 分隔線「或使用以下方式登入」
- 社群登入按鈕：LINE 登入（綠色）、Google 登入（白底）
- 底部文字：「還沒有帳號？立即註冊」

註冊 Tab 內容：
- 暱稱輸入框
- Email 輸入框
- 手機號碼輸入框（+886 前綴）
- 密碼輸入框（含強度提示條）
- 確認密碼輸入框
- 勾選「我同意服務條款與隱私權政策」
- 「註冊」按鈕
- 社群快速註冊按鈕

背景使用深色漸層或遊戲元素裝飾。
```

### 4-2. 商品列表 / 分類頁

```
請設計一個遊戲點數商城的「商品列表與分類瀏覽」頁面。

頂部：
- 導覽列
- 麵包屑導覽（首頁 > Steam 點數）
- 分類標題區域：顯示目前分類名稱（如「Steam 點數」）、分類 icon、商品總數

左側篩選區（桌面版側邊欄，手機版可收合）：
- 平台篩選：Steam / PlayStation / Xbox / Nintendo / Mobile / 其他
- 面額範圍篩選：$100以下 / $100-$500 / $500-$1000 / $1000以上
- 地區篩選：台灣 / 美國 / 日本 / 全球通用
- 商品狀態：有現貨 / 含折扣

右側商品列表：
- 頂部排序列：「排序方式」下拉（推薦/價格低到高/價格高到低/最新上架）+ 格狀/列表切換
- 商品卡片（網格 4 欄）：
  - 商品圖片
  - 平台標籤（如 Steam 藍色標籤）
  - 商品名稱
  - 原價（刪除線）與優惠價（藍色）
  - 「立即購買」按鈕
  - 「熱門」或「特價」角標
- 底部分頁器

Footer 一致。
```

### 4-3. 訂單完成確認頁

```
請設計一個遊戲點數商城的「訂單完成確認」頁面。

頂部：
- 導覽列
- 結帳進度條：購物車 ✓ → 填寫資料與支付 ✓ → 完成訂購 ✓（全部打勾，100%）

主要內容：
- 大型成功圖示（綠色勾勾動畫）
- 標題：「訂單已成功建立！」
- 副標題：「您的點數卡號將於付款確認後立即發送至您的 Email」

訂單資訊卡片：
- 訂單編號：ORD-XXXXXX
- 訂單日期
- 付款方式
- 付款狀態（已完成/待付款）
- 總金額

購買商品明細：
- 商品名稱 + 平台 + 數量 + 金額
- 若已完成付款，直接顯示點數卡序號與密碼（可複製、可切換顯示/隱藏）

底部操作：
- 「查看購買紀錄」按鈕
- 「繼續購物」按鈕
- 「下載電子發票」按鈕（如果有開發票）

提示文字：
- 若為 ATM/超商付款，顯示付款截止時間與繳費資訊
```

### 4-4. 帳號設定

```
請設計一個遊戲點數商城的「帳號設定」頁面。

整體佈局：
- 左側會員中心側邊欄（項目：控制台/購買紀錄/帳號設定(目前頁)/帳號安全）
- 右側主內容區

主內容區：
- 頁面標題「帳號設定」
- 副標題「管理您的個人資料與偏好設定」

個人資料區塊：
- 頭像上傳區（圓形預覽 + 更換按鈕）
- 暱稱（可編輯）
- Email（顯示已驗證標記，不可直接修改）
- 手機號碼（可修改，帶 +886 前綴）
- 會員等級顯示（如「金卡會員」標籤）
- 註冊日期（唯讀）

偏好設定區塊：
- 預設收件 Email
- 電子報訂閱開關
- 促銷通知開關

底部：
- 「儲存變更」按鈕
- 「取消」按鈕
```

### 4-5. 帳號安全

```
請設計一個遊戲點數商城的「帳號安全」頁面。

整體佈局：
- 左側會員中心側邊欄（項目：控制台/購買紀錄/帳號設定/帳號安全(目前頁)）
- 右側主內容區

內容區塊：

1. 密碼管理：
   - 「修改密碼」按鈕
   - 展開後顯示：目前密碼/新密碼/確認新密碼輸入框
   - 密碼強度提示

2. 兩步驟驗證：
   - 狀態顯示（已開啟/未開啟）
   - 開啟/關閉切換
   - 驗證方式：手機簡訊 OTP

3. 社群帳號綁定：
   - LINE 帳號（已綁定/未綁定 + 綁定/解除按鈕）
   - Google 帳號（同上）

4. 登入紀錄：
   - 最近 10 筆登入紀錄表格
   - 欄位：日期時間 / IP 位址 / 裝置 / 地點 / 狀態（成功/失敗）
   - 可疑登入以紅色標記
```

---

## 五、Amplify 部署配置

### amplify.yml

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - corepack enable
        - corepack prepare pnpm@latest --activate
        - pnpm install --frozen-lockfile
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
  buildImage: public.ecr.aws/docker/library/node:20
```

### 環境變數（Amplify Console 設定）

⚠️ Vite 用 `VITE_` 前綴，不是 `NEXT_PUBLIC_`

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxx
VITE_SITE_URL=https://your-domain.com
```

### SPA 路由重寫規則

在 Amplify Console > 重新導向和重寫 中新增：

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  }
]
```

### .env.local 範本

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxx
VITE_SITE_URL=http://localhost:5173
VITE_SITE_NAME=GameCredit 遊戲點數
VITE_LINE_CHANNEL_ID=your_channel_id
VITE_LINE_CALLBACK_URL=http://localhost:5173/auth/line/callback
```

### PowerShell 更新環境變數腳本

```powershell
# update-amplify-env.ps1
param(
    [Parameter(Mandatory=$true)][string]$AppId,
    [Parameter(Mandatory=$false)][string]$BranchName = "main"
)

$envFile = ".env.local"
if (-not (Test-Path $envFile)) { Write-Error "找不到 $envFile"; exit 1 }

$envVars = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.+)$') {
        $envVars[$Matches[1].Trim()] = $Matches[2].Trim()
    }
}

Write-Host "更新環境變數到 Amplify App: $AppId ($BranchName)" -ForegroundColor Cyan
$envJson = $envVars | ConvertTo-Json -Compress
aws amplify update-branch --app-id $AppId --branch-name $BranchName --environment-variables $envJson
Write-Host "✅ 完成！" -ForegroundColor Green
```

---

## 六、Stitch HTML 轉 React 元件提示詞

將 Stitch 設計稿轉為實際 React 專案時，使用以下提示詞給 Claude Code：

```
請將以下 Google Stitch 匯出的 HTML 頁面轉換為 React 元件。

技術要求：
- React 19 + TypeScript + Vite
- Tailwind CSS v4（使用 @import "tailwindcss" 語法）
- 每個頁面一個獨立元件檔案
- React Router v7 管理路由
- 可複用元件（Navbar、Footer、MemberSidebar）抽取到 components/
- 所有文字繁體中文
- Supabase JS Client 串接後端

檔案結構：
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MemberSidebar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── pages/
│   ├── Home.tsx
│   ├── ProductList.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderComplete.tsx
│   ├── Login.tsx
│   ├── member/
│   │   ├── Dashboard.tsx
│   │   ├── PurchaseHistory.tsx
│   │   ├── AccountSettings.tsx
│   │   └── Security.tsx
│   ├── admin/
│   │   ├── Inventory.tsx
│   │   └── Settings.tsx
│   ├── FAQ.tsx
│   ├── Terms.tsx
│   └── Privacy.tsx
├── lib/
│   └── supabase.ts
├── App.tsx
└── main.tsx
```
