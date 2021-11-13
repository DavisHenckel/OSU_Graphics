#version 330 compatibility

uniform float	uTime;		// "Time", from Animate( )
out vec2  	vST;		// texture coords
uniform bool uAnimateVert;

float timePlaceholder;

const float PI = 	3.14159265;
const float AMP = 	0.2;		// amplitude
const float W = 	2.;		// frequency

void
main( )
{ 
	vST = gl_MultiTexCoord0.st;
	vec3 vert = gl_Vertex.xyz;
	if( uAnimateVert) {
		timePlaceholder = uTime;
		vert.x += cos (vert.z * (2 * PI * uTime)) * W;
		//vert.z += cos (vert.y * (2 * PI * uTime)) * W / AMP;
		vert.y += cos (vert.x * (2 * PI * uTime)) * AMP;
		
	}
	else {
		timePlaceholder = 0;
	}
	vST = gl_MultiTexCoord0.st;
	
	
	// vert.y += sin (2 * PI * uTime) * W / AMP;
	// vert.z += tan (2 * PI * uTime) * W / AMP;
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}
