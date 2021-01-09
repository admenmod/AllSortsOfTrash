package com.example.myapplication;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.webkit.WebSettings;
import android.annotation.TargetApi;

public class MainActivity extends Activity {

  WebView webView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    webView = new WebView(this);
    webView.setWebViewClient(new WebViewClient());
    WebSettings webSettings = webView.getSettings();

    webSettings.setJavaScriptEnabled(true);
    webSettings.setAllowContentAccess(true);
    webSettings.setAppCacheEnabled(true);
    webSettings.setDomStorageEnabled(true);
    webSettings.setUseWideViewPort(true);

    final Activity activity = this;

    webView.setWebViewClient(
        new WebViewClient() {
          @SuppressWarnings("deprecation")
          @Override
          public void onReceivedError(
              WebView view, int errorCode, String description, String failingUrl) {
            Toast.makeText(activity, description, Toast.LENGTH_SHORT).show();
          }
        });

    webView.loadUrl("file:///storage/emulated/0/Android/data/io.spck/files/MetaMeth/index.html");

    setContentView(webView);
  }
}





package com.example.myapplication;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends Activity {

  WebView webView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    webView = new WebView(this);
    webView.setWebChromeClient(new WebChromeClient());
    WebSettings webSettings = webView.getSettings();

    webSettings.setJavaScriptEnabled(true);
    webSettings.setAllowContentAccess(true);
    webSettings.setAppCacheEnabled(true);
    webSettings.setDomStorageEnabled(true);
    webSettings.setUseWideViewPort(true);

    final Activity activity = this;

    webView.setWebViewClient(
        new WebViewClient() {
        /*  @Override
            public void onReceivedError(
              WebView view, int errorCode, String description, String failingUrl) {
            Toast.makeText(activity, description, Toast.LENGTH_SHORT).show();
          }*/
        });
	
	
	String path = "MetaMeth/index.html";
	webView.loadUrl("file:///android_asset/www/"+path);
	setContentView(webView);
  }
}









package com.example.myapplication;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

  WebView webView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    webView = new WebView(this);
    webView.setWebChromeClient(new WebChromeClient());

    WebSettings webSettings = webView.getSettings();

    webSettings.setJavaScriptEnabled(true);
    webSettings.setAllowContentAccess(true);
    webSettings.setAppCacheEnabled(true);
    webSettings.setDomStorageEnabled(true);
    webSettings.setUseWideViewPort(true);

    webView.setWebViewClient(new WebViewClient());
	
	String path = "MetaMeth/index.html";
	webView.loadUrl("file:///android_asset/www/"+path);
	
	setContentView(webView);
  }
}









package com.example.myapplication;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
  WebView webView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    webView = new WebView(this);
    webView.setWebChromeClient(new WebChromeClient());

    WebSettings webSettings = webView.getSettings();

    webSettings.setJavaScriptEnabled(true);
    webSettings.setAllowContentAccess(true);
    webSettings.setAppCacheEnabled(true);
    webSettings.setDomStorageEnabled(true);
    webSettings.setUseWideViewPort(true);

    webView.setWebViewClient(new WebViewClient());
	
	String root = "file:///storage/emulated/0/Android/data/io.spck/files/"; //"file:///android_asset/www/";
	String path = "androidApp/index.html";
	webView.loadUrl(root+path);
	
	setContentView(webView);
  }
}