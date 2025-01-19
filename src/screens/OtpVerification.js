import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Label from '../components/Label';
import NumberInput from '../components/NumberInput';
import colors from '../global/colors';
import {getFontSize, height, width} from '../global/helper';
import strings from '../global/strings';
import useNavigation from '../global/useNavigation';
import {isNumber} from '../global/utilities';
import {useAppSelector} from '../store';

const OtpVerification = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [otpError, setOtpError] = useState('');
  const {userData} = useAppSelector(state => state.user);

  function handleNumberCheck(value, setValue) {
    if (isNumber(value)) {
      setValue(value);
    }
  }
  async function confirmCode() {
    try {
      const res = await confirm.confirm(code);
      console.log('data', res);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.code}>{strings.sendCode}</Text>
        </View>
        <View style={styles.numberWrapper}>
          <NumberInput
            value={pin}
            style={error && styles.error}
            onChangeText={(text) => {
              handleNumberCheck(text, setPin);
            }}
          />
        <Label error={otpError} />
        <TouchableOpacity onPress={() => confirmCode()}>
          <Text>{strings.PhoneNumberSignIn}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width(24),
    marginVertical: height(24),
  },
  error: {
    borderColor: colors.error,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width(10),
  },
  buttonWrapper: {
    marginTop: height(10),
  },
  timer: {
    fontSize: getFontSize(14),
    lineHeight: getFontSize(16.84),
    textAlign: 'center',
    color: colors.darkBlack,
  },
  code: {
    fontSize: getFontSize(13),
    lineHeight: getFontSize(15.64),
    textAlign: 'center',
    color: colors.darkBlack,
    textTransform: 'uppercase',
  },
  numberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height(4),
  },
  flex: {
    flex: 1,
  },
});

export default OtpVerification;
