import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, SIZES } from '@constants/index';
import { useResponsive } from '@hooks/useResponsive';
import { CustomText } from '@components/common/CustomText';
import { CustomTextInput } from '@components/common/CustomTextInput';
import { CustomCheck } from '@components/common/CustomCheck';

// Password Input 컴포넌트
const PwInput: React.FC<any> = (props) => {
    const { scale } = useResponsive();
    const styles = getStyles(scale);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.pwContainer}>
            <CustomTextInput
                {...props}
                secureTextEntry={!showPassword}
                placeholder="비밀번호"
                style={[styles.box2Text, styles.pwText]}
            />

            <Pressable
                hitSlop={20}
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
            >
                <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={SIZES.iconS}
                    color={COLORS.greyD9}
                />
            </Pressable>
        </View>
    );
};

export const Login: React.FC = () => {
    const { scale } = useResponsive();
    const styles = getStyles(scale);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor={COLORS.background} />
            <View style={styles.content}>
                <View style={styles.box01}>
                    <Image style={styles.box1Img} source={require('../../../assets/images/logo_G.png')} />
                    <CustomText style={styles.titleText} ftW='Bold'>패밀리 케어</CustomText>
                </View>
                <View style={styles.box2}>
                    <View style={{ width: '100%' }}>
                        <CustomTextInput style={[styles.box2Text, styles.emailText]} placeholder="이메일 또는 휴대폰 번호" />
                        <PwInput />
                    </View>
                </View>
                <View style={styles.box3}>
                    <CustomCheck />
                    <CustomText style={[styles.outerText, styles.check]}>로그인 상태 유지</CustomText>
                </View>

            </View>
        </SafeAreaView>
    );
};

const getStyles = (scale: (size: number) => number) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.pd24,
    },
    titleText: {
        fontSize: SIZES.ft30,
        letterSpacing: 0.5,
        color: COLORS.primary,
        lineHeight: 50,
    },
    box01: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.mg40,
    },
    box1Img: {
        width: 52,
        height: 52,
        marginRight: SIZES.mg10,
        resizeMode: 'contain',
    },
    box2: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: SIZES.mg30,
        width: '100%',
    },
    box2Text: {
        width: '100%',
        height: 60,
        fontSize: SIZES.ft16,
        paddingVertical: SIZES.pd20,
        paddingHorizontal: SIZES.pd20,
        borderWidth: 1,
        borderColor: COLORS.greyD9,
        borderRadius: 8,
        backgroundColor: COLORS.background,
        letterSpacing: 0.25,
    },
    pwContainer: {
        width: '100%',
        position: 'relative',
    },
    emailText: {
        marginBottom: SIZES.mg20,
    },
    pwText: {
        paddingRight: SIZES.pd50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    box3: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 4,
        marginBottom: SIZES.mg26,
    },
    outerText: {
        fontSize: SIZES.ft14,
        color: COLORS.text33,
        letterSpacing: 0.25,
        lineHeight: SIZES.ft14 * 1.45,
    },
    check: { 
        marginLeft: SIZES.mg10
    },
});