"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login"
  const isStudentPage = pathname === "/estudiante" || pathname.startsWith("/estudiante/")

  if (isAuthPage || isStudentPage) {
    return <main className="min-h-svh w-full bg-background">{children}</main>
  }

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 lg:block">
        <AppSidebar />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
