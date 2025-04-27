import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

export const addProductToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
      // Find the product details
      const productDetails = await Product.findById(productId);
      if (!productDetails) {
          return res.status(404).json({ error: "Product not found" });
      }

      // Check if the product is available in stock
      if (productDetails.productCountInStock < quantity) {
          return res.status(400).json({ error: "Insufficient stock available" });
      }

      // Find the cart for the user
      let cart = await Cart.findOne({ userId });
      if (!cart) {
          cart = new Cart({ userId, items: [{ productId, quantity }] });
      } else {
          const item = cart.items.find(item => item.productId.equals(productId));
          if (item) {
              item.quantity += quantity;
          } else {
              cart.items.push({ productId, quantity });
          }
      }

      await cart.save();

      // Calculate the total amount of the cart
      const updatedCartItems = await Promise.all(
          cart.items.map(async item => {
              const productDetail = await Product.findById(item.productId);
              return {
                  productId: item.productId,
                  quantity: item.quantity,
                  name: productDetail.productName,
                  price: productDetail.productPrice,
                  availability: productDetail.productCountInStock,
                  totalItemPrice: productDetail.productPrice * item.quantity,
                  imgUrl: productDetail.productImageUrl
              };
          })
      );

      const totalAmount = updatedCartItems.reduce((total, item) => total + item.totalItemPrice, 0);

      const Bill = {
          userId: cart.userId,
          items: updatedCartItems,
          totalAmount
      };

      res.status(200).json(Bill);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



export const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => !item.productId.equals(productId));
      await cart.save();

      // Calculate the total amount of the cart
      const updatedCartItems = await Promise.all(
        cart.items.map(async item => {
          const productDetail = await Product.findById(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            name: productDetail.productName,
            price: productDetail.productPrice,
            availability: productDetail.productCountInStock,
            totalItemPrice: productDetail.productPrice * item.quantity,
            imgUrl: productDetail.productImageUrl
          };
        })
      );

      const totalAmount = updatedCartItems.reduce((total, item) => total + item.totalItemPrice, 0);

      const Bill = {
        userId: cart.userId,
        items: updatedCartItems,
        totalAmount
      };

      res.status(200).json(Bill);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductFromCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const item = cart.items.find(item => item.productId.equals(productId));
      if (item) {
        item.quantity = quantity;
        await cart.save();

        // Calculate the total amount of the cart
        const updatedCartItems = await Promise.all(
          cart.items.map(async item => {
            const productDetail = await Product.findById(item.productId);
            return {
              productId: item.productId,
              quantity: item.quantity,
              name: productDetail.productName,
              price: productDetail.productPrice,
              availability: productDetail.productCountInStock,
              totalItemPrice: productDetail.productPrice * item.quantity,
              imgUrl: productDetail.productImageUrl
            };
          })
        );

        const totalAmount = updatedCartItems.reduce((total, item) => total + item.totalItemPrice, 0);

        const Bill = {
          userId: cart.userId,
          items: updatedCartItems,
          totalAmount
        };

        res.status(200).json(Bill);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const fetchCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // Calculate the total amount of the cart
      const updatedCartItems = await Promise.all(
        cart.items.map(async item => {
          const productDetail = await Product.findById(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            name: productDetail.productName,
            price: productDetail.productPrice,
            availability: productDetail.productCountInStock,
            totalItemPrice: productDetail.productPrice * item.quantity,
            imgUrl: productDetail.productImageUrl
          };
        })
      );

      const totalAmount = updatedCartItems.reduce((total, item) => total + item.totalItemPrice, 0);

      const Bill = {
        userId: cart.userId,
        items: updatedCartItems,
        totalAmount
      };

      res.status(200).json(Bill);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCart = async (req,res) => {
  const { userId } = req.params;
  try {
    const cart = Cart.findOneAndDelete({ userId });
    if (cart) {
      res.status(200).json({ message: 'Cart deleted successfully' });
      } else {
        res.status(404).json({ message: 'Cart not found' });
        }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
};