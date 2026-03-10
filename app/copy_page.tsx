import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY);
  const categories = await client.fetch(CATEGORIES_QUERY);
  return (
    <>
      {/* Hero-seksjon - Contrast: stor tekst, tydelig CTA */}
      <section className="bg-[var(--color-primary)] py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Velkommen til Martines Hage
            </h1>
            <p className="mt-4 text-lg text-white/90">
              En blogg om hage, planter og grønne gleder. Her deler jeg tips,
              guider og inspirasjon for alle som elsker å dyrke.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blogg"
                className="inline-flex items-center rounded-full bg-pink px-6 py-3 font-medium text-[var(--color-primary)] no-underline transition-colors hover:bg-[var(--color-accent)]"
              >
                Les bloggen
              </Link>
              <Link
                href="/planter"
                className="inline-flex items-center color-white rounded-full border-2 border-white px-6 py-3 font-medium text-white no-underline transition-colors hover:bg-white hover:text-[var(--color-primary)]"
              >
                Utforsk planter
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Innholdsseksjoner - Proximity: relatert innhold gruppert */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold">Siste innlegg</h2>
          <p className="mt-2 text-[var(--color-text-light)]">
            Her kommer de nyeste blogginnleggene.
          </p>

          {/* Blogginnlegg - Alignment: grid-layout */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
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
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="mt-2 text-[var(--color-text-light)]">
                  {post.listText || ""}
                </p>
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

      {/* Kategorier - Repetition: konsistent kortstil */}
      <section className="bg-[var(--color-bg-alt)] py-16">
        <Container>
          <h2 className="text-3xl font-semibold">Utforsk kategorier</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category, index) => (
                <Link
                  key={index}
                  href={`/kategorier/${category.slug?.current}`}
                  className="rounded-lg bg-white p-6 text-center font-medium no-underline transition-all hover:shadow-md hover:ring-2 hover:ring-[var(--color-primary)]"
                >
                  {category.title}
                </Link>
              )
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
