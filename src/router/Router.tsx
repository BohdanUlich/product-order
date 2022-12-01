import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '../components'
import { OrderDate, Payment, PersonalData } from '../pages'
import { OrderData } from '../pages/OrderData'

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PersonalData />} />
                <Route path="/order-date" element={<OrderDate />} />
                <Route path="/payment" element={<Payment />} />
            </Route>
            <Route path="/order-data" element={<OrderData />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
