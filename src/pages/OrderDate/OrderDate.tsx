import { FC } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ChooseOrderDate } from './components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setSelectedStore } from '../../store'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components'
import { Input } from './styled'

export const OrderDate: FC = () => {
    const { selectedStore, selectedDate, loading } = useAppSelector((state) => state.deliveryDate)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const Events = {
        handleChange(event: SelectChangeEvent<string>) {
            const {
                target: { value },
            } = event

            dispatch(setSelectedStore(value))
        },
        handleBackToPersonalData() {
            navigate('/')
        },
        handleContinueToPay() {
            navigate('/payment')
        },
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
                            value={selectedStore ? selectedStore : 'Choose a store'}
                            label="Age"
                            onChange={Events.handleChange}
                            input={<Input />}
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
                <ChooseOrderDate />

                <div className="order-date__btns row justify">
                    <Button
                        variant="outlined"
                        color="error"
                        size="large"
                        onClick={Events.handleBackToPersonalData}
                        sx={{ fontSize: '16px' }}
                    >
                        Back to personal details
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        type="submit"
                        disabled={selectedStore && selectedDate ? false : true}
                        sx={{ fontSize: '16px' }}
                        onClick={Events.handleContinueToPay}
                    >
                        Continue to pay
                    </Button>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}
