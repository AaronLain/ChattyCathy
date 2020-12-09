using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ChattyCathy.Models;

namespace ChattyCathy.Data
{
    public class SecretsRepository
    {
        readonly string _connectionString;
        public SecretsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ChattyCathy");
        }

        public User GetSecretrById(int secretId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Secrets
                          where id = @sid";

            var parameters = new { sid = secretId };

            var secret = db.QueryFirstOrDefault<User>(query, parameters);

            return secret;
        }
    }
}
