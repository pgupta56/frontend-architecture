# Redhotminute frontend architecture that can be used as a base for new projects.

## Installation steps
1. Run ```npm install```
2. Run ```bower install```

## Architecture

### CSS folder

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

### JavaScript folder

```
|-- /js [1]
|  |-- /base [2]
|  |  |-- /services [3]
|  |  `-- /utilities [4]
|  |-- /modules [5]
|  |-- /platform [6]
|  |-- include.js [7]
|  `-- require.config.js [8]
```

1. Top level JavaScript folder

2. Base JavaScript folder - Generic JavaScript parts.

3. Services folder - Pieces of JavaScript that allow interaction with a web service.

4. Utilities folder - Pieces of JavaScript that perform common, often re-used functions.

5. Modules folder - Pieces of JavaScript that allow for UI/page interactions, but don't necessarily introduce any platform specific logic. These modules expose an API to interact with them and will be tied together in the platform folder, to make them interact with other modules and features of the platform.

6. Platform JavaScript folder - pieces of JavaScript logic that are very specific to the project being created. Will call specific modules and tie pieces of code together to form components and the interaction between them. Modules shouldn't have relationships to other modules, otherwise they are too tightly coupled and changes are a large risk. In stead, we perform these interaction between the modules in the platform folder to form actual usable pieces of code and the way they are executed.

7. The ```include.js``` file - The entry point for the RequireJS build, the starting point of the dependency tree. Will tie pieces of code from the platform folder together.

8. The ```require.config.js``` file - RequireJS configurations, [more information can be found here](http://requirejs.org/docs/api.html#config).
