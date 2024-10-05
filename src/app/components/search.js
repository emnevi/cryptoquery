import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons"
import AdaIcon from "../assets/cardano-ada-logo.svg"
import Spinner from "./useful/spinner"
import UIMessages from "../assets/uimessages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"


const Search = ({ handleSubmit, setWallet, error, wallet, loading, languageDetected, isInvalidAddress }) => {

    if (!languageDetected) return

    return (
        <section className="bg-dark text-white py-20 vh-80 flex items-center justify-center" style={{ height: "55vh" }}>
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold">{UIMessages[languageDetected].title}</h1>
                <p className="mt-4 text-xl">{UIMessages[languageDetected].subtitle}</p>

                <form onSubmit={handleSubmit} className="mb-4 mt-4 container mx-auto text-center">
                    <div className="mb-3">
                        <div className="flex flex-col md:flex-row justify-center w-full max-w-2xl mx-auto space-y-4 md:space-y-0 md:space-x-2">
                            <Input
                                className={`w-fulltext-white border-${isInvalidAddress ? "danger" : "primary"}`}
                                value={wallet}
                                onChange={(e) => setWallet(e.target.value)}
                                id="floatingInput"
                                placeholder={UIMessages[languageDetected].inputPlaceholer}
                            />
                            <Button className={`w-full md:w-auto justify-self-end ${isInvalidAddress ? "bg-danger text-white" : ""}`} disabled={loading}>
                                {!loading && !isInvalidAddress && UIMessages[languageDetected].actionButton}
                                {loading && !isInvalidAddress && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                {isInvalidAddress && UIMessages[languageDetected].invalidAddress}
                            </Button>
                        </div>
                    </div>

                    <div className="align-items-center flex justify-center">
                        <FontAwesomeIcon className="mx-1" size="xl" icon={faBitcoin} />
                        <FontAwesomeIcon className="mx-1" size="xl" icon={faEthereum} />
                        <div className="flex justify-center">
                            <AdaIcon className="mx-1" width={23.25} height={23.25}></AdaIcon>
                        </div>
                    </div>
                </form>
            </div>
        </section>


    )
}


export default Search