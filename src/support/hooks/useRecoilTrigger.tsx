import { RecoilState, useSetRecoilState } from 'recoil';

function useRecoilTrigger(state: RecoilState<number>) {
  const setTrigger = useSetRecoilState(state);
  return () => setTrigger(requestID => requestID + 1);
}

export default useRecoilTrigger;
