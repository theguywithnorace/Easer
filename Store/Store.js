import {createStore, combineReducers} from 'redux'
import updateUserProfile from './userProfileReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
};



export default createStore(persistCombineReducers(rootPersistConfig, {updateUserProfile, }))
