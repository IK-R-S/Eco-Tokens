import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid, StatusBar, ActivityIndicator } from "react-native";

import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [canPressButton, setCanPressButton] = useState(true);

  function showToast(message) {
    ToastAndroid.show(`${message}`, ToastAndroid.SHORT);
  }

  const handleLogin = async () => {
    if (!canPressButton) return;

    try {
      const body = { 'email': email, 'password': password };
      setIsLoading(true);
      setCanPressButton(false);

      const response = await axios.post('https://a9bc-177-134-164-18.ngrok-free.app/api/login', body);
      console.log(response.data);

      if (response.status === 200) {
        // Sucesso no login
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } else {
        // Erro no login, libera o botão para cliques novamente
        setCanPressButton(true);
      }
    } catch (error) {
      console.log('ERRO NO LOGIN: ', error);
      // Erro no login, libera o botão para cliques novamente
      setCanPressButton(true);
      // Enviando alert
      if(error.response.status === 404) {
        showToast('Ops! Verifique o email')
        console.log('REQUEST 404: Usuário inexistente')
      } else if(error.response.status === 401) {
        showToast('Senha incorreta')
        console.log('REQUEST 401: Senha incorreta')
      } else {
        showToast('Ops! Erro inesperado, tente mais tarde!')
        console.log('REQUEST ERROR: Erro inesperado')
      }
      
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Bem vindo(a)!</Text>
      <Text style={styles.inputInfo}>Email</Text>
      <TextInput onChangeText={(text) => setEmail(text)} keyboardType="email-address" style={styles.input} placeholder="Digite seu email" placeholderTextColor="#718096" />
      <Text style={styles.inputInfo}>Senha</Text>
      <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#718096" />
      <TouchableOpacity onPress={handleLogin} style={[styles.buttonLogin, isLoading || !canPressButton && styles.buttonLoginDisabled]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonLoginText}>Avançar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("QRWalletScan")} style={styles.buttonRegister}>
        <Text style={styles.buttonText}>Não tem conta? Cadastre-se</Text>
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
