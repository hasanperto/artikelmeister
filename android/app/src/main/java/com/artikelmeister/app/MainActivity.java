package com.artikelmeister.app;

import android.content.pm.ActivityInfo;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Telefonda dikey kilitli; tablette (en kısa kenar ≥ 600dp) dikey ve yatay serbest
        boolean tablet = getResources().getConfiguration().smallestScreenWidthDp >= 600;
        setRequestedOrientation(tablet
                ? ActivityInfo.SCREEN_ORIENTATION_FULL_USER
                : ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }
}
