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

### Database setup

```sql
create table users(
    id integer not null primary key generated always as identity (start with 1, increment by 1),
    username varchar(100) not null,
    password varchar(200) not null,
    constraint unique_name unique(username)
);

create table groups(
   name varchar(50) not null,
   username varchar(100) not null
);

create table history_entries(
    user_id integer not null,
    x number not null,
    y number not null,
    foreign key (user_id) references users(id) on delete cascade,
    constraint range_x check (x between -5 and 3),
    constraint range_y check (y between -5 and 3)
);
