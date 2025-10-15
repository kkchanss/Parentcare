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

<<<<<<< HEAD
import { useLogin } from '@hooks/userLogin';
=======
import { useNavigation } from '@react-navigation/native';
>>>>>>> 63acf3bfd4566e88b922bffe32b30aa789f58fc0


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

    const [checked, setChecked] = useState(false);
    const toggle = () => setChecked(prev => !prev);

<<<<<<< HEAD

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { login, loading, error } = useLogin();

=======
    const navigation = useNavigation();


>>>>>>> 63acf3bfd4566e88b922bffe32b30aa789f58fc0
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
                        <CustomTextInput
                            style={[styles.box2Text, styles.emailText]} placeholder="이메일 또는 휴대폰 번호"
                            value={email}
                            onChangeText={setEmail} />
                        <PwInput 
                            value={password}
                            onChangeText={setPassword} />
                    </View>
                </View>
                <View style={styles.box3}>
                    <CustomCheck checked={checked} onChange={setChecked} />
                    <Pressable onPress={toggle} hitSlop={8}>
                        <CustomText style={[styles.outerText, styles.check]}>로그인 상태 유지</CustomText>
                    </Pressable>
                </View>
                <View style={{ width: '100%' }}>
                    <Pressable
                        style={styles.loginBtn}
<<<<<<< HEAD
                        onPress={() => {
                            login(email, password).then(data => {
                                console.log('Login successful:', data);
                            }).catch(err => {
                                console.error('Login error:', err);
                            }); 
                        }}>
=======
                        onPress={() => navigation.navigate('Main' as never)}>
>>>>>>> 63acf3bfd4566e88b922bffe32b30aa789f58fc0
                        <CustomText style={{ color: COLORS.background, fontSize: SIZES.ft16 }} ftW='SemiBold'>로그인</CustomText>
                    </Pressable>
                </View>
                <View style={styles.linkContainer}>
                    <Pressable>
                        <CustomText style={styles.linkText}>이메일 찾기</CustomText>
                    </Pressable>
                    <CustomText style={styles.divider}>|</CustomText>
                    <Pressable>
                        <CustomText style={styles.linkText}>비밀번호 찾기</CustomText>
                    </Pressable>
                    <CustomText style={styles.divider}>|</CustomText>
                    <Pressable>
                        <CustomText style={styles.linkText}>회원가입</CustomText>
                    </Pressable>
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
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkText: {
        fontSize: SIZES.ft14,
        color: COLORS.text33,
        letterSpacing: 0.25,
        lineHeight: SIZES.ft14 * 1.45,
    },
    divider: {
        paddingHorizontal: SIZES.pd20,
        fontSize: SIZES.ft14,
        color: COLORS.greyD9,
        letterSpacing: 0.25,
        lineHeight: SIZES.ft14 * 1.45,
    },
    loginBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.pd20,
        marginBottom: SIZES.mg24,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});