import { queryStaff,changeEnabled,findAllSite } from '@/services/staff';
const StaffModel = {
  namespace: 'staff',
  state: {
    staffData:[],
    total:0,
    staffId:0,
    siteData:[],
  },
  effects: {
    *fetchLoadStaff(_, { call, put }) {
      // console.log(111)
      const response = yield call(queryStaff,_.payload);
      yield put({
        type: 'changeStaffData',
        payload: response,
      });
    },

    *fetchChangeStatus(_, { call, put }) {
      // console.log(333);
        const response = yield call(changeEnabled,_.payload.forms);
        yield put({
          type: 'fetchLoadStaff',
          payload: _.payload.page,
        });
      },
      
    *fetchFindSite(_, { call, put }) {
        // console.log(333);
          const response = yield call(findAllSite,_.payload);
          yield put({
            type: 'findAllSite',
            payload: response,
          });
        },

  },
  reducers: {
    changeStaffData(state, action) {
    // console.log(222);
      return { 
          ...state, 
          total: action.payload.data.total,
          staffData:action.payload.data.list
        };
    },
    findAllSite(state,action){
      return{
        ...state,
        siteData:action.payload.data
      }
    }
  },
};
export default StaffModel;
