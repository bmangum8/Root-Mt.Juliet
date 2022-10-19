using System;

namespace RootMJ.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int TreeId { get; set; }
        public int UserProfileId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCompleted { get; set; }

    }
}
