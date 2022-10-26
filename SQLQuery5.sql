 SELECT r.Id AS RequestId, r.TreeId, r.UserProfileId, r.DateCreated, r.DateCompleted,
                                t.Name AS TreeName, up.Name AS UserProfileName, n.Name AS NeighborhoodName
                            FROM Request r
                            LEFT JOIN Tree t ON t.Id = r.TreeId
                            LEFT JOIN UserProfile up ON up.Id = r.UserProfileId
                            LEFT JOIN Neighborhood n ON n.Id = up.NeighborhoodId