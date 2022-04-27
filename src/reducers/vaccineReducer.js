const initialState = []

export const vaccineReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_VACCINE":
            return [
                ...state,
                {
                    nameVaccine: action.payload.nameVaccine,
                    date: action.payload.date,
                    vaccinationFacility: action.payload.vaccinationFacility
                }]
        default:
            return state;
    }
};

export default vaccineReducer;