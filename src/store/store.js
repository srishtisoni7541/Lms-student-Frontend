import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/reducers/authSlice";
import courseReducer from '../../src/reducers/courseSlice';
import enrollReducer from '../../src/reducers/enrollSlice';
import moduleReducer from '../../src/reducers/moduleSlice';
import certificateReducer from '../../src/reducers/certificateSlice';


 const store = configureStore({
  reducer: {
    auth: authReducer,
    courses:courseReducer,
    enrolles:enrollReducer,
    modules:moduleReducer,
    certificates:certificateReducer,
     

  },
});
export default store;