import { TargetForm } from "@/components/buy/target-form"

export default async function EditTargetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <TargetForm mode="edit" targetId={id} />
}
