import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAsyncTodo} from "../store/modules/todo";
import {RootState} from "../store";

function TodoContainer() {

    const todo = useSelector((state: RootState) => state.todo.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsyncTodo('contentBlaBla'));
    }, []);

    if (todo.loading) {
        return <div>loading</div>;
    }

    return (
        <div>
            <h1>{todo.data.title}</h1>
            <p>{todo.data.content}</p>
        </div>
    );
}

export default TodoContainer;