import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_BY_SLUG_QUERY, CATEGORIES_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/layout/Container";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
  const page = await client.fetch(PAGE_BY_SLUG_QUERY, { slug: "blogg" });
  
  return {
    title: page?.title || "Blogg",
    description: page?.description,
  }}

export default async function CategoriesPage() {
  const [page, posts, cat] = await Promise.all([
    client.fetch(PAGE_BY_SLUG_QUERY, { slug: "kategorier" }),
    client.fetch(CATEGORIES_QUERY),
    client.fetch(POSTS_QUERY)
  ]);
  console.log(posts)

  function getImage(post){
    console.log(post)
    const result = cat.filter(item => 
      item.categories.some(el => el.title === post)
    ).slice(0,1);
    console.log(result)
    return result;
  }

  return (
    <section className="py-16">
      <Container>
        {/* Sideinnhold fra Sanity */}
        <h1 className="text-4xl font-bold">{page?.title ?? "Blogg"}</h1>
        {page?.content && (
          <div className="mt-4 text-lg text-[var(--color-text-light)]">
            {/* TODO: Render blockContent */}
          </div>
        )}

        {/* Liste over blogginnlegg */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="rounded-lg border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
            >
              {post.image ? 
                <Image 
                  src={urlFor(post.image).width(400).height(400).url()}
                  alt={post.image.alt || ""}
                    width={400}
                    height={400}
                    className="mb-4 h-40 rounded-md bg-[var(--color-bg-alt)] object-cover"
                ></Image>
              : 
                <Image 
                  src={urlFor(getImage(post.title)[0].mainImage).width(400).height(400).url()}
                  alt={getImage(post.title)[0].mainImage.alt || ""}
                    width={400}
                    height={400}
                    className="mb-4 h-40 rounded-md bg-[var(--color-bg-alt)] object-cover"
                ></Image>

              }
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {post.listText && (
                <p className="mt-2 text-[var(--color-text-light)]">
                  {post.listText}
                </p>
              )}
              <Link
                href={`/kategorier/${post.slug?.current}`}
                className="mt-4 inline-block text-sm font-medium"
              >
                Les mer &rarr;
              </Link> 

            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
