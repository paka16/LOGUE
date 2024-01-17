DROP TABLE IF EXISTS `surveys`;



CREATE TABLE `surveys` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
   `phone` varchar(20),
   `issue` varchar(30) NOT NULL,
   `description` varchar(500) NOT NULL,
   PRIMARY KEY (`id`)
 )ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;




INSERT INTO surveys (name, email, phone, issue, description) VALUES ('John Doe', 'johndoe@example.com', 123-456-7891, 'test', 'test');













SELECT * FROM surveys;


































