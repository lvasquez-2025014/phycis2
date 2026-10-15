import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Outfit, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google"
import { Toaster } from "sonner"
import { AuthProvider } from "@/lib/auth-context"
import { AppShell } from "@/components/layout/app-shell"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FísicaLab · Sistema Académico de Física",
  description:
    "Sistema universitario y escolar para la gestión de ejercicios, asignaciones por carné y evaluación en Física.",
}

export const viewport: Viewport = {
  themeColor: "#2D3250",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${bricolage.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <Toaster position="bottom-right" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
