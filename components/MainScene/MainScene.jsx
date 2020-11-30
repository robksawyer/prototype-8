/**
 * @file MainScene.js
 */
import React, { Suspense, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useErrorBoundary from 'use-error-boundary'

import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import { EffectComposer, ShaderPass, RenderPass } from 'postprocessing'
// import { EffectComposer } from '@react-three/postprocessing'
import { Html, useHelper, useTexture, OrbitControls } from '@react-three/drei'

import { useTweaks } from 'use-tweaks'
import { useInView } from 'react-intersection-observer'
import useMobileDetect from 'use-mobile-detect-hook'

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
// import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
import { gsap } from 'gsap'

import styles from './MainScene.module.css'

import Loader from '../Loader'

// Shader stack
import './shaders/defaultMaterial'
import './shaders/lineMaterial'

// Postprocessing shader
import { PixelShader } from './shaders/pixelShader'

// Texture loading examples
// const envMap = useCubeTexture(
//   [
//     'sky_px.png',
//     'sky_nx.png',
//     'sky_py.png',
//     'sky_ny.png',
//     'sky_pz.png',
//     'sky_nz.png',
//   ],
//   { path: '/3d/sky0/' }
// )

// const bumpMap = useLoader(TextureLoader, '/3d/bumps/fabric-bump.png')
// bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping
// bumpMap.repeat.set(1, 1)
//
// Application
// <meshStandardMaterial
//    envMap={envMap}
//    attach="material"
//    roughness={0}
//    metalness={0.9}
//    bumpMap={bumpMap}
//    color="#3083DC"
//  />

extend({ EffectComposer, ShaderPass, RenderPass, PixelShader })

// Effects for the main scene
// @see https://inspiring-wiles-b4ffe0.netlify.app/5-recipes-effects
const PPEffects = () => {
  const { scene, gl, size, camera } = useThree()
  const composer = useRef()

  useEffect(() => {
    composer.current.renderer.setSize(size.width, size.height)
  }, [size])

  // This takes over as the main render-loop (when 2nd arg is set to true)
  useFrame(
    ({ scene, camera }) => composer.current.renderer.render(scene, camera),
    1
  )

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attach="passes" scene={scene} camera={camera} />
      <shaderPass
        attach="passes"
        args={[PixelShader]}
        scene={scene}
        camera={camera}
        width={window.innerWidth}
        height={window.innerHeight}
        renderToScreen
      />
    </effectComposer>
  )
}

const ENABLE_HELPERS = 0

const Scene = () => {
  const ico = useRef()
  const icoLines = useRef()
  const { scene } = useThree()
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  // Texture loading example
  const texture = useTexture('/3d/textures/screencap.png')
  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping

  useFrame(({ clock, mouse }) => {
    ico.current.rotation.x = Math.sin(clock.elapsedTime) / 6
    ico.current.rotation.y = Math.sin(clock.elapsedTime) / 6

    icoLines.current.rotation.x = ico.current.rotation.x
    icoLines.current.rotation.y = ico.current.rotation.y
    // ico.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // ico.current.position.x = Math.sin(clock.elapsedTime)
    // ico.current.position.z = Math.sin(clock.elapsedTime)
    // group.current.rotation.y += 0.02

    ico.current.material.uniforms.mouse.value = new THREE.Vector2(
      mouse.x,
      mouse.y
    )
  })

  useEffect(() => {
    if (icoLines && icoLines.current) {
      const length = icoLines.current.geometry.attributes.position.array.length
      // console.log('length', length)

      let vary = []
      for (let i = 0; i < length / 3; i++) {
        // Three diffferent vectors
        vary.push(0, 0, 1, 0, 1, 0, 1, 0, 0)
      }

      let aVary = new Float32Array(vary)
      icoLines.current.geometry.setAttribute(
        'aVary',
        new THREE.BufferAttribute(aVary, 3)
      )
    }
  }, [])

  useEffect(() => void (spotLight.current.target = ico.current), [scene])
  if (ENABLE_HELPERS) {
    // useHelper(spotLight, SpotLightHelper, 'teal')
    // useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')
    // useHelper(mesh, BoxHelper, '#272740')
    // useHelper(mesh, VertexNormalsHelper, 1, '#272740')
    // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')
  }

  return (
    <>
      <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="red"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group>
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />

      <mesh ref={ico} position={[0, 2, 0]} castShadow>
        <icosahedronGeometry args={[1, 1]} attach="geometry" />
        <defaultMaterial
          attach="material"
          side={THREE.DoubleSide}
          landscape={texture}
        />
      </mesh>

      <mesh ref={icoLines} position={[0, 2, 0]}>
        <icosahedronBufferGeometry args={[1.001, 1]} attach="geometry" />
        <lineMaterial attach="material" side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

const MainScene = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return (
    <ErrorBoundary>
      <Tag
        colorManagement
        shadowMap
        camera={{ position: [-5, 5, 5] }}
        className={`${styles.main_scene} ${
          styles[`main_scene__${variant}`]
        } ${className}`}
        style={{
          width: '100vw',
          height: 'calc(100vh - 50px)',
          background: '#111111',
        }}
      >
        <fog attach="fog" args={['#111111', 0, 20]} />
        <Suspense
          fallback={
            <Html>
              <Loader />
            </Html>
          }
        >
          <Scene />
        </Suspense>

        {/* <PPEffects /> */}
        <OrbitControls />
      </Tag>
    </ErrorBoundary>
  )
}

MainScene.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
}

MainScene.defaultProps = {
  tagName: Canvas,
  className: '',
  variant: 'default',
}

export default MainScene
