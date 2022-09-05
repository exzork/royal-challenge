import React from "react";

export default function Navigation(){
    return (
        <div id="navigation" className="flex max-w-7xl mx-auto text-white pt-8">
            <div className="flex-1 font-bold text-3xl my-auto">Dorry</div>
            <div className="md:flex hidden">
                <div className="px-6 py-4">Pricing</div>
                <div className="px-6 py-4">About</div>
                <div className="px-6 py-4">Learn</div>
                <div className="px-6 py-4">Corporate</div>
                <div className="px-6 py-4">News</div>
            </div>
            <div className="flex-1 text-end">
                <button className="px-10 py-4 bg-transparent border border-white rounded-full">Contact Us
                </button>
            </div>
        </div>
    )
}