import { queryShop } from '@/services/shop';
const shopModel = {
  namespace: 'shop',
  state: {
    shopData:[],
    total:0,
  },
  effects: {
    *fetchLoadShop(_, { call, put }) {
      // console.log(111)
      const response = yield call(queryShop,_.payload);
      yield put({
        type: 'changeShopData',
        payload: response,
      });
    },
  },
  reducers: {
    changeShopData(state, action) {
    console.log(222);
      return { 
          ...state, 
          total: action.payload.data.total,
          shopData:action.payload.data.list
        };
    },

  }
};
export default shopModel;