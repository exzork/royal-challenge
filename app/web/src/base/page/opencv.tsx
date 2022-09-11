import { page } from 'web-init'
import React, { useEffect, useRef, useState } from 'react'
//@ts-ignore
import injectScript from 'src/utils/injectScript'
import * as cvTypes from 'mirada'

export default page({
  url: '/opencv',
  component: ({}) => {
    const imageCanvas = useRef(null)
    const [openCVLoaded, setOpenCVLoaded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [RPercent, setRPercent] = useState(0)
    const [GPercent, setGPercent] = useState(0)
    const [BPercent, setBPercent] = useState(0)

    useEffect(() => {
      if (!openCVLoaded) {
        const promise = injectScript('opencv', 'https://docs.opencv.org/4.6.0/opencv.js')
        promise.then(() => {
          cv['onRuntimeInitialized'] = () => {
            setOpenCVLoaded(true)
          }
          console.log('OpenCV loaded')
        })
          .catch(() => {
            console.log('OpenCV failed to load')
          })
      }
    }, [])

    useEffect(() => {
      if (imageLoaded && openCVLoaded) {
        const image = cv.imread(imageCanvas.current!)
        cv.imshow('new', image)
        image.delete()
      }
    }, [imageLoaded, openCVLoaded])

    useEffect(() => {
      if (imageLoaded && openCVLoaded) {
        try{
          const image = cv.imread(imageCanvas.current!)
          const dst = new cv.Mat()
          const rgbaPlanes = new cv.MatVector()
          const merge = new cv.MatVector()
          cv.split(image, rgbaPlanes)
          let R = rgbaPlanes.get(0)
          let G = rgbaPlanes.get(1)
          let B = rgbaPlanes.get(2)

          let RData = R.data
          let GData = G.data
          let BData = B.data
          RData = RData.map((value: number) => {
            if (RPercent > 0) {
              value = value + (value * RPercent / 100)
              return value > 255 ? 255 : value
            } else {
              return value - (value * RPercent / -100)
            }
          })
          GData = GData.map((value: number) => {
            if (GPercent > 0) {
              value = value + (value * GPercent / 100)
              return value > 255 ? 255 : value
            } else {
              return value - (value * GPercent / -100)
            }
          })
          BData = BData.map((value: number) => {
            if (BPercent > 0) {
              value = value + (value * BPercent / 100)
              return value > 255 ? 255 : value
            } else {
              return value - (value * BPercent / -100)
            }
          })

          let RMat = cv.matFromArray(R.rows, R.cols, cv.CV_8UC1, RData)
          let GMat = cv.matFromArray(G.rows, G.cols, cv.CV_8UC1, GData)
          let BMat = cv.matFromArray(B.rows, B.cols, cv.CV_8UC1, BData)
          merge.push_back(RMat)
          merge.push_back(GMat)
          merge.push_back(BMat)
          cv.merge(merge, dst)
          cv.imshow('new', dst)
          image.delete()
        }catch (e) {
          console.log(e)
        }
      }
    }, [RPercent, GPercent, BPercent])
    return (
      <>
        <div className='w-full min-h-screen bg-primary flex justify-center'>
          <div className='max-w-7xl'>
            <div className='font-semibold text-3xl text-white text-center mt-12'>OpenCV Color Changer</div>
            {openCVLoaded ? (
              <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>
                <img id='imageSrc' className='' ref={imageCanvas} src='/images/ninym.png'
                     onLoad={() => setImageLoaded(true)} />
                <div className='w-auto flex flex-col mx-10'>
                  <div className='flex w-full'>
                    <div className='flex-1 text-xl text-white'>Red</div>
                    <input className='flex-1' type='range' min='-100' max='100' value={RPercent}
                           onChange={(e) => setRPercent(parseInt(e.target.value))} />
                  </div>
                  <div className='flex w-full'>
                    <div className='flex-1 text-xl text-white'>Green</div>
                    <input className='flex-1' type='range' min='-100' max='100' value={GPercent}
                           onChange={(e) => setGPercent(parseInt(e.target.value))} />
                  </div>
                  <div className='flex w-full'>
                    <div className='flex-1 text-xl text-white'>Blue</div>
                    <input className='flex-1' type='range' min='-100' max='100' value={BPercent}
                           onChange={(e) => setBPercent(parseInt(e.target.value))} />
                  </div>
                </div>
                <canvas id='new' />
              </div>
            ) : (
              <div className='text-white text-center mt-12'>Loading OpenCV...</div>
            )}
          </div>
        </div>
      </>
    )
  },
})