import { FC } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import { ChooseOrderDate } from './components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setSelectedStore } from '../../store'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const Input = styled(OutlinedInput)({
    borderRadius: '30px',
    height: '40px',
})

export const OrderDate: FC = () => {
    const { selectedStore, selectedDate } = useAppSelector((state) => state.deliveryDate)

    const dispatch = useAppDispatch()

    const Events = {
        handleChange(event: SelectChangeEvent<string>) {
            const {
                target: { value },
            } = event

            dispatch(setSelectedStore(value))
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
                    <Button variant="outlined" color="error" size="large">
                        <Link to="/">Back to personal details</Link>
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        type="submit"
                        disabled={selectedStore && selectedDate ? false : true}
                    >
                        <Link to="/payment">Continue to pay</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
