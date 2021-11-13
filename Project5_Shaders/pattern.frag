#version 330 compatibility

uniform float	uTime;		// "Time", from Animate( )
uniform bool uAnimateFrag;
uniform vec3 uColor;
in vec2  	vST;		// texture coords

float timePlaceholder;

void
main( )
{
	vec3 myColor = uColor;
	if( uAnimateFrag ) {
		timePlaceholder = uTime;
		if (vST.s > cos(uTime) && vST.t < sin(uTime)) {
			myColor = vec3(cos(uTime), sin(uTime), cos(uTime));
		}	
	}
	else {
		timePlaceholder = 1;
		if (vST.s > .5 && vST.t < 1.0) {
			myColor = vec3(cos(uTime), sin(uTime), cos(uTime));
		}	
	}
	gl_FragColor = vec4( myColor,  1. );
}
