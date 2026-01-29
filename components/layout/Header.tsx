import Link from "next/link";
import { Container } from "./Container";
import { Nav } from "./Nav";

export async function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo / Tittel - Alignment: venstrejustert */}
          <Link
            href="/"
            className="text-2xl font-semibold text-[var(--color-primary-dark)] no-underline hover:text-[var(--color-primary)]"
          >
            Martines Hage
          </Link>

          {/* Navigasjon - Proximity: gruppert sammen */}
          <Nav />
        </div>
      </Container>
    </header>
  );
}
