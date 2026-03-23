/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import { getCoinData } from '@/shared/api/cryptoApi';
import { useCoins } from '@/app/providers/CoinsContext';

export const useCoinData = () => {
    const { coins, removeCoin, updateCoin } = useCoins();
    const [countDown, setCountDown] = useState(10);

    const fetchAllCoins = useCallback(async () => {
        for (const coin of coins) {
            const data = await getCoinData(coin.symbol);
            if (data) updateCoin(data);
        }
        setCountDown(10);
    }, [coins, updateCoin]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAllCoins();
        }, 10000);
        const timer = setInterval(() => {
            setCountDown(prev => prev > 0 ? prev - 1 : 10);
        }, 1000);
        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, [fetchAllCoins]);

    return { coins, removeCoin, updateCoin, countDown, fetchAllCoins };
};
