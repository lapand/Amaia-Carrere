interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader2: React.FC<LoaderProps> = ({ width = 50, height = 40 }) => {
  return (
    <div className="flex flex-col gap-16">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 absolute"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-300 absolute"></div>
      </div>
      <p className="luckiest-guy text-3xl">Loading...</p>
    </div>
  );
};

export default Loader2;

// style={{ width: `${width}px`, height: `${height}px` }}
