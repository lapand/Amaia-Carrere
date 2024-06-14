import Button from "./Button";
import Image from "next/image";

type CardProps = {
    content: string,
    img?: {
        src: string,
        alt: string,
        width: number,
        height: number,
    },
    btnText?: string,
}

const Card: React.FC<CardProps> = ({ content, img, btnText }) => {
    return (
        <div className="w-full md:w-1/2 flex gap-8 bg-surface-200 border-2 border-surface-300 p-10 rounded-md">
            {img && 
                <div>
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
                </div>
            }
            <div className="flex flex-col justify-between">
                <p className="text-center">{content}</p>
                {btnText && <Button>{btnText}</Button>}
            </div>
        </div>
    );
};

export default Card;