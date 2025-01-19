import React from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../global/colors';
import {getFontSize, height, width} from '../global/helper';
import strings from '../global/strings';
import useNavigation from '../global/useNavigation';
import {useAppDispatch, useAppSelector} from '../store';
import screenNames from '../global/screenNames';
const Details = () => {
  const navigation = useNavigation();
  const {userData} = useAppSelector(state => state.user);
  const renderItem = ({item, index}) => {
    const handlePress = innerItem => {
      const message = encodeURIComponent(`Name: ${innerItem?.fName} ${innerItem?.lName || ''}Phone: ${innerItem?.phoneNo || '-'},LinkedIn URL: ${innerItem?.linkedIn || '-'},Email ID: ${innerItem?.email || '-'},Facebook URL: ${innerItem?.faceBook || '-'},Other Phone Number: ${innerItem?.otherPhone || '-'},Fax Number: ${innerItem?.fax || '-'}
      `);
      const phoneNumber = innerItem?.phoneNo;
      const smsUrl = `sms:${phoneNumber}?body=${message}`;
      Linking.openURL(smsUrl)
        .then(() => {})
        .catch(err => console.error('Error opening SMS app:', err));
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
