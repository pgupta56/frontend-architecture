# Redhotminute frontend architecture that can be used as a base for new projects.

## Installation steps
Run ```npm install```

## Architecture

## Build folder

```
|-- /build [1]
|  |-- /tasks [2]
|  |-- /plugins [3]
|  `-- config.js [4]
```

1. Top level build folder, used to store all Gulp build related files

2. A folder where all individual tasks are stored. Ideally, the file name corresponds with the name of the task being provided inside.

3. Plugins folder where we can store common, often re-used bits of functionality.

4. The configuration file where all paths and plugin configurations are stored.

### Build information
We use a tag manager plugin to easily add commonly wanted features behind the scenes instantly. If we use the ```addTask()``` method to define a new task, providing the ```task name```, ```src```, ```dest```, and ```callback``` (being the actual functionality). It will automatically add a clean, watch and the actual taks itself to the build.

By using Nodejs its module.exports pattern, we make the task available to the rest of the build and allow the task manager to bootstrap the entire build inside the Gulpfile. We use a custom pattern to require the entire ```tasks/``` directory since the require-dir plugin does not allow passing parameters. The Gulpfile will then provide any extra information. This is generally a gulp instance called ```gulp```, a plugins object referenced as ```plugins``` where all Node modules are stored, and a set of configurations coming from the config.js file in the root referenced as ```config```. All of these are being exposed in the order they are explained to each task as parameter.

Finally, the Gulpfile defines the ```default``` task. If preferred, we can also move this to its own file inside the ```tasks/``` directory.

To run Gulp use the command ```npm run gulp <task>```

### ITCSS

```
|-- /css [1]
|  |-- /1-settings [2]
|  |-- /2-tools [3]
|  |-- /3-generic [4]
|  |-- /4-elements [5]
|  |-- /5-objects [6]
|  |-- /6-components [7]
|  |-- /7-utilities [8]
|  |  |-- /functions [9]
|  |  `-- /mixins [10]
|  `-- main.scss [11]
```

1. Top level CSS folder, the reason it is called CSS and not SCSS is because the technique used should not define the use case.

2. ITCSS layer 1: ```settings``` - Used with preprocessors and contain font, colors definitions, etc.

3. ITCSS layer 2: ```tools``` - Globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.

4. ITCSS layer 3: ```generic``` - Reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.

5. ITCSS layer 4: ```elements``` - Styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.

6. ITCSS layer 5: ```objects``` - Class-based selectors which define undecorated design patterns, for example media object known from OOCSS.

7. ITCSS layer 6: ```components``` - Specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components.

8. ITCSS layer 7: ```utilities``` - Utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class.

9. Optional separation layer of ```utilities```, a functions folder.

10. Optional separation layer of ```utilities```, a mixins folder.

11. The ```main.scss``` file where everything is imported together for the build.

### ITJS

```
|-- /js
|  |-- /polyfills [1]
|  |-- /vendor [2]
|  |-- /utilities [3]
|  |-- /endpoints [4]
|  |-- /modules [5]
|  |-- /platform [6]
|  |-- main.js
```

1. ITJS layer 1: ```polyfills``` - Provide modern functionality on older browsers that do not natively support it. For example a polyfill could be used to mimic the functionality of an HTML Canvas element on Microsoft Internet Explorer 7 using a Silverlight plugin, or mimic support for CSS rem units, or text-shadow, or whatever you want.

2. ITJS layer 2: ```vendor``` - 3rd party code that is not available through npm, we copy it in to this folder so we can reference it.

3. ITJS layer 3: ```utilities``` - Common, often reused functions which can be used in multiple pieces of code/layers. Can also be used for complex code that is better left abstracted from UI code.

4. ITJS layer 4: ```endpoints``` - All web services wrapped in a convenient manner. So we keep the logic and data used to communicate with endpoints consistent and clear.

5. ITJS layer 5: ```modules``` - Self contained component, frequently one that is interchangeable with others, for assembly into units of differing size, complexity, or function. Can have a public API and/or has the ability to call itself based on a set of elements from the DOM.

6. ITJS layer 6: ```platform``` - The final layer, this is where platform specific logic comes into play. Every platform has pieces of code that are tied together with rules from the business or UX patterns that are uncommon but used for a very apparent reason. All these examples are inside this folder. It is possible to separate everything inside this folder into their own folders and you can pick and choose which folders best fit your case.
