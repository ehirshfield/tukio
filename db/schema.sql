create database tukio_db;

USE tukio_db;
create table users(
id int(255) auto_increment not null,
email varchar(255) not null,
password varchar(255) not null,
primary key(id)
)

USE tukio_db;
select * from users;