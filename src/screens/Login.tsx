import React, {useState, useEffect} from 'react';
import {Keyboard, ScrollView, StyleSheet, View,TouchableOpacity,Text} from 'react-native';
import useNavigation from '../global/useNavigation';
import {useAppDispatch} from '../store';
import NameTextInput from '../components/NameTextInput';
import Label from '../components/Label';
import {validateName} from '../global/utilities';
import {height, width} from '../global/helper';
import colors from '../global/colors';
import auth from '@react-native-firebase/auth';
import strings from '../global/strings';
import screenNames from '../global/screenNames';

const Login = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState<string | null>('');
  const [lastNameError, setLastNameError] = useState<string | null>('');

  const dispatch = useAppDispatch();

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

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      navigation.navigate(screenNames.otpVerification)
      console.log('response', confirmation);
    } catch (error) {
      console.log('error', error);
    }
  }


  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
        <TouchableOpacity
          onPress={() => signInWithPhoneNumber('+91 9542092700')} style={styles.button}>
          <Text>{strings.PhoneNumberSignIn}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width(24),
    marginVertical: height(24),
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
  button:{

  }
});

export default Login;
