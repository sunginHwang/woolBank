import { ITodo } from '@models/ITodo';

export interface IBucketListDetail {
  id: number;
  title: string;
  description: string;
  completeDate: string;
  imageUrl?: string;
  thumbImageUrl?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  todoList: ITodo[];
}
