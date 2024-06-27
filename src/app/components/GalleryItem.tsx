import Image from 'next/image';

type GalleryItemProps = {
  uri: string,
  alt: string,
  width: number,
  height: number,
  colSpan: 1 | 2,
}

const GalleryItem: React.FC<GalleryItemProps> = ({ uri, alt, width, height, colSpan }) => {

  return (
    <div className={`${colSpan === 2 ? 'col-span-2' : 'col-span-1'} flex justify-center items-center cursor-pointer overflow-hidden`}>
      <Image
        src={uri}
        alt={alt}
        width={width}
        height={height}
        className="size-full object-contain transition-transform duration-400 hover:scale-105 grayscale hover:grayscale-0"
      />
    </div>
  );
};

export default GalleryItem;
