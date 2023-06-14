export function getAppointmentsForDay(state, day) {
    const filteredAppointment = state.days.find(obj => obj.name === day);
    if (filteredAppointment) {
        return filteredAppointment.appointments.map(appointmentId => state.appointments[appointmentId]);
    } else {
        return [];
    }
};




// export function getInterview(state, interview) {
//     console.log(state)
//     if (true) {
//         return {
//             "student": `${interview.student}`,
//             "interviewers": { ...interview.interviewer }
//         }
//     }

//     return null;

// }


export function getInterview(state, interview) {
    console.log(state);
    if (interview && interview.interviewer) {
        const interviewer = state.interviewers[interview.interviewer];
        return {
            student: interview.student,
            interviewer: {
                id: interviewer.id,
                name: interviewer.name,
                avatar: interviewer.avatar
            }
        };
    }
    return null;
}



// export function getInterviewersForDay(state, day) {
//     const filteredAppointment = state.days.find(obj => obj.interviewers === day);
//     if (filteredAppointment) {
//         return filteredAppointment.appointments.map(appointmentId => state.appointments[appointmentId]);
//     } else {
//         return [];
//     }
// };

export function getInterviewersForDay(state, day) {
    const filteredDay = state.days.find(obj => obj.name === day);
    if (filteredDay) {
        return filteredDay.appointments
            .map(appointmentId => {
                const appointment = state.appointments[appointmentId];
                return appointment.interview ? state.interviewers[appointment.interview.interviewer] : null;
            })
            .filter(interviewer => interviewer !== null);
    } else {
        return [];
    }
}