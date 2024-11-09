CREATE TABLE review_images
(
    id         serial      not null primary key,
    review_id  int references public.reviews,
    object_id  uuid        not null references storage.objects,
    url        text        not null,
    sort_order smallint    not null,
    created_at timestamptz not null DEFAULT NOW()
);

CREATE INDEX idx_review_review_id ON review_images (review_id);
CREATE INDEX idx_review_images_object_id ON review_images (object_id);
