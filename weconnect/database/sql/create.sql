CREATE TABLE
    `app_users` (
        `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(255),
        `name` VARCHAR(255)
    ) AUTO_INCREMENT = 6;

CREATE TABLE
    `posts` (
        `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `content` MEDIUMTEXT NOT NULL,
        `authorId` INT UNSIGNED NOT NULL,
        CONSTRAINT fk_author FOREIGN KEY (`authorId`) REFERENCES `app_users` (`id`)
    ) AUTO_INCREMENT = 6;

CREATE TABLE
    `comments` (
        `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `userId` INT UNSIGNED NOT NULL,
        `postId` INT UNSIGNED NOT NULL,
        `content` MEDIUMTEXT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (`userId`) REFERENCES `app_users` (`id`),
        CONSTRAINT fk_post FOREIGN KEY (`postId`) REFERENCES `posts` (`id`)
    ) AUTO_INCREMENT = 6;

CREATE TABLE
    `follows` (
        `followerId` INT UNSIGNED NOT NULL,
        `followeeId` INT UNSIGNED NOT NULL,
        CONSTRAINT fk_follower FOREIGN KEY (`followerId`) REFERENCES `app_users` (`id`),
        CONSTRAINT fk_followee FOREIGN KEY (`followeeId`) REFERENCES `app_users` (`id`),
        CONSTRAINT uni_follow UNIQUE (`followerId`, `followeeId`)
    );