import React from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import colors from '../global/colors';
import { getFontSize, height, width } from '../global/helper';
import strings from '../global/strings';
import useNavigation from '../global/useNavigation';
import { useAppDispatch, useAppSelector } from '../store';
import screenNames from '../global/screenNames';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import Share from 'react-native-share';
import { PermissionsAndroid } from 'react-native';

const Details = () => {
  const navigation = useNavigation();
  const { userData } = useAppSelector(state => state.user);
  const renderItem = ({ item, index }) => {
    const handlePress = innerItem => {
      // const message = encodeURIComponent(`Name: ${innerItem?.fName} ${innerItem?.lName || ''}Phone: ${innerItem?.phoneNo || '-'},LinkedIn URL: ${innerItem?.linkedIn || '-'},Email ID: ${innerItem?.email || '-'},Facebook URL: ${innerItem?.faceBook || '-'},Other Phone Number: ${innerItem?.otherPhone || '-'},Fax Number: ${innerItem?.fax || '-'}
      // `);
      // const phoneNumber = innerItem?.phoneNo;
      // const smsUrl = `sms:${phoneNumber}?body=${message}`;
      // Linking.openURL(smsUrl)
      //   .then(() => { })
      //   .catch(err => console.error('Error opening SMS app:', err));
      shareVCFFile(item)
    };
    const requestPermissions = async () => {
      try {
        if (Platform.Version >= 33) {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          ];
    
          const results = await PermissionsAndroid.requestMultiple(permissions);
          
          return Object.values(results).every(
            result => result === PermissionsAndroid.RESULTS.GRANTED
          );
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'This app needs access to your storage to share contact cards.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
    
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          }
        }
        Alert.alert(
          'Permission Required',
          'Storage permission is required to share contacts. Please enable it in your device settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return false;
      } catch (err) {
        console.error('Error requesting permissions:', err);
        return false;
      }
    };
    const createVCFCard = async (innerItem) => {
      const userName = `${innerItem?.fName || ''} ${innerItem?.lName || ''}`.trim();
      const phoneNumber = innerItem?.phoneNo || '-';
      const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
      const vcfData = `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${innerItem?.lName || ''};${innerItem?.fName || ''}\r\nFN:${userName}\r\nTEL;TYPE=CELL:${cleanPhoneNumber}\r\nEND:VCARD\r\n`;
      try {
        const sanitizedUserName = userName.replace(/[^a-zA-Z0-9_-]/g, '_');
        const filePath = `${RNFS.DocumentDirectoryPath}/${sanitizedUserName}.vcf`;
        await RNFS.writeFile(filePath, vcfData, 'utf8');
        console.log('VCF File Created:', filePath);
    
        const exists = await RNFS.exists(filePath);
        console.log('File Exists:', exists);
    
        return filePath;
      } catch (error) {
        console.error('Error creating VCF file:', error);
        Alert.alert('Error', 'Failed to create VCF file.');
        return null;
      }
    };

const shareVCFFile = async (innerItem) => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Error', 'Storage permission is required to share the VCF file.');
      return;
    }

    const filePath = await createVCFCard(innerItem);
    if (!filePath) return;

    const options = {
      title: 'Share Contact',
      message: `Here is my contact information: ${innerItem?.fName || 'Contact'}`,
      url: `file://${filePath}`,
      type: 'text/x-vcard',
    };

    await Share.open(options);
  } catch (error) {
    if (error.message === 'User did not share') {
      console.log('User cancelled sharing');
      return;
    }
    console.error('Error sharing VCF file:', error);
    Alert.alert('Error', 'Failed to share VCF file.');
  }
};
    return (
      <View style={styles.listWrapper}>
        <Text>{`UserName : ${item?.fName} ${item?.lName}`}</Text>
        <Text>{`Phone Number : ${item?.phoneNo}`}</Text>
        <TouchableOpacity
          onPress={() => handlePress(item)}
          style={styles.sendButton}>
          <Text style={styles.text}>{strings.generateEpf}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function handleNewContact() {
    navigation.navigate(screenNames.login);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNewContact} style={[styles.button]}>
        <Text style={styles.text}>{strings.addNewAccount}</Text>
      </TouchableOpacity>
      <FlatList data={userData} renderItem={renderItem} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: width(24),
    marginTop: height(24),
  },
  emailTop: {
    marginTop: height(2),
  },
  error: {
    borderColor: colors.error,
  },
  listWrapper: {
    borderWidth: getFontSize(1),
    borderColor: 'grey',
    borderRadius: 12,
    paddingHorizontal: width(10),
    paddingVertical: height(10),
    marginVertical: height(10),
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
    marginTop: height(20),
    marginBottom: height(10),
  },
  sendButton: {
    marginTop: height(10),
    backgroundColor: '#008000',
    borderRadius: getFontSize(10),
    height: height(42),
    paddingHorizontal: getFontSize(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: getFontSize(16),
    color: 'white',
  },
  code: {
    fontSize: getFontSize(16),
    textAlign: 'center',
    color: colors.darkBlack,
    textTransform: 'uppercase',
  },
});
export default Details;
