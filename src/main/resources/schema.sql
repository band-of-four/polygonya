create table users(
  username varchar(100) primary key,
  passwordHash varchar(64) not null,
  day int not null,
  relationshipMeter int not null
);

create table history_entries(
  username varchar(100) not null,
  x number not null,
  y number not null,
  r number not null,
  foreign key (username) references users(username) on delete cascade,
  constraint range_x check (x between -5 and 3),
  constraint range_y check (y between -5 and 3)
);
