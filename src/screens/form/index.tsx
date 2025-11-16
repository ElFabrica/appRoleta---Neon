import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView, Pressable } from "react-native";
import { StackRoutesProps } from "../../Routes/StackRoutes";
import MaskInput from "react-native-mask-input";
import { CircleCheck, CircleDashed } from "lucide-react-native";
import { store, USERS_TABLE } from "../../config/store";
import { RFValue } from "react-native-responsive-fontsize";
import { Button } from "../../components/buttom/Buttom";
import { Input } from "../../components/input/Input";
import { styles } from "./style";
import { LogoAbsolut } from "../../components/LogoAbsolut";
import { usePage } from "../../hooks/use-page";

export function Form({ navigation }: StackRoutesProps<"form">) {
  const { loadSavedConfigs, getNextPage } = usePage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onSubmit = () => {
    if (!name || !phone) {
      Alert.alert("Erro", "Preencha todos os dados");
      return;
    }

    const id = Math.random().toString(30).substring(2, 20);
    try {
      store.setRow(USERS_TABLE, id, { name, email, phone });

      setName("");
      setEmail("");
      setPhone("");

      handleNextPage();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  function handleNextPage() {
    if (getNextPage("instructions") !== "roullete") {
      navigation.navigate(
        getNextPage("instructions") as
          | "home"
          | "form"
          | "users"
          | "roullete"
          | "admin"
          | "instructions"
      );
      return;
    }
    navigation.navigate("roullete");
  }

  useEffect(() => {
    loadSavedConfigs();
  }, []);

  return (
    <View style={styles.backgound}>
      <LogoAbsolut />
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
              {isConfirmed ? (
                <CircleCheck color={"#333333"} size={RFValue(25)} />
              ) : (
                <CircleDashed color={"#333333"} size={RFValue(25)} />
              )}

              <Text style={styles.checkboxText}>
                Ao preencher com seus dados, você autoriza o uso das informações
                fornecidas para que possamos entrar em contato e melhorar nossos
                serviços, sempre respeitando a sua privacidade.
              </Text>
            </View>
          </Pressable>
        </View>

        {/* BOTÃO */}
        <View style={styles.containerButton}>
          <Button
            title="Começar"
            size={20}
            onPress={onSubmit}
            disable={!isConfirmed}
          />
        </View>
      </ScrollView>
    </View>
  );
}
