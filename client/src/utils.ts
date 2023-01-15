import { Diagnosis } from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member : ${JSON.stringify(value)}`
  );
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("string value is incorrect");
  }
  return text;
};

export const parseDate = (date: unknown): boolean => {
  if (!isString(date)) {
    throw new Error("Date is not a String");
  }
  return Boolean(Date.parse(date));
};

export const parseDiagnoses = (
  diagnoses: unknown
): Array<Diagnosis["code"]> => {
  const codes: Array<Diagnosis["code"]> = [];
  if (!diagnoses) {
    throw new Error("Incorrect or missing diagnoses information");
  }
  if (!Array.isArray(diagnoses)) {
    throw new Error("Diagnoses Codes needs to be an Array");
  }

  diagnoses.forEach((code) => {
    if (!isString(code)) {
      throw new Error("Code needs to be an Array of stings");
    }
    codes.push(code);
  });
  return codes;
};
