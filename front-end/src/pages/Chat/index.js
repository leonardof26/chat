import React, { useState } from 'react'

import { Form } from '@unform/web'

import { GrLogout } from 'react-icons/gr'
import { BsChatDots } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'

import {
  Container,
  Logo,
  UserInfo,
  Chats,
  ChatList,
  RoomItem,
  ChatRoom,
  OthersMessage,
  MsgAuthor,
  MsgContent,
  MsgDate,
  TopRoomInfo,
  MessagesArea,
  UserMessage,
  MessageInputArea,
  RoomsArea,
} from './styles'

import Button from '../../components/Button'
import Input from '../../components/Input'

import RegisterModal from './modals/register'

function Chat() {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <Container>
      <Logo>
        <BsChatDots color="fff" size={60} />
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
                <p>Bom dia,</p>
                <p>Fulano Beltrano Pereira</p>
              </span>
            </div>
            <div>
              <button type="button">
                <GrLogout size={15} />
                <span>Sair</span>
              </button>
            </div>
          </UserInfo>
          <RoomsArea>
            <RoomItem selected>
              <p className="title">Sala A</p>
              <p className="atl">Ult. Atl. 10/05/200</p>
            </RoomItem>
            <RoomItem>
              <p className="title">Sala A</p>
              <p className="atl">Ult. Atl. 10/05/200</p>
            </RoomItem>
          </RoomsArea>
        </ChatList>

        <ChatRoom>
          <TopRoomInfo>Sala: sei lá das quantas</TopRoomInfo>
          <MessagesArea>
            <OthersMessage>
              <MsgAuthor>
                <div>
                  <span>CR</span>
                </div>
                <span>Fulaninho</span>
              </MsgAuthor>

              <MsgContent>
                <span>Olá munndo</span>
              </MsgContent>
              <MsgDate>10/05/2020 14:22:22</MsgDate>
            </OthersMessage>
            <OthersMessage>
              <MsgAuthor>
                <div>
                  <span>CR</span>
                </div>
                <span>Fulaninho</span>
              </MsgAuthor>

              <MsgContent>
                <span>
                  Olá munndnhjsfjhdsahsaggdhgsadjhkgsahjdgs aguydgsauiydgsau
                  ydgsuaygduyas
                  ggduyasgdyusagduyasgduygasyudgasyudguyasdgsuaydyas
                  suyagduysagdyusa sydvsauydguyas dsauydvsauyd asdyuahsvduysagdo
                </span>
              </MsgContent>
              <MsgDate>10/05/2020 14:22:22</MsgDate>
            </OthersMessage>

            <UserMessage>
              <MsgAuthor>
                <div>
                  <span>CR</span>
                </div>
                <span>Fulaninho</span>
              </MsgAuthor>

              <MsgContent>
                <span>
                  Olá munndnhjsfjhdsahsaggdhgsadjhkgsahjdgs aguydgsauiydgsau
                  ydgsuaygduyas
                  ggduyasgdyusagduyasgduygasyudgasyudguyasdgsuaydyas
                  suyagduysagdyusa sydvsauydguyas dsauydvsauyd asdyuahsvduysagdo
                </span>
              </MsgContent>
              <MsgDate>10/05/2020 14:22:22</MsgDate>
            </UserMessage>
          </MessagesArea>
          <Form onSubmit={() => setShowRegisterModal(true)}>
            <MessageInputArea>
              <div>
                <Input name="message" />
              </div>

              <Button darken big type="submit">
                Enviar
              </Button>
            </MessageInputArea>
          </Form>
        </ChatRoom>
      </Chats>

      <RegisterModal
        show={showRegisterModal}
        close={() => setShowRegisterModal(false)}
      />
    </Container>
  )
}

export default Chat
