import axios from "axios";
import { format } from "date-fns";
import type { CurpAPIResponse } from "../types/curp";

export const queryByCurp = async (curp: string, apiKey: string): Promise<CurpAPIResponse> => {
  try {
    const response = await axios.post("/api/proxy", {
      endpoint: "curp/query",
      data: { curp },
      apiKey,
    });

    return response.data;
  } catch (error) {
    console.error("Error al consultar por CURP:", error);
    throw new Error("No se pudo consultar el CURP");
  }
};

export const queryByPersonalData = async (
  data: {
    name: string;
    first_surname: string;
    last_surname: string;
    birthdate: Date;
    gender: string;
    state: string;
  },
  apiKey: string
): Promise<CurpAPIResponse> => {
  try {
    const response = await axios.post("/api/proxy", {
      endpoint: "curp/reverse-query",
      data: {
        name: data.name,
        first_surname: data.first_surname,
        last_surname: data.last_surname,
        gender: data.gender,
        state: data.state,
        birthdate: format(data.birthdate, "dd/MM/yyyy"),
      },
      apiKey,
    });

    return response.data;
  } catch (error) {
    console.error("Error al consultar por datos personales:", error);
    throw new Error("No se pudo consultar los datos personales");
  }
};
