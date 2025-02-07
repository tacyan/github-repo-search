import '@testing-library/jest-dom'

// React 18のための設定
import { TextDecoder, TextEncoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Next.jsのモック
jest.mock('next/link', () => {
  return ({ children, href }) => <a href={href}>{children}</a>
})

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '',
      query: {},
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
}))

