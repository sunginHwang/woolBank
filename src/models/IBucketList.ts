
export interface IBucketList {
  id: number;
  title: string;
  completeDate: Date;
  todoCount: number;
  completeTodoCount: number;
  thumbImageUrl?: string;
  updatedAt: Date;
}
