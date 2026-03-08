const API_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY

export type CoinInfo = {
    name: string;
    symbol: string;
    price: number;
    changePercent: number;
    imageUrl: string;
}

export const getCoinData = async(coin: string) => {
    const response = await fetch(`${API_URL}/pricemultifull?fsyms=${coin}&tsyms=USD&api_key=${API_KEY}`);
    const data = await response.json();
    const raw = data.RAW[coin].USD
    return {
        name: coin,
        symbol: coin,
        price: raw.PRICE,
        changePercent: raw.CHANGEPCT24HOUR,
        imageUrl: `https://www.cryptocompare.com${raw.IMAGEURL}`,
    };
}