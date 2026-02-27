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
    products: [],
    puppies: []
  });
  const [selectedProducts, setSelectedProducts] = useState(formData.products || []);
  const [selectedPuppies, setSelectedPuppies] = useState([]);

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
  
  const addToCart = async (item, type) => {
    let payload = {
      quantity: 1,
      deliveryOptionId: "1"
    };

    // Detect type
    if (type === "product") {
      payload.productId = item._id;
    } else if (type === "puppy") {
      payload.puppyId = item._id;
    } else if (type === "service") {
      payload.serviceId = item._id;
    } else {
      console.error("Invalid cart item type");
      return;
    }

    try {
      await cartApi.addItemToCart(payload);
    } catch (error) {
      console.error("Backend says:", error.response?.data);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) =>
        (type === "product" && i.product?._id === item._id) ||
        (type === "puppy" && i.puppy?._id === item._id) ||
        (type === "service" && i.service?._id === item._id)
      );

      // 🐶 Puppies should NOT increase quantity
      if (type === "puppy" && existingItem) {
        alert("This puppy is already in your cart.");
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map((i) => {
          if (
            (type === "product" && i.product?._id === item._id) ||
            (type === "service" && i.service?._id === item._id)
          ) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        });
      }

      // Add new item
      return [
        ...prevItems,
        {
          [type]: item,
          quantity: 1,
          deliveryOptionId: "1"
        }
      ];
    });

    setAddedMessages((prevMessages) => ({
      ...prevMessages,
      [item._id]: true
    }));

    if (addedMessageTimeouts.current[item._id]) {
      clearTimeout(addedMessageTimeouts.current[item._id]);
    }

    addedMessageTimeouts.current[item._id] = setTimeout(() => {
      setAddedMessages((prevMessages) => ({
        ...prevMessages,
        [item._id]: false
      }));
    }, 2000);
  };

  const removeFromCart = async (itemId, type) => {
  let payload = {};

  if (type === "product") {
    payload.productId = itemId;
  } else if (type === "puppy") {
    payload.puppyId = itemId;
  } else if (type === "service") {
    payload.serviceId = itemId;
  } else {
    console.error("Invalid item type");
    return;
  }

  try {
    const response = await cartApi.deleteCartItem(payload);

    // Backend returns fully populated updated cart
    setCartItems(response.data.items);

  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
  };

const updateCartItemQuantity = async (itemId, quantity, type) => {
  let payload = { quantity };

  if (type === "product") {
    payload.productId = itemId;
  } else if (type === "puppy") {
    payload.puppyId = itemId;
  } else if (type === "service") {
    payload.serviceId = itemId;
  } else {
    console.error("Invalid item type");
    return;
  }

  try {
    const response = await cartApi.updateCartItem(payload);

    // Always trust backend response
    setCartItems(response.data.items);

  } catch (error) {
    console.error("Error updating cart item quantity:", error);
  }
};

  const clearCart = () => {
    setCartItems([]);
  }

  const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    price: 0
  },{
    id: '2',
    deliveryDays: 3,
    price: 499
  },{
    id: '3',
    deliveryDays: 1,
    price: 999
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
    <cartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart, addedMessages, updateCartItemQuantity, deliveryOptions, getDeliveryOption, calculateDeliveryDate, updateDeliveryOption, setCartItems, products, loading, setProducts, collections, setCollections, selectedProducts, setSelectedProducts, isEditing, setIsEditing, editingCollectionId, setEditingCollectionId, showModal, setShowModal, formData, setFormData, puppies, setPuppies, selectedPuppies, setSelectedPuppies}}>
      {children}
    </cartContext.Provider>
  ); 

}