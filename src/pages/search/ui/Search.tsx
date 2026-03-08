import NavBar from '@/widgets/navbar/NavBar';
import './Search.css'

const Search = () => {
    return(
        <div className='container'>
            <header className="header">
                <NavBar 
                    showSearchInput
                    title='Search Coins'
                    subtitle='Find and manage your cryptocurrency'
                    showBackButon
                />
            </header>
        </div>
    );
}

export default Search;