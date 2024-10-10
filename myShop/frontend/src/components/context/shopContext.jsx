import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    const url = 'http://localhost:8000';
    const [cart, setCart] = useState([])
    const [list, setList] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [quantity, setQuantity] = useState(1);
    const [searchTerm,setSearcTerm] = useState('');

    console.log(userId);
    console.log(cart)
    
    const handleSearchInput = (evt) => {
        setSearcTerm(evt.target.value)
    }
    const filteredItems = list.filter(li => li.name.toLowerCase().includes(searchTerm.toLowerCase()))





    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        const storedId = localStorage.getItem('userId');
        if (storedId) {
            setUserId(storedId);
        }


    }, [])

    
    const getDefaultCart = () => {
        let cart = {};
        for (let i = 1; i < list.length; i++) {
            cart[i] = 0
        }
        return cart;
    }
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });

    // Whenever cartItems change, save them to localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);



    
  const fetchItems = async () =>{
    try{
      const response = await axios.get(`${url}/api/products`);
      setList(response.data.products)
      
      console.log(response.data.products)
      console.log('Done')
    }catch(err){
      console.log(err.message)
    }
  }

  
    
    const handleOpenCart = () => {
        setIsCartOpen(true)
    }

    const handleCloseCart = () => {
        setIsCartOpen(false)
    }

    const addToCart = async (itemId,quantity=1) => {
        // Update the cart items in the local state


        if (token) {
            try {


                const response = await axios.post(`${url}/api/carts/addToCart`, {
                    userId: userId,
                    productId: itemId,
                    quantity: quantity
                },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                console.log(response.data.data.items)
            }
            catch (err) {
                console.log(err)
            }
        } else {
            console.log('Error');
         
        }

        const existingItem = cart.find((item) => item.productId === itemId);

        if (existingItem) {
            // If the item is already in the cart, increase its quantity
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.productId === itemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item

                )
            );
            if(token){
                toast.success('Product added to cart')
            } else{
                toast.error('Login to add to Cart')
                setCart([])
            }
            
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            const product = cart.find((item) => item.productId === itemId);
            console.log(product)
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
            if(token){
                toast.success('Product added to cart')
            } else{
                toast.error('Login to add to Cart')
                setCart([])
            }
            
        }





    }

    const removeFromCart = async (productId) => {
        if (token) {
            try {
                // Send DELETE request to the backend
                const response = await axios.delete(`${url}/api/carts/delete`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: {
                        userId: userId,
                        productId: productId,
                    },
                });

                // Check response and update the cart state
                if (response) {

                    console.log('Item removed from cart:', productId);
                    // Update cart state: filter out the deleted product
                    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
                    toast.success('Product removed from cart')
                }
            } catch (err) {
                console.error('Error removing item from cart:', err.response?.data || err.message);
            }
        }
    };




    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${url}/api/carts/getCarts/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)



            if (response.data.status === 'OK') {
                setCart(response.data.data.items)
                console.log(response.data.data.items)

            }


        } catch (e) {
            console.log(e)
        }
    }




    useEffect(() => {

        if (token) {
            fetchCartItems();
        }

    }, [])


    const handleSignInSubmit = async (evt) => {
        evt.preventDefault()
        try {


            const response = await axios.post(`${url}/api/users/signin`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.status === 'success') {
                setFormData('');
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/')
            }
        } catch (err) {
            console.log(err.message)
        }
    }



    const updateCartItems = async (productId, newQuantity) => {
        try {
            const response = await axios.patch(`${url}/api/carts/update`, {
                userId,
                productId,
                quantity: newQuantity
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            if (response) {
                setCart(response.data.data.items)
                console.log(response.data.data.items);
                console.log(response)

            }
        } catch (err) {
            console.log('Error', err)
        }
    }


    const decreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateCartItems(productId, currentQuantity - 1)
        } else {
            updateCartItems(productId, 0);
            toast.success('Product removed from cart')
        }
    }
    const IncreamentQuantity = (productId, currentQuantity) => {
        updateCartItems(productId, currentQuantity + 1)
    }

    // const handleChangeQuantity = (productId, value) => {
    //     const newQuantity = parse(value, 10);
    //     if (newQuantity >= 1) {
    //         updateCartItems(productId,newQuantity)
    //     }
    // }


    const cartTotalPrice = cart.map(cct => cct.price * cct.quantity).reduce((acc, total) => acc + total, 0);
    const contextValue = {
        url,
        list,
        setList,
        addToCart,
        removeFromCart,
        cartItems,
        handleCloseCart,
        handleOpenCart,
        isCartOpen,
        product,
        setProduct,
        token,
        setToken,
        handleSignInSubmit,
        setUserId,
        quantity,
        setQuantity,
        userId,
        cart,
        setCart,
        fetchCartItems,
        decreaseQuantity,
        IncreamentQuantity,
        fetchItems,
        // handleChangeQuantity

        filteredItems,
        handleSearchInput,
        searchTerm,
        cartTotalPrice
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider