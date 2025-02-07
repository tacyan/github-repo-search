"use client"

import ReactMarkdown from "react-markdown"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-sm max-w-none overflow-x-auto">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
} 