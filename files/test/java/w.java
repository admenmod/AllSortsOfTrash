package com.example.myapplication;

import android.app.Activity;
import android.os.Bundle;

import com.example.myapplication.R;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

}






package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
 
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebResourceError;
import android.webkit.WebResourceReqest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.annotation.TargetApi;
 
public class MainActivity extends AppCompatActivity {
 
    WebView webView;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
 
        final Activity activity = this;
 
        webView.setWebViewClient(new WebViewClient() {
            @SuppressWarnings("deprecation")
            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Toast.makeText(activity, description, Toast.LENGTH_SHORT).show();
            }
            @TargetApi(android.os.Build.VERSION_CODES.M)
            @Override
            public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError rerr) {
                // Redirect to deprecated method, so you can use it in all SDK versions
                onReceivedError(view, rerr.getErrorCode(), rerr.getDescription().toString(), req.getUrl().toString());
            }
        });
 
        webView.loadUrl("https://howdyho.net/");
 
        setContentView(webView);
    }
}








//	file:///storage/emulated/0/projects/vectordraw/index.html







<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

webSettings.setJavaScriptEnabled(true);

webSettings.setAllowContentAccess(true);
webSettings.setAppCacheEnabled(true);
webSettings.setDomStorageEnabled(true);
webSettings.setUseWideViewPort(true);






package com.example.webview01;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    private WebView web;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        web = (WebView) findViewById(R.id.webv);
        web.setWebViewClient(new WebViewClient());

        web.loadUrl("https://www.google.com/");

        WebSettings websettings = web.getSettings();

        websettings.setJavaScriptEnabled(true);

        websettings.setAllowContentAccess(true);
        websettings.setAppCacheEnabled(true);
        websettings.setDomStorageEnabled(true);
        websettings.setUseWideViewPort(true);


}

@Override
public void onBackPressed() {
    super.onBackPressed();
    if (web.canGoBack()){
        web.goBack();
    }else{
        super.onBackPressed();
    }
}
}

Следующие строки должны быть включены

    WebSettings websettings = web.getSettings();

 