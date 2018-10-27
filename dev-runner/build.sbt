import Dependencies._

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization := "b4",
      scalaVersion := "2.12.7",
      version      := "0.1.0-SNAPSHOT"
    )),
    name := "dev-runner",
    libraryDependencies += scalaTest % Test,
    libraryDependencies += "org.glassfish.main.extras" % "glassfish-embedded-all" % "4.1.2"
  )
