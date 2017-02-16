declare module 'react-navigation' {
  declare var exports: any;
}

declare module 'react-navigation/lib/react-navigation.web' {
  declare var exports: any;

  declare interface NavigationRoute {
    /**
     * React's key used by some navigators. No need to specify these manually,
     * they will be defined by the router.
     */
    key: string,
    /**
     * For example 'Home'.
     * This is used as a key in a route config when creating a navigator.
     */
    routeName: string,
    /**
     * Path is an advanced feature used for deep linking and on the web.
     */
    path?: string,
    /**
     * Params passed to this route when navigating to it,
     * e.g. `{ car_id: 123 }` in a route that displays a car.
     */
    params?: NavigationParams,
  }

  declare type NavigationState = {
    /**
     * Index refers to the active child route in the routes array.
     */
    index: number,
    routes: Array<NavigationRoute>,
  };

  declare type NavigationDispatch<A> = (action: A) => boolean;

  declare type NavigationScreenProp<S, A> = {
    state: S,
    dispatch: NavigationDispatch<A>,
    goBack: (routeKey?: string) => boolean,
    navigate: (routeName: string, params?: NavigationParams, action?: NavigationAction) => boolean,
    setParams: (newParams: NavigationParams) => boolean,
  };

  declare type NavigationParams = {
    [key: string]: string,
  }

  declare type NavigationNavigateAction = {
    type: 'Navigation/NAVIGATE',
    routeName: string,
    params?: NavigationParams,

    // The action to run inside the sub-router
    action?: NavigationNavigateAction,
  };

  declare type NavigationBackAction = {
    type: 'Navigation/BACK',
    key?: ?string,
  };

  declare type NavigationSetParamsAction = {
    type: 'Navigation/SET_PARAMS',

    // The key of the route where the params should be set
    key: string,

    // The new params to merge into the existing route params
    params?: NavigationParams,
  };

  declare type NavigationInitAction = {
    type: 'Navigation/INIT',
  };

  declare type NavigationResetAction = {
    type: 'Navigation/RESET',
    index: number,
    actions: Array<NavigationNavigateAction>,
  };

  declare type NavigationUriAction = {
    type: 'Navigation/URI',
    uri: string,
  };

  declare type NavigationStackAction =
    | NavigationInitAction
    | NavigationNavigateAction
    | NavigationBackAction
    | NavigationSetParamsAction
    | NavigationResetAction;

  declare type NavigationTabAction =
    | NavigationInitAction
    | NavigationNavigateAction
    | NavigationBackAction;

  declare type NavigationAction =
    | NavigationInitAction
    | NavigationStackAction
    | NavigationTabAction;

  declare type NavigationNavigatorProps = {
    navigation: NavigationProp<NavigationState, NavigationAction>,
    router: NavigationRouter
  }

  declare type NavigationRouter = {
    /**
     * The reducer that outputs the new navigation state for a given action, with
     * an optional previous state. When the action is considered handled but the
     * state is unchanged, the output state is null.
     */
    getStateForAction: (
      action: NavigationAction,
      lastState: ?NavigationState,
    ) => ?NavigationState,

    /**
     * Maps a URI-like string to an action. This can be mapped to a state
     * using `getStateForAction`.
     */
    getActionForPathAndParams: (path: string, params?: NavigationParams) => ?NavigationAction,

    getPathAndParamsForState: (state: NavigationState) => {path: string, params?: NavigationParams},

    getComponentForRouteName: (routeName: string) => NavigationComponent,

    getComponentForState: (state: NavigationState) => NavigationComponent,

    /**
     * Gets the screen config for a given navigation screen prop.
     *
     * For example, we could get the config for a 'Foo' screen when the
     * `navigation.state` is:
     *
     *  {routeName: 'Foo', key: '123'}
     */
    getScreenConfig: (
      navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
      optionName: string,
    ) => ?any, // todo, fix this any type to become a key of NavigationScreenConfig
  }
}
