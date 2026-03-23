import NavBar from '@/widgets/navbar/NavBar'
import refresh from '@/shared/icons/refresh.svg'
import styles from './Main.module.css'
import '@/app/styles/index.css'
import Table from '@/widgets/table/Table'
import CoinRow from '@/widgets/coinrow/CoinRow'
import { CoinRowMode } from '@/widgets/coinrow/types'
import { useCoinData } from '../model/useCoinData'
import { getCoinData } from '@/shared/api/cryptoApi'
import { useCallback } from 'react'

const Main = () => {
    const { coins, removeCoin, updateCoin, countDown, fetchAllCoins } = useCoinData();

    const handleRefresh = useCallback(async (symbol: string) => {
        const data = await getCoinData(symbol);
        if (data) updateCoin(data);
    }, [updateCoin]);

    return(
        <div className="container">
            <header className={styles.header}>
                <NavBar/>
            </header>
            <main className={styles.main}>
                <div>
                    <div className={styles.mainOptions}>
                        <h2>Trending Coins</h2>
                        <div className={styles.mainRefresh}>
                            <span>Auto-refresh in {countDown}</span>
                            <button className={styles.refreshButton} onClick={fetchAllCoins}><img src={refresh} alt="Refresh" />Update All</button>
                        </div>
                    </div>
                    <Table>
                        {coins.map(coin => (
                            <CoinRow
                                key={coin.symbol}
                                coin={coin}
                                mode={CoinRowMode.Manage}
                                onRefresh={() => handleRefresh(coin.symbol)}
                                onDelete={() => removeCoin(coin.symbol)}
                            />
                        ))}
                    </Table>
                </div>
            </main>
        </div>
    )
}

export default Main;