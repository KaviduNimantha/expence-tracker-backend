const {getConnection} = require('../db/db_connection');
const db = getConnection();

exports.createExpense = (req, res) => {
  const { reason, amount, expense_date } = req.body;
  const user_id = req.user.id;

  // image path
  const bill_image = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  const sql = `
    INSERT INTO expenses (user_id, reason, amount, expense_date, bill_image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, reason, amount, expense_date, bill_image],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: 'Expense added successfully',
      });
    }
  );
};



exports.getAllExpenses = (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT id, reason, amount, expense_date, bill_image
    FROM expenses
    WHERE user_id = ?
    ORDER BY expense_date DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

exports.updateExpense = (req, res) => {
  const expense_id = req.params.id;
  const user_id = req.user.id;
  const { reason, amount, expense_date, bill_image } = req.body;

  const sql = `
    UPDATE expenses
    SET reason = ?, amount = ?, expense_date = ?, bill_image = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [reason, amount, expense_date, bill_image, expense_id, user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.json({ message: 'Expense updated successfully' });
    }
  );
};

exports.searchByDate = (req, res) => {
  const user_id = req.user.id;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      message: 'date query parameter is required (YYYY-MM-DD)'
    });
  }

  const sql = `
    SELECT 
      id,
      reason,
      amount,
      DATE(expense_date) AS expense_date,
      bill_image
    FROM expenses
    WHERE user_id = ? AND DATE(expense_date) = ?
    ORDER BY expense_date DESC
  `;

  db.query(sql, [user_id, date], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};
