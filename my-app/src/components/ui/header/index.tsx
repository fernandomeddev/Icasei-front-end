import { useContext } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../../contexts/AuthContext';


export function Header() {

    const {signOut} =  useContext(AuthContext)
    const { user } =  useContext(AuthContext)
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/search">
                    <img src="./med4.png"  width={120} height={130}  />
                </Link>

                <nav className={styles.menuNav}>

                    <Link href="/search">
                        <h2>{user?.name} </h2>
                    </Link> 
                    <button onClick={signOut}>
                        <FiLogOut  color="#FFF" size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}