import React, { useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from '@themesberg/react-bootstrap'
import Datetime from "react-datetime"
import moment from "moment-timezone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import jsonData from '../../data/schema/primary.json'
import school from '../../data/schema/school.json'

export default ({ handleFormData, title }) => {

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
                                required isInvalid
                                type="text"
                                value={ birthday ? moment(birthday).format("MM/DD/YYYY") : "" }
                                placeholder="mm/dd/yyyy"
                                onFocus={ openCalendar }
                                onChange={ (e) => handleFormData(e.target)  } />
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Enter resumption date!</Form.Control.Feedback>
                        </InputGroup>
                    ) } />

            </Form.Group>
        )
    }

    return (
        <>
            <div className="container">
                <h4 id="register">{ title }</h4>
                <Row className="mb-3">
                    <Form.Group as={ Col } controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            name="first_name"
                            required isInvalid type="text"
                            placeholder="Enter first name"
                            onChange={ (e) => handleFormData(e.target)  }
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={ (e) => handleFormData(e.target) } name="last_name" required isInvalid type="text" placeholder="Enter last name" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Other Name</Form.Label>
                        <Form.Control onChange={ (e) =>  handleFormData(e.target)  } name="other_name" type="text" placeholder="Enter last name" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
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
                {/* <Row>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Uplaod Student Picture</Form.Label>
                        <Form.Control required isInvalid type="file" />
                        <Form.Control.Feedback type="valid">Please choose a username.</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                </Row> */}

                <Row className="mb-3">
                    <Form.Group as={ Col } controlId="formGridEmail">
                        <Form.Label>Admision Number</Form.Label>
                        <Form.Control onChange={ handleFormData } name="admision_number" required isInvalid type="number" />
                        <Form.Control.Feedback type="valid">Please choose a username.</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={ Col } controlId="formGridClass" className="mb-3">
                        <Form.Label>Class</Form.Label>
                        <Form.Select name="class" required isInvalid >
                            <option defaultValue>Choose a class</option>
                            { school.classList.map(({ arm, name, section }, index) => {
                                if (arm === 'primary')
                                    return <option key={ index }>{ name + section }</option>
                            }) }
                        </Form.Select>
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={ Col } controlId="formGridOpend">
                        <Form.Label>Days Opened</Form.Label>
                        <Form.Control onChange={ (e) => { handleFormData(e) } } name="opened" required isInvalid type="number" placeholder="Enter first name" />
                        <Form.Control.Feedback type="valid">Please choose a username.</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Days Present</Form.Label>
                        <Form.Control onChange={ handleFormData } name="present" required isInvalid type="number" placeholder="Enter last name" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={ Col } controlId="formGridPassword">
                        <Form.Label>Days Absent</Form.Label>
                        <Form.Control onChange={ (e) => { handleFormData(e) } } name="absent" required isInvalid type="number" placeholder="Enter last name" defaultValue="John" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Datepicker />
            </div>
        </>
    )
}
