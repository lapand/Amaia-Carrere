import GalleryItem from "./GalleryItem";

type DrawType = {
  uri: string,
  alt: string,
  width: number,
  height: number,
  colSpan: 1 | 2,
}

const draws: DrawType[] = [
  {
    uri: "/gallery/xilaba-mendiak-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  }, 
  {
    uri: "/gallery/xilaba-dantz-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  }, 
  {
    uri: "/gallery/maggy-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: "/gallery/histoire-bd-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 1,
  },
  {
    uri: "/gallery/11chewal-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 1,
  },
  {
    uri: "/gallery/chat-fee-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: "/gallery/temple-carpe-koi-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: "/gallery/argaihizkia-affiche-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: "/gallery/amitie-lapin-paon-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: "/gallery/oeil-dragon-bleu-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: "/gallery/quetzacoaltl-m.jpg",
    alt: "",
    width: 850,
    height: 850,
    colSpan: 2,
  },
];

const Gallery: React.FC = () => {

  const galleryItems = draws.map((draw, i: number) => (
    <GalleryItem key={i} uri={draw.uri} alt={draw.alt} width={draw.width} height={draw.height} colSpan={draw.colSpan}/>
  ));

    return(
      <div className="">
        <h2 className="londrina-shadow text-4xl m-8">Galerie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems}
        </div>
      </div>
    );
}

export default Gallery;