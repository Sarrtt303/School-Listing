// src/app/api/getSchools/route.ts
import { connectDB } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface School extends RowDataPacket {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
}

// Named export GET handler (App Router)
export async function GET() {
  try {
    const conn = await connectDB();
    const [rows] = await conn.execute<School[]>(
      "SELECT id, name, address, city, image FROM schools"
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("DB Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
