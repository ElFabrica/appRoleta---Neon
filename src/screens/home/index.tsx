import { View, Text, Pressable, Modal, TextInput, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../types/navigation";

import { Button } from "../../components/buttom/Buttom";
import { styles } from "./style";
import { Logo } from "../../components/logo";
import { StackRoutesList } from "../../Routes/StackRoutes";
import { StackRoutesProps } from "../../Routes/StackRoutes";

// 🔗 Tipagem das rotas



export function Home({ navigation }:StackRoutesProps<"home"> ) {

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
    navigation.navigate("users");
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
      style={styles.backgound}
      resizeMode="cover"
      >
          <View style={styles.header}>
          <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Icon name="gear" size={24} color="purple" />
          </Pressable>

          {/* 🔽 Dropdown */}
          {dropdownVisible && (
            <View style={styles.dropdownContainer}>
              <Pressable
                onPress={() => {
                  setDropdownVisible(false);
                  setModalVisible(true);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>🔑 Acesso Restrito</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDropdownVisible(false);
                  setModalAdminVisible(true);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>⚙️ Área Admin</Text>
              </Pressable>
            </View>
          )}
        </View>
      <View style={styles.container}>
        
        {/* Conteúdo principal */}


        <View style={styles.contentCenter}>
          <Text style={styles.Title}>Bem-vindo ao{"\n"}Girou Ganhou!</Text>

          
          <View style={styles.containerFooter}>
          <LottieView
          source={require('../../animations/Roullete.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
            <Button title="Prosseguir" size={20} onPress={() => navigation.navigate("form")} />
          </View>
        </View>

        {/* 🔒 Modal: Acesso Restrito */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredModal}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Acesso Restrito</Text>

              <TextInput
                placeholder="Digite a chave"
                placeholderTextColor="#888"
                style={styles.input}
                value={chave}
                onChangeText={setChave}
                secureTextEntry
                autoCapitalize="none"
              />

              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setChave("");
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={acessoRestrito}
                >
                  <Text style={styles.modalButtonText}>Confirmar</Text>
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
          <View style={styles.centeredModal}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Área Admin</Text>

              <TextInput
                placeholder="Digite a senha de admin"
                placeholderTextColor="#888"
                style={styles.input}
                value={senhaAdmin}
                onChangeText={setSenhaAdmin}
                secureTextEntry
                autoCapitalize="none"
              />

              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalAdminVisible(false);
                    setSenhaAdmin("");
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.adminButton]}
                  onPress={acessoAdmin}
                >
                  <Text style={styles.modalButtonText}>Entrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
