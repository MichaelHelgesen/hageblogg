import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import {POSTS_QUERY, PAGE_BY_SLUG_QUERY, CATEGORIES_QUERY, CATEGORY_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/layout/Container";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props): Promise<Metadata> {
  const page = await client.fetch(PAGE_BY_SLUG_QUERY, { slug: "kategori" });
  
  return {
    title: page?.title || "Blogg",
    description: page?.description,
  }}

export default async function CategoryPage({params}) {
  console.log({params})
  const { slug } = await params;
  //const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  const [page, posts] = await Promise.all([
      client.fetch(CATEGORY_QUERY, { slug: slug }),
      client.fetch(POSTS_QUERY)
  ]);

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
          {posts.filter(cat => cat.categories.filter(item => item.title === page.title).length > 0).map((post) => (
            <article
              key={post._id}
              className="rounded-lg border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
            >
              {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(400).height(160).url()}
                    alt={post.mainImage.alt || ""}
                    width={400}
                    height={160}
                    className="mb-4 h-40 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="mb-4 h-40 rounded-md bg-[var(--color-bg-alt)]" />
                )}
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {post.listText && (
                <p className="mt-2 text-[var(--color-text-light)]">
                  {post.listText}
                </p>
              )}
              <Link
                href={`/blogg/${post.slug?.current}`}
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
