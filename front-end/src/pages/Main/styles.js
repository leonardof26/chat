import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`

export const Menu = styled.div`
  background: #f1f1f1;
  padding: 0 75px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
  justify-content: start;
  min-height: 500px;

  > div {
    width: 100%;
  }

  img {
    margin-top: 5vh;
    height: 115px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 10vh;
    margin-bottom: 5vh;
    margin-top: 80px;
    width: 250px;

    span {
      color: #ff2d55;
      align-self: flex-start;
      /* margin: 0 0 10px; */
      font-weight: bold;
    }

    button {
      margin-top: 20px;
      width: 100%;
    }
  }
`
