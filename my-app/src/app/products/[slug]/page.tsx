import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(
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
    return product || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Ensure the function props align with Next.js's `PageProps` expectation
interface ProductsPageProps {
  params: { slug: string };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white">Product not found</h1>
        <Link href="/products" className="text-purple-500 hover:underline text-lg">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.title}
              width={500}
              height={500}
              className="rounded-lg shadow-md object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white">{product.title}</h1>
          <p className="text-gray-400">{product.description}</p>
          <p className="text-2xl font-semibold text-purple-600">
            ${product.price}
          </p>
          <Link href="/Productss" className="text-purple-500 hover:underline text-lg">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
