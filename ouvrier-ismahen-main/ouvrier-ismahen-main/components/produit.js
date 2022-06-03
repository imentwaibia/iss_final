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
  const [produit, setProduit] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/produit/${props.id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setProduit(responseData.produit);
      console.log(responseData.produit);
    };
    sendRequest();
  }, []);

  console.log(props.id);

  return (
    <View>
      {produit && (
        <View>
          <Text>{produit.name}</Text>
          <Text note numberOfLines={1}>
            {produit.categorie}
          </Text>
          <Text note numberOfLines={1}>
            {produit.categorie}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Produit;
