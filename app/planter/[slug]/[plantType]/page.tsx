import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PLANTS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PLANT_TYPE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/layout/Container";

type Props = {
  params: Promise<{ slug: string }>;
};
type Props = {
  params: Promise<{ plantType: string }>;
};
console.log("planttype")
export default async function PlantTypePage({ params }: Props) {
  const { slug, plantType } = await params;
  const post = await client.fetch(PLANT_TYPE_BY_SLUG_QUERY, { slug });
  const plants = await client.fetch(PLANTS_BY_SLUG_QUERY, { plantType });
  if (!post) {
    notFound();
  }
console.log("POST", plantType)
  return (
    <section className="py-16">
      <Container>
        {/* Sideinnhold fra Sanity */}
        <h1 className="text-4xl font-bold">{post.title}</h1>
        {plants && (
          <div className="mt-4 text-lg text-[var(--color-text-light)]">
            {/* TODO: Render blockContent */}
          </div>
        )}

        {/* Liste over blogginnlegg */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plants.sort((a,b) => a.title.localeCompare(b.title, "nb")).map((post) => (
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
                href={`/planter/${slug}/${plantType}/${post.slug?.current}`}
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

