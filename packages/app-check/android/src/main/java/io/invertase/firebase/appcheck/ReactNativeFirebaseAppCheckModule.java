package io.invertase.firebase.appCheck;

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


import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.safetynet.SafetyNetAppCheckProviderFactory;

import com.facebook.react.bridge.*;
import io.invertase.firebase.common.ReactNativeFirebaseModule;


public class ReactNativeFirebaseAppCheckModule extends ReactNativeFirebaseModule {
  private static final String TAG = "AppCheck";

  ReactNativeFirebaseAppCheckModule(ReactApplicationContext reactContext) {
    super(reactContext, TAG);
  }

  @ReactMethod
  public void activate(String appName, String siteKeyProvider, boolean isTokenAutoRefreshEnabled, Promise promise) {
    System.err.println(TAG + " we should activate, but we do nothing.");
    try {
      FirebaseAppCheck firebaseAppCheck = FirebaseAppCheck.getInstance();
      firebaseAppCheck.installAppCheckProviderFactory(SafetyNetAppCheckProviderFactory.getInstance());
      firebaseAppCheck.setTokenAutoRefreshEnabled(isTokenAutoRefreshEnabled);
    } catch (Exception e) {
      rejectPromiseWithCodeAndMessage(promise, "unknown", "internal-error", "unimplemented");
      return;
    }
    promise.resolve(null);
  }

  @ReactMethod
  public void setTokenAutoRefreshEnabled(String appName, boolean isTokenAutoRefreshEnabled) {
    FirebaseAppCheck.getInstance().setTokenAutoRefreshEnabled(isTokenAutoRefreshEnabled);
  }
}
