import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import studyService from './studyService'

const initialState = {
  studies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createStudy = createAsyncThunk(
  'study/create',
  async (studyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await studyService.createStudy(studyData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getStudies = createAsyncThunk(
  'study/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await studyService.getStudies(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteStudy = createAsyncThunk(
  'study/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await studyService.deleteStudy(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const toggleComplete = createAsyncThunk(
  'studies/toggle',
  async (study, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    return await studyService.updateStudy(
      study._id,
      { completed: !study.completed },
      token
    )
  }
)

export const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudy.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createStudy.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.studies.push(action.payload)
      })
      .addCase(createStudy.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getStudies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.studies = action.payload
      })
      .addCase(getStudies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteStudy.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteStudy.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.studies = state.studies.filter(
          (study) => study._id !== action.payload.id
        )
      })
      .addCase(deleteStudy.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        state.studies = state.studies.map((study) =>
          study._id === action.payload._id ? action.payload : study
        )
      })
  },
})

export const { reset } = studySlice.actions
export default studySlice.reducer