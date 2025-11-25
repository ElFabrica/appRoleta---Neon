// navigation/AppNavigator.tsx (ou onde quer que esteja seu arquivo)
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Home } from "../screens/home/index";
import { Form } from "../screens/form/index";
import { Users } from "../screens/users/index";
import { Roullete } from "../screens/roullete/index";

import { Admin } from "../screens/admin/index";
import { Provider as TinybaseProvider } from "tinybase/ui-react";
import { store as globalAppStore } from "../storge/store"; // <--- IMPORTE SUA STORE GLOBAL
import { SettingsMidia } from "@/screens/Settings-midia";
import { CarouselTotem } from "@/screens/HomeCarrocel";
import { SystemBars } from "react-native-edge-to-edge";

// Defina os nomes das rotas e seus parâmetros
export type StackRoutesList = {
  home: undefined;
  form: undefined;
  users: undefined;
  roullete: undefined;
  admin: undefined;
  SettingsMidia: undefined;
  carousel: undefined;
};

export type StackRoutesProps<T extends keyof StackRoutesList> =
  NativeStackScreenProps<StackRoutesList, T>;

const Stack = createNativeStackNavigator<StackRoutesList>();

export function StacksRoutes() {
  return (
    // Forneça a instância da store global para o provider
    <TinybaseProvider store={globalAppStore}>
      <NavigationContainer>
        <SystemBars style={"dark"} hidden={true} />

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { padding: 8 },
          }}
        >
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="roullete"
            component={Roullete}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="users"
            component={Users}
            // options={{ title: "Usuários Cadastrados" }} // Exemplo de título
          />
          <Stack.Screen
            name="form"
            component={Form}
            // options={{ title: "Cadastro de Usuário" }}
            options={{ title: "Formulário" }}
          />
          <Stack.Screen
            name="admin" // Nome da rota
            component={Admin} // Componente associado (AdminScreen é o import)
            options={{ title: "Painel Admin" }}
          />

          <Stack.Screen
            name="SettingsMidia" // Nome da rota
            component={SettingsMidia} // Componente associado (AdminScreen é o import)
            options={{ headerShown: false, title: "Configurações de mídia" }}
          />
          <Stack.Screen
            name="carousel"
            component={CarouselTotem}
            options={{
              headerShown: false,
              title: "Carrocel",
              contentStyle: { backgroundColor: "#333333" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TinybaseProvider>
  );
}
