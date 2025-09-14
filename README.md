# ToDoアプリ

Next.js 15 + Supabase + TypeScript + Tailwind CSS を使用したモダンなToDoアプリケーションです。

## 🚀 技術スタック

- **フロントエンド**: Next.js 15 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **バックエンド**: Supabase (認証、PostgreSQL、RLS)
- **状態管理**: TanStack Query (React Query)
- **フォーム**: React Hook Form + Zod
- **UI コンポーネント**: shadcn/ui, Radix UI
- **アイコン**: Lucide React

## ✨ 主な機能

- 🔐 GitHub認証によるログイン
- ✅ Todoの追加・編集・削除
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

### 2. Supabaseプロジェクトの設定
1. [Supabase](https://supabase.com)でプロジェクトを作成
2. データベースの設定（詳細は[SETUP.md](./SETUP.md)を参照）
3. GitHub OAuth設定

### 3. 環境変数の設定
`.env.local`ファイルを作成：
```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# アプリケーション設定
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **注意**: Supabaseの認証情報は、Supabaseダッシュボードの「Settings」→「API」から取得できます。

### 4. 開発サーバーの起動
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションにアクセスできます。

## 📁 プロジェクト構造

```
my-todo-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証関連ページ
│   ├── (dashboard)/       # ダッシュボードページ
│   ├── api/               # API ルート
│   └── globals.css        # グローバルスタイル
├── components/            # React コンポーネント
│   ├── ui/               # 再利用可能なUIコンポーネント
│   ├── TodoForm.tsx      # Todo作成・編集フォーム
│   ├── TodoItem.tsx      # Todoアイテム表示
│   └── DashboardHeader.tsx # ダッシュボードヘッダー
├── hooks/                # カスタムフック
│   ├── useTodosQuery.ts  # Todoデータ取得
│   └── useTodosLocal.ts  # ローカル状態管理
├── lib/                  # ユーティリティ
│   ├── supabaseClient.ts # Supabaseクライアント
│   ├── supabaseServer.ts # Supabaseサーバー
│   ├── auth.ts          # 認証関連
│   ├── zodSchemas.ts    # バリデーションスキーマ
│   └── utils.ts         # 共通ユーティリティ
└── types/               # TypeScript型定義
    └── db.ts           # データベース型定義
```

## 🔧 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動（Turbopack使用）
- `npm run build` - プロダクション用ビルド
- `npm run start` - プロダクションサーバーを起動

## 📚 詳細なセットアップガイド

詳細なセットアップ手順については、[SETUP.md](./SETUP.md)を参照してください。

### クイックスタート
```bash
# リポジトリをクローン
git clone https://github.com/ktomoyuki0227/my-todo-app.git
cd my-todo-app

# 依存関係をインストール
npm install

# 環境変数を設定（.env.localファイルを作成）
cp .env.example .env.local
# .env.localファイルを編集してSupabaseの認証情報を設定

# 開発サーバーを起動
npm run dev
```

## 🚀 デプロイ

### Vercelでのデプロイ
1. [Vercel](https://vercel.com)にプロジェクトをインポート
2. 環境変数を設定
3. 自動デプロイが開始されます

### その他のプラットフォーム
- Netlify
- Railway
- Supabase Edge Functions

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
