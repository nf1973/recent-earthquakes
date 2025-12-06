"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function MostRecentMap({ data }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!data || !data.length) return

    const lat = data[0].geometry.coordinates[1]
    const lng = data[0].geometry.coordinates[0]

    const map = L.map(mapRef.current).setView([lat, lng], 3)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const marker = L.circleMarker([lat, lng], {
      radius: 10,
      fillColor: "red",
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map)

    marker.bindPopup(`
      <div>
        <b>Time:</b> ${new Date(data[0].properties.time).toLocaleString()}<br/>
        <b>Magnitude:</b> ${data[0].properties.mag.toFixed(1)}<br/>
        <b>Location:</b> ${data[0].properties.place}<br/>
        <a href="${data[0].properties.url}" target="_blank">More info</a>
      </div>
    `)

    return () => {
      map.remove()
    }
  }, [data])

  return (
    <div className="w-full h-full">
      <h2 className="text-sm mb-2">Most Recent Earthquake (M2.5+)</h2>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
