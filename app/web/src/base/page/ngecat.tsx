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
      const img = image
      const rgb = new cv.Mat()
      cv.cvtColor(image, rgb, cv.COLOR_RGBA2RGB)
      const gray = new cv.Mat()
      cv.cvtColor(rgb, gray, cv.COLOR_RGB2GRAY)
      const cannyGray = new cv.Mat()
      const mask = cv.matFromArray(Math.floor(rgb.cols / 8), Math.floor(rgb.rows / 8), cv.CV_8U, new Array(Math.floor(rgb.cols / 8) * Math.floor(rgb.rows / 8)).fill(0))
      cv.Canny(gray, cannyGray, 75, 30,3)

      const hsv = new cv.Mat()
      cv.cvtColor(rgb, hsv, cv.COLOR_RGB2HSV)
      const list = new cv.MatVector()
      cv.split(hsv, list)
      const sChannel = new cv.Mat()
      const sList = new cv.MatVector()
      sList.push_back(list.get(1))
      cv.merge(sList, sChannel)
      cv.medianBlur(sChannel, sChannel, 3)

      const canny = new cv.Mat()
      cv.Canny(sChannel, canny, 75, 30,3)
      cv.addWeighted(canny, 0.5, cannyGray, 0.5, 0, canny)
      cv.dilate(canny, canny, mask, new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

      const seedPoint = new cv.Point(e.offsetX, e.offsetY)
      cv.resize(canny, canny, new cv.Size(canny.cols + 2, canny.rows + 2))
      cv.medianBlur(rgb, rgb, 15)
      cv.floodFill(rgb, canny, seedPoint, new cv.Scalar(255, 0, 0), new cv.Rect(), new cv.Scalar(5, 5, 5), new cv.Scalar(5, 5, 5),8)

      cv.dilate(rgb, rgb,mask, new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())


      cv.imshow('new', rgb)
      image.delete()

    })



    return (
      <>
        <img id='imageSrc' className='' ref={imageCanvas} src='/images/tembok.jpg'
             onLoad={() => setImageLoaded(true)} />
        <canvas id='new' className='' ref={newCanvas} />
      </>
    )
  },
})