

// import { Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import Image from 'next/image'
// import { groq } from 'next-sanity'
// import { client } from '@/sanity/lib/client'
// import { urlFor } from '@/sanity/lib/image'
// import { Truck, ArrowRight } from 'lucide-react'
// import AddToCartButton from '@/app/components/AddtoCart'
// import Link from 'next/link'
// import { Product } from '../../../../types/products'
// import CustomerReviews from '@/app/components/customerrevies'

// interface ProductPageProps {
//   params: { slug: string }
// }

// // Fetch product data
// async function getProduct(slug: string): Promise<Product | null> {
//   return client.fetch(
//     groq`*[_type == "products" && slug.current == $slug][0]{
//       _id,
//       title,
//       image,
//       price,
//       description,
//       stock_quantity
//     }`,
//     { slug }
//   )
// }

// // Metadata for SEO
// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   const product = await getProduct(params.slug)
//   return {
//     title: product ? product.title : 'Product Not Found',
//     description: product ? product.description : '',
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const product = await getProduct(params.slug)

//   if (!product) {
//     notFound()
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Product Image */}
//         <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
//           {product.image && (
//             <Image
//               src={urlFor(product.image).width(800).height(800).url()}
//               alt={`Image of ${product.title}`}
//               fill
//               className="object-cover"
//             />
//           )}
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col gap-8">
//           <h1 className="text-4xl font-bold">{product.title}</h1>

//           {/* Price */}
//           <div className="flex items-center gap-4">
//             <span className="text-3xl font-bold text-red-600">${product.price}</span>
//           </div>

//           {/* Description */}
//           <p className="text-lg text-gray-700">{product.description}</p>

//           {/* Add to Cart & Checkout Buttons */}
//           <div className="flex flex-col gap-4">
//             <AddToCartButton product={product} />
//           </div>

//           {/* Additional Info */}
//           <div className="border-t border-gray-200 pt-6 space-y-4">
//             <div className="flex items-center gap-3 text-lg text-gray-700">
//               <Truck className="w-6 h-6 text-green-500" />
//               <span>Free shipping on orders over $50</span>
//             </div>
//             <div className="flex items-center gap-3 text-lg text-gray-700">
//               <ArrowRight className="w-6 h-6 text-green-500" />
//               <span>30-day hassle-free return policy</span>
//             </div>
//             <Link href="/Productss" className="text-purple-500 hover:underline text-lg">
//               ← Back to Products
//             </Link>

//             <CustomerReviews />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Truck, ArrowRight } from 'lucide-react';
import AddToCartButton from '@/app/components/AddtoCart';
import Link from 'next/link';
import CustomerReviews from '@/app/components/customerrevies';

// Type definitions
interface ProductPageProps {
  params: { slug: string };
}

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  stock_quantity: number;
}

// Fetch product data
async function getProduct(slug: string): Promise<Product | null> {
  return await client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      title,
      image,
      price,
      description,
      stock_quantity
    }`,
    { slug }
  );
}

// Metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  return {
    title: product ? product.title : 'Product Not Found',
    description: product ? product.description : 'This product does not exist.',
  };
}

// Product Page Component
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  // Handle product not found
  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link href="/products" className="text-purple-500 hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link> &gt;{' '}
        <Link href="/products">Products</Link> &gt; {product.title}
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          {product.image && (
            <Image
              src={urlFor(product.image).width(800).height(800).url()}
              alt={`Image of ${product.title}`}
              fill
              className="object-cover"
              placeholder="empty" // Prevents blur errors
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-red-600">
              ${product.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700">{product.description}</p>

          {/* Add to Cart */}
          <div className="flex flex-col gap-4">
            <AddToCartButton product={product} />
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <Truck className="w-6 h-6 text-green-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-lg text-gray-700">
              <ArrowRight className="w-6 h-6 text-green-500" />
              <span>30-day hassle-free return policy</span>
            </div>
            <Link
              href="/products"
              className="text-purple-500 hover:underline text-lg"
            >
              ← Back to Products
            </Link>

            <CustomerReviews productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
}


