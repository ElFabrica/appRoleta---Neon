import { Image, ImageProps } from "react-native";
import {styles} from "./style"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

type Props =ImageProps & {
        src:string
}

export function Button({src}: Props) {
    <Image source={require(src)}/>
    return


}