# UserManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

To build and run it on your machine: 

- in your MySQL database, create a table 'user' like this:

CREATE TABLE `user_mgmt`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(256) NOT NULL , `emailAddress` VARCHAR(256) NOT NULL , `streetAddress` VARCHAR(512) NULL , `city` VARCHAR(128) NULL , `region` VARCHAR(128) NULL , `postalCode` INT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

(Here 'user_mgmt' is the name of the MySQL database. You can substitute your own database name.)

- install angular-cli;

- run ng build in the project's top level folder, i.e. /your/path/to/user-management

- open Visual Studio Code

- from File menu, select Open Folder, and open the project's top level folder, i.e.  /your/path/to/user-management

- in src/server/routes.js, change the MySQL server credentials (which are currently blanked out with stars) to your own MySQL database credentials

- in Visual Studio Code side menu, click the bug icon, then click the green Launch button that appears. This should start the Express.js server. It should be running on localhost:3000

- in your browser, go to localhost:3000/users
