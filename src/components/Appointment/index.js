import React from 'react'
import "./styles.scss"
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import useVisualMode from 'hooks/useVisualMode'
import Axios from 'axios'





const Appointment = (props) => {
    const { id, interview, time, state, setState } = props

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";

    console.log(props);

    const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

    function bookInterview(id, interview) {
        console.log(id, interview);
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        /*--------*/
        // Make the PUT request to update the database
        return Axios
            .put(`http://localhost:8001/api/appointments/${id}`)
            .then(() => {
                if (!state.appointments[id].interview) {
                    setState({
                        ...state,
                        appointments,
                    })
                } else {
                    setState({
                        ...state,
                        appointments
                    })
                }
            })
    }


    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        bookInterview(id, interview)
        console.log(id, interview)
            .then(() => transition(SHOW))
            .catch((err) => console.log(err))

    }





    return (
        <>
            <article className="appointment">
                <Header time={time} />
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
                {mode === SHOW && (
                    <Show
                        student={interview.student}
                        interviewer={interview.interviewer}
                    />
                )}

                {mode === CREATE && (
                    <Form
                        interview={interview}

                        interviewers={state.interviewers}
                        onSave={save}
                        bookInterview={bookInterview}


                    />
                )}

            </article>

        </>

    )

}




export default Appointment;