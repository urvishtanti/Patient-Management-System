import classNames from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonTextPrimary } from '../../css/colors';

const OptionContainer =styled.div`
    display: flex;
    justify-content: start;
`;

const Button = styled.button`
    padding: 5px 10px;
    background-color: white;
    color: hsla(210, 100%, 56%, 1);
    border-width: 1px;
    border-color: ${ButtonTextPrimary};
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    &.selected {
        color: white;
        background-color: ${ButtonTextPrimary};
    }
`;

export const BooleanRadioGroupComponent = ({ onChange }) => {
    const [option, setOption] = useState(-1);
    const onChangeWrapper = (value) => {
        setOption(value);
        onChange(value);
    }
    return <OptionContainer>
        <Button
            onClick={(e) => {
                e.preventDefault();
                onChangeWrapper(1);
            }}
            className={classNames(option === 1 ? "selected" : "")}
        >
            Yes
        </Button>
        <div className='space'></div>
        <Button onClick={(e) => {
            e.preventDefault();
            onChangeWrapper(0);
        }}
            className={classNames(option === 0 ? "selected" : "")}
        >No</Button>
    </OptionContainer>
}