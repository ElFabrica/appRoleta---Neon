import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  wrapper: {},
  image: {
    width: RFValue(50),
    height: RFValue(50),
    objectFit: "contain",
    borderRadius: 8,
  },
});
