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
uniform vec2  ;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 eyeVector;

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

    // @see https://community.khronos.org/t/getting-the-normal-with-dfdx-and-dfdy/70177
    vec3 X = dFdx(vNormal);
    vec3 Y = dFdy(vNormal);
    vec3 normal = normalize(cross(X,Y));
    float diffuse = dot(normal, vec3(1.));
    
    vec2 rand = hash22(vec2(floor(diffuse * 20.)));

    // Handles distortion
    vec2 uvv = vec2(
        sign(rand.x - 0.5) * 1. + (rand.x - 0.5) * .6, 
        sign(rand.y - 0.5) * 1. + (rand.y - 0.5) * .6
    );
    vec2 uv = uvv * gl_FragCoord.xy / vec2(1000.);

    // https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/refract.xhtml
    vec3 refracted = refract(eyeVector, normal, 1./3.);
    uv += refracted.xy;
    
    vec4 t = texture2D(landscape, uv);
    // gl_FragColor = vec4(vUv, 0.0, 1.);
    gl_FragColor = t;
    // gl_FragColor =  vec4(diffuse);
}





