interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader: React.FC<LoaderProps> = ({width = 50, height = 40}) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-16">
      <div className="rect flex justify-center gap-1" style={{ width: `${width}px`, height: `${height}px` }}>
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
};

export default Loader;



    // <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-16">
    //   <div className="relative flex items-center justify-center">
    //     <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 absolute"></div>
    //     <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-300 absolute"></div>
    //   </div>
    //   <p className="luckiest-guy text-4xl">Loading...</p>
    // </div>