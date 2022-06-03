import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import LandingGrid from "../components/landingGrid";
import { Authcontext } from "../context/auth-context";

const Pointage = (props) => {
  const date = new Date();
  const auth = useContext(Authcontext);
  const submitAcce = async () => {
    let response = await fetch("http://192.168.1.185:5000/api/pointage/ajout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idOuvrier: auth.userId,
        type: "accee",
        date:
          date.getDate().toString() +
          "/" +
          date.getMonth().toString() +
          "/" +
          date.getFullYear().toString(),
        heure:
          date.getHours().toString() +
          ":" +
          date.getMinutes().toString() +
          ":" +
          date.getSeconds().toString(),
      }),
    });

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }
    let responsedata = await response.json();
    Alert.alert("Message", "Votre date d'accée est enregistrer", [
      { text: "fermer" },
    ]);
  };

  const submitSortie = async () => {
    let response = await fetch("http://192.168.1.185:5000/api/pointage/ajout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idOuvrier: auth.userId,
        type: "sortie",
        date:
          date.getDate().toString() +
          "/" +
          date.getMonth().toString() +
          "/" +
          date.getFullYear().toString(),
        heure:
          date.getHours().toString() +
          ":" +
          date.getMinutes().toString() +
          ":" +
          date.getSeconds().toString(),
      }),
    });

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }
    let responsedata = await response.json();
    Alert.alert("Message", "Votre date de sortie est enregistrer", [
      { text: "fermer" },
    ]);
  };
  return (
    <View>
      <LandingGrid
        title="Enregistrer votre accées"
        color="#41d95d"
        onSelect={submitAcce}
      />
      <LandingGrid
        title="Enregistrer votre sortie"
        color="#f5a442"
        onSelect={submitSortie}
      />
      <Text style={{ fontSize: 30, margin: 15 }}>
        Date: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </Text>
      <Text style={{ fontSize: 30, margin: 15 }}>
        Heure: {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </Text>
    </View>
  );
};

Pointage.navigationOptions = (navData) => {
  return {
    headerTitle: "Pointage",
  };
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    textAlign: "right",
  },
});

export default Pointage;
