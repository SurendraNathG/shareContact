import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../global/colors';
import {getFontSize} from '../global/helper';

function Label({error}) {
  return <Text style={[styles.errorText]}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: getFontSize(12),
    color: colors.error,
    marginTop: getFontSize(2),
    marginBottom: getFontSize(6),
  },
});

export default Label;
