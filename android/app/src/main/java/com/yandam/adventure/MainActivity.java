package com.yandam.adventure;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import static android.util.FloatMath.sqrt;


public class MainActivity extends Activity {

    private static final String TAG = "MainActivity";
    private WebView webView;
    private JSTextToSpeech jsTextToSpeech;
    private JSSpeechRecognition jsSpeechRecognition;
    private JSMirrorLink jsMirrorLink;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.i(TAG, "onCreate");

        webView = (WebView) findViewById(R.id.webView);

        // Helping clicking on the screen
        webView.setOnTouchListener(new View.OnTouchListener() {
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_MOVE) {
                    float d;
                    float dt = event.getEventTime() - event.getDownTime();
                    if (event.getHistorySize() > 0) {
                        float dx = event.getHistoricalX(0) - event.getHistoricalX(event.getHistorySize() - 1);
                        float dy = event.getHistoricalY(0) - event.getHistoricalY(event.getHistorySize() - 1);
                        d = sqrt(dx * dx + dy * dy);
                    } else {
                        d = 0;
                    }
                    //Log.d(TAG, "onTouch " + d + " | " + dt);
                    return d < 10 && dt < 200;
                }
                return false;
            }
        });
        
        // Scroll
        webView.setHorizontalScrollBarEnabled(false);

        // Enable Javascript
        webView.getSettings().setJavaScriptEnabled(true);
        jsTextToSpeech = new JSTextToSpeech(this, webView);
        webView.addJavascriptInterface(jsTextToSpeech, "AndroidTextToSpeech");
        jsSpeechRecognition = new JSSpeechRecognition(this, webView);
        webView.addJavascriptInterface(jsSpeechRecognition, "AndroidSpeechRecognition");
        jsMirrorLink = new JSMirrorLink(this, webView);
        webView.addJavascriptInterface(jsMirrorLink, "AndroidMirrorLink");

        // Debug Mode with Google Chrome Developer Tools
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        // Set a client
        webView.setWebChromeClient(new WebChromeClient() {

            public static final String TAG = "WebView";

            /**
             * Return Javascript console to Logcat
             */
            @Override
            public boolean onConsoleMessage(@NonNull ConsoleMessage consoleMessage) {
                String message = " - (" + consoleMessage.sourceId() + " " + consoleMessage.lineNumber() + ") - " + consoleMessage.message();

                if (consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.DEBUG)
                    Log.d(TAG, "LogDebug" + message);
                else if (consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.LOG)
                    Log.v(TAG, "LogLog" + message);
                else if (consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.TIP)
                    Log.i(TAG, "LogTip" + message);
                else if (consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.WARNING)
                    Log.w(TAG, "LogWarning" + message);
                else if (consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.ERROR)
                    Log.e(TAG, "LogError" + message);
                else
                    Log.e(TAG, "LogUnknown" + message);
                return true;
            }
        });

        webView.setWebViewClient(new WebViewClient() {

            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Toast.makeText(getApplicationContext(), "Oh no! " + description, Toast.LENGTH_SHORT).show();
            }
        });

        if (savedInstanceState == null) {
            webView.loadUrl("file:///android_asset/www/index.html");
        }
    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(event.getAction() == KeyEvent.ACTION_DOWN){
            switch(keyCode)
            {
                case KeyEvent.KEYCODE_BACK:
                    if(webView.canGoBack()){
                        webView.goBack();
                    } else {
                        finish();
                    }
                    return true;
                case KeyEvent.KEYCODE_MENU:
                    webView.loadUrl("javascript:route('home')");
                    return true;
            }

        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        jsTextToSpeech.destroy();
        jsSpeechRecognition.destroy();
        jsMirrorLink.destroy();

        super.onDestroy();
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);

        // Save the state of the WebView
        webView.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);

        // Restore the state of the WebView
        webView.restoreState(savedInstanceState);
    }
}
