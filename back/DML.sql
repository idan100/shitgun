INSERT INTO keys.classes (class_number, has_projector, has_computers)
SELECT
  generate_series AS class_number,
  (random() < 0.5) AS has_projector,
  (random() < 0.5) AS has_computers
FROM generate_series(100, 110, 1);
