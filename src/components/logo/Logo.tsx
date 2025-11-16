import { Image, } from "react-native";
import { styles } from "./style"


export function Logo() {

    return <Image source={require("../../assets/logo_rv.jpg")} style={styles.image} />


}