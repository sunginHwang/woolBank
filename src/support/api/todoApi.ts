import apiCall from '../util/apiCall';
import { ApiResType } from '../../models/api/ApiResType';
import { ITodo } from '../../models/ITodo';

export const saveTodo = (bucketListId: number, todo: ITodo) => {
  return apiCall.post<ApiResType<number>>('/todo', {
    title: todo.title,
    isComplete: todo.isComplete,
    bucketListId
  });
};

export const removeTodo = (todoId: number) => {
  return apiCall.delete<ApiResType<number>>(`/todo/${todoId}`);
};

export const updateTodoState = (todoId: number, isComplete: boolean) => {
  return apiCall.put<ApiResType<number>>(`/todo/${todoId}`, {
    isComplete
  });
};
