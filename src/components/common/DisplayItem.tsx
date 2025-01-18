import React from 'react';

interface Props {
    heading?: string;
    title?: string;
    subHeading?: string;
}

export const DisplayItem = ({heading, title, subHeading }: Props) => {
    return (
        <div className="mt-6 flex justify-between">
        <div>
            {heading && (<p className="text-xs">{heading}</p>)}
            <h3 className="text-sm text-black-black font-medium">{title}</h3>
            {subHeading && (<p className="text-xs max-w-[360px] md:max-w-full">{subHeading}</p>)}
        </div>
    </div>

    )
}