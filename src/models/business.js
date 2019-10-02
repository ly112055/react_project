import { queryBusiness } from '@/services/business';
const businessModel = {
  namespace: 'business',
  state: {
    businessData:[],
    total:0,
    AbusinessData:{},
  },
  effects: {
    *fetchLoadBusiness(_, { call, put }) {
      // console.log(111)
      const response = yield call(queryBusiness,_.payload);
      yield put({
        type: 'changeBusinessData',
        payload: response,
      });
    },
    // *fetchGetBusinessId(_, { call, put }){
    //     // const response = yield call(queryBusiness,_.payload);
    //     yield put({
    //         type: 'getBusinessId',
    //         payload: response,
    //       });
    // }
  },
  reducers: {
    changeBusinessData(state, action) {
    // console.log(222);
      return { 
          ...state, 
          total: action.payload.data.total,
          businessData:action.payload.data.list,
          AbusinessData:action.payload.data.list[0]
        };
    },
    fetchGetBusinessId(state,action){
        // console.log(action.payload.data.list[0].id,'222222');
        return {
            ...state,
            businessId:action.payload
        }
    }
  }
};
export default businessModel;