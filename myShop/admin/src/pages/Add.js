
import './Add.css'
import { asets } from '../assets/asset'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../context/adminContext'
import { useContext } from 'react'
const Add = () => {

    const { token,url } = useContext(AdminContext)

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Phones",


    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data, [name]: value
        }))
    }

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    const onSubmitHandler = async (evt) => {
        evt.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);  // Ensure this is the file object, not false

        try {
            const response = await axios.post(`${url}/api/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                    // 'Content-Type': 'multipart/form-data',  // Explicitly set the content type
                },
            });
            console.log(response)
            // This is the success condition
            setData({
                name: "",
                description: "",
                price: "",
                category: "Black",
            });
            setImage(false);
            toast.success(response.data.message); 


        } catch (e) {
           
            console.error('Error:', e.message);
            toast.error('An error occurred while adding the product.');
        }
    };

    return (


        <div className='add '>

            <form className='flex-col ' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : asets.uploadIcon} alt='' />
                    </label>
                    <input
                        type='file'
                        id='image'
                        hidden required
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input
                        type='text'
                        name='name'
                        placeholder='Type here'
                        onChange={onChangeHandler}
                        value={data.name}
                    />
                </div>
                <div className='add-product-description flex'>
                    <p>product description</p>
                    <textarea onChange={onChangeHandler}
                        value={data.description} name='description' placeholder='Write content Here' rows='6' required></textarea>
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select onChange={onChangeHandler}
                            value={data.category} name='category' >
                            <option value="Phone">Phone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="EarPod">EarPod</option>

                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input
                            type='number'
                            name='price'
                            placeholder='$20'
                            onChange={onChangeHandler}
                            value={data.price}
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add
