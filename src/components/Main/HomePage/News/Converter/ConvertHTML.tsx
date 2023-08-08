import { Parser } from 'html-to-react'
import React from 'react'

interface Props {
    html: string
}

const ConvertHTML = ({ html }: Props) => {

    const parser = Parser();
    const reactElement = parser.parse(html);
    return (
        <>{reactElement}</>
    )
}

export default ConvertHTML