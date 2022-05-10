const initialState = []

export const vaccineReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_VACCINE":
            return [
                ...state,
                {
                    nameVaccine: action.payload.vaccine,
                    date: action.payload.date,
                    vaccinationFacility: action.payload.vaccinationFacility,
                    dose: action.payload.dose
                }]
        default:
            return state;
    }
};

export default vaccineReducer;