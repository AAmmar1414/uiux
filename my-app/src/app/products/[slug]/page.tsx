import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface ProductsPageProps {
  params: { slug: string }; // Corrected the type for params
}

// Fetch a single product by its slug
async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      title,
      _type,
      image,
      price,
      description
    }`,
    { slug }
  );
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { slug } = params; // Destructure slug directly
  const products = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          {products.image && (
            <Image
              src={urlFor(products.image).url()}
              alt={products.title}
              width={500}
              height={500}
              className="rounded-lg shadow-md object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white">{products.title}</h1>
          <p className="text-gray-400">{products.description}</p>
          <p className="text-2xl font-semibold text-purple-600">
            ${products.price}
          </p>

          {/* Back to Products Link */}
          <Link
            href="/Productss"
            className="text-purple-500 hover:underline text-lg"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}