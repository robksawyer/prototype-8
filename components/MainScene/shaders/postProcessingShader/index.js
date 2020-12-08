/**
 * Pixelation shader
 * Custom postprocessing shader
 * @see https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/PixelShader.js
 */

import * as THREE from 'three'
import { extend } from 'react-three-fiber'
import { shaderMaterial } from '@react-three/drei'

// Shader
import frag from './default.frag'
import vert from './default.vert'

const PostProcessingShader = shaderMaterial({
  uniforms: {
    resolution: null,
  },
  vertexShader: vert,
  fragmentShader: frag,
})

extend({ PostProcessingShader })
