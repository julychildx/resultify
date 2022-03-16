import React, { useState, useEffect } from 'react'
import { Form, Row, Col } from '@themesberg/react-bootstrap'
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { CounterWidget } from "../Widgets";
import jsonData from '../../data/schema/primary.json'

export default ({ handleChange }) => {
  const [background, setBackground] = useState({})
  const [data, setData] = useState({})
  let temp = { route: 'background' }
  //jsonData

  useEffect(() => {
    setBackground(prev => ({ ...prev, ...{ background: data } }))
  }, [data])

  useEffect(() => {
    //console.log(bio)
    handleChange(background)
  }, [background])

  const onChange = (e) => {
    temp[e.target.name] = e.target.value
    setData((d) => ({ ...d, ...temp }))
  }
  return (
    <>
      <div className="container">
        <h4 id="register">Student Rating</h4>
        <Row className=" mb-3">
          <Form.Group as={ Col } controlId="formGridClass" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select required isValid>
              <option hidden defaultValue>Choose a rating</option>
              { jsonData.rating.ratings.map((rate, index) => (
                <option key={ index }>{ rate.name }</option>
              )) }
            </Form.Select>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={ Col } controlId="formGridEmail">
            <Form.Label>Score</Form.Label>
            <Form.Control required isInvalid type="number" defaultValue="1234" />
            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <Col xs={ 12 } sm={ 6 } xl={ 4 } className="mb-4">
            <CounterWidget
              category="Customers"
              title="345k"
              period="Feb 1 - Apr 1"
              percentage={ 18.2 }
              icon={ faChartLine }
              iconColor="shape-secondary"
            />
          </Col>

          <Col xs={ 12 } sm={ 6 } xl={ 4 } className="mb-4">
            <CounterWidget
              category="Revenue"
              title="$43,594"
              period="Feb 1 - Apr 1"
              percentage={ 28.4 }
              icon={ faCashRegister }
              iconColor="shape-tertiary"
            />
          </Col>
        </Row>
      </div>
    </>
  )
}