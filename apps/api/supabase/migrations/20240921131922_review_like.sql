CREATE TABLE review_like
(
    id         serial      not null primary key,
    review_id  int         not null,
    user_id    uuid        not null references auth.users,
    created_at timestamptz not null DEFAULT NOW(),
    deleted_at timestamptz
);

CREATE INDEX idx_review_id_user_id_deleted_at ON review_like(review_id, user_id, deleted_at);
CREATE UNIQUE INDEX unique_review_user ON review_like(review_id, user_id) WHERE deleted_at IS NULL;
