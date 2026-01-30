INSERT INTO recipes (
    title,
    protein_type,
    status,
    portions_remaining,
    created_at,
    updated_at
) VALUES
('Kycklingcurry', 'MEAT', 'AVAILABLE', 3, CURRENT_DATE, CURRENT_DATE),
('Ugnspannkaka',        'MEAT', 'AVAILABLE', 2, CURRENT_DATE, CURRENT_DATE),
('Korv med bröd',       'MEAT', 'AVAILABLE', 2, CURRENT_DATE, CURRENT_DATE),
('Nudlar med dumpling',      'VEGETARIAN', 'AVAILABLE', 4, CURRENT_DATE, CURRENT_DATE),

('Fish tacos',        'FISH', 'UPCOMING', 2, CURRENT_DATE, CURRENT_DATE),
('Pork ramen',        'MEAT', 'UPCOMING', 3, CURRENT_DATE, CURRENT_DATE),
('Lentil stew',       'VEGETARIAN', 'UPCOMING', 4, CURRENT_DATE, CURRENT_DATE);
