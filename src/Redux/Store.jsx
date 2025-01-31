import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import userReducer from './UserSlice';
import personalSignUpReducer from './PersonalSignUpSlice';
import businessSignUpReducer from './BusinessSignUpSlice';
import corporateCustomerReducer from './CoorperateCustomerSlice';
import inventoryReducer from './InventorySlice';
import inventoryByIdReducer from './InventoryByIdSlice';
import clientsReducer from './GetClientsSlice';
import forgotPasswordReducer from './ForgotPasswordSlice';
import walletReducer from './WalletSlice';
import transactionsReducer from './transactionsSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'user',
    'personalSignUp',
    'businessSignUp',
    'coporateCustomerProfile',
    'clients',
    'forgotPassword',
    'wallet',
    // 'inventory'
  ], // Add reducers you want to persist here
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  personalSignUp: personalSignUpReducer,
  businessSignUp: businessSignUpReducer,
  coporateCustomerProfile: corporateCustomerReducer,
  inventory: inventoryReducer,
  inventoryById: inventoryByIdReducer,
  clients: clientsReducer,
  forgotPassword: forgotPasswordReducer,
  wallet: walletReducer,
  transactions: transactionsReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export const persistor = persistStore(store);
export default store;
