import { Session } from "hono-sessions"

export type SessionDataTypes = {
  // Définir ici vos types de données de session
  user?: {}
  role?: string
  // ... autres propriétés
}

export interface AppVariables {
  session: Session<SessionDataTypes>
  session_key_rotation: boolean
}

export type AppContext = {
  Variables: AppVariables
}