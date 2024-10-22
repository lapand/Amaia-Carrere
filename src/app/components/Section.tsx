import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", style, id }) => {

    return(
      <section 
        className={`section-padding border-b-2 border-surface-300 ${className}`}
        style={style}
        id={id}
      >
        {children}
      </section>
    );
}

export default Section;