import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AsyncState } from '../../models/redux';
import { IBucketList } from '../../models/IBucketList';
import { fetchBucketList } from '../../support/api/bucketListApi';

const name = 'bucketList';

export const getBucketList = createAsyncThunk(`${name}/getBucketList`,
  async () => {
    const bucketList = await fetchBucketList();
    return bucketList.data.data;
  });

export type BucketListState = {
  bucketList: AsyncState<IBucketList[]>,
  lastUpdatedDate: null | Date; // 리스트중 가장 마지막 업데이트된 시각 (캐싱용)
}

const initialState: BucketListState = {
  bucketList: {
    loading: false,
    data: []
  },
  lastUpdatedDate: null
};

export default createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getBucketList.pending.type]: (state) => {
      state.bucketList.loading = true;
    },
    [getBucketList.fulfilled.type]: (state, action: PayloadAction<IBucketList[]>) => {
      const bucketList = action.payload;
      state.bucketList.loading = false;
      state.bucketList.data = bucketList;

      // 리스트 존재시 가장 최신 업데이트된 시간 설정 (다시 조회시 캐시 체크 용)
      if (bucketList.length > 0) {
        const lastUpdatedAccount = bucketList.sort((a, b) => {
          return (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt)).getTime();
        })[0];

        state.lastUpdatedDate = new Date(lastUpdatedAccount.updatedAt);
      }
    },
    [getBucketList.rejected.type]: (state) => {
      state.bucketList.loading = false;
    }
  }
});
