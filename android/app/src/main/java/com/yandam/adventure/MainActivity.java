package com.yandam.adventure;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


public class MainActivity extends Activity {

    private static final String TAG = "MainActivity";
    private WebView webView;
    private JSTextToSpeech jsTextToSpeech;
    private JSSpeechRecognition jsSpeechRecognition;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.i(TAG, "onCreate");

        webView = (WebView) findViewById(R.id.webView);

        // Enable Javascript
        webView.getSettings().setJavaScriptEnabled(true);
        jsTextToSpeech = new JSTextToSpeech(this, webView);
        webView.addJavascriptInterface(jsTextToSpeech, "AndroidTextToSpeech");
        jsSpeechRecognition = new JSSpeechRecognition(this, webView);
        webView.addJavascriptInterface(jsSpeechRecognition, "AndroidSpeechRecognition");

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

        webView.loadUrl("file:///android_asset/www/test/apiAndroid.html");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        if (id == R.id.action_reload) {
            webView.reload();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onDestroy() {
        jsTextToSpeech.destroy();
        jsSpeechRecognition.destroy();

        super.onDestroy();
    }
}
