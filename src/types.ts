import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

export type ResponsiveValue<Value, Theme extends BaseTheme> =
  | Value
  | {[Key in keyof Theme['breakpoints']]?: Value};

export type SafeVariants<T> = Omit<T, keyof KnownBaseTheme>;

export interface KnownBaseTheme {
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: number;
  };
  breakpoints: {
    [key: string]: Breakpoint;
  };
  zIndices?: {
    [key: string]: number;
  };
  borderRadii?: {
    [key: string]: number;
  };
}

export interface BaseTheme extends KnownBaseTheme {
  [key: string]: any;
}

export type Breakpoint = number | Dimensions;

export interface Dimensions {
  width: number;
  height: number;
}

export interface RestyleFunctionContainer<
  TProps extends Record<string, unknown>,
  Theme extends BaseTheme = BaseTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = keyof Theme | undefined
> {
  property: P;
  themeKey: K | undefined;
  variant: boolean;
  func: RestyleFunction<TProps, Theme>;
}

export type RestyleFunction<
  TProps extends Record<string, any> = Record<string, any>,
  Theme extends BaseTheme = BaseTheme,
  S extends keyof any = string
> = (
  props: TProps,
  context: {theme: Theme; dimensions: Dimensions},
) => {
  [key in S]?: any;
};

export type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type RNStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle;

export type PropValue = string | number | undefined | null;

export type RNStyleSheetType<T> = StyleSheet.NamedStyles<T>;

export type CreateStyleFn<T extends RNStyleSheetType<T>, U extends BaseTheme> =
  | ((theme: U) => T)
  | T;
