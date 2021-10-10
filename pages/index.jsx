import Head from 'next/head'

import dynamic from 'next/dynamic'
const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

import useFetch from '../components/hooks/useFetch'
import {useState} from 'react'

import styles from '../styles/Home.module.css'

export default function Home() {

  
  const [parameter, setParameter] = useState("ip=")
  const [isLoading,error,data] = useFetch(`/api/location?${parameter}`,{},[parameter])
  const isIp=/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/


  function handleSubmit(e){
    let text =document.getElementById("search-field").value;
      if (isIp.test(text.toLowerCase()))
        setParameter(`ip=${text}`)
      else
        setParameter(`domain=${text}`)
    e.preventDefault()
  }

  return (
    
    <div className={styles.container}>
      <Head>
        <title>ID Address Tracker</title>
        <meta name="description" content="i dont know" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet"/> 
      </Head>

      <h1 className={styles.title}>IP  Address Traker</h1>
      <form onSubmit={handleSubmit} className={styles.search}>
          <input id="search-field" type="text" className={styles.input} placeholder="Search any parameter address or domain"  />
          <input type="submit" className={styles.button} value=">"/>
      </form>

      
      {
        typeof error == 'undefined' ?
        
        <div className={styles.info_container}>
         
          <div className={styles.info}>
            <span>IP ADRESS</span>  <label>{isLoading ? "Cargando" : data.ip}</label>
          </div>
          <div className={styles.info}>
            <span>LOCATION</span> <label>{isLoading ? "Cargando" : `${data.location.country},${data.location.region}`}</label>
          </div>
          <div className={styles.info}>
            <span>TIMEZONE</span>   <label>{isLoading ? "Cargando" : data.location.timezone}</label>
          </div>
          <div className={styles.info}>
            <span>ISP</span>  <label>{isLoading ? "Cargando" : data.isp}</label>  
          </div>
          {isLoading ? "" : <Map lat={data.location.lat} lng={data.location.lng}/>} 
      </div>
        :
        <div className={styles.error}>
          Can't find the IP.
        </div>
      }
    </div>
  )
 
}
