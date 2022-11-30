import { FC, useEffect, useState } from 'react'
import { format } from '../../../helpers'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchDeliveryDates, setSelectedDate, TAvailableHours, TDeliveryDate } from '../../../store'
import Button from '@mui/material/Button'
import classNames from 'classnames'

export const ChooseOrderDate: FC = () => {
    const [showAdditionalTimes, setShowAdditionalTimes] = useState<boolean>(false)

    const { deliveryDates, selectedDate } = useAppSelector((state) => state.deliveryDate)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchDeliveryDates())
    }, [])

    const Events = {
        chooseDatehandler(date: TDeliveryDate, hours: TAvailableHours) {
            dispatch(setSelectedDate({ date: date.date, hours }))
        },
        showAdditionalTimesHandler() {
            setShowAdditionalTimes(true)
        },
    }

    return (
        <div className="choose-date">
            <div className="choose-date__container">
                <div className="choose-date__title subtitle">Choose pickup date</div>

                <div className={classNames('choose-date__content column', showAdditionalTimes && 'active')}>
                    {deliveryDates?.map((date) => (
                        <div className="choose-date__row row align-center" key={date?.id}>
                            <div className="choose-date__day">{format.formatDate(date?.date, format.dateFormat)}</div>
                            <div className="choose-date__btn-group row">
                                {date.available_hours?.map((hours) => (
                                    <Button
                                        variant={selectedDate?.hours.id === hours.id ? 'contained' : 'outlined'}
                                        size="large"
                                        sx={{ width: '120px' }}
                                        color="error"
                                        onClick={() => Events.chooseDatehandler(date, hours)}
                                        key={hours.id}
                                    >
                                        {hours?.hours}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="choose-date__btn" onClick={Events.showAdditionalTimesHandler}>
                    view additional delivery times
                </div>
            </div>
        </div>
    )
}
