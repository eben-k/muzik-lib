import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppThemeProvider from './components/AppThemeProvider';
import FirebaseProvider from './components/FirebaseProvider';
import Routes from './routes';
import store, { persistor } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseProvider>
          <AppThemeProvider>
            <Routes />
          </AppThemeProvider>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
