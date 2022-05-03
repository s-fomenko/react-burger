import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_API_URL } from '../../constants/api';
import {LoginData, RegisterData, UpdateData, UserData} from '../../models/user';
import Cookies from 'js-cookie'

export const register = createAsyncThunk(
  'register/user',
  async (registerData: RegisterData) => {
    const apiUrl = `${BASE_API_URL}auth/register`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

export const login = createAsyncThunk(
  'login/user',
  async (loginData: LoginData) => {
    const apiUrl = `${BASE_API_URL}auth/login`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

export const updateToken = createAsyncThunk(
  'updateToken/user',
  async () => {
    const apiUrl = `${BASE_API_URL}auth/token`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: Cookies.get('refreshToken') })
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

export const logout = createAsyncThunk(
  'logout/user',
  async () => {
    const apiUrl = `${BASE_API_URL}auth/logout`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: Cookies.get('refreshToken') })
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

export const getUserData = createAsyncThunk(
  'getUserData/user',
  async (accessToken: string) => {
    const apiUrl = `${BASE_API_URL}auth/user`;
    try {
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'authorization': accessToken
        },
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

export const updateUserData = createAsyncThunk(
  'updateUserData/user',
  async (updateData: UpdateData) => {
    const apiUrl = `${BASE_API_URL}auth/user`;
    const { token, ...rest } = updateData;
    try {
      const res = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify(rest)
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

const initialState: UserData = {
  user: {
    name: '',
    email: '',
  },
  accessToken: '',
  refreshToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // increaseCount: (state, action) => {
    //   state.items.map(item => item._id === action.payload._id ? {...item, count: item.count += 1} : item);
    // },
    // decreaseCount: (state, action) => {
    //   state.items.map(item => item._id === action.payload._id ? {...item, count: item.count -= 1} : item);
    // },
    // updateBunCount: (state, action) => {
    //   state.items.map(item => item._id === action.payload._id ?
    //     {...item, count: item.count === 0 ? item.count += 2 : item.count} :
    //     {...item, count: item.count === 2 ? item.count -= 2 : item.count});
    // },
    // resetCounts: state => {
    //   state.items.map(item => ({...item, count: item.count = 0}))
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('refreshToken', state.refreshToken);
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('refreshToken', state.refreshToken);
    })
    builder.addCase(updateToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('refreshToken', state.refreshToken);
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user.name = initialState.user.name;
      state.user.email = initialState.user.email;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      Cookies.remove('refreshToken');
    })
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    })
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    })
  },
})

// export const { increaseCount, decreaseCount, updateBunCount, resetCounts } = userSlice.actions

// selectors
export const selectUser = (state: { user: UserData }) => state.user;

export default userSlice.reducer
