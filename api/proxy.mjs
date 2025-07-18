import axios from "axios";
import { URLSearchParams } from "url";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { endpoint, data, apiKey } = req.body;

  console.log("REQ!!!", req);

  console.log("data", data);
  console.log("endpoint", endpoint);

  if (!endpoint || !data || !apiKey) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const allowed = ["curp/query", "curp/reverse-query"];
  if (!allowed.includes(endpoint)) {
    return res.status(400).json({ error: "Endpoint no permitido" });
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
  } catch (error) {
    console.error("Error en proxy Vercel:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al consultar API externa" });
  }
};
