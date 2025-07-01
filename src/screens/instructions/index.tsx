import { View, Text, Pressable, Modal, TextInput, Alert, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from "../../components/buttom/Buttom";
import { styles } from "./style";
import { LogoAbsolut } from "../../components/LogoAbsolut";
import { Logo } from "../../components/logo";

// 🔗 Tipagem das rotas
type RootStackParamList = {
  Users: undefined;
  Form: undefined;
  admin: undefined;
  OutraTela: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Form'>;

export function instructions() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // 🔥 Estados
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAdminVisible, setModalAdminVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [chave, setChave] = useState('');
  const [senhaAdmin, setSenhaAdmin] = useState('');

  // 🔑 Acesso restrito normal
  function acessoRestrito() {
    if (chave !== "Fala1234@") {
      Alert.alert("Código inválido");
      setChave("");
      return;
    }
    setModalVisible(false);
    setDropdownVisible(false);
    navigation.navigate("Users");
    setChave("");
  }

  // ⚙️ Acesso à área de admin
  function acessoAdmin() {
    if (senhaAdmin !== "Premio1234@") {
      Alert.alert("Senha inválida");
      setSenhaAdmin("");
      return;
    }
    setModalAdminVisible(false);
    setDropdownVisible(false);
    navigation.navigate("admin");
    setSenhaAdmin("");
  }

  return (
    <ImageBackground
      source={require("../../assets/Background_with-logo.png")}
      style={styles.backgound}>
      <View style={styles.container}>

        {/* Conteúdo principal */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.subTitile, { marginBottom: 16 }]}>Instruções</Text>

          <View style={[styles.containerInstructions, { marginBottom: 20 }]}>
            <Text style={styles.textInstructions}>Concorra a brindes.</Text>
            <Text style={styles.textInstructions}>Preencha um formulário rápido.</Text>
            <Text style={styles.textInstructions}>Cada cadastro tem direito a um giro.</Text>
          </View>

          <View style={styles.containerFooter}>
            <Button title="Iniciar" size={20} onPress={() => navigation.navigate("Form")} />
          </View>
        </View>

        {/* 🔒 Modal: Acesso Restrito */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black/50`}>
            <View style={tw`bg-white w-80 p-5 rounded-lg shadow-lg`}>
              <Text style={tw`text-xl font-semibold mb-4 text-center`}>Acesso Restrito</Text>

              <TextInput
                placeholder="Digite a chave"
                placeholderTextColor="#888"
                style={tw`border border-purple-500 rounded-md p-3 mb-4 text-base`}
                value={chave}
                onChangeText={setChave}
                secureTextEntry
                autoCapitalize="none"
              />

              <View style={tw`flex-row justify-between`}>
                <Pressable
                  style={tw`bg-gray-400 px-5 py-2 rounded-md`}
                  onPress={() => {
                    setModalVisible(false);
                    setChave("");
                  }}
                >
                  <Text style={tw`text-white text-base`}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={tw`bg-blue-500 px-5 py-2 rounded-md`}
                  onPress={acessoRestrito}
                >
                  <Text style={tw`text-white text-base`}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* 🔒 Modal: Área Admin */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalAdminVisible}
          onRequestClose={() => setModalAdminVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black/50`}>
            <View style={tw`bg-white w-80 p-5 rounded-lg shadow-lg`}>
              <Text style={tw`text-xl font-semibold mb-4 text-center`}>Área Admin</Text>

              <TextInput
                placeholder="Digite a senha de admin"
                placeholderTextColor="#888"
                style={tw`border border-purple-500 rounded-md p-3 mb-4 text-base`}
                value={senhaAdmin}
                onChangeText={setSenhaAdmin}
                secureTextEntry
                autoCapitalize="none"
              />

              <View style={tw`flex-row justify-between`}>
                <Pressable
                  style={tw`bg-gray-400 px-5 py-2 rounded-md`}
                  onPress={() => {
                    setModalAdminVisible(false);
                    setSenhaAdmin("");
                  }}
                >
                  <Text style={tw`text-white text-base`}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={tw`bg-green-600 px-5 py-2 rounded-md`}
                  onPress={acessoAdmin}
                >
                  <Text style={tw`text-white text-base`}>Entrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
