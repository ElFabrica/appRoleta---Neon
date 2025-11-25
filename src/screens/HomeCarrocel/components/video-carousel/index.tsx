import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useCallback } from "react";
import { Dimensions, Pressable } from "react-native";

interface VideoCarouselItemProps {
  uri: string;
  onVideoEnd: () => void;
  isActive: boolean;
  isPaused: boolean;
  shouldLoop?: boolean;
  VIDEO_END_CHECK_INTERVAL: number;
  handleNextPage: () => void;
}

export function VideoCarouselItem({
  uri,
  onVideoEnd,
  isActive,
  isPaused,
  shouldLoop = false,
  VIDEO_END_CHECK_INTERVAL,
  handleNextPage,
}: VideoCarouselItemProps) {
  const { width, height } = Dimensions.get("window");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const hasEndedRef = useRef(false);

  // ✅ Player com cleanup adequado
  const player = useVideoPlayer(uri, (player) => {
    player.loop = shouldLoop;
    player.muted = false;
  });

  // ✅ Função para limpar interval
  const clearVideoInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ✅ Monitorar fim do vídeo
  useEffect(() => {
    if (!player || shouldLoop || !isActive) {
      clearVideoInterval();
      return;
    }

    hasEndedRef.current = false;

    intervalRef.current = setInterval(() => {
      if (!isMountedRef.current || !isActive) {
        clearVideoInterval();
        return;
      }

      try {
        const { status, currentTime, duration } = player;

        // Verifica se o vídeo terminou
        if (status === "idle" && currentTime > 0 && !hasEndedRef.current) {
          hasEndedRef.current = true;
          clearVideoInterval();
          onVideoEnd();
        }

        // Fallback: se currentTime está muito próximo de duration
        if (
          duration > 0 &&
          currentTime >= duration - 0.5 &&
          !hasEndedRef.current
        ) {
          hasEndedRef.current = true;
          clearVideoInterval();
          onVideoEnd();
        }
      } catch (error) {
        console.error("Erro ao monitorar vídeo:", error);
        clearVideoInterval();
      }
    }, VIDEO_END_CHECK_INTERVAL);

    return clearVideoInterval;
  }, [
    player,
    onVideoEnd,
    shouldLoop,
    isActive,
    VIDEO_END_CHECK_INTERVAL,
    clearVideoInterval,
  ]);

  // ✅ Controlar play/pause do vídeo
  useEffect(() => {
    if (!player || !isMountedRef.current) return;

    try {
      if (isActive && !isPaused) {
        player.play();
      } else {
        player.pause();

        // Reset apenas se não está ativo
        if (!isActive) {
          player.currentTime = 0;
          hasEndedRef.current = false;
        }
      }
    } catch (error) {
      console.error("Erro ao controlar player:", error);
    }
  }, [isActive, isPaused, player]);

  // ✅ Cleanup ao desmontar
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      clearVideoInterval();

      // Liberar recursos do player
      try {
        if (player) {
          player.pause();
          player.currentTime = 0;
          player.replace(null as any); // Libera a fonte do vídeo
        }
      } catch (error) {
        console.error("Erro ao limpar player:", error);
      }
    };
  }, [player, clearVideoInterval]);

  // ✅ Limpar quando URI mudar
  useEffect(() => {
    return () => {
      hasEndedRef.current = false;
    };
  }, [uri]);

  return (
    <Pressable
      onPress={handleNextPage}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <VideoView
        player={player}
        style={{ width, height }}
        contentFit="cover"
        fullscreenOptions={{
          enable: true,
        }}
        allowsPictureInPicture={false}
        nativeControls={false}
      />
    </Pressable>
  );
}
