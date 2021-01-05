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

        public User Update(int userId, User user)
        {
            var sql = @"UPDATE [dbo].[Users]
                        SET [UserName] = @userName,
                            [ImageUrl] = @imageUrl,
                            [Sentiment] = @sentiment,
                            [FBuid] = @fBuid
                        output inserted.*
                        WHERE UserId = @userId";

            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                user.UserName,
                user.ImageUrl,
                user.Sentiment,
                user.FBuid,
                UserId = userId
            };

            var updatedCustomer = db.QueryFirstOrDefault<User>(sql, parameters);

            return updatedCustomer;
        }

        public User UpdateSentiment(int userId, float sentiment)
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

        public User GetUserByFBuid(string fbUid)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Users
                          where FBuid = @fbuid";

            var parameters = new { fbuid = fbUid };

            var user = db.QueryFirstOrDefault<User>(query, parameters);

            return user;
        }

        public float GetUserSentimentScoreByUserId(string userId)
        {
            using var db = new SqlConnection(_connectionString);

            //This sums only the non-neutral messages and divides them by the count of non-neutral messages
            //Basically ignores the zeros so the sentiment sum is somewhat normalized.

            var query = @"select 1.0 * SUM(CASE WHEN Sentiment != 0 THEN Sentiment END) /
                          COUNT(CASE WHEN Sentiment != 0 THEN Sentiment END) as SentimentSum
                          from Messages
                          where UserId = @uid";

            var parameters = new { uid = userId };

            var sentimentSum = db.QueryFirstOrDefault<float>(query, parameters);

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

    }
}
