using RootMJ.Models;
using System.Collections.Generic;

namespace RootMJ.Repositories
{
    public interface ITreeRepository
    {
        void AddTree(Tree tree);
        void DeleteTree(int treeId);
        List<Tree> GetAllTrees();
        void UpdateTree(Tree tree);
        Tree GetTreeById(int id);
    }
}