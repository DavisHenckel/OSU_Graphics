Davis Henckel

<henckeld@oregonstate.edu>

CS450 – Intro to Computer Graphics

12/7/21
# Final Project Submission
## 1. Text from Original Proposal
### Proposed Name: Solar System!
The project I am proposing for the final will be a Solar System implementation. I think this is exciting because of my interest in astronomy. This project will emulate the solar system we live in.
#### *Minimum Requirements*
- Has a large, lit sun in the center at origin (0,0,0).
- It will have several textures for the planets.
- The planets will all also revolve around the sun at different speeds. 
- There will be an imitation of the 9 planets (yes, I’m including Pluto). 
- The scale of the planets and their distance will correspond to.
- The planets further away from the sun will be affected by light attenuation.
#### *Stretch Goals for the Project if I’m done Early:*
- Menu option to toggle an asteroid shower
- Texture every planet
- Allow the lookat position to be set on each planet with a menu option
- Add a spaceship!
#### *Conclusion*
I think this would be a challenging enough project for me because there would be some decent math involved in calculating the speeds and distances of the planets. It would also give me some practice with light attenuation. 

I would be open to suggestions if you think some things should be moved to stretch goals or if there needs to be more goals implemented. 


## 2. What I actually Did for the Project
### Accomplished Features
- Large lit sun at origin
- All Planets Textured
- Planets Revolve around the sun at their respective speed relative to earth.
- Planets are Scaled to the appropriate size
- Distances (up to Mars) are scaled correctly relative to earth.
- 9 Planets including Pluto
- Textured Background showing Milky Way Galaxy
- A LookAt Position showing each planet and their spot in the Solar System
- LookAt position follows planet even when rotating
- Nice looking shadows on the planets. 
- Ring around Saturn that follows it as it revolves around the sun.
- 2 Extra views to show nearby planets and distant planets.
## 3. How My Project Differs
My project doesn’t differ a whole lot from my original goals of the project. I am very pleased with the result. This is something I could display on my resume.
### What Didn’t Go Well
The only thing I wish I could have done a bit better was the light attenuation. I think since my scale was so large, it was really difficult to get lighting to still show the background as well as light up the planets. 
### What Did Go Well
A lot of things went well in this project. I felt very pleased with:

- Scale of planets and their distance to the sun
- LookAt positions as well as following the planets as they revolve
- Textures 
- Milky Way background
- Size of planets
- Rotation Speeds of the planets
- Changing Scroll speed to allow to precisely set my viewing angle even when far away.
- Shadows on the planets as they revolved around the sun.
- Overall look and feel of the program.

