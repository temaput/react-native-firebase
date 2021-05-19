/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { ReactNativeFirebase } from '@react-native-firebase/app';

/**
 * Firebase AppCheck package for React Native.
 *
 * #### Example 1
 *
 * Access the firebase export from the `appCheck` package:
 *
 * ```js
 * import { firebase } from '@react-native-firebase/app-check';
 *
 * // firebase.appCheck().X
 * ```
 *
 * #### Example 2
 *
 * Using the default export from the `appCheck` package:
 *
 * ```js
 * import appCheck from '@react-native-firebase/app-check';
 *
 * // appCheck().X
 * ```
 *
 * #### Example 3
 *
 * Using the default export from the `app` package:
 *
 * ```js
 * import firebase from '@react-native-firebase/app';
 * import '@react-native-firebase/app-check';
 *
 * // firebase.appCheck().X
 * ```
 *
 * @firebase appCheck
 */
export namespace AppCheck {
  import FirebaseModule = ReactNativeFirebase.FirebaseModule;

  /**
   * An App Check provider. This can be either the built-in reCAPTCHA provider
   * or a custom provider. For more on custom providers, see
   * https://firebase.google.com/docs/app-check/web-custom-provider
   */
  export interface AppCheckProvider {
    /**
     * Returns an AppCheck token.
     */
    getToken(): Promise<AppCheckToken>;
  }

  /**
   * The token returned from an `AppCheckProvider`.
   */
  export interface AppCheckToken {
    /**
     * The token string in JWT format.
     */
    readonly token: string;
    /**
     * The local timestamp after which the token will expire.
     */
    readonly expireTimeMillis: number;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Statics {
    // firebase.appCheck.* static props go here
  }

  /**
   * The Firebase AppCheck service is available for the default app or a given app.
   *
   * #### Example 1
   *
   * Get the appCheck instance for the **default app**:
   *
   * ```js
   * const appCheckForDefaultApp = firebase.appCheck();
   * ```
   *
   * #### Example 2
   *
   * Get the appCheck instance for a **secondary app**:
   *˚
   * ```js
   * const otherApp = firebase.app('otherApp');
   * const appCheckForOtherApp = firebase.appCheck(otherApp);
   * ```
   *
   */
  export class Module extends FirebaseModule {
    /**
     * Activate AppCheck
     *
     *
     * On web, provide the reCAPTCHA v3 Site Key which can be found in the
     * Firebase Console. For more information, see
     * the Firebase Documentation at https://firebase.google.com/docs/app-check/web
     *
     * In rare circumstances the native code may throw an exception, so this returns
     * a Promise in order to allow this to be caught and sent back across the react-native
     * bridge, this deviates from the synchronous firebase-js-sdk.
     *
     * @param siteKeyOrProvider - Android ignores this and always uses SafetyNet
     * @param isTokenAutoRefreshEnabled - If true, enables SDK to automatically
     * refresh AppCheck token as needed. If undefined, the value will default
     * to the value of `app.automaticDataCollectionEnabled`. That property
     * defaults to false and can be set in the app config.
     */
    activate(
      siteKeyOrProvider: string | AppCheckProvider,
      isTokenAutoRefreshEnabled?: boolean,
    ): Promise<void>;

    /**
     * TODO FirebaseAppCheckTokenAutoRefreshEnabled plist entry toggle through from firebase.json
     *
     * @param isTokenAutoRefreshEnabled - If true, the SDK automatically
     * refreshes App Check tokens as needed. This overrides any value set
     * during `activate()`.
     */
    setTokenAutoRefreshEnabled(isTokenAutoRefreshEnabled: boolean): void;
  }
}

declare const defaultExport: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<
  AppCheck.Module,
  AppCheck.Statics
>;

export const firebase: ReactNativeFirebase.Module & {
  auth: typeof defaultExport;
  app(name?: string): ReactNativeFirebase.FirebaseApp & { appCheck(): AppCheck.Module };
};

export default defaultExport;

/**
 * Attach namespace to `firebase.` and `FirebaseApp.`.
 */
declare module '@react-native-firebase/app' {
  namespace ReactNativeFirebase {
    import FirebaseModuleWithStaticsAndApp = ReactNativeFirebase.FirebaseModuleWithStaticsAndApp;
    interface Module {
      appCheck: FirebaseModuleWithStaticsAndApp<AppCheck.Module, AppCheck.Statics>;
    }
    interface FirebaseApp {
      appCheck(): AppCheck.Module;
    }
  }
}
