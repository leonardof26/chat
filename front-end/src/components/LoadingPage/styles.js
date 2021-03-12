import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: block;

  svg {
    position: absolute;
    animation: ${rotate} 2s linear infinite;
    left: 48%;
    top: 40%;
  }
`
