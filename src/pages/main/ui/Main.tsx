import NavBar from '@/widgets/navbar/NavBar'
import refresh from '@/shared/icons/refresh.svg'
import './Main.css'
import '@/app/styles/index.css'
import Table from '@/widgets/table/Table'
import { useCoins } from '@/app/providers/CoinsContext'
import CoinRow from '@/widgets/coinrow/CoinRow'
import { useCoinData } from '../model/useCoinData'
import { getCoinData } from '@/shared/api/cryptoApi'
import { useCallback } from 'react'

const Main = () => {
    const { coins, removeCoin, updateCoin } = useCoins();
    const { countDown, fetchAllCoins } = useCoinData();

    const handleRefresh = useCallback(async (symbol: string) => {
        const data = await getCoinData(symbol);
        updateCoin(data);
    }, [updateCoin]);

    return(
        <div className="container">
            <header className="header">
                <NavBar/>
            </header>
            <main className='main'>
                <div className="main__content">
                    <div className="main__options">
                        <h2>Trending Coins</h2>
                        <div className="main__refresh">
                            <span>Auto-refresh in {countDown}</span>
                            <button className='refresh__button' onClick={fetchAllCoins}><img src={refresh} alt="Refresh" />Update All</button>
                        </div>
                    </div>
                    <Table>
                        {coins.map(coin => (
                            <CoinRow
                                key={coin.symbol}
                                coin={coin}
                                mode='manage'
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