import sbt._

scalaVersion := "2.12.6"

organization := "b4"
name := "polygonya"
version := "1.0.0"

javacOptions ++= Seq("-source", "1.8", "-target", "1.8")

resolvers += Resolver.mavenLocal

val springBootVersion = "2.1.0.RELEASE"

libraryDependencies ++= Seq(
  "org.springframework.boot" % "spring-boot-starter-web" % springBootVersion,
  "org.springframework.boot" % "spring-boot-configuration-processor" % springBootVersion,
  "org.springframework.boot" % "spring-boot-starter-data-jpa" % springBootVersion  % "provided"
)

libraryDependencies ++= Seq(
  "org.mindrot" % "jbcrypt" % "0.4",
  "com.oracle" % "ojdbc6" % "11.2.0.3"
)

libraryDependencies ++= Seq(
  "org.scalatest" %% "scalatest" % "3.0.5" % "test",
  "org.springframework.boot" % "spring-boot-starter-test" % springBootVersion % "test"
)
