import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  Modal,
  useWindowDimensions,
  Image,
  ImageBackground
} from 'react-native';
import tw from 'twrnc';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import ConfettiCannon from 'react-native-confetti-cannon';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { store, PRIZES_TABLE, updateRow } from '../../config/store';

import { styles } from './style';
import { Button } from '../../components/buttom/Buttom';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RootStackParamList } from '../../types/navigation';
import { Prize } from '../../types/Prizes';
import { StackRoutesList } from '../../Routes/StackRoutes';
import { StackRoutesProps } from '../../Routes/StackRoutes';



// ... (importações permanecem as mesmas)

export function Roullete( {navigation}:StackRoutesProps<"roullete">) {
  const { width } = useWindowDimensions();

  const wheelSize = width * 0.9;
  const radius = wheelSize / 2;
  const center = radius;

  const rotation = useRef(new Animated.Value(0)).current;

  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [result, setResult] = useState<Prize | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const anglePerSlice = 360 / (prizes.length || 1);

  useEffect(() => {
    const load = () => {
      const data = Object.entries(store.getTable(PRIZES_TABLE))
        .map(([key, value]: [string, any]) => ({
          id: key,
          name: value.name,
          color: value.color,
          probability: value.probability ?? 1,
          quant: value.quant,
          isPrize: value.isPrize,
          prizeReal: value.prizeReal,
          order: value.order,
          title: value.title,
          message: value.message

        }))
        .filter((prize) => prize.quant > 0);

      setPrizes(data);
      console.log('Prêmios carregados:', data);
    };

    load();
    const listenerId = store.addTableListener(PRIZES_TABLE, load);
    return () => {
      store.delListener(listenerId);
    };
  }, []);

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

  const rotate = rotation.interpolate({
    inputRange: [-360, 0],
    outputRange: ['-360deg', '0deg'],
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
      'Z',
    ].join(' ');
  };

  const getTextPosition = (index: number) => {
    const angle = anglePerSlice * index + anglePerSlice / 2;
    const pos = polarToCartesian(center, center, radius * 0.6, angle);
    return { ...pos, angle };
  };

  return (
    <ImageBackground
      source={require("../../assets/Background_with-logo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.Container}>
        <Text style={styles.Title}>Girou Ganhou</Text>

        <View style={styles.wheelContainer}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Svg width={wheelSize} height={wheelSize}>
              <G>
                {prizes.sort((a, b) => a.order - b.order).map((item, index) => {
                  const { x, y, angle } = getTextPosition(index);
                  const textAngle = angle + 0;

                  return (
                    <G key={index}>
                      <Path
                        d={createArc(index)}
                        fill={item.color || '#333'}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                      <SvgText
                        x={x}
                        y={y}
                        fill="#fff"
                        fontSize={RFValue(16)}
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
                  fill={isSpinning ? '#ccc' : '#fff'}
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
            style={[styles.spinButton, {
              width: wheelSize * 0.24,
              height: wheelSize * 0.24,
              borderRadius: (wheelSize * 0.24) / 2,
            }]}
          >
            <Text style={styles.spinButtonText}>
              {isSpinning ? '' : 'Girar'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.subContainer}>
          <Button
            size={24}
            title={isSpinning ? 'Girando...' : 'Girar Roleta'}
            onPress={spin}
            disabled={isSpinning}
          />
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
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

            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                🎉 Parabéns!
              </Text>
              <Text style={styles.modalTitle}>
                {result?.title}
              </Text>
               <Text style={styles.modalMessage}>
                {result?.message}
              </Text>

              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  if (result?.isPrize && result.quant > 0) {
                    updateRow(PRIZES_TABLE, result.id, {
                      quant: result.quant - 1,
                    });
                  }
                  navigation.navigate('home');
                }}
              >
                <Text style={styles.modalButtonText}>
                  Concluir
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
