using RootMJ.Models;
using System.Collections.Generic;

namespace RootMJ.Repositories
{
    public interface IRequestRepository
    {
        List<Request> GetAllRequests();
        void AddRequest(Request request);
    }
}