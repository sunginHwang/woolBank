import { ITodo } from '@models/bucketList/ITodo';

export interface IBucket {
  id: number;
  title: string;
  description: string;
  completeDate: Date;
  imageUrl?: string;
  thumbImageUrl?: string;
  userId: number;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  todoList: ITodo[];
}
