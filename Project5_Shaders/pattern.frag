#version 330 compatibility

uniform float	uTime;		// "Time", from Animate( )
uniform int uAnimate;
uniform vec3 uColor;
in vec2  	vST;		// texture coords

float timePlaceholder;
void
main( )
{
	vec3 myColor = uColor;
	if( uAnimate == 1 )
	{
		timePlaceholder = uTime;
	}
	else
	{
		timePlaceholder = 0.5;
	}

	gl_FragColor = vec4( myColor,  1. );
}
