import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'; // React Native Paper
import AppNavigator from './AppNavigator'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
