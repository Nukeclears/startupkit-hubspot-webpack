# startupkit-hs-webpack

The goal is to have a repository to manage your Webpack and front-end tools whilst letting Hubspot its repository manage all theme files (modules, pages etc). 

Both sides will ignore each others files (except for Webpack it's output)

##	File and tools orientation
**A summary of tools that are used in this Webpack setup:**

 - TailwindCSS 
 - PostCSS with TailwindCSS nesting & PostCSS import 
 - Vue 3 with Typescript 
 - Javascript 
 - Babel 
 - AlpineJS 
 - Stylelint & eslint 
 - CSSNANO

**JS modules that use or enable:**

 - Background image lazy loading 
 - Video lazy loading 
 - Vimeo integration
 - Parallax using Simple Parallax JS 
 - Sliders using Tiny Slider

## Setup
1. Initialize your local development environment in the root directory of this project (hubspot.config.yml)  
2. Fetch the theme you will be working on to the local Development environment  
	Example structure:  
	*./yourHubspotProjectName  
	./Webpack  
	./hubspot.config.yml  
3. Rename all instances of "*yourHubspotProjectName*" to the directory name of your hubspot theme.
4. Run *Yarn install* in */Webpack* directory

## Commands
webpack::build	| builds your frontend  
webpack::watch | builds your frontend, then watches for changes and reruns  
webpack::debugging | builds your frontend, then watches for changes and reruns in development mode  

## Output

Ouput is located in *./yourHubspotProjectName/Dist*  
You can then link the files in that directory as dependencies on your modules / pages in hubspot  