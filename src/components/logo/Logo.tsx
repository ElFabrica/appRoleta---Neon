import { Image, ImageProps } from "react-native";
import {styles} from "./style"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export function Logo() {
    
    return<Image source={require("../../assets/logo_nasa_letras_pretas.png")} style={styles.image}/>


}