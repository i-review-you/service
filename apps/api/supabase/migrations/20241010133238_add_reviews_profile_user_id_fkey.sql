ALTER TABLE reviews
    ADD CONSTRAINT reviews_profile_user_id_fkey FOREIGN KEY (user_id) REFERENCES profile (user_id);