I spent a lot of time just playing around looking at everything and it was very enjoyable.
## 4. Cleverness in my Program
I was proud of a lot of the code I build in this project. I felt it helped me better understand openGL putting all of these things back together. Some things I did in particular. 
### Struct for Planet Coordinates
I built a struct for planet coordinates. This made it feasible to be able to calculate my viewing angle for the planets without having to do a ton of additional math.
```c++
	PlanetCoords SunCoords = { 0.,0.,0. }; //sun starts at origin of solar system
	PlanetCoords EarthCoords = { AU, 0., 0. }; //1 AU from sun.
	PlanetCoords MercuryCoords = { AU * .4, 0.,0. }; //Mercury is .4 AU from Sun.
	PlanetCoords MarsCoords = { AU * 1.5,0.,0. }; //Mars 1.5AU from sun
	PlanetCoords VenusCoords = { AU * .7, 0., 0. }; //Venus .7AU from sun
```
### Defining Astronomical Units and Earth Size
I also defined AU’s which can be seen above. This allowed me to properly scale the planets and their distances to the sun, based on Earth, which is 1 AU from the sun. With Earth size, I was able to scale planets sizes relative to earth in a similar fashion.
```c++
float AU = 100.;
float EARTHSIZE = .3;
```
### Time Variable for Each Planet
While this might not be all that clever. It was one thing I was stuck on for the longest during this project. How could I get each planet to rotate at the proper speed compared to earth? My solution was:  
```c++
	const int MS_IN_THE_ANIMATION_CYCLE_EARTH = 15000;	// 365 days to orbit sun.
	const int MS_IN_THE_ANIMATION_CYCLE_MERC = MS_IN_THE_ANIMATION_CYCLE_EARTH / 4.15;	// 88 days to orbit sun
	const int MS_IN_THE_ANIMATION_CYCLE_VENUS = MS_IN_THE_ANIMATION_CYCLE_EARTH / 1.6; // 225 days to orbit sun
	const int MS_IN_THE_ANIMATION_CYCLE_MARS = MS_IN_THE_ANIMATION_CYCLE_EARTH / .53; // 687 days to orbit sun
	const int MS_IN_THE_ANIMATION_CYCLE_JUPITER = MS_IN_THE_ANIMATION_CYCLE_EARTH / .084; // 4333 days to orbit sun
	const int MS_IN_THE_ANIMATION_CYCLE_SATURN = MS_IN_THE_ANIMATION_CYCLE_EARTH / .034; // 10756 days to orbit sun 
	const int MS_IN_THE_ANIMATION_CYCLE_URANUS = MS_IN_THE_ANIMATION_CYCLE_EARTH / .0119; //30687 days to orbit sun
	const int MS_IN_THE_ANIMATION_CYCLE_NEPTUNE = MS_IN_THE_ANIMATION_CYCLE_EARTH / .0061; //60190 days to orbit sun
	const int MS_IN_THE_ANIMATION_CYCLE_PLUTO = MS_IN_THE_ANIMATION_CYCLE_EARTH / .00403; //248 years to orbit sun
```
Then I also needed to:
```c++
	msEarth = glutGet(GLUT_ELAPSED_TIME);			// milliseconds since the program started
	msMerc = msEarth;
	msJupiter = msEarth;
	msVenus = msEarth;
	msMars = msEarth;
	msSaturn = msEarth;
	msUranus = msEarth;
	msNeptune = msEarth;
	msPluto = msEarth;

	msEarth %= MS_IN_THE_ANIMATION_CYCLE_EARTH;				// milliseconds in the range 0 to MS_IN_THE_ANIMATION_CYCLE-1
	msMerc %= MS_IN_THE_ANIMATION_CYCLE_MERC;
	msJupiter %= MS_IN_THE_ANIMATION_CYCLE_JUPITER;
	msVenus %= MS_IN_THE_ANIMATION_CYCLE_VENUS;
	msMars %= MS_IN_THE_ANIMATION_CYCLE_MARS;
	msSaturn %= MS_IN_THE_ANIMATION_CYCLE_SATURN;
	msUranus %= MS_IN_THE_ANIMATION_CYCLE_URANUS;
	msNeptune %= MS_IN_THE_ANIMATION_CYCLE_NEPTUNE;
	msPluto %= MS_IN_THE_ANIMATION_CYCLE_PLUTO;
```
And finally, I had to calculate the time for each planet
```c++
	TimeEarth = (float)msEarth / (float)MS_IN_THE_ANIMATION_CYCLE_EARTH;        // [ 0., 1. )
	TimeMerc = (float)msMerc / (float)MS_IN_THE_ANIMATION_CYCLE_MERC;        // [ 0., 1. )
	TimeVenus = (float)msVenus / (float)MS_IN_THE_ANIMATION_CYCLE_VENUS;        // [ 0., 1. )
	TimeMars = (float)msMars / (float)MS_IN_THE_ANIMATION_CYCLE_MARS;        // [ 0., 1. )
	TimeJupiter = (float)msJupiter / (float)MS_IN_THE_ANIMATION_CYCLE_JUPITER;        // [ 0., 1. )
	TimeSaturn = (float)msSaturn / (float)MS_IN_THE_ANIMATION_CYCLE_SATURN;        // [ 0., 1. )
	TimeUranus = (float)msUranus / (float)MS_IN_THE_ANIMATION_CYCLE_URANUS;        // [ 0., 1. )
	TimeNeptune = (float)msNeptune / (float)MS_IN_THE_ANIMATION_CYCLE_NEPTUNE;        // [ 0., 1. )
	TimePluto = (float)msPluto / (float)MS_IN_THE_ANIMATION_CYCLE_PLUTO;        // [ 0., 1. )
```
### Calculating the Rotation
I calculated rotation by using some trigonometry. The planets only rotated on the X and Z axis. This made it so I could easily increase the Y axis to look slightly above the planet. Using planet structs, made it easy to follow the planets around even if they were moving. If the animation was toggled on: 
```c++
		float EarthRadius = EarthCoords.x;
		float MercuryRadius = MercuryCoords.x;
		float VenusRadius = VenusCoords.x;
		float MarsRadius = MarsCoords.x;
		float JupiterRadius = JupiterCoords.x;
		float SaturnRadius = SaturnCoords.x;
		float NeptuneRadius = NeptuneCoords.x;
		float UranusRadius = UranusCoords.x;
		float PlutoRadius = PlutoCoords.x;
		EarthCoords.x = EarthRadius * sin(TimeEarth * 2 * M_PI);
		EarthCoords.z = EarthRadius * cos(TimeEarth * 2 * M_PI);
		MercuryCoords.x = MercuryRadius * sin(TimeMerc * 2 * M_PI);
		MercuryCoords.z = MercuryRadius * cos(TimeMerc * 2 * M_PI);
		VenusCoords.x = VenusRadius * sin(TimeVenus * 2 * M_PI);
		VenusCoords.z = VenusRadius * cos(TimeVenus * 2 * M_PI);
		MarsCoords.x = MarsRadius * sin(TimeMars * 2 * M_PI);
		MarsCoords.z = MarsRadius * cos(TimeMars * 2 * M_PI);
		JupiterCoords.x = JupiterRadius * sin(TimeJupiter * 2 * M_PI);
		JupiterCoords.z = JupiterRadius * cos(TimeJupiter * 2 * M_PI);
		SaturnCoords.x = SaturnRadius * sin(TimeSaturn * 2 * M_PI);
		SaturnCoords.z = SaturnRadius * cos(TimeSaturn * 2 * M_PI);
		NeptuneCoords.x = NeptuneRadius * sin(TimeNeptune * 2 * M_PI);
		NeptuneCoords.z = NeptuneRadius * cos(TimeNeptune * 2 * M_PI);
		UranusCoords.x = UranusRadius * sin(TimeUranus * 2 * M_PI);
		UranusCoords.z = UranusRadius * cos(TimeUranus * 2 * M_PI);
		PlutoCoords.x = PlutoRadius * sin(TimePluto * 2 * M_PI);
		PlutoCoords.z = PlutoRadius * cos(TimePluto * 2 * M_PI);
```
### Following Planets While Rotating
I calculated the LookAt Position by using the planet structs:
```c++
	case 1: //Mercury
		if (AnimateBool) {
			gluLookAt(MercuryCoords.x + (MercuryCoords.x * .021), MercuryCoords.y + .2, MercuryCoords.z + (MercuryCoords.z * .021), 0., 0., 0., 0., 1., 0);
		}
		else {
			gluLookAt(MercuryCoords.x + 5, MercuryCoords.y + 3, 0., 0., 0., 0., 0., 1., 0);
		}
		break;
```
### Function for Building Textures
I also had to work some pointer magic to avoid rewriting a ton of code (which I already had done a lot of).
```c++
void BuildTexObj(GLuint *TexObj, char FileName[], int width, int height) 
{
	glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
	glGenTextures(1, TexObj);
	unsigned char* myTexture = BmpToTexture(FileName, &width, &height);
	glBindTexture(GL_TEXTURE_2D, *TexObj);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE);
	int level = 0;
	int ncomps = 3;
	int border = 0;
	glTexImage2D(GL_TEXTURE_2D, level, ncomps, width, height, border, GL_RGB, GL_UNSIGNED_BYTE, myTexture);
}
```

