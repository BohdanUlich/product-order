import LinearStepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TStep } from './types'

export const Stepper = () => {
    const [activeStep, setActiveStep] = useState(0)

    const steps: TStep[] = useMemo(
        () => [
            { label: 'Personal Information', route: '/', index: 0 },
            { label: 'Coordination of arrival', route: '/order-date', index: 1 },
            { label: 'Payment', route: '/payment', index: 2 },
        ],
        []
    )

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/order-date') {
            Events.handleSetStep(1)
        }
        if (location.pathname === '/payment') {
            Events.handleSetStep(2)
        }
    }, [location])

    const Events = {
        handleSetStep(index: number) {
            setActiveStep(index)
        },
        handleClickOnStep(index: number) {
            setActiveStep((prev) => (prev > index ? index : prev))
        },
    }

    return (
        <div className="stepper">
            <div className="stepper__container container">
                <LinearStepper activeStep={activeStep}>
                    {steps.map((step) => {
                        const stepProps: { completed?: boolean } = {}

                        return (
                            <Step key={step.label} {...stepProps}>
                                <Link to={step.index < activeStep ? step.route : steps[activeStep].route}>
                                    <StepLabel
                                        onClick={() => Events.handleClickOnStep(step.index)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {step.label}
                                    </StepLabel>
                                </Link>
                            </Step>
                        )
                    })}
                </LinearStepper>
            </div>
        </div>
    )
}
