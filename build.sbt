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
    libraryDependencies += "javax.servlet" % "javax.servlet-api" % "4.0.1" % "provided",
    libraryDependencies += "org.scala-lang.modules" %% "scala-xml" % "1.1.0",
    libraryDependencies += "com.google.code.gson" % "gson" % "2.8.5"
  )

