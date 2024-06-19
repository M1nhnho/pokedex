import { useState } from "react";

const Expander = ({ children, heading, initialShowing }) =>
{
    const [isShowing, setIsShowing] = useState(initialShowing);

    const expandOnClick = () =>
    {
        setIsShowing((currentIsShowing) => !currentIsShowing);
    };

    return (
        <>
            <h2 className="expander-heading" onClick={() => expandOnClick()}>&nbsp;{isShowing ? '▼' : '▶'} {heading}</h2>
            { isShowing && <div className="pixel-vignette">{children}</div> }
        </>
    );
};

export default Expander;