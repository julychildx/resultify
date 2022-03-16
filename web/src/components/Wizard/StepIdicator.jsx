import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faNotesMedical,
    faEdit,
    faUser,
    faComment,
} from "@fortawesome/free-solid-svg-icons"


const icons = [
    { Icon: faUser },           // Bio Data
    { Icon: faEdit },  // Educational Icon
    { Icon: faEdit },          // Spiritual Icon
    { Icon: faNotesMedical },   // Health Icon
    { Icon: faComment },     // Referee Icon
]

const StepIdicator = () => {
    return (
        <>
            { icons.map(({ Icon }, index) => (
                 <span key={ index } className="step">
                    <FontAwesomeIcon color='white' icon={ Icon } />
                </span>
                
            )) }
        </>
    )
}

export default StepIdicator
