export function getAppointmentsForDay(state, day) {
    const filteredAppointment = state.days.find(obj => obj.name === day);
    if (filteredAppointment) {
        return filteredAppointment.appointments.map(appointmentId => state.appointments[appointmentId]);
    } else {
        return [];
    }
};




export function getInterview(state, interview) {
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
        const interviewersIds = filteredDay.interviewers;
        const interviewers = interviewersIds.map((interviewId) => (state.interviewers[interviewId]));
        return interviewers;
    } else {
        return [];
    }
}



