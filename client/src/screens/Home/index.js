import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";

import user from "../../../assets/user.png"
import ufpa from "../../../assets/ufpa.png"
import iconWallet from "../../../assets/wallet.png"
import iconPay from "../../../assets/pay.png"
import iconEarn from "../../../assets/earn.png"
import iconTransaction from "../../../assets/transaction.png"
import iconCopy from "../../../assets/copy.png"
import iconShare from "../../../assets/share.png"

import axios from "axios";
axios.defaults.withCredentials = true;

export default function Home({ navigation }) {
  const [userName, setUserName] = useState('')
  const [balance, setBalance] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const getDashboard = async () => {
    try {
      const response = await axios.get('https://a9bc-177-134-164-18.ngrok-free.app/api/dashboard', { withCredentials: true });
      console.log(response.data)
      setUserName(response.data.name)
      setBalance(response.data.tokens)
    } catch (error) {
      console.log('ERRO NA DASHBOARD: ', error);
    }
  };

  const logOut = async () => {
    try {
      // Fazendo Logout na API
      const response = await axios.get('https://a9bc-177-134-164-18.ngrok-free.app/api/logout')
      console.log(response.data)
      // Definindo o estado isLoggedIn como false após o logout
      setIsLoggedIn(false);
      // Ir para tela de Login novamente
      navigation.navigate('Login')
    } catch (error){
      console.log('ERRO NO LOGOUT: ', error)
    }
  }

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} horizontal={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image style={styles.logo} source={ufpa} />
            <View>
              <Text style={styles.tokenName}>Eco-Token (ECTK)</Text>
              <Text style={styles.tokenOrg}>UFPA.2023</Text>
              <TouchableOpacity onPress={logOut} style={{backgroundColor: 'red', borderRadius: 10, alignItems: 'center', marginTop: 10}}>
                <Text style={{color: 'white'}}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.userCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.usernameText}>{userName}</Text> 
              <Text style={styles.info}>Bem vindo(a) novamente!</Text>
            </View>
            <Image style={styles.iconUser} source={user} /> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardBalance}>
            <View style={styles.cardBalanceHeader}>
              <Text style={styles.cardBalanceHeaderText}>Saldo disponível</Text>
              <Image style={styles.iconWallet} source={iconWallet} />
            </View>
            <View style={styles.ValueCurrencyView}>
              <Text style={styles.cardBalanceTextValue}>$ {balance}</Text>
              <Text style={styles.cardBalanceTextCurrency}>ECTK</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.walletCard}>
            <View>
              <Text  style={styles.walletCardHeader}>Endereço de carteira</Text>
              <Text style={styles.walletCardAdress}>kauan.sena@icsa.ufpa.br</Text>
            </View>
            <TouchableOpacity style={styles.copyAdressButton}>
              <Image style={styles.iconsWallet} source={iconCopy}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareAdressButton}>
              <Image style={styles.iconsWallet} source={iconShare}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Carteira virtual</Text>
          <ScrollView style={styles.footerScrollCardContainer} showsHorizontalScrollIndicator={false} horizontal={true}>
            <TouchableOpacity style={styles.footerCard}>
              <Image style={styles.iconsFooter} source={iconPay} /> 
              <Text style={styles.footerCardText}>Pagar com Tokens</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCard}>
              <Image style={styles.iconsFooter} source={iconEarn} /> 
              <Text style={styles.footerCardText}>Ganhar Pontos ECTK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerCard}>
              <Image style={styles.iconsFooter} source={iconTransaction} /> 
              <Text style={styles.footerCardText}>Transferir Tokens</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconWallet: {
    width: 22,
    height: 22,
    marginRight: 2
  },
  iconsFooter: {
    width: 25,
    height: 25,

  },
  iconUser: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 5

  },
  iconsWallet: {
    width: 18,
    height: 18,
  },
  scrollContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#F7F7F9",
    alignItems: "center",
    paddingTop: 10
  },
  content: {
    width: "100%",
    paddingHorizontal: 30,
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: 7
  },
  tokenName: {
    fontSize: 14,
    color: "#C2C1CD",
    fontWeight: "600",
    marginRight: 10
  },
  tokenOrg: {
    marginTop: 4,
    fontSize: 12.5,
    fontWeight: "300",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",

  },
  userCard: {
    width: "100%",
    height: 125,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 27,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#e7ebf4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:  0.21,
    shadowRadius: 8.19,
    elevation: 11
  },
  cardHeader: {
    justifyContent: "space-between",
    flexDirection: "column",
  },
  usernameText: {
    fontSize: 24,
    color: "#0F151A",
    fontWeight: "600",
    
  },
  info: {
    color: "#718096",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 1,
    fontWeight: "600",
  },
  cardBalance: {
    padding: 20,
    width: "100%",
    height: 120,
    marginBottom: 27,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#e7ebf4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:  0.21,
    shadowRadius: 8.19,
    elevation: 11

  },
  cardBalanceHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  ValueCurrencyView: {
    flexDirection: "row",
  },
  cardBalanceHeaderText: {
    color: "#718096",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
  },
  cardBalanceTextValue: {
    color: "#0F151A",
    fontSize: 34,
    lineHeight: 54,
    fontWeight: "bold",
  },
  cardBalanceTextCurrency: {
    marginLeft: 20,
    marginTop: 20
  },
  walletCard: {
    width: "100%",
    height: 100,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#e7ebf4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:  0.21,
    shadowRadius: 8.19,
    elevation: 11

  },
  walletCardHeader: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "600",
  },
  walletCardAdress: {
    marginTop: 4,
    fontSize: 12.5,
    fontWeight: "300",
  },
  copyAdressButton: {
    backgroundColor: "#EFEEF6",
    width: 47,
    height: 47,
    borderRadius: 100,
    marginLeft: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  shareAdressButton: {
    backgroundColor: "#090B0C",
    width: 47,
    height: 47,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    paddingTop: 30,
  },
  footerText: {
    marginLeft: 40,
    color: "#0F151A",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
  },
  footerScrollCardContainer: {
    width: "100%",
    height: 200,
    paddingLeft: 30,
  },
  footerCard: {
    marginTop: 37,
    marginRight: 25,
    width: 120,
    height: 127,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    padding: 15,
    shadowColor: "#e7ebf4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:  0.21,
    shadowRadius: 8.19,
    elevation: 11

  },
  footerCardText: {
    color: "#0F151A",
    fontSize: 12,
    fontWeight: "600",
  },
});
