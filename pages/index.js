import React, {useEffect} from 'react'
import Navigation from './Main/Navigation'
import Employee from './Main/Employee'
import styles from '../styles/Home.module.css'



export default function Home() {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <div className={styles.container}>
        <Navigation/>
        <Employee/>
    </div>
  )
}
