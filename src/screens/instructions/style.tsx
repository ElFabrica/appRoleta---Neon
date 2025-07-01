import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        width:"100%"
    },
        backgound:{
        flex:1,
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
        color: "#F81FB4",
        fontFamily:"Nunito_400Regular"
    },
    subTitile: {
        fontSize: RFValue(26),
        fontWeight: 800,
        color: "#F81FB4"
    },
        textInstructions: {
        fontSize: RFValue(18),
        fontWeight: 600,
        color: "#FFFFFF",
        textAlign:"center"
    },
    containerInstructions:{
        justifyContent:"center",
        backgroundColor:"#F81FB4",
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
    },
    header:{
        width:"100%",
        flexDirection:"row",
        paddingTop: RFValue(26), 
        paddingHorizontal: RFValue(16),
        justifyContent:"space-between",
        alignItems:"center",
        alignContent:"center"
    },

})
