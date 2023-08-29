import React, { useMemo, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three'

function PointCloud({ points, colors }) {
  const geometry = useMemo(() => {
    const geom = new BufferGeometry()
    geom.setAttribute('position', new Float32BufferAttribute(points, 3))
    geom.setAttribute('color', new Float32BufferAttribute(colors, 3))
    return geom
  }, [points, colors])

  return (
    <points geometry={geometry}>
      <pointsMaterial attach="material" vertexColors size={0.2} />
    </points>
  )
}

export default function App() {
  const [points, setPoints] = useState([])
  const [colors, setColors] = useState([])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/chair_1.txt')
      .then((response) => response.text())
      .then((data) => {
        const loadedPoints = []
        const loadedColors = []
        const lines = data.split('\n')
        lines.forEach((line) => {
          const [x, y, z, r, g, b] = line.split(' ').map(Number)
          loadedPoints.push(x, y, z)
          loadedColors.push(r / 255, g / 255, b / 255)
        })
        setPoints(loadedPoints)
        setColors(loadedColors)
      })
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      {points.length > 0 && <PointCloud points={points} colors={colors} />}
    </Canvas>
  )
}
