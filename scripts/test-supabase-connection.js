// Supabase接続テストスクリプト
const { createClient } = require('@supabase/supabase-js')
const fetch = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

// Node.js 18未満の場合、fetchをグローバルに設定
if (!global.fetch) {
  global.fetch = fetch
}

async function testSupabaseConnection() {
  console.log('🔍 Supabase接続テストを開始...')
  
  // 環境変数の確認
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ 環境変数が設定されていません:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ 設定済み' : '❌ 未設定')
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ 設定済み' : '❌ 未設定')
    console.error('\n📝 .env.localファイルを作成し、以下の内容を設定してください:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here')
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here')
    console.error('   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here')
    console.error('   NEXT_PUBLIC_SITE_URL=http://localhost:3000')
    return false
  }
  
  console.log('✅ 環境変数が設定されています')
  
  try {
    // Supabaseクライアントの作成
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // 接続テスト（todosテーブルへのアクセス）
    console.log('🔗 Supabaseに接続中...')
    const { data, error } = await supabase
      .from('todos')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase接続エラー:', error.message)
      console.error('   データベースの設定を確認してください')
      return false
    }
    
    console.log('✅ Supabase接続成功!')
    
    // 認証状態の確認
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.log('ℹ️  認証エラー (正常):', authError.message)
    } else if (user) {
      console.log('✅ 認証済みユーザー:', user.email)
    } else {
      console.log('ℹ️  未認証状態 (正常)')
    }
    
    return true
    
  } catch (error) {
    console.error('❌ 予期しないエラー:', error.message)
    return false
  }
}

// スクリプト実行
testSupabaseConnection()
  .then(success => {
    if (success) {
      console.log('\n🎉 Supabase接続テスト完了!')
      console.log('   アプリケーションを起動できます: npm run dev')
    } else {
      console.log('\n⚠️  Supabase接続テスト失敗')
      console.log('   設定を確認してから再実行してください')
    }
  })
  .catch(error => {
    console.error('❌ テスト実行エラー:', error)
  })
