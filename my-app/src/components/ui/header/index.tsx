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
                    <img src="./med4.png"  width={320} height={330}  />
                </Link>

                <nav className={styles.menuNav}>

                    <Link href="/search">
                        <h3>user: {user?.email} </h3>
                    </Link> 
                    <button onClick={signOut}>
                        <FiLogOut  color="#FFF" size={44}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}