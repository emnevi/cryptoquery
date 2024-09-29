import UIMessages from '../../assets/uimessages';

const ExplanationSection = ({ languageDetected }) => {
    return (
        <div className="bg-light text-dark d-flex flex-column w-100 vh-100">

            <div className="d-flex w-100 explanationCard mt-4">
                <div className="d-flex w-50 m-4 p-3 text-dark align-items-start justify-content-start flex-column" style={{ borderRadius: 6 }}>
                    <h2 className="text-dark fw-bold">{UIMessages[languageDetected].card1Title}</h2>
                    <p style={{textAlign: "justify"}}>{UIMessages[languageDetected].card1Text}</p>
                </div>
                <div className="d-flex w-50 m-4 p-3 text-dark align-items-start justify-content-start flex-column" style={{ borderRadius: 6 }}>
                    <h2 className="text-dark fw-bold">{UIMessages[languageDetected].card2Title}</h2>
                    <p style={{textAlign: "justify"}}>{UIMessages[languageDetected].card2Text}</p>
                </div>
            </div>


            <div className="d-flex w-100 explanationCard justify-content-center">
                <div className="d-flex w-50 m-4 p-3 text-dark align-items-start justify-content-start flex-column" style={{ borderRadius: 6 }}>
                    <h2 className="text-dark fw-bold">{UIMessages[languageDetected].card3Title}</h2>
                    <p style={{textAlign: "justify"}}>{UIMessages[languageDetected].card3Text}</p>
                </div>
            </div>

        </div>
    )
}

export default ExplanationSection