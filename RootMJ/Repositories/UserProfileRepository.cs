using System;
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

        public UserProfile GetById(int id)
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
                                    WHERE up.Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile profile = null;
                        if (reader.Read())
                        {
                            profile = new UserProfile()
                            {
                                Id = id,
                                Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                NeighborhoodId = reader.GetInt32(reader.GetOrdinal("UserProfileNeighborhoodId")),
                                Neighborhood = new Neighborhood()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("NeighborhoodId")),
                                    Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                                }
                            };
                            return profile;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO UserProfile (Name, Email, ImageLocation, NeighborhoodId)
                                OUTPUT INSERTED.ID
                                VALUES (@name, @email, @imageLocation, @neighborhoodId)
                                ";
                    cmd.Parameters.AddWithValue("@name", userProfile.Name);
                    cmd.Parameters.AddWithValue("@email", userProfile.Email);
                    cmd.Parameters.AddWithValue("imageLocation", userProfile.ImageLocation == null ? DBNull.Value : userProfile.ImageLocation);
                    cmd.Parameters.AddWithValue("neighborhoodId", userProfile.NeighborhoodId);

                    int newlyCreatedId = (int)cmd.ExecuteScalar();
                    userProfile.Id = newlyCreatedId;
                }
            }
        }


        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE UserProfile
                            SET Name = @name,
                                Email = @email,
                                ImageLocation = @imageLocation,
                                NeighborhoodId = @neighborhoodId
                            WHERE Id = @id
                            ";
                    cmd.Parameters.AddWithValue("@name", userProfile.Name);
                    cmd.Parameters.AddWithValue("@email", userProfile.Email);
                    cmd.Parameters.AddWithValue("imageLocation", userProfile.ImageLocation == null ? DBNull.Value : userProfile.ImageLocation);
                    cmd.Parameters.AddWithValue("neighborhoodId", userProfile.NeighborhoodId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM UserProfile
                            WHERE Id = @id
                            ";

                    cmd.Parameters.AddWithValue("@id", userProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT Id, FirebaseUserId, Name, Email, ImageLocation, NeighborhoodId
                                      FROM UserProfile
                                      WHERE FirebaseUserId = @FirebaseUserId
                                       ";

                    cmd.Parameters.AddWithValue("@FirebaseUserId", firebaseUserId);

                    UserProfile profile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                        {
                        profile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            NeighborhoodId = reader.GetInt32(reader.GetOrdinal("UserProfileNeighborhoodId")),
                            Neighborhood = new Neighborhood()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("NeighborhoodId")),
                                Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                            }
                        };
                    }
                    reader.Close();

                    return profile;
                }
            }
        }


    }
}
