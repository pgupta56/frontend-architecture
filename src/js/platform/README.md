# Platform core
Pieces of code that are very specific to the project being created. Will call specific modules and tie pieces of code together to form components and the interaction between them.

Modules shouldn't have relationships to other modules, otherwise they are too tightly coupled and changes are a large risk. In stead, we perform these interaction between the modules in the platform folder to form actual usable pieces of code and the way they are executed.
