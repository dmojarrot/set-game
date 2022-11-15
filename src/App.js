import { useEffect, useState } from "react"
import { fillData, shuffle } from "./functions/fillData.jsx"
import toast from "react-hot-toast"

const selection = []
const indexes = []

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    if (data.length === 0) {
      setData(fillData())
    }
  }, [])

  const selector = (item, index) => {
    setData((prev) => {
      let newData = [...prev]
      newData[index].selected = true
      return newData
    })

    let figure = item.href.id
    let shading = item.href.id % 3 !== 0 ? item.href.id % 3 : 3
    if (figure < 4) {
      figure = 1
    } else if (figure > 3 && figure < 7) {
      figure = 2
    } else {
      figure = 3
    }

    indexes.push([index])
    selection.push([figure, item.color, item.num, shading, index])

    if (selection.length === 3) {
      const isShape =
        (selection[0][0] === selection[1][0]) +
        (selection[0][0] === selection[2][0]) +
        (selection[1][0] === selection[2][0])
      const isColor =
        (selection[0][1] === selection[1][1]) +
        (selection[0][1] === selection[2][1]) +
        (selection[1][1] === selection[2][1])
      const isSymbol =
        (selection[0][2] === selection[1][2]) +
        (selection[0][2] === selection[2][2]) +
        (selection[1][2] === selection[2][2])
      const isShade =
        (selection[0][3] === selection[1][3]) +
        (selection[0][3] === selection[2][3]) +
        (selection[1][3] === selection[2][3])

      console.log(isShape, isColor, isSymbol, isShade)

      if (isShape === 0 || isShape === 3) {
        if (isColor === 0 || isColor === 3) {
          if (isSymbol === 0 || isSymbol === 3) {
            if (isShade === 0 || isShade === 3) {
              console.log("in")
              const newData = data.filter(
                (_item, index) =>
                  index !== selection[0][4] &&
                  index !== selection[1][4] &&
                  index !== selection[2][4]
              )
              setData(newData)
              toast.success("Correct set!")
            } else {
              toast.error("Incorrect set!")
            }
          } else {
            toast.error("Incorrect set!")
          }
        } else {
          toast.error("Incorrect set!")
        }
      } else {
        toast.error("Incorrect set!")
      }
      setData((prev) => {
        let newData = [...prev]
        newData[indexes[0]].selected = false
        newData[indexes[1]].selected = false
        newData[indexes[2]].selected = false
        return newData
      })

      selection.splice(0, 3)
    }
  }
  console.log(indexes)

  return (
    <div className="bg-slate-800 w-screen h-screen">
      <div className="grid grid-cols-3 w-10/12 md:w-7/12 mx-auto pt-20 gap-5">
        {data.slice(0, 12).map((item, index) => (
          <button
            key={index}
            onClick={() => selector(item, index)}
            className="hover:bg-slate-700 disabled:bg-slate-700 rounded-md border border-slate-700"
            disabled={item.selected}
          >
            <div className="flex gap-2 p-5 justify-center ">
              {[...Array(item.num)].map((_val, i) => (
                <img
                  key={i}
                  className={`${item.color}`}
                  src={item.href.url}
                  alt="W3Schools.com"
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
