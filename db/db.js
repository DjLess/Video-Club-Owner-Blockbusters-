const DB = {
    movies: {
        1: { id: 1, title: "Shrek", genre: "Animación/Comedia" },
        2: { id: 2, title: "Matrix", genre: "Ciencia Ficción" },
        3: { id: 3, title: "Jurassic Park", genre: "Ciencia Ficción/Aventura" },
        4: { id: 4, title: "Titanic", genre: "Romance/Drama" },
        5: { id: 5, title: "El Rey León", genre: "Animación/Musical" },
        6: { id: 6, title: "Pulp Fiction", genre: "Crimen/Drama" },
        7: { id: 7, title: "Terminator 2", genre: "Acción/Ciencia Ficción" },
        8: { id: 8, title: "Toy Story", genre: "Animación/Familiar" },
        9: { id: 9, title: "Sexto Sentido", genre: "Suspenso/Misterio" },
        10: { id: 10, title: "Forrest Gump", genre: "Drama/Comedia" },
        11: { id: 11, title: "Hombres de Negro", genre: "Comedia/Ciencia Ficción" },
        12: { id: 12, title: "Gladiador", genre: "Acción/Épica" },
        13: { id: 13, title: "El Club de la Pelea", genre: "Drama/Suspenso" },
        14: { id: 14, title: "Scream", genre: "Terror/Slasher" },
        15: { id: 15, title: "Space Jam", genre: "Comedia/Deportes" }
    },
    customers: [
        {
            id: 1,
            text: "Mis hijos quieren ver unos dibujos animados, pero yo también quiero reírme. Me gustan los cuentos de hadas pero que tengan humor ácido, tal vez con un ogro verde o un burro que hable.",
            hint1_words: ["dibujos animados", "cuentos de hadas"],
            hint2_words: ["humor ácido", "ogro verde", "burro que hable"],
            correctMovieId: 1,
            options: [1, 5, 8] // Shrek, El Rey León, Toy Story
        },
        {
            id: 2,
            text: "Busco algo de acción y artes marciales, pero con una historia que te vuele la cabeza. Algo sobre que vivimos en una simulación de computadora y tenemos que elegir entre pastillas rojas y azules.",
            hint1_words: ["artes marciales", "simulación de computadora"],
            hint2_words: ["pastillas rojas y azules"],
            correctMovieId: 2,
            options: [2, 7, 11] // Matrix, Terminator 2, Hombres de Negro
        },
        {
            id: 3,
            text: "Quiero ver algo de ciencia ficción clásica. Esa donde un multimillonario abre un parque de atracciones en una isla y todo sale terriblemente mal cuando se escapan los dinosaurios y los T-Rex.",
            hint1_words: ["ciencia ficción clásica", "parque de atracciones"],
            hint2_words: ["isla", "dinosaurios", "T-Rex"],
            correctMovieId: 3,
            options: [3, 2, 11] // Jurassic Park, Matrix, Hombres de Negro
        },
        {
            id: 4,
            text: "Mi pareja y yo queremos llorar un rato con un romance épico. Esa histórica donde un barco gigante e inhundible choca contra un iceberg, y hay un dibujo a carboncillo de una chica con un collar.",
            hint1_words: ["romance épico", "barco gigante"],
            hint2_words: ["iceberg", "dibujo a carboncillo"],
            correctMovieId: 4,
            options: [4, 10, 13] // Titanic, Forrest Gump, El Club de la Pelea
        },
        {
            id: 5,
            text: "Busco un musical animado clásico en la sabana africana. Ya sabes, la historia de ese cachorro que tiene que recuperar su trono tras la traición de su tío. ¡Hakuna Matata!",
            hint1_words: ["musical animado", "sabana africana"],
            hint2_words: ["cachorro", "traición de su tío", "Hakuna Matata"],
            correctMovieId: 5,
            options: [1, 5, 8] // Shrek, El Rey León, Toy Story
        },
        {
            id: 6,
            text: "Me recomendaron una de los noventa donde las historias de varios criminales se cruzan. Hay dos matones trajeados que hablan de hamburguesas europeas y un maletín misterioso que brilla por dentro.",
            hint1_words: ["criminales se cruzan", "matones trajeados"],
            hint2_words: ["hamburguesas europeas", "maletín misterioso"],
            correctMovieId: 6,
            options: [6, 13, 2] // Pulp Fiction, El Club de la Pelea, Matrix
        },
        {
            id: 7,
            text: "Quiero acción noventera pura. Esa donde un cyborg vuelve del futuro no para matar, sino para proteger a un adolescente de otro robot hecho de metal líquido. ¡Hasta la vista, baby!",
            hint1_words: ["cyborg vuelve del futuro", "proteger a un adolescente"],
            hint2_words: ["metal líquido", "Hasta la vista, baby"],
            correctMovieId: 7,
            options: [7, 2, 12] // Terminator 2, Matrix, Gladiador
        },
        {
            id: 8,
            text: "Estoy cuidando a mi sobrinito y quiero ponerle esa película que revolucionó la animación 3D. Trata sobre juguetes que cobran vida cuando los humanos no miran, especialmente un vaquero y un astronauta.",
            hint1_words: ["revolucionó la animación 3D", "juguetes que cobran vida"],
            hint2_words: ["vaquero", "astronauta"],
            correctMovieId: 8,
            options: [1, 8, 15] // Shrek, Toy Story, Space Jam
        },
        {
            id: 9,
            text: "Busco una película de misterio psicológico con un final inesperado que todo el mundo comenta. Es sobre un psicólogo infantil y un niño que dice que ve gente muerta caminando por ahí.",
            hint1_words: ["misterio psicológico", "final inesperado"],
            hint2_words: ["psicólogo infantil", "ve gente muerta"],
            correctMovieId: 9,
            options: [9, 14, 13] // Sexto Sentido, Scream, El Club de la Pelea
        },
        {
            id: 10,
            text: "Tengo ganas de ver un drama esperanzador. Cuenta la vida de un hombre de buen corazón que sin querer recorre los eventos históricos de Estados Unidos, y dice que la vida es como una caja de chocolates.",
            hint1_words: ["drama esperanzador", "recorre los eventos históricos"],
            hint2_words: ["caja de chocolates"],
            correctMovieId: 10,
            options: [10, 4, 6] // Forrest Gump, Titanic, Pulp Fiction
        },
        {
            id: 11,
            text: "Busco una comedia de ciencia ficción. Trata de unos agentes con trajes formales y gafas oscuras que vigilan a los extraterrestres que viven en secreto en la Tierra y borran la memoria de los testigos.",
            hint1_words: ["comedia de ciencia ficción", "trajes formales y gafas oscuras"],
            hint2_words: ["extraterrestres", "borran la memoria"],
            correctMovieId: 11,
            options: [11, 2, 15] // Hombres de Negro, Matrix, Space Jam
        },
        {
            id: 12,
            text: "Estoy buscando una película histórica y de acción épica del año 2000. Trata de un general romano que es traicionado por el emperador y se convierte en esclavo para luchar en la arena del Coliseo.",
            hint1_words: ["histórica y de acción épica", "general romano"],
            hint2_words: ["esclavo para luchar", "arena del Coliseo"],
            correctMovieId: 12,
            options: [12, 7, 4] // Gladiador, Terminator 2, Titanic
        },
        {
            id: 13,
            text: "Quiero algo oscuro, un thriller psicológico noventero. Trata sobre un tipo con insomnio que funda un grupo clandestino para golpearse en sótanos, y la primera regla es que nadie debe hablar de ello.",
            hint1_words: ["thriller psicológico", "insomnio"],
            hint2_words: ["grupo clandestino para golpearse", "primera regla", "nadie debe hablar"],
            correctMovieId: 13,
            options: [13, 6, 9] // El Club de la Pelea, Pulp Fiction, Sexto Sentido
        },
        {
            id: 14,
            text: "Tengo ganas de un slasher de terror adolescente. Esa donde el asesino usa una máscara de fantasma blanca y llama a sus víctimas por teléfono preguntándoles por sus películas de miedo favoritas.",
            hint1_words: ["slasher de terror adolescente", "máscara de fantasma blanca"],
            hint2_words: ["llama a sus víctimas", "películas de miedo favoritas"],
            correctMovieId: 14,
            options: [14, 9, 6] // Scream, Sexto Sentido, Pulp Fiction
        },
        {
            id: 15,
            text: "Busco esa película nostálgica mezcla de animación y realidad donde un jugador de básquetbol legendario se une a unos famosos dibujos animados de conejos y patos para ganar un partido contra extraterrestres.",
            hint1_words: ["jugador de básquetbol legendario", "dibujos animados de conejos y patos"],
            hint2_words: ["ganar un partido", "extraterrestres"],
            correctMovieId: 15,
            options: [15, 8, 11] // Space Jam, Toy Story, Hombres de Negro
        }
    ]
};