-- 1. Всі замовлення
SELECT * FROM orders;

-- 2. Замовлення лише від admin_user
SELECT * FROM orders o JOIN users u ON o.user_id = u.user_id WHERE u.username = 'admin_user';

-- 3. Сортування товарів за ціною
SELECT * FROM products ORDER BY price DESC;

-- 4. Кількість замовлень на клієнта
SELECT u.username, COUNT(o.order_id) AS total_orders
FROM users u
JOIN orders o ON u.user_id = o.user_id
GROUP BY u.username;

-- 5. Загальна сума всіх транзакцій
SELECT SUM(amount) AS total_sales FROM payments;

-- 6. Середня кількість товарів у замовленні
SELECT AVG(qty_count) FROM (
  SELECT COUNT(*) AS qty_count FROM order_items GROUP BY order_id
) AS sub;

-- 7. Унікальні категорії
SELECT DISTINCT category_name FROM categories;

-- 8. Мінімальна та максимальна ціна товару
SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM products;
