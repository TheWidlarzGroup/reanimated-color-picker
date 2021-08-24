import {StackNavigationProp} from '@react-navigation/stack';

export type AppNavigationType<RouteName extends keyof AppRoutes> =
  StackNavigationProp<AppRoutes, RouteName>;

export type AppRoutes = {
  Animation: undefined;
  BubbleContainer: undefined;
};
