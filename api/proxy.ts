import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { endpoint, data, apiKey } = req.body;

  if (!endpoint || !data || !apiKey) {
    res.status(400).json({ error: "Faltan datos" });
    return;
  }

  const allowed = ["curp/query", "curp/reverse-query"];
  if (!allowed.includes(endpoint)) {
    res.status(400).json({ error: "Endpoint no permitido" });
    return;
  }

  try {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)));

    const response = await axios.post(`https://identity.sandbox.prometeoapi.com/${endpoint}`, formData, {
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error en proxy Vercel:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al consultar API externa" });
  }
}
