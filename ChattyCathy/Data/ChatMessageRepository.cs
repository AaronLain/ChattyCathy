using System.Collections.Generic;
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

            return output;
        }

        public int PositiveWordScore(string[] input)
        {
            Int16 count = 0;

            string[] positiveWords = System.IO.File.ReadAllLines(@"Data/positive-words.txt");

            foreach (string word in positiveWords)
            {
                if (input.Contains(word))
                {
                    count++;
                }
            }

            return count;
        }

        public int NegativeWordScore(string[] input)
        {
            Int16 count = 0;

            string[] negativeWords = System.IO.File.ReadAllLines(@"Data/negative-words.txt");

            foreach (string word in negativeWords)
            {
                if (input.Contains(word))
                {
                    count++;
                }
            }

            return count;
        }

        public int SentimentScore(string input)
        {
            string[] noStopWords = RemoveStopWords(input);

            int positive = PositiveWordScore(noStopWords);

            int negative = NegativeWordScore(noStopWords);

            int output = positive - negative;

            return output;
        }

    }
}
