CREATE TABLE review_links
(
    id         serial      not null primary key,
    review_id  int         not null references public.reviews,
    name       text,
    href       text        not null,
    created_at timestamptz not null DEFAULT NOW(),
    deleted_at timestamptz
);

CREATE INDEX idx_review_links_review_id ON review_links (review_id);
CREATE INDEX idx_review_links_deleted_at ON review_links (deleted_at);
