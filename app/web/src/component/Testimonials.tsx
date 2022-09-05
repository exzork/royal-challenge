import quote_left from "src/icons/quote_left.svg";
import star from "src/icons/star.svg";
import React from "react";

export default function Testimonials(){
    return (
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-4 mt-24">
            <div className="flex flex-col space-y-4 bg-white p-4 rounded">
                <img src={quote_left} className="w-12 h-12"/>
                <div className="text-xl text-gray-600">Dorry work was some of the best we've seen. Eu pretium neque cras sed pus et lectus</div>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold">Rizal Kenz</div>
                        <div className="text-xl text-gray-600">CEO TradingKuy</div>
                    </div>
                    <div className="flex mb-auto space-x-2">
                        <img src={star} className="w-8 h-8 my-auto"/>
                        <div className="my-auto text-xl font-semibold">4.8</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4 bg-white p-4 rounded">
                <img src={quote_left} className="w-12 h-12"/>
                <div className="text-xl text-gray-600">The service is really good and I think is the best agency than others. Thank you so much!</div>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold">Mikami Yue</div>
                        <div className="text-xl text-gray-600">Founder Hiroshima LLC</div>
                    </div>
                    <div className="flex mb-auto space-x-2">
                        <img src={star} className="w-8 h-8 my-auto"/>
                        <div className="my-auto text-xl font-semibold">4.8</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4 bg-white p-4 rounded">
                <img src={quote_left} className="w-12 h-12"/>
                <div className="text-xl text-gray-600">Working with Dorry was a great experience! Their designer are creative and handsome!</div>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold">Muhammad Draken</div>
                        <div className="text-xl text-gray-600">Founder Touman LLC</div>
                    </div>
                    <div className="flex mb-auto space-x-2">
                        <img src={star} className="w-8 h-8 my-auto"/>
                        <div className="my-auto text-xl font-semibold">4.8</div>
                    </div>
                </div>
            </div>
        </div>
    )
}