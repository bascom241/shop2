
import React, {useState,useEffect} from 'react'
import './index.css'
function App() {

  const [backend,setBackend] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch('/products');
      const data = await response.json();
      setBackend(data.data.product);
      console.log(data);
    }

    fetchData();
  },[])
  return (
    <div>
    <h1>Product List</h1>
    <ul>
        {backend.map((item, index) => (
            <li key={item._id || index}>{item.productName}</li>
        ))}
    </ul>
</div>

   
  );
}

export default App
