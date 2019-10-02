import { queryMarket } from '@/services/market';
const marketModel = {
  namespace: 'market',
  state: {
    marketData:[],
    total:0,
    // marketId:0,
    AmarketData:{}
  },
  effects: {
    *fetchLoadMarket(_, { call, put }) {
      // console.log(111)
      const response = yield call(queryMarket,_.payload);
      yield put({
        type: 'changeMarketData',
        payload: response,
      });
    },
    *getMarketId(_,{call,put}){
      yield put({
        type:'fetchLoadMarket',
        payload:_.payload
      })
    }
  },
  reducers: {
    changeMarketData(state, action) {
    // console.log(action.payload.data.list,'999999999');
      return { 
          ...state, 
          total: action.payload.data.total,
          marketData:action.payload.data.list,
          AmarketData:action.payload.data.list[0]
        };
    },
    // getMarketId(state,action){
    //   return {
    //     ...state,
    //     marketId:action.payload
    //   }
    // }
  }
};
export default marketModel;