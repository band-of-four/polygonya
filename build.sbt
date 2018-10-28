import sbt._
import Dependencies._
import java.util.Properties
import java.io.FileInputStream

enablePlugins(ContainerPlugin)

containerLibs in Container := Seq("b4" % "dev-runner" % "0.1.0")

containerLaunchCmd in Container := { (port, warPath) => 
  Seq("b4.DevRunner", port.toString, warPath, "src/test/resources/WEB-INF/domain.xml")
}

containerForkOptions in Container := ForkOptions().withRunJVMOptions({
  val props = new Properties()
  props.load(new FileInputStream("project/db.properties"))

  Vector(
    s"-Db4.db.username=${props.getProperty("username")}",
    s"-Db4.db.password=${props.getProperty("password")}",
    s"-Db4.db.url=${props.getProperty("url")}"
  )
})

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
    containerArgs := Seq("--config", "conf/jetty-auth.xml", "--jar", "lib/ojdbc6.jar"),
    resolvers += Resolver.mavenLocal,
    libraryDependencies += scalaTest % Test,
    libraryDependencies += "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided",
 //   libraryDependencies += "com.oracle" % "ojdbc6" % "11.2.0.3",
    libraryDependencies += "com.sun.faces" % "jsf-api" % "2.2.18",
    libraryDependencies += "com.sun.faces" % "jsf-impl" % "2.2.18",
    libraryDependencies += "org.primefaces" % "primefaces" % "6.2"
  )

