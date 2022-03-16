import React from 'react'
import Record from './Record'
import Remark from './Remark'
import StudentInfo from './StudentInfo'
import StudentRating from './Rating'
import { Form } from '@themesberg/react-bootstrap'

export default ({ handleChange }) => {
    return (
        <>
            <Form>
                <div id="student" className="tab active-tab">
                    <StudentInfo handleChange={ (e) => handleChange(e) } />
                </div>
                <div id="records" className="tab">
                    <Record handleChange={ (e) => handleChange(e) } />
                </div>
                <div id="rating" className="tab">
                    <StudentRating handleChange={ (e) => handleChange(e) } />
                </div>
                <div id="remark" className="tab">
                    <Remark handleChange={ (e) => handleChange(e) } />
                </div>
            </Form>
        </>
    )
}
