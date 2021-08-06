import { createBucketKey } from '@/services/bucketList/useBucket';
import { useMutation, useQueryClient } from 'react-query';
import { removeTodo, saveTodo, updateTodoState } from '@support/api/todoApi';
import { ITodo } from '@models/bucketList/ITodo';
import { useToast } from '@support/hooks/useToast';
import { IBucket } from '@models/bucketList/IBucket';
import { useConfirm } from '@components/common/Confirm/ConfirmService';

const ERROR_MSG = '다시 시도해 주세요.';

function useTodoQuerySetter(bucketId: number) {
  const queryClient = useQueryClient();
  const onToast = useToast();
  const { openConfirm } = useConfirm();

  const removeMutation = useMutation(removeTodo);
  const saveMutation = useMutation((todo: ITodo) => saveTodo(bucketId, todo));
  const updateStateMutation = useMutation(({ todoId, isComplete }: { todoId: number, isComplete: boolean }) => {
    return updateTodoState(todoId, isComplete);
  });

  const onError = () => onToast(ERROR_MSG);

  // todo 생성
  const onAddTodo = async (todo: ITodo) => {
    saveMutation.mutate(todo, {
      onSuccess: (todoId: number) => {
        const savedTodo: ITodo = Object.assign(todo, { id: todoId });
        queryClient.setQueryData<IBucket | undefined>(createBucketKey(bucketId), prev => {
          if (prev) {
            prev.todoList = [...prev.todoList, savedTodo];
          }
          return prev;
        });
      },
      onError
    });
  };

  // todo 삭제
  const onRemoveTodo = async (todoId: number) => {
    const isConfirm = await openConfirm({ message: '정말 삭제하시겠습니까?' });

    isConfirm && removeMutation.mutate(todoId, {
      onSuccess: () => {
        queryClient.setQueryData<IBucket | undefined>(createBucketKey(bucketId), prev => {
          if (prev !== undefined) {
            prev.todoList = prev?.todoList.filter(todo => todoId !== todo.id);
          }
          return prev;
        });
      },
      onError
    });
  };

  // todo 완료 상태 변경
  const onToggleTodoState = async (todo: ITodo) => {
    const toggleTodo = Object.assign({}, todo);
    toggleTodo.isComplete = !toggleTodo.isComplete;

    updateStateMutation.mutate({ todoId: toggleTodo.id, isComplete: !toggleTodo.isComplete }, {
      onSuccess: () => {
        queryClient.setQueryData<IBucket | undefined>(createBucketKey(bucketId), prev => {
          if (prev) {
            prev.todoList = prev.todoList.map(todo => toggleTodo.id !== todo.id ? todo : toggleTodo);
          }
          return prev;
        });
      },
      onError
    });
  };

  return {
    onAddTodo,
    onRemoveTodo,
    onToggleTodoState,
    addLoading: saveMutation.isLoading,
    updateLoading: updateStateMutation.isLoading
  };
}

export default useTodoQuerySetter;
