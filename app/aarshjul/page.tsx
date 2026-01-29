import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY, AARSHJUL_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/layout/Container";
import { Aarshjul } from "@/components/plants/Aarshjul";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(PAGE_BY_SLUG_QUERY, { slug: "aarshjul" });

  return {
    title: page?.title || "Årshjul",
    description: page?.description || "Se hvilke planter du kan så, plante og høste gjennom året",
  };
}

export default async function AarshjulPage() {
  const [page, plants] = await Promise.all([
    client.fetch(PAGE_BY_SLUG_QUERY, { slug: "aarshjul" }),
    client.fetch(AARSHJUL_QUERY),
  ]);

  return (
    <section className="py-16">
      <Container>
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)]">
            {page?.title ?? "Årshjul"}
          </h1>
          {page?.content && (
            <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
              Se hvilke planter du kan så, plante og høste gjennom året
            </p>
          )}
        </header>

        {/* Årshjul */}
        <Aarshjul plants={plants} />
      </Container>
    </section>
  );
}
