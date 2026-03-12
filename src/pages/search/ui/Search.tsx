import NavBar from '@/widgets/navbar/NavBar';
import './Search.css'
import { useCoins } from '@/app/providers/CoinsContext';
import Table from '@/widgets/table/Table';
import CoinRow from '@/widgets/coinrow/CoinRow';
import { useSearch } from '../model/useSearch';

const Search = () => {
    const { setQuery, results } = useSearch();
    const { addCoin } = useCoins();

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