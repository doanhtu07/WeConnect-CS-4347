CREATE TABLE
    IF NOT EXISTS `users` (
        `id` bigint unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `email_verified_at` timestamp NULL DEFAULT NULL,
        `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT NULL,
        `updated_at` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `users_email_unique` (`email`)
    ) AUTO_INCREMENT = 6;

ALTER TABLE `users` AUTO_INCREMENT = 6;

CREATE TABLE
    `posts` (
        `id` bigint unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `content` mediumtext NOT NULL,
        `authorId` bigint unsigned NOT NULL,
        CONSTRAINT fk_author FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) AUTO_INCREMENT = 6;

CREATE TABLE
    `comments` (
        `id` bigint UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `userId` bigint UNSIGNED NOT NULL,
        `postId` bigint UNSIGNED NOT NULL,
        `content` mediumtext NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
        CONSTRAINT fk_post FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
    ) AUTO_INCREMENT = 6;

CREATE TABLE
    `follows` (
        `followerId` bigint UNSIGNED NOT NULL,
        `followeeId` bigint UNSIGNED NOT NULL,
        CONSTRAINT fk_follower FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
        CONSTRAINT fk_followee FOREIGN KEY (`followeeId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
        CONSTRAINT uni_follow UNIQUE (`followerId`, `followeeId`)
    );