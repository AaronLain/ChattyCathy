using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ChattyCathy.Models;

namespace ChattyCathy.Data
{
    public class SickBurnRepository
    {
        readonly string _connectionString;
        public SickBurnRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ChattyCathy");
        }
        public List<SickBurn> GetSickBurns()
        {
            using var db = new SqlConnection(_connectionString);

            var burns = db.Query<SickBurn>(@"select *
                                           from SickBurn");

            return burns.ToList();
        }

        public string GetSickBurnContentById(int sickBurnId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select SickBurnContent
                          from SickBurn
                          where SickBurnId = @sbid";

            var parameters = new { sbid = sickBurnId };

            var burn = db.QueryFirstOrDefault<string>(query, parameters);

            return burn;
        }
    }
}
