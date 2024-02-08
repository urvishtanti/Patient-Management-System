import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MessageModalComponent } from "../components/message-modal/message-modal";
import { closeMessageModal } from "../store/actions/gui";


export default function MessageModal() {
    const isOpen = useSelector(state => state.gui.messageModal.isOpen);
    const message = useSelector(state => state.gui.messageModal.message);
    const messageType = useSelector(state => state.gui.messageModal.messageType);

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(closeMessageModal())
    }

    return isOpen ? <MessageModalComponent
        message={message}
        messageType={messageType}
        onClose={onClose}
    /> : <></>
}