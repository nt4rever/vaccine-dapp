const initialState = {
    name: null,
    age: null,
    dateOfBirth: null
}

export const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_INFO":
            return {
                ...state,
                name: action.payload.name,
                age: action.payload.age,
                dateOfBirth: action.payload.dateOfBirth,
                address: action.payload.address
            }
        default:
            return state;
    }
};

export default infoReducer;