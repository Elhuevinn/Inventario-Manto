// UserManualScreen.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';


const ManualUsuario = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://drive.google.com/file/d/1UJBGlPqNkffZuNs_FD8sfLbSMCuiKf-M/view?usp=sharing' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});

export default ManualUsuario;