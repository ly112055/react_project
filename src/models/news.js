import { queryNews,changeNewsStatus,deleteNews,saveOrUpdateNews } from '@/services/news';
const NewsModel = {
  namespace: 'news',
  state: {
    newsData:[],
    total:0,
  },
  effects: {
    *fetchLoadNews(_, { call, put }) {
      // console.log(111)
      const response = yield call(queryNews,_.payload);
      yield put({
        type: 'changeNewsData',
        payload: response,
      });
    },
    *fetchChangeNewsStatus(_, { call, put }) {
      // console.log('models');
      const response = yield call(changeNewsStatus,_.payload.forms);
      yield put({
        type: 'fetchLoadNews',
        payload: _.payload.page,
      });
    },
    *fetchDeleteNews(_, { call, put }) {
      const response = yield call(deleteNews,_.payload.forms);
      yield put({
        type: 'fetchLoadNews',
        payload: _.payload.page,
      });
    },
    *fetchSaveNews(_, { call, put }) {
      const response = yield call(saveOrUpdateNews,_.payload.forms);
      yield put({
        type: 'fetchLoadNews',
        payload: _.payload.page,
      });
    },

  },
  reducers: {
    changeNewsData(state, action) {
    // console.log(222);
      return { 
          ...state, 
          total: action.payload.data.total,
          newsData:action.payload.data.list
        };
    },

  },
};
export default NewsModel;