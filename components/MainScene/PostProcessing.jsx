import React, { useEffect, useRef } from 'react'
import { useFrame, useThree, extend } from 'react-three-fiber'
import {
  ShaderPass,
  RenderPass,
  BlendFunction,
  Resizer,
  KernelSize,
  Selection,
} from 'postprocessing'
import { EffectComposer, Noise, Outline } from '@react-three/postprocessing'

// Postprocessing shader
import { PixelShader } from './shaders/pixelShader'

extend({ EffectComposer, ShaderPass, RenderPass, PixelShader })

export const PostProcessing = ({ meshRefs = [] }) => {
  const { scene, gl, size, camera } = useThree()
  const composer = useRef()

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
    <EffectComposer ref={composer} args={[gl]}>
      <Noise blendFunction={BlendFunction.MULTIPLY} />
      {/* <shaderPass attachArray="passes" args={[PixelShader]} /> */}
      {/* <Outline
        selection={meshRefs} // selection of objects that will be outlined
        // selectionLayer={10} // selection layer
        blendFunction={BlendFunction.SCREEN} // set this to BlendFunction.ALPHA for dark outlines
        patternTexture={null} // a pattern texture
        edgeStrength={2.5} // the edge strength
        pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
        visibleEdgeColor={0xffffff} // the color of visible edges
        hiddenEdgeColor={0x22090a} // the color of hidden edges
        resolution={Resizer}
        // width={Resizer.AUTO_SIZE} // render width
        // height={Resizer.AUTO_SIZE} // render height
        // kernelSize={KernelSize.LARGE} // blur kernel size
        blur={false} // whether the outline should be blurred
        xRay={true} // indicates whether X-Ray outlines are enabled
      /> */}
    </EffectComposer>
  )
}

// Effects for the main scene
// @see https://inspiring-wiles-b4ffe0.netlify.app/5-recipes-effects
// export const PostProcessing = () => {
//   const { scene, gl, size, camera } = useThree()
//   const composer = useRef()

//   useEffect(() => {
//     composer.current.renderer.setSize(size.width, size.height)
//     console.log('composer.current', composer.current)
//   }, [size])

//   // This takes over as the main render-loop (when 2nd arg is set to true)
//   useFrame(
//     ({ scene, camera }) => composer.current.renderer.render(scene, camera),
//     1
//   )

//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass attach="passes" scene={scene} camera={camera} />
//       <shaderPass
//         attach="passes"
//         args={[PixelShader]}
//         scene={scene}
//         camera={camera}
//         width={window.innerWidth}
//         height={window.innerHeight}
//         renderToScreen
//       />
//       <Noise blendFunction={BlendFunction.MULTIPLY} />
//     </effectComposer>
//   )
// }
