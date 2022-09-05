import computer from "src/icons/computer.svg";
import code from "src/icons/code.svg";
import inscription from "src/icons/inscription.svg";
import commercial from "src/icons/commercial.svg";
import drawing from "src/icons/drawing.svg";
import videos from "src/icons/video_playlist.svg";
import React from "react";

export default function Services(){
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 max-w-7xl w-full mx-auto mt-20 mb-12 gap-6">
            <div className="flex flex-col items-center border py-12 px-4 shadow-xl">
                <div className="bg-gray-200 p-4 rounded-full">
                    <img className="w-24 h-24" src={computer} alt=""/>
                </div>
                <div className="text-3xl text-black text-center my-8">UI/UX Design</div>
                <div className="text-xl text-gray-500 text-center">Create Landing Page, Mobile App, Dashboard, Prototyping, Wireframing</div>
            </div>
            <div className="flex flex-col items-center border py-12 px-4 shadow-xl">
                <div className="bg-gray-200 p-4 rounded-full">
                    <img className="w-24 h-24" src={code} alt=""/>
                </div>
                <div className="text-3xl text-black text-center my-8">Development</div>
                <div className="text-xl text-gray-500 text-center">Create Website and Responsive Website by HTML/CSS, React, Webflow</div>
            </div>
            <div className="flex flex-col items-center border py-12 px-4 shadow-xl">
                <div className="bg-gray-200 p-4 rounded-full">
                    <img className="w-24 h-24" src={inscription} alt=""/>
                </div>
                <div className="text-3xl text-black text-center my-8">Content Writing</div>
                <div className="text-xl text-gray-500 text-center">Create beautiful word for your website that will attract customers</div>
            </div>
            <div className="flex flex-col items-center border py-12 px-4 shadow-xl">
                <div className="bg-gray-200 p-4 rounded-full">
                    <img className="w-24 h-24" src={commercial} alt=""/>
                </div>
                <div className="text-3xl text-black text-center my-8">Branding</div>
                <div className="text-xl text-gray-500 text-center">Create visual identity and marketing materials for your company</div>
            </div>
            <div className="flex flex-col items-center border py-12 px-4 shadow-xl">
                <div className="bg-gray-200 p-4 rounded-full">
                    <img className="w-24 h-24" src={drawing} alt=""/>
                </div>
                <div className="text-3xl text-black text-center my-8">Illustration</div>
                <div className="text-xl text-gray-500 text-center">Create character kit, empty state illustration for your design</div>
            </div>
            <div className="flex flex-col items-center border py-12 px-4 shadow-xl">
                <div className="bg-gray-200 p-4 rounded-full">
                    <img className="w-24 h-24" src={videos} alt=""/>
                </div>
                <div className="text-3xl text-black text-center my-8">Motion Graphic</div>
                <div className="text-xl text-gray-500 text-center">Create motion graphic with smooth and high quality</div>
            </div>
        </div>
    )
}