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

import { isIOS } from '@react-native-firebase/app/lib/common';
import {
  createModuleNamespace,
  FirebaseModule,
  getFirebaseRoot,
} from '@react-native-firebase/app/lib/internal';

import version from './version';

const statics = {};

const namespace = 'appCheck';

const nativeModuleName = 'RNFBAppCheckModule';

class FirebaseAppCheckModule extends FirebaseModule {
  /**
   * Activate AppCheck
   * @param siteKeyOrProvider - reCAPTCHA sitekey or custom token provider
   * @param isTokenAutoRefreshEnabled - If true, enables SDK to automatically
   * refresh AppCheck token as needed. If undefined, the value will default
   * to the value of `app.automaticDataCollectionEnabled`. That property
   * defaults to false and can be set in the app config.
   */
  activate(siteKeyOrProvider, isTokenAutoRefreshEnabled) {
    if (isIOS) {
      console.error(
        `not implemented yet - siteKeyOrProvider/isTokenRefreshEnabled: ${siteKeyOrProvider}/${isTokenAutoRefreshEnabled}`,
      );
      return;
    }
    return this.native.activate(siteKeyOrProvider, isTokenAutoRefreshEnabled);
  }

  /**
   *
   * @param isTokenAutoRefreshEnabled - If true, the SDK automatically
   * refreshes App Check tokens as needed. This overrides any value set
   * during `activate()`.
   */
  setTokenAutoRefreshEnabled(isTokenAutoRefreshEnabled) {
    if (isIOS) {
      console.error(
        `not implemented yet - setTokenAutoRefreshEnabled: ${isTokenAutoRefreshEnabled}`,
      );
      return;
    }

    this.native.setTokenAutoRefreshEnabled(isTokenAutoRefreshEnabled);
  }
}

// import { SDK_VERSION } from '@react-native-firebase/app-check';
export const SDK_VERSION = version;

// import appCheck from '@react-native-firebase/app-check';
// appCheck().X(...);
export default createModuleNamespace({
  statics,
  version,
  namespace,
  nativeModuleName,
  nativeEvents: false, // TODO verify if this is interesting - token refresh listener perhaps?
  hasMultiAppSupport: true,
  hasCustomUrlOrRegionSupport: false,
  ModuleClass: FirebaseAppCheckModule,
});

// import appCheck, { firebase } from '@react-native-firebase/app-check';
// appCheck().X(...);
// firebase.appCheck().X(...);
export const firebase = getFirebaseRoot();
