import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { PersistGate } from 'redux-persist/integration/react';

// Persist configuration

const persistConfig = {
  key: 'root', // key for localStorage
  storage,
  whitelist: ['auth', 'profile','cart'], // reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false, // Consider addressing non-serializable values
    }),
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

const googleClientId =
 "419401564515-eteuctpcdg90lmdv0gqsln8eirbbu9ll.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={googleClientId}>
            <App />
            <Toaster />
          </GoogleOAuthProvider>
        </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>
);