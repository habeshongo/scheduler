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
        Axios
            .put(`/api/appointments/:${id}`)
            .then(response => response.json()).then((data) => {
                setState(prevState => ({
                    ...prevState,
                    appointments: {
                        ...data
                    }
                }));
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error updating appointment:', error);
            });
    }
    /*--------*/

    setState({
        ...state,
        appointments
    });

}

function save(name, interviewer) {
    const interview = {
        student: name,
        interviewer
    };

    bookInterview(id, interview);
    transition(SHOW);

}

return (
    <>
        <article className="appointment">
            <Header time={time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={interview.student}
                    interviewer={[]}
                />
            )}

            {mode === CREATE && (
                <Form
                    onSave={save}
                    bookInterview={bookInterview}


                />
            )}

        </article>

    </>

)
}


export default Appointment;