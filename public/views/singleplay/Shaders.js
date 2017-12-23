let vertexShader =
`attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform vec2 u_translation;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_texcoord = a_texcoord;
}`;
let fragmentShader =
`precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
}`;
let vertexShader1 =
`attribute vec2 a_position;
uniform vec2 u_translation;
uniform vec4 u_color;
varying vec4 v_color;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_color = u_color;
}`
let fragmentShader1 =
`precision mediump float;
varying vec4 v_color;
void main() { 
  gl_FragColor = v_color;
}`

export {vertexShader,fragmentShader,vertexShader1 ,fragmentShader1};