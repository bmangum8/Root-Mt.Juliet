using System.Collections.Generic;
using RootMJ.Models;

namespace RootMJ.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAllUsers();
        void Add(UserProfile userProfile);
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Delete(int id);
    }
}
