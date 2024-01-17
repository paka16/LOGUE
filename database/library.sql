DROP TABLE IF EXISTS `my_books`;
DROP TABLE IF EXISTS `book_ratings`;
CREATE TABLE `book_ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` varchar(10) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rating` (`rating`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

INSERT INTO `book_ratings`
VALUES (1, '0'),
(2, '0.5'),
(3, '1'),
(4, '1.5'),
(5, '2'),
(6, '2.5'),
(7, '3'),
(8, '3.5'),
(9, '4'),
(10, '4.5'),
(11, '5');

DROP TABLE IF EXISTS `book_progress`;
CREATE TABLE `book_progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progress` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `progress` (`progress`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

INSERT INTO `book_progress`
VALUES (1, 'To Be Read'),
(2, 'Reading'),
(3, 'Read');

DROP TABLE IF EXISTS `book_genres`;
CREATE TABLE `book_genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

INSERT INTO `book_genres` 
VALUES (1, 'Romance'),
(2, 'Mystery'),
(3, 'Fantasy Fiction'),
(4, 'Young Adult'),
(5, 'Adult'),
(6, 'Crime'),
(7, 'Thriller'),
(8, 'Health'),
(9, 'Science-Fiction'),
(10, 'Self-Help'),
(11, 'Non-fiction'),
(12, 'Fiction'),
(13, 'Other');



CREATE TABLE `my_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) NOT NULL,
  `genres` int(11),
  `ratings` int(10) DEFAULT NULL,
  `review` varchar(500) DEFAULT NULL,
  `progress` int(5) DEFAULT 1,
  `isbn` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genres` (`genres`),
  FOREIGN KEY (`genres`) REFERENCES `book_genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`ratings`) REFERENCES `book_ratings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`progress`) REFERENCES `book_progress` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

INSERT INTO `my_books`
VALUES (1, 'Immortal Longings', 'Chloe Gong', 3, null, null, 1, '9781668000243'),
(2, 'These Violent Delights', 'Chloe Gong', 3, null, null, 3, '9781665921763'),
(3, 'Our Violent Ends', 'Chloe Gong', 3, null, null, 3, '9781534457744'),
(4, 'Foul Lady Fortune', 'Chloe Gong', 3, null, null, 3, '9781665905602');

