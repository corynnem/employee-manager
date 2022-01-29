import React, { useState, useEffect } from 'react'
import Navigation from './Main/Navigation'
import Employee from './Main/Employee'
import Team from './Main/Team'
import styles from '../styles/Home.module.css'



export default function Home() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Navigation employees={employees} setEmployees={setEmployees} />
      <div style={{display: 'flex'}} id="">
        <Employee employees={employees} setEmployees={setEmployees} />
        <Team  employees={employees} />
      </div>

    </div>
  )
}
