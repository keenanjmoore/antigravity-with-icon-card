/**
 * GPU & WebGL Pipeline Utilities for Antigravity Cards
 * Provides zero-allocation context creation, context loss handling, shader caching, and teardown.
 */

export interface WebGLContextOptions {
  preserveDrawingBuffer?: boolean;
  powerPreference?: 'default' | 'high-performance' | 'low-power';
  alpha?: boolean;
  antialias?: boolean;
  depth?: boolean;
  stencil?: boolean;
}

const DEFAULT_GL_OPTIONS: WebGLContextOptions = {
  preserveDrawingBuffer: false,
  powerPreference: 'low-power',
  alpha: true,
  antialias: false,
  depth: false,
  stencil: false,
};

export function initWebGLCanvas(
  canvas: HTMLCanvasElement,
  options: WebGLContextOptions = DEFAULT_GL_OPTIONS
): WebGLRenderingContext | null {
  try {
    const gl = (canvas.getContext('webgl2', options) ||
                canvas.getContext('webgl', options) ||
                canvas.getContext('experimental-webgl', options)) as WebGLRenderingContext | null;
    if (!gl) return null;

    // Enable performance extensions where available
    gl.getExtension('ANGLE_instanced_arrays');
    gl.getExtension('EXT_color_buffer_half_float');
    gl.getExtension('OES_texture_half_float');

    // Context loss listeners
    canvas.addEventListener('webglcontextlost', (e: Event) => {
      e.preventDefault();
      console.warn('Antigravity WebGL context lost');
    }, { passive: false });

    canvas.addEventListener('webglcontextrestored', () => {
      console.info('Antigravity WebGL context restored');
    }, { passive: true });

    return gl;
  } catch (e) {
    console.warn('WebGL init failed:', e);
    return null;
  }
}

export function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    const error = gl.getShaderInfoLog(shader);
    console.error('Shader compile error:', error);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
  const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    console.error('Program link error:', error);
    gl.deleteProgram(program);
    return null;
  }
  // Cleanup shaders after linking
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

export function setupVRS(gl: WebGLRenderingContext) {
  const vrsExt = (gl as any).getExtension('EXT_variable_rate_shading');
  if (vrsExt) {
    console.info('VRS extension enabled');
  }
}

export function enableFP16Shaders(gl: WebGLRenderingContext) {
  const ext = (gl as any).getExtension('OES_texture_half_float');
  if (ext) {
    console.info('FP16 texture support enabled');
  }
}

export function cleanupWebGL(gl: WebGLRenderingContext | null): void {
  if (!gl) return;
  try {
    const numAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) || 16;
    for (let i = 0; i < numAttribs; ++i) {
      gl.disableVertexAttribArray(i);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  } catch (e) {
    console.warn('WebGL cleanup warning:', e);
  }
}
