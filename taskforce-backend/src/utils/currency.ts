import axios from 'axios';

export const convertCurrency = async (amount: number, from: string, to: string) => {
  const apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;
  const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

  try {
    const response = await axios.get(url);
    const rates = response.data.rates;
    const convertedAmount = (amount / rates[from]) * rates[to];
    return convertedAmount;
  } catch (error) {
    throw new Error('Error converting currency');
  }
};