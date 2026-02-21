import {createContext, useContext, useState, useRef, useEffect} from "react";
import dayjs from "dayjs";
import cartApi from "../api/cartApi.js";
import productApi from "../api/productApi.js";
import collectionApi from "../api/collectionApi.js";
import puppyApi from "../api/puppiesApi.js";

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []);
  const [products, setProducts] = useState([]);
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    backgroundImage: null,
    products: []
  });
  const [selectedProducts, setSelectedProducts] = useState(formData.products || []);

  useEffect(() => {
    if (showModal && formData.products) {
      setSelectedProducts(formData.products);
    }
  }, [formData.products, showModal]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await collectionApi.getAllCollections(); 
        setCollections(response.data);        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error); 
        setLoading(false); 
      }
    }
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const response = await puppyApi.getPuppies();
        setPuppies(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching puppies:", error);
        setLoading(false);
      }
    };
    fetchPuppies();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAllProducts();
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); 
  }, [cartItems]);

  const [addedMessages, setAddedMessages] = useState({})
  const addedMessageTimeouts = useRef({});
  
  const addToCart = async (item) => {
    const productId = item._id; // Ensure we use the correct ID field
    try {
      await cartApi.addItemToCart({ productId, quantity: 1, deliveryOptionId: '1',}); 
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return; // Exit if there's an error
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? {...i, quantity: i.quantity + 1} : i
        );
      }
      return [...prevItems, {...item, quantity: 1, deliveryOptionId: '1'}];
    });
    
    setAddedMessages((prevMessages) => ({...prevMessages, [item._id]: true}))

    if (addedMessageTimeouts.current[item._id]) {
      clearTimeout(addedMessageTimeouts.current[item._id]);
    }

    addedMessageTimeouts.current[item._id] = setTimeout(() => {
    setAddedMessages((prevMessages) => ({...prevMessages, [item._id]: false}));
    }, 2000)
   
  }

  const removeFromCart = async (itemId) => {
    const productId = itemId;
    try {
      await cartApi.deleteCartItem({productId}); 
    }catch(error){
      console.error("Error removing item from cart:", error);
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product._id === itemId); 
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.product._id === itemId ? {...i, quantity: i.quantity - 1} : i
        );
      }
      return prevItems.filter((i) => i.product._id !== itemId);
    });
  }

  const updateCartItemQuantity = async (itemId, quantity) => {
    const productId = itemId
    try {
      await cartApi.updateCartItem({productId, quantity}); 
      setCartItems((prevItems) => {
        return prevItems.map((i) =>
          i.product._id === itemId ? {...i, quantity: quantity} : i
        );
      });
      
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  }

  const clearCart = () => {
    setCartItems([]);
  }

  const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }]

  function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach(option => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    return deliveryOption || deliveryOptions[0];
  }

  function isWeekend(date){
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  }

  function calculateDeliveryDate(deliveryOption){
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while(remainingDays > 0){
      deliveryDate = deliveryDate.add(1, 'day');

      if(!isWeekend(deliveryDate)){
        remainingDays--;
      }
    }
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
  }

  function validateDeliveryOption(deliveryOptionId){
    return deliveryOptions.some((option) => option.id === deliveryOptionId);
  }

  async function updateDeliveryOption(productId, deliveryOptionId){
   if (!validateDeliveryOption(deliveryOptionId)) return;

   try {
      await cartApi.updateDeliveryOptionId({productId, deliveryOptionId});
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId
            ? { ...item, deliveryOptionId }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating delivery option:", error);
    }

  }


  return (
    <cartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart, addedMessages, updateCartItemQuantity, deliveryOptions, getDeliveryOption, calculateDeliveryDate, updateDeliveryOption, setCartItems, products, loading, setProducts, collections, setCollections, selectedProducts, setSelectedProducts, isEditing, setIsEditing, editingCollectionId, setEditingCollectionId, showModal, setShowModal, formData, setFormData, puppies, setPuppies}}>
      {children}
    </cartContext.Provider>
  ); 

}