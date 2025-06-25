
// ЧАСТИНА 1: Базові агрегаційні операції

// 1. Відфільтрувати замовлення за останні 3 місяці
db.orders.aggregate([
  {
    $match: {
      date: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 3))
      }
    }
  }
]);

// 2. Групування замовлень за місяцем
db.orders.aggregate([
  {
    $group: {
      _id: { $month: "$date" },
      totalOrders: { $sum: 1 }
    }
  }
]);

// 3. Сортування за сумою замовлення
db.orders.aggregate([
  {
    $addFields: {
      totalAmount: {
        $sum: {
          $map: {
            input: "$items",
            as: "item",
            in: { $multiply: ["$$item.price", "$$item.quantity"] }
          }
        }
      }
    }
  },
  { $sort: { totalAmount: -1 } }
]);

// ЧАСТИНА 2: Робота з масивами

// 4. Розгорнути масив items
db.orders.aggregate([
  { $unwind: "$items" }
]);

// 5. Підрахунок кількості проданих одиниць товарів
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product",
      totalSold: { $sum: "$items.quantity" }
    }
  },
  { $sort: { totalSold: -1 } }
]);

// ЧАСТИНА 3: З’єднання колекцій ($lookup)

// 6. Отримати інформацію про клієнтів у замовленнях
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" }
]);

// 7. Найбільш активні клієнти
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      orderCount: { $sum: 1 }
    }
  },
  { $sort: { orderCount: -1 } },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $project: {
      _id: 0,
      name: "$customer.name",
      email: "$customer.email",
      orderCount: 1
    }
  }
]);

// ЧАСТИНА 4: Оптимізація запитів

// 8. Перевірка продуктивності запиту
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product",
      totalSold: { $sum: "$items.quantity" }
    }
  }
]).explain("executionStats");

// 9. Оптимізований запит з фільтром
db.orders.aggregate([
  { $match: { status: "Completed" } },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product",
      totalSold: { $sum: "$items.quantity" }
    }
  }
]);