## 5. What I Learned that I Didn’t Know Before
I learned a lot about how difficult it is to do what you would think is such a simple thing in graphics. I spent multiple hours fixing something that might seem so simple (adjusting the planet’s rotation speed). I learned more about OpenGL lighting, and texture objects. I also learned more about how vast space is and how rending can become a problem with things so large. With a lot of the projects earlier in the term, there was not really any stress on my GTX960 GPU. When I adjusted all the spheres have higher slices, I heard my fan get louder. It felt nice to actually make something that requires a bit more hardware than the average system.

After completing this class, one of my biggest takeaways is that computer graphics is a LOT of math. I have a tremendous more amount of appreciation for animated movies and video games now because all of it is a bunch of math behind the scenes.
## 6. Images
### Saturn and Jupiter
![Jupiter_Saturn](/Images/Jupiter_Saturn.png)
### Jupiter Rotating, LookAt Following
![JupiterLookAt](/Images/JupiterLookAt.png)
### Far Out View Showing Planets Rotating
You can see Saturn and Mars on the right, extremely close to the sun, Mercury can be seen.  
![FarOutViewRotatingPlanets](/Images/FarOutViewRotatingPlanets.png)
### Saturn With Lighting
![SaturnShading](/Images/SaturnShading.png)
### Earth With Lighting, LookAt Following
Can also see (Neptune or Uranus) and Saturn on the right. Mars is seen on the left.  
![EarthLookAtLighting](/Images/EarthLookAtLighting.png)
### Displaying Non-Rotating Outer Planets
In the following order the textured planets are shown. Jupiter, Saturn, Uranus, Neptune, and Pluto.  
![OuterPlanets](/Images/OuterPlanets.png)
### Displaying Non-Rotating Inner Planets
Mars is not shown due to not being able to see Venus and Mercury. Venus is difficult to see but it is right on the sun. Mercury is the miniscule gray dot next to the sun.  
![InnerPlanets](/Images/InnerPlanets.png)
## 7. Video Link
It is just under 7 minutes. I had a lot of things I wanted to Demo. I added an index of the timestamps in my demo if you’d like to skip around.
- Requirements & Introduction 0:00-1:40
- Non-Animated Demo 1:40-2:38
- Scaling/Rendering 2:39-3:36
- Menu Options & LookAt Positions 3:37-4:10
- Lighting & Attenuation 4:11-4:49
- Animation with & without Lighting 4:50-5:55
- Close/Far Planets View 5:56-6:33
- Closing Thoughts 6:34-6:49

Link: <https://media.oregonstate.edu/media/1_v5a9qr2f>
## References for Texture Files
I downloaded all textures from: <https://www.solarsystemscope.com/textures/>

I then used a jpg to bmp converter: <https://convertio.co/jpg-bmp/>

