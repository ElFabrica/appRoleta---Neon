import { Image, ImageProps, View } from "react-native";
import { styles } from "./style";

type Props = ImageProps & {};

export function LogoAbsolut({ ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Image
        {...props}
        source={require("../../assets/logo-tercio-resende.png")}
        style={styles.image}
      />
    </View>
  );
}
