import React from 'react'
import Record from './Record'
import Remark from './Remark'
import StudentInfo from './StudentInfo'
import StudentRating from './StudentRating'

export default () => {
    return (
        <>
            <Form>
                <div id="bio" className="tab active-tab">
                    <StudentInfo handleChange={ (e) => handleChange(e) } />
                </div>
                <div id="qualification" className="tab">
                    <Record handleChange={ (e) => handleChange(e) } />
                </div>
                <div id="background" className="tab">
                    <StudentRating handleChange={ (e) => handleChange(e) } />
                </div>
                <div id="referee" className="tab">
                    <Remark handleChange={ (e) => handleChange(e) } />
                </div>
            </Form>
        </>
    )
}
