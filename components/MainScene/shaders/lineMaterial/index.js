/**
 * @file shaders/LineMaterial/index.js
 * Shader to handle shading lines
 *
 * Usage:
 *
 *    import { extend } from 'react-three-fiber
 *    import { LineMaterial } from './shaders/LineMaterial'
 *
 *    extend({ LineMaterial })
 *
 *    ... later in the React component
 *    <mesh>
 *      ...
 *      <LineMaterial time={0} ... />
 *    </mesh>
 *
 */
import * as THREE from 'three'
import { extend } from 'react-three-fiber'
import { shaderMaterial } from '@react-three/drei'

import vertex from './default.vert'
import fragment from './default.frag'

/**
 * LineMaterial
 * @param {*} uniforms
 */
const LineMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector4(),
    mouse: new THREE.Vector2(),
    // landscape: new THREE.TextureLoader(
    //   '/3d/textures/checkerboard.jpg',
    //   (texture) => {
    //     console.log('texture', texture)
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    //   }
    // ),
  },
  // vertex shader
  vertex,
  // fragment shader
  fragment,
  (material) => {
    console.log('lineMaterial', material)
    material.side = THREE.DoubleSide
    // material.wireframe = false
    // material.vertexColors = true
    // material.flatShading = true

    // material.defines = {
    //   '#extension GL_OES_standard_derivatives': 'enable',
    // }
    // material.extensions = {
    //   derivatives: true,
    // }
  }
)

extend({ LineMaterial })
