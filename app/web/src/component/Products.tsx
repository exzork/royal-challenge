import section4_1 from "src/images/section4-1.png";
import section4_item1 from "src/images/section4_item1.png";
import section4_item2 from "src/images/section4_item2.png";
import section4_item3 from "src/images/section4_item3.png";
import section4_item4 from "src/images/section4_item4.png";
import React from "react";

export default function Products(){
    return (
        <div className="max-w-7xl w-full mx-auto flex md:space-x-8 mt-12">
            <img src={section4_1} className="hidden md:block"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-4">
                    <img src={section4_item1} className="w-full"/>
                    <div className="text-xl font-semibold">Fashion Landing Page</div>
                    <div className="text-gray-500">We make this landing page for fashion marketplace we called fesyen</div>
                </div>
                <div className="flex flex-col space-y-4">
                    <img src={section4_item2} className="w-full"/>
                    <div className="text-xl font-semibold">Insurance Landing Page</div>
                    <div className="text-gray-500">Secure.In is company who will help you stay safety with her services</div>
                </div>
                <div className="flex flex-col space-y-4">
                    <img src={section4_item3} className="w-full"/>
                    <div className="text-xl font-semibold">NFT Dashboard</div>
                    <div className="text-gray-500">As current trend we make nft dashboard project to sell your art here</div>
                </div>
                <div className="flex flex-col space-y-4">
                    <img src={section4_item4} className="w-full"/>
                    <div className="text-xl font-semibold">Donation Mobile App</div>
                    <div className="text-gray-500">Donari is a donation mobile app in inazuma, he have vision to help other.</div>
                </div>
            </div>
        </div>
    )
}