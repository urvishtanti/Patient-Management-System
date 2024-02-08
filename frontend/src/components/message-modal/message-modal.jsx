
import classNames from 'classnames';
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { GreenPrimary, RedPrimary, YellowPrimary } from '../../css/colors';
import { MessageType } from '../../store/actions/gui';
import "./message-modal.css";

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

const MessageDiv = styled.p`
    &.success {
        color: ${GreenPrimary};
    }
    &.warning {
        color: ${YellowPrimary};
    }
    &.error {
        color: ${RedPrimary};
    }
`

export const MessageModalComponent = ({ message, onClose, messageType }) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel={"Message Button"}
        >
            <div className='modal-container'>
                <div className='title-modal'>
                    <MessageDiv className={classNames({
                        'success': messageType === MessageType.SUCCESS,
                        'warning': messageType === MessageType.WARNING,
                        'error': messageType === MessageType.ERROR
                    })}>{message}</MessageDiv>
                </div>
                <div className='footer'>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </Modal>)

}

