# Redhotminute frontend architecture that can be used as a base for new projects.

## Installation steps
1. Run ```npm install```
2. Run ```bower install```

## Architecture

```
|-- css [1]
|  |-- settings [2]
|  |-- tools [3]
|  |-- generic [4]
|  |-- elements [5]
|  |-- modules [6]
|  |-- objects [7]
|  |-- components [8]
|  |-- utilities [9]
|  |  |-- functions [10]
|  |  `-- mixins [11]
|  `-- main.scss [12]
|-- js [13]
|  |-- base [14]
|  |  |-- modules [15]
|  |  `-- utils [16]
|  |-- platform [17]
|  |  |-- modules [18]
|  |  `-- utils [19]
|  |-- include.js [20]
|  `-- require.config.js [21]
```

1. Top level CSS folder, the reason it is called CSS and not SCSS is because the technique used should not define the use case.

2. ITCSS layer 1: ```settings``` - Used with preprocessors and contain font, colors definitions, etc.

3. ITCSS layer 2: ```tools``` - Globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.

4. ITCSS layer 3: ```generic``` - Reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.

5. ITCSS layer 4: ```elements``` - Styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.

6. New layer introduces to architecture: ```modules``` - Redhotminute specific modules that can be installed through the NuGet repository.

7. ITCSS layer 5: ```objects``` - Class-based selectors which define undecorated design patterns, for example media object known from OOCSS.

8. ITCSS layer 6: ```components``` - Specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components.

9. ITCSS layer 7: ```utilities``` - Utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class.

10. Optional separation layer of ```utilities```, a functions folder.

11. Optional separation layer of ```utilities```, a mixins folder.

12. The ```main.scss``` file where everything is imported together for the build.

13. Top level JavaScript folder

14. Base JavaScript folder - Generic JavaScript parts.

15. Base modules folder - Modules that are not platform specific and can be reused in other projects. Also used for the Redhotminute Base modules.

16. Base utilities folder - Utilities that are not platform specific and can be reused in other projects. Also used for the Redhotminute Base utilities.

17. Platform JavaScript folder - Platform specific JavaScript parts.

18. Platform modules folder - Modules that are platform specific and cannot be reused in other projects.

19. Platform utilities folder - Utilities that are platform specific and cannot be reused in other projects.

20. The ```include.js``` file - The entry point for the RequireJS build, the starting point of the dependency tree.

21. The ```require.config.js``` file - RequireJS configurations, [more information can be found here](http://requirejs.org/docs/api.html#config).
