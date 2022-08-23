import {ThemeProvider} from '@emotion/react';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import BottomNavigator from './src/componentes/navigators/bottomNavigator';
import theme from './src/styles/theme';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.color.primary} />
        <BottomNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
