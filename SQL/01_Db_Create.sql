CREATE TABLE [Neighborhood] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Email] nvarchar(255) NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255),
  [NeighborhoodId] int NOT NULL,
  [FirebaseUserId] string NOT NULL,
  [IsAdmin] bit
)
GO

CREATE TABLE [Request] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [TreeId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [DateCreated] datetime NOT NULL,
  [DateCompleted] datetime
)
GO

CREATE TABLE [Tree] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Species] nvarchar(255),
  [Description] nvarchar(255),
  [ImageLocation] nvarchar(255)
)
GO

ALTER TABLE [Request] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([NeighborhoodId]) REFERENCES [Neighborhood] ([Id])
GO

ALTER TABLE [Request] ADD FOREIGN KEY ([TreeId]) REFERENCES [Tree] ([Id])
GO
