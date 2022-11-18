import React,{Fragment} from 'react'
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";

import {MdOutlineLocalShipping} from 'react-icons/md';
import {BsCheck2All, BsBank} from 'react-icons/bs';

import './CheckoutStep.css'

const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography className='steptypo'>Shipping Details</Typography>,
            icon: <MdOutlineLocalShipping size={26}/>,
        },
        {
            label: <Typography className='steptypo'>Cofirm Order</Typography>,
            icon: <BsCheck2All size={26}/>,
        },
        {
            label: <Typography className='steptypo'>Payment</Typography>,
            icon: <BsBank size={26}/>,
        }
    ];

    const stepStyles = {
        boxSizing: "border-box"
    }

  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} className='steps'>
            {steps.map((step, index) => (

                <Step 
                    key={index} 
                    active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                    >

                    <StepLabel icon={step.icon} style={{color: activeStep >= index ? "tomato" : "#273746"}}>
                        <div style={{color: activeStep >= index ? "tomato" : "#273746"}}>
                            {step.label }
                        </div>
                    </StepLabel>

                </Step>
            ))}
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps