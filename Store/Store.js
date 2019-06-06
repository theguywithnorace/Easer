import {createStore, combineReducers} from 'redux'
import updateUserProfile from './userProfileReducer'

export default createStore(combineReducers({updateUserProfile, }))
