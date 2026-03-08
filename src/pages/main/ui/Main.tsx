import NavBar from '@/widgets/navbar/NavBar'
import refresh from '@/shared/icons/refresh.svg'
import './Main.css'
import '@/app/styles/index.css'
import Table from '@/widgets/table/Table'
import Loader from '@/shared/ui/loader/Loader'
import { useCoinData } from '../model/useCoinData'

const Main = () => {
    const { coin, countDown, fetchCoin, handleDelete } = useCoinData();

    if (!coin) return <Loader/>;

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
                            <button className='refresh__button' onClick={fetchCoin}><img src={refresh} alt="Refresh" />Update All</button>
                        </div>
                    </div>
                    <Table
                        coin={coin}
                        onRefresh={fetchCoin}
                        onDelete={handleDelete}
                    />
                </div>
            </main>
        </div>
    )
}

export default Main;