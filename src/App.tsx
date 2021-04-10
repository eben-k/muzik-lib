import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppThemeProvider from './components/AppThemeProvider';
import AttachAccessToken from './components/AttachAccessToken';
import FirebaseProvider from './components/FirebaseProvider';
import ReactQueryProvider from './components/ReactQueryProvider';
import Routes from './routes';
import store, { persistor } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AttachAccessToken />
        <FirebaseProvider>
          <AppThemeProvider>
            <ReactQueryProvider>
              <Routes />
            </ReactQueryProvider>
          </AppThemeProvider>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
