import NavBar from '@/widgets/navbar/NavBar';
import styles from './Search.module.css';
import '@/app/styles/index.css';
import { useCoins } from '@/app/providers/CoinsContext';
import Table from '@/widgets/table/Table';
import CoinRow from '@/widgets/coinrow/CoinRow';
import { CoinRowMode } from '@/widgets/coinrow/types';
import { useSearch } from '../model/useSearch';

const Search = () => {
    const { setQuery, results } = useSearch();
    const { addCoin } = useCoins();

    return(
        <div className='container'>
            <header className={styles.header}>
                <NavBar 
                    showSearchInput
                    title='Search Coins'
                    subtitle='Find and manage your cryptocurrency'
                    showBackButon
                    onSearchChange={setQuery}
                />
            </header>
            <main className={styles.main}>
                <div>
                    {results.length > 0 && (
                        <Table>
                            {results.map(coin => (
                                <CoinRow
                                    key={coin.symbol}
                                    coin={coin}
                                    mode={CoinRowMode.Search}
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