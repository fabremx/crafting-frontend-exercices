import { createStore } from 'redux';
import { reducer } from './reducer';

export const reduxStore = createStore(reducer);