ALTER TABLE reviews
    ADD CONSTRAINT reviews_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id);
