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
                                up.ImageLocation, up.FirebaseUserId, up.NeighborhoodId AS UserProfileNeighborhoodId, 
                                n.Id AS NeighborhoodId, n.Name AS NeighborhoodName
                            FROM UserProfile up
                            LEFT JOIN Neighborhood n ON up.NeighborhoodId = n.Id
                            ";

                    using (var reader = cmd.ExecuteReader())
                    {

                        List<UserProfile> profiles = new List<UserProfile>();

                        while (reader.Read())
                        {
                            UserProfile profile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                NeighborhoodId = reader.GetInt32(reader.GetOrdinal("UserProfileNeighborhoodId")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                Neighborhood = new Neighborhood()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("NeighborhoodId")),
                                    Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                                }
                            };
                                if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))
                                {
                                    profile.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));

                                }

                            profiles.Add(profile);
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
                                NeighborhoodId = reader.GetInt32(reader.GetOrdinal("UserProfileNeighborhoodId")),
                                //Neighborhood = new Neighborhood()
                                //{
                                    //Id = reader.GetInt32(reader.GetOrdinal("NeighborhoodId")),
                                    //Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                                //}
                            };

                            if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))
                            {
                                profile.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));
                            }

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
                                INSERT INTO UserProfile (FirebaseUserId, Name, Email, ImageLocation, NeighborhoodId)
                                OUTPUT INSERTED.ID
                                VALUES (@firebaseUserId, @name, @email, @imageLocation, @neighborhoodId)
                                ";
                    cmd.Parameters.AddWithValue("@firebaseUserId", userProfile.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@name", userProfile.Name);
                    cmd.Parameters.AddWithValue("@email", userProfile.Email);
                    cmd.Parameters.AddWithValue("@imageLocation", userProfile.ImageLocation == null ? DBNull.Value : userProfile.ImageLocation);
                    cmd.Parameters.AddWithValue("@neighborhoodId", userProfile.NeighborhoodId);

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
                                ImageLocation = @imageLocation
                            WHERE Id = @id
                            ";

                    cmd.Parameters.AddWithValue("@id", userProfile.Id);
                    cmd.Parameters.AddWithValue("@name", userProfile.Name == null ? DBNull.Value : userProfile.Name);
                    cmd.Parameters.AddWithValue("@email", userProfile.Email == null ? DBNull.Value : userProfile.Email);
                    cmd.Parameters.AddWithValue("@imageLocation", userProfile.ImageLocation == null ? DBNull.Value : userProfile.ImageLocation);

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
                                       SELECT up.Id AS UserProfileId, up.Name AS UserProfileName, up. Email,
                                        up.ImageLocation, up.FirebaseUserId, up.NeighborhoodId AS UserProfileNeighborhoodId, up.IsAdmin,
                                        n.Id AS NeighborhoodId, n.Name AS NeighborhoodName
                                        FROM UserProfile up
                                        LEFT JOIN Neighborhood n ON up.NeighborhoodId = n.Id
                                      WHERE FirebaseUserId = @FirebaseUserId
                                       ";

                    cmd.Parameters.AddWithValue("@FirebaseUserId", firebaseUserId);

                    UserProfile profile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                        {
                        profile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Name = reader.GetString(reader.GetOrdinal("UserProfileName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            NeighborhoodId = reader.GetInt32(reader.GetOrdinal("UserProfileNeighborhoodId")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin")),
                            Neighborhood = new Neighborhood()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("NeighborhoodId")),
                                Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                            }
                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))
                        {
                            profile.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));
                        }
                    }
                    reader.Close();

                    return profile;
                }
            }
        }


    }
}
