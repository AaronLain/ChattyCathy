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

        public List<Secret> GetSecrets()
        {
            using var db = new SqlConnection(_connectionString);

            var secrets = db.Query<Secret>(@"select *
                                                 from Secrets");

            return secrets.ToList();
        }

        public Secret GetSecretById(int secretId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Secrets
                          where SecretId = @sid";

            var parameters = new { sid = secretId };

            var secret = db.QueryFirstOrDefault<Secret>(query, parameters);

            return secret;
        }
    }
}
