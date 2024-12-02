import fs from "fs";
import path from "path";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const dbPath = path.join(process.cwd(), "db.json");
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ message: "db.json not found" });
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    if (!dbData.products) {
      return res.status(404).json({ message: "No products found in db.json" });
    }

    return res.status(200).json(dbData.products); // return the products
  } catch (error) {
    console.error("Error loading products:", error);
    return res
      .status(500)
      .json({ message: "Failed to load products", error: error.message });
  }
}
