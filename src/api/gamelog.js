import apiUrl from '../apiConfig'
import axios from 'axios'

export const createGameLog = (data, user) => {
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: data
    }
  })
}

export const deleteGameLog = (data, id, user) => {
  return axios({
    url: apiUrl + '/comments/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: { entryId: data }
    }
  })
}
