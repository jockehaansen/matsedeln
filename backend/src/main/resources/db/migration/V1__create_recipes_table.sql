CREATE TABLE recipes (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    protein_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    portions_remaining INT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
)