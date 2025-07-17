export interface PersonalData {
  sexo: string;
  entidad: string;
  nacionalidad: string;
  statusCurp: string;
  nombres: string;
  segundoApellido: string;
  claveEntidad: string;
  docProbatorio: number;
  fechaNacimiento: string;
  primerApellido: string;
  curp: string;
}

export interface DocumentData {
  foja: string;
  claveEntidadRegistro: string;
  numActa: string;
  tomo: string;
  anioReg: string;
  municipioRegistro: string;
  libro: string;
  entidadRegistro: string;
  claveMunicipioRegistro: string;
}

export interface CurpResponseData {
  personal_data: PersonalData;
  document_data: DocumentData;
}

export interface CurpAPIResponse {
  data: CurpResponseData;
  errors: string[] | null;
}
