// api/proxy.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { endpoint, data, apiKey } = req.body;

  if (!endpoint || !data || !apiKey) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  const allowedEndpoints = ["curp/query", "curp/reverse-query"];
  if (!allowedEndpoints.includes(endpoint)) {
    return res.status(400).json({ error: "Endpoint no permitido" });
  }

  try {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const response = await axios.post(`https://identity.sandbox.prometeoapi.com/${endpoint}`, formData, {
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    return res.status(200).json(response.data);
  } catch (err: any) {
    console.error("Error en proxy:", err.message);
    return res.status(500).json({ error: "Error al consultar la API externa" });
  }
}
