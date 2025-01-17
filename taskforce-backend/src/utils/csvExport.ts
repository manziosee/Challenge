import { Parser } from 'json2csv';

export const generateCSV = (data: any[]) => {
  const parser = new Parser();
  return parser.parse(data);
};