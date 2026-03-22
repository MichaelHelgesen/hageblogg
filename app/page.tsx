import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POSTS_QUERY, CATEGORIES_QUERY, PLANTS_QUERY } from "@/sanity/lib/queries";
import { BlogList } from "@/components/layout/BlogList"

// Dummy-data for nye seksjoner (kobles til Sanity senere)
const dummyPlant = {
  title: "Lavendel",
  latinName: "Lavandula angustifolia",
  slug: { current: "lavendel" },
  description:
    "En fantastisk duftende plante som tiltrekker pollinerende insekter og gir hagen et mediterrant preg. Perfekt for tørre, solrike bed.",
  hardiness: "Sone 4",
  location: "Full sol",
  flowering: "Juni–August",
  duration: "Flerårig",
};

const dummyGuide = {
  title: "Slik planter du hvitløk om høsten",
  description:
    "Lær hvordan du får best resultat med høstplanting av hvitløk. En enkel guide som gir deg stor avling til neste sommer.",
  slug: { current: "plante-hvitlok-host" },
  stepsCount: 5,
  category: "Kjøkkenhage",
};

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY);
  const categories = await client.fetch(CATEGORIES_QUERY);
  const plants = await client.fetch(PLANTS_QUERY);

  return (
    <>
      {/* Hero */}
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
                className="inline-flex items-center rounded-full bg-white px-6 py-3 font-medium text-[var(--color-primary)] no-underline transition-colors hover:bg-[var(--color-accent)]"
              >
                Les bloggen
              </Link>
              <Link
                href="/planter"
                className="inline-flex items-center !text-whit !text-whitee rounded-full border-2 border-white px-6 py-3 font-medium text-white no-underline transition-colors hover:bg-white hover:text-[var(--color-primary)]"
              >
                Utforsk planter
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Siste blogginnlegg */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold">Siste innlegg</h2>
          <p className="mt-2 text-[var(--color-text-light)]">
            Ferske tips og inspirasjon fra hagen.
          </p>

          <BlogList posts={posts} />
        </Container>
      </section>

      {/* Ukens plante (dummy-data) */}
      <section className="bg-[var(--color-bg-alt)] py-16">
        <Container>
          <h2 className="text-3xl font-semibold">Ukens plante</h2>
          <p className="mt-2 text-[var(--color-text-light)]">
            Bli kjent med en ny plante.
          </p>
{plants.slice(1, 2).map((plant, index) => (
	<div key={index} className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="grid md:grid-cols-2">
              {/* Placeholder for bilde */}
              {plant.image ? (
                  <Image
                    src={urlFor(plant.image).width(400).height(400).url()}
                    alt={plant.image.alt || ""}
                    width={400}
                    height={400}
                    className="mb-4 h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="mb-4 h-40 rounded-md bg-[var(--color-bg-alt)]" />
                )}

              {/* Innhold */}
              <div className="p-8">
                <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  {dummyPlant.latinName}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">
                  {dummyPlant.title}
                </h3>

                {/* Egenskaper */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">☀️</span>
                    <span>{dummyPlant.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">🌡️</span>
                    <span>{dummyPlant.hardiness}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">🌸</span>
                    <span>{dummyPlant.flowering}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">🌱</span>
                    <span>{dummyPlant.duration}</span>
                  </div>
                </div>

                <p className="mt-6 text-[var(--color-text-light)]">
                  {dummyPlant.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/planter/${dummyPlant.slug.current}`}
                    className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[var(--color-primary-dark)]"
                  >
                    Se plante &rarr;
                  </Link>
                  <Link
                    href="/planter"
                    className="inline-flex items-center rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium no-underline transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    Alle planter
                  </Link>
                </div>
              </div>
            </div>
          </div>
))}
          
        </Container>
      </section>

      {/* Aktuell guide (dummy-data) */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold">Aktuell guide</h2>
          <p className="mt-2 text-[var(--color-text-light)]">
            Lær noe nytt med våre steg-for-steg guider.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
            <div className="grid md:grid-cols-5">
              {/* Placeholder for bilde */}
              <div className="aspect-video bg-[var(--color-secondary-light)] md:col-span-2 md:aspect-auto" />

              {/* Innhold */}
              <div className="flex flex-col justify-center p-8 md:col-span-3">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-light)]">
                  <span className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1">
                    {dummyGuide.stepsCount} steg
                  </span>
                  <span className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1">
                    {dummyGuide.category}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold">
                  {dummyGuide.title}
                </h3>
                <p className="mt-3 text-[var(--color-text-light)]">
                  {dummyGuide.description}
                </p>

                <div className="mt-6">
                  <Link
                    href={`/guider/${dummyGuide.slug.current}`}
                    className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[var(--color-primary-dark)]"
                  >
                    Les guiden &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Utforsk kategorier */}
      <section className="bg-[var(--color-bg-alt)] py-16">
        <Container>
          <h2 className="text-3xl font-semibold">Utforsk kategorier</h2>
          <p className="mt-2 text-[var(--color-text-light)]">
            Finn innhold etter tema.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category._id}
                href={`/kategorier/${category.slug?.current}`}
                className="group rounded-xl bg-white p-6 text-center no-underline shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-[var(--color-primary)]"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-alt)] text-2xl transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  🌿
                </div>
                <span className="font-medium">{category.title}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Om Martine (dummy-data) */}
      <section className="py-16">
        <Container>
          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
            <div className="grid items-center md:grid-cols-3">
              {/* Placeholder for bilde */}
              <div className="aspect-square bg-[var(--color-bg-alt)] md:aspect-auto md:h-full" />

              {/* Innhold */}
              <div className="p-8 md:col-span-2">
                <h2 className="text-2xl font-semibold">Hei, jeg er Martine!</h2>
                <p className="mt-4 text-[var(--color-text-light)]">
                  Jeg er en hageentusiast fra Norge med en lidenskap for
                  stauder, kjøkkenhage og alt som blomstrer. Her på bloggen
                  deler jeg mine erfaringer, tips og inspirasjoner fra min egen
                  hage.
                </p>
                <p className="mt-3 text-[var(--color-text-light)]">
                  Enten du er nybegynner eller erfaren gartner, håper jeg du
                  finner noe nyttig her.
                </p>
                <Link
                  href="/om"
                  className="mt-6 inline-flex items-center rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium no-underline transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  Les mer om meg &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Instagram-feed (dummy-data) */}
      <section className="bg-[var(--color-bg-alt)] py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Følg meg på Instagram</h2>
              <p className="mt-2 text-[var(--color-text-light)]">
                @martineshage
              </p>
            </div>
            <a
              href="https://instagram.com/martineshage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium no-underline transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              Følg på Instagram
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a
                key={i}
                href="https://instagram.com/martineshage"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg bg-[var(--color-bg)]"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-primary)]/0 transition-colors group-hover:bg-[var(--color-primary)]/20">
                  <span className="text-2xl opacity-0 transition-opacity group-hover:opacity-100">
                    ❤️
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
