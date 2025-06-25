
-- Категорії
INSERT INTO categories (category_name) VALUES 
('Електроніка'), 
('Одяг'), 
('Книги');

-- Товари
INSERT INTO products (product_name, price, category_id) VALUES 
('Смартфон Samsung', 12000.00, 1),
('Футболка Nike', 800.00, 2),
('Книга "Мистецтво війни"', 300.00, 3);

-- Замовлення
INSERT INTO orders (product_id, quantity) VALUES 
(1, 2),
(3, 1);
SELECT 
    o.order_id, 
    p.product_name, 
    o.quantity, 
    p.price * o.quantity AS total_price,
    o.order_date
FROM orders o
JOIN products p ON o.product_id = p.product_id;
UPDATE products
SET price = 11000.00
WHERE product_name = 'Смартфон Samsung';
DELETE FROM orders
WHERE order_id = 2;
SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM orders;
