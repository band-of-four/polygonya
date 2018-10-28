# Polygonya :3

_The cutest IAD lab work you'll ever find_

## Past releases

* [lab2](https://github.com/band-of-four/polygonya/releases/tag/lab2):
Vue.js on the frontend, Java EE Servlets on the backend.

## master branch version

JavaServer Faces

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

Build the GlassFish dev runner and add it to the local repository:
```
cd dev-runner
sbt assembly
mvn install:install-file -DgroupId=b4 -DartifactId=dev-runner -Dversion=0.1.0 \
  -Dpackaging=jar -DgeneratePom=true -Dfile=target/scala-2.12/dev-runner-assembly-0.1.0-SNAPSHOT.jar
```

#### Database connection

Create a `project/db.properties` file with the following contents:
```
username = your-db-username
password = your-db-password
url = jdbc:oracle:thin:@localhost:your-db-port:your-db-sid 
```

#### Database schema

```sql
create table users(
  username varchar(100) primary key,
  password varchar(64) not null
);

create table groups(
  name varchar(50) not null,
  username varchar(100) not null
);

create table history_entries(
  username varchar(100) not null,
  x number not null,
  y number not null,
  foreign key (username) references users(username) on delete cascade,
  constraint range_x check (x between -5 and 3),
  constraint range_y check (y between -5 and 3)
);
```
