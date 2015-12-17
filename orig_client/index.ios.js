import React, {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import { Provider } from 'react-redux/native';
import Login from './src/components/Login';
import configureStore from './src/store/configureStore';
import MapExample from './src/components/MapExample';

const store = configureStore();

class wormie extends React.Component{
  render() {
    return (
      <Provider store={store}>
        {() =>
          <NavigatorIOS
            style={styles.container}
            initialRoute = {{
              title: "wormie",
              component: Login
            }}
            navigationBarHidden = "true"
          />}
      </Provider>
    );
  }
};

var styles = StyleSheet.create({
  container:{
    flex: 1
  },
});

AppRegistry.registerComponent('wormie', () => wormie);
