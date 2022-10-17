import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/medlogo.png';

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import {AuthContext} from '../../contexts/AuthContext'

import Link from 'next/link';

export default function Signup() {
  const {signUp} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [ loading, setLoading ] = useState(false)

  async function handleSignUp(event:FormEvent ){
    event.preventDefault();
    if(name === '' || email === '') return
    
    setLoading(true)
    let data ={ 
      name,
      email
    }
    await signUp(data)
    setLoading(false)

  
  }

  return (
    <>
      <Head>
        <title>
        Register Now | MED TI
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Medeiros Solutions" />

        <div className={styles.login}>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Full Name'
              type="text"
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />
            <Input
              placeholder='E-Mail'
              type="email"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />
            <Button 
              type="submit" 
              loading={loading}
            >
              Register
            </Button>
          </form>
          <p className={styles.text}>Do you have account?</p>
          <Link href="/">
            <a className={styles.text}> Login </a>
          </Link>
        </div>
      </div>
    </>
  )
}
