import Dependencies._

enablePlugins(JettyPlugin)

lazy val root = (project in file(".")).
  settings(
    name := "polygonya",
    inThisBuild(List(
      organization := "b4",
      scalaVersion := "2.12.6",
      version      := "1.0.0"
    )),
    javacOptions ++= Seq("-source", "1.8", "-target", "1.8"),
    javaOptions in Jetty ++= Seq(
      "-Xdebug",
      "-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
    ),
    libraryDependencies += scalaTest % Test,
    libraryDependencies += "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided",
    libraryDependencies += "com.sun.faces" % "jsf-api" % "2.2.18",
    libraryDependencies += "com.sun.faces" % "jsf-impl" % "2.2.18",
    libraryDependencies += "org.primefaces" % "primefaces" % "6.2"
  )

