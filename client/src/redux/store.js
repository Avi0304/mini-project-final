// import { combineReducers } from 'redux'; // No need for applyMiddleware import
// import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { rootReducer } from './rootReducer';

// const finalReducer = combineReducers({
//     rootReducer
// });

// const initialState = {
//     rootReducer: {
//         loading: false,
//         cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
//     }
// };

// const middleware = []; // No need for thunk middleware

// const store = configureStore({
//     reducer: finalReducer, // Pass reducer directly
//     preloadedState: initialState, // Pass preloaded state directly
//     enhancers: [composeWithDevTools()] // Apply DevTools extension
// });

// export default store;
