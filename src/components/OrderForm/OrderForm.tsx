import { Field } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Checkbox } from '@mui/material'
import { PaymentButton, CustomButton } from './styled'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import { FormikStepper } from '../FormikStepper'
import { FormikStep } from '../FormikStep'
import { TextField } from 'formik-material-ui'
import { OrderDate } from '../OrderDate'
import { SelectedDate } from '../OrderDate/types'

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const OrderForm = () => {
    const [store, setStore] = useState<string>('Choose a store')
    const [date, setDate] = useState<SelectedDate | null>(null)
    const [paymentFormVisibility, setPaymentFormVisibility] = useState<boolean>(false)

    const showPaymentForm = () => {
        setPaymentFormVisibility(true)
    }

    const onSubmit = (data: any) => {
        alert(JSON.stringify({ store: store, date: date?.date, hours: date?.hours.hours, ...data }, null, 2))
    }

    return (
        <FormikStepper
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                cardholderName: '',
                cardholderId: '',
                cardNumber: '',
                expYear: '',
                expMonth: '',
                cvv: '',
            }}
            onSubmit={(data) => onSubmit(data)}
        >
            <FormikStep
                label="Personal Information"
                validationSchema={yup.object({
                    firstName: yup.string().required('First name is required'),
                    lastName: yup.string().required('Last name is required'),
                    email: yup.string().required('Email is required').email('Email is not valid'),
                    phone: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
                })}
            >
                <div className="personal-data ">
                    <div className="personal-data__container container column">
                        <h1 className="personal-data__title title">Personal Information</h1>

                        <div className="personal-data__row row">
                            <div className="personal-data__input-container column input-container">
                                <Field component={TextField} name="firstName" label="First name *" variant="outlined" />
                            </div>
                            <div className="personal-data__input-container column input-container">
                                <Field component={TextField} name="lastName" label="Last name *" variant="outlined" />
                            </div>
                        </div>

                        <div className="personal-data__row row">
                            <div className="personal-data__input-container column input-container">
                                <Field component={TextField} label="Email *" variant="outlined" name="email" />
                            </div>
                            <div className="personal-data__input-container column input-container">
                                <Field component={TextField} label="Phone *" variant="outlined" name="phone" />
                            </div>
                        </div>

                        <div className="personal-data__row row justify">
                            <CustomButton variant="outlined" color="error" size="large">
                                Back to cart
                            </CustomButton>
                            <CustomButton
                                variant="contained"
                                color="error"
                                size="large"
                                type="submit"
                                sx={{ width: '159px' }}
                            >
                                Continue
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </FormikStep>

            <FormikStep label="Order Date" isValid={store !== 'Choose a store' && date ? true : false}>
                <OrderDate store={store} setStore={setStore} selectedDate={date} setDate={setDate} />
            </FormikStep>

            <FormikStep
                label="Payment"
                validationSchema={yup.object({
                    cardholderName: yup.string().required('Cardholder name is required'),
                    cardholderId: yup
                        .string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required('Cardholder ID is required'),
                    cardNumber: yup
                        .string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required('Card number is required')
                        .min(16, 'Must be 16 digits'),
                    expYear: yup
                        .string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .min(4, 'Must be 4 digits')
                        .required(),
                    expMonth: yup
                        .string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .min(2, 'Must be 2 digits')
                        .required(),
                    cvv: yup.string().min(3, 'Must be 3 digits').required(),
                })}
            >
                <div className="payment">
                    <div className="payment__container container column">
                        <h1 className="payment__title title">Payment</h1>

                        <div className="payment__subtitle subtitle">Select payment method</div>

                        <PaymentButton
                            variant={paymentFormVisibility ? 'contained' : 'outlined'}
                            size="large"
                            color="error"
                            onClick={showPaymentForm}
                        >
                            {
                                <>
                                    <CreditCardIcon fontSize="large" />
                                    credit card
                                </>
                            }
                        </PaymentButton>

                        {paymentFormVisibility && (
                            <div className="payment-form">
                                <div className="payment-form__container column">
                                    <div className="payment-form__title subtitle">Credit card details</div>

                                    <div className="payment-form__row row">
                                        <div className="payment-form__input-container column input-container">
                                            <Field
                                                component={TextField}
                                                label="Cardholder name *"
                                                variant="outlined"
                                                name="cardholderName"
                                            />
                                        </div>
                                        <div className="payment-form__input-container column input-container">
                                            <Field
                                                component={TextField}
                                                label="Cardholder ID *"
                                                variant="outlined"
                                                name="cardholderId"
                                            />
                                        </div>
                                    </div>

                                    <div className="payment-form__row row">
                                        <div className="payment-form__input-container payment-form__input-container_width column input-container">
                                            <Field
                                                component={TextField}
                                                label="Card number *"
                                                variant="outlined"
                                                name="cardNumber"
                                                inputProps={{
                                                    maxLength: 16,
                                                }}
                                            />
                                        </div>

                                        <div className="payment-form__row payment-form__row_width row">
                                            <div className="payment-form__input-container payment-form__input-container_small column input-container">
                                                <Field
                                                    component={TextField}
                                                    label="Exp. year"
                                                    variant="outlined"
                                                    name="expYear"
                                                    inputProps={{
                                                        maxLength: 4,
                                                    }}
                                                />
                                            </div>

                                            <div className="payment-form__input-container payment-form__input-container_small column input-container">
                                                <Field
                                                    component={TextField}
                                                    label="Exp. mon"
                                                    variant="outlined"
                                                    name="expMonth"
                                                    inputProps={{
                                                        maxLength: 2,
                                                    }}
                                                />
                                            </div>

                                            <div className="payment-form__input-container payment-form__input-container_small column input-container">
                                                <Field
                                                    component={TextField}
                                                    label="CVV"
                                                    variant="outlined"
                                                    name="cvv"
                                                    type="password"
                                                    inputProps={{
                                                        maxLength: 3,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="payment-form__save">
                                        <Checkbox color="error" />
                                        <div className="payment-form__save-text">
                                            Save credit card information for future bookings
                                        </div>
                                        <InfoOutlinedIcon color="error" />
                                    </div>

                                    <div className="payment-form__info">
                                        <LocalAtmOutlinedIcon fontSize="large" />
                                        <div className="payment-form__info-text">
                                            Checkout is done securely, your payment deteils are protected using
                                            state-of-the-art-tokenization technologies in cooperation with Credit-Guard
                                            Payments Gateway
                                            <span> Learn more</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        type="submit"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            alignSelf: 'flex-end',
                                            fontSize: '16px',
                                        }}
                                    >
                                        <GppGoodOutlinedIcon />
                                        place order | 0.00
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </FormikStep>
        </FormikStepper>
    )
}
