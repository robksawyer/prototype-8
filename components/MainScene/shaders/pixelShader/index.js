/**
 * Pixelation shader
 * Custom postprocessing shader
 * @see https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/PixelShader.js
 */

import * as THREE from 'three'
import { extend } from 'react-three-fiber'
import { shaderMaterial } from '@react-three/drei'

import frag from './pixelShader.frag'
import vert from './pixelShader.vert'

export const PixelShader = shaderMaterial({
  uniforms: {
    tDiffuse: null,
    resolution: null,
    pixelSize: 1,
  },
  vert,
  frag,
})

extend({ PixelShader })
