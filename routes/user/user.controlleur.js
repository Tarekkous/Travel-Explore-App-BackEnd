const pool = require ('../../db')
const jwt = require('jsonwebtoken') 
require('dotenv').config()
const bcrypt = require('bcrypt')


// !METHODE GET
exports.getUser = 
 async (req, res) => {

    try {
      const allUsers = await pool.query('SELECT * FROM "user"');
      // console.log('HERE USER 123',req.user.name.user_firstName);
      // console.log(allUsers.rows[0].user_firstname);
      // console.log( 'filter log ::=> ' ,allUsers.rows.filter(user => user.name === req.user.name));
      const usersFiltred = allUsers.rows.filter(post => post.user_mail === req.user.name.user_mail)
      res.json(usersFiltred);
    } catch (err) {
      console.log(err.message);
    }
};

exports.authFct = (authenticateToken)

//! Function for VERIFY a TOKEN 
function authenticateToken (req,res,next) {
  const authHeader = req.headers['authorization']
  console.log(authHeader);
  //on a enlevé le index [1] pour afficher le TOKEN  ' (split[1])
  const TOKEN = authHeader && authHeader.split(' ')[1] 
  console.log('voici le TOKEN : ' ,TOKEN);
  if (TOKEN == null) return res.sendStatus(401)
  // 401 unauthorized 
  jwt.verify(TOKEN, process.env.ACCESS_TOKEN_SECRET , (err,data)=>{
    if(err) return res.sendStatus(403)
    // 403 Forbidden 
    req.user = data
    console.log('ici USER == > ' ,data);
    next()  
  })
};


//! METHODE POST LOGIN
exports.postLogin =
  async (req, res) => {
    try {
      console.log(req.body);
      const {user_mdp, user_mail } = req.body;
      const loginUser = await pool.query(
        `SELECT * FROM "user" WHERE user_mail = $1`, [user_mail]
      );
      console.log('ici loginUser.rows.mdp : ' ,loginUser.rows[0].user_mdp);
      // on vérifie si on reçoit tout dans le backend (mail + motdepasse)
        if(loginUser.rows.length === 0) return res.status(401).send('Invalid mail')
        // Comparer le mot de passe entré et le mot de passe crypté 
        const validPassword = await bcrypt.compare(user_mdp, loginUser.rows[0].user_mdp)
        if (!validPassword) return res.status(400).send('Invalid Password')
        // Générer un TOKEN 
      const username = {name : req.body}
      // jwt.sign(payload,secretPrivateKey)
      const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
      res.json({loginUser:loginUser.rows[0], accessToken:accessToken});


    } catch (err) {
      console.error("ici erreur :", err.message);
      res.status(401).send("Please use another mail Adress");
    }
  }
// !METHODE POST Register

exports.postRegister =
  async (req, res) => {
    try {
      const { user_firstName, user_lastName, user_mail, user_mdp } = req.body;
      // console.log(user_firstName);
      // console.log(user_lastName);
      // console.log(user_mail);
      // console.log(user_mdp);
      // console.log(req.body);

      //! hashage mdp 
      const haschedPassword = await bcrypt.hash(user_mdp,10) //10 correspond au genSalt()
      console.log(haschedPassword);

      const createNewUser = await pool.query(
        `INSERT INTO "user" (user_firstName,user_lastName,user_mail,user_mdp) VALUES ($1,$2,$3,$4) RETURNING *`,
        [user_firstName, user_lastName, user_mail, haschedPassword]
      );

      res.status(200).json(createNewUser);
    } catch (err) {
      console.error("ici erreur :", err.message);
      res.status(401).send("Please use another mail Adress")
    }
  };


// !METHODE PUT

  exports.putUser = 
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const { user_firstName, user_lastName, user_mail, user_mdp } = req.body;
      const hashedPwd = await bcrypt.hash(utilisateur_mdp, 10);
      console.log('Hashed password', hashedPwd);
      const userUpdated = await pool.query(
        'UPDATE "user" SET user_firstName= $1,user_lastName= $2,user_mail= $3,user_mdp= $4 WHERE user_id = $5',
        [user_firstName, user_lastName, user_mail, hashedPwd, id]
      );
      res.json("user updated !");
    } catch (err) {
      console.log(err.message);
    }
  }
// !METHODE DELETE

  exports.deleteUser = 
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const deleteUser = await pool.query(
        `DELETE FROM "user" WHERE user_id =${id}`
      );
      res.json("Deleted !!");
    } catch (err) {
      console.log("Error ::::::", err.message);
    }
  }
// !METHODE GetOneUser

  exports.getOneUser =
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query('SELECT * FROM "user" WHERE user_id=$1', [
        id,
      ]);
      res.json(user.rows[0]);
      console.log(user.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  }

