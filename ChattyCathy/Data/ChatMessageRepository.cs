﻿using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ChattyCathy.Models;

namespace ChattyCathy.Data
{
    public class ChatMessageRepository
    {
        readonly string _connectionString;
        public ChatMessageRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ChattyCathy");
        }

        public List<ChatMessage> GetMessages()
        {
            using var db = new SqlConnection(_connectionString);

            var messages = db.Query<ChatMessage>(@"select *
                                                 from Messages");

            return messages.ToList();
        }
        public void Add(ChatMessage messageToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Messages]
                               ([UserName], 
                                [Content],
                                [UserId],
                                [Sentiment],
                                [Date])
                        Output inserted.MessageId
                        VALUES
                               (@userName,@content,@userId,@sentiment,@date)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, messageToAdd);

            messageToAdd.MessageId = newId;
        }

        public string[] RemoveStopWords(string message)
        {
            string[] stopWords = System.IO.File.ReadAllLines(@"Data/stopwords.txt");

            string[] input = message.Split(' ');

            string[] output = input.Except(stopWords).ToArray();

            string test = string.Join("", output);

            Console.WriteLine($"{test}");

            return output;
        }


    }
}
