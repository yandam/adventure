package com.yandam.adventurz;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.mirrorlink.android.commonapi.Defs;
import com.mirrorlink.android.commonapi.ICommonAPIService;
import com.mirrorlink.android.commonapi.IConnectionListener;
import com.mirrorlink.android.commonapi.IConnectionManager;
import com.mirrorlink.android.commonapi.IContextListener;
import com.mirrorlink.android.commonapi.IContextManager;
import com.mirrorlink.android.commonapi.IDeviceStatusListener;
import com.mirrorlink.android.commonapi.IDeviceStatusManager;

import java.util.ArrayList;

/**
 * Created by Yanonix on 03/07/15.
 * Javascript API for MirrorLink of Android
 */
public class JSMirrorLink {

    private static final String TAG = "JSMirrorLink";
    protected final WebView webView;
    private final Activity activity;
    protected ICommonAPIService serviceCommonAPI;

    private IDeviceStatusManager    mDeviceStatusManager;
    private IConnectionManager      mConnectionManager;

    protected boolean isMirrorLinkConnected = false;
    protected int categories[] = {Defs.ContextInformation.APPLICATION_CATEGORY_MEDIA_GAMING};

    protected IConnectionListener mConnectionListener = new IConnectionListener.Stub() {

        @Override
        public void onRemoteDisplayConnectionChanged(int remoteDisplayConnection) throws RemoteException {
        }

        @Override
        public void onMirrorLinkSessionChanged(final boolean mirrolinkSessionIsEstablished) throws RemoteException {
            isMirrorLinkConnected = mirrolinkSessionIsEstablished;
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetSessionState(" + isMirrorLinkConnected + ")");
                }
            });
        }

        @Override
        public void onAudioConnectionsChanged(Bundle audioConnections) throws RemoteException {
        }
    };

    protected IDeviceStatusListener mDeviceStatusListener = new IDeviceStatusListener.Stub() {
        @Override
        public void onNightModeChanged(final boolean nightMode) throws RemoteException {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetNightMode(" + nightMode + ")");
                }
            });
        }

        @Override
        public void onMicrophoneStatusChanged(boolean micInput) throws RemoteException {
        }

        @Override
        public void onDriveModeChange(final boolean driveMode) throws RemoteException {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetDriveMode(" + driveMode + ")");
                }
            });
        }
    };


    protected IContextListener mContextListener = new IContextListener.Stub() {
        @Override
        public void onFramebufferBlocked(final int reason, Bundle framebufferArea) throws RemoteException {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetFramebufferBlocked(true, " + reason + ")");
                }
            });
        }

        @Override
        public void onAudioBlocked(final int reason) throws RemoteException {
            Log.d(TAG, "onAudioBlocked");
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetAudioBlocked(true, " + reason + ")");
                }
            });
        }

        @Override
        public void onFramebufferUnblocked() throws RemoteException {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetFramebufferBlocked(false, 0)");
                }
            });
        }

        @Override
        public void onAudioUnblocked() throws RemoteException {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:mirrorLink.AndroidSetAudioBlocked(false, 0)");
                }
            });
        }
    };


    public JSMirrorLink(final Activity activity, WebView _webView) {
        this.activity = activity;
        this.webView = _webView;

        // Start connection with MirrorLink
        mirrorlinkConnect();

    }

    @JavascriptInterface
    public boolean isNightMode() {
        if(mDeviceStatusManager != null) {
            try {
               return mDeviceStatusManager.isInNightMode();
            } catch (RemoteException e8) {
                e8.printStackTrace();
            }
        }
        return false;
    }

    @JavascriptInterface
    public boolean isDriveMode() {
        if(mDeviceStatusManager != null) {
            try {
                return mDeviceStatusManager.isInDriveMode();
            } catch (RemoteException e8) {
                e8.printStackTrace();
            }
        }
        return false;
    }

    @JavascriptInterface
    public boolean isSessionEstablished() {
        if(mConnectionManager != null) {
            try {
                return mConnectionManager.isMirrorLinkSessionEstablished();
            } catch (RemoteException e8) {
                e8.printStackTrace();
            }
        }
        return false;
    }

    @JavascriptInterface
    public int getAndroidVersion() {
        return Build.VERSION.SDK_INT;
    }


    private IContextManager mContextManager;
    /**
     * ServiceConnection for link with the CommonApi of MirrorLink
     */
    private ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            Log.d(TAG, "onServiceConnected Called");

            serviceCommonAPI = ICommonAPIService.Stub.asInterface(service);

            // Declaration of the application
            try {
                serviceCommonAPI.applicationStarted(activity.getPackageName(), 1);
                Toast.makeText(activity, "Connected with Common API Service", Toast.LENGTH_SHORT).show();
            } catch (RemoteException e8) {
                e8.printStackTrace();
            }

            // Listeners
            try {
                mDeviceStatusManager =  serviceCommonAPI.getDeviceStatusManager(activity.getPackageName(), mDeviceStatusListener);
                mConnectionManager =    serviceCommonAPI.getConnectionManager(activity.getPackageName(), mConnectionListener);
                mContextManager =       serviceCommonAPI.getContextManager(activity.getPackageName(), mContextListener);

                // Specific for Adventure application
                if(mContextManager != null) {
                    mContextManager.setAudioContextInformation(true, categories, true);
                    mContextManager.setFramebufferContextInformation(new ArrayList<Bundle>(), true);
                }


            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            Log.d(TAG, "onServiceDisconnected Called");

            serviceCommonAPI = null;
            mDeviceStatusManager = null;
            mConnectionManager = null;
            mContextManager = null;
        }
    };

    /**
     * Connect with the Common API of MirrorLink
     */
    protected void mirrorlinkConnect() {
        Intent bindIntent = new Intent(Defs.Intents.BIND_MIRRORLINK_API);
        bindIntent.setPackage("com.mirrorlink.android.service");
        activity.bindService(bindIntent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    /**
     * Disconnect with the Common API of MirrorLink
     */
    protected void mirrorlinkDisconnect() {

        // Remove listeners
        try {
            if(mDeviceStatusManager != null)
                mDeviceStatusManager.unregister();
            if(mConnectionManager != null)
                mConnectionManager.unregister();
            if(mContextManager != null)
                mContextManager.unregister();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Disconnect
        activity.unbindService(serviceConnection);
    }

    /**
     * To be called when destroy the webview
     */
    protected void destroy() {
        mirrorlinkDisconnect();
    }
}
