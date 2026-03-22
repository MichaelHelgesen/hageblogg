import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PLANT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PLANTS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PLANT_TYPE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PLANT_TYPES_QUERY } from "@/sanity/lib/queries";
import { PLANT_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/layout/Container";

type Props = {
  params: Promise<{ slug: string }>;
};
type Props = {
  params: Promise<{ plantType: string }>;
};
type Props = {
  params: Promise<{ plant: string }>;
};

export default async function PlantPage({ params }: Props) {
  const { slug, plantType, plant } = await params;
  const post = await client.fetch(PLANT_TYPE_BY_SLUG_QUERY, { slug });
  const plants = await client.fetch(PLANTS_BY_SLUG_QUERY, { plantType });
  const a_plant = await client.fetch(PLANT_BY_SLUG_QUERY, { plant });
  const all_plants = await client.fetch(PLANT_TYPES_QUERY);
  const plant_category = await client.fetch(PLANT_CATEGORY_QUERY);

  if (!post) {
    notFound();
  }
console.log("POST", post)
  return (
    <section className="py-16">
      <Container>
        {/* Sideinnhold fra Sanity */}
        <h1 className="text-4xl font-bold">{a_plant.title}</h1>
        <p>{a_plant.description}</p>
        {plants && (
          <div className="mt-4 text-lg text-[var(--color-text-light)]">
            {/* TODO: Render blockContent */}
            <p>{plant.title}</p>
          </div>
        )}

        {/* Liste over blogginnlegg */}
        <h2>Andre typer {plantType}</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plants.filter((plant => plant.title != a_plant.title)).sort((a,b) => a.title.localeCompare(b.title, "nb")).map((post) => (
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

        {/* Liste over blogginnlegg */}
        <h2>Andre typer {slug}</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {all_plants.filter(plant => plant.categoryTitle === post.categoryTitle && plant.slug.current != plantType).sort((a,b) => a.title.localeCompare(b.title, "nb")).map((post) => (
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
                href={`/planter/${slug}/${post.slug?.current}`}
                className="mt-4 inline-block text-sm font-medium"
              >
                Les mer &rarr;
              </Link>
            </article>
          ))}
        </div>

        {/* Liste over blogginnlegg */}
        <h2>Andre typer plantekategorier</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plant_category.filter(cat => cat.slug.current != slug).sort((a,b) => a.title.localeCompare(b.title, "nb")).map((post) => (
            <article
              key={post._id}
              className="rounded-lg border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-md"
            >
              {post.mainImage && (
                <div className="mb-4 h-40 rounded-md bg-[var(--color-bg-alt)]" />
              )}
              <h2 className="text-xl font-semibold">{post.title}{post.slug.current}</h2>
              {post.listText && (
                <p className="mt-2 text-[var(--color-text-light)]">
                  {post.listText}
                </p>
              )}
              <Link
                href={`/planter/${post.slug?.current}`}
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

