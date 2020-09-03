
export interface IBucketList {
  id: number;
  title: string;
  completeDate: string;
  todoCount: number;
  completeTodoCount: number;
  thumbImageUrl?: string;
  updatedAt: Date | string;
}
