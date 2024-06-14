import Card from "./Card";

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

const projects = [
    {
        content: "Le crowdfunding pour Lunatique, le fanzine de l'espace, va commencer dès le 20 Avril !!\nLe lien Ulule sera diffusé sur mes réseaux et sur le site ce jour là.\nLunatique est un recueil de BD humouristiques et de gags qui se passent en majorité dans l'espace.",
        img: {
            src: "/forSale/lunatique1.png",
            alt: "lunatique fanzine",
            width: 850,
            height: 850,
        },
        btnText: "Vers le site marchand",
    },
    {
        content: "Ttinka est disponible !\nC'est un livre-CD pour les tout petits de 0 à 6 ans, les textes sont d'Arantxa Hirigoyen, la musique de Philippe Albor, et j'ai fait les illustrations :)\nProduit par la maison de disque Belarri, de Matthieu Haramboure.\nTtinka est disponible en ligne depuis le 15 Novembre sur le site Belarri.",
        img: {
            src: "/forSale/ttinka1.jpg",
            alt: "livre Ttinka",
            width: 850,
            height: 850,
        },
        btnText: "Vers le site marchand",
    },
]

const ForSale: React.FC = () => {

    const projectCards = projects.map((project, i) => {
        return <Card key={i} content={project.content} img={project.img} btnText={project.btnText} />;
    })

    return (
        <div className="flex flex-col items-center gap-8 m-32">
            {projectCards}
        </div>
    );
};

export default ForSale;