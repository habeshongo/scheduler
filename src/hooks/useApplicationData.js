import { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";

export default function useApplicationData(props) {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
    });

    const setDay = (day) => setState({ ...state, day });

    useEffect(() => {
        Promise.all([
            // axios.get('http://localhost:8001/api/days'),
            // axios.get('http://localhost:8001/api/appointments'),
            // axios.get('http://localhost:8001/api/interviewers')
            Axios.get("/api/days"),
            Axios.get("/api/appointments"),
            Axios.get("/api/interviewers"),
        ])
            .then((all) => {
                setState((prev) => ({
                    ...prev,
                    days: all[0].data,
                    appointments: all[1].data,
                    interviewers: all[2].data,
                }));
            })
            .catch((err) => console.log("error: ", err));
    }, []);

    function updateSpots(appointments, appointmentId) {
        const foundDay = state.days.find((d) =>
            d.appointments.includes(appointmentId)
        );
        const spots = foundDay.appointments.filter(
            (id) => appointments[id].interview === null
        ).length;
        return state.days.map((d) =>
            d.appointments.includes(appointmentId) ? { ...d, spots } : d
        );
    }

    async function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment,
        };

        /*--------*/

        // Make the PUT request to update the database
        return Axios.put(`http://localhost:8001/api/appointments/${id}`, {
            interview,
        }).then(() => {
            setState({
                ...state,
                appointments,
                days: updateSpots(appointments, id),
            });
        });
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

        return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
            () => {
                setState({
                    ...state,
                    appointments,
                    days: updateSpots(appointments, id),
                });
            }
        );
    }

    return { state, setDay, bookInterview, cancelInterview };
}
