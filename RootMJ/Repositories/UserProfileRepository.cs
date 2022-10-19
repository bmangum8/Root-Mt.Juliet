using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using RootMJ.Models;

namespace RootMJ.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT up.Id AS UserProfileId, up.Name AS UserProfileName, up. Email,
                                up.ImageLocation, up.NeighborhoodId AS UserProfileNeighborhoodId, 
                                n.Id AS NeighborhoodId, n.Name AS NeighborhoodName
                            FROM UserProfile up
                            LEFT JOIN Neighborhood n ON up.NeighborhoodId = n.Id
                            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var profiles = new List<UserProfile>();
                        while (reader.Read())
                        {
                            profiles.Add(new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                NeighborhoodId = reader.GetInt32(reader.GetOrdinal("UserProfileNeighborhoodId")),
                                Neighborhood = new Neighborhood()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("NeighborhoodId")),
                                    Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                                }
                            });
                        }
                        return profiles;
                    }
                }
            }
        }
    }
}
