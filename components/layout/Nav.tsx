import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PAGES_QUERY } from "@/sanity/lib/queries";

export async function Nav() {
  const pages = await client.fetch(PAGES_QUERY);

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {pages.map((page) => (
          <li key={page._id}>
            <Link
              href={`/${page.slug?.current}`}
              className="text-[var(--color-text)] no-underline hover:text-[var(--color-primary)]"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
