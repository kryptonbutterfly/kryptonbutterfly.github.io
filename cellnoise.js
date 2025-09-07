function compileShader(gl, source, type) {
	const shader = gl.createShader(type)
	gl.shaderSource(shader, source)
	gl.compileShader(shader)

	if (!!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		return shader

	console.error(gl.getShaderInfoLog(shader))
	gl.deleteShader(shader)
	return null
}

function createProgram(gl, vertShader, fragShader) {
	const prog = gl.createProgram()
	gl.attachShader(prog, vertShader)
	gl.attachShader(prog, fragShader)
	gl.linkProgram(prog)

	if (!!gl.getProgramParameter(prog, gl.LINK_STATUS))
		return prog

	console.error(gl.getProgramInfoLog(prog))
	return null
}

function randomPoint(width, height) {
	const b = 0.2
	const sat =  Math.random() * 0.2 + b
	return [
		Math.random() * width,
		Math.random() * height,
		Math.random() * 0.025 + sat,
		Math.random() * 0.025 + sat,
		Math.random() * 0.025 + sat]
}

const canvas = document.querySelector("canvas")

const DATA_SIZE = 5
const SEED_COUNT = 75

const gl = canvas.getContext("webgl")
if (!!gl) {
	const vertShaderSource = `
		attribute vec2 coordinates;
		void main(void) {
			gl_Position = vec4(coordinates, 0.0, 1.0);
		}`

	const fragShaderSource = `
	precision mediump float;
	uniform float seeds[${DATA_SIZE * SEED_COUNT}];

	void main(void) {
		float distance = 1000000.0;
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		for (int i = 0; i < ${SEED_COUNT}; i++) {
			vec2 seed = gl_FragCoord.xy - vec2(seeds[i*${DATA_SIZE}], seeds[i*${DATA_SIZE}+1]);
			float dist = seed.x*seed.x + seed.y*seed.y;
			bool c = dist < distance;
			distance = min(distance, dist);
			vec4 color = vec4(seeds[i*${DATA_SIZE}+2], seeds[i*${DATA_SIZE}+3], seeds[i*${DATA_SIZE}+4], 1.0);
			gl_FragColor = c ? color : gl_FragColor;
		}
	}`

	const vertShader = compileShader(gl, vertShaderSource, gl.VERTEX_SHADER)
	const fragShader = compileShader(gl, fragShaderSource, gl.FRAGMENT_SHADER)
	const shaderProgram = createProgram(gl, vertShader, fragShader)

	function draw() {
		const displayWidth = canvas.clientWidth
		const displayHeight = canvas.clientHeight
		if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
			canvas.width = displayWidth
			canvas.height = displayHeight
		}

		const SEEDS = Array(SEED_COUNT * DATA_SIZE)
		for (i = 0; i < SEED_COUNT; i++) {
			const data = randomPoint(canvas.width, canvas.height)
			for (k = 0; k < DATA_SIZE; k++)
				SEEDS[i * DATA_SIZE + k] = data[k]
		}

		const indices = [0, 1, 2, 2, 1, 3]
		const graphingVerts = [-1,-1, 1,-1, -1,1, 1,1]

		const vertex_buffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(graphingVerts), gl.STATIC_DRAW)
		gl.bindBuffer(gl.ARRAY_BUFFER, null)

		const index_buffer = gl.createBuffer()
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

		gl.useProgram(shaderProgram)
		console.log(gl.getShaderInfoLog(fragShader))
		gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)

		const coord = gl.getAttribLocation(shaderProgram, "coordinates")
		gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0)
		gl.enableVertexAttribArray(coord)

		const seeds = gl.getUniformLocation(shaderProgram, "seeds")
		gl.uniform1fv(seeds, new Float32Array(SEEDS), 0, SEEDS.length)
		gl.clearColor(0.3, 0.3, 0.3, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT)
		gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight)
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
	}

	document.addEventListener("DOMContentLoaded", draw)
	window.addEventListener("resize", draw)
}
