import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
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

export default async function PlantPage() {
  const [page, posts] = await Promise.all([
    client.fetch(PAGE_BY_SLUG_QUERY, { slug: "kontakt" }),
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

      </Container>
    </section>
  );
}
