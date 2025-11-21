import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../shared/colors";

export const styles = StyleSheet.create({
  main: {
    width: "100%",
  },
  container: {
    backgroundColor: colors["button-secondary"],
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    borderColor: colors["border-input-primary"],
  },
  title: {
    color: colors["label-button-primary"],
    fontSize: RFValue(14),
    fontWeight: "500",
  },
});
