import useFetch from "../../components/hooks/useFetch"

export default async function handler({query: {ip="",domain=""}}, res) {

  let a 
  if (typeof domain !== ""){
    a= await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_API_KEY}&ipAddress=${ip}&domain=${domain}`)
    .then(res=>{
        if(res.ok) return res.json()
        return res.json().then(json=> Promise.reject(json))
    })
  }
  else{
    a= await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_API_KEY}`)
    .then(res=>{
        if(res.ok) return res.json()
        return res.json().then(json=> Promise.reject(json))
    })
  }
  
  res.status(200).json(JSON.stringify(a))
  
}