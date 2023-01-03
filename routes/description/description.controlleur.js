const pool = require("../../db");

exports.getDescription = async (req, res) => {
  try {
    const alldescriptions = await pool.query("SELECT * FROM DETAIL");
    res.json(alldescriptions.rows);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getOneDescription = async (req, res) => {
  const { id } = req.params;
  const list_description = await pool.query(
    "SELECT * FROM detail WHERE todolist_id= $1",
    [id]
  );
  res.json(list_description.rows);
};

exports.postDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const createDescription = await pool.query(
      "INSERT INTO detail (todolist_id , description) VALUES ($1,$2) RETURNING *",
      [id, description]
    );
    res.json(createDescription.rows);
    console.log(createDescription);
  } catch (err) {
    console.log(err.message);
  }
};
exports.updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(id);
    console.log(description);
    const userUpdated = await pool.query(
      "UPDATE detail SET description= $1 WHERE detail_id = $2",
      [description, id]
    );
    res.json(userUpdated.rows);
  } catch (err) {
    console.log(err.message);
  }
};
exports.deleteDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const description_delete = await pool.query(
      "DELETE FROM detail WHERE detail_id = $1",
      [id]
    );
    res.json("Description Deleted !!");
  } catch (err) {
    console.log(err.message);
  }

  
};
exports.deleteAllDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAllDescriptions = await pool.query(
      "DELETE FROM detail WHERE todolist_id = $1",
      [id]
    );
    res.json("Description Deleted !!");
  } catch (err) {
    console.log(err.message);
  }

  
};
