uniform vec2 resolution;
varying highp vec2 vUv;

void main(){
    // vec2 dxy = pixelSize / resolution;
    // vec2 coord = dxy * floor( vUv / dxy );
    // gl_FragColor = texture2D(tDiffuse, vUv);
    gl_FragColor = vec4(1., 1., 0., 0.5);
}