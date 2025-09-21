import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/reducers/authSlice";
import courseReducer from '../../src/reducers/courseSlice';
import enrollReducer from '../../src/reducers/enrollSlice';
import moduleReducer from '../../src/reducers/moduleSlice';


 const store = configureStore({
  reducer: {
    auth: authReducer,
    courses:courseReducer,
    enrolles:enrollReducer,
    modules:moduleReducer,
     

  },
});
export default store;