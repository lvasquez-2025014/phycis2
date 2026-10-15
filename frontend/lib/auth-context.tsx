"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { students } from "./data"

export type UserRole = "TEACHER" | "STUDENT"

export interface UserSession {
  id: string
  carnet?: string
  name: string
  email: string
  role: UserRole
  roleLabel: string
  codigoAcademico?: string
  jornada?: string
  seccion?: string
  avatar: string
}

const TEACHER_USER: UserSession = {
  id: "TEA-01",
  name: "Laura Méndez",
  email: "profesor@kinal.edu.gt",
  role: "TEACHER",
  roleLabel: "Profesora",
  avatar: "LM",
}

const DEFAULT_STUDENT: UserSession = {
  id: "ST-03",
  carnet: "2021050",
  name: "Camila Torres",
  email: "camila.torres@kinal.edu.gt",
  role: "STUDENT",
  roleLabel: "Alumno",
  codigoAcademico: "IN6AM",
  jornada: "Matutina",
  seccion: "A",
  avatar: "CT",
}

interface AuthContextType {
  user: UserSession | null
  role: UserRole | null
  login: (role: UserRole, identifier?: string) => void
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedOut = localStorage.getItem("fisica_lab_logged_out") === "1"
    const saved = localStorage.getItem("fisica_lab_user")

    if (isLoggedOut) {
      setUser(null)
      return
    }

    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        setUser(TEACHER_USER)
      }
    } else {
      setUser(TEACHER_USER)
    }
  }, [])

  const login = (role: UserRole, identifier?: string) => {
    localStorage.removeItem("fisica_lab_logged_out")
    let selected: UserSession

    if (role === "TEACHER") {
      selected = TEACHER_USER
    } else {
      // Buscar si el identificador es un carné registrado
      const foundStudent = identifier
        ? students.find(
            (s) =>
              s.carnet === identifier.trim() ||
              s.email.toLowerCase() === identifier.trim().toLowerCase(),
          )
        : null

      if (foundStudent) {
        selected = {
          id: foundStudent.id,
          carnet: foundStudent.carnet,
          name: foundStudent.name,
          email: foundStudent.email,
          role: "STUDENT",
          roleLabel: "Alumno",
          codigoAcademico: foundStudent.codigoAcademico,
          jornada: foundStudent.jornada,
          seccion: foundStudent.seccion,
          avatar: foundStudent.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join(""),
        }
      } else {
        selected = DEFAULT_STUDENT
      }
    }

    setUser(selected)
    localStorage.setItem("fisica_lab_user", JSON.stringify(selected))

    if (role === "TEACHER") {
      router.push("/")
    } else {
      router.push("/estudiante")
    }
  }

  const switchRole = (role: UserRole) => {
    login(role)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fisica_lab_user")
    localStorage.setItem("fisica_lab_logged_out", "1")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
