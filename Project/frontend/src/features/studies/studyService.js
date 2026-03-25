import axios from 'axios'

const API_URL = 'http://localhost:5000/api/studies/'

const createStudy = async (studyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, studyData, config)

  return response.data
}

const getStudies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteStudy = async (studyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + studyId, config)

  return response.data
}

const updateStudy = async (studyId, studyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + studyId,
    studyData,
    config
  )

  return response.data
}

const studyService = {
  createStudy,
  getStudies,
  deleteStudy,
  updateStudy,
}

export default studyService