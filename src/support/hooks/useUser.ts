import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// 유저 정보 조회
export default function useUser() {
  return useSelector((state: RootState) => state.Auth.user);
}

// 유저 id 정보 조회
export function useUserId() {
  return useSelector((state: RootState) => state.Auth.user.id);
}
