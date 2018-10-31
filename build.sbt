import sbt._

scalaVersion := "2.12.6"

organization := "b4"
name := "polygonya"
version := "1.0.0"

javacOptions ++= Seq("-source", "1.8", "-target", "1.8")

resolvers += Resolver.mavenLocal

libraryDependencies ++= {
  val springBootVersion = "2.0.6.RELEASE"

  Seq(
    "org.springframework.boot" % "spring-boot-starter-web" % springBootVersion,
    "org.springframework.boot" % "spring-boot-configuration-processor" % springBootVersion
  )
}
