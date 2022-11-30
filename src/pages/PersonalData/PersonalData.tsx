import { FC, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { setPersonalData, TPersonalData } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate } from 'react-router-dom'

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const Input = styled(TextField)({
    width: '100%',
})

const CustomButton = styled(Button)({
    height: '50px',
})

export const PersonalData: FC = () => {
    const { firstName, lastName, email, phone } = useAppSelector((state) => state.personalData)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const schema = yup
        .object({
            firstName: yup.string().required('First name is required'),
            lastName: yup.string().required('Last name is required'),
            email: yup.string().required('Email is required').email('Email is not valid'),
            phone: yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
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

    const Handlers = {
        onSubmit(data: TPersonalData) {
            dispatch(setPersonalData(data))
            return navigate('/order-date')
        },
    }

    useEffect(() => {
        setValue('firstName', firstName)
        setValue('lastName', lastName)
        setValue('email', email)
        setValue('phone', phone)
    }, [])

    return (
        <form onSubmit={handleSubmit((data) => Handlers.onSubmit(data as TPersonalData))} className="personal-data">
            <div className="personal-data__container container column">
                <h1 className="personal-data__title title">Personal Information</h1>

                <div className="personal-data__row row">
                    <div className="personal-data__input-container column input-container">
                        <Input id="outlined-basic" label="First name *" variant="outlined" {...register('firstName')} />
                        {errors?.firstName?.message && (
                            <div className="personal-data__error error-message">
                                {errors.firstName.message as string}
                            </div>
                        )}
                    </div>
                    <div className="personal-data__input-container column input-container">
                        <Input id="outlined-basic" label="Last name *" variant="outlined" {...register('lastName')} />
                        {errors?.lastName?.message && (
                            <div className="personal-data__error error-message">
                                {errors.lastName.message as string}
                            </div>
                        )}
                    </div>
                </div>

                <div className="personal-data__row row">
                    <div className="personal-data__input-container column input-container">
                        <Input id="outlined-basic" label="Email *" variant="outlined" {...register('email')} />
                        {errors?.email?.message && (
                            <div className="personal-data__error error-message">{errors.email.message as string}</div>
                        )}
                    </div>
                    <div className="personal-data__input-container column input-container">
                        <Input id="outlined-basic" label="Phone *" variant="outlined" {...register('phone')} />
                        {errors?.phone?.message && (
                            <div className="personal-data__error error-message">{errors.phone.message as string}</div>
                        )}
                    </div>
                </div>

                <div className="personal-data__row row justify">
                    <CustomButton variant="outlined" color="error" size="large">
                        Back to cart
                    </CustomButton>
                    <CustomButton variant="contained" color="error" size="large" type="submit">
                        Continue
                    </CustomButton>
                </div>
            </div>
        </form>
    )
}
