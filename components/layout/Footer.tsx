import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-alt)] py-8">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Copyright - Alignment: venstrejustert på desktop */}
          <p className="text-sm text-[var(--color-text-light)]">
            &copy; {currentYear} Martines Hage. Alle rettigheter reservert.
          </p>

          {/* Sosiale lenker - Proximity: gruppert */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-primary)]"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-[var(--color-text-light)] no-underline hover:text-[var(--color-primary)]"
            >
              Pinterest
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
