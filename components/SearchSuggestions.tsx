'use client';

import { useRouter, useSearchParams } from "next/navigation";

interface SearchSuggestionsProps {
  totalCount: number;
}

export const SearchSuggestions = ({ totalCount }: SearchSuggestionsProps) => {
  const commonLanguages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'Go', 'Rust'];
  const starOptions = ['stars:>100', 'stars:>1000', 'stars:>10000'];

  // useRouter と useSearchParams をフックで取得
  const router = useRouter();
  const searchParams = useSearchParams();

  // 更新用の関数
  const updateQueryFilter = (filterType: 'language' | 'stars', filterValue: string) => {
    // 現在の検索クエリを取得（なければ空文字）
    const currentQuery = searchParams.get('q') || "";
    let newQuery = currentQuery;

    if (filterType === 'language') {
      const token = `language:${filterValue.toLowerCase()}`;
      // 修正:
      // currentQuery を空白で分割して、各トークンと完全一致するかどうかを確認する
      const tokens = currentQuery.trim().split(/\s+/);
      if (!tokens.some(t => t.toLowerCase() === token)) {
        newQuery = currentQuery ? `${currentQuery} ${token}` : token;
      }
    } else if (filterType === 'stars') {
      const token = filterValue; // 例: "stars:>100"
      // 既存の stars フィルター（"stars:" で始まる部分）を削除してから新しいフィルターを追加
      const queryWithoutStars = currentQuery
        .split(" ")
        .filter(part => !part.startsWith("stars:"))
        .join(" ");
      newQuery = queryWithoutStars ? `${queryWithoutStars} ${token}` : token;
    }
    
    const currentSort = searchParams.get('sort') || 'stars';
    const currentOrder = searchParams.get('order') || 'desc';
    
    // 新しいクエリで検索を実行
    router.push(`/search?q=${encodeURIComponent(newQuery.trim())}&sort=${currentSort}&order=${currentOrder}`);
  };

  const handleLanguageClick = (language: string) => {
    updateQueryFilter('language', language);
  };

  const handleStarsClick = (stars: string) => {
    updateQueryFilter('stars', stars);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">プログラミング言語で絞り込む：</h4>
          <div className="flex flex-wrap gap-2">
            {commonLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageClick(lang)}
                className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-full transition-colors"
                type="button"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-2">スター数で絞り込む：</h4>
          <div className="flex flex-wrap gap-2">
            {starOptions.map((stars) => (
              <button
                key={stars}
                onClick={() => handleStarsClick(stars)}
                className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-full transition-colors"
                type="button"
              >
                {stars}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 