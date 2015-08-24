package com.yandam.adventurz;

import android.app.Activity;
import android.content.res.AssetFileDescriptor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import java.io.IOException;

/**
 * Created by Yanonix on 03/07/15.
 * Javascript API for Text2Speech of Android
 */
public class JSAudioToSpeech {

    private static final String TAG = "JSTextToSpeech";
    protected final Activity activity;
    protected final WebView webView;

    protected MediaPlayer mediaPlayer;

    protected int lastId = 0;


    public JSAudioToSpeech(final Activity _activity, WebView _webView) {
        this.activity = _activity;
        this.webView = _webView;

        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        mediaPlayer.setOnErrorListener(new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(MediaPlayer mp, int what, int extra) {
                end();
                return false;
            }
        });
        mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                end();
            }
        });

    }

    @JavascriptInterface
    public int play(final String url) {
        if (url != null && !url.isEmpty()) {
            if (mediaPlayer != null) {

                mediaPlayer.reset();
                try {
                    //mediaPlayer.setDataSource("file:///android_asset/www/" + url);
                    AssetFileDescriptor descriptor = activity.getAssets().openFd("www/"+url);
                    mediaPlayer.setDataSource(descriptor.getFileDescriptor(), descriptor.getStartOffset(), descriptor.getLength());
                    descriptor.close();
                    mediaPlayer.prepare();
                    mediaPlayer.start();
                } catch (IOException e) {
                    e.printStackTrace();
                    return -1;
                }

                lastId++;

                return lastId - 1;
            }
        }

        return -1;
    }

    @JavascriptInterface
    public boolean stop() {
        if (mediaPlayer != null)
            if(mediaPlayer.isPlaying())
                mediaPlayer.stop();
        return true;
    }

    public void end() {
        activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                webView.loadUrl("javascript:androidAudio2Speech.AndroidCallback(" + (lastId - 1) + ", 0)");
            }
        });
    }

    protected void destroy() {
        if (mediaPlayer != null) {
            mediaPlayer.release();
            mediaPlayer = null;
        }
    }
}
