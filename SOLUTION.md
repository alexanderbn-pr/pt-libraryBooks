# Mejoras en cuanto a rendimiento y estructura de la aplicación ⚙️

Para las mejoras de rendimiento y de estructura, se han hecho las siguientes modificaciones:

- Se ha dividido el código en componentes más pequeños y reutilizables que permiten tener un proyecto más ordenado y fácil de mantener, además de mayor escalabilidad.
- Se ha extraído el CSS en archivos separados, siguiendo la misma estructura que los componentes (misma carpeta, nombre, etc.).
- Se ha modificado el nombre de las variables y los componentes para una mejor lectura y entendimiento de lo que representan.
- Se han modificado algunos click={} para mejorar la experiencia de usuario (p.ej: en bookComponent.tsx, el click ahora afecta a toda la card para facilitar el uso).
- Modificación del SEO para mejorar la lectura del HTML y el posicionamiento de la web en Internet.
- Se han añadido customHooks para organizar la funcionalidad de la aplicación.
- Se ha hecho uso de useDebounce en la búsqueda de libros para que se haga el filtrado automáticamente cuando el cliente deje de escribir en el input.
- Se han creado las interfaces para el tipado de los objetos y funciones (archivo types.d.ts) y también se ha añadido la librería propTypes para controlar el tipado de las propiedades que se envían a los componentes.
- Se ha añadido la librería react query para almacenar en caché la llamada de obtener libros (ya que son datos que no cambian), para el control de estado en caso de estar cargando y para gestionar si devuelve algún error.
- Se ha añadido React.memo y useMemo para el renderizado de componentes, y que solo se rendericen de nuevo si sus propiedades cambian (componente de Books)
- Uso del useCallback para las funciones que se utilizan en componentes hijos para que no se rendericen de nuevo.
- Se ha extraído a una función con useCallback la gestión de favoritos para evitar que los componentes se rendericen todos cada vez que se añade o se quita un elemento. De esta forma, solo se renderiza el libro que se ha añadido. Para la lista de favoritos he añadido el localStorage para que se mantenga el valor en caso de refrescar el navegador.
- Se ha modificado la funcionalidad de recientes para mejorar su rendimiento y también la ordenación, ahora el último visitado siempre aparece el primero. Esto se ha hecho mediante el control del estado previo de la lista. Se puede observar en los console.log() de BooksComponent.


# Mejoras visuales 🧩

Para las mejoras visuales, se han realizado los siguientes cambios:

- Se ha modificado el estilo para que sea más user-friendly y se han añadido estilos de CSS para hacer que la aplicación sea responsive, tales como el Grid para los libros y los FlexBox para la estructura de la aplicación.
- Se han utilizado px para el tamaño de los elementos por cuestión de tiempo, pero se deberían de utilizar otras medidas como dvw, dvh o rem para el tamaño de las fuentes.
- Se ha añadido el preprocesador de Sass para una mejor estructuración de las clases CSS y poder añadir algún mixin para no repetir tanto código. Como ejemplo, he creado un mixin para los Flexbox y también se podrían añadir para los colores de los botones.
- Se ha añadido un lazy-load para la carga de las imagenes en el listado de libros.

# Funcionalidades nuevas 🆕

Se han añadido las nuevas funcionalidades:

- Se ha creado un customHook para el filtrado de los libros y ordenación de la lista. Tenemos la constante SORT_OPTIONS para añadir todos los tipos de filtrados que queramos hacer por las diferentes propiedades que tenga el objeto Book. SortedBooks se recalculará cuando se modifique el tipo de ordenación (nombre, fecha, etc.), se cambie la lista de libros filtrada por el buscador o si el orden es ascendente o descendente. Esta función extrae la propiedad indicada de la lista y las compara o bien con el localCompare si son strings o se restan en caso de ser numbers.
- Se ha añadido la librería routerView para mostrar una segunda página donde se carga la llamada de personajes y react Query para gestionar la páginación.
- Se ha añadido un navbar para cambiar de página.

# Funcionalidades que se podrían añadir 🔜

Algunas sugerencias de mejora que se han dejado fuera por el alcance de la prueba:

- Añadir un formulario para crear un libro.
- Mostrar la lista de favoritos filtrando por la propiedad isFavorite, valor que le enviamos a los componentes booksComponent y bookList.
- Guardar en redux o Zustand los libros para poder añadir un selector en la página de personajes y poder filtrar según el valor que se seleccione.
- Los customhooks se podrían hacer más pequeños y modulares, igual que los componentes
- Se podrían añadir más aria-labels para identificar mejor los botones en caso de utilizar ficheros de idiomas (Sections, Articles, aside, alt en las imágenes, arial-label…)
- Utilizar alguna librería como i18n para hacer la aplicación multiidioma.

# Tests 🧪

Se han modificado los tests ya existentes para que sigan funcionando. También se han añadido tests del customHook useUserInteractive como muestra de ejemplo.
