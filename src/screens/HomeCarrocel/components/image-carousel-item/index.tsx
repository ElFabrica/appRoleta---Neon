import { Image, Pressable, View } from "react-native";

interface ImageCarouselItemProps {
  uri: string;
  width: number;
  height: number;
  handleNextPage: () => void;
}

export function ImageCarouselItem({
  uri,
  width,
  height,
  handleNextPage,
}: ImageCarouselItemProps) {
  return (
    <Pressable
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={handleNextPage}
    >
      <Image
        source={{ uri }}
        style={{ width: width, height: height }}
        resizeMode="contain"
      />
    </Pressable>
  );
}
