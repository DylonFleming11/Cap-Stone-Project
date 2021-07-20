import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexPlayers = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/players/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showPlayer = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/players/' + id + '/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const createPlayer = (data, user) => {
  return axios({
    url: apiUrl + '/players/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      player: data
    }
  })
}

export const updatePlayer = (data, id, user) => {
  return axios({
    url: apiUrl + '/players/' + id + '/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { player: data }
  })
}

export const deletePlayer = (id, user) => {
  return axios({
    url: apiUrl + '/players/' + id + '/',
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
