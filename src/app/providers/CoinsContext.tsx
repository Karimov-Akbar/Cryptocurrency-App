import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { getCoinData, type CoinInfo } from "@/shared/api/cryptoApi";

type CoinsContextType = {
    coins: CoinInfo[];
    addCoin: (coin: CoinInfo) => void;
    removeCoin: (symbol: string) => void;
    updateCoin: (coin: CoinInfo) => void;
}

const CoinsContext = createContext<CoinsContextType | null>(null);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
    const [coins, setCoins] = useState<CoinInfo[]>([]);

    useEffect(() => {
        const loadInitial = async () => {
            const doge = await getCoinData('DOGE');
            setCoins([doge]);
        };
        loadInitial();
    }, []);

    const addCoin = useCallback((coin: CoinInfo) => {
        setCoins(prev => {
            if (prev.find(c => c.symbol === coin.symbol)) return prev;
            return [...prev, coin];
        });
    }, []);

    const removeCoin = useCallback((symbol: string) => {
        setCoins(prev => prev.filter(c => c.symbol !== symbol));
    }, []);

    const updateCoin = useCallback((coin: CoinInfo) => {
        setCoins(prev => prev.map(c => c.symbol === coin.symbol ? coin : c))
    }, []);

    return (
        <CoinsContext.Provider value={{ coins, addCoin, removeCoin, updateCoin }}>
            {children}
        </CoinsContext.Provider>
    );
};

export const useCoins = () => {
    const ctx = useContext(CoinsContext);
    if (!ctx) throw new Error('useCoins must be used inside CoinsProvider');
    return ctx;
}