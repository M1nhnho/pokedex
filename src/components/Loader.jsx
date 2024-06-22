const Loader = ({ errorMessage }) =>
{
    return (
        <>
            <div className="loading"></div>
            <div className="grass"></div>
            <p className="error-message">{errorMessage || 'Searching...'}</p>
        </>
    )
}

export default Loader;