ALTER TABLE UserProfile
DROP COLUMN UserTypeId;

ALTER TABLE UserProfile
ALTER COLUMN FirebaseUserId varchar;