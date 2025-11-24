import { View, Text, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../components/buttom";
import { styles } from "./style";

// 🔗 Tipagem das rotas
type RootStackParamList = {
  Users: undefined;
  Form: undefined;
  admin: undefined;
  OutraTela: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Form"
>;

export function instructions() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // 🔑 Acesso restrito normal

  return (
    <ImageBackground
      source={require("../../assets/Background_with-logo.png")}
      style={styles.backgound}
    >
      <View style={styles.container}>
        {/* Conteúdo principal */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.subTitile, { marginBottom: 16 }]}>
            Instruções
          </Text>

          <View style={[styles.containerInstructions, { marginBottom: 20 }]}>
            <Text style={styles.textInstructions}>Concorra a brindes.</Text>
            <Text style={styles.textInstructions}>
              Preencha um formulário rápido.
            </Text>
            <Text style={styles.textInstructions}>
              Cada cadastro tem direito a um giro.
            </Text>
          </View>

          <View style={styles.containerFooter}>
            <Button
              title="Iniciar"
              size={20}
              onPress={() => navigation.navigate("Form")}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
