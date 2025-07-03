import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRoutesProps } from "../../Routes/StackRoutes";
import validator from "email-validator";
import MaskInput from "react-native-mask-input";

import { CircleCheck, CircleDashed } from "lucide-react-native";

import { store, USERS_TABLE } from "../../config/store";
import { RFValue } from "react-native-responsive-fontsize";

import { Button } from "../../components/buttom/Buttom";
import { Input } from "../../components/input/Input";
import { styles } from "./style";
import { RootStackParamList } from "../../types/navigation";
import { LogoAbsolut } from "../../components/LogoAbsolut";




export function Form ({ navigation }: StackRoutesProps<"form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);


  const onSubmit = () => {
    if (!loaded) {
      Alert.alert("Aguarde", "O banco de dados ainda está carregando...");
      return;
    }

    if (!name || !phone || !email) {
      Alert.alert("Erro", "Preencha todos os dados");
      return;
    }

    if (!validator.validate(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }

    const id = Math.random().toString(30).substring(2, 20);
    try {
      store.setRow(USERS_TABLE, id, { name, email, phone });
      console.log("Usuário adicionado com sucesso");

      setName("");
      setEmail("");
      setPhone("");

      navigation.navigate("roullete");
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
       <ImageBackground
       source={require("../../assets/Background_with-logo.png")}
             style={styles.backgound}
             resizeMode="cover"
       >
        <LogoAbsolut/>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.Title}>Cadastro</Text>

        {/* NOME */}
        <View style={styles.inputContainer}>
          <Text style={styles.subTitile}>Nome</Text>
          <Input place="John" value={name} onChangeText={setName} />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.subTitile}>Email</Text>
          <Input
            place="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* TELEFONE */}
        <View style={styles.inputContainer}>
          <Text style={styles.subTitile}>Telefone</Text>
          <MaskInput
            value={phone}
            onChangeText={setPhone}
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            keyboardType="numeric"
            placeholder="(00) 00000-0000"
            style={styles.phoneInput}

          />
          <Pressable
            style={styles.inputContainer}
            onPress={() => setIsConfirmed(!isConfirmed)}
          >
            <View style={styles.checkboxContainer}>
 
                {isConfirmed ? <CircleCheck color={"#333333"} size={RFValue(25) }/> : <CircleDashed color={"#333333"} size={RFValue(25) }/>}

              <Text style={styles.checkboxText}>
                Ao preencher com seus dados, você autoriza o uso das informações fornecidas
                para que possamos entrar em contato e melhorar nossos serviços,
                sempre respeitando a sua privacidade.
              </Text>
            </View>
          </Pressable>
        </View>

        {/* BOTÃO */}
        <View style={styles.containerButton}>
          <Button title="Começar" size={20} onPress={onSubmit} disabled={!loaded} disable={!isConfirmed} />
        </View>
      </ScrollView>
      </ImageBackground>
  );
};

