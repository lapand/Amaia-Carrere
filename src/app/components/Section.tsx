import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
    className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {

    return(
      <section className={`section-padding border-b-2 border-surface-300 ${className}`}>
        {children}
      </section>
    );
}

export default Section;