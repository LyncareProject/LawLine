const db = require("../models");
const jwt = require('jsonwebtoken');

const { forward: Forward } = db;
// const { JWT_SECRET_KEY } = require("../common");

// function generatePathToken(path) {
//   const token = jwt.sign({ path }, JWT_SECRET_KEY, { expiresIn: '1d' });
//   return token;
// }

exports.forwardPath = async (req, res) => {
  try {
    const path = req.params.path;
    // let token = req.headers.pathtoken;

    // if(token){
    //   token = token.split(' ')[1];
    //   console.log("token : ", token)
    //   jwt.verify(token, JWT_SECRET_KEY, (Error) => {
    //     if (!Error) {
    //       console.log('토큰 유효')
    //       return res.json({}); // 토큰이 유효하지 않음
    //     }
    //     console.log('토큰 유효하지 않음')     
    //   });
    // }
    // console.log('진행')     
    let forwardEntry = await Forward.findOne({ path: path });

    if (forwardEntry) {
      forwardEntry.count += 1;
      await forwardEntry.save();
    } else {
      forwardEntry = new Forward({ path: path, count: 1 });
      await forwardEntry.save();
    }

    // const pathToken = generatePathToken(path);
    // res.json({ pathToken });
    res.json({ message : "OK" });
  } catch (error) {
    console.error("Error during forwardPath:", error);
    res.status(500).json({ message: "Server error" });
  }
};

