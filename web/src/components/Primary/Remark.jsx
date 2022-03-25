import React, { useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from '@themesberg/react-bootstrap'
import Datetime from "react-datetime"
import moment from "moment-timezone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

export default ({ title }) => {

    return (
        <>
            <div className="container">
                <h4 id="register">{ title }</h4>
                <Form.Group>
                    <Form.Label>Teacher's Comment</Form.Label>
                    <Form.Control required isInvalid as="textarea" rows="4" placeholder="Enter your message..." />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter comment for this student!</Form.Control.Feedback>
                </Form.Group>
            </div>
        </>
    )
}
