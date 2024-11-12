import pygame 
pygame.init()

# Configure the screen
screen = pygame.display.set_mode([500, 500])

# Creat the game loop
running = True 
while running: 
	# Looks at events 
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			running = False
	
	# Clear the screen
	screen.fill((255, 255, 255))
	# Draw a circle
	color = (0, 255, 255)
	position = (250, 250)
	pygame.draw.circle(screen, color, position, 75)
	# Update the display
	pygame.display.flip()