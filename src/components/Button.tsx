import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../global/colors';
import {getFontSize, height} from '../global/helper';

const Button = ({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress?: any;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.wrapper, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: height(62),
    width: '100%',
    borderRadius: getFontSize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: getFontSize(14),
    lineHeight: getFontSize(16.84),
    textAlign: 'center',
    color: colors.white,
    textTransform: 'uppercase',
  },
});
export default Button;
