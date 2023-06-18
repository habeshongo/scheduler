import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

const Form = (props) => {
    const { interview, interviewers } = props
    const [student, setStudent] = useState(props.student || "");
    const [interviewerId, setInterviewerId] = useState(props.interviewer || null);
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form onSubmit={event => event.preventDefault()}>

                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        value={student}
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={(e) =>
                            setStudent(e.target.value)}
                    /*
                      This must be a controlled component
                      your code goes here
                    */
                    />
                </form>
                <InterviewerList
                    interviewers={interviewers}
                    onChange={setInterviewerId}
                    value={interviewerId}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger>Cancel</Button>
                    <Button confirm>Save</Button>
                </section>
            </section>
        </main>
    )
}

export default Form