import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  main: {
    width: "100%",
  },
  container: {
    backgroundColor: "#8E483E",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: RFValue(14),
    fontWeight: "500",
  },
});
