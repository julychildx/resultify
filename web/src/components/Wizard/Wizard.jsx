import React, { useEffect, useState } from 'react'

import axios from 'axios'
import * as Constants from "../../Constants"
import { NotificationManager } from 'react-notifications'
import StepIdicator from './StepIdicator'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Primary from '../Primary/Primary'
import './wizard.css'

const Wizard = () => {
    const [formData, setFormData] = useState({})
    //const [currentTab, setcurrentTab] = useState(0)
    let currentTab = 0


    useEffect(() => {
        showTab(currentTab)
    }, [currentTab])

    useEffect(() => {
        //console.log(formData)
    }, [formData])

    const handleChange = (form) => {
        setFormData(formData => ({ ...formData, ...form }))
    }

    function showTab(tabIndex) {
        let tabs = document.getElementsByClassName("tab")
        tabs[tabIndex].style.display = "block"
        tabs[tabIndex].classList.add('active-tab')
        document.getElementById("prevBtn").style.display = (tabIndex == 0) ? "none" : "inline"

        fixStepIndicator(tabIndex)
    }

    function nextPrev(tabIndex) {
        //console.log(tabIndex)
        let tabs = document.getElementsByClassName("tab")
        if (tabIndex == 1 && !validateForm()) return false
        tabs[currentTab].style.display = "none"
        tabs[currentTab].classList.remove('active-tab')
        currentTab = currentTab + tabIndex
        //setcurrentTab(prev => prev + n)
        if (currentTab >= tabs.length)
        {
            document.getElementById("nextprevious").style.display = "none"
            document.getElementById("all-steps").style.display = "none"
            document.getElementById("text-message").style.display = "block"
        }
        if (currentTab < tabs.length) showTab(currentTab)
        if (tabIndex === 1) sendToServer(tabs[currentTab - 1].id)
    }

    function validateForm() {
        let x, y, i, valid = true
        x = document.getElementsByClassName("tab")
        y = x[currentTab].getElementsByTagName("input")
        for (i = 0; i < y.length; i++)
        {
            if (y[i].value == "")
            {
                y[i].className += " invalid"; valid = false
            }
        }
        if (true) { document.getElementsByClassName("step")[currentTab].className += " finish" } return true
    }

    function fixStepIndicator(n) {
        let i, x = document.getElementsByClassName("step")
        for (i = 0; i < x.length; i++)
        {
            x[i].className = x[i].className.replace(" active", "")
        }
        x[n].className += " active"
    }

    const sendToServer = async (id) => {
        try
        {   // Get Acceess token and user info using google jwt
            let resp = await axios.post(`${Constants.apiV1}/api/v1/candidate/${id}`, formData)
            NotificationManager.info(`Updated Successfully !`)
            console.log(resp.data.candidate)
        } catch (error)
        {
            if (error.response)
            {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (error.request)
            {
                console.log(error.request)
            } else
            {
                console.log('Error', error.message)
            }
            return
        }
    }

    return (
        <>
            <div id="regForm">

                <div className="all-steps" id="all-steps">
                    <StepIdicator />
                </div>

                <Primary handleChange={(e) => handleChange(e)} />

                <div className="thanks-message text-center" id="text-message">
                    <img src="https://i.imgur.com/O18mJ1K.png" width={ 100 } className="mb-4" />
                    <h3>Thankyou for your feedback!</h3>
                    <span>Thanks for your valuable information. It helps us to improve our services!</span>
                </div>

                <div className="nextprevious" id="nextprevious">
                    <div className="btn-nextprevious">
                        <button type="button" id="prevBtn" onClick={ () => nextPrev(-1) }>
                            <i className="material-icons">
                                <FontAwesomeIcon color='white' icon={ faAngleDoubleLeft } />

                            </i>
                        </button>
                        <button type="button" id="nextBtn" onClick={ () => nextPrev(1) }>
                            <i className="material-icons">
                                <FontAwesomeIcon color='white' icon={ faAngleDoubleRight } />
                            </i>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Wizard
