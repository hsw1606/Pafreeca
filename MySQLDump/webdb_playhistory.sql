CREATE DATABASE  IF NOT EXISTS `webdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `webdb`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: webdb
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `playhistory`
--

DROP TABLE IF EXISTS `playhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `playhistory` (
  `ph_no` int(11) NOT NULL AUTO_INCREMENT,
  `ph_title` varchar(100) NOT NULL,
  `a_nickname` varchar(45) NOT NULL,
  PRIMARY KEY (`ph_no`),
  KEY `fk_nickname_idx` (`a_nickname`),
  CONSTRAINT `a_nickname` FOREIGN KEY (`a_nickname`) REFERENCES `account` (`a_nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playhistory`
--

LOCK TABLES `playhistory` WRITE;
/*!40000 ALTER TABLE `playhistory` DISABLE KEYS */;
INSERT INTO `playhistory` VALUES (19,'지우개에 화가난 홍구 ㅋㅋㅋ 아 이영호 VS 임홍규 스타크래프트 오늘의 경기','qdad123'),(20,'제이플라 2018  J Fla  The Best Cover Songs 2017  2018','qdad123'),(21,'생방송 포켓몬스터 레츠고 피카츄 이브이 가벼운 멀티배틀 그리고 교환','qdad123'),(22,'11월달 승률 843로 마무리하게 한 그 경기 이영호 VS 도재욱 스타크래프트 오늘의 경기','qdad123'),(23,'베릴 이 정도만 쏘면 치킨 간단합니다  배틀그라운드','qdad123'),(25,'11월달 승률 843로 마무리하게 한 그 경기 이영호 VS 도재욱 스타크래프트 오늘의 경기','qdad123'),(26,'스타크래프트 ASL 시즌2 4강 B조 이영호 vs 이제동 전경기 하이라이트','qdad123'),(27,'스타크래프트 ASL 시즌2 4강 B조 이영호 vs 이제동 전경기 하이라이트','qdad123'),(28,'스타크래프트에서 물량하면 떠오르는 괴수','qdad123'),(29,'【 인피쉰 LIVE 】  20181201 토요일 생방송 빨무 빠른무한 스타 팀플 Starcraft','qdad123'),(30,'도재욱 스타크래프트 인공지능 ai와 프로게이머가 붙었습니다','qdad123'),(31,'스타크래프트 ASL 시즌2 4강 B조 이영호 vs 이제동 전경기 하이라이트','qdad123'),(32,'홍구랑 역대급 명장면 만들었습니다 이영호 VS 임홍규 스타크래프트 오늘의 경기','qdad123'),(33,'스타크래프트2처음으로 외국인 블리즈컨 우승','qdad123'),(34,'스타크래프트에서 APM은 쓸모 없었나','qdad123');
/*!40000 ALTER TABLE `playhistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-02 16:21:20
