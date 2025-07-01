import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
      wrapper: {
    width: "100%",
  },
    input: {
        color:"#333333",
        fontSize: RFValue(16),
        fontWeight: 600,
        borderWidth: 2,
        borderRadius: 20,
        borderColor:"#F81FB4",
        padding: 10,
        width: "100%",
        minHeight: 65,
        backgroundColor:"#FFFFFF",

    }
})