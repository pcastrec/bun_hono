import { Session } from "hono-sessions"

export interface SessionDataTypes {
  // Définir ici vos types de données de session
  userId?: number
  pseudo?: string
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