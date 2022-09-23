export type RegisterBody = {
  email: string
  password: string
  name: string
}

export type RequestForgotPassBody = {
  email: string
}

export type ResetPassBody = {
  password: string
}

export type SubscribeBody = {
  userId?: string
  type: string
  cardNumber: string
  cardExpMonth: string
  cardExpYear: string
  cvc: string
  billingAddress?: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export type RegisterResponse = {
  body: {
    stripe: {
      cards: any[]
    }
    bookmarks: any[]
    _id: string
    name: string
    picture: string
    userId: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
  } & ErrorResponse
  statusCode: number
}

export type Credentials = {
  accessToken: string
  _id: string
  firstName: string
  lastName: string
  picture: string
}

export type Item = {
  id: string
  createdAt: Date
}

export type Stripe = {
  item: Item
  id: string
  collectionMethod: string
  created: Date
  currentPeriodStart: Date
  currentPeriodEnd: Date
}

export type Stripe2 = {
  invoiceId: string
  chargeId: string
  invoicePDF: string
  amountDue: number
  amountPaid: number
  periodStart: Date
  periodEnd: Date
}

export type Payment = {
  _id: string
  userId: string
  subscriptionId: string
  stripe: Stripe2
  createdAt: Date
  updatedAt: Date
  __v: number
}

export type Subscription2 = {
  stripe: Stripe
  payments: Payment[]
  active: boolean
  _id: string
  userId: string
  type: string
  createdAt: Date
  updatedAt: Date
  __v: number
  id: string
}

export type Subscription = {
  credentials: Credentials
  subscription: Subscription2
}

export type SubscribeResponse = {
  body: { subscription: Subscription } & ErrorResponse
  statusCode: number
}

export type RequestForgotPassResponse = {
  body: { success: boolean } & ErrorResponse
  statusCode: number
}

export type ErrorResponse = {
  status: string
  message: string
  errors: {
    msg: string
    param: string
  }[]
}

export const register = async (body: RegisterBody): Promise<RegisterResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return { body: await response.json(), statusCode: response.status }
}

export const requestForgotPass = async (
  body: RequestForgotPassBody
): Promise<RequestForgotPassResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/passwordResetEmail`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return { body: await response.json(), statusCode: response.status }
}

export const resetPass = async (
  code: string,
  body: ResetPassBody
): Promise<RequestForgotPassResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/resetPassword/${code}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return { body: await response.json(), statusCode: response.status }
}

export const subscribe = async (body: SubscribeBody): Promise<SubscribeResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return { body: await response.json(), statusCode: response.status }
}
