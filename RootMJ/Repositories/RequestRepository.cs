﻿using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using RootMJ.Models;
using System;

namespace RootMJ.Repositories
{
    public class RequestRepository : BaseRepository, IRequestRepository
    {
        public RequestRepository(IConfiguration configuration) : base(configuration) { }

        public List<Request> GetAllRequests()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT r.Id AS RequestId, r.TreeId, r.UserProfileId, r.DateCreated, r.DateCompleted,
                                t.Name AS TreeName, up.Name AS UserProfileName, n.Name AS NeighborhoodName
                            FROM Request r
                            LEFT JOIN Tree t ON t.Id = r.TreeId
                            LEFT JOIN UserProfile up ON up.Id = r.UserProfileId
                            LEFT JOIN Neighborhood n ON n.Id = up.NeighborhoodId
                            ";

                    using (var reader = cmd.ExecuteReader())
                    {
                        List<Request> requests = new List<Request>();

                        while (reader.Read())
                        {
                            Request request = new Request()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("RequestId")),
                                TreeId = reader.GetInt32(reader.GetOrdinal("TreeId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                                Neighborhood = new Neighborhood()
                                {
                                    Name = reader.GetString(reader.GetOrdinal("NeighborhoodName"))
                                },
                                UserProfile = new UserProfile()
                                {
                                    Name = reader.GetString(reader.GetOrdinal("UserProfileName"))
                                },
                                Tree = new Tree()
                                {
                                    Name = reader.GetString(reader.GetOrdinal("TreeName"))
                                }
                            };

                            if (!reader.IsDBNull(reader.GetOrdinal("DateCompleted")))
                            {
                                request.DateCompleted = reader.GetDateTime(reader.GetOrdinal("DateCompleted"));
                            }

                            requests.Add(request);
                        }
                        return requests;
                    }
                }
            }
        }


        public void AddRequest(Request request)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO Request (TreeId, UserProfileId, DateCreated, DateCompleted)
                            OUTOUT INSERTED.ID
                            VALUES (@treeId, @userProfileId, @dateCreated, @dateCompleted)
                            ";
                    cmd.Parameters.AddWithValue("@treeId", request.TreeId);
                    cmd.Parameters.AddWithValue("@userProfileId", request.UserProfileId);
                    cmd.Parameters.AddWithValue("@dateCreated", request.DateCreated);
                    cmd.Parameters.AddWithValue("@dateCompleted", request.DateCompleted == null ? DBNull.Value : request.DateCompleted);

                    int newId = (int)cmd.ExecuteScalar();
                    request.Id = newId;
                }
            }
        }
    }
}