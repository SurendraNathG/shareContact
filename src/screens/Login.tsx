import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Linking,
  Alert
} from 'react-native';
import useNavigation from '../global/useNavigation';
import {useAppDispatch,useAppSelector} from '../store';
import NameTextInput from '../components/NameTextInput';
import NumberInput from '../components/NumberInput';
import Label from '../components/Label';
import {validateName,isNumber,isUsernameValid} from '../global/utilities';
import {height, width, getFontSize} from '../global/helper';
import colors from '../global/colors';
import auth from '@react-native-firebase/auth';
import strings from '../global/strings';
import screenNames from '../global/screenNames';
import {setUserData} from '../store/slice/user.slice';
import Share from 'react-native-share';

const Login = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState<string | null>('');
  const [lastNameError, setLastNameError] = useState<string | null>('');
  const [phone, setPhone] = useState<string | null>('');
  const [phoneError, setPhoneError] = useState<string | null>('');
  const [code,setCode]=useState<boolean>(false)
  const [pin, setPin] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string | null>('');
  const {userData} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [isGenerateEpf,setIsGenerateEpf]=useState<boolean>(false)
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
    if(isGenerateEpf)
    {
      setFirstName(userData?.fName)
      setLastName(userData?.lName)
      setPhone(userData?.phoneNo)
    }
  
  }, [isGenerateEpf])

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
      const confirm = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirm);
      dispatch(setUserData({fName:firstName,lName:lastName,phoneNo:phone}))
       setCode(true)
    } catch (error) {
      console.log('error', error);
    }
  }

  function handleNumberCheck(value: number, setValue: any) {
    if (isNumber(value)) {
      setValue(value);
    }
  }

  function handleSignButton(){
    if(isUsernameValid(firstName?.trim())&&isUsernameValid(lastName?.trim())&&phone?.length>7)
    {
      signInWithPhoneNumber('+91 9542092700')
    }
  }
  const enable=isUsernameValid(firstName?.trim())&&isUsernameValid(lastName?.trim())&&phone?.length>7
  async function confirmCode() {
    try {
      const res = await confirmation?.confirm(pin);
      setPin('');
      setCode(false);
      setIsGenerateEpf(true);
    } catch (error) {
       Alert.alert('InValid Code');
       setPin('')
      console.log('Invalid code.', error);
    }
  }
  const otpEnable=pin?.length===6
  
  function handleShare(){
    const {fName ,lName, phoneNo } = userData;

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
    .then(() =>  {setFirstName('');
    setLastName('');
    setPhone('');
    setIsGenerateEpf(false);
    }
  )
    .catch((err) => console.error('Error opening SMS app:', err));
}
  
  return (
    <>
    {!code?
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
        style={phoneError && styles.error}
        onChangeText={setPhone}
      />
      {isGenerateEpf?
      <TouchableOpacity
        onPress={() => handleShare()}
        style={styles.button}>
        <Text style={styles.text}>{strings.generateEpf}</Text>
      </TouchableOpacity>:
      <TouchableOpacity
        onPress={() => enable? handleSignButton():null}
        style={[styles.button,{opacity:enable?1:0.3}]}>
        <Text style={styles.text}>{strings.PhoneNumberSignIn}</Text>
      </TouchableOpacity>
}
    </View>:
     <View style={styles.container}>
       <Text style={styles.code}>{strings.sendCode}</Text>
       <View style={styles.numberWrapper}>
         <NumberInput
           value={pin}
           label=''
           placeholder='Enter 6 digit OTP'
           style={error && styles.error}
           maxLength={6}
           onChangeText={(text: any) => {
             handleNumberCheck(text, setPin);
           }}
         />
       <Label error={otpError} />
       <TouchableOpacity onPress={() => otpEnable?confirmCode():null} style={[styles.button,{opacity: otpEnable?1: 0.3 }]}>
         <Text style={styles.text}>{strings.sendCode}</Text>
       </TouchableOpacity>
     </View>
   </View>
}
   </>
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
    marginBottom: height(4),
  },
});

export default Login;
