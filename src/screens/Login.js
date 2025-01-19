import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Label from '../components/Label';
import NameTextInput from '../components/NameTextInput';
import NumberInput from '../components/NumberInput';
import colors from '../global/colors';
import { getFontSize, height, width } from '../global/helper';
import strings from '../global/strings';
import useNavigation from '../global/useNavigation';
import { isNumber, isUsernameValid, validateName } from '../global/utilities';
import { useAppDispatch, useAppSelector } from '../store';
import { setUserData } from '../store/slice/user.slice';

const Login = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState(false);
  const [linkedIn, setLinkedIn] = useState('');
  const [faceBook, setFacebook] = useState('');
  const [email, setEmail] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [fax, setFax] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [otpError, setOtpError] = useState('');
  const {userData} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [isGenerateEpf, setIsGenerateEpf] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  function handleFirstNameBlur() {
    setFirstNameError(validateName(firstName));
  }
  function handleLastNameBlur() {
    setLastNameError(validateName(lastName));
  }
  function handleFirstNameFocus() {
    setFirstNameError('');
  }
  function handleLastNameFocus() {
    setLastNameError('');
  }
  function handleSign() {
    Keyboard.dismiss();
  }
  function handleBack() {
    navigation.goBack();
  }

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    if (isGenerateEpf) {
      setFirstName(userData?.fName);
      setLastName(userData?.lName);
      setPhone(userData?.phoneNo);
    }
  }, [isGenerateEpf]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirm = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirm);
      dispatch(
        setUserData({fName: firstName, lName: lastName, phoneNo: phone,linkedIn:linkedIn,faceBook:faceBook,email:email,otherPhone:altPhone,fax:fax}),
      );
      setCode(true);
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleNumberCheck(value, setValue) {
    if (isNumber(value)) {
      setValue(value);
    }
  }

  function handleSignButton() {
    if (
      isUsernameValid(firstName?.trim()) &&
      isUsernameValid(lastName?.trim()) &&
      phone?.length > 7
    ) {
      signInWithPhoneNumber('+91 9542092700');
    }
  }
  const enable =
    isUsernameValid(firstName?.trim()) &&
    isUsernameValid(lastName?.trim()) &&
    phone?.length > 7;
  async function confirmCode() {
    try {
      const res = await confirmation?.confirm(pin);
      setPin('');
      setCode(false);
      navigation.navigate('Details')
    } catch (error) {
      Alert.alert('InValid Code');
      setPin('');
      console.log('Invalid code.', error);
    }
  }
  const otpEnable = pin?.length === 6;

  function handleShare() {
    const {fName, lName, phoneNo} = userData;

    // const message = `
    //   Name: ${fName} ${lName || ''}
    //   Phone: ${phoneNo}
    // `;
    // Share?.open({
    //   message,
    // })
    //   .then((res) => {
    //     console.log('Shared successfully:', res);
    //   })
    //   .catch((err) => {
    //     if (err) console.error('Error sharing:', err);
    //   });

    const message = encodeURIComponent(`
    Name: ${fName} ${lName || ''}
    Phone: ${phoneNo}
  `);
    const phoneNumber = phoneNo;
    const smsUrl = `sms:${phoneNumber}?body=${message}`;
    Linking.openURL(smsUrl)
      .then(() => {
        setFirstName('');
        setLastName('');
        setPhone('');
        setIsGenerateEpf(false);
      })
      .catch(err => console.error('Error opening SMS app:', err));
  }

  return (
    <>
      {!code ? (
        <ScrollView>
          <View style={styles.container}>
            <NameTextInput
              label={'First Name'}
              value={firstName}
              placeholder={'Enter First Name'}
              onChangeText={setFirstName}
              onFocus={handleFirstNameFocus}
              onBlur={handleFirstNameBlur}
              style={firstNameError && styles.error}
            />
            <Label error={firstNameError} />
            <NameTextInput
              label={'Last Name'}
              value={lastName}
              placeholder={'Enter Last Name'}
              onChangeText={setLastName}
              onFocus={handleLastNameFocus}
              onBlur={handleLastNameBlur}
              style={lastNameError && styles.error}
            />
            <Label error={lastNameError} />
            <NumberInput
              value={phone}
              style={[phoneError && styles.error,styles.numberWrapper]}
              onChangeText={setPhone}
              maxLength={14}
            />
            <NameTextInput
              label={'Linked URL'}
              value={linkedIn}
              placeholder={'Enter Linked URL'}
              onChangeText={setLinkedIn}
              onFocus={handleLastNameFocus}
              style={styles.emptyWrapper}
            />
            <NameTextInput
              label={'Facebook URL'}
              value={faceBook}
              placeholder={'Enter Facebook URL'}
              onChangeText={setFacebook}
              onFocus={handleLastNameFocus}
              style={styles.emptyWrapper}
            />
            <NameTextInput
              label={'Email ID'}
              value={email}
              placeholder={'Enter Email ID'}
              onChangeText={setEmail}
              onFocus={handleLastNameFocus}
              style={styles.emptyWrapper}
            />
            <NameTextInput
              label={'Alternative Phone Number'}
              value={altPhone}
              placeholder={'Enter Alternative Phone Number'}
              onChangeText={setAltPhone}
              maxLength={14}
              onFocus={handleLastNameFocus}
              style={styles.emptyWrapper}
            />
            <NameTextInput
              label={'Fax Number'}
              value={fax}
              placeholder={'Enter Fax Number'}
              onChangeText={setFax}
              onFocus={handleLastNameFocus}
              style={styles.emptyWrapper}
              keyboardType='phone-pad'
            />
            {isGenerateEpf ? (
              <TouchableOpacity
                onPress={() => handleShare()}
                style={styles.button}>
                <Text style={styles.text}>{strings.generateEpf}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => (enable ? handleSignButton() : null)}
                style={[styles.button, {opacity: enable ? 1 : 0.3}]}>
                <Text style={styles.text}>{strings.PhoneNumberSignIn}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.code}>{strings.sendCode}</Text>
          <View style={styles.numberWrapper}>
            <NumberInput
              value={pin}
              label=""
              placeholder="Enter 6 digit OTP"
              style={error && styles.error}
              maxLength={6}
              onChangeText={(text) => {
                handleNumberCheck(text, setPin);
              }}
            />
            <Label error={otpError} />
            <TouchableOpacity
              onPress={() => (otpEnable ? confirmCode() : null)}
              style={[styles.button, {opacity: otpEnable ? 1 : 0.3}]}>
              <Text style={styles.text}>{strings.sendCode}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width(24),
    marginTop: height(24),
    marginBottom:'50%'

  },
  emailTop: {
    marginTop: height(2),
  },
  error: {
    borderColor: colors.error,
  },
  flex: {
    flex: 1,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: getFontSize(10),
    height: height(52),
    paddingHorizontal: getFontSize(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(30),
  },
  text: {
    fontSize: getFontSize(16),
    color: 'white',
  },
  code: {
    fontSize: getFontSize(16),
    textAlign: 'center',
    color: colors.black,
    textTransform: 'uppercase',
  },
  numberWrapper: {
    marginBottom: height(16),
  },
  emptyWrapper:{
    marginBottom:height(20)
  }
});

export default Login;
