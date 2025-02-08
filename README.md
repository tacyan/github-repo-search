# GitHub Repository Search

## 概要

このプロジェクトは、GitHub のリポジトリを検索し、詳細情報を表示する Next.js アプリケーションです。ユーザーはキーワードでリポジトリを検索し、結果をソートし、各リポジトリの詳細情報を閲覧することができます。

## 主な機能

1. リポジトリの検索
2. 検索結果のソート（スター数、フォーク数、更新日）
3. ページネーション
4. リポジトリ詳細表示（名前、説明、言語、スター数、ウォッチャー数、フォーク数、イシュー数）
5. README の表示
6. コントリビューター情報の表示

## 使用技術とライブラリ

- [Next.js 14+](https://nextjs.org/) - React フレームワーク
- [React](https://reactjs.org/) - UI ライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 静的型付け
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [shadcn/ui](https://ui.shadcn.com/) - UI コンポーネントライブラリ
- [Lucide React](https://lucide.dev/) - アイコンライブラリ
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown レンダリング

## セットアップ手順

以下の手順に従って、このプロジェクトをローカル環境にセットアップしてください。

### 前提条件

以下のツールが必要です：

#### 1. Node.js のインストール（バージョン 18.17 以上）
- **Windows の場合**：
  1. [Node.js 公式サイト](https://nodejs.org/)から LTS バージョンをダウンロード
  2. ダウンロードしたインストーラーを実行し、画面の指示に従ってインストール
  3. インストール完了後、コマンドプロンプトを開いて確認：
     ```bash
     node --version
     ```

- **macOS の場合**：
  1. Homebrewを使用する場合：
     ```bash
     brew install node
     ```
  2. または[Node.js 公式サイト](https://nodejs.org/)から LTS バージョンをダウンロードしてインストール
  3. ターミナルを開いて確認：
     ```bash
     node --version
     ```

- **Linux の場合**：
  ```bash
  # Ubuntu/Debian の場合
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs

  # バージョン確認
  node --version
  ```

#### 2. npm（Node Package Manager）
- Node.js をインストールすると自動的に npm もインストールされます
- バージョン確認：
  ```bash
  npm --version
  ```

#### 3. Git のインストール
- **Windows の場合**：
  1. [Git for Windows](https://gitforwindows.org/)からインストーラーをダウンロード
  2. インストーラーを実行し、基本的なオプションを選択してインストール

- **macOS の場合**：
  1. Homebrewを使用：
     ```bash
     brew install git
     ```
  2. または Xcode Command Line Tools をインストール：
     ```bash
     xcode-select --install
     ```

- **Linux の場合**：
  ```bash
  # Ubuntu/Debian の場合
  sudo apt-get update
  sudo apt-get install git
  ```

- インストール確認：
  ```bash
  git --version
  ```

#### 4. コードエディタ（推奨）
- [Visual Studio Code](https://code.visualstudio.com/)（推奨）
- または他のお好みのエディタ

### 1. リポジトリのクローン

まず、このリポジトリをローカルマシンにクローンします。

```bash
git clone https://github.com/tacyan/github-repo-search.git
cd github-repo-search
```

### 2. 依存関係のインストール

プロジェクトディレクトリで以下のコマンドを実行し、必要な依存関係をインストールします。

```bash
npm install
```

### 3. 環境変数の設定

以下の環境変数を`.env.local`ファイルに設定してください：

1. `NEXT_PUBLIC_GITHUB_TOKEN`: GitHubのパーソナルアクセストークン（オプション）
   - GitHubのAPI制限を緩和するために使用
   - 設定しない場合は、制限付きの匿名アクセスとなります

### 4. アプリケーションの起動

開発サーバーを起動するには、以下のコマンドを実行します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。

### 5. テストの実行

テストを実行するには、以下のコマンドを実行します。

```bash
npm run test
```

## 使い方

1. ホームページの検索バーにキーワードを入力し、「Search」ボタンをクリックします。
2. 検索結果ページでは、リポジトリのリストが表示されます。
3. 「Sort by」ドロップダウンを使用して、結果をスター数、フォーク数、更新日でソートできます。
4. ページネーションを使用して、結果の次のページに移動できます。
5. リポジトリ名をクリックすると、そのリポジトリの詳細ページが表示されます。
6. 詳細ページでは、リポジトリの情報、README の内容、コントリビューター情報を確認できます。

## プロジェクト構造

```
github-repo-search/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── search/
│   │   └── page.tsx
│   └── repository/
│       └── [owner]/
│           └── [name]/
│               └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── table.tsx
│   │   └── toast.tsx
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── ModeToggle.tsx
│   ├── Pagination.tsx
│   ├── RepositoryCard.tsx
│   ├── RepositoryDetails.tsx
│   ├── RepositoryList.tsx
│   ├── SearchForm.tsx
│   ├── SkipLink.tsx
│   ├── SortOptions.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── github.ts
│   └── utils.ts
├── types/
│   └── github.ts
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── package.json
├── tailwind.config.ts
├── README.md
└── tsconfig.json
```

## こだわりポイント

1. **アクセシビリティ**: ARIA ラベルの使用、キーボードナビゲーション、スキップリンクの実装など、アクセシビリティに配慮しています。
2. **レスポンシブデザイン**: モバイルからデスクトップまで、様々な画面サイズに対応したレイアウトを実装しています。
3. **パフォーマンス最適化**: 動的インポートやキャッシングを活用し、アプリケーションのパフォーマンスを向上させています。
4. **エラーハンドリング**: ユーザーフレンドリーなエラーメッセージを表示し、エラー発生時のユーザーエクスペリエンスを向上させています。
5. **ダークモード対応**: ユーザーの好みに応じてダークモードを切り替えられる機能を実装しています。

## 貢献

プロジェクトへの貢献は歓迎します。バグ報告、機能リクエスト、プルリクエストなど、どんな形でも構いません。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 制限事項

### GitHub API の検索制限

GitHub REST API には以下の制限があります：

1. 検索結果は最大1000件まで取得可能
2. ページあたり最大100件まで表示可能
3. 認証なしの場合、1時間あたり10リクエストまで

これらの制限に対する対応として、以下の機能を実装しています：

1. **ページネーションの制限表示**
   - 1000件を超える検索結果がある場合、最大ページ数（10ページ）を表示
   - ユーザーに制限について通知するメッセージを表示

2. **検索条件の絞り込み推奨**
   - より具体的なキーワードの使用を推奨
   - 以下の検索修飾子の活用を提案：
     - `language:javascript` - プログラミング言語での絞り込み
     - `stars:>1000` - スター数での絞り込み
     - `created:>2024-01-01` - 作成日での絞り込み

3. **効率的な検索方法のガイダンス**
   - 検索結果が1000件を超える場合、より具体的な検索方法を提案
   - 関連性の高い結果を優先表示

