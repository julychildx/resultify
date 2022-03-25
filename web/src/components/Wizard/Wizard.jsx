import React, { useEffect, useState } from 'react'

import axios from 'axios'
import * as Constants from "../../Constants"
import { NotificationManager } from 'react-notifications'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Record from '../Primary/Record'
import Remark from '../Primary/Remark'
import StudentInfo from '../Primary/StudentInfo'
import StudentRating from '../Primary/Rating'
import { Form } from '@themesberg/react-bootstrap'
import Progress from './Progress'
import Done from './Done'
import './wizard.css'

const steps = [
    { Component: StudentInfo, tag: "bio", title: "Student Information" },
    { Component: Record, tag: "record", title: "Student Record" },
    { Component: StudentRating, tag: "rating", title: "Student Rating" },
    { Component: Remark, tag: "remark", title: "Remarks" },
]

const Wizard = () => {
    const [formData, setFormData] = useState({})
    const [step, setStep] = useState(0)
    const [error, setError] = useState(false)

    const nextPrevStep = (stepIndex) => setStep(step + stepIndex)

    const submitFormData = () => {
        const stepIndex = !document.activeElement.id ? 1 : -1
        nextPrevStep(stepIndex)
    }

    const handleInputData = e => {
        const { name, value } = e.target
        console.log(e)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <div id="regForm">
                <div className="all-steps" id="all-steps">
                    <Progress step={ step } />
                </div>
                {
                    steps.map(({ Component, title }, index) => index === step ?
                        <Form onSubmit={ submitFormData } key={ index }>
                            <Component
                                title={ title }
                                value={ formData }
                                handleFormData={ handleInputData } />

                            <div className="nextprevious" id="nextprevious">
                                <div className="btn-nextprevious">
                                    {
                                        step > 0 ?
                                            <button formNoValidate id="prevBtn" type="submit" >
                                                <i className="material-icons">
                                                    <FontAwesomeIcon color='white' icon={ faAngleDoubleLeft } />

                                                </i>
                                            </button> : null
                                    }

                                    <button formNoValidate type="submit" >
                                        <i className="material-icons">
                                            <FontAwesomeIcon color='white' icon={ faAngleDoubleRight } />
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </Form> : null
                    )
                }
                { step === steps.length ? <Done /> : null }
            </div>
        </>
    )
}

export default Wizard
