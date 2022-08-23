import {ThemeProvider} from '@emotion/react';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomNavigator from './src/componentes/navigator/bottomNavigator';
import theme from './src/styles/theme';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <BottomNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
