import { AssignmentsView } from "@/components/assignments/assignments-view"

export default async function AssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ nueva?: string }>
}) {
  const { nueva } = await searchParams
  return <AssignmentsView openCreate={nueva === "1"} />
}
