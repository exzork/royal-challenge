import React from "react";

export default function BottomNav(){
    return (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 w-full">
            <div className="flex flex-col space-y-2">
                <div className="text-xl font-semibold">Company</div>
                <a href="#" className="text-gray-400">Our Work</a>
                <a href="#" className="text-gray-400">Services</a>
                <a href="#" className="text-gray-400">Community</a>
                <a href="#" className="text-gray-400">Career</a>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="text-xl font-semibold">Resources</div>
                <a href="#" className="text-gray-400">Help Center</a>
                <a href="#" className="text-gray-400">Blog</a>
                <a href="#" className="text-gray-400">Terms & Conditions</a>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="text-xl font-semibold">Links</div>
                <a href="#" className="text-gray-400">Pricing</a>
                <a href="#" className="text-gray-400">About</a>
                <a href="#" className="text-gray-400">Learn</a>
                <a href="#" className="text-gray-400">Corporate</a>
                <a href="#" className="text-gray-400">News</a>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="text-xl font-semibold">Follow Us</div>
                <a href="#" className="text-gray-400">Dribble</a>
                <a href="#" className="text-gray-400">Instagram</a>
                <a href="#" className="text-gray-400">Twitter</a>
            </div>
        </div>
    )
}