import { ChangeEvent, FC, useEffect } from 'react'
import { Input } from '../../../../components/StyledComponents'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import Button from '@mui/material/Button'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import { setPaymentData, TPaymentData } from '../../../../store/payment'

export const PaymentForm: FC = () => {
    const { paymentData } = useAppSelector((state) => state.payment)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const schema = yup
        .object({
            cardholderName: yup.string().required('Cardholder name is required'),
            cardholderId: yup.string().required('Cardholder ID is required'),
            cardNumber: yup
                .string()
                .min(16, 'Min value 16')
                .max(16, 'Max value 16')
                .typeError('You must specify a number')
                .required('Card number is required'),
            expYear: yup.string().min(4, 'Min value 4'),
            expMonth: yup.string().min(2, 'Min value 2'),
            cvv: yup.string().min(3, 'Min value 3'),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const Events = {
        onSubmit(data: TPaymentData) {
            dispatch(setPaymentData(data))
            return navigate('/order-data')
        },
        onInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) {
            const result = event.target.value.replace(/\D/g, '')
            setValue(label, result)
        },
    }

    useEffect(() => {
        if (paymentData) {
            setValue('cardholderName', paymentData.cardholderName)
            setValue('cardholderId', paymentData.cardholderId)
            setValue('cardNumber', paymentData.cardNumber)
            setValue('expYear', paymentData.expYear)
            setValue('expMonth', paymentData.expMonth)
            setValue('cvv', paymentData.cvv)
        }
    }, [])

    return (
        <div className="payment-form">
            <form
                onSubmit={handleSubmit((data) => Events.onSubmit(data as TPaymentData))}
                className="payment-form__container column"
            >
                <div className="payment-form__title subtitle">Credit card details</div>

                <div className="payment-form__row row">
                    <div className="payment-form__input-container column input-container">
                        <Input label="Cardholder name *" variant="outlined" {...register('cardholderName')} />
                        {errors?.cardholderName?.message && (
                            <div className="payment-form__error error-message">
                                {errors.cardholderName.message as string}
                            </div>
                        )}
                    </div>
                    <div className="payment-form__input-container column input-container">
                        <Input label="Cardholder ID *" variant="outlined" {...register('cardholderId')} />
                        {errors?.cardholderId?.message && (
                            <div className="payment-form__error error-message">
                                {errors.cardholderId.message as string}
                            </div>
                        )}
                    </div>
                </div>

                <div className="payment-form__row row">
                    <div className="payment-form__input-container payment-form__input-container_width column input-container">
                        <Input
                            label="Card number *"
                            variant="outlined"
                            {...register('cardNumber')}
                            onChange={(e) => Events.onInputChange(e, 'cardNumber')}
                        />
                        {errors?.cardNumber?.message && (
                            <div className="payment-form__error error-message">
                                {errors.cardNumber.message as string}
                            </div>
                        )}
                    </div>

                    <div className="payment-form__row payment-form__row_width row">
                        <div className="payment-form__input-container payment-form__input-container_small column input-container">
                            <Input
                                label="Exp. year "
                                variant="outlined"
                                {...register('expYear')}
                                onChange={(e) => Events.onInputChange(e, 'expYear')}
                                inputProps={{
                                    maxLength: 4,
                                }}
                                required
                            />
                        </div>

                        <div className="payment-form__input-container payment-form__input-container_small column input-container">
                            <Input
                                label="Exp. mon "
                                variant="outlined"
                                {...register('expMonth')}
                                onChange={(e) => Events.onInputChange(e, 'expMonth')}
                                inputProps={{
                                    maxLength: 2,
                                }}
                                required
                            />
                        </div>

                        <div className="payment-form__input-container payment-form__input-container_small column input-container">
                            <Input
                                label="CVV"
                                variant="outlined"
                                {...register('cvv')}
                                onChange={(e) => Events.onInputChange(e, 'cvv')}
                                type="password"
                                inputProps={{
                                    maxLength: 3,
                                }}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="payment-form__save">
                    <Checkbox color="error" />
                    <div className="payment-form__save-text">Save credit card information for future bookings</div>
                    <InfoOutlinedIcon color="error" />
                </div>

                <div className="payment-form__info">
                    <LocalAtmOutlinedIcon fontSize="large" />
                    <div className="payment-form__info-text">
                        Checkout is done securely, your payment deteils are protected using
                        state-of-the-art-tokenization technologies in cooperation with Credit-Guard Payments Gateway
                        <span> Learn more</span>
                    </div>
                </div>

                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    type="submit"
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px', alignSelf: 'flex-end', fontSize: '16px' }}
                >
                    <GppGoodOutlinedIcon />
                    place order | 0.00
                </Button>
            </form>
        </div>
    )
}
