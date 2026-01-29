import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY, GUIDES_QUERY } from "@/sanity/lib/queries";
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

export default async function GuidePage() {
  const [page, posts] = await Promise.all([
    client.fetch(PAGE_BY_SLUG_QUERY, { slug: "guider" }),
    client.fetch(GUIDES_QUERY),
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
          {posts.map((post) => (
            <article
              key={post._id}
              className="rounded-lg border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
            >
              {post.mainImage && (
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
