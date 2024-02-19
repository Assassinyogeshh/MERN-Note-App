import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlice";
import  userNotesSlice  from "../Slices/noteSlice/notesSlice";

 const store = configureStore({
    reducer:{
        auth:authSlice,
        userNote:userNotesSlice,
    }
})

export default store;;