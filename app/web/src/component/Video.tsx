import React from "react";

interface VideoProps {
    url: string;
}

export default function Video(props:VideoProps){
    return (
        <iframe className="max-w-7xl w-full aspect-video mx-auto -translate-y-1/2" src={props.url}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
    )
}