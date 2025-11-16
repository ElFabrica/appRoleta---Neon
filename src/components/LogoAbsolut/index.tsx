import { Image, ImageProps, View } from "react-native";
import { styles } from "./style"

type Props = ImageProps & {

}

export function LogoAbsolut({ ...props }: Props) {

  return (
    <View style={styles.wrapper}>
      <Image {...props} source={require("../../assets/logo_rv.jpg")}
        style={styles.image} />
    </View>
  )

}