import { ExerciseBank, type BankTab } from "@/components/exercises/exercise-bank"

const TABS: BankTab[] = ["todos", "crear", "importar"]

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const initialTab = TABS.includes(tab as BankTab) ? (tab as BankTab) : "todos"
  return <ExerciseBank key={initialTab} initialTab={initialTab} />
}
