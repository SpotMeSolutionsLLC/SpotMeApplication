package com.spotmedetached;

import android.os.Bundle; // Installing React-Native-Splash-Screen
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; //Installing React-Native-Splash-Screen

import com.facebook.react.ReactActivityDelegate; // React native gesture handler
import com.facebook.react.ReactRootView; // React native gesture handler
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; // React native gesture handler

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
                }
                };
                }


    @Override
    protected String getMainComponentName() {
        return "SpotmeDetached";
    }
}
