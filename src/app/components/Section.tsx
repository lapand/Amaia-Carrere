import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
    className?: string;
    style?: React.CSSProperties
}

const Section: React.FC<SectionProps> = ({ children, className = "", style }) => {

    return(
      <section 
        className={`section-padding border-b-2 border-surface-300 ${className}`}
        style={style}
      >
        {children}
      </section>
    );
}

export default Section;