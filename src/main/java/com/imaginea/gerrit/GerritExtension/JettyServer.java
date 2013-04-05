package com.imaginea.gerrit.GerritExtension;

import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.PrintStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import org.mortbay.jetty.Connector;
import org.mortbay.jetty.Server;
import org.mortbay.jetty.bio.SocketConnector;
import org.mortbay.jetty.servlet.Context;
import org.mortbay.jetty.servlet.ServletHolder;
import org.mortbay.jetty.webapp.WebAppContext;

public final class JettyServer
  implements ActionListener
{
  private static Server server = new Server();
  static Logger logger = Logger.getLogger(JettyServer.class.getName());
  JButton startbtn;
  JButton stopbtn;
  JTextArea text;
  JFrame frame;
  JLabel title;
  JScrollPane scrollpane;

  private JettyServer()
  {
    this.frame = new JFrame("server");
    this.title = new JLabel("JETTY SERVER");
    this.text = new JTextArea(5, 20);
    this.scrollpane = new JScrollPane(this.text);
    this.startbtn = new JButton("START");
    this.stopbtn = new JButton("STOP");
    addToContainer();
    this.startbtn.addActionListener(this);
    this.stopbtn.addActionListener(this);
    this.frame.setVisible(true);
    this.frame.setDefaultCloseOperation(3);
    this.frame.setSize(300, 250);
  }

  public void addToContainer() {
    this.frame.setLayout(null);
    this.frame.add(this.title);
    this.title.setBounds(100, 20, 100, 20);
    this.frame.getContentPane().add(this.scrollpane);
    this.scrollpane.setBounds(50, 50, 200, 100);
    this.frame.add(this.startbtn);
    this.startbtn.setBounds(60, 160, 80, 20);
    this.frame.add(this.stopbtn);
    this.stopbtn.setBounds(160, 160, 80, 20);
    this.stopbtn.setEnabled(false);
  }

  public void init() {
    SocketConnector connector = new SocketConnector();
    connector.setPort(7501);
    server.setConnectors(new Connector[] { connector });
    Context root = new Context(server, "/embed", 1);
    root.addServlet(new ServletHolder(new GerritServlet()), "/gerrit");
  }

  public void start() {
    init();
    WebAppContext ctx = new WebAppContext();
    ctx.setServer(server);
    ctx.setContextPath("/");
    ctx.setWar("./src/main/WebContent");
    server.addHandler(ctx);
    try {
      server.start();
    } catch (Exception e) {
      logger.log(Level.SEVERE, "error in starting server", e);
    }
  }

  public void stop() {
    try {
      server.stop();
      System.err.print("server stopped\n");
    } catch (Exception e) {
      logger.log(Level.SEVERE, "error in stoping server", e);
    }
  }

  public static void main(String[] args) {
    new JettyServer();
  }

  public void actionPerformed(ActionEvent e) {
    if (e.getSource() == this.startbtn) {
      this.text.append("Server started\n");
      this.startbtn.setEnabled(false);
      this.stopbtn.setEnabled(true);
      start();
    } else {
      this.text.append("Server stopped\n");
      this.stopbtn.setEnabled(false);
      this.startbtn.setEnabled(true);
      stop();
    }
  }
}