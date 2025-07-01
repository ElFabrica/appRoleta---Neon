import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginBottom: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imagem: {
    width: RFValue(200),
    height: RFValue(100),
  },
  Title: {
    fontSize: RFValue(32),
    fontWeight: "700",
    color: "#F81FB4",
    textAlign: "center",
    marginBottom: 16,
  },
  subTitile: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  containerInstructions: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#de8328",
    borderRadius: 10,
    padding: 16,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  phoneInput: {
    color: "#333333",
    fontSize: RFValue(16),
    backgroundColor:"#FFFFFF",
    fontWeight: "600",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    width: "100%",
    minHeight: 65,
    borderColor: "#F81FB4",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
    backgound: {
    flex: 1,
    paddingHorizontal: RFValue(16)
    },
    checkboxContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap:8,
  marginTop:16,
  alignContent:"center"
},
checkboxIcon: {
  fontSize: RFValue(20),
  marginRight: 10,
  marginTop: 2,
},
checkboxText: {
  flex: 1,
  fontSize: RFValue(14),
  color: "#333333",
},


});
