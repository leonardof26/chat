import styled, { keyframes } from 'styled-components'

import { darken } from 'polished'

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`

export const Container = styled.button`
  border: 1px solid #222239;
  background: ${(props) => (props.darken ? '#1abc9c' : '#fff')};
  color: ${(props) => (props.darken ? '#fff' : '#1abc9c')};
  border-radius: 4px;
  padding: ${(props) => (props.big ? '0 32px' : '0 20px')};
  transition: background 0.2s;
  height: ${(props) => (props.big ? '40px' : '32px')};
  padding: ${(props) => (props.new ? '0 40px' : 'default')};

  &:hover {
    background: ${(props) =>
      props.darken ? darken(0.08, '#1abc9c') : darken(0.08, '#fff')};
  }

  &:disabled {
    background: #d1d1d6;
    color: #8e8e93;
    border-color: #8e8e93;

    &:hover {
      background: #d1d1d6;
      cursor: auto;
    }
  }

  .loading {
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  }
`
