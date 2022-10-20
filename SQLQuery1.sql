SELECT up.Id AS UserProfileId, up.Name AS UserProfileName, up. Email,
                                up.ImageLocation, up.NeighborhoodId AS UserProfileNeighborhoodId, 
                                n.Id AS NeighborhoodId, n.Name AS NeighborhoodName
                            FROM UserProfile up
                            LEFT JOIN Neighborhood n ON up.NeighborhoodId = n.Id

SELECT up.Id AS UserProfileId, up.Name AS UserProfileName, up. Email,
                                       up.ImageLocation, up.NeighborhoodId AS UserProfileNeighborhoodId, 
                                       n.Id AS NeighborhoodId, n.Name AS NeighborhoodName
                                    FROM UserProfile up
                                    LEFT JOIN Neighborhood n ON up.NeighborhoodId = n.Id
                                    WHERE up.Id = 1;