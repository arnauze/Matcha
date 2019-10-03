import { createStore } from 'redux'
import handleGlobalState from './Reducers/handleGlobalState'

export default createStore(handleGlobalState);