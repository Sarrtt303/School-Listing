import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { connectDB } from "@/lib/db"; // adjust based on your project

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const image = formData.get("image") as File | null;

    let imagePath = "";

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(process.cwd(), "public/schoolImages", fileName);

      await fs.writeFile(filePath, buffer);
      imagePath = fileName; // relative path for frontend
    }

    const db = await connectDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
    );

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding school" }, { status: 500 });
  }
}
