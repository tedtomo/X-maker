# GitHub Pages セットアップ手順

## 1. GitHubリポジトリ作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」
3. 設定：
   - Repository name: `x-post-maker`（好きな名前でOK）
   - Public/Private: **Private**（URLを知る人だけアクセス可能）
   - 「Create repository」をクリック

## 2. ファイルをアップロード

### 方法A: ブラウザで直接アップロード
1. 作成したリポジトリページで「uploading an existing file」をクリック
2. 以下のファイルをドラッグ&ドロップ：
   - `index.html`
   - `style.css`
   - `script.js`
   - `password.html`（オプション）
3. Commit message: 「Initial commit」
4. 「Commit changes」をクリック

### 方法B: Gitコマンド（ターミナル使用）
```bash
cd /mnt/c/Users/sasto/OneDrive/Desktop/TED/X
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[あなたのユーザー名]/x-post-maker.git
git push -u origin main
```

## 3. GitHub Pages を有効化

1. リポジトリページで「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「Deploy from a branch」を選択
4. 「Branch」で「main」を選択、「/ (root)」を選択
5. 「Save」をクリック

## 4. URLを確認（1-2分待つ）

公開URL:
```
https://[あなたのGitHubユーザー名].github.io/x-post-maker/
```

パスワード保護を使う場合:
```
https://[あなたのGitHubユーザー名].github.io/x-post-maker/password.html
```

## 5. 友人と共有

- URLを知っている人だけがアクセス可能
- リポジトリがPrivateでもGitHub Pagesは公開される（URLを知らないとアクセス不可）

## パスワード保護の設定

`password.html`の28行目を編集してパスワード変更：
```javascript
// 現在: if (password === 'xpost2024') {
// 変更例: if (password === 'mynewpass123') {
```

## 自動リダイレクト設定（オプション）

パスワードページを最初に表示したい場合、`index.html`の先頭に追加：

```html
<script>
    // セッションチェック
    if (!sessionStorage.getItem('authenticated')) {
        window.location.href = 'password.html';
    }
</script>
```

## トラブルシューティング

- **404エラー**: 1-2分待ってから再度アクセス
- **更新が反映されない**: ブラウザのキャッシュをクリア（Ctrl+F5）
- **Pages が有効にならない**: リポジトリにindex.htmlが存在することを確認

## 更新方法

ファイルを修正した後：
1. GitHubのリポジトリページでファイルをクリック
2. 鉛筆アイコン（Edit）をクリック
3. 編集して「Commit changes」
4. 数分で自動的に反映される