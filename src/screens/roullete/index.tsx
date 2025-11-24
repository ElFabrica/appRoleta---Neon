import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  Modal,
  useWindowDimensions,
} from "react-native";
import Svg, { G, Path, Circle, Text as SvgText } from "react-native-svg";
import ConfettiCannon from "react-native-confetti-cannon";

import { store, PRIZES_TABLE, updateRow } from "../../storge/store";

import { styles } from "./style";
import { Button } from "../../components/buttom";
import { RFValue } from "react-native-responsive-fontsize";
import { Prize } from "../../types/Prizes";
import { StackRoutesProps } from "../../Routes/StackRoutes";
import { LogoAbsolut } from "../../components/LogoAbsolut";

export function Roullete({ navigation }: StackRoutesProps<"roullete">) {
  const { width } = useWindowDimensions();

  const wheelSize = width * 0.7;
  const radius = wheelSize / 2;
  const center = radius;

  const rotation = useRef(new Animated.Value(0)).current;

  // Animações do modal
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;

  // Animação do botão ao pressionar
  const buttonPressScale = useRef(new Animated.Value(1)).current;

  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [result, setResult] = useState<Prize | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const anglePerSlice = 360 / (prizes.length || 1);

  // ✅ CORRIGIDO: Seguindo o padrão do Admin
  useEffect(() => {
    const loadPrizes = () => {
      const table = store.getTable(PRIZES_TABLE) as unknown as Record<
        string,
        Prize
      >;
      const entries = Object.entries(table);

      // Transforma [id, Prize][] em Prize[] com id incluso
      const data = entries
        .map(([id, prize]) => ({
          ...prize,
          id, // Adiciona o id ao objeto
        }))
        .filter((prize) => prize.quant > 0); // Filtra apenas prêmios disponíveis

      setPrizes(data);
      console.log("Prêmios carregados:", data);
    };

    loadPrizes();
    const listenerId = store.addTableListener(PRIZES_TABLE, loadPrizes);

    return () => {
      store.delListener(listenerId);
    };
  }, []);

  // Animação de entrada do modal
  useEffect(() => {
    if (modalVisible) {
      // Reset das animações
      modalScale.setValue(0);
      modalOpacity.setValue(0);
      titleScale.setValue(0);
      messageOpacity.setValue(0);
      buttonScale.setValue(0);
      buttonPressScale.setValue(1);

      // Sequência de animações
      Animated.sequence([
        // 1. Fade in do backdrop
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // 2. Bounce do modal
        Animated.spring(modalScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // 3. Animações em paralelo do conteúdo (com delay)
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(titleScale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(messageOpacity, {
            toValue: 1,
            duration: 500,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.spring(buttonScale, {
            toValue: 1,
            friction: 7,
            tension: 40,
            delay: 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, 300);
    }
  }, [modalVisible]);

  // Animações do botão "Concluir"
  const handleButtonPressIn = () => {
    Animated.spring(buttonPressScale, {
      toValue: 0.92,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonPressScale, {
      toValue: 1,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const getPrizeByProbability = (): number => {
    const total = prizes.reduce((sum, p) => sum + p.probability, 0);
    const rand = Math.random() * total;
    let acc = 0;

    for (let i = 0; i < prizes.length; i++) {
      acc += prizes[i].probability;
      if (rand <= acc) return i;
    }

    return prizes.length - 1;
  };

  const spin = () => {
    if (prizes.length === 0 || isSpinning) return;

    setIsSpinning(true);

    const winnerIndex = getPrizeByProbability();
    const rounds = 5;

    const angleToTop = winnerIndex * anglePerSlice + anglePerSlice / 2;
    const endRotation = rounds * 360 + angleToTop;

    Animated.timing(rotation, {
      toValue: -endRotation,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const prize = prizes[winnerIndex];
      setResult(prize);
      setModalVisible(true);
      rotation.setValue(-endRotation % 360);

      if (prize.isPrize) {
        setShowConfetti(true);
      }

      setIsSpinning(false);
    });
  };

  const closeModal = () => {
    // Animação de saída
    Animated.parallel([
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      if (result?.isPrize && result.quant > 0) {
        updateRow(PRIZES_TABLE, result.id, {
          quant: result.quant - 1,
        });
      }
      navigation.navigate("home");
    });
  };

  const rotate = rotation.interpolate({
    inputRange: [-360, 0],
    outputRange: ["-360deg", "0deg"],
  });

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    r: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const createArc = (index: number) => {
    const startAngle = anglePerSlice * index;
    const endAngle = startAngle + anglePerSlice;

    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

    return [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");
  };

  const getTextPosition = (index: number) => {
    const angle = anglePerSlice * index + anglePerSlice / 2;
    const pos = polarToCartesian(center, center, radius * 0.6, angle);
    return { ...pos, angle };
  };

  return (
    <View style={styles.Container}>
      <LogoAbsolut />
      <Text style={styles.Title}>Girou Ganhou</Text>

      <View style={styles.wheelContainer}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Svg width={wheelSize} height={wheelSize}>
            <G>
              {prizes
                .sort((a, b) => a.order - b.order)
                .map((item, index) => {
                  const { x, y, angle } = getTextPosition(index);
                  const textAngle = angle + 0;

                  return (
                    <G key={item.id || index}>
                      <Path
                        d={createArc(index)}
                        fill={item.color || "#333"}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                      <SvgText
                        x={x}
                        y={y}
                        fill="#fff"
                        fontSize={RFValue(22)}
                        fontWeight="bold"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        transform={`rotate(${textAngle} ${x} ${y})`}
                      >
                        {item.name}
                      </SvgText>
                    </G>
                  );
                })}

              <Circle
                cx={center}
                cy={center}
                r={wheelSize * 0.12}
                fill={isSpinning ? "#ccc" : "#fff"}
                stroke="#ccc"
                strokeWidth={2}
              />
            </G>
          </Svg>
        </Animated.View>

        <View style={styles.pointer} />

        <Pressable
          onPress={spin}
          disabled={isSpinning}
          style={[
            styles.spinButton,
            {
              width: wheelSize * 0.24,
              height: wheelSize * 0.24,
              borderRadius: (wheelSize * 0.24) / 2,
            },
          ]}
        >
          <Text style={styles.spinButtonText}>{isSpinning ? "" : "Girar"}</Text>
        </Pressable>
      </View>

      <View style={styles.subContainer}>
        <Button
          size={24}
          title={isSpinning ? "Girando..." : "Girar Roleta"}
          onPress={spin}
          disabled={isSpinning}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: modalOpacity,
            },
          ]}
        >
          {showConfetti && (
            <ConfettiCannon
              count={80}
              origin={{ x: width / 2, y: -10 }}
              fadeOut
              fallSpeed={3000}
              explosionSpeed={0}
              onAnimationEnd={() => setShowConfetti(false)}
            />
          )}

          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ scale: modalScale }],
              },
            ]}
          >
            <Animated.Text
              style={[
                styles.modalTitle,
                {
                  transform: [{ scale: titleScale }],
                },
              ]}
            >
              {result?.title}
            </Animated.Text>

            <Animated.Text
              style={[
                styles.modalMessage,
                {
                  opacity: messageOpacity,
                },
              ]}
            >
              {result?.message}
            </Animated.Text>

            <Pressable
              onPress={closeModal}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
            >
              <Animated.View
                style={[
                  styles.modalButton,
                  {
                    transform: [
                      { scale: buttonScale },
                      { scale: buttonPressScale },
                    ],
                    opacity: buttonScale,
                  },
                ]}
              >
                <Text style={styles.modalButtonText}>Concluir</Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}
