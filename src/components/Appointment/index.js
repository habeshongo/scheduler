import React from 'react'
import "./styles.scss"
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Confirm from './Confirm';
import Error from './Error'
import Status from './Status'
import useVisualMode from 'hooks/useVisualMode'
import Axios from 'axios'





const Appointment = (props) => {
    const { id, interview, interviewers, time, state, setState } = props

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const EDIT = "EDIT";
    const CONFIRM = "CONFIRM";



    const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

    function updateSpots(num) {
        state.days.forEach((day) => {
            if (day.name === state.day) {
                day.spots -= num;
            }
        });
        return state.days;
    }

    async function bookInterview(id, interview) {

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
            .put(`http://localhost:8001/api/appointments/${id}`, appointment)
            .then(() => {
                if (!state.appointments[id].interview) {
                    const days = updateSpots(1)
                    setState({
                        ...state,
                        appointments,
                        days,
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
                        onEdit={() => transition(EDIT)}
                        onDelete={() => transition(CONFIRM)}
                        onCancle={back}
                    />
                )}

                {mode === CREATE && (
                    <Form
                        interview={interview}

                        interviewers={interviewers}
                        onSave={save}
                        onCancel={back}
                        bookInterview={bookInterview}


                    />
                )}

            </article>

        </>

    )

}




export default Appointment;