import { useState, useEffect, useCallback } from 'react';
import { searchCoins, type CoinInfo } from '@/shared/api/cryptoApi';

export const useSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CoinInfo[]>([]);

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        const data = await searchCoins(searchQuery);
        setResults(data);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, handleSearch]);

    return { query, setQuery, results };
};