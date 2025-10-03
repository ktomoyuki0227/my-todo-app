# ToDoアプリ

Next.js 15・Supabase・TypeScript・Tailwind CSS を組み合わせたモダンな ToDo アプリケーションです。

## 🚀 技術スタック
- **フロントエンド**: Next.js 15 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **バックエンド**: Supabase (認証・PostgreSQL・RLS)
- **状態管理**: TanStack Query (React Query)
- **フォーム**: React Hook Form + Zod
- **UI コンポーネント**: shadcn/ui, Radix UI
- **アイコン**: Lucide React

## ✨ 主な機能
- 🔐 GitHub 認証によるログイン
- 📝 ToDo の追加・編集・削除
- 🎯 優先度設定（高・中・低）
- 📅 期限日設定
- 🔍 フィルタリング（すべて・未完了・完了）
- 📱 レスポンシブデザイン
- ⚡ リアルタイム更新

## 🛠️ セットアップ
### 1. リポジトリのクローン
```bash
git clone https://github.com/ktomoyuki0227/my-todo-app.git
cd my-todo-app
npm install
```

### 2. Supabase プロジェクトの準備
1. [Supabase](https://supabase.com) で新しいプロジェクトを作成
2. データベースや認証の設定（詳細は [SETUP.md](./SETUP.md) を参照）
3. GitHub OAuth を有効化

### 3. 環境変数の設定
`.env.local` ファイルを作成し、以下の値を設定します。
```env
# Supabase 設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# アプリケーション設定
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
> Supabase の認証情報はプロジェクトダッシュボードの「Settings」→「API」から取得できます。

### 4. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 📁 プロジェクト構造
```
my-todo-app/
├── app/                    # Next.js App Router エントリ
│   ├── (auth)/             # 認証関連ページ・API
│   ├── (dashboard)/        # ダッシュボード用レイアウトとページ
│   ├── api/                # API ルート
│   └── globals.css         # グローバルスタイル
├── components/             # 再利用可能な UI コンポーネント
├── hooks/                  # カスタムフック
├── lib/                    # Supabase 連携やユーティリティ
├── scripts/                # 補助スクリプト
├── types/                  # 型定義
└── README.md               # このファイル
```

## 🔧 利用可能なスクリプト
- `npm run dev` – 開発サーバーの起動（Turbopack 使用）
- `npm run build` – プロダクション向けビルド
- `npm run start` – プロダクションサーバーの起動
- `npm run test:supabase` – Supabase 接続テスト

## 📚 詳細なセットアップ手順
詳細は [SETUP.md](./SETUP.md) を参照してください。

### クイックスタート
```bash
# リポジトリをクローン
git clone https://github.com/ktomoyuki0227/my-todo-app.git
cd my-todo-app

# 依存関係のインストール
npm install

# Supabase の情報を設定
cp .env.example .env.local
# .env.local を編集し、Supabase 認証情報を入力

# 開発サーバーを起動
npm run dev
```

## 🚀 デプロイ
### Vercel
1. [Vercel](https://vercel.com) にプロジェクトをインポート
2. 環境変数を設定
3. 自動デプロイが開始されます

### その他の候補
- Netlify
- Railway
- Supabase Edge Functions

## 🤝 コントリビューション
Pull Request や Issue の投稿を歓迎します！

## 📄 ライセンス
本プロジェクトは MIT ライセンスの下で公開されています。
