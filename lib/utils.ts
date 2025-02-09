import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPageErrorMessage(requestedPage: number, availablePages: number): string {
  if (availablePages === 0) {
    return "検索結果が見つかりませんでした。別のキーワードで試してみてください。";
  }
  
  if (requestedPage > availablePages) {
    if (availablePages === 0) {
      return "検索結果が見つかりませんでした。別のキーワードで試してみてください。";
    }
    return `ページ ${availablePages} を表示しています（最終ページ）。指定されたページ ${requestedPage} は存在しません。`;
  }
  
  return "";
}
