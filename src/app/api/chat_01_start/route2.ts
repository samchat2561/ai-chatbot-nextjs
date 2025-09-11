import { NextResponse } from "next/server"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export async function POST() {
  // สร้าง instance ของ GoogleGenerativeAI
    const model = new ChatGoogleGenerativeAI({
        model: process.env.GOOGLE_MODEL_NAME || "gemini-2.5-flash", // fallback ถ้าไม่มี env var
        temperature: 0.7, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1 // 0 คือ ตอบตรง ๆ // 1 คือ ตอบแบบสร้างสรรค์
        maxRetries: 2, // จำนวนครั้งสูงสุดในการลองใหม่
        maxOutputTokens: 2048, // จำนวนคำตอบสูงสุดที่ต้องการ 300 token (สำหรับ Gemini)
    })

  // กำหนดข้อความที่ต้องการแปล
  const input = `Translate "I love programming" into Thai.`

  // Model จะทำการแปลข้อความ
  const response = await model.invoke(input)

  // แสดงผลลัพธ์
  console.log(response) // ผลลัพธ์: ฉันรักการเขียนโปรแกรม

  // try...catch เช็ค error 
  try {
    const response = await model.invoke([
        {
            role: "system",
            content:
            "คุณเป็นจัดการฝ่ายการเงินของบริษัท คุญตอบคำถามให้พนักงานในบริษัทในเรื่องการเงิน",
        },
        {
            role: "human", // "human" เป็น alias ของ "user"
            content: "สวัสดีครับ งบประมาณปีนี้เป็นอย่างไรบ้าง?",
        },
    ])

    // ดึงชื่อโมเดลจริงจาก metadata (บาง provider ใส่ model หรือ model_name)
    const meta = response.response_metadata || {}
    const usedModel = meta.model || meta.model_name || "unknown"

    // ส่งกลับทั้งคำตอบและชื่อโมเดล (จะได้เห็นชัดว่า “ตอบจากโมเดลอะไร”)
    return NextResponse.json({
        content: response.content,
        usedModel,
    })

  } catch (error) {
        // Handle error
        console.error("Error:", error)
        return NextResponse.json({ error: "An error occurred" })
  }
}