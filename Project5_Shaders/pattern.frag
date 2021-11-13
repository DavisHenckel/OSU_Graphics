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
		if (vST.x > .5) {
			myColor = vec3(.7, .26, .11);
		}
		if (vST.y < .25) {
			myColor = vec3(.5 , .1, .9);
		}
		timePlaceholder = 1;
	}
	gl_FragColor = vec4( myColor,  1. );
}
