import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexPlayers = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/players'
  })
}

export const showPlayer = (id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/players/' + id
  })
}

export const createPlayer = (data, user) => {
  return axios({
    url: apiUrl + '/create-player',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      entry: data
    }
  })
}

export const updatePlayer = (data, id, user) => {
  return axios({
    url: apiUrl + '/players/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { entry: data }
  })
}

export const deletePlayer = (id, user) => {
  return axios({
    url: apiUrl + '/players/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
