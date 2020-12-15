using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ChattyCathy.Models;
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
                          where id = @uid";

            var parameters = new { uid = userId };

            var user = db.QueryFirstOrDefault<User>(query, parameters);

            return user;
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

        public void Add(User userToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Users]
                               ([UserName] 
                               ,[ImageUrl]
                               ,[Sentiment]
                               ,[FBuid])
                        Output inserted.id
                        VALUES
                               (@userName,@imageUrl,@sentiment,@fBuid)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.UserId = newId;

        }

    }
}
