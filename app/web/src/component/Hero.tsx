import React from "react";

export default function Hero(){
    return (
        <div id="hero" className="max-w-7xl flex flex-col mx-auto text-white mt-16">
            <div className="mx-auto text-7xl text-center">We create digital product and solve your problem
            </div>
            <div className="mx-auto text-center mt-12">A fully integrated digital agency that will help you
                create beautiful website and solve your problem in your company
            </div>
            <div className="mx-auto flex mt-12">
                <button className="flex bg-white text-black px-8 py-4 rounded-full">
                    <span className="my-auto">Get Started</span>
                    <svg className="w-4 h-4 ml-2 my-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/>
                    </svg>
                </button>
                <button className="flex px-8 py-4">Learn More</button>
            </div>
        </div>
    )
}