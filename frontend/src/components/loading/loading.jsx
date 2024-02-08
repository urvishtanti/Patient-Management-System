import React from 'react'
import styled from 'styled-components'

const LoadingDiv = styled.div`
    display: flex;
    justify-content: center;
`
export function LoadingComponent() {
    return <LoadingDiv>
        <span>Loading</span>
    </LoadingDiv>
}

