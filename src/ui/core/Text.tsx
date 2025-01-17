import React, {FC, useMemo} from 'react';
import {
  Linking,
  StyleSheet,
  Text as RNText,
  TextProps,
  TextStyle,
} from 'react-native';
import colors, {Color} from '../../colors';

export type TextParams = {
  s: number;
  c: Color;
  w: 'r' | 'm' | 'b'; // regular, medium, bold
  style?: TextStyle;
  href?: string;
} & TextProps;

const Text: FC<TextParams> = ({
  children,
  s,
  c,
  w,
  style = {},
  href = '',
  ...props
}) => {
  const _styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        color: c,
        fontSize: s,
        fontFamily:
          w == 'r' ? 'Inter-Regular' : w == 'm' ? 'Inter-Medium' : 'Inter-Bold',
      },
      textHref: href
        ? {
            color: colors.accent300,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: colors.accent300,
          }
        : {},
    });
  }, [c, s, w]);

  return (
    <RNText
      style={{..._styles.text, ..._styles.textHref, ...(style as Object)}}
      onPress={
        href
          ? () => {
              Linking.openURL(href);
            }
          : undefined
      }
      {...props}>
      {children}
    </RNText>
  );
};

export default Text;
