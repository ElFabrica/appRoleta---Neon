import { useState } from "react";
import { Image,ImageProps, View } from "react-native";
import {styles} from "./style"
import { StyleSheet } from "react-native";

type Props = ImageProps & {

}

export function Logo({ ...rest}: Props) {
      const [isFocused, setIsFocused] = useState(false);

    return(
            <View style={styles.wrapper}>
       <Image source={require("../../assets/LOGO_ACT.png")}
       style={styles.image}/>
        </View>
    )
    
}