import { FC } from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { PaymentButton } from './styled'
import { PaymentForm } from './components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setFormVisibility } from '../../store/payment'

export const Payment: FC = () => {
    const { formVisibility } = useAppSelector((state) => state.payment)
    const dispatch = useAppDispatch()

    const Events = {
        showFormHandler() {
            dispatch(setFormVisibility())
        },
    }

    return (
        <div className="payment">
            <div className="payment__container container column">
                <h1 className="payment__title title">Payment</h1>

                <div className="payment__subtitle subtitle">Select payment method</div>

                <PaymentButton
                    variant={formVisibility ? 'contained' : 'outlined'}
                    size="large"
                    color="error"
                    onClick={Events.showFormHandler}
                >
                    {
                        <>
                            <CreditCardIcon fontSize="large" />
                            credit card
                        </>
                    }
                </PaymentButton>

                {formVisibility && <PaymentForm />}
            </div>
        </div>
    )
}
