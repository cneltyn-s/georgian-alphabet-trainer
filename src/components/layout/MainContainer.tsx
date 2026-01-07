import { ReactNode } from "react"

interface MainContainerProps {
  children: ReactNode
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <main className="flex-1 container mx-auto max-w-3xl px-4 py-6 md:py-10 space-y-8">
      {children}
    </main>
  )
}
