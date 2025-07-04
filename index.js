/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// ✅ Wrap App with Redux Provider
const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// ✅ Register Main Component
AppRegistry.registerComponent(appName, () => AppWrapper);
