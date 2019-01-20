export const initialState = {
    nameList: [],
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'TEST':
            return {
                ...state,
                nameList: action.payload
            };
        default: 
            return state
    }
};
