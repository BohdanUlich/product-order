import { FC } from 'react'
import { format } from '../../helpers'
import { useAppSelector } from '../../hooks'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'

export const OrderData: FC = () => {
    const { firstName, lastName, email, phone } = useAppSelector((state) => state.personalData)
    const { selectedStore, selectedDate } = useAppSelector((state) => state.deliveryDate)
    const { paymentData } = useAppSelector((state) => state.payment)

    const navigate = useNavigate()

    const Events = {
        newOrderHandler() {
            localStorage.clear()
            navigate('/')
            window.location.reload()
        },
    }

    return (
        <div className="order-data">
            <div className="order-data__container container column">
                <h1 className="order-data__title title">Order data</h1>

                <div className="order-data__text">
                    Full name: <span>{`${firstName} ${lastName}`}</span>
                </div>
                <div className="order-data__text">
                    Email: <span>{email}</span>
                </div>
                <div className="order-data__text">
                    Phone: <span>{phone}</span>
                </div>

                <div className="order-data__text">
                    Store: <span>{selectedStore}</span>
                </div>
                {selectedDate?.date && (
                    <div className="order-data__text">
                        Date:{' '}
                        <span>{`${format.formatDate(selectedDate?.date, format.dateFormat)} ${
                            selectedDate.hours.hours
                        }`}</span>
                    </div>
                )}

                <div className="order-data__text">
                    Cardholder name: <span>{paymentData?.cardholderName}</span>
                </div>
                <div className="order-data__text">
                    Cardholder ID: <span>{paymentData?.cardholderId}</span>
                </div>
                <div className="order-data__text">
                    Card number: <span>{paymentData?.cardNumber}</span>
                </div>

                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={Events.newOrderHandler}
                    sx={{ margin: '20px 0', fontSize: '16px' }}
                >
                    <Link to="/" className="order-data__link">
                        new order
                    </Link>
                </Button>
            </div>
        </div>
    )
}
