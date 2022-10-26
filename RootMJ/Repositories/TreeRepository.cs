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
    public class TreeRepository : BaseRepository, ITreeRepository
    {
        public TreeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tree> GetAllTrees()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT Id, Name, Species, Description, ImageLocation
                                FROM Tree
                                ";
                    using (var reader = cmd.ExecuteReader())
                    {
                        List<Tree> trees = new List<Tree>();

                        while (reader.Read())
                        {
                            Tree tree = new Tree()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            };

                            if (!reader.IsDBNull(reader.GetOrdinal("Species")))
                            {
                                tree.Species = reader.GetString(reader.GetOrdinal("Species"));
                            }

                            if (!reader.IsDBNull(reader.GetOrdinal("Description")))
                            {
                                tree.Description = reader.GetString(reader.GetOrdinal("Description"));
                            }

                            if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))
                            {
                                tree.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));
                            }

                            trees.Add(tree);
                        }

                        return trees;
                    }
                }
            }
        }

        public Tree GetTreeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name, Species, Description, ImageLocation    
                            FROM Tree
                            WHERE Id = @id
                            ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Tree tree = null;

                    if (reader.Read())
                    {
                        tree = new Tree()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Species = reader.GetString(reader.GetOrdinal("Species")),
                            Description = reader.GetString(reader.GetOrdinal("Description")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                        };
                    }

                    reader.Close();
                    return tree;
                }
            }
        }

        public void AddTree(Tree tree)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO Tree (Name, Species, Description, ImageLocation)
                            OUTPUT INSERTED.ID
                            VALUES (@name, @species, @description, @imageLocation)
                            ";

                    cmd.Parameters.AddWithValue("@name", tree.Name);
                    cmd.Parameters.AddWithValue("@species", tree.Species == null ? DBNull.Value : tree.Species);
                    cmd.Parameters.AddWithValue("@description", tree.Description == null ? DBNull.Value : tree.Description);
                    cmd.Parameters.AddWithValue("@imageLocation", tree.ImageLocation == null ? DBNull.Value : tree.ImageLocation);

                    int newId = (int)cmd.ExecuteScalar();
                    tree.Id = newId;
                }
            }
        }

        public void UpdateTree(Tree tree)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Tree 
                            SET Name = @name, 
                                Species = @species, 
                                Description = @description, 
                                ImageLocation = @imageLocation
                            WHERE Id = @id
                            ";

                    cmd.Parameters.AddWithValue("@id", tree.Id);
                    cmd.Parameters.AddWithValue("@name", tree.Name);
                    cmd.Parameters.AddWithValue("@species", tree.Species == null ? DBNull.Value : tree.Species);
                    cmd.Parameters.AddWithValue("@description", tree.Description == null ? DBNull.Value : tree.Description);
                    cmd.Parameters.AddWithValue("@imageLocation", tree.ImageLocation == null ? DBNull.Value : tree.ImageLocation);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTree(int treeId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Tree
                            WHERE Id = @id
                            ";
                    cmd.Parameters.AddWithValue("@id", treeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
