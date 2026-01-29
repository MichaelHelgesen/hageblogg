import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/layout/Container";
import { PortableText } from "@/components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import type { POST_BY_SLUG_QUERYResult } from "@/sanity.types";

type Props = {
  params: Promise<{ slug: string }>;
};

type Post = NonNullable<POST_BY_SLUG_QUERYResult>;
type Category = NonNullable<Post["categories"]>[number];
type Plant = NonNullable<Post["plants"]>[number];
type RelatedPost = NonNullable<Post["relatedPosts"]>[number];
type RelatedGuide = NonNullable<Post["relatedGuides"]>[number];
type RelatedPlant = NonNullable<Post["relatedPlants"]>[number];

export default async function BloggPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16">
      <Container narrow>
        {/* Kategorier */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-4 flex gap-2">
            {post.categories.map((category: Category) => (
              <span
                key={category._id}
                className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Tittel */}
        <h1 className="text-4xl font-bold">{post.title}</h1>

        {/* Hovedbilde */}
        {post.mainImage?.asset && (
          <figure className="mt-8">
            <Image
              src={urlFor(post.mainImage).width(800).height(450).url()}
              alt={post.mainImage.alt || post.title || ''}
              width={800}
              height={450}
              className="w-full rounded-lg"
              priority
            />
            {post.mainImage.caption && (
              <figcaption className="mt-2 text-center text-sm text-[var(--color-text-light)]">
                {post.mainImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Innhold */}
        <div className="mt-8">
          <PortableText value={post.content} />
        </div>

        {/* Relaterte innlegg */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-12 border-t border-[var(--color-border)] pt-8">
            <h2 className="mb-4 text-xl font-semibold">Relaterte innlegg</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {post.relatedPosts.map((relatedPost: RelatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blogg/${relatedPost.slug?.current}`}
                  className="group flex gap-4 rounded-lg border border-[var(--color-border)] p-4 no-underline transition-colors hover:bg-[var(--color-bg-alt)]"
                >
                  {relatedPost.mainImage?.asset && (
                    <Image
                      src={urlFor(relatedPost.mainImage).width(100).height(100).url()}
                      alt={relatedPost.mainImage.alt || relatedPost.title || ''}
                      width={100}
                      height={100}
                      className="h-20 w-20 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold group-hover:text-[var(--color-primary)]">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.listText && (
                      <p className="mt-1 text-sm text-[var(--color-text-light)] line-clamp-2">
                        {relatedPost.listText}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Relaterte guider */}
        {post.relatedGuides && post.relatedGuides.length > 0 && (
          <div className="mt-12 border-t border-[var(--color-border)] pt-8">
            <h2 className="mb-4 text-xl font-semibold">Relaterte guider</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {post.relatedGuides.map((guide: RelatedGuide) => (
                <Link
                  key={guide._id}
                  href={`/guider/${guide.slug?.current}`}
                  className="group flex gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4 no-underline transition-colors hover:border-[var(--color-primary)]"
                >
                  <span className="text-2xl">📖</span>
                  <div>
                    <h3 className="font-semibold group-hover:text-[var(--color-primary)]">
                      {guide.title}
                    </h3>
                    {guide.description && (
                      <p className="mt-1 text-sm text-[var(--color-text-light)] line-clamp-2">
                        {guide.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Relaterte planter */}
        {post.relatedPlants && post.relatedPlants.length > 0 && (
          <div className="mt-12 border-t border-[var(--color-border)] pt-8">
            <h2 className="mb-4 text-xl font-semibold">Relaterte planter</h2>
            <div className="flex flex-wrap gap-3">
              {post.relatedPlants.map((plant: RelatedPlant) => (
                <Link
                  key={plant._id}
                  href={`/planter/${plant.slug?.current}`}
                  className="group flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 no-underline transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-alt)]"
                >
                  {plant.image?.asset && (
                    <Image
                      src={urlFor(plant.image).width(32).height(32).url()}
                      alt={plant.image.alt || plant.title || ''}
                      width={32}
                      height={32}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm font-medium group-hover:text-[var(--color-primary)]">
                    {plant.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tilbake-lenke */}
        <div className="mt-12">
          <Link href="/blogg" className="text-sm">
            &larr; Tilbake til bloggen
          </Link>
        </div>
      </Container>
    </article>
  );
}
