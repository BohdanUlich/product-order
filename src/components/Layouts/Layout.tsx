import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Stepper } from '../Stepper/Stepper'

export const Layout: FC = () => {
    return (
        <>
            <Outlet />
            <Stepper />
        </>
    )
}
