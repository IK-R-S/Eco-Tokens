import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid, StatusBar, ActivityIndicator } from "react-native";
import QRCode from 'react-native-qrcode-svg';

import axios from "axios";


export default function QRWalletScan ({ navigation }) {

    const walletData = {'wallet:': 'kauan.sena@icsa.ufpa.br'}

    return(
        <View style={styles.container}>
        <QRCode value="'wallet:': 'kauan.sena@icsa.ufpa.br'" size={180} />
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.buttonRegister}>
          <Text style={styles.buttonText}>Compartilhar QRCode</Text>
        </TouchableOpacity>
      </View>      
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: "#F7F7F9",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 40,
      fontWeight: "900",
      marginBottom: 10,
    },
    inputInfo: {
      color: "#0F151A",
      fontWeight: "600",
      marginBottom: 9,
      marginTop: 25,
    },
    input: {
      height: 50,
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 9,
      borderWidth: 1.2,
      borderColor: "#E1E2E3"
    },
    buttonLogin: {
      height: 50,
      width: "100%",
      padding: 10,
      marginTop: 40,
      backgroundColor: "pink",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 9,
    },
    buttonLoginLoading: {
      opacity: 0.7,
    },
    buttonRegister: {
      height: 50,
      width: "100%",
      padding: 10,
      marginTop: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 9,
      borderWidth: 1.2,
      borderColor: "#E1E2E3",
    },
    buttonLoginText: {
      color: "white",
      fontWeight: "600",
    },
    buttonText: {
      color: "#121212",
      fontWeight: "600",
    },
});
  