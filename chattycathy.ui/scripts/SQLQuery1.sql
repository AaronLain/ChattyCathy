CREATE DATABASE [ChattyCathy];

GO



USE [ChattyCathy];

GO



CREATE TABLE [dbo].[Users]

(

	[id] INT NOT NULL IDENTITY,

	[UserName] NVARCHAR(MAX) NOT NULL,

	[ImageUrl] NVARCHAR(MAX) NULL,

	[Sentiment] INT NOT NULL,

	[FBuid] NVARCHAR(MAX) NOT NULL



);

GO



CREATE TABLE [dbo].[Messages]

(

	[id] INT NOT NULL IDENTITY,

	[Content] NVARCHAR(MAX) NOT NULL,

	[UserId] INT NOT NULL,

	[Date] DateTime,

	[Sentiment] INT NOT NULL

);

GO



CREATE TABLE [dbo].[Secrets]

(

	SecretId INT NOT NULL IDENTITY,

	SecretText NVARCHAR(MAX) NOT NULL,

);



INSERT INTO [dbo].[Users] ( UserName, Sentiment, FBuid)

VALUES ('Chuck Berry', 0, 'abc123')

GO



INSERT INTO [dbo].[Users] (UserName, Sentiment, FBuid)

VALUES ('Glenn Close', 0, 'abc123')

GO





INSERT INTO [dbo].[Users] (UserName, Sentiment, FBuid)

VALUES ('Tilda Swinton', 0, 'abc123')

GO





INSERT INTO [dbo].[Users] (UserName, Sentiment, FBuid)

VALUES ('Barry Manilow', 0, 'abc123')

GO



INSERT INTO [dbo].[Messages] (Content, UserId, Sentiment)

VALUES ('Sup', 1, 0)

GO



INSERT INTO [dbo].[Messages] (Content, UserId, Sentiment)

VALUES ('Hello', 2, 0)

GO



INSERT INTO [dbo].[Messages] (Content, UserId, Sentiment)

VALUES ('What?', 3, 0)

GO



INSERT INTO [dbo].[Messages] (Content, UserId, Sentiment)

VALUES ('Not much', 4, 0)

GO



INSERT INTO [dbo].[Secrets] (SecretText)

VALUES ('Joe Pesci is actually Danny Devito on tiny stilts.')



INSERT INTO [dbo].[Secrets] (SecretText)

VALUES ('Meatloaf is not Meatloafs real name.')



INSERT INTO [dbo].[Secrets] (SecretText)

VALUES ('Pop Tarts were invented by Xerxes during the second Peoloponesian War.')



INSERT INTO [dbo].[Secrets] (SecretText)

VALUES ('Billy Mays is still alive, he lives in the Keys with Elvis and Tupac.')

