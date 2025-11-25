import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useFocusEffect } from "@react-navigation/native";
import { useSharedValue } from "react-native-reanimated";

import { styles } from "./styles";
import { useMedia, ICarouselMedia } from "@/hooks/use-midia";
import { StackRoutesProps } from "@/Routes/StackRoutes";
import { MaterialIcons } from "@expo/vector-icons";
import { VideoCarouselItem } from "./components/video-carousel";
import { AdminModal } from "./components/admin-modal";
import { ImageCarouselItem } from "./components/image-carousel-item";
import { usePage } from "@/hooks/use-page";

// ==================== CONSTANTES ====================
const DEFAULT_IMAGE_DURATION = 7;
const VIDEO_END_CHECK_INTERVAL = 100;
const password = "Act@2024";

// ==================== COMPONENTES AUXILIARES ====================

interface EmptyStateProps {
  onAdminPress: () => void;
}

function EmptyState({ onAdminPress }: EmptyStateProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <MaterialIcons name="image" size={64} color="#ccc" />
      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          color: "#666",
          textAlign: "center",
        }}
      >
        Nenhuma mídia disponível
      </Text>
      <Text
        style={{
          marginTop: 10,
          fontSize: 14,
          color: "#999",
          textAlign: "center",
        }}
      >
        Adicione fotos ou vídeos na tela de administração
      </Text>
      <Pressable
        onPress={onAdminPress}
        style={{
          marginTop: 20,
          backgroundColor: "purple",
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Ir para Admin
        </Text>
      </Pressable>
    </View>
  );
}

function LoadingState() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="purple" />
      <Text style={{ marginTop: 10, color: "#666" }}>Carregando mídias...</Text>
    </View>
  );
}

// ==================== COMPONENTE PRINCIPAL ====================

export function CarouselTotem({ navigation }: StackRoutesProps<"carousel">) {
  const [tasksModalVisible, setTasksModalVisible] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScreenFocused, setIsScreenFocused] = useState(false);

  const progress = useSharedValue<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const { width, height } = Dimensions.get("window");
  const { handleLoadingDatas, carouselMedia, loading } = useMedia();
  const { getNextPage } = usePage();

  // ==================== CLEANUP FUNCTION ====================
  const cleanupTimer = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  // ==================== FOCUS EFFECT ====================
  useFocusEffect(
    useCallback(() => {
      isMountedRef.current = true;
      setIsScreenFocused(true);

      // Carregar dados apenas se não houver mídias
      if (carouselMedia.length === 0) {
        handleLoadingDatas().catch((error) => {
          console.error("Erro ao carregar mídias:", error);
        });
      }

      return () => {
        isMountedRef.current = false;
        setIsScreenFocused(false);
        cleanupTimer();
      };
    }, []) // ✅ Dependências vazias para evitar múltiplas execuções
  );

  // ==================== HANDLERS ====================
  const handleNextPage = useCallback(() => {
    try {
      const nextPage = getNextPage("carousel");
      if (nextPage && nextPage !== "nada") {
        navigation.navigate(nextPage as any);
      } else {
        navigation.navigate("form");
      }
    } catch (error) {
      console.error("Erro ao navegar:", error);
      navigation.navigate("form");
    }
  }, [getNextPage, navigation]);

  const handleAdminAccess = useCallback(() => {
    if (!navigation) {
      console.error("Navigation prop is undefined");
      return;
    }
    if (adminPassword !== password) {
      Alert.alert("Senha incorreta", "Tente novamente");
      setAdminPassword("");
      return;
    }

    setTasksModalVisible(false);
    navigation.navigate("SettingsMidia");
    setAdminPassword("");
  }, [navigation, adminPassword]);

  const goToNext = useCallback(() => {
    if (!isMountedRef.current || carouselMedia.length <= 1) return;

    const nextIndex = (currentIndex + 1) % carouselMedia.length;
    carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
  }, [carouselMedia.length, currentIndex]);

  const handleVideoEnd = useCallback(() => {
    if (isMountedRef.current && carouselMedia.length > 1) {
      goToNext();
    }
  }, [carouselMedia.length, goToNext]);

  const handleSnapToItem = useCallback((index: number) => {
    if (isMountedRef.current) {
      setCurrentIndex(index);
    }
  }, []);

  const handleModalCancel = useCallback(() => {
    setTasksModalVisible(false);
    setAdminPassword("");
  }, []);

  // ==================== AUTO-PLAY EFFECT ====================
  useEffect(() => {
    cleanupTimer();

    if (!isScreenFocused || !isMountedRef.current) return;
    if (carouselMedia.length <= 1) return;

    const currentItem = carouselMedia[currentIndex];

    if (currentItem?.type === "image") {
      const duration = currentItem.duration || DEFAULT_IMAGE_DURATION;
      const durationMs = duration * 1000;

      autoPlayTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          goToNext();
        }
      }, durationMs);
    }

    return cleanupTimer;
  }, [currentIndex, carouselMedia, isScreenFocused, goToNext, cleanupTimer]);

  // ==================== CLEANUP ON UNMOUNT ====================
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      cleanupTimer();
    };
  }, [cleanupTimer]);

  // ==================== RENDER ITEM ====================
  const renderCarouselItem = useCallback(
    ({ item, index }: { item: ICarouselMedia; index: number }) => {
      if (item.type === "video") {
        return (
          <VideoCarouselItem
            VIDEO_END_CHECK_INTERVAL={VIDEO_END_CHECK_INTERVAL}
            uri={item.uri}
            onVideoEnd={handleVideoEnd}
            isActive={index === currentIndex && isScreenFocused}
            isPaused={!isScreenFocused}
            shouldLoop={carouselMedia.length === 1}
            handleNextPage={handleNextPage}
          />
        );
      }

      return (
        <ImageCarouselItem
          uri={item.uri}
          width={width}
          height={height}
          handleNextPage={handleNextPage}
        />
      );
    },
    [
      currentIndex,
      isScreenFocused,
      handleVideoEnd,
      handleNextPage,
      width,
      height,
      carouselMedia.length,
    ]
  );

  // ==================== RENDER ====================
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {loading ? (
          <LoadingState />
        ) : carouselMedia.length === 0 ? (
          <EmptyState onAdminPress={() => setTasksModalVisible(true)} />
        ) : (
          <>
            {carouselMedia.length === 1 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {renderCarouselItem({ item: carouselMedia[0], index: 0 })}
              </View>
            ) : (
              <Carousel
                loop
                ref={carouselRef}
                width={width}
                height={height}
                autoPlay={false}
                data={carouselMedia}
                onProgressChange={progress}
                onSnapToItem={handleSnapToItem}
                style={{ width: width, height: height }}
                renderItem={renderCarouselItem}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 1,
                  parallaxScrollingOffset: 0,
                }}
              />
            )}
          </>
        )}
      </View>

      <View style={styles.header}>
        <Pressable onPress={() => setTasksModalVisible(true)}>
          <MaterialIcons name="circle" size={16} color="purple" />
        </Pressable>
      </View>

      <AdminModal
        visible={tasksModalVisible}
        password={adminPassword}
        onChangePassword={setAdminPassword}
        onCancel={handleModalCancel}
        onConfirm={handleAdminAccess}
      />
    </View>
  );
}
