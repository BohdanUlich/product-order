import axios from 'axios'

export const fetchDeliveryDates = async () => {
  try {
    const { data } = await axios.get('https://raw.githubusercontent.com/rostyslav-nab/mockData/main/mock.json')

    return data
  } catch (err: any) {
    console.log(err)
  }
}
