import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import { Children, useState } from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'

export const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
    const childrenArray = Children.toArray(children as any) as any[]
    const [step, setStep] = useState<number>(0)
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState<boolean>(false)

    const isLastStep = () => {
        return step === childrenArray.length - 1
    }

    const onChangeStep = (index: number) => {
        if (step > index) {
            setStep(index)
        }
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers)
                    setCompleted(true)
                } else {
                    setStep((s) => s + 1)

                    helpers.setTouched({})
                }
            }}
        >
            <Form className="wrapper">
                <div className="stepper">
                    <div className="stepper__container container">
                        <Stepper activeStep={step}>
                            {childrenArray.map((child, index) => {
                                return (
                                    <Step key={child.props.label} completed={step > index || completed}>
                                        <StepLabel onClick={() => onChangeStep(index)} sx={{ cursor: 'pointer' }}>
                                            {child.props.label}
                                        </StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </div>
                </div>

                {currentChild}
            </Form>
        </Formik>
    )
}
