CREATE TABLE review_tags
(
    id         serial      not null primary key,
    review_id  int         not null references public.reviews,
    name       text        not null,
    created_at timestamptz not null DEFAULT NOW(),
    deleted_at timestamptz
);

CREATE INDEX idx_review_tags_review_id ON review_tags (review_id);
CREATE INDEX idx_review_tags_name ON review_tags (name);
CREATE INDEX idx_review_tags_deleted_at ON review_tags (deleted_at);
