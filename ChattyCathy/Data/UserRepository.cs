using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ChattyCathy.Models;
using ChattyCathy.Data;
using System.Threading.Tasks;

namespace ChattyCathy.Data
{
    public class UserRepository
    {
        readonly string _connectionString;
        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ChattyCathy");
        }
        public List<User> GetUsers()
        {
            using var db = new SqlConnection(_connectionString);

            var users = db.Query<User>(@"select *
                                         from Users");

            return users.ToList();
        }

        public User GetUserById(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Users
                          where UserId = @uid";

            var parameters = new { uid = userId };

            var user = db.QueryFirstOrDefault<User>(query, parameters);

            return user;
        }

        public User Update(int userId, int sentiment)
        {
            var sql = @"UPDATE [dbo].[Users]
                        SET [Sentiment] = @sentiment
                        output inserted.*
                        WHERE UserId = @userId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                Sentiment = sentiment,
                UserId = userId
            };

            var updatedCustomer = db.QueryFirstOrDefault<User>(sql, parameters);

            return updatedCustomer;
        }

        public User GetUserByFBuid(int fbUid)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Users
                          where FBuid = @fbuid";

            var parameters = new { fbuid = fbUid };

            var user = db.QueryFirstOrDefault<User>(query, parameters);

            return user;
        }

        public int GetUserSentimentScoreByUserId(string userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select SUM(Sentiment) as SentimentSum
                          from Messages
                          where UserId = @uid";

            var parameters = new { uid = userId };

            var sentimentSum = db.QueryFirstOrDefault<int>(query, parameters);

            Console.WriteLine($"{sentimentSum}, sentiment sum");

            return sentimentSum;

        } 

        public void Add(User userToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Users]
                               ([UserName] 
                               ,[ImageUrl]
                               ,[Sentiment]
                               ,[FBuid])
                        Output inserted.UserId
                        VALUES
                               (@userName,@imageUrl,@sentiment,@fBuid)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.UserId = newId;

        }

        //public int UserSentimentSetter()
        //{

        //}

    }
}
