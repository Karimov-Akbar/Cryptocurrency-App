import './Table.css'
import { type CoinInfo } from '@/shared/api/cryptoApi'
import CoinRow from '@/widgets/coinrow/CoinRow'
import { memo } from 'react';

type TableProps = {
    coin: CoinInfo;
    onRefresh: () => void;
    onDelete: () => void;
};

const Table = memo(({coin, onRefresh, onDelete}: TableProps) =>{

    return(
        <table className='table'>
            <thead>
                <tr>
                    <td>Coin</td>
                    <td>Price</td>
                    <td>Change</td>
                    <td>Actions</td>
                </tr>
            </thead>
                <tbody>
                    <CoinRow
                        coin={coin}
                        onRefresh={onRefresh}
                        onDelete={onDelete}
                    />
                </tbody>
        </table>
    );
});

export default Table;