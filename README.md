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

- Node.js (バージョン 18.17 以上)
- npm (通常 Node.js とともにインストールされます)
- Git

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

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加します。

```
NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com
```

### 4. アプリケーションの起動

開発サーバーを起動するには、以下のコマンドを実行します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。

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
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── ModeToggle.tsx
│   ├── Pagination.tsx
│   ├── RepositoryDetails.tsx
│   ├── RepositoryList.tsx
│   ├── SearchForm.tsx
│   ├── SkipLink.tsx
│   ├── SortOptions.tsx
│   └── theme-provider.tsx
├── lib/
│   └── github.ts
├── types/
│   └── github.ts
├── .env.local
├── next.config.js
├── package.json
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

