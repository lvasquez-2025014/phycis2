import { SettingsForm } from "@/components/settings/settings-form"
import { PageHeader } from "@/components/shared"
import { MicrometerCalibrationIllustration } from "@/components/shared/technical-illustrations"

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        kicker="Ajustes Institucionales · Calibración del Sistema"
        title="Configuración Académica"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            Cátedra 2026
          </span>
        }
        description="Preferencias institucionales del docente, membretes de reporte y preconfiguración de documentos."
        illustration={<MicrometerCalibrationIllustration />}
      />
      <SettingsForm />
    </>
  )
}
