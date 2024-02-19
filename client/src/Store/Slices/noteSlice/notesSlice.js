import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import noteServices from './noteServices';

const initialState={
    note:null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const addNote=createAsyncThunk('/add', async(noteData, thunkAPI)=>{
    try {
       
        return await noteServices.addNote(noteData);
    } catch (error) {
        const message = (error.response && error.response.data && error.message);

        return thunkAPI.rejectWithValue(message);
    }
})
export const fetchNotes=createAsyncThunk('/fetch' , async(pageNum, thunkAPI)=>{
    try {
        return await noteServices.fetchNotes(pageNum);
    } catch (error) {
        const message = (error.response && error.response.data && error.message);

        return thunkAPI.rejectWithValue(message);
    }
})

export const fetchEachNote= createAsyncThunk('/note', async(id, thunkAPI)=>{
  try {
    return await noteServices.fetchEachNote(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.message);

    return thunkAPI.rejectWithValue(message);
  }
})
export const updateNote=createAsyncThunk('/update', async({ values,  id } , thunkAPI)=>{
    try {
      
        return await noteServices.updateNote({values, id});
    } catch (error) {
        const message = (error.response && error.response.data && error.message);

        return thunkAPI.rejectWithValue(message);
    }
})
export const deleteNote=createAsyncThunk('/delete', async(id, thunkAPI)=>{
    try {
        return await noteServices.deleteNote(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.message);

        return thunkAPI.rejectWithValue(message);
    }
})


export const userNotesSlice=createSlice({
    name:'userNote',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },

    extraReducers:(builder)=>{
      builder
      .addCase(addNote.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(addNote.fulfilled, (state)=>{
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addNote.rejected, (state)=>{
        state.isLoading = false
        state.isError = true
      })
      .addCase(fetchNotes.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.note=action.payload
      })
      .addCase(fetchNotes.rejected, (state)=>{
        state.isLoading=false
        state.isError = true
        state.note=null
      })
      .addCase(fetchEachNote.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(fetchEachNote.fulfilled, (state, action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.note=action.payload
      })
      .addCase(fetchEachNote.rejected, (state)=>{
        state.isLoading=false
        state.isError = true
        state.note=null
      })

      .addCase(updateNote.pending, (state)=>{
        state.isLoading=true
      })
      .addCase(updateNote.fulfilled, (state, action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.note=action.payload
      })
      .addCase(updateNote.rejected, (state)=>{
        state.isLoading=false
        state.isError = true
        state.note=null
      })

      .addCase(deleteNote.pending, (state)=>{
        state.isLoading=true
      })
      .addCase(deleteNote.fulfilled, (state, action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.note=action.payload
      })
      .addCase(deleteNote.rejected, (state)=>{
        state.isLoading=false
        state.isError = true
        state.note=null
      })
      
    }
})

export const {reset}= userNotesSlice.actions

export default userNotesSlice.reducer