import { StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { cores } from '@/theme';

// Paisagem ao amanhecer (céu, sol, montanhas e estrada), usada no login e no cartão de versículo
export function Paisagem({ style, estrada = false }: { style?: ViewStyle; estrada?: boolean }) {
  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={cores.marinhoProfundo} />
            <Stop offset="0.4" stopColor={cores.marinhoClaro} />
            <Stop offset="0.58" stopColor="#8A8478" />
            <Stop offset="0.72" stopColor={cores.dourado} />
          </LinearGradient>
          <RadialGradient id="sol" cx="200" cy="208" r="120" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#FFF4DC" stopOpacity="1" />
            <Stop offset="0.2" stopColor="#F3C98B" stopOpacity="0.95" />
            <Stop offset="1" stopColor={cores.dourado} stopOpacity="0" />
          </RadialGradient>
          <LinearGradient id="chao" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#14263F" />
            <Stop offset="1" stopColor={cores.marinhoProfundo} />
          </LinearGradient>
        </Defs>
        <Rect width="400" height="300" fill="url(#ceu)" />
        <Circle cx="200" cy="208" r="120" fill="url(#sol)" />
        <Path d="M0 200 L60 150 L110 185 L170 135 L230 190 L290 145 L350 180 L400 155 L400 230 L0 230 Z" fill="#3D5677" opacity="0.75" />
        <Path d="M0 215 L50 185 L120 210 L180 175 L250 215 L320 180 L400 205 L400 240 L0 240 Z" fill="#253F61" />
        <Path d="M0 300 L0 225 Q100 205 200 222 Q300 238 400 218 L400 300 Z" fill="url(#chao)" />
        {estrada && (
          <>
            <Path d="M188 222 L212 222 L290 300 L110 300 Z" fill="#2A3442" />
            <Path d="M199 228 L201 228 L203 244 L197 244 Z M196 254 L204 254 L207 276 L193 276 Z" fill={cores.dourado} opacity="0.7" />
          </>
        )}
      </Svg>
    </View>
  );
}
