import NavBar from '@/widgets/navbar/NavBar';
import './Search.css'
import { useState, useEffect, useCallback } from 'react';
import { searchCoins, type CoinInfo } from '@/shared/api/cryptoApi';
import { useCoins } from '@/app/providers/CoinsContext';
import Table from '@/widgets/table/Table';
import CoinRow from '@/widgets/coinrow/CoinRow';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CoinInfo[]>([]);
    const { addCoin } = useCoins();

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        const data = await searchCoins(searchQuery);
        setResults(data);
    }, []);

    // Debounce: поиск через 500ms после остановки ввода
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, handleSearch]);

    return(
        <div className='container'>
            <header className="header">
                <NavBar 
                    showSearchInput
                    title='Search Coins'
                    subtitle='Find and manage your cryptocurrency'
                    showBackButon
                    onSearchChange={setQuery}
                />
            </header>
            <main className='main'>
                <div className="main__content">
                    {results.length > 0 && (
                        <Table>
                            {results.map(coin => (
                                <CoinRow
                                    key={coin.symbol}
                                    coin={coin}
                                    mode="search"
                                    onAdd={() => addCoin(coin)}
                                />
                            ))}
                        </Table>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Search;