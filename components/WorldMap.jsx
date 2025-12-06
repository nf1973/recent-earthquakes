"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function WorldMap({ data }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!data || !data.length) return

    const map = L.map(mapRef.current).setView([35, 0], 1)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    data.forEach((row) => {
      const lat = row.geometry.coordinates[1]
      const lng = row.geometry.coordinates[0]

      const marker = L.circleMarker([lat, lng], {
        radius: row.properties.mag * 1.8,
        fillColor: "red",
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map)

      marker.bindPopup(`
        <div>
          <b>Time:</b> ${new Date(row.properties.time).toLocaleString()}<br/>
          <b>Magnitude:</b> ${row.properties.mag.toFixed(1)}<br/>
          <b>Location:</b> ${row.properties.place}<br/>
          <a href="${row.properties.url}" target="_blank">More info</a>
        </div>
      `)
    })

    return () => {
      map.remove()
    }
  }, [data])

  return (
    <div className="w-full h-full">
      <h2 className="text-sm mb-2">Earthquakes in past 24 hours (M2.5+)</h2>
      {/* Fill parent container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
