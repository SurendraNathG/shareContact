import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store';
import UserStack from './src/navigation/UserStack';

function App() {
  return (
    <GestureHandlerRootView style={styles.app}>
      <Provider store={store}>
        <UserStack />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({app: {flex: 1}});

export default App;
