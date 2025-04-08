const ArrowDownAnimation = () => {
  return (
    <span
      className="relative w-10 h-20"
      style={{
        // Correction du rendu de l'animation sur iOS Safari
        willChange: 'transform, opacity',
        contain: 'paint',
        transform: 'translateZ(0)',
      }}
    >
      <span className="scroll-down-btn scroll-down-btn1">
        <span></span>
      </span>
      <span className="scroll-down-btn scroll-down-btn2">
        <span></span>
      </span>
    </span>
  );
};

export default ArrowDownAnimation;
