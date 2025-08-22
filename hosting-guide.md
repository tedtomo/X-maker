# Xポストメーカー ホスティング方法

## 推奨オプション（無料・簡単）

### 1. **Vercel（最も簡単）**
- 無料枠で十分
- GitHubと連携で自動デプロイ
- URLを知っている人だけアクセス可能

**手順:**
1. GitHub にコードをアップロード
2. [Vercel](https://vercel.com) でアカウント作成
3. GitHubリポジトリを接続
4. デプロイ（自動）
5. 生成されたURLを友人と共有

### 2. **Netlify**
- Vercelと同様に簡単
- ドラッグ&ドロップでもデプロイ可能

**手順:**
1. [Netlify](https://netlify.com) でアカウント作成
2. フォルダをドラッグ&ドロップ
3. URLを取得して共有

### 3. **GitHub Pages（完全無料）**
- GitHubアカウントがあれば即使用可能

**手順:**
1. GitHubにリポジトリ作成（プライベートでもOK）
2. Settings → Pages を有効化
3. `https://[username].github.io/[repository-name]` でアクセス

## セキュリティ強化オプション

### 簡易パスワード保護を追加
必要であれば、簡単なパスワード保護を追加できます。

`password.html`（新規作成）:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>アクセス確認</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-box {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
            text-align: center;
        }
        input {
            padding: 10px 15px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 16px;
            width: 200px;
            margin: 10px 0;
        }
        button {
            padding: 10px 30px;
            background: #1a1a1a;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
        }
        button:hover {
            background: #000;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>パスワードを入力</h2>
        <input type="password" id="pass" placeholder="パスワード">
        <br>
        <button onclick="checkPassword()">入室</button>
    </div>
    <script>
        function checkPassword() {
            // ここにパスワードを設定（例: "mypost2024"）
            if (document.getElementById('pass').value === 'mypost2024') {
                window.location.href = 'index.html';
            } else {
                alert('パスワードが違います');
            }
        }
        document.getElementById('pass').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkPassword();
        });
    </script>
</body>
</html>
```

## 即座に使える方法

### Netlify Drop（最速）
1. https://app.netlify.com/drop にアクセス
2. Xフォルダをドラッグ&ドロップ
3. URLが即座に生成される
4. 無料アカウント作成で永続化

## 推奨構成
```
X/
├── index.html
├── style.css
├── script.js
└── password.html (オプション)
```

パスワード保護を使う場合は、最初のページを`password.html`にして、認証後に`index.html`へ移動する仕組みです。

## 注意点
- 無料プランでも個人利用なら十分
- URLを推測されにくい名前にすることも可能
- より高度なセキュリティが必要な場合は、Vercel/NetlifyのEnvironment Variablesを使用

最も簡単なのは **Netlify Drop** で、5分で完了します。