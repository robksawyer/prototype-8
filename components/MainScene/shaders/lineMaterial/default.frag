// Default Shader
// Rob Sawyer
// @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram
#define GLSLIFY 1

// ThreeJS defaults
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

uniform float time;
uniform float progress;

uniform sampler2D landscape; 
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 eyeVector;
varying vec3 vVary;

float PI = 3.14159265358979323846264338;


// hash12
// http://glslsandbox.com/e#47182.0
float hash12(vec2 p) {
	p = fract(p * vec2(5.3983, 5.4427));
    p += dot(p.yx, p.xy + vec2(21.5351, 14.3137));
	return fract(p.x * p.y * 95.4337);
}

// hash22
// http://glslsandbox.com/e#47182.0
vec2 hash22(vec2 p) {
	p = fract(p * vec2(5.3983, 5.4427));
    p += dot(p.yx, p.xy +  vec2(21.5351, 14.3137));
	return fract(vec2(p.x * p.y * 95.4337, p.x * p.y * 97.597));
}

void main() {
     
    float width = 2.;
    vec3 d = fwidth(vVary);
    vec3 s = smoothstep( d * (width + 0.5), d * (width - 0.5), vVary);
    
    float line = max(s.x, max(s.y, s.z));
    if (line < 0.1) discard;

    // Smooth out the lines
    gl_FragColor = vec4( mix(vec3(1.), vec3(0.), 1. - line), 1. );
}





