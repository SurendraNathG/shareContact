import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import colors from '../global/colors';
import {getFontSize, height, width} from '../global/helper';

const NumberInput = forwardRef<TextInput, TextInputProps>(
  (
    {
      value = '',
      onChangeText = () => {},
      placeholder = '0',
      keyboardType,
      style = {},
      onBlur,
      onFocus,
      onSubmitEditing,
      ...props
    }: TextInputProps,
    ref,
  ) => {
    return (
      <View style={styles.container}>
        <TextInput
          value={value}
          ref={ref}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          maxLength={6}
          onSubmitEditing={onSubmitEditing}
          keyboardType={'decimal-pad'}
          style={[styles.input, style]}
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: height(20),
  },
  input: {
    height: height(62),
    width: width(62),
    borderColor: colors.darkBlack,
    borderWidth: 1,
    borderRadius: getFontSize(8),
    fontSize: getFontSize(16),
    color: colors.darkBlack,
    paddingHorizontal: width(24),
    textAlign: 'right',
    backgroundColor: colors.white,
  },
});

export default NumberInput;
