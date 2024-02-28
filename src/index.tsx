import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/store';
import { injectStore } from 'services/axiosClient';
import { HelmetProvider } from 'react-helmet-async';

injectStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
