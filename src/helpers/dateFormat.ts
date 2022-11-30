import moment from 'moment'

export const format = {
  dateFormat: 'DD.MM',
  formatDate(date: string | number, format: string) {
    return moment(date).format(format)
  },
}
