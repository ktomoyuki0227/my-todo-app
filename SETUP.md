# ToDoアプリ MVP セットアップガイド

## 概要
Next.js 15・Supabase・TypeScript・Tailwind CSS を使用して構築した ToDo アプリの MVP です。

## 技術スタック
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Postgres, RLS)
- **State Management**: TanStack Query (React Query)
- **Validation**: Zod, React Hook Form
- **UI Components**: shadcn/ui, Radix UI

## セットアップ手順
### 1. Supabase プロジェクトを作成
1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの URL と API キーを取得

### 2. データベースの設定
Supabase の SQL Editor で以下の SQL を実行してください。
```sql
-- profiles テーブル
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamp with time zone default now()
);

-- todos テーブル
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) <= 200),
  is_done boolean not null default false,
  priority text not null default 'normal' check (priority in ('low','normal','high')),
  due_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- インデックス
create index if not exists idx_todos_user on public.todos(user_id);
create index if not exists idx_todos_due on public.todos(due_date);

-- RLS (Row Level Security) を有効化
alter table public.profiles enable row level security;
alter table public.todos enable row level security;

-- profiles のポリシー
create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_upsert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- todos のポリシー
create policy "todos_select_own"
on public.todos for select
using (auth.uid() = user_id);

create policy "todos_insert_own"
on public.todos for insert
with check (auth.uid() = user_id);

create policy "todos_update_own"
on public.todos for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "todos_delete_own"
on public.todos for delete
using (auth.uid() = user_id);
```

### 3. GitHub OAuth 設定
1. Supabase の Authentication 設定で GitHub プロバイダを有効化
2. [GitHub 開発者設定](https://github.com/settings/apps) で OAuth App を作成
3. Callback URL に `https://your-project.supabase.co/auth/v1/callback` を指定

### 4. 環境変数の設定
`.env.local` ファイルを作成し、以下を設定します。
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. アプリケーションの起動
```bash
npm run dev
```

## 実装済みの機能
- GitHub 認証
- ToDo 一覧表示
- ToDo の追加
- ToDo の編集・削除
- 完了 / 未完了の切り替え
- 優先度設定（高・中・低）
- フィルタリング（すべて・未完了・完了）
- レスポンシブデザイン

## プロジェクト構造
```
my-todo-app/
├── app/
│   ├── (auth)/
│   │   ├── api/
│   │   │   └── auth/
│   │   └── signin/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── todos/
│   ├── api/
│   │   └── todos/
│   └── globals.css
├── components/
│   ├── ui/
│   ├── TodoForm.tsx
│   ├── TodoItem.tsx
│   └── DashboardHeader.tsx
├── hooks/
│   └── useTodosQuery.ts
├── lib/
│   ├── supabaseClient.ts
│   ├── supabaseServer.ts
│   ├── auth.ts
│   ├── zodSchemas.ts
│   └── utils.ts
└── types/
    └── db.ts
```

## 次のステップ（拡張機能のアイデア）
- [ ] タグ機能
- [ ] サブタスク
- [ ] 並び替え機能
- [ ] リアルタイム更新
- [ ] プロフィール管理
- [ ] ダークモード
- [ ] チャートの追加
- [ ] CI/CD 設定
