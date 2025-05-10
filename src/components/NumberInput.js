import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps, View,Text} from 'react-native';
import colors from '../global/colors';
import {getFontSize, height, width} from '../global/helper';

const NumberInput =({
      value = '',
      onChangeText = () => {},
      placeholder = 'Phone Number',
      keyboardType,
      style = {},
      onBlur,
      label='Phone Number',
      onFocus,
      onSubmitEditing,
      ...props
    }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          keyboardType={'phone-pad'}
          style={[styles.input, style]}
          {...props}
        />
      </View>
    );
    };

const styles = StyleSheet.create({
  input: {
    height: height(62),
    borderColor: colors.darkBlack,
    borderWidth: 1,
    borderRadius: getFontSize(8),
    fontSize: getFontSize(14),
    color: colors.darkBlack,
    paddingHorizontal: getFontSize(19),
    backgroundColor: colors.white,
  },
  container: {
    marginTop: 0,
  },
  label: {
    fontSize: getFontSize(12),
    color: colors.darkBlack,
    marginBottom: height(8),
  },
});

export default NumberInput;
