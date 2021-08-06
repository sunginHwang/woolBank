
export interface IBucketList {
  id: number;
  title: string;
  completeDate: Date;
  todoCount: number;
  isComplete: boolean;
  completeTodoCount: number;
  thumbImageUrl?: string;
  updatedAt: Date;
}
