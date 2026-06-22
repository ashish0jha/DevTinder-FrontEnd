import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import SentRequestReducer from "./sentRequestSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        request:requestReducer,
        sentRequest:SentRequestReducer,
    }
})

export default appStore;