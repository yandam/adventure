package com.yandam.adventure;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
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

       // getWindow().requestFeature(Window.FEATURE_PROGRESS);
        webView.setWebChromeClient(new WebChromeClient() {

            public static final String TAG = "WebView";

            /**
             * Return Javascript console to Logcat
             */
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                String message = " - (" + consoleMessage.sourceId() + " " + consoleMessage.lineNumber() + ") - " + consoleMessage.message();

                if(consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.DEBUG)
                    Log.d(TAG, "LogDebug" + message);
                else if(consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.LOG)
                    Log.v(TAG, "LogLog" + message);
                else if(consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.TIP)
                    Log.i(TAG, "LogTip" + message);
                else if(consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.WARNING)
                    Log.w(TAG, "LogWarning" + message);
                else if(consoleMessage.messageLevel() == ConsoleMessage.MessageLevel.ERROR)
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

        //webView.loadUrl("http://www.yanonix.fr");
        //String summary = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML Basic 1.1//EN\" \"http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd\"><html><body>You scored <a href='javascript:textToSpeech.alert(\"coucou\")'><b>192</b></a><script >console.log('coucou');alert('yesah');</script> <a href='javascript:alert(window.textToSpeech)'>points</a>.</body></html>";

        /*webView.loadData("", "text/html", null);*/
       // Uri path = Uri.parse("android.resource://com.androidbook.samplevideo/" + R..raw.myvideo);
        webView.loadUrl("file:///android_asset/html/test/apiAndroid.html");

        //webView.loadData(summary, "text/html", null);
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

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onDestroy() {
        jsTextToSpeech.destroy();

        super.onDestroy();
    }
}
