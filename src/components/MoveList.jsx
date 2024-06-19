import Expander from "./Expander"

// Showing this way works too
export default function MoveList({ movesInPages, heading })
{
    return (
        <div className="move-list">
            <Expander heading={heading} initialShowing={true}>
                <ul>
                {
                    movesInPages.map((page, index) =>
                    {
                        return (
                            <section key={index}>
                            {
                                page.map((move) =>
                                {
                                    return (
                                        <li key={move.name}>
                                            <span hidden={isNaN(move.level)}>{move.level}</span><span>{move.name}</span>
                                        </li>
                                    )
                                })
                            }
                            </section>
                        )
                    })
                }
                </ul>
            </Expander>
        </div>
    )
}