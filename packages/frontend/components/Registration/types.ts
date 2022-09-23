import { SubscribeResponse } from '@/store/auth'

export type StepProps = {
  onStep: (data: unknown) => void
  onBack?: () => void
  onProgress: (value: number) => void
}

export type PlanType = 'yearly' | 'monthly'

export type RegistrationData = {
  credentials: { email: string; password: string }
  payment: { plan: PlanType }
  card: SubscribeResponse
}
