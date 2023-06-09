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
import "components/Appointment/styles.scss";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETING = 'DELETING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


const Appointment = (props) => {
    const { id, interview, interviewers, time, state, bookInterview, cancelInterview } = props


    const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        bookInterview(id, interview)
            .then(() => transition(SHOW))
            .catch((error) => transition(ERROR_SAVE, true));

    }

    function destroy() {
        transition(DELETING, true);
        cancelInterview(id)
            .then(() => transition(EMPTY))
            .catch((error) => transition(ERROR_DELETE, true));
    }

    return (
        <>
            <article className="appointment" data-testid="appointment">
                <Header time={time} />

                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

                {mode === SAVING && <Status message={"SAVING"} onSave={() => transition(SAVING)} />}

                {mode === SHOW && (
                    <Show
                        id={props.id}
                        student={interview.student}
                        interviewer={interview.interviewer}
                        onEdit={() => transition(EDIT)}
                        onDelete={() => transition(CONFIRM)}
                        onCancel={back}
                    />
                )}

                {mode === EDIT && (
                    <Form
                        student={interview.student}
                        interviewer={interview.interviewer.id}
                        interviewers={interviewers}
                        onSave={save}
                        onCancel={() => back()}
                    />
                )}

                {mode === CONFIRM && (
                    <Confirm
                        message="Are you sure you would like to delete?"
                        onCancel={back}
                        onConfirm={destroy}
                    />
                )}

                {mode === CREATE && (
                    <Form
                        interview={interview}
                        interviewers={interviewers}
                        onSave={save}
                        onCancel={() => back()}
                        bookInterview={bookInterview}

                    />
                )}


                {mode === DELETING && <Status message="Deleting" />}

                {mode === ERROR_SAVE && (
                    <Error message="Could not perform function" onClose={() => back()} />
                )}

                {mode === ERROR_DELETE && (
                    <Error
                        message="Could not perform function"
                        onClose={() => back()}
                    />
                )}

            </article>

        </>

    )

}




export default Appointment;