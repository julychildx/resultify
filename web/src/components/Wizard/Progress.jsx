import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faNotesMedical,
    faEdit,
    faUser,
    faComment,
} from "@fortawesome/free-solid-svg-icons"


const icons = [
    { Icon: faUser },           // Bio Data
    { Icon: faEdit },           // Educational Icon
    { Icon: faNotesMedical },   // Health Icon
    { Icon: faComment },        // Referee Icon
]

export default ({ step }) => {


    const progress = icons.map(({ Icon }, index) => (
        <span key={ index } className={ index > step ? "step" : "step active" } >
            <FontAwesomeIcon color='white' icon={ Icon } />
        </span>
    ))

    return (
        <>
            { step < icons.length ? progress : null }
        </>
    )
}


