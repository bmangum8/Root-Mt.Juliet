using RootMJ.Models;
using System.Collections.Generic;

namespace RootMJ.Repositories
{
    public interface IRequestRepository
    {
        List<Request> GetAllRequests();
        void AddRequest(Request request);
        void UpdateRequest(Request request);    
        Request GetRequestById(int id);
        void DeleteRequest(int id);
    }
}