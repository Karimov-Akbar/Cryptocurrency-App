import search from '@/shared/icons/search.svg'
import back from '@/shared/icons/back.svg'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'

type NavBarProps = {
    title?: string;
    subtitle?: string;
    showSearchInput?: boolean;
    showBackButon?: boolean;
    onSearchChange?: (value: string) => void;
    onSearchSubmit?: () => void;
}

const NavBar = ({ title = 'Dashboard', subtitle = 'Track your crypto investments', showSearchInput = false, showBackButon = false, onSearchChange, onSearchSubmit }: NavBarProps) => {
    const navigate = useNavigate();
    return(
        <nav className="nav">
            <div className={`nav__content ${showSearchInput ? 'nav__content--column' : ''}`}>                <div className="nav__header">
                    {showBackButon && (
                        <button className='back__btn' onClick={() => navigate(-1)}><img src={back} alt="Back" /></button>
                    )}
                    <div className="nav__info">
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </div>
                {showSearchInput?(
                    <div className="nav__search">
                        <img src={search} alt="Search" />
                        <input 
                            type="text" 
                            placeholder='Search Cryptocurrency'
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                        />
                    </div>
                ):(
                    <button className="nav__search-btn" onClick={()=> navigate('/search')}>
                        <img src={search} alt="Search" />
                    </button>
                )}
            </div>
        </nav>
    )
}

export default NavBar;