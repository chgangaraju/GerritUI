package com.imaginea.gerrit.GerritExtension;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONParser
{
  public JSONArray changeIds()
    throws IOException
  {
    UrlReader urlReader = new UrlReader();
    URL url = new URL(
      "http://192.168.2.90:8080/changes/?format=JSON&n=25&o=LABELS");
    JSONArray changeIds = urlReader.createJsonArray(urlReader
      .getJSonString(url));
    return changeIds;
  }

  public JSONObject projectList() throws IOException {
    UrlReader urlReader = new UrlReader();
    URL url = new URL(
      "http://192.168.2.90:8080/projects/?d&format=JSON&n=25");
    JSONObject projects = urlReader.createJsonObject(urlReader
      .getJSonString(url));
    return projects;
  }

  public JSONArray patchList(String id) throws IOException {
    String response = "";
    UrlReader urlReader = new UrlReader();
    int project = Integer.parseInt(id);

    JSONArray array = new JSONArray();
    URL url = new URL(
      "http://192.168.2.90:8080/gerrit/rpc/ChangeDetailService");
    String payload = "{\"jsonrpc\":\"2.0\",\"method\":\"changeDetail\",\"params\":[{\"id\":" + 
      project + "}],\"id\":1}";
    response = urlReader.getJSonString(url, payload);
    try {
      JSONArray revisionId = new JSONArray();
      JSONObject obj = urlReader.createJsonObject(response);
      JSONObject result = obj.getJSONObject("result");
      int patches = getNoOfPatches(result);
      revisionId = getRevisionId(result);
      for (int i = 0; i < patches; i++) {
        JSONObject output = new JSONObject();
        output.put("id", getID(result));
        output.put("commitmessage", getCommitMessage(result));
        output.put("createdtime", getCreatedTime(result).get(i));
        output.put("revisionId", revisionId.get(i));
        output.put("project", getProject(result));
        output.put("Comments", getComments(result, i + 1));
        output.put("nbrcomments", getComments(result, i + 1).length());
        output.put("filesList", filesinPatch(i + 1, id));
        output.put("owner", getOwner(result));
        output.put("changeid", getChangeId(result));
        output.put("projectname", getProject(result));
        output.put("subject", getSubject(result));
        output.put("branch", getBranch(result));
        output.put("reviewers", getReviewers(result));
        array.put(output);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return array;
  }

  protected boolean filesInfo(String id, int patch, String filename)
  {
    try {
      String pluginurl = "http://192.168.2.90:8080/plugins/patchDiff/patchdiff/" + 
        id;
      URL url = new URL(pluginurl);
      String secondmd5 = "";
      String firstmd5 = "";
      UrlReader reader = new UrlReader();
      String response = reader.getJSonString(url);
      JSONObject object = new JSONObject();
      JSONObject object1 = new JSONObject();
      object = reader.createJsonObject(response);
      JSONArray array = new JSONArray();
      JSONArray array1 = new JSONArray();
      array = object.getJSONArray("patchsets");
      object = array.getJSONObject(patch - 1);
      array1 = object.getJSONArray("Patches");
      for (int i = 0; i < array1.length(); i++) {
        object1 = array1.getJSONObject(i);
        String firstfile = object1.getString("filename");
        if (firstfile.equals(filename)) {
          firstmd5 = object1.getString("md5");
          break;
        }
      }
      object = array.getJSONObject(patch - 2);
      array1 = object.getJSONArray("Patches");
      for (int i = 0; i < array1.length(); i++) {
        object1 = array1.getJSONObject(i);
        String secondfile = object1.getString("filename");
        if (secondfile.equals(filename)) {
          secondmd5 = object1.getString("md5");
          break;
        }
      }
      if (firstmd5.equals(secondmd5)) {
        return false;
      }
      return true;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return false;
  }

  protected JSONArray filesinPatch(int patch, String id) throws IOException {
    String response = "";
    UrlReader urlReader = new UrlReader();
    JSONArray array = new JSONArray();
    URL url = new URL(
      "http://192.168.2.90:8080/gerrit/rpc/ChangeDetailService");
    String payload = "{\"jsonrpc\":\"2.0\",\"method\":\"patchSetDetail2\",\"params\":[null,{\"changeId\":{\"id\":" + 
      Integer.parseInt(id) + 
      "},\"patchSetId\":" + 
      patch + 
      "},null],\"id\":2}";
    response = urlReader.getJSonString(url, payload);
    try {
      JSONObject obj = urlReader.createJsonObject(response);
      JSONObject result = obj.getJSONObject("result");
      JSONObject files = new JSONObject();
      files.put("files", getFiles(result, id, patch));
      array.put(files);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return array;
  }

  protected JSONArray getFiles(JSONObject jsonObject, String id, int patch) {
    JSONArray files = new JSONArray();
    JSONArray array = new JSONArray();
    try {
      array = jsonObject.getJSONArray("patches");
      for (int i = 0; i < array.length(); i++) {
        JSONObject obj = new JSONObject();
        jsonObject = array.getJSONObject(i);
        obj.put("insertions", jsonObject.getInt("insertions"));
        obj.put("deletions", jsonObject.getInt("deletions"));
        obj.put("changeType", jsonObject.getString("changeType"));
        String filename = jsonObject.getJSONObject("key").getString(
          "fileName");
        obj.put("fileName", filename);
        if (patch > 1)
          obj.put("newChange", filesInfo(id, patch, filename));
        else {
          obj.put("newChange", true);
        }
        files.put(obj);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return files;
  }

  protected JSONArray getComments(JSONObject jsonObject, int patchid) {
    JSONArray comments = new JSONArray();
    JSONArray array = new JSONArray();
    JSONObject patchset = new JSONObject();
    try {
      array = jsonObject.getJSONArray("messages");
      HashMap map = new HashMap();
      map = createAccountsMap(jsonObject);
      for (int i = 0; i < array.length(); i++) {
        JSONObject obj = new JSONObject();
        jsonObject = array.getJSONObject(i);
        patchset = jsonObject.getJSONObject("patchset");
        int patchsetid = patchset.getInt("patchSetId");
        if (patchsetid == patchid) {
          obj.put("message", jsonObject.getString("message"));
          obj.put("writtenOn", jsonObject.getString("writtenOn"));
          obj.put("authorID", map.get(Integer.valueOf(jsonObject.getJSONObject("author").getInt("id"))));
          comments.put(obj);
        }
      }
    }
    catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return comments;
  }

  protected JSONArray getID(JSONObject jsonObject) {
    JSONArray id = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("change");
      jsonObject = jsonObject.getJSONObject("changeId");
      obj.put("id", jsonObject.getInt("id"));
      id.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return id;
  }

  protected JSONArray getRevisionId(JSONObject jsonObject) {
    JSONArray revisionId = new JSONArray();
    JSONArray array = new JSONArray();
    try {
      array = jsonObject.getJSONArray("patchSets");
      for (int i = 0; i < array.length(); i++) {
        JSONObject obj = new JSONObject();
        jsonObject = array.getJSONObject(i);
        jsonObject = jsonObject.getJSONObject("revision");
        obj.put("revisionId", jsonObject.getString("id"));
        revisionId.put(obj);
      }
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return revisionId;
  }

  protected JSONArray getSubject(JSONObject jsonObject) {
    JSONArray subject = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("change");
      obj.put("subject", jsonObject.getString("subject"));
      subject.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return subject;
  }

  protected JSONArray getBranch(JSONObject jsonObject) {
    JSONArray branch = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("change");
      jsonObject = jsonObject.getJSONObject("dest");
      obj.put("branch", jsonObject.getString("branchName"));
      branch.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return branch;
  }

  protected JSONArray getProject(JSONObject jsonObject) {
    JSONArray project = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("change");
      jsonObject = jsonObject.getJSONObject("dest");
      jsonObject = jsonObject.getJSONObject("projectName");
      obj.put("project", jsonObject.getString("name"));
      project.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return project;
  }

  protected JSONArray getChangeId(JSONObject jsonObject) {
    JSONArray changeId = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("change");
      jsonObject = jsonObject.getJSONObject("changeKey");
      obj.put("changeId", jsonObject.getString("id"));
      changeId.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return changeId;
  }

  protected JSONArray getCommitMessage(JSONObject jsonObject) {
    JSONArray commitMessage = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("currentDetail");
      jsonObject = jsonObject.getJSONObject("info");
      obj.put("commitMessage", jsonObject.getString("message"));
      commitMessage.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return commitMessage;
  }

  protected JSONArray getCreatedTime(JSONObject jsonObject) {
    JSONArray createdtime = new JSONArray();
    JSONArray array = new JSONArray();
    try {
      array = jsonObject.getJSONArray("patchSets");
      for (int i = 0; i < array.length(); i++) {
        JSONObject obj = new JSONObject();
        jsonObject = array.getJSONObject(i);
        obj.put("time", jsonObject.getString("createdOn"));
        createdtime.put(obj);
      }
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return createdtime;
  }

  protected int getNoOfPatches(JSONObject jsonObject) {
    int noOfPatches = 0;
    try {
      jsonObject = jsonObject.getJSONObject("change");
      noOfPatches = jsonObject.getInt("nbrPatchSets");
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return noOfPatches;
  }

  protected JSONArray getOwner(JSONObject jsonObject) {
    JSONArray owner = new JSONArray();
    JSONObject obj = new JSONObject();
    try {
      jsonObject = jsonObject.getJSONObject("currentDetail");
      jsonObject = jsonObject.getJSONObject("info");
      jsonObject = jsonObject.getJSONObject("author");
      obj.put("owner", jsonObject.getString("name"));
      owner.put(obj);
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return owner;
  }

  protected HashMap<Integer, String> createAccountsMap(JSONObject jsonObject) {
    HashMap map = new HashMap();

    JSONObject accounts = new JSONObject();
    JSONObject idObj = new JSONObject();
    JSONArray accountsArray = new JSONArray();
    Integer id = new Integer(0);
    try {
      accounts = jsonObject.getJSONObject("accounts");
      accountsArray = accounts.getJSONArray("accounts");
      for (int i = 1; i < accountsArray.length(); i += 2) {
        accounts = accountsArray.getJSONObject(i);
        String name = accounts.getString("fullName");
        idObj = accounts.getJSONObject("id");
        id = Integer.valueOf(idObj.getInt("id"));
        map.put(id, name);
      }
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return map;
  }

  protected JSONArray getReviewers(JSONObject jsonObject)
  {
    Integer id = new Integer(0);
    JSONArray approvals = new JSONArray();
    JSONArray reviewers = new JSONArray();
    JSONArray submitRecords = new JSONArray();
    JSONObject labels = new JSONObject();
    HashMap map = new HashMap();
    try {
      map = createAccountsMap(jsonObject);
      approvals = jsonObject.getJSONArray("approvals");
      submitRecords = jsonObject.getJSONArray("submitRecords");
      labels = submitRecords.getJSONObject(0);
      submitRecords = labels.getJSONArray("labels");
      for (int i = 0; i < approvals.length(); i++) {
        JSONObject jsonobject3 = new JSONObject();
        jsonObject = approvals.getJSONObject(i);
        if (jsonObject.has("account")) {
          jsonObject = jsonObject.getJSONObject("account");
          id = Integer.valueOf(jsonObject.getInt("id"));
          jsonobject3.put("name", map.get(id));
          jsonobject3.put("id", id);
          for (int j = 0; j < submitRecords.length(); j++) {
            labels = submitRecords.getJSONObject(j);
            if (labels.has("appliedBy")) {
              labels = labels.getJSONObject("appliedBy");
              int id1 = labels.getInt("id");
              if (id.intValue() == id1) {
                String label = submitRecords.getJSONObject(j).getString("label");
                String status = submitRecords.getJSONObject(j).getString("status");
                jsonobject3.put(label, status);
              }
            }
          }
        }
        reviewers.put(jsonobject3);
      }
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    return reviewers;
  }
}