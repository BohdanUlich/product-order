import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '../components'
import { OrderDate, PersonalData } from '../pages'

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PersonalData />} />
                <Route path="/order-date" element={<OrderDate />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}
