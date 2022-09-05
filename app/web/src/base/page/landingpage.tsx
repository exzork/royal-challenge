import { page } from 'web-init'
import Navigation from 'src/component/Navigation'
import Hero from 'src/component/Hero'
import Video from 'src/component/Video'
import Counter from 'src/component/Counter'
import Services from 'src/component/Services'
import HowItWork from 'src/component/HowItWork'
import Products from 'src/component/Products'
import Testimonials from 'src/component/Testimonials'
import BottomNav from 'src/component/BottomNav'
import section3 from "src/images/section3.png"

export default page({
  url: '/landingpage',
  component: ({}) => {
    return <div>
      <div id="section-one" className="bg-primary min-h-screen">
        <Navigation/>
        <Hero/>
      </div>
      <div id="section-two" className="bg-secondary min-h-screen flex flex-col">
        <Video url="https://www.youtube.com/embed/7xT-T_p-2qA"/>
        <Counter/>
        <div className="flex flex-col max-w-7xl w-full mx-auto mt-24">
          <div className="text-yellow text-xl font-semibold">&#8212; Services</div>
          <div className="flex justify-around mt-8">
            <div className="flex-1 text-black text-5xl font-semibold my-auto">Our service we can help you</div>
            <div className="flex-1 hidden md:block"></div>
            <div className="flex-1 text-gray-600 text-xl my-auto">We have many interesting services with professional team, that will help your work to be better</div>
          </div>
        </div>
        <Services/>
      </div>
      <div id="section-three" className="bg-primary min-h-screen flex flex-col justify-center">
        <div className="flex max-w-7xl w-full mx-auto space-x-24 text-white">
          <img src={section3} className="hidden md:block"/>
          <HowItWork/>
        </div>
      </div>
      <div id="section-four" className="bg-secondary min-h-screen">
        <div className="text-center text-yellow text-xl pt-24 font-semibold">&#8212; Product</div>
        <div className="text-5xl font-semibold text-center mt-8">Our product we've created before</div>
        <Products/>
        <div className="max-w-7xl w-full mx-auto text-yellow text-xl mt-24 font-semibold">&#8212; Testimonials</div>
        <div className="max-w-7xl w-full mx-auto flex">
          <div className="md:w-1/3 text-5xl font-semibold">What our client say about us</div>
        </div>
        <Testimonials/>
        <div className="flex justify-center py-8">
          <div className="flex space-x-4">
            <input type="radio" name="switch" className="checked:bg-primary" defaultChecked={true}/>
            <input type="radio" name="switch" className="checked:bg-primary"/>
            <input type="radio" name="switch" className="checked:bg-primary"/>
          </div>
        </div>
      </div>
      <div id="section-five" className="bg-primary pb-2">
        <div className="max-w-7xl w-full mx-auto divide-white divide-y">
          <div className="flex pt-12">
            <div className="text-5xl flex-1 text-secondary my-auto">Are you interested to work with us?</div>
            <div className="flex flex-1 space-x-4 my-auto justify-end">
              <button className="flex bg-white text-primary font-semibold py-4 px-6 rounded-full border ">
                <span className="my-auto">Let's Chat</span>
                <svg className="w-4 h-4 ml-2 my-auto -rotate-45" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/>
                </svg>
              </button>
              <button className="flex bg-transparent text-white font-semibold py-4 px-6 border-white border rounded-full">
                Schedule Meet
              </button>
            </div>
          </div>
          <div className="mt-12 flex pt-12 text-white">
            <div className="flex flex-1 flex-col">
              <div className="text-3xl">Dorry</div>
              <div className="text-gray-400 mt-4">Nibh ut lacus egastas orci, dolor. Eu eros, laoreet euismod tortor nibh purus.</div>
            </div>
            <BottomNav/>
          </div>
        </div>
      </div>
    </div>
  },
})