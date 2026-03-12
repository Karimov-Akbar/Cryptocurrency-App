import './Table.css'
import { memo } from 'react';

type TableProps = {
    children: React.ReactNode;
};

const Table = memo(({children}: TableProps) =>{

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
                    {children}
                </tbody>
        </table>
    );
});

export default Table;