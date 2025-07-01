import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import {styles} from "./style"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

type Props =TouchableOpacityProps & {
        title: string
        size?: number
        disable?: boolean
}

export function Button({title,size = 80,disable, ...rest}: Props) {

    return(
        <TouchableOpacity style={[styles.container, disable && {opacity:0.9}]} {...rest} activeOpacity={0.9}  >
            <Text style={[styles.title, {fontSize:RFValue(size)}]}>{title}</Text>
        </TouchableOpacity>
    )
    
}