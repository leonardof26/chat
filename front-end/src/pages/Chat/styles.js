import styled from 'styled-components'

import { darken } from 'polished'

export const Container = styled.div`
  margin: 0 1%;
`

export const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 25px;

  span {
    color: #fff;
    font-weight: bold;
    margin-left: 10px;
    font-style: italic;
    font-size: 2rem;
  }
`

export const Chats = styled.div`
  width: 100%;
  display: flex;
  margin-top: 25px;
  background: #fff;
  border-radius: 5px;
  height: calc(100vh - 140px);
`

export const ChatList = styled.div`
  width: 30vw;
  background: #ebebeb;
  box-shadow: 3px -1px 10px 0px rgba(34, 34, 57, 0.2);
  border-radius: 5px;

  @media only screen and (max-width: 1000px) {
    width: 35vw;
  }

  @media only screen and (max-width: 650px) {
    width: 40vw;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 14, 0, 0.14);

  > div {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;

    > svg {
      margin-right: 10px;

      @media only screen and (max-width: 835px) {
        display: none;
      }
    }
  }

  button {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 7px;
    background: center;
    border: 1px solid #222239;
    border-radius: 5px;
    transition: background 0.2s;

    > svg {
      margin-right: 5px;
    }

    &:hover {
      background: ${darken(0.08, '#f8f8f8')};
      color: #222239;
    }
  }
`

export const CreateRoom = styled.button`
  margin: 1% 0;
  width: 100%;
  border: 0;
  background: #fff;
  height: 50px;
  border-radius: 5px;

  &:hover {
    background: ${darken(0.08, '#f8f8f8')};
    color: #222239;
  }
`

export const RoomItem = styled.div`
  margin: 2% 0;
  padding: 10px;
  background: ${(props) => (props.selected ? '#fff' : 'center')};
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;

  .title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .atl {
    font-size: 0.7rem;
    color: #9f9f9f;
  }

  &:hover {
    background: ${darken(0.08, '#f8f8f8')};
    color: #222239;
  }
`

export const ChatRoom = styled.div`
  width: 70vw;

  @media only screen and (max-width: 1000px) {
    width: 65vw;
  }

  @media only screen and (max-width: 650px) {
    width: 60vw;
  }
`

export const OthersMessage = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const MsgAuthor = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  > div {
    padding: 5px;
    margin-right: 5px;
    margin-left: 5px;
    box-shadow: 0 5px 28px 0 rgba(0, 0, 0, 0.1);
    background: #8e8e93;
    border-radius: 50%;
    font-size: 11px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;

    > span {
      background: center;
      color: #fff;
    }
  }
`

export const MsgContent = styled.div`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 5px 28px 0 rgba(0, 0, 0, 0.1);
  width: 50%;
  overflow-wrap: break-word;

  @media only screen and (max-width: 1000px) {
    width: 70%;
  }

  @media only screen and (max-width: 800px) {
    width: 80%;
  }

  @media only screen and (max-width: 650px) {
    width: 100%;
  }
`

export const MsgDate = styled.div`
  margin-bottom: 15px;
  margin-top: 8px;
  font-size: 0.7rem;
  color: #9f9f9f;
`

export const TopRoomInfo = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  padding: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 14, 0, 0.14);
  font-weight: bold;
  font-size: 1rem;
  height: 52px;
`

export const MessagesArea = styled.div`
  margin: 5px 20px;
  height: calc(100vh - 255px);
  overflow-y: auto;
`

export const UserMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-content: ${(props) =>
    props.sender === 'others' ? 'flex-start' : 'flex-end'};
  align-items: ${(props) =>
    props.sender === 'others' ? 'flex-start' : 'flex-end'};
`

export const MessageInputArea = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  box-shadow: 0px -2px 4px 0px rgba(0, 14, 0, 0.14);
  width: 100%;
  padding: 5px;

  > div {
    margin-left: 10px;
    width: 80%;

    @media only screen and (max-width: 1000px) {
      width: 75%;
    }

    @media only screen and (max-width: 800px) {
      width: 65%;
    }

    @media only screen and (max-width: 650px) {
      width: 60%;
    }
  }

  > button {
    margin-right: 10px;
    width: 15%;

    @media only screen and (max-width: 800px) {
      width: 30%;
    }
  }
`

export const RoomsArea = styled.div`
  margin: 5px 20px;
  height: calc(100vh - 251px);
  overflow-y: auto;
`

export const UserConnection = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-bottom: 20px;

  span {
    border: 1px solid;
    border-color: ${(props) =>
      props.type === 'connectionNotification' ? '#1abc9c' : '#ff2d55'};
    color: ${(props) =>
      props.type === 'connectionNotification' ? '#1abc9c' : '#ff2d55'};
    border-radius: 5px;
    padding: 5px 30px;
  }
`
