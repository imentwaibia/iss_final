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
import Produit from "../components/produit";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListeCommande = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const auth = useContext(Authcontext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/commande/ouvrier/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.commande);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/commande/ouvrier/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.commande);
    };
    sendRequest();
  }, []);

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
                  <Produit id={row.idProduit} />
                  <Text note numberOfLines={1}>
                    {row.date}
                  </Text>
                </Body>
                <Right>
                  {row.finished == true ? (
                    <Button rounded success>
                      <Text> Traitée </Text>
                    </Button>
                  ) : (
                    <Button rounded danger>
                      <Text> En cours de traitement </Text>
                    </Button>
                  )}
                </Right>
              </ListItem>
            </List>
          ))}
      </ScrollView>
    </View>
  );
};

ListeCommande.navigationOptions = (navData) => {
  return {
    headerTitle: "Mes commandes",
  };
};

export default ListeCommande;
