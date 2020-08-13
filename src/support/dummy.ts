import { IBucketListDetail } from '../models/bucketList/IBucketListDetail';

export const bucketListDetailDummy: {
  initialData: IBucketListDetail;
  loadData: IBucketListDetail;
} = {
  initialData: {
    title: '',
    image: {
      fullImageUrl: ''
    },
    description: '',
    todoList: [],
    completeDate: '',
    createdDate: '',
    serverDate: (new Date()).toString()
  },
  loadData: {
    title: '버킷리스트 목표달성 1',
    image: {
      fullImageUrl: 'https://yaimg.yanolja.com/v5/2020/06/11/11/640/5ee19ac12697b5.53833623.jpg'
    },
    description: 'Como exemplos de conjunções coordenativas adversativas temos: porém, mas, contudo, todavia, entretanto.',
    todoList: [{
      id: 1,
      title: '12121',
      isComplete: false
    }],
    completeDate: '2020-12-31 00:00:00',
    createdDate: '2020-04-01 00:00:00',
    serverDate: (new Date()).toString()
  }
}
