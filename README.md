# Polygonya :3

_The cutest IAD lab work you'll ever find_

## Past releases

* [lab2](https://github.com/band-of-four/polygonya/releases/tag/lab2):
Vue.js on the frontend, Java EE Servlets (Scala) on the backend.
* [lab3](https://github.com/band-of-four/polygonya/releases/tag/lab3):
JavaServer Faces, Scala, Oracle Database

## master branch version

Frontend: React + Redux, ES6, JSX
Backend: Spring Boot, Scala, Oracle Database

### Prerequisites

* sbt
* Maven
* Oracle JDBC driver, [ojdbc6.jar](https://www.oracle.com/technetwork/apps-tech/jdbc-112010-090769.html)

### Setup

#### Local dependencies

Add `ojdbc6` to the local repository:
```
mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc6 -Dversion=11.2.0.3 \
  -Dpackaging=jar -DgeneratePom=true -Dfile=ojdbc6.jar
```
