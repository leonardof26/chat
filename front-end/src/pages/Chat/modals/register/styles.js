import styled from 'styled-components'

import Modal from 'react-bootstrap/Modal'

export const Container = styled(Modal)``

export const Title = styled(Modal.Header)`
  color: #1abc9c;
  font-size: 1rem;
  font-weight: bold;
`

export const Body = styled(Modal.Body)`
  > div {
    margin-bottom: 20px;

    &:last-child {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: space-between;

      > div {
        width: 48%;
      }
    }
  }
`

export const BottomButtons = styled(Modal.Footer)``
