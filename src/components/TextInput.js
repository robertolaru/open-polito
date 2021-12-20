import React from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';
import colors from '../colors';

export default function TextInput({
  placeholder,
  textContentType = 'none',
  icon = null,
  secureTextEntry = false,
  onChangeText = () => {},
  backgroundColor = colors.white,
  borderColor = colors.gradient1,
  iconColor = colors.gradient1,
  borderWidth = 2,
  ...props
}) {
  return (
    <View
      style={{
        ..._styles.textInput,
        backgroundColor: backgroundColor,
        ...styles.elevatedSmooth,
      }}>
      {typeof icon == 'string' ? (
        <Icon name={icon} size={24} color={iconColor} />
      ) : null}
      <RNTextInput
        placeholder={placeholder}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        style={_styles.textInputText}
        placeholderTextColor={colors.gray}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}

const _styles = StyleSheet.create({
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  textInputText: {
    flex: 1,
    ...styles.blackText,
    ...styles.textSmall,
    ...styles.textRegular,
  },
});
