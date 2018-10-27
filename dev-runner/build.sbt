import Dependencies._

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization := "b4",
      scalaVersion := "2.12.7",
      version      := "0.1.0-SNAPSHOT"
    )),
    name := "dev-runner",
    resolvers += Resolver.mavenLocal,
    libraryDependencies += "org.glassfish.main.extras" % "glassfish-embedded-all" % "4.1.2",
    libraryDependencies += "com.oracle" % "ojdbc6" % "11.2.0.3"
  )
