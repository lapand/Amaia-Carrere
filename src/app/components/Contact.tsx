import Image from "next/image";
import ContactForm from "./Form";

const Contact: React.FC = () => {
    return (
        <div className="h-full flex flex-col gap-5">
            <div className="flex-1 flex justify-center items-center gap-24 py-28">
                <div className="w-1/4">
                    <ContactForm />
                </div>
                <div className="w-1/4 self-end">
                    <div className="">
                        <Image
                            src="/contact/lezard.png"
                            alt="lézards au téléphone"
                            width={650}
                            height={650}
                            className="size-full object-contain"
                        />
                    </div>
                </div>
            </div>
            <footer className="flex justify-center p-4">
                <div className="flex gap-3">
                    <div className="size-6">
                        <Image 
                            src="/contact/copyright.png"
                            alt="copyright"
                            width={50}
                            height={50}
                            className="size-full object-contain"           
                        />
                    </div>
                    <p className="">
                            2024 - Amaia Carrere - Auteur illustratrice - Tous droits réservés
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Contact;