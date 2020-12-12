USE [master]
GO
/****** Object:  Database [ChattyCathy]    Script Date: 12/12/2020 11:20:52 AM ******/
CREATE DATABASE [ChattyCathy]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ChattyCathy', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ChattyCathy.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ChattyCathy_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ChattyCathy_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ChattyCathy] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ChattyCathy].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ChattyCathy] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ChattyCathy] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ChattyCathy] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ChattyCathy] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ChattyCathy] SET ARITHABORT OFF 
GO
ALTER DATABASE [ChattyCathy] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ChattyCathy] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ChattyCathy] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ChattyCathy] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ChattyCathy] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ChattyCathy] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ChattyCathy] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ChattyCathy] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ChattyCathy] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ChattyCathy] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ChattyCathy] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ChattyCathy] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ChattyCathy] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ChattyCathy] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ChattyCathy] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ChattyCathy] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ChattyCathy] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ChattyCathy] SET RECOVERY FULL 
GO
ALTER DATABASE [ChattyCathy] SET  MULTI_USER 
GO
ALTER DATABASE [ChattyCathy] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ChattyCathy] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ChattyCathy] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ChattyCathy] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ChattyCathy] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ChattyCathy', N'ON'
GO
ALTER DATABASE [ChattyCathy] SET QUERY_STORE = OFF
GO
USE [ChattyCathy]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 12/12/2020 11:20:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[MessageId] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[UserId] [int] NOT NULL,
	[Date] [datetime] NULL,
	[Sentiment] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Secrets]    Script Date: 12/12/2020 11:20:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Secrets](
	[SecretId] [int] IDENTITY(1,1) NOT NULL,
	[SecretText] [nvarchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/12/2020 11:20:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[Sentiment] [int] NOT NULL,
	[FBuid] [nvarchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [ChattyCathy] SET  READ_WRITE 
GO
