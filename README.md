# Polygonya :3

_The cutest IAD lab work you'll ever find_

## Past Releases

* [lab2](https://github.com/band-of-four/polygonya/releases/tag/lab2):
Vue.js on the frontend, Java EE Servlets on the backend.

## master Branch Version

JavaServer Faces

### Prerequisites

* Oracle JDBC driver, [ojdbc6.jar](https://www.oracle.com/technetwork/apps-tech/jdbc-112010-090769.html)
* Maven

Add `ojdbc6` to the local repository:
```
mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc6 -Dversion=11.2.0.3 \
  -Dpackaging=jar -DgeneratePom=true -Dfile=ojdbc6.jar
```

Build the GlassFish dev runner and add it to the local repository:
```
cd dev-runner
sbt assembly
mvn install:install-file -DgroupId=b4 -DartifactId=dev-runner -Dversion=0.1.0 \
  -Dpackaging=jar -DgeneratePom=true -Dfile=target/scala-2.12/dev-runner-assembly-0.1.0-SNAPSHOT.jar
```
