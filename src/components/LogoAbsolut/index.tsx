import { Image, ImageProps, View } from "react-native";
import { styles } from "./style";

type Props = ImageProps & {};

export function LogoAbsolut({ ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Image
        {...props}
        source={require("../../assets/logo-lima.jpg")}
        style={styles.image}
      />
    </View>
  );
}
