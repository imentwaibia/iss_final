import React, { useContext, useState, useEffect, useCallback } from "react";
import { View, Text, RefreshControl, ScrollView, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import { Authcontext } from "../context/auth-context";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Produit = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/produit/`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingProduit);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/produit`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingProduit);
    };
    sendRequest();
  }, []);

  const auth = useContext(Authcontext);

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list &&
          list.map((row) => (
            <List>
              <ListItem thumbnail>
                <Body>
                  <Text>{row.name}</Text>
                  <Text note numberOfLines={1}>
                    {row.categorie}
                  </Text>
                  <Text note numberOfLines={1}>
                    {row.categorie}
                  </Text>
                </Body>
                <Right>
                  <Button
                    rounded
                    success
                    onPress={async () => {
                      let response = await fetch(
                        "http://192.168.1.185:5000/api/commande/ajout",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            idProduit: row._id,
                            idOuvrier: auth.userId,
                          }),
                        }
                      );

                      if (!response.ok) {
                        let responsedata = await response.json();
                        Alert.alert("Message", responsedata.message, [
                          { text: "fermer" },
                        ]);
                        throw new Error(responsedata.message);
                      }

                      let responsedata = await response.json();
                      Alert.alert("Message", "votre demande est enregistrer", [
                        { text: "fermer" },
                      ]);
                    }}
                  >
                    <Text> Commander </Text>
                  </Button>
                </Right>
              </ListItem>
            </List>
          ))}
      </ScrollView>
    </View>
  );
};

Produit.navigationOptions = (navData) => {
  return {
    headerTitle: "Produit",
  };
};

export default Produit;
