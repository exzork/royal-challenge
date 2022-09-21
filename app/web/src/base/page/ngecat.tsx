import { page } from 'web-init'
//@ts-ignore
import injectScript from 'src/utils/injectScript'
import 'mirada'
import { useEffect, useRef, useState } from 'react'
export default page({
  url: '/ngecat',
  component: ({}) => {
    const imageCanvas = useRef<HTMLImageElement>(null)
    const newCanvas = useRef<HTMLCanvasElement>(null)
    const [openCVLoaded, setOpenCVLoaded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
      if (!openCVLoaded) {
        const promise = injectScript('opencv', 'https://docs.opencv.org/4.6.0/opencv.js')
        promise.then(() => {
          cv['onRuntimeInitialized'] = () => {
            setOpenCVLoaded(true)
            console.log('OpenCV loaded')
          }
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
        imageCanvas.current!.style.display = 'none'
      }
    }, [imageLoaded, openCVLoaded])


    newCanvas.current?.addEventListener('mousedown', (e) => {
      const image = cv.imread(newCanvas.current!)
      const dst = new cv.Mat()
      cv.cvtColor(image, dst, cv.COLOR_RGBA2GRAY, 0)
      const contours = new cv.MatVector()
      const hierarchy = new cv.Mat()
      const canny = new cv.Mat()
      cv.Canny(dst, canny, 70,25, 3, false)
      //cv.dilate(canny, canny, cv.Mat.ones(3, 3, cv.CV_8U), new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, new cv.Scalar())
      //cv.GaussianBlur(canny, canny, new cv.Size(3, 3), 0, 0, cv.BORDER_DEFAULT)
      cv.findContours(canny, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
      cv.drawContours(image, contours, -1, new cv.Scalar(255, 0, 0, 255), 1, cv.LINE_8, hierarchy, 1)
      cv.imshow('new', image)
      image.delete()

    })



    return (
      <>
        <img id='imageSrc' className='' ref={imageCanvas} src='/images/tembok.jpeg'
             onLoad={() => setImageLoaded(true)} />
        <canvas id='new' className='' ref={newCanvas} />
      </>
    )
  },
})