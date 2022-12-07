import { MenuItem, Button } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import { FC, useEffect, useState } from 'react'
import { AvailableHours, DeliveryDate, OrderDateProps } from './types'
import classNames from 'classnames'
import { fetchDeliveryDates } from './orderDateAPI'
import { format } from '../../helpers'

export const OrderDate: FC<OrderDateProps> = ({ store, setStore, selectedDate, setDate }) => {
    const [additionalTimesVisibility, setadditionalTimesVisibility] = useState<boolean>(false)
    const [deliveryDates, setDeliveryDates] = useState<DeliveryDate[]>([])

    useEffect(() => {
        setDates()
    }, [])

    const setDates = async () => {
        const date: DeliveryDate[] = await fetchDeliveryDates()

        setDeliveryDates(date)
    }

    const showAdditionalTimes = () => {
        setadditionalTimesVisibility(true)
    }
    const handleChange = (event: SelectChangeEvent<string>) => {
        const {
            target: { value },
        } = event

        setStore(value)
    }
    const onChooseDate = (date: DeliveryDate, hours: AvailableHours) => {
        setDate({ date: date.date, hours })
    }

    return (
        <div className="order-date">
            <div className="order-date__container container column">
                <h1 className="order-date__title title">Order Date & Time</h1>

                <div className="order-date__input-container column input-container">
                    <div className="order-date__subtitle subtitle">Select pickup location</div>
                    <FormControl fullWidth>
                        <Select
                            id="select-store"
                            value={store}
                            label="Age"
                            onChange={handleChange}
                            input={<OutlinedInput sx={{ borderRadius: '30px' }} />}
                            renderValue={(selected) => {
                                return <em>{selected}</em>
                            }}
                        >
                            <MenuItem value={'Choose a store'} sx={{ display: 'none' }}>
                                Choose a store
                            </MenuItem>
                            <MenuItem value={'First store'}>First store</MenuItem>
                            <MenuItem value={'Second store'}>Second store</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="choose-date">
                    <div className="choose-date__container">
                        <div className="choose-date__title subtitle">Choose pickup date</div>

                        <div
                            className={classNames('choose-date__content column', additionalTimesVisibility && 'active')}
                        >
                            {deliveryDates?.map((date: DeliveryDate) => (
                                <div className="choose-date__row row align-center" key={date?.id}>
                                    <div className="choose-date__day">
                                        {format.formatDate(date?.date, format.dateFormat)}
                                    </div>
                                    <div className="choose-date__btn-group row">
                                        {date.available_hours?.map((hours: AvailableHours) => (
                                            <Button
                                                variant={
                                                    selectedDate?.hours?.id === hours?.id ? 'contained' : 'outlined'
                                                }
                                                size="large"
                                                sx={{ fontSize: '16px' }}
                                                color="error"
                                                onClick={() => onChooseDate(date, hours)}
                                                key={hours?.id}
                                            >
                                                {hours?.hours}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="choose-date__btn" onClick={showAdditionalTimes}>
                            view additional delivery times
                        </div>
                    </div>
                </div>

                <div className="order-date__btns row justify">
                    <Button variant="outlined" color="error" size="large" onClick={() => {}} sx={{ fontSize: '16px' }}>
                        Back to personal details
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        type="submit"
                        disabled={store !== 'Choose a store' && selectedDate ? false : true}
                        sx={{ fontSize: '16px' }}
                        onClick={() => {}}
                    >
                        Continue to pay
                    </Button>
                </div>
            </div>
        </div>
    )
}
