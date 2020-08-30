/*
* data 조회시 마지막 업데이트 날짜 확인하여 중복 호출 방지 함수
* */
export const checkNeedReFetch = async (
  currentUpdatedAt: Date | null,
  updateCheckRequest: Function,
  requestParam?: any[]
): Promise<boolean> => {
  // 캐싱 날짜 없으면 바로 조회
  if (!currentUpdatedAt) {
    return true;
  }

  let needFetch = false;

  try {
    // 마지막 업데이트 날짜가 현재 캐시 날짜보다 지난경우 다시 데이터 fetch
    const newLastUpdatedAt = requestParam
      ? await updateCheckRequest(...requestParam)
      : await updateCheckRequest();

    if ((new Date(newLastUpdatedAt.data.data)).getTime() > currentUpdatedAt.getTime()) {
      needFetch = true;
    }
  } catch (e) {
    needFetch = true;
  }

  return needFetch;
};
