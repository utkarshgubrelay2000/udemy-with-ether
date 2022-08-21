import React from "react"
import dynamic from "next/dynamic"
import UseWindowSize from "../hooks/UseWindowSize"

let MapLeaflet
const Map = (props) => {
  const [mapLoaded, setMapLoaded] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [tap, setTap] = React.useState(false)
  const size = UseWindowSize()

  React.useEffect(() => {
    MapLeaflet = dynamic(() => import("../components/MapLeaflet"), {
      ssr: false,
    })
    setMapLoaded(true)
  }, [])

  React.useEffect(() => {
    if (mapLoaded) {
      setTap(size.width > 700)
      setDragging(size.width > 700)
    }
  }, [size, mapLoaded])
  return mapLoaded ? (
    <MapLeaflet dragging={dragging} tap={tap} {...props} />
  ) : (
    <p>loading</p>
  )
}

export default Map
