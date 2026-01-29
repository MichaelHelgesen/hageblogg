interface ContainerProps {
  children: React.ReactNode;
  /** Bruk smalere bredde for lesbart innhold */
  narrow?: boolean;
  className?: string;
}

/**
 * Container-komponent for konsistent maksbredde og padding.
 * Følger CRAP Alignment-prinsippet - innhold er sentrert og justert.
 */
export function Container({ children, narrow, className = "" }: ContainerProps) {
  const maxWidth = narrow ? "max-w-[65ch]" : "max-w-[1200px]";

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`}>
      {children}
    </div>
  );
}
