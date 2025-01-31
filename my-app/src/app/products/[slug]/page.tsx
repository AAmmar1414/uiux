// import { client } from "@/sanity/lib/client";
// import { Product } from "../../../../types/products";
// import { groq } from "next-sanity";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import Link from "next/link";

// async function getProduct(slug: string): Promise<Product | null> {
//   try {
//     const product = await client.fetch(
//       groq`*[_type == "products" && slug.current == $slug][0]{
//         _id,
//         title,
//         _type,
//         image,
//         price,
//         description
//       }`,
//       { slug }
//     );
//     return product || null;
//   } catch (error) {
//     console.error("Failed to fetch product:", error);
//     return null;
//   }
// }

// // Ensure the function props align with Next.js's `PageProps` expectation
// interface ProductsPageProps {
//   params: { slug: string };
// }

// export default async function ProductsPage({ params }: ProductsPageProps) {
//   const { slug } = params;
//   const product = await getProduct(slug);

//   if (!product) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-white">Product not found</h1>
//         <Link href="/products" className="text-purple-500 hover:underline text-lg">
//           ← Back to Products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         <div className="aspect-square">
//           {product.image && (
//             <Image
//               src={urlFor(product.image).url()}
//               alt={product.title}
//               width={500}
//               height={500}
//               className="rounded-lg shadow-md object-cover"
//             />
//           )}
//         </div>
//         <div className="flex flex-col gap-6">
//           <h1 className="text-4xl font-bold text-white">{product.title}</h1>
//           <p className="text-gray-400">{product.description}</p>
//           <p className="text-2xl font-semibold text-purple-600">
//             ${product.price}
//           </p>
//           <Link href="/Productss" className="text-purple-500 hover:underline text-lg">
//             ← Back to Products
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Metadata } from 'next'
// import { notFound } from 'next/navigation'
// import Image from 'next/image'
// import { groq } from 'next-sanity'
// import { client } from '@/sanity/lib/client'
// import { urlFor } from '@/sanity/lib/image'
// import { Button } from '@/components/ui/button'
// import AddToCartButton from '@/app/components/AddtoCart'
// import { Star, Truck, ArrowRight } from 'lucide-react'
// import { Product } from '../../../../types/products'
// import CartComponent from '@/app/components/AddtoCart'
// import CartPage from '@/app/cart/page'
// import Link from 'next/link'



// interface ProductPageProps {
//   params: Promise<{ slug: string }> // Wrap params in Promise
// }

// async function getProduct(slug: string): Promise<Product | null> {
//   return client.fetch(
//     groq`*[_type == "products" && slug.current == $slug][0]{
//       _id,
//       _type,
//       title,
//       image,
//       price,
//       originalPrice,
//       description,
//       sizes,
//       "slug": slug.current,
//       category,
//       stock_quantity,
//       rating,
//       reviews,
//       tags
//     }`,
//     { slug }
//   )
// }

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   const { slug } = await params
//   const product = await getProduct(slug)

//   if (!product) {
//     return {
//       title: 'Product Not Found',
//     }
//   }

//   return {
//     title: product.title,
//     description: product.description,
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const { slug } = await params // Resolve the promise to get slug
//   const product = await getProduct(slug)

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
//             src={urlFor(product.image).width(800).height(800).url()}
//             alt={`Image of ${product.title}`}  // Added alt attribute
//             fill
//             className="object-cover"
//           />
//           )}
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col gap-8">
//           <h1 className="text-4xl font-bold">{product.title}</h1>

//           {/* Price */}
//           <div className="flex items-center gap-4">
//             <span className="text-3xl font-bold text-red-600">${product.price}</span>
//             {product.price && product.price > product.price && (
//               <span className="text-xl text-gray-500 line-through">${product.price}</span>
//             )}
//           </div>

//           {/* Description */}
//           <p className="text-lg text-gray-700">{product.description}</p>

//            {/* Add to Cart */}

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
//                  ← Back to Products
//            </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { Truck, ArrowRight } from 'lucide-react'
import AddToCartButton from '@/app/components/AddtoCart'
import Link from 'next/link'
import { Product } from '../../../../types/products'
import CustomerReviews from '@/app/components/customerrevies'

interface ProductPageProps {
  params: { slug: string }
}

// Fetch product data
async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      title,
      image,
      price,
      description,
      stock_quantity
    }`,
    { slug }
  )
}

// Metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: product ? product.title : 'Product Not Found',
    description: product ? product.description : '',
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          {product.image && (
            <Image
              src={urlFor(product.image).width(800).height(800).url()}
              alt={`Image of ${product.title}`}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-red-600">${product.price}</span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700">{product.description}</p>

          {/* Add to Cart & Checkout Buttons */}
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
            <Link href="/Productss" className="text-purple-500 hover:underline text-lg">
              ← Back to Products
            </Link>

            <CustomerReviews />
          </div>
        </div>
      </div>
    </div>
  )
}
