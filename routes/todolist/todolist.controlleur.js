const pool = require('../../db')


exports.getLists =
 async (req, res) => {
    try {
      const allLists = await pool.query("SELECT * FROM todolist");
      res.json(allLists.rows);
    } catch (err) {
      console.log(err.message);
    }
  }
exports.postList =
 async (req, res) => {
    try {
      const { id } = req.params;
      const { list_title } = req.body;
      const createList = await pool.query(
        "INSERT INTO todolist (user_id, list_title) VALUES ($1,$2)",
        [id , list_title]
      );
      res.json(createList);
      console.log(createList);
    } catch (err) {
      console.log(err.message);
    }
  }
  exports.updateList = 
   async (req, res) => {
    try {
      const { id } = req.params;
      const {list_title } = req.body;
      const userUpdated = await pool.query(
        'UPDATE "todolist" SET list_title= $1 WHERE todolist_id = $2' ,
        [list_title, id]
      );
      res.json(userUpdated);
    } catch (err) {
      console.log(err.message);
    }
  }

  exports.deleteList = 
   async (req, res) => {
    try {
      const { id } = req.params;
      const deleteList = await pool.query
      (`DELETE FROM todolist WHERE user_id = $1`,[id]);
      res.json('Deleted !!');
    } catch (err) {
      console.log('Error ::::::',err.message);
    }
  }
  exports.deleteOneList =
  async (req,res)=> {
  try {  
  const {id1} = req.params
  const {id2} = req.params
  const deleteOneList = await pool.query 
  ('DELETE FROM todolist WHERE user_id = $1 and todolist_id = $2' ,[id1,id2])
    res.json('Deleted')
  } catch (error) {
    console.warn(error.message);
    res.status(401).send('Failed to delete List!')
  }
  };
  exports.getOneList =
  async (req, res) => {
    const { id } = req.params;
    const todolistUser = await pool.query(
      " SELECT * FROM todolist WHERE user_id=$1",
      [id]
    );
    res.json(todolistUser.rows);
  };