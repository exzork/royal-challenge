import React from "react";

export default function HowItWork(){
    return (
        <div>
            <div className="text-yellow text-xl font-semibold">&#8212; How it Work</div>
            <div className="text-5xl">Steps to get powerful services</div>
            <div className="flex flex-col text-white mt-8 space-y-4">
                <div className="flex space-x-6">
                    <div className="text-xl">1</div>
                    <div className="flex-1">
                        <div className="text-xl">Site Map and User Flow</div>
                        <div className="text-gray-400 text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque omnis porro quasi repellendus voluptatum! Accusantium adipisci aut, dolor fugit inventore itaque nulla odio optio ratione similique sunt, vero voluptas voluptates.</div>
                    </div>
                </div>
                <div className="flex space-x-6">
                    <div className="text-xl">2</div>
                    <div className="flex-1">
                        <div className="text-xl">Wireframing / Lofi</div>
                        <div className="text-gray-400 text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad architecto consectetur consequatur, dolore, dolorum excepturi impedit incidunt inventore laborum modi molestiae molestias nulla omnis perferendis, quo repudiandae sapiente ut?</div>
                    </div>
                </div>
                <div className="flex space-x-6">
                    <div className="text-xl">3</div>
                    <div className="flex-1">
                        <div className="text-xl">Visualize / Hifi </div>
                        <div className="text-gray-400 text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet consectetur delectus facere id impedit incidunt, ipsa iste labore libero nulla omnis quae quia quis quisquam repellendus similique veritatis voluptate.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}