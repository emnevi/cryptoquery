const Spinner = ({height, color}) => {
    return <div style={{height, width: height}} className={`spinner-border ${color || "text-dark"}`} role="status">
    <span className="visually-hidden">Fetching...</span>
  </div>
}

export default Spinner