/*
The MIT License (MIT)

Copyright (c) <2013> <SDL2.0 vapi>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
//FOR: SDL2.0 - This is not official, to be futurely changed for the official binding
//Maintainer: PedroHLC and Txasatonga

// Compilation command:
// valac -o "Example_1" --pkg gee-1.0 --pkg sdl2 --pkg sdl2-gfx --pkg sdl2-ttf --pkg sdl2-image --pkg sdl2-mixer -X -lSDL2_image  -X -lSDL2_ttf -X -lSDL2_mixer -X -lSDL2_gfx "Example_1.vala"

uses SDL;
uses SDLImage;
uses SDLTTF;
uses SDLMixer;

class Example : Object
	window : SDL.Window
	WIN_RENDERER : SDL.Renderer 
	
	init
		SDL.init (SDL.InitFlag.EVERYTHING| SDLImage.InitFlags.ALL); 
		SDLTTF.init();
		window = new SDL.Window ("Testing SDL 2.0 in Vala: Keyboard, Textures and Sound", Window.POS_CENTERED, Window.POS_CENTERED, 800,600, WindowFlags.RESIZABLE);
		var a= SDLMixer.open(44100,SDL.AudioFormat.S16LSB,2,4096); stdout.printf("%d\n",a);
		WIN_RENDERER = new SDL.Renderer (window, -1, SDL.RendererFlags.ACCELERATED | SDL.RendererFlags.PRESENTVSYNC);	
		window.show ();
		e: Event;
		// Open surface and after transform to texture
		imagen: SDL.Surface = SDLImage.load("boy.png");
		Timagen: SDL.Texture = new Texture.from_surface (WIN_RENDERER, imagen);		
		
		// Load music
		musica: Music = new Music ("yahoo.ogg");
		
		// Load font as surface and transform to texture.
		Fuente:Font= new Font("KatamotzIkasi.ttf", 30);
		letras: SDL.Surface = Fuente.render_blended_wrapped_utf8("Keyboard press: up,left,rigth,down and space", {10,10,100,155}, 240);
		Tletras: SDL.Texture = new Texture.from_surface (WIN_RENDERER, letras);	

		var row =0;
		var column =0;

		//Main loop
		var fin=false
		while (not fin)
			WIN_RENDERER.clear();
			WIN_RENDERER.set_draw_color(100, 200, 200, 250);
			WIN_RENDERER.fill_rect( {0, 0, 800, 600} ) ;
			
			while (SDL.Event.poll (out e))==1
				if (e.type==EventType.KEYDOWN)
					if ( e.key.keysym.sym== Keycode.DOWN)
						row+=10;
					if ( e.key.keysym.sym== Keycode.UP)
						row-=10;
					if ( e.key.keysym.sym== Keycode.LEFT)
						column-=20;
					if ( e.key.keysym.sym== Keycode.RIGHT)
						column+=20;
					if ( e.key.keysym.sym== Keycode.SPACE) // When press space sounds.
						musica.play(1);
				if e.type == EventType.QUIT
					fin=true
					
			WIN_RENDERER.copy (Timagen, {0, 0, imagen.w, imagen.h} , {column, row, imagen.w*2, imagen.h*2});
			WIN_RENDERER.copy (Tletras, {0, 0, letras.w, letras.h} , {500, 400, letras.w, letras.h});
			WIN_RENDERER.present();
			window.update_surface ();
			SDL.Timer.delay(10);

			

		window.destroy (); //Actually useless since it is called when window is disposed
		SDL.quit ();
		

example: Example
init
	example= new Example();
	