// HomeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import Geolocation from "react-native-geolocation-service";
import moment from "moment";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [userName, setUserName] = useState("John Doe"); // Replace with your user logic
  const [currentTime, setCurrentTime] = useState(moment().format("LT"));
  const [currentDay, setCurrentDay] = useState(moment().format("dddd"));

  useEffect(() => {
    // Get user's location
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Update time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("LT"));
      setCurrentDay(moment().format("dddd"));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome, {userName}!</Title>
          {location && (
            <Paragraph>
              Your current location: {location.latitude}, {location.longitude}
            </Paragraph>
          )}
          <Paragraph>
            Current Time: {currentTime}, Day: {currentDay}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("BarcodeScanner")}
          >
            Scan Barcode
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "80%",
  },
});
