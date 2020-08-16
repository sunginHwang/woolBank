import { ITodo } from '../ITodo';

export interface IBucketListDetail {
  title: string;
  image: {
    fullImageUrl: string;
  },
  description: string;
  todoList: ITodo[],
  completeDate: Date | string;
  createdDate: Date | string;
  serverDate: Date | string;
};
