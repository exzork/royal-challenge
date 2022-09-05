import React from "react";

export default function Counter(){
    return (
        <div className="flex mx-auto justify-around w-full max-w-7xl -mt-32 md:-mt-52 lg:-mt-72">
            <div className="flex flex-col">
                <div className="text-center font-bold text-2xl">2.5K+</div>
                <div className="text-center text-gray-600">Job done successfully</div>
            </div>
            <div className="flex flex-col">
                <div className="text-center font-bold text-2xl">2.2K+</div>
                <div className="text-center text-gray-600">Happy Clients</div>
            </div>
            <div className="flex flex-col">
                <div className="text-center font-bold text-2xl">94%</div>
                <div className="text-center text-gray-600">Daily Active Engagement</div>
            </div>
            <div className="flex flex-col">
                <div className="text-center font-bold text-2xl">58+</div>
                <div className="text-center text-gray-600">Trusted by Company</div>
            </div>
        </div>
    )
}