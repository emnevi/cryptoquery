const Search = ({ handleSubmit, setWallet, error, wallet }) => {
    return (
        <div className="d-flex flex-column">
            <h1 className="text-primary mb-1">Find out your hodling ROI!</h1>
            <small className="text-muted mb-3">We will query around and check how much you won for being a hodler!</small>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="Enter crypto wallet address"
                    className="form-control p-2 mb-3"
                />
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary w-100">
                    Go!
                </button>
            </form>
        </div>
    )
}


export default Search