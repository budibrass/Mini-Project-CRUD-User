import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("", async() => {
    const resp = await axios.get('http://localhost:3001/user');
    return resp.data;
});

export const saveUser = createAsyncThunk("/add-user", async({ firstName, lastName, userName, email, password, confirmPassword, expiredDate, groupAccess}) => {
    const resp = await axios.post('http://localhost:3001/user', {
        firstName, lastName, userName, email, password, confirmPassword, expiredDate, groupAccess
    });
    return resp.data;
});

export const updateUser = createAsyncThunk("/edit-user", async({ id, firstName, lastName, userName, email, password, confirmPassword, expiredDate, groupAccess}) => {
    const resp = await axios.patch(`http://localhost:3001/user/${id}`, {
        firstName, lastName, userName, email, password, confirmPassword, expiredDate, groupAccess
    });
    console.log(firstName, lastName, userName, email, password, confirmPassword, expiredDate, groupAccess, `<<<< firstName, lastName, userName, email, password, confirmPassword, expiredDate, groupAccess`);
    console.log(resp, `<<< resp`);
    return resp.data;
});

export const deleteUser = createAsyncThunk("/delete-user", async(id) => {
    await axios.delete(`http://localhost:3001/user/${id}`);
    return id;
});

const userEntity = createEntityAdapter({
    selectId: (user) => user.id
});

const userSlice = createSlice({
    name: "user",
    initialState: userEntity.getInitialState,
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            userEntity.setAll(state, action.payload)
        },
        [saveUser.fulfilled]: (state, action) => {
            userEntity.addOne(state, action.payload)
        },
        [deleteUser.fulfilled]: (state, action) => {
            userEntity.removeOne(state, action.payload)
        },
        [updateUser.fulfilled]: (state, action) => {
            userEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        }
    }
});

export const userSelectors = userEntity.getSelectors(state => state.user);
export default userSlice.reducer;