-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(191) NOT NULL,
    `tries` INTEGER NOT NULL DEFAULT 0,
    `pulls` INTEGER NOT NULL DEFAULT 0,
    `cooldown` DATETIME(3) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
