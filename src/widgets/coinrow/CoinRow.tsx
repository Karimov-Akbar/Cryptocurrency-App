import { memo } from 'react';
import { type CoinInfo } from '@/shared/api/cryptoApi';
import trash from '@/shared/icons/trash.svg'
import refresh from '@/shared/icons/refresh.svg'
import plus from '@/shared/icons/plus.svg'

type CoinRowProps = {
    coin: CoinInfo;
    mode: 'manage' | 'search';
    onRefresh?: () => void;
    onDelete?: () => void;
    onAdd?: () => void;
};

const CoinRow = memo(({ coin, mode, onRefresh, onDelete, onAdd }: CoinRowProps) => {
    return (
        <tr>
            <td>
                <div className="coin__info">
                    <img src={coin.imageUrl} alt="Coin" />
                    <div className="coin__name">
                        <h3>{coin.name}</h3>
                        <p>{coin.symbol}</p>
                    </div>
                </div>
            </td>
            <td>{coin.price.toFixed(2)} $</td>
            <td>
                <span className={coin.changePercent < 0 ? 'negative' : ''}>
                    {coin.changePercent > 0 ? '+' : ''}
                    {coin.changePercent.toFixed(2)}%
                </span>
            </td>
            <td>
                <div className="table__options">
                    {mode === 'manage' && (
                        <>
                            <button onClick={onRefresh}><img src={refresh} alt="" /></button>
                            <button onClick={onDelete}><img src={trash} alt="" /></button>
                        </>
                    )}
                    {mode === 'search' && (
                        <>
                            <button onClick={onAdd}><img src={plus} alt="" /></button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
});

export default CoinRow;