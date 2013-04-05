package com.imaginea.gerrit.GerritExtension;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GerritServlet extends HttpServlet
{
  private static final long serialVersionUID = 1L;

  protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    String operation = request.getParameter("q");

    JSONParser parser = new JSONParser();

    response.setContentType("application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    PrintWriter out = response.getWriter();

    if ("change".equals(operation)) {
      out.print(parser.changeIds());
    } else if ("pList".equals(operation)) {
      out.print(parser.projectList());
    } else if ("patches".equals(operation)) {
      String project = request.getParameter("project");
      out.print(parser.patchList(project));
    }
    else if ("singlePatch".equals(operation)) {
      String project = request.getParameter("project");
      out.print(parser.patchList(project));
    }
  }
}