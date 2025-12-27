
import { GoogleGenAI } from "@google/genai";

// Use Gemini 3 Flash for text generation task
export const generateVideoCaption = async (videoTitle: string, category: string) => {
  try {
    // Initialize GoogleGenAI with API key from environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tạo một mô tả portfolio chuyên nghiệp và hấp dẫn (tối đa 2 câu) bằng TIẾNG VIỆT cho dự án của một editor có tiêu đề "${videoTitle}" thuộc danh mục "${category}". Giọng văn hiện đại, sáng tạo và chuyên nghiệp.`,
    });
    // Access response.text directly as a property
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nội dung video được dàn dựng chuyên nghiệp, tập trung vào mạch cảm xúc và tiêu chuẩn sản xuất cao.";
  }
};
