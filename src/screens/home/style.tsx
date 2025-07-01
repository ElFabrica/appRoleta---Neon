import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

export const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        height: 100,
        marginBottom: 24

    },
    imagem: {
        width: RFValue(120),
        height: RFValue(70),
        position: "absolute",
        top: 0,
        right: 0,
        marginRight: 8,
        marginTop:16

    },
    Title: {
        fontSize: RFValue(36),
        fontWeight: 700,
        color: "#333333",
        fontFamily:"Nunito_400Regular"
    },
    subTitile: {
        fontSize: RFValue(26),
        fontWeight: 800,
        color: "#333333"
    },
        textInstructions: {
        fontSize: RFValue(18),
        fontWeight: 600,
        color: "#333333",
        textAlign:"center"
    },
    containerInstructions:{
        justifyContent:"center",
        backgroundColor:"#f6fa04",
        borderRadius:10,
        paddingLeft: 16,
        paddingRight:16,
        paddingTop:24,
        paddingBottom:24
    },
    containerFooter:{
        justifyContent:"center", 
        width:"100%", 
        paddingLeft: 24,
        paddingRight: 24
    }

})
