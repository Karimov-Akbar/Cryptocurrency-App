/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import { getCoinData, type CoinInfo } from '@/shared/api/cryptoApi';

export const useCoinData = () => {
    const [coin, setCoin] = useState<CoinInfo | null>(null);
    const [countDown, setCountDown] = useState(10);

    const fetchCoin = useCallback(async () => {
        const data = await getCoinData('DOGE');
        setCoin(prev => {
            if (prev && prev.price === data.price && prev.changePercent === data.changePercent) {
                return prev;
            }
            return data;
        });
    }, []);

    const handleDelete = useCallback(() => {
        setCoin(null);
    }, []);

    useEffect(() => {
        fetchCoin();
        const interval = setInterval(() => {
            fetchCoin();
            setCountDown(10);
        }, 10000);
        const timer = setInterval(() => {
            setCountDown(prev => prev > 0 ? prev - 1 : 10);
        }, 1000);
        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, [fetchCoin]);

    return { coin, countDown, fetchCoin, handleDelete };
};
