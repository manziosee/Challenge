import axios from 'axios';

export const convertCurrency = async (amount: number, from: string, to: string): Promise<number> => {
  const apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;
  const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

  try {
    const response = await axios.get(url);
    const rates = response.data.rates;

    // Check if the rates for 'from' and 'to' currencies exist
    if (!rates[from]) {
      throw new Error(`Currency rate for '${from}' not found.`);
    }
    if (!rates[to]) {
      throw new Error(`Currency rate for '${to}' not found.`);
    }

    const convertedAmount = (amount / rates[from]) * rates[to];
    return convertedAmount;
  } catch (error) {
    // Provide a more informative error message
    if (error instanceof Error) {
      throw new Error(`Error converting currency: ${error.message}`);
    } else {
      throw new Error('Error converting currency: An unknown error occurred.');
    }
  }
};