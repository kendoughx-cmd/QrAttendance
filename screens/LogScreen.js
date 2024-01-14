// LogScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <Text>Log Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
