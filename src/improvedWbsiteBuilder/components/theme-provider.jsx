
import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from '../ui/next-themes'

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
