import { ITodo } from '@models/ITodo';

export interface IBucketListForm {
  id?: number;
  title: string;
  description: string;
  completeDate: string;
  todoList: ITodo[];
  mainImgFile: File | null;
  imageUrl?: string;
  thumbImageUrl?: string;
}
