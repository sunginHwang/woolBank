
export interface IBucketList {
  title: string;
  completeDate: string;
  todoCount: number;
  completeTodoCount: number;
  image?: {
    thumbImageUrl: string;
    fullImageUrl: string;
  }
}
