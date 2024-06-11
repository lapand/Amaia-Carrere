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
    <div className={`cursor-pointer shadow-lg ${colSpan === 2 ? 'col-span-2' : 'col-span-1'}`}>
      <Image
        src={uri}
        alt={alt}
        width={width}
        height={height}
        className="size-full"
      />
    </div>
  );
};

export default GalleryItem;
