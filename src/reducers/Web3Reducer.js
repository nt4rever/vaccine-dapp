const initialState = {
    provider: null,
    web3: null,
    contract: null
}

export const Web3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_WEB3API":
            return {
                ...state,
                provider: action.payload.provider,
                web3: action.payload.web3,
                contract: action.payload.contract
            }
        default:
            return state;
    }
};

export default Web3Reducer;