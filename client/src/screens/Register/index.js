import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from "react-native";


export default function Register({ navigation }) {
  return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Crie sua carteira virtual</Text>
            <Text style={styles.inputInfo}>Nome</Text>
            <TextInput style={styles.input} placeholder="Como podemos te chamar?" placeholderTextColor="#718096" />
            <Text style={styles.inputInfo}>Email</Text>
            <TextInput keyboardType="email-address" style={styles.input} placeholder="Digite seu email" placeholderTextColor="#718096" />
            <Text style={styles.inputInfo}>Senha</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#718096" />
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.buttonLogin}>
                <Text style={styles.buttonLoginText}>Criar conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.backToLogin}>
                <Text>Voltar para o Login</Text>
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
    fontWeight: 900,
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  buttonRegister: {
    height: 50,
    width: "100%",
    padding: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 9,
    borderWidth: 1.2,
    borderColor: "#E1E2E3"
  },
  buttonLoginText: {
    color: "white",
    fontWeight: "600",
  },
  backToLogin: {
    height: 50,
    padding: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 9,
    borderWidth: 1.2,
    borderColor: "#E1E2E3"
  }
});
