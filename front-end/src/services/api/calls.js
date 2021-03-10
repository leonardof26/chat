import querystring from 'querystring'

import api from './index'

export const messages = {
  getRoomMessages: (payload) => {
    const string = querystring.stringify(payload)

    return api.get(`/message?${string}`)
  },
}
