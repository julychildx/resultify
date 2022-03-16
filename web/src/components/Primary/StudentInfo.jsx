import React, { useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from '@themesberg/react-bootstrap'
import Datetime from "react-datetime"
import moment from "moment-timezone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import jsonData from '../../data/schema/primary.json'
import classes from '../../data/schema/classes.json'

export default ({ handleChange }) => {
    const [bio, setBio] = useState({})
    const [data, setData] = useState({})
    let temp = { route: 'bio' }

    useEffect(() => {
        setBio(prev => ({ ...prev, ...{ bio: data } }))
    }, [data])

    useEffect(() => {
        //console.log(bio)
        handleChange(bio)
    }, [bio])

    const onChange = (e) => {
        temp[e.target.name] = e.target.value
        setData((d) => ({ ...d, ...temp }))
    }

    const Datepicker = () => {
        const [birthday, setBirthday] = React.useState("")

        return (
            <Form.Group className="mb-3">
                <Form.Label>Resumption Date</Form.Label>
                <Datetime
                    timeFormat={ false }
                    closeOnSelect={ false }
                    onChange={ setBirthday }
                    renderInput={ (props, openCalendar) => (
                        <InputGroup>
                            <InputGroup.Text><FontAwesomeIcon icon={ faCalendarAlt } /></InputGroup.Text>
                            <Form.Control
                                required
                                type="text"
                                value={ birthday ? moment(birthday).format("MM/DD/YYYY") : "" }
                                placeholder="mm/dd/yyyy"
                                onFocus={ openCalendar }
                                onChange={ () => { } } />
                        </InputGroup>
                    ) } />
            </Form.Group>
        )
    }

    return (
        <>
            <div className="container">
                <h4 id="register">Student Information</h4>
                <Row className="mb-3">
                    <Form.Group as={ Col } controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required isInvalid type="text" placeholder="Enter first name" />
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required isValid type="text" placeholder="Enter last name" defaultValue="John" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Other Name</Form.Label>
                        <Form.Control required isValid type="text" placeholder="Enter last name" defaultValue="John" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Select Gender</Form.Label>
                        <fieldset>
                            <Form.Check
                                defaultChecked
                                type="radio"
                                defaultValue="option1"
                                label="Male"
                                name="gender"
                                id="male"
                                htmlFor="male"
                            />

                            <Form.Check
                                type="radio"
                                defaultValue="option2"
                                label="Female"
                                name="gender"
                                id="female"
                                htmlFor="female"
                            />
                        </fieldset>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Uplaod Student Picture</Form.Label>
                        <Form.Control required isValid type="file" />
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={ Col } controlId="formGridEmail">
                        <Form.Label>Admision Number</Form.Label>
                        <Form.Control required isInvalid type="number" defaultValue="1234" />
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={ Col } controlId="formGridClass" className="mb-3">
                        <Form.Label>Class</Form.Label>
                        <Form.Select required isValid>
                            <option defaultValue>Choose a class</option>
                            { classes.map(({ arm, name, section }, index) => {
                                console.log(arm)
                                if (arm === 'primary')
                                    return <option key={ index }>{ name + section }</option>
                            }) }
                        </Form.Select>
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={ Col } controlId="formGridOpend">
                        <Form.Label>Days Opened</Form.Label>
                        <Form.Control required isInvalid type="text" placeholder="Enter first name" />
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Days Present</Form.Label>
                        <Form.Control required isValid type="text" placeholder="Enter last name" defaultValue="John" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Days Absent</Form.Label>
                        <Form.Control required isValid type="text" placeholder="Enter last name" defaultValue="John" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Datepicker />
            </div>
        </>
    )
}
