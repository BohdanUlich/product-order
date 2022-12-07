import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

export const PaymentButton = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  alignItems: 'center',
  fontWeight: '600',
  alignSelf: 'flex-start',
})

export const CustomButton = styled(Button)({
  height: '50px',
  fontSize: '16px',
})
