CREATE TABLE profile
(
    user_id    uuid not null primary key references auth.users,
    username   text not null,
    avatar_url text,
    name       text,
    biography  text
);

CREATE INDEX idx_profile_username ON profile (username);
CREATE UNIQUE INDEX unique_profile_userid ON profile (user_id);
CREATE UNIQUE INDEX unique_profile_username ON profile (username);
