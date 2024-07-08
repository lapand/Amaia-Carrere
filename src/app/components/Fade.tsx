import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

type From = {
  opacity?: number;
  x?: number;
  y?: number;
  z?: number;
};

type Fade = PropsWithChildren<{
  visible: boolean;
  duration?: number;
  delay?: number;
  animateEnter?: boolean;
  from?: From;
  style?: CSSProperties;
  className?: string;
}>;

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

const Fade: React.FC<Fade> = ({
  children,
  visible,
  duration = 500,
  delay = 0,
  animateEnter = false,
  from = { opacity: 0, x: 0, y: 0, z: 0 },
  style,
  className,
}) => {
  const childRef = useRef(children);
  // state représente l'état du composant Fade
  const [state, setState] = useState(
    visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN
  );

  if (visible) {
    childRef.current = children;
  }

  useEffect(() => {
    if (!visible) {
      setState((s) => (s === VISIBLE ? LEAVING : HIDDEN));
    } else {
      setState((s) => (s === HIDDEN ? ENTERING : VISIBLE));
    }
  }, [visible]);

  useEffect(() => {
    if (state === LEAVING) {
      const timer = setTimeout(() => {
        setState(HIDDEN);
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    } else if (state === ENTERING) {
      document.body.offsetHeight;
      setState(VISIBLE);
    }
  }, [state]);

  if (state === HIDDEN) {
    return null;
  }

  // VISIBLE => style opacity 1 et présence dans le DOM
  // ENTERING & LEAVING => style opacity 0 et présence dans le DOM
  // HIDDEN => style opacity 0 et suppression du DOM

  let transitionStyle: CSSProperties = {
    transitionProperty: 'opacity transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'ease-in-out',
    transitionDelay: `${delay}ms`
  };
  if (state !== VISIBLE) {
    if (from.opacity !== undefined) {
      transitionStyle.opacity = from.opacity;
    }
    transitionStyle.transform = `translate3d(${from.x ?? 0}px, ${
      from.y ?? 0
    }px, ${from.z ?? 0}px)`;
  }

  //L'ordre de déstructuration des styles a de l'importance :
  // On déstructurera transitionStyle en second afin qu'il vienne overwrite les styles apportés et permettre un effet de transition correct
  return (
    <div style={{ ...style, ...transitionStyle }} className={className}>
      {childRef.current}
    </div>
  );
};

export default Fade;
