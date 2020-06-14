import {Todo} from "../../models/Todo";
import {createAsyncThunk, PayloadAction, createSlice} from "@reduxjs/toolkit";
import {AsyncState} from "../../models/redux";
import {fetchTodo} from "../../support/api/todoApi";

const name = 'todo';

export const getAsyncTodo = createAsyncThunk(`${name}/getAsyncTodo`, async (content: string) => {
    return {
        payload: await fetchTodo(content)
    }
});


export type TodoState = {
    todo: AsyncState<Todo>
}

const initialState: TodoState = {
    todo: {
        loading: false,
        data: {
            title: '',
            content: ''
        },
    }
};

export default createSlice({
    name,
    initialState,
    reducers: {
        changeTodoTitle: (state, action: PayloadAction<string>) => {
            state.todo.data.title = action.payload;
        }
    },
    extraReducers: {
        [getAsyncTodo.pending.type]: (state) => {
            state.todo.loading = true;
        },
        [getAsyncTodo.fulfilled.type]: (state, action: PayloadAction<Todo>) => {
            state.todo.loading = false;
            state.todo.data.title = action.payload.title;
            state.todo.data.content = action.payload.content;
        },
        [getAsyncTodo.rejected.type]: (state) => {
            state.todo.loading = false;
            state.todo = initialState.todo;
        },
    }
})




