<%@ page import="com.google.gson.Gson" %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>h</title>
    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Merriweather:400,700&amp;subset=cyrillic|Merriweather+Sans" rel="stylesheet">
    <link href="static/app.css" rel="stylesheet">
    <script src="static/vendor.js"></script>
  </head>
  <body>
    <div id="app" data-history="<%= new Gson().toJson(session.getAttribute("list")).replace("\"", "&quot;") %>"></div>
    <script src="static/app.js"></script>
  </body>
</html>
