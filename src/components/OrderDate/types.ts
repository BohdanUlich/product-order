export type OrderDateProps = {
  store: string
  setStore: (store: string) => void
  selectedDate: SelectedDate | null
  setDate: (date: SelectedDate) => void
}

export type DeliveryDate = {
  available_hours: AvailableHours[]
  date: string
  id: string
}

export type AvailableHours = {
  id: string
  hours: string
}

export type SelectedDate = {
  date: string
  hours: Hours
}

export type Hours = {
  id: string
  hours: string
}
