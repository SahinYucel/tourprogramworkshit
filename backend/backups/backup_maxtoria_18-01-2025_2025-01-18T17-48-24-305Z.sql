-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: tour_program
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agency_provider_settings`
--

DROP TABLE IF EXISTS `agency_provider_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency_provider_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider_id` varchar(255) NOT NULL,
  `earnings` decimal(10,2) DEFAULT '0.00',
  `promotion_rate` decimal(5,2) DEFAULT '0.00',
  `revenue` decimal(10,2) DEFAULT '0.00',
  `pax_adult` int DEFAULT '0',
  `pax_child` int DEFAULT '0',
  `pax_free` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_provider` (`provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency_provider_settings`
--

LOCK TABLES `agency_provider_settings` WRITE;
/*!40000 ALTER TABLE `agency_provider_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `agency_provider_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agencyprovider`
--

DROP TABLE IF EXISTS `agencyprovider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencyprovider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyRef` varchar(50) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `agencyprovidertour` FOREIGN KEY (`company_id`) REFERENCES `companyusers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencyprovider`
--

LOCK TABLES `agencyprovider` WRITE;
/*!40000 ALTER TABLE `agencyprovider` DISABLE KEYS */;
INSERT INTO `agencyprovider` VALUES (144,'UFSQF3M3','correct','505 232 5082',75),(145,'6ON58P9E','oncu','505 232 5050',75);
/*!40000 ALTER TABLE `agencyprovider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agencyrolemembers`
--

DROP TABLE IF EXISTS `agencyrolemembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencyrolemembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `agencyrolemembers_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companyusers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencyrolemembers`
--

LOCK TABLES `agencyrolemembers` WRITE;
/*!40000 ALTER TABLE `agencyrolemembers` DISABLE KEYS */;
INSERT INTO `agencyrolemembers` VALUES (65,'admin','admin','$2b$10$2WQfWqNJDRuZTGHIp.LRu.9LnyjfcVKC.kgmQRGLNEK2V7cvn0yq2',75,'2025-01-18 17:23:58'),(69,'yusuf','operasyon','$2b$10$uCmk6M5FBhPmPW/g0spsAe2yk/Q3pu19NURwSyNNNWRabKU8K/4Cm',75,'2025-01-18 17:43:43'),(70,'zemzem','muhasebe','$2b$10$TYHBtIeZ8UJV4eIz0KnlieG5nm/WH08ZCGWGaFGelg6HPkfcr2F1u',75,'2025-01-18 17:43:53');
/*!40000 ALTER TABLE `agencyrolemembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyusers`
--

DROP TABLE IF EXISTS `companyusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `position` varchar(50) NOT NULL,
  `ref_code` varchar(50) NOT NULL,
  `company_user` varchar(100) NOT NULL,
  `company_pass` varchar(100) NOT NULL,
  `duration_use` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `verification` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyusers`
--

LOCK TABLES `companyusers` WRITE;
/*!40000 ALTER TABLE `companyusers` DISABLE KEYS */;
INSERT INTO `companyusers` VALUES (75,'maxtoria','Agency','MAX2738','maxtoria','$2b$10$qh2OzVWaDN8joN77.F2maOnp.aP0wc.8qka6sRw.QYYSnp/1Uu.BW','1','2025-01-18 17:22:43','XZZ3BD');
/*!40000 ALTER TABLE `companyusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `page_id` varchar(50) NOT NULL,
  `has_permission` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_permission` (`company_id`,`role_name`,`page_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companyusers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4984 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (4968,75,'muhasebe','dashboard',1,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4969,75,'muhasebe','companies',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4970,75,'muhasebe','guides',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4971,75,'muhasebe','tours',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4972,75,'muhasebe','reports',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4973,75,'muhasebe','hotels',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4974,75,'muhasebe','backup',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4975,75,'muhasebe','settings',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4976,75,'operasyon','dashboard',1,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4977,75,'operasyon','companies',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4978,75,'operasyon','guides',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4979,75,'operasyon','tours',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4980,75,'operasyon','reports',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4981,75,'operasyon','hotels',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4982,75,'operasyon','backup',0,'2025-01-18 17:48:05','2025-01-18 17:48:05'),(4983,75,'operasyon','settings',0,'2025-01-18 17:48:05','2025-01-18 17:48:05');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (34,'sahin','sahinyucel@yandex.com','$2b$10$HxPEFsFq.6VPFSkBZ3dNXu2Z45R1BLtqLT.UNN5bfO4StdQFD78om');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-18 20:48:24
