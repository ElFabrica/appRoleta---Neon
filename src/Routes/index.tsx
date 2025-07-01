import { NavigationContainer } from "@react-navigation/native";


import { StacksRoutes } from "./StackRoutes";

export function Routes(){
    return(

        <NavigationContainer>
            <StacksRoutes/>
        </NavigationContainer>
    )

}