CREATE TABLE follows
(
    id           serial      not null primary key,
    user_id      uuid        not null references auth.users,
    following_id uuid        not null references auth.users,
    created_at   timestamptz not null DEFAULT NOW(),
    deleted_at   timestamptz
);

CREATE INDEX idx_follows_user_id ON follows (user_id);
CREATE INDEX idx_follows_following_id ON follows (following_id);
CREATE INDEX idx_follows_deleted_at ON follows (deleted_at);
CREATE UNIQUE INDEX unique_follows ON follows (user_id, following_id) WHERE deleted_at IS NULL;
