using System;
using System.Collections.Generic;

namespace RootMJ.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int TreeId { get; set; }
        public int UserProfileId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCompleted { get; set; }
        public Neighborhood Neighborhood { get; set; }
        
        //public List<Tree> Trees { get; set; }
        public UserProfile UserProfile { get; set; }
        public Tree Tree { get; set; }
    }
}
