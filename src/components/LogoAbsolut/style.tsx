import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  wrapper: {},
  image: {
    width: RFValue(50),
    height: RFValue(50),
    position: "absolute",
    objectFit: "contain",
    borderRadius: 12,
    top: RFValue(5),
    right: RFValue(10),
  },
});
