import React, { useState, useEffect } from 'react'
import { Form, Row, Col, InputGroup } from '@themesberg/react-bootstrap'
import Datetime from "react-datetime"
import moment from "moment-timezone"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

export default({ handleChange}) => {
    const [health, setHealth] = useState({})
    const [data, setData] = useState({})
    let temp = { route: 'health'}

    useEffect(() => {
        setHealth(prev => ({ ...prev, ...{ health: data } }))
    }, [data])

    useEffect(() => {
        //console.log(bio)
        handleChange(health)
    }, [health])

    const onChange = (e) => {
        temp[e.target.name] = e.target.value
        setData((d) => ({ ...d, ...temp }))
    }
  return (
      <>
          <div className="container">
              <h4 id="register">Remarks</h4>
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
          </div>
      </>
  )
}
