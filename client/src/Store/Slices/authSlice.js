import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices';

const userD = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: userD ? userD : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}


export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authServices.register(user);
    } catch (error) {
        const errorMessage = error.response ? error.response.data : 'Unknown error';
        alert(errorMessage.message)
        return thunkAPI.rejectWithValue({ message: errorMessage });
    }
});


export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {

       return await authServices.login(user);
    } catch (error) {
        const errorMessage = error.response ? error.response.data : 'Unknown error';
        alert(errorMessage.message)
        return thunkAPI.rejectWithValue({ message: errorMessage });
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authServices.logout();
    return null;
});


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
