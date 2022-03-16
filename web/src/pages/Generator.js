import axios from 'axios'
import React from 'react'
import * as Constants from "../Constants"
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { useEffect } from 'react'
import Wizard from '../components/Wizard/Wizard'

export default () => {
    const navigate = useHistory()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const { first_name, last_name, email, password1, password2 } = formData

    const UpdateInput = e => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

    const SubmitForm = async (e) => {
        e.preventDefault()

        if (password1 === password2)
        {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(formData)
            let loading = document.getElementsByClassName('custom-modal')[1]
            loading.style.display = 'block'

            try
            {   // Get Acceess jwt token and user info 
                let resp = await axios.post(`${Constants.api}/auth/login`, body, config)
                if (resp.statusCode === 200)
                {
                    navigate.push('/')
                    NotificationManager.info('An Email Verification Has Been Send To Your Mail..')
                }
            } catch (err)
            {
                console.log(err)
                loading.style.display = 'none'
                let form_error = document.getElementsByClassName('form-errors')[0]

                form_error.innerText = err.response === undefined ? 'Oh uh !Something Went Wrong' : err.response.data.non_field_errors
                form_error.style.display = 'block'
            }
        }
        else
        {
            let form_error = document.getElementsByClassName('form-errors')[0]
            form_error.innerText = "Password didn't match."
            form_error.style.display = 'block'
        }

    }

    useEffect(() => {
        let sidebar = document.getElementById('sidebar-nav')
        let icon = document.getElementById('sidebar-icon')
        if (sidebar) sidebar.classList.toggle('hide')
        if (icon) icon.classList.toggle('hide')
    })


    return (
        <>
            <Wizard />
            <div className="bodybg" />
        </>
    )
}
