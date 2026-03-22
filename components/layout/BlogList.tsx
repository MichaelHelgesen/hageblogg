import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";


export async function BlogList({posts}) {
  return (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(0, 6).map((post) => (
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
          <p className="mt-2 text-[var(--color-text-light)] line-clamp-2">
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

  );
}
