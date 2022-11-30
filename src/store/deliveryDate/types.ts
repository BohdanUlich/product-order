export type TInitialState = {
  deliveryDates: TDeliveryDate[]
  selectedDate: TSelectedDate | null
  selectedStore: string | null
  loading: boolean
}

export type TDeliveryDate = {
  id: string
  date: string
  available_hours: TAvailableHours[]
}

export type TAvailableHours = {
  id: string
  hours: string
}

export type TSelectedDate = {
  date: string
  hours: TAvailableHours
}
