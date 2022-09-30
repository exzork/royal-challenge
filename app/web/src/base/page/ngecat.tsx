import { page } from 'web-init'
//@ts-ignore
import injectScript from 'src/utils/injectScript'
import 'mirada'
import { useEffect, useRef, useState } from 'react'

export default page({
  url: '/ngecat',
  component: ({}) => {
    const imageCanvas = useRef<HTMLCanvasElement>(null)
    const newCanvas = useRef<HTMLCanvasElement>(null)
    const [openCVLoaded, setOpenCVLoaded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [file, setFile] = useState<File>()
    const [color, setColor] = useState('red')

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
      }
    }, [imageLoaded, openCVLoaded])

    useEffect(() => {
      if (file != undefined) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            const img = new Image()
            img.src = e.target.result.toString()
            img.onload = () => {
              const canvas = imageCanvas.current!
              canvas.width = img.width
              canvas.height = img.height
              const ctx = canvas.getContext('2d')!
              ctx.drawImage(img, 0, 0)
              setImageLoaded(true)
              const canvas2 = newCanvas.current!
              canvas2.width = img.width
              canvas2.height = img.height
              const ctx2 = canvas2.getContext('2d')!
              ctx2.drawImage(img, 0, 0)
            }
          }
        }
        reader.readAsDataURL(file)
      }
    }, [file])

    useEffect(() => {
      console.log(color)
    }, [color])

    const getColor = (color: string) => {
      const codes = color.replace("#","").split('')
      const r = parseInt(codes[0] + codes[1], 16)
      const g = parseInt(codes[2] + codes[3], 16)
      const b = parseInt(codes[4] + codes[5], 16)
      return new cv.Scalar(r, g, b)
    }

    newCanvas.current?.addEventListener('mousedown', (e) => {
      const rect = newCanvas.current?.getBoundingClientRect()
      const scaleX = newCanvas.current?.width! / rect?.width!
      const scaleY = newCanvas.current?.height! / rect?.height!
      const x = (e.clientX - rect?.left!) * scaleX
      const y = (e.clientY - rect?.top!) * scaleY

      const image = cv.imread(newCanvas.current!)
      const rgb = new cv.Mat()
      cv.cvtColor(image, rgb, cv.COLOR_RGBA2RGB)
      const gray = new cv.Mat()
      cv.cvtColor(rgb, gray, cv.COLOR_RGB2GRAY)
      const cannyGray = new cv.Mat()
      const mask = cv.matFromArray(3, 3, cv.CV_8U, [0, -1, 0, -1, 5, -1, 0, -1, 0])
      cv.Canny(gray, cannyGray, 75, 30, 3)

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
      cv.Canny(sChannel, canny, 75, 30, 3)
      cv.addWeighted(canny, 0.7, cannyGray, 0.2, 0, canny)
      cv.dilate(canny, canny, mask, new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

      const seedPoint = new cv.Point(x, y)
      cv.resize(canny, canny, new cv.Size(canny.cols + 2, canny.rows + 2))
      cv.floodFill(rgb, canny, seedPoint, getColor(color), new cv.Rect(), new cv.Scalar(5, 5, 5), new cv.Scalar(5, 5, 5), 8)

      //cv.dilate(rgb, rgb,mask, new cv.Point(-1, -1), 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

      cv.imshow('new', rgb)
      image.delete()

    })


    return (
      <div className='min-h-screen'>
        {openCVLoaded ? (
          <>
            <div className='grid grid-cols-2 mx-12 gap-x-12  items-center justify-center'>
              <input type='file' onChange={(e) => {
                setFile(e.target.files![0])
              }} />
              <input type='color' value={color} onChange={(e) => {
                setColor(e.target.value)
              }} />
            </div>
            <div className='grid grid-cols-2 mx-12 gap-x-12 items-center justify-center'>
              <div className='flex flex-col'>
                <div>Original</div>
                {/*<img id='imageSrc' className='object-contain' ref={imageCanvas} src='/images/tembok3.webp'*/}
                {/*     onLoad={() => setImageLoaded(true)} />*/}
                <canvas id='imageSrc' className='object-contain' ref={imageCanvas} />
              </div>
              <div className='flex flex-col'>
                <div>Result</div>
                <canvas id='new' className='object-contain' ref={newCanvas} />
              </div>
            </div>
          </>
        ) : (
          <div>Loading OpenCV....</div>
        )}
      </div>
    )
  },
})