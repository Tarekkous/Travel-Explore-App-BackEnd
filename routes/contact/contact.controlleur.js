const fs = require("fs").promises;



exports.postContact = async (req, res) => {
try {
     fs.readFile("./Messages.json").then((fileContent) => {
        // console.log(req.body);
        let msgs = JSON.parse(fileContent)
        msgs.push(req.body);
    
        fs.writeFile("./Messages.json", JSON.stringify(msgs));
      });
      res.json("object Created succesfully!");
} catch (err) {
    console.warn(err.message);
}
};
