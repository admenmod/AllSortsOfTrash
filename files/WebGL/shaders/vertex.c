attribute vec2 vertexPosition;

void main() {
	vec2 pos = vertexPosition;
	gl_Position = vec4(pos, 0.0, 1.0);
}