export type TInitialState = {
  formVisibility: boolean
  paymentData: TPaymentData | null
}

export type TPaymentData = {
  cardNumber: string
  cardholderId: string
  cardholderName: string
  cvv: string
  expMonth: string
  expYear: string
}
