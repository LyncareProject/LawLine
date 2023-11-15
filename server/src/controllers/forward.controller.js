const db = require("../models");
const moment = require("moment");

const { forward: Forward } = db;

exports.forwardPath = async (req, res) => {
  try {
    const path = req.params.path;
    console.log(path);
    
    // Try to find the document with the given path
    let forwardEntry = await Forward.findOne({ path: path });

    if (forwardEntry) {
      // If the document exists, increment the count
      forwardEntry.count += 1;
      await forwardEntry.save();
    } else {
      // If the document does not exist, create a new one with count set to 1
      forwardEntry = new Forward({ path: path, count: 1 });
      await forwardEntry.save();
    }

    res.json({ message: "Path processed successfully", count: forwardEntry.count });
  } catch (error) {
    console.error("Error during forwardPath:", error);
    res.status(500).json({ message: "Server error" });
  }
};

