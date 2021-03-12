import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useImmer } from 'use-immer'

import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { Form } from '@unform/web'

import { GrLogout } from 'react-icons/gr'
import { BsChatDots } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { io } from 'socket.io-client'
import history from '../../services/history'
import { rooms, messages } from '../../services/api/calls'

import {
  Container,
  Logo,
  UserInfo,
  CreateRoom,
  Chats,
  ChatList,
  RoomItem,
  ChatRoom,
  MsgAuthor,
  MsgContent,
  MsgDate,
  TopRoomInfo,
  MessagesArea,
  UserMessage,
  MessageInputArea,
  RoomsArea,
  UserConnection,
} from './styles'

import Button from '../../components/Button'
import Input from '../../components/Input'
import LoadingPage from '../../components/LoadingPage'

import RegisterModal from './modals/userRegister'
import CreateRoomModal from './modals/createRoom'

function Chat() {
  const [loading, setLoading] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false)
  const [roomsList, setRoomsList] = useImmer([])
  const [chatList, setChatList] = useImmer([])
  const [currentRoom, setCurrentRoom] = useState({})

  const messagesEndRef = useRef(null)
  const currentHour = new Date().getHours()
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const userIsRegistered = useMemo(() => {
    if (!currentUser) return false

    return currentUser.isRegistered
  }, [currentUser])

  const { chatRoom } = useParams()

  function scrollToLastMessage() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleUserLogout() {
    localStorage.removeItem('user')
    history.push('/')
  }

  function handleChatRoomInURL(roomList) {
    if (!chatRoom) return roomList

    setCurrentRoom({ current: chatRoom, past: currentRoom.current })

    const rommAlreadyExists = roomList.find((room) => room === chatRoom)

    if (!rommAlreadyExists) return roomList.concat(chatRoom)

    return roomList
  }

  function addRoom(room) {
    setCurrentRoom({ current: room, past: currentRoom.current })

    setRoomsList((draft) => {
      draft = roomsList.concat(room)

      return draft
    })
  }

  function convertMessageFromAPI(message) {
    const formattedSentDate = format(
      parseISO(message.createdAt),
      'dd/MM/yyyy HH:mm:ss'
    )
    const [userName, userSirName] = message.userName.split(' ')

    let nickname = ''

    nickname += userName.substr(0, 1).toUpperCase()

    if (userSirName) {
      nickname += userSirName.substr(0, 1).toUpperCase()
    }

    return { ...message, formattedSentDate, nickname }
  }

  async function handleSendMessage(data, { reset }) {
    if (!userIsRegistered) {
      setShowRegisterModal(true)
      return
    }

    setLoading(true)

    try {
      const payload = {
        content: data.message,
        room: currentRoom.current,
        userName: currentUser.name,
        userEmail: currentUser.email,
      }

      await messages.sendMessage(payload)
      reset()
    } catch (error) {
      toast.error('Erro ao enviar mensagem, favor tente novamente')
    }

    setLoading(false)
  }

  async function getRoomList() {
    const resp = await rooms.getRoomsList()

    setRoomsList(() => handleChatRoomInURL(resp.data))
  }

  async function getRoomChat() {
    const payload = { room: currentRoom.current }

    const resp = await messages.getRoomMessages(payload)

    setChatList(() => resp.data.map((msg) => convertMessageFromAPI(msg)))
  }

  async function handleInitalData() {
    setLoading(true)

    await getRoomList()

    setLoading(false)
  }

  useEffect(() => {
    handleInitalData()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!currentRoom.current) return

    getRoomChat()
  }, [currentRoom]) // eslint-disable-line

  useEffect(() => {
    if (!currentUser.email) return

    const socket = io('http://localhost:3333/', {
      query: { user: currentUser.email, room: currentRoom.current },
    })

    socket.on('messageReceived', (msg) => {
      setChatList((draft) => [...draft, convertMessageFromAPI(msg)])
    })

    const enteredRoomPayload = {
      user: currentUser.email,
      room: currentRoom.current,
    }

    socket.emit('enteredRoom', { query: enteredRoomPayload })

    if (currentRoom.past) {
      const exitedRoomPayload = {
        user: currentUser.email,
        room: currentRoom.past,
      }

      socket.emit('exitedRoom', { query: exitedRoomPayload })
    }

    socket.on('connection', (user) => {
      setChatList((draft) => [
        ...draft,
        {
          key: Math.random().toString(36).substring(7),
          type: 'connectionNotification',
          message: `${user} Entrou no Chat`,
        },
      ])
    })

    socket.on('desconnect', (user) => {
      setChatList((draft) => [
        ...draft,
        {
          key: Math.random().toString(36).substring(7),
          type: 'desconnectionNotification',
          message: `${user} Saiu do Chat`,
        },
      ])
    })
  }, [currentRoom, userIsRegistered]) // eslint-disable-line

  useEffect(() => {
    scrollToLastMessage()
  }, [chatList])

  return (
    <Container>
      {loading && <LoadingPage />}
      <Logo>
        <BsChatDots color="#fff" size={60} />
        <span>
          <p>Talking</p>
          <p>Chat</p>
        </span>
      </Logo>

      <Chats>
        <ChatList>
          <UserInfo>
            <div>
              <FaUserAlt size={21} />
              <span>
                {currentHour < 12 && <p>Bom dia,</p>}
                {currentHour > 11 && currentHour < 18 && <p>Boa tarde,</p>}
                {currentHour > 17 && <p>Boa noite,</p>}
                <p>{currentUser.name || ''}</p>
              </span>
            </div>
            <div>
              <button type="button" onClick={handleUserLogout}>
                <GrLogout size={15} />
                <span>Sair</span>
              </button>
            </div>
          </UserInfo>

          <CreateRoom
            onClick={() => setShowCreateRoomModal(true)}
            disabled={!currentRoom.current}
          >
            + Criar Nova Sala
          </CreateRoom>

          <RoomsArea>
            {roomsList.map((room, index) => (
              <RoomItem
                selected={currentRoom.current === room}
                key={String(index)}
                onClick={() => {
                  setCurrentRoom({ current: room, past: currentRoom.current })
                  history.push(`/chat/${room}`)
                }}
              >
                <p className="title">{room}</p>
              </RoomItem>
            ))}
          </RoomsArea>
        </ChatList>
        <ChatRoom>
          <TopRoomInfo>Sala: {currentRoom.current || ''}</TopRoomInfo>
          <MessagesArea>
            {chatList.map((msg) =>
              msg.type ? (
                <UserConnection key={msg.key} type={msg.type}>
                  <span>{msg.message}</span>
                </UserConnection>
              ) : (
                <UserMessage
                  key={msg._id}
                  sender={
                    msg.userEmail === currentUser.email ? 'himSelf' : 'others'
                  }
                >
                  <MsgAuthor>
                    <div>
                      <span>{msg.nickname}</span>
                    </div>
                    <span>{msg.userName}</span>
                  </MsgAuthor>

                  <MsgContent>
                    <span>{msg.content}</span>
                  </MsgContent>
                  <MsgDate>{msg.formattedSentDate}</MsgDate>
                </UserMessage>
              )
            )}
            <div ref={messagesEndRef} />
          </MessagesArea>
          <Form onSubmit={handleSendMessage}>
            <MessageInputArea>
              <div>
                <Input name="message" disabled={!currentRoom.current} />
              </div>

              <Button darken big type="submit" disabled={!currentRoom.current}>
                Enviar
              </Button>
            </MessageInputArea>
          </Form>
        </ChatRoom>
      </Chats>

      <RegisterModal
        show={showRegisterModal}
        close={() => setShowRegisterModal(false)}
        setLoading={setLoading}
      />

      <CreateRoomModal
        show={showCreateRoomModal}
        close={() => setShowCreateRoomModal(false)}
        addRoom={addRoom}
        roomsList={roomsList}
      />
    </Container>
  )
}

export default Chat
