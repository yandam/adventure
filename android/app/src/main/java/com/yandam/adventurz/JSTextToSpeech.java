package com.yandam.adventurz;

import android.app.Activity;
import android.os.Build;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import java.util.HashMap;
import java.util.Locale;

/**
 * Created by Yanonix on 03/07/15.
 * Javascript API for Text2Speech of Android
 */
public class JSTextToSpeech {

    private static final String TAG = "JSTextToSpeech";
    protected final WebView webView;

    protected TextToSpeech voice;

    protected int utterranceLastId = 0;


    public JSTextToSpeech(final Activity activity, WebView _webView) {
        this.webView = _webView;

        voice = new TextToSpeech(activity, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status != TextToSpeech.ERROR) {
                    voice.setLanguage(Locale.FRENCH);
                    voice.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                        private void callbackStatus(String utterId, final Integer status) {
                            final int id = Integer.valueOf(utterId);
                            activity.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    webView.loadUrl("javascript:androidText2Speech.AndroidCallback(" + id + "," + status + ")");
                                }
                            });
                        }

                        @Override
                        public void onStart(String utterId) {
                            callbackStatus(utterId, 0);
                        }

                        @Override
                        public void onError(String utterId) {
                            // API 21
                            callbackStatus(utterId, 1);
                        }

                        @Override
                        public void onDone(String utterId) {
                            callbackStatus(utterId, 2);
                        }
                    });

                }
            }
        });


    }

    @JavascriptInterface
    public int speak(final String text, String pitchS, String rateS) {
        if (text != null && !text.isEmpty()) {
            if (voice != null) {

                float pitch = 1;
                if(pitchS != null && !pitchS.isEmpty())
                    pitch = Float.valueOf(pitchS);

                float rate = 1;
                if(rateS != null && !rateS.isEmpty())
                    rate = Float.valueOf(rateS);

                voice.setPitch(pitch);
                voice.setSpeechRate(rate);

                if (Build.VERSION.SDK_INT < 21) {
                    HashMap<String, String> param = new HashMap<>();
                    param.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "" + utterranceLastId);
                    //noinspection deprecation
                    voice.speak(text, TextToSpeech.QUEUE_ADD, param);
                } else {
                    voice.speak(text, TextToSpeech.QUEUE_ADD, null, "" + utterranceLastId);
                }

                utterranceLastId++;

                return utterranceLastId - 1;
            }
        }

        return -1;
    }

    @JavascriptInterface
    public int silence(String timeStr) {

        final int time = Integer.valueOf(timeStr);

        if (time >= 0) {
            if (voice != null) {
                if (Build.VERSION.SDK_INT < 21) {
                    HashMap<String, String> param = new HashMap<>();
                    param.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "" + utterranceLastId);
                    //noinspection deprecation
                    voice.playSilence(time, TextToSpeech.QUEUE_ADD, param);
                } else {
                    voice.playSilentUtterance(time, TextToSpeech.QUEUE_ADD, "" + utterranceLastId);
                }

                utterranceLastId++;

                return utterranceLastId - 1;
            }
        } else {
            Log.e(TAG, "silence() time < 0 !");
        }

        return -1;
    }

    @JavascriptInterface
    public boolean stop() {
        if (voice != null)
            voice.stop();
        return true;
    }

    @JavascriptInterface
    public boolean setPitch(String levelStr) {

        if (voice != null) {
            voice.setPitch(Float.valueOf(levelStr));
            return true;
        }
        return false;
    }


    protected void destroy() {
        if (voice != null)
            voice.shutdown();
    }
}
