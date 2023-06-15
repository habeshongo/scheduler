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



export function getInterviewersForDay(state, day) {
    const filteredDay = state.days.find((obj) => obj.name === day);

    if (filteredDay) {
        const appointmentIds = filteredDay.appointments;
        const appointments = appointmentIds.map((appointmentId) => state.appointments[appointmentId]);
        return appointments;
    } else {
        return [];
    }
}



