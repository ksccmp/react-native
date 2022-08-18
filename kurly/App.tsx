import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Text, View} from 'react-native';
import Home from './src/screens/home';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
