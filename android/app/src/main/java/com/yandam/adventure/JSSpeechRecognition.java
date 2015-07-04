package com.yandam.adventure;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

/**
 * Created by Yanonix on 03/07/15.
 * Javascript API for SpeechRecognition of Android
 */
public class JSSpeechRecognition {

    private static final String TAG = "JSSpeechRecognition";
    protected final WebView webView;
    private final SpeechRecognizer mSpeechRecognizer;
    private final RecognitionListener speechRecognitionListener;
    private boolean mIsListening = false;
    private Activity activity;


    public JSSpeechRecognition(final Activity activity, WebView _webView) {
        this.webView = _webView;
        this.activity = activity;

        mSpeechRecognizer = SpeechRecognizer.createSpeechRecognizer(activity);

        speechRecognitionListener = new RecognitionListener() {
            @Override
            public void onBeginningOfSpeech() {
                Log.d(TAG, "onBeginingOfSpeech");
            }

            @Override
            public void onBufferReceived(byte[] buffer) {
            }

            @Override
            public void onEndOfSpeech() {
                Log.d(TAG, "onEndOfSpeech");
            }

            @Override
            public void onError(int error) {
                Log.d(TAG, "error = " + error);

                //mSpeechRecognition.prompt(this);
                //if(error == SpeechRecognizer.ERROR_RECOGNIZER_BUSY) {
                stop();
                //}
                //else if(error == SpeechRecognizer.ERROR_SERVER) {

                onResult(error, new ArrayList<String>());
            }

            @Override
            public void onEvent(int eventType, Bundle params) {

            }

            @Override
            public void onPartialResults(Bundle partialResults) {
                unLock();
            }

            @Override
            public void onReadyForSpeech(Bundle params) {
                Log.d(TAG, "onReadyForSpeech");
                unMute();
            }

            @Override
            public void onResults(Bundle results) {
                Log.d(TAG, "onResults"); //$NON-NLS-1$
                stop();

                ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                // matches are the return values of speech recognition engine
                // Use these values for whatever you wish to do
                //Log.d(TAG, "onResults: "+matches.size()+" reponses : "+matches.toString());
                onResult(0, matches);
            }

            public void onResult(final int status, final ArrayList<String> results) {
                Log.d(TAG, "onResults: " + status + " : " + results);

                final JSONArray json = new JSONArray(results);

                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        webView.loadUrl("javascript:SpeechRecognition.AndroidCallback(" + status + "," + json.toString() + ")");
                    }
                });
            }

            @Override
            public void onRmsChanged(float rmsdB) {
            }
        };

        mSpeechRecognizer.setRecognitionListener(speechRecognitionListener);

    }

    @JavascriptInterface
    public boolean start() {

        final Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.FRENCH);

        if (!mIsListening) {
            lock();
            mute();

            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mSpeechRecognizer.startListening(intent);
                }
            });
            return true;
        }

        return false;
    }


    public void mute() {
    }

    public void unMute() {
    }

    @JavascriptInterface
    public boolean stop() {
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mSpeechRecognizer.cancel();
            }
        });

        unLock();
        return true;
    }

    protected void lock() {
        mIsListening = true;
    }

    protected void unLock() {
        mIsListening = false;
    }

    protected void destroy() {
        mSpeechRecognizer.destroy();
    }
}
