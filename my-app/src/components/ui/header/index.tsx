import { useContext } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';

export function Header() {

    //const [userName, setUser] = useState('')
    const {signOut} =  useContext(AuthContext)
    const { user } =  useContext(AuthContext)
    //setUser(user.name);

    // fetch data
    /* useEffect(() => {
      const value = localStorage.getItem("user_name");
      const user = !!value ? JSON.parse(value) : undefined;
      setUser(user)
    }, []) */
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="./med4.png"  width={120} height={130}  />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/dashboard">
                        <a> {user?.name} </a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut  color="#FFF" size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}