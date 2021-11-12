#version 330 compatibility

uniform float	uTime;		// "Time", from Animate( )
out vec2  	vST;		// texture coords
uniform float uAnimate;

float timePlaceholder;

const float PI = 	3.14159265;
const float AMP = 	0.2;		// amplitude
const float W = 	2.;		// frequency

void
main( )
{ 
	if( uAnimate == 1 ) {
		timePlaceholder = uTime;
	}
	else {
		timePlaceholder = 0.5;
	}
	vST = gl_MultiTexCoord0.st;
	vec3 vert = gl_Vertex.xyz;
	vert.x += cos (4 / PI * uTime);
	vert.y += sin (4 / PI * uTime);
	vert.z += tan (4 / PI * uTime);
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}
