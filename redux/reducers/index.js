const initialState = {
    input: {
        description: ""
    }
}
const inputTextEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_TEXT_EDITOR":
            return {
                ...state,
                input: {
                    ...state.input,
                    description: JSON.stringify(action.payload)
                }
            }
        default:
            return state;
    }
}
export default inputTextEditorReducer;