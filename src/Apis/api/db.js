import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Construct the absolute path to db.json
    const dbPath = path.join(process.cwd(), "db.json");

    // Check if the file exists
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ message: "db.json file not found" });
    }

    // Read and parse the file
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Check if 'products' exists
    if (!dbData.products) {
      return res
        .status(404)
        .json({ message: "'products' key not found in db.json" });
    }

    // Return the products array
    res.status(200).json(dbData.products);
  } catch (error) {
    // Catch any other errors
    res.status(500).json({
      message: "Error processing request",
      error: error.message,
    });
  }
}
