package com.imaginea.gerrit.GerritExtension;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UrlReader
{
  protected String getJSonString(URL url)
  {
    StringBuffer jsonString = new StringBuffer();
    String line = "";
    try {
      HttpURLConnection connection = (HttpURLConnection)url.openConnection();
      if (connection.getResponseCode() != 200) {
        throw new RuntimeException("Failed : HTTP error code :" + connection.getResponseCode());
      }
      BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
      while ((line = br.readLine()) != null) {
        if (!")]}'".equals(line)) {
          jsonString.append(line);
        }
      }
      br.close();
      connection.disconnect();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return jsonString.toString();
  }

  protected String getJSonString(URL url, String payload)
  {
    StringBuffer sb = new StringBuffer();
    try {
      HttpURLConnection urlconn = (HttpURLConnection)url.openConnection();
      urlconn.setDoInput(true);
      urlconn.setDoOutput(true);
      urlconn.setRequestMethod("POST");
      urlconn.setRequestProperty("Accept", "application/json");
      urlconn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
      OutputStreamWriter writer = new OutputStreamWriter(urlconn.getOutputStream(), "UTF-8");
      writer.write(payload);
      writer.close();
      BufferedReader br = new BufferedReader(new InputStreamReader(urlconn.getInputStream()));
      String line;
      while ((line = br.readLine()) != null) {
        sb.append(line);
      }
      br.close();
      urlconn.disconnect();
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return sb.toString();
  }

  protected JSONArray createJsonArray(String jsonString)
  {
    try {
      return new JSONArray(jsonString);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return null;
  }

  protected JSONObject createJsonObject(String jsonString) {
    try {
      return new JSONObject(jsonString);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return null;
  }
}