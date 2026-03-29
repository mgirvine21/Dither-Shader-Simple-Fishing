//based on each pixel / fragment
precision mediump float;

uniform vec3 uLightDir;
uniform sampler2D uTexture;
uniform vec2 uResolution;

uniform vec3 lightColor;
uniform vec3 darkColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  //normalizing the normals and light direction for lighitng
  vec3 N = normalize(vNormal);
  vec3 L = normalize(uLightDir);

  //diffusion
  float diff = max(dot(N, L), 0.0);


  vec2 ditherUV = mod(gl_FragCoord.xy, vec2(4.0)) / 4.0;
  float threshold = texture2D(uTexture, ditherUV).r;

  //testing if the threshold value from the texture is greater or not to the diffused lighing
  float mask = step(threshold, diff);

  vec3 finalColor = mix(darkColor, lightColor, mask);
  
  gl_FragColor = vec4(finalColor, 1.0);
  
   
}
