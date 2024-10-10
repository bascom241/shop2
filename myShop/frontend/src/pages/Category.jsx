import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Category.css'
import { ShopContext } from '../components/context/shopContext'
import { FaPhone, FaLaptop, FaHeadphones } from 'react-icons/fa'
const Category = () => {

  const { fetchItems, list, setList, url ,filteredItems,handleSearchInput,searchTerm} = useContext(ShopContext);

  const fecthPhones = async ()=>{
    try{
      const response = await axios.get(`${url}/api/Phones`);
      setList(response.data.products)
      console.log(response)
    } catch(err){
      console.log(err.message)
    }
   
  }

  const fecthLaptops = async ()=>{
    try{
      const response = await axios.get(`${url}/api/Laptops`);
      setList(response.data.products)
      console.log(response)
    } catch(err){
      console.log(err.message)
    }
   
  }

  const fetchEarPods = async ()=>{
    try{
      const response = await axios.get(`${url}/api/EarPods`);
      setList(response.data.products)
      console.log(response)
    } catch(err){
      console.log(err.message)
    }
   
  }


  const fetchHighQuality = async () =>{
    try{
      const response = await axios.get(`${url}/api/High`);
      setList(response.data.products)
      
      console.log(response.data.products)
      console.log('Done')
    }catch(err){
      console.log(err.message)
    }
  }


  const fetchLowQuality = async () =>{
    try{
      const response = await axios.get(`${url}/api/Low`);
      setList(response.data.products)
      
      console.log(response.data.products)
      console.log('Done')
    }catch(err){
      console.log(err.message)
    }
  }




  useEffect(() => {
    fetchItems();


    
  }, [])

  const [selectOption, setSelectOption] = useState('');
  
  const handleSelectOption = (evt) => {
    const option = evt.target.value;
    setSelectOption(option);

    // Trigger appropriate fetch function based on sorting selection
    if (option === 'Sort By:low to High') {
      fetchLowQuality();
    } else if (option === 'Sort By:High to low') {
      fetchHighQuality();
    } else{
      fetchItems();
    }
  };



  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + '.....'
    }
    return text
  }
  return (
    // <motion.div    initial={{width:0}}
    // animate={{width:'100%'}}
    // exit={{width:'0'}}
    // layout
    // >
    <>

      <hr className='hr' />
      <div className='category-page-container'>
        
        <div className='collection-Container'>
          <h1 onClick={()=>fetchItems()}>All Collections</h1>
        </div>

        <div className='filter-product-container'>
          {/* <h2>CATEGORIES</h2> */}
          <ul>

            <Link onClick={()=>fecthPhones()}><FaPhone />Phones</Link>
            <Link onClick={()=>fecthLaptops()}><FaLaptop />Laptop</Link>
            <Link onClick={()=>fetchEarPods()}><FaHeadphones />Earpods</Link>
          </ul>

        </div>



        <div className='selectOptionContainer'>
          <select id='options' value={selectOption} onChange={handleSelectOption}>
            <option value='Sort By:Relevant'>Sort By:Relevant</option>
            <option value='Sort By:low to High'>Sort By:low to High</option>
            <option value='Sort By:High to low'>Sort By:High to low</option>

          </select>

          <input
          className='search-input'
          type='text'
          placeholder='search Products'
          value={searchTerm}
          onChange={handleSearchInput}

        />
        </div>




      </div>

     

      <div className='cat-list'>
        {filteredItems.map(l => (
          <div className='cat-product'>
            <Link to={`/product/${l._id}`}>
              <div>
              <img src={l.image} alt={l.name} />
              </div>
              <p>{truncateText(l.description, 25)}</p>
              <p className='cat-name'>{l.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Category
