import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { AsyncState } from '@models/redux';
import { IBucketList } from '@models/IBucketList';
import { IBucketListDetail } from '@models/bucketList/IBucketListDetail';
import { ITodo } from '@models/ITodo';
import { fetchBucketListByPass, fetchBucketListDetail } from '@support/api/bucketListApi';
import Layout from '@store/modules/Layout';
import { delay } from '@support/util/delay';

const DETAIL_CACHE_COUNT = 10;

const name = 'bucketList';

export const getBucketList = createAsyncThunk(`${name}/getBucketList`, async () => {
  const bucketList = await fetchBucketListByPass();
  // ux 로딩용 딜레이
  await delay(400);
  return bucketList.data.data;
});

export const getBucketListDetail = createAsyncThunk(
  `${name}/getBucketListDetail`,
  async (bucketListId: number, { rejectWithValue, dispatch }) => {
    try {
      const bucketListDetail = await fetchBucketListDetail(bucketListId);
      // ux 로딩용 딜레이
      await delay(400);
      return bucketListDetail.data.data;
    } catch (e) {
      dispatch(Layout.actions.setErrorStatusCode(e.response.data.status));
      return rejectWithValue(e.response.data);
    }
  }
);

export type BucketListState = {
  bucketList: AsyncState<IBucketList[]>;
  lastUpdatedDate: null | Date; // 리스트중 가장 마지막 업데이트된 시각 (캐싱용)
  bucketListDetail: AsyncState<null | IBucketListDetail>;
  bucketListDetailCache: IBucketListDetail[];
};

const initialState: BucketListState = {
  bucketList: {
    loading: false,
    data: []
  },
  lastUpdatedDate: null,
  bucketListDetail: {
    loading: false,
    data: null
  },
  bucketListDetailCache: []
};

export default createSlice({
  name,
  initialState,
  reducers: {
    removeBucketListDetail: (state, action: PayloadAction<number>) => {
      state.bucketListDetail.data = null;

      // 해당 요소 캐시 삭제
      const bucketListDetailCacheList = state.bucketListDetailCache;
      const removeIndex = bucketListDetailCacheList.findIndex((a) => a.id === action.payload);
      bucketListDetailCacheList.splice(removeIndex, 1);
      state.bucketListDetailCache = bucketListDetailCacheList;
    },
    setBucketListDetail: (state, action: PayloadAction<IBucketListDetail>) => {
      state.bucketListDetail.data = action.payload;
    },
    clearBucketListDetail: (state) => {
      state.bucketListDetail.data = null;
    },
    saveTodo: (state, action: PayloadAction<ITodo>) => {
      if (state.bucketListDetail.data) {
        state.bucketListDetail.data.todoList.push(action.payload);
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      if (state.bucketListDetail.data) {
        state.bucketListDetail.data.todoList = state.bucketListDetail.data.todoList.filter(
          (todo) => todo.id !== action.payload
        );
      }
    },
    setTodoState: (state, action: PayloadAction<ITodo>) => {
      if (state.bucketListDetail.data) {
        state.bucketListDetail.data.todoList = state.bucketListDetail.data.todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.isComplete = action.payload.isComplete;
          }
          return todo;
        });
      }
    }
  },
  extraReducers: {
    [getBucketList.pending.type]: (state) => {
      state.bucketList.loading = true;
    },
    [getBucketList.fulfilled.type]: (state, action: PayloadAction<IBucketList[]>) => {
      const bucketList = action.payload.map((bucket) => {
        return _.merge(bucket, {
          updatedAt: new Date(bucket.updatedAt),
          completeDate: new Date(bucket.completeDate)
        });
      });
      state.bucketList.loading = false;
      state.bucketList.data = bucketList;

      // 리스트 존재시 가장 최신 업데이트된 시간 설정 (다시 조회시 캐시 체크 용)
      if (bucketList.length > 0) {
        const lastUpdatedAccount = bucketList.sort((a, b) => {
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        })[0];

        state.lastUpdatedDate = lastUpdatedAccount.updatedAt;
      }
    },
    [getBucketList.rejected.type]: (state) => {
      state.bucketList.loading = false;
    },
    [getBucketListDetail.pending.type]: (state) => {
      state.bucketListDetail.loading = true;
    },
    [getBucketListDetail.fulfilled.type]: (state, action: PayloadAction<IBucketListDetail>) => {
      const bucketListDetail = _.merge(action.payload, {
        completeDate: new Date(action.payload.completeDate),
        createdAt: new Date(action.payload.createdAt),
        updatedAt: new Date(action.payload.updatedAt)
      });

      const bucketListDetailCacheList = state.bucketListDetailCache;

      const bucketListCacheIndex = bucketListDetailCacheList.findIndex((a) => a.id === bucketListDetail.id);

      if (bucketListCacheIndex > -1) {
        bucketListDetailCacheList[bucketListCacheIndex] = bucketListDetail;
      } else {
        bucketListDetailCacheList.push(bucketListDetail);
      }

      if (DETAIL_CACHE_COUNT < bucketListDetailCacheList.length) {
        bucketListDetailCacheList.shift();
      }

      state.bucketListDetail.data = bucketListDetail;
      state.bucketListDetailCache = bucketListDetailCacheList;
      state.bucketListDetail.loading = false;
    },
    [getBucketListDetail.rejected.type]: (state) => {
      state.bucketListDetail.loading = false;
      state.bucketListDetail.data = null;
    }
  }
});
