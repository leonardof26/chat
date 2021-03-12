import querystring from 'querystring'

import api from './index'

export const messages = {
  getRoomMessages: (payload) => {
    const string = querystring.stringify(payload)

    return api.get(`/message?${string}`)
  },
  sendMessage: (payload) => api.post(`/message`, payload),
}

export const rooms = {
  getRoomsList: () => api.get(`/message/rooms`),
}

export const user = {
  registerUser: (payload) => api.post(`/user`, payload),
}
