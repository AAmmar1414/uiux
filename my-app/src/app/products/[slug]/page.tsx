

'use client';
import { use,useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaShoppingCart, FaTruck } from 'react-icons/fa';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import CustomerReviews from '@/app/components/customerrevies';


// interface Product {
//   _id: string;
//   title: string;
//   _type: 'products';
//   image?: {
//     asset: {
//       _ref: string;
//       _type: 'image';
//     };
//   };
//   price: number;
//   description: string;
//   slug: {
//     _type: 'slug';
//     current: string;
//   };
// }

// async function getProduct(slug: string): Promise<Product | null> {
//   return await client.fetch(
//     groq`*[_type == "products" && slug.current == $slug][0]{
//       _id,
//       title,
//       image,
//       price,
//       description,
//       slug
//     }`,
//     { slug }
//   );
// }

// export default function ProductPage({ params }:Product)   {
//   const { slug }:{slug:string} = params;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const fetchedProduct = await getProduct(slug);
//       setProduct(fetchedProduct);
//     };

//     fetchProduct();
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) setCart(JSON.parse(savedCart));
//   }, [slug]);


interface Product {
  _id: string;
  title: string;
  _type: 'products';
  image?: {
    asset: {
      _ref: string;
      _type: 'image';
    };
  };
  price: number;
  description: string;
  slug: {
    _type: 'slug';
    current: string;
  };
}

// Correct props interface for the page component
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  return await client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      title,
      image,
      price,
      description,
      slug
    }`,
    { slug }
  );
}

// Use PageProps instead of Product for the component props
export default function ProductPage({ params }: ProductPageProps) {
  // Use React.use() to unwrap params
  const { slug }: { slug: string } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(slug);
      setProduct(fetchedProduct);
    };

    fetchProduct();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, [slug]);


const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link href="/Product" className="text-purple-500 hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  // Find the current product in the cart, if any
  const currentProductInCart = cart.find((item) => item._id === product._id);
  const quantity = currentProductInCart ? currentProductInCart.quantity : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          {product.image && (
            <Image
              src={urlFor(product.image.asset).width(600).height(600).url()}
              alt={product.title}
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-xl text-gray-600 mt-2">${product.price}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>

          {/* Show quantity if product is in the cart */}
          {quantity > 0 && (
            <p className="mt-4 text-gray-600">
              Quantity: <strong>{quantity}</strong>
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            className="flex items-center justify-center bg-purple-600 text-white px-6 py-3 mt-6 rounded-lg hover:bg-purple-700"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>

          {/* Show Remove from Cart button if product is in the cart */}
          {quantity > 0 && (
            <button
              className="w-full bg-red-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-red-600"
              onClick={() => removeFromCart(product._id)}
            >
              Remove from Cart
            </button>
          )}

          {/* Proceed to Checkout Button */}
          {cart.length > 0 && (
            <Link href="/checkout">
              <button className="w-full bg-green-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-green-600">
                Proceed to Checkout
              </button>
            </Link>
          )}
            {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaTruck className="w-6 h-6 text-green-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <FaArrowRight className="w-6 h-6 text-green-500" />
              <span>30-day hassle-free return policy</span>
            </div>
            <Link href="/Product" className="text-purple-500 hover:underline text-lg">
              ← Back to Products
            </Link>

            <CustomerReviews/>
          </div>




        </div>
      </div>
    </div>
  );
}


