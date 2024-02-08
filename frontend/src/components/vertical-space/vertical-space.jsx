import styled from "styled-components"

const Container = styled.div((height) => {
    return `
        height: ${typeof height === 'number' ? height : 4}rem;
    `
})

export function VerticalSpace({ height }) {
    return <Container height={height} />
}