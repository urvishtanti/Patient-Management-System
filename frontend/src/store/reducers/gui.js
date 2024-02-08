import { CLOSE_MESSAGE_MODAL, OPEN_MESSAGE_MODAL } from "../types";

const initialState = {
    messageModal: {
        isOpen: false,
        message: "",
        messageType: ""
    }
}

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case OPEN_MESSAGE_MODAL: {
            return {
                ...state,
                messageModal: {
                    isOpen: true,
                    message: action.message,
                    messageType: action.messageType
                }
            }
        }
        case CLOSE_MESSAGE_MODAL: {
            return {
                ...state,
                messageModal: {
                    isOpen: false,
                }
            }
        }
        default:
            return state;
    }
}
export {
    reducer as default,
    initialState as guiInitialState
};
