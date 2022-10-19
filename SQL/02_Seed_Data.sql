SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
    ([Id], [Name], [Email], [NeighborhoodId], [ImageLocation], [FirebaseUserId], [IsAdmin])
VALUES
    (1, 'Juliet', 'j@betsyross.com', 1, NULL, 'gUp2UoUqM0bPtMy5P0DMvd3HDa03', 1),
    (2, 'Penny', 'p@betsyross.com', 2, NULL, 'e0GK6YmyNsg2BgYg5SBjORvDsTx1', 0),
    (3, 'Elliot', 'e@betsyross.com', 3, NULL, 'mXQ60QBN6OZKpy8r6IhUTQaOIvy2', 0);
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Neighborhood] ON
INSERT INTO [Neighborhood]
    ([Id], [Name])
VALUES
    (1, 'Mt.Vernon Estates'),
    (2, 'Willoughby Station'),
    (3, 'Hickory Hills')
SET IDENTITY_INSERT [Neighborhood] OFF


SET IDENTITY_INSERT [Tree] ON
INSERT INTO [Tree]
    ([Id], [Name], [Species], [Description], [ImageLocation])
VALUES
    (1, 'Serviceberry', 'Amelanchier arborea', 'Serviceberry is another beautiful flowering understory tree that will bring all the birds to the yard! It typically grows only 15-25 feet tall. Its pale blossoms are smaller than that of Sweetbay Magnolia, but more densely clustered, almost like a North American version of a cherry tree. And speaking of fruits, the berries on a Serviceberry are edible! Resist the temptation to pluck them while they’re a vivid red, and wait until they’re plum-colored for the sweetest taste. The berries grow in abundance, so there should be plenty for you and the many birds that feast on Serviceberries. The berries typically ripen around June, which is why another name for this tree is Juneberry. In the fall, Serviceberries turn lovely shades of red and orange. This tree prefers full sun or partial shade.', 'https://rootnashville.org/wp-content/uploads/2022/06/serviceberry-arbor-day-pic-300x300.png'),
    (2, 'Sweetbay Magnolia', 'Magnolia virginiana', 'Sweetbay Magnolias are some of our favorite tiny Magnolias. They have all the charm of Southern Magnolias, in half the space (or less). These multi-stem beauties typically only grow to be about 10-35 feet tall, and roughly the same width. Large, fragrant flowers bloom from their branches in spring, and later in the year give way to vibrant berry-like seeds. Sweetbay Magnolias are semi-evergreen, which means they hold on to their dual-toned leaves long after most trees have gone bare. Every part of this tree is a tasty treat for wildlife; expect to see many songbirds and other woodland creatures if you plant this tree in your yard. This tree is so tasty, in fact, that we recommend setting up a deer guard (if you have deer in your neighborhood).
        Sweetbays prefer full sun or partial shade. They also prefer moist soils and can tolerate periodic flooding.', 'https://rootnashville.org/wp-content/uploads/2022/06/sweetbay-gardening-know-how-300x283.png'),
    (3, 'Swamp White Oak', 'Quercus bicolor', 'Swamp White Oaks are grand, sturdy trees with dual toned leaves – glossy and dark on top, and a silvery white on the bottom. They belong to the White Oak group, meaning (among other things) that their leaves have rounded edges and their acorns take just one year to mature. Swamp White Oaks typically grow to be around 50-60 feet tall and almost as wide, making them excellent shade trees. They grow more quickly than other White Oaks, but are still very long-lived, often living over 300 years. 
         Unsurprisingly, Swamp White Oaks like to grow in moist bottomlands and areas with periodic flooding, but they are tolerant of a broad range of soil conditions and can even withstand drought. They prefer full sun. If you’ve been reading our blogs for a while now, you already know that native oaks are the best trees you can plant if you want to see more butterflies and birds. They host more species of caterpillar than any other plant. Their acorns are also an important food source for wildlife like deer, turkeys, ducks, and of course squirrels. For this reason, the Cumberland River Compact makes sure to include an oak in its tree species catalog each year.', 'https://rootnashville.org/wp-content/uploads/2022/06/swamp-white-oak-Iowa-pic-284x300.png')
SET IDENTITY_INSERT [Tree] OFF


SET IDENTITY_INSERT [Request] ON
INSERT INTO [Request]
    ([Id], [TreeId], [UserProfileId], [DateCreated], [DateCompleted])
VALUES
    (1, 1, 1, 09/19/2016, null),
    (2, 2, 2, 02/05/2020, null),
    (3, 3, 3, 04/23/2021, null)
SET IDENTITY_INSERT [Request] OFF