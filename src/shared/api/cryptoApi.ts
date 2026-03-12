const API_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY

export type CoinInfo = {
    name: string;
    symbol: string;
    price: number;
    changePercent: number;
    imageUrl: string;
}

export const getCoinData = async(coin: string): Promise<CoinInfo | null> => {
    try {
        const response = await fetch(`${API_URL}/pricemultifull?fsyms=${coin}&tsyms=USD&api_key=${API_KEY}`);
        const data = await response.json();
        const raw = data.RAW?.[coin]?.USD;
        if (!raw) return null;
        return {
            name: coin,
            symbol: coin,
            price: raw.PRICE,
            changePercent: raw.CHANGEPCT24HOUR,
            imageUrl: `https://www.cryptocompare.com${raw.IMAGEURL}`,
        };
    } catch {
        return null;
    }
}

export const searchCoins = async (query: string): Promise<CoinInfo[]> => {
    const response = await fetch(`${API_URL}/all/coinlist?api_key=${API_KEY}`);
    const data = await response.json();

    const coins = Object.values(data.Data)
        .filter((coin: any) => 
            coin.Symbol.toLowerCase().includes(query.toLowerCase()) ||
            coin.CoinName.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10);

    const results = await Promise.all(
        coins.map((coin: any) => getCoinData(coin.Symbol))
    );

    return results.filter((coin): coin is CoinInfo => coin !== null);
};