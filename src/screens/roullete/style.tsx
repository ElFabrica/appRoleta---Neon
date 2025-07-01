import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  Container: {
    width: '100%',
    gap: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
      backgound: {
    flex: 1,
    paddingHorizontal: RFValue(16)
    },
  imagem: {
    width: 150,
    height: 100,
    position: "absolute",
    top: 0,
    right: 0,
  },
  Title: {
    fontSize: RFValue(30),
    fontWeight: '700',
    color: "#333333",
    textAlign: "center",
  },
  subContainer: {
    justifyContent: "center",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    width: "100%",
  },
  background: {
    flex: 1,
    paddingHorizontal: RFValue(16),
  },
  wheelContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  pointer: {
    position: "absolute",
    top: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "red",
    zIndex: 10,
  },
  spinButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinButtonText: {
    color: '#4B5563', // equivalente ao tw`text-gray-700`
    fontWeight: 'bold',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.6)',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    zIndex: 10,
    width:"90%"
  },
  modalTitle: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:"center"
  },
    modalMessage: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign:"center"
  },
  modalButton: {
    backgroundColor: '#16A34A', // equivalente ao tw`bg-green-600`
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(22)
  },
});
