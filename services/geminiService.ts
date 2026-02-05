import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';
import { products } from '../data/mockData';

// Initialize the client
// In a real app, strict error handling for missing key is needed.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const aiSearch = async (query: string): Promise<string[]> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini. Returning mock text search.");
    // Fallback simple search if no key
    const lowerQuery = query.toLowerCase();
    return products
      .filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      )
      .map(p => p.id);
  }

  try {
    // Create a context-aware prompt
    const productContext = products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      specs: p.specifications
    }));

    const prompt = `
      You are an intelligent search assistant for an industrial product catalog.
      
      Here is the product catalog data:
      ${JSON.stringify(productContext)}
      
      User Search Query: "${query}"
      
      Task:
      1. Analyze the user's intent.
      2. Find products that match the query conceptually, even if keywords don't match exactly.
      3. Return a JSON array containing ONLY the IDs of the matching products, sorted by relevance.
      4. If no products match, return an empty array.
      
      Output format: ["ID1", "ID2", ...]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text || "[]";
    // Clean up markdown code blocks if present
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const getAIRecommendations = async (product: Product): Promise<string[]> => {
  if (!apiKey) return [];

  try {
     const productContext = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      specs: p.specifications
    }));

    const prompt = `
      I am viewing this product:
      ${JSON.stringify({ name: product.name, category: product.category, description: product.description })}
      
      Based on the following catalog, suggest up to 3 related or complementary products (e.g., if viewing a motor, suggest a controller or pump that fits).
      
      Catalog:
      ${JSON.stringify(productContext)}
      
      Return ONLY a JSON array of product IDs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text || "[]";
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return [];
  }
};