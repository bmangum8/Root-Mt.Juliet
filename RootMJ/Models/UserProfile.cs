namespace RootMJ.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ImageLocation { get; set; }
        public int NeighborhoodId  { get; set; }
        public string FirebaseUserId { get; set; }
        public bool IsAdmin { get; set; }
        public Neighborhood Neighborhood { get; set; }

    }
}
