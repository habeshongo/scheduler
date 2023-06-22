import { useState, useEffect } from 'react';
import Axios from 'axios';
import "components/Application.scss";


export default function useApplicationData(props) {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
    });

    const setDay = day => setState({ ...state, day });

    useEffect(() => {
        Promise.all([
            // axios.get('http://localhost:8001/api/days'),
            // axios.get('http://localhost:8001/api/appointments'),
            // axios.get('http://localhost:8001/api/interviewers')
            Axios.get("/api/days"),
            Axios.get("/api/appointments"),
            Axios.get("/api/interviewers")
        ]).then((all) => {
            setState(prev => ({
                ...prev,
                days: all[0].data,
                appointments: all[1].data,
                interviewers: all[2].data
            }));
        }).catch((err) => console.log('error: ', err));

    }, [])

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
                    const updatedDays = updateSpots(appointment.interview ? 0 : 1);
                    setState({
                        ...state,
                        appointments,
                        updatedDays,
                    })
                } else {
                    setState({
                        ...state,
                        appointments
                    })
                }
            })
    }

    async function cancelInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null,
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };

        return Axios
            .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
            .then(() => {
                const updatedDays = updateSpots(appointment.interview ? 0 : 1);
                setState({ ...state, appointments, updatedDays });
            });
    }





    return { state, setDay, bookInterview, cancelInterview };

}