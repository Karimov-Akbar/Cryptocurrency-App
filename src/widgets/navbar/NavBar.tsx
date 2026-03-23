import search from '@/shared/icons/search.svg'
import back from '@/shared/icons/back.svg'
import styles from './NavBar.module.css'
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
        <nav>
            <div className={`${styles.navContent} ${showSearchInput ? styles.navContentColumn : ''}`}>
                <div className={styles.navHeader}>
                    {showBackButon && (
                        <button className={styles.backBtn} onClick={() => navigate(-1)}><img src={back} alt="Back" /></button>
                    )}
                    <div className={styles.navInfo}>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </div>
                {showSearchInput?(
                    <div className={styles.navSearch}>
                        <img src={search} alt="Search" />
                        <input 
                            type="text" 
                            placeholder='Search Cryptocurrency'
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                        />
                    </div>
                ):(
                    <button className={styles.navSearchBtn} onClick={()=> navigate('/search')}>
                        <img src={search} alt="Search" />
                    </button>
                )}
            </div>
        </nav>
    )
}

export default NavBar;