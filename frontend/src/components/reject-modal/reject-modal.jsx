
import React from 'react';
import Modal from 'react-modal';
import "./reject-modal.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
    },
};

export const RejectModal = ({ onClose, onAction, data }) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel={"Reject Button"}
        >
            <div className='modal-container'>
                <div className='title-modal'>
                    <p>Are you sure, you want to reject?</p>
                </div>
                <div className='footer'>
                    <button onClick={() => {
                        if (typeof onAction == 'function')
                            onAction(false, data);
                        onClose();
                    }}>Close</button>
                    <button onClick={() => {
                        if (typeof onAction == 'function')
                            onAction(true, data);
                        onClose();
                    }}>Confirm</button>
                </div>
            </div>
        </Modal>)

}

