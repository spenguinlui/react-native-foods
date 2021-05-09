import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CookScreen () {
  return (
    <View style={styles.container}>
      <Text>我是烹煮頁</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
