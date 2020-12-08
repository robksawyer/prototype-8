import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree, extend, useLoader } from 'react-three-fiber'
import { Html } from '@react-three/drei'

import { useErrorBoundary } from 'use-error-boundary'

import * as THREE from 'three'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

// import vertexShader from './shaders/pixelShader/default.vert'
// import fragmentShader from './shaders/pixelShader/default.frag'

import {
  ShaderPass,
  RenderPass,
  BlendFunction,
  Resizer,
  KernelSize,
  Selection,
} from 'postprocessing'
import {
  EffectComposer,
  Noise,
  // Outline,
} from '@react-three/postprocessing'

// Postprocessing shader
import './shaders/postProcessingShader'

// extend({ EffectComposer, ShaderPass, RenderPass })

// export const PostProcessing = ({ meshRefs = [] }) => {
//   const { scene, gl, size, camera } = useThree()
//   const composer = useRef()

//   // useEffect(() => {
//   //   composer.current.renderer.setSize(size.width, size.height)
//   //   console.log('composer.current', composer.current)
//   // }, [size])

//   // // This takes over as the main render-loop (when 2nd arg is set to true)
//   // useFrame(
//   //   ({ scene, camera }) => composer.current.renderer.render(scene, camera),
//   //   1
//   // )

//   return (
//     <EffectComposer ref={composer} args={[gl]}>
//       <Noise blendFunction={BlendFunction.MULTIPLY} />
//       {/* <shaderPass attachArray="passes" args={[PixelShader]} /> */}
//       {/* <Outline
//         selection={meshRefs} // selection of objects that will be outlined
//         // selectionLayer={10} // selection layer
//         blendFunction={BlendFunction.SCREEN} // set this to BlendFunction.ALPHA for dark outlines
//         patternTexture={null} // a pattern texture
//         edgeStrength={2.5} // the edge strength
//         pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
//         visibleEdgeColor={0xffffff} // the color of visible edges
//         hiddenEdgeColor={0x22090a} // the color of hidden edges
//         resolution={Resizer}
//         // width={Resizer.AUTO_SIZE} // render width
//         // height={Resizer.AUTO_SIZE} // render height
//         // kernelSize={KernelSize.LARGE} // blur kernel size
//         blur={false} // whether the outline should be blurred
//         xRay={true} // indicates whether X-Ray outlines are enabled
//       /> */}
//     </EffectComposer>
//   )
// }

// Effects for the main scene
// @see https://inspiring-wiles-b4ffe0.netlify.app/5-recipes-effects
export const PostProcessing = () => {
  const { scene, gl, size, camera } = useThree()
  const composer = useRef()

  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  // useEffect(() => {
  //   composer.current.renderer.setSize(size.width, size.height)
  //   console.log('composer.current', composer.current)
  // }, [size])

  // // This takes over as the main render-loop (when 2nd arg is set to true)
  // useFrame(
  //   ({ scene, camera }) => composer.current.renderer.render(scene, camera),
  //   1
  // )

  return (
    <ErrorBoundary
      renderError={({ error }) => (
        <Html>
          <p>An error was caught: {error.message}</p>
        </Html>
      )}
    >
      <EffectComposer ref={composer} args={[gl]}>
        {/* RenderPass throws an error: Uncaught TypeError: Cannot call a class as a function */}
        {/* <RenderPass attach="passes" scene={scene} camera={camera} /> */}
        {/* <shaderPass
      attach="passes"
      args={[PixelShader]}
      uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      // scene={scene}
      // camera={camera}
      // width={window.innerWidth}
      // height={window.innerHeight}
      renderToScreen
    /> */}
        <Noise blendFunction={BlendFunction.MULTIPLY} />
      </EffectComposer>
    </ErrorBoundary>
  )
}

// WORKING
// export const PostProcessing = () => {
//   const { gl, scene, camera, size } = useThree()

//   const tDiffuse = useLoader(
//     THREE.TextureLoader,
//     '/3d/textures/checkerboard.jpg',
//     (texture) => console.log('Texture loaded', texture)
//   )
//   const [composer] = useMemo(() => {
//     const renderScene = new RenderPass(scene, camera)
//     const composer = new EffectComposer(gl)
//     composer.addPass(renderScene)
//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         tDiffuse,
//         resolution: null,
//         // pixelSize: 10.0,
//       },
//       vertexShader,
//       fragmentShader,
//     })
//     console.log('material', material)
//     material.map = true
//     const finalPass = new ShaderPass(material, 'baseTexture')
//     finalPass.needsSwap = true
//     composer.addPass(finalPass)
//     const fxaa = new ShaderPass(FXAAShader)
//     fxaa.material.uniforms['resolution'].value.x = 1 / size.width
//     fxaa.material.uniforms['resolution'].value.y = 1 / size.height
//     composer.addPass(fxaa)

//     return [composer]
//   }, [])

//   useEffect(() => {
//     composer.setSize(size.width, size.height)
//   }, [composer, size])

//   useFrame(({ mouse }) => {
//     // then writes the normal scene on top
//     composer.render()
//   }, 1)

//   return null
// }
