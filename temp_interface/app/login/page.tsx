"use client"

import { useState } from "react"
import { toast } from "sonner"
import { GraduationCap, UserCheck, ArrowRight, Loader2 } from "lucide-react"
import { useAuth, UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState("2021050")
  const [password, setPassword] = useState("password123")
  const [selectedRole, setSelectedRole] = useState<UserRole>("STUDENT")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const isTeacher =
        identifier.toLowerCase().includes("profesor") ||
        identifier.toLowerCase().includes("docente") ||
        identifier.toLowerCase().includes("laura")

      const roleToUse: UserRole = isTeacher ? "TEACHER" : "STUDENT"

      toast.success(
        roleToUse === "TEACHER"
          ? "Sesión iniciada como Docente"
          : `Sesión iniciada para el carné ${identifier}`,
      )
      login(roleToUse, identifier)
    }, 400)
  }

  const handleQuickLogin = (role: UserRole, carnetOrEmail?: string) => {
    setSelectedRole(role)
    const id = carnetOrEmail ?? (role === "TEACHER" ? "profesor@kinal.edu.gt" : "2021050")
    setIdentifier(id)
    toast.info(
      role === "TEACHER"
        ? "Ingresando como Docente (Prof. Laura Méndez)"
        : `Ingresando como Alumno (Carné ${id})`,
    )
    login(role, id)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-sidebar text-white shadow-xs">
            <span className="text-base font-bold tracking-tight">Φ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            FísicaLab
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Sistema Académico de Física · Colegio Técnico Kinal
          </p>
        </div>

        <Card className="border border-border bg-card shadow-xs">
          <CardHeader className="border-b border-border/80 pb-4">
            <CardTitle className="text-base font-semibold text-foreground">
              Inicio de sesión
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Ingresa tus credenciales institucionales para acceder al sistema.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            {/* Acceso Rápido Demostrativo */}
            <div className="rounded-md border border-border bg-muted/40 p-3 text-xs">
              <p className="font-medium text-foreground mb-2">
                Accesos de prueba rápidos:
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("TEACHER")}
                  className="flex items-center justify-between rounded border border-border bg-card px-2.5 py-2 text-left text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="size-3.5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Docente</div>
                      <div className="text-[11px] text-muted-foreground">Prof. Laura Méndez</div>
                    </div>
                  </div>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                    Panel Docente
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("STUDENT", "2021050")}
                  className="flex items-center justify-between rounded border border-border bg-card px-2.5 py-2 text-left text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-3.5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-foreground">Estudiante</div>
                      <div className="text-[11px] text-muted-foreground">Camila Torres · Carné 2021050</div>
                    </div>
                  </div>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
                    IN6AM
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="identifier"
                  className="text-xs font-medium text-foreground"
                >
                  Carné o correo institucional
                </label>
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Ej. 2021050 o profesor@kinal.edu.gt"
                  required
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-foreground"
                  >
                    Contraseña
                  </label>
                  <span className="text-[11px] text-muted-foreground/75">demo: password123</span>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-8 text-xs"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-8 text-xs font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-3.5 animate-spin" />
                    Verificando credenciales...
                  </>
                ) : (
                  <>
                    Ingresar al sistema
                    <ArrowRight className="ml-1.5 size-3.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-2 text-center border-t border-border">
              <p className="text-[11px] text-muted-foreground">
                Departamento de Ciencias · Física Fundamental
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
