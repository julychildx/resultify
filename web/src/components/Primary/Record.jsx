import React, { useState, useEffect } from 'react'
import { Form, Row, Col } from '@themesberg/react-bootstrap'
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { CounterWidget } from "../Widgets";
import jsonData from '../../data/schema/primary.json'


export default ({ handleChange }) => {
  const [qualification, setQualification] = useState({})
  const [data, setData] = useState({})
  let temp = { route: 'qualification' }

  useEffect(() => {
    setQualification(prev => ({ ...prev, ...{ qualification: data } }))
  }, [data])

  useEffect(() => {
    //console.log(bio)
    handleChange(qualification)
  }, [qualification])

  const onChange = (e) => {
    temp[e.target.name] = e.target.value
    setData((d) => ({ ...d, ...temp }))
  }
  return (
    <>
      <div className="container">
        <h4 id="register">Student Records</h4>
        <Form.Group as={ Col } controlId="formGridClass" className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select required isValid>
            <option hidden defaultValue>Choose an subject</option>

            { jsonData.subjects.map((subject, index) => (
              <option key={ index }>{ subject }</option>
            )) }

          </Form.Select>
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Row className=" mb-3">
          <Form.Group as={ Col } controlId="formGridClass" className="mb-3">
            <Form.Label>Assessment</Form.Label>
            <Form.Select required isValid>
              <option hidden defaultValue>Choose an assessment</option>

              { jsonData.assess.ass.map((assessment, index) => (
                <option key={ index }>{ assessment.name }</option>
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
