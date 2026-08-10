const DB = {
    movies: {
        1: { id: 1, title: "Shrek", genre: "Animation / Comedy" },
        2: { id: 2, title: "The Matrix", genre: "Sci-Fi / Action" },
        3: { id: 3, title: "Jurassic Park", genre: "Sci-Fi / Adventure" },
        4: { id: 4, title: "Titanic", genre: "Romance / Drama" },
        5: { id: 5, title: "The Lion King", genre: "Animation / Musical" },
        6: { id: 6, title: "Pulp Fiction", genre: "Crime / Drama" },
        7: { id: 7, title: "Terminator 2: Judgment Day", genre: "Action / Sci-Fi" },
        8: { id: 8, title: "Toy Story", genre: "Animation / Family" },
        9: { id: 9, title: "The Sixth Sense", genre: "Mystery / Thriller" },
        10: { id: 10, title: "Forrest Gump", genre: "Drama / Romance" },
        11: { id: 11, title: "Men in Black", genre: "Comedy / Sci-Fi" },
        12: { id: 12, title: "Gladiator", genre: "Action / Historical" },
        13: { id: 13, title: "Fight Club", genre: "Drama / Thriller" },
        14: { id: 14, title: "Scream", genre: "Horror / Slasher" },
        15: { id: 15, title: "Space Jam", genre: "Comedy / Sports" },
        16: { id: 16, title: "Inception", genre: "Sci-Fi / Thriller" },
        17: { id: 17, title: "Interstellar", genre: "Sci-Fi / Drama" },
        18: { id: 18, title: "The Dark Knight", genre: "Action / Crime" },
        19: { id: 19, title: "Superbad", genre: "Comedy" },
        20: { id: 20, title: "Spirited Away", genre: "Animation / Fantasy" },
        21: { id: 21, title: "Alien", genre: "Horror / Sci-Fi" },
        22: { id: 22, title: "The Shining", genre: "Horror / Psychological" },
        23: { id: 23, title: "La La Land", genre: "Musical / Romance" },
        24: { id: 24, title: "Whiplash", genre: "Drama / Music" },
        25: { id: 25, title: "Spider-Man: Into the Spider-Verse", genre: "Animation / Action" },
        26: { id: 26, title: "Back to the Future", genre: "Sci-Fi / Comedy" },
        27: { id: 27, title: "The Silence of the Lambs", genre: "Crime / Thriller" },
        28: { id: 28, title: "Die Hard", genre: "Action / Thriller" },
        29: { id: 29, title: "Finding Nemo", genre: "Animation / Adventure" },
        30: { id: 30, title: "The Truman Show", genre: "Drama / Sci-Fi" }
    },
    customers: [
        {
            id: 1,
            text: "Hey! I'm in the mood for an animated movie, but not typical kids stuff. I loved 'Toy Story' and 'Monsters, Inc.', but tonight I want something with sarcastic humor, fairy tale parodies, and funny pop culture references.",
            hint1_words: ["animated movie", "sarcastic humor"],
            hint2_words: ["fairy tale parodies", "pop culture references"],
            correctMovieId: 1,
            options: [1, 8, 29]
        },
        {
            id: 2,
            text: "Hi! I really enjoy mind-bending action movies. 'Inception' and 'Blade Runner' are among my favorites. Do you have an action film with martial arts, philosophical questions about reality, and cool visual effects?",
            hint1_words: ["mind-bending action", "philosophical questions"],
            hint2_words: ["martial arts", "questions about reality"],
            correctMovieId: 2,
            options: [2, 16, 7]
        },
        {
            id: 3,
            text: "I'm looking for a classic 90s blockbuster for family movie night. We loved 'Jaws' and 'E.T.'. We want something high-stakes with practical effects, science gone wrong, and prehistoric creatures.",
            hint1_words: ["90s blockbuster", "science gone wrong"],
            hint2_words: ["practical effects", "prehistoric creatures"],
            correctMovieId: 3,
            options: [3, 21, 26]
        },
        {
            id: 4,
            text: "My partner and I want a massive, emotional historical romance. 'The Notebook' and 'Romeo + Juliet' are great examples of what we like. We want a tragic love story set during a real historical disaster.",
            hint1_words: ["historical romance", "tragic love story"],
            hint2_words: ["historical disaster", "emotional"],
            correctMovieId: 4,
            options: [4, 10, 23]
        },
        {
            id: 5,
            text: "I want an epic animated musical with unforgettable songs. I adore 'Beauty and the Beast' and 'Aladdin'. Something Shakespearean, emotional, set in the wilderness, with themes of royalty and loss.",
            hint1_words: ["animated musical", "Shakespearean"],
            hint2_words: ["unforgettable songs", "royalty and loss"],
            correctMovieId: 5,
            options: [5, 20, 1]
        },
        {
            id: 6,
            text: "I'm looking for a stylish crime movie with sharp dialogue and non-linear storytelling. I loved 'Reservoir Dogs' and 'Snatch'. Give me something gritty, cool, and iconic from the 90s indie cinema scene.",
            hint1_words: ["crime movie", "sharp dialogue"],
            hint2_words: ["non-linear storytelling", "90s indie cinema"],
            correctMovieId: 6,
            options: [6, 13, 27]
        },
        {
            id: 7,
            text: "I need an intense action movie with top-tier stunts and explosive special effects. 'Mad Max: Fury Road' and 'Predator' are my jams. Give me a relentless 90s sci-fi action masterpiece featuring futuristic robots.",
            hint1_words: ["intense action", "90s sci-fi action"],
            hint2_words: ["explosive special effects", "futuristic robots"],
            correctMovieId: 7,
            options: [7, 2, 28]
        },
        {
            id: 8,
            text: "I'm looking for a heartwarming family animated feature that revolutionized CGI. I really enjoyed 'A Bug's Life' and 'Cars'. Something about friendship, secret lives of everyday objects, and great voice acting.",
            hint1_words: ["family animated", "friendship"],
            hint2_words: ["revolutionized CGI", "secret lives of everyday objects"],
            correctMovieId: 8,
            options: [8, 29, 15]
        },
        {
            id: 9,
            text: "Do you have a psychological thriller with a huge twist ending? I loved 'The Others' and 'Shutter Island'. I want a slow-burn supernatural mystery focusing on grief and mysterious occurrences.",
            hint1_words: ["psychological thriller", "supernatural mystery"],
            hint2_words: ["huge twist ending", "slow-burn"],
            correctMovieId: 9,
            options: [9, 22, 14]
        },
        {
            id: 10,
            text: "I want a feel-good, heartwarming epic that journeys through several decades. Movies like 'The Truman Show' and 'Big Fish' resonate with me. Something inspiring about a simple guy experiencing historic moments.",
            hint1_words: ["feel-good", "heartwarming epic"],
            hint2_words: ["journeys through several decades", "simple guy historic moments"],
            correctMovieId: 10,
            options: [10, 30, 4]
        },
        {
            id: 11,
            text: "I want a funny sci-fi action comedy for Friday night. I enjoyed 'Ghostbusters' and 'Back to the Future'. I'm looking for cool gadgets, alien creatures, sharp banter, and secret agents in suits.",
            hint1_words: ["sci-fi action comedy", "cool gadgets"],
            hint2_words: ["alien creatures", "secret agents in suits"],
            correctMovieId: 11,
            options: [11, 26, 15]
        },
        {
            id: 12,
            text: "I'm in the mood for an epic historical drama with grand battle scenes. 'Braveheart' and 'Kingdom of Heaven' are right up my alley. Give me a story of betrayal, honor, and revenge in ancient Rome.",
            hint1_words: ["historical drama", "ancient Rome"],
            hint2_words: ["grand battle scenes", "betrayal honor revenge"],
            correctMovieId: 12,
            options: [12, 7, 18]
        },
        {
            id: 13,
            text: "I want a dark, rebellious psychological drama that critiques consumer culture. I really liked 'Taxi Driver' and 'American Psycho'. Something intense, gritty, with a strong narrative voice and plot twists.",
            hint1_words: ["dark psychological drama", "critiques consumer culture"],
            hint2_words: ["rebellious", "intense gritty plot twists"],
            correctMovieId: 13,
            options: [13, 6, 9]
        },
        {
            id: 14,
            text: "I want a clever horror movie to watch with friends. I like 'A Nightmare on Elm Street' and 'Halloween'. Give me a 90s slasher that meta-jokes about horror movie rules while keeping the suspense high.",
            hint1_words: ["clever horror", "90s slasher"],
            hint2_words: ["meta-jokes about horror rules", "suspense high"],
            correctMovieId: 14,
            options: [14, 22, 21]
        },
        {
            id: 15,
            text: "I'm looking for a fun 90s sports comedy blending live-action and classic cartoons. I enjoyed 'Who Framed Roger Rabbit'. Something nostalgic with basketball, cartoon slapstick, and legendary icons.",
            hint1_words: ["sports comedy", "classic cartoons"],
            hint2_words: ["live-action and cartoons", "basketball cartoon slapstick"],
            correctMovieId: 15,
            options: [15, 8, 1]
        },
        {
            id: 16,
            text: "I'm looking for a mind-bending sci-fi heist film. I loved 'Memento' and 'The Prestige'. I want complex layers of reality, dream logic, high stakes, and a grand musical score.",
            hint1_words: ["mind-bending sci-fi", "complex layers"],
            hint2_words: ["heist film", "dream logic high stakes"],
            correctMovieId: 16,
            options: [16, 2, 17]
        },
        {
            id: 17,
            text: "I want a deep, emotional space exploration movie. I loved 'Contact' and '2001: A Space Odyssey'. Something visually stunning about gravity, time dilation, black holes, and father-daughter relationships.",
            hint1_words: ["space exploration", "father-daughter relationships"],
            hint2_words: ["visually stunning", "time dilation black holes"],
            correctMovieId: 17,
            options: [17, 16, 3]
        },
        {
            id: 18,
            text: "I need a gritty, realistic superhero crime thriller. I'm a big fan of 'Heat' and 'Se7en'. I want moral ambiguity, chaotic villains, dark atmosphere, and intense urban conflict.",
            hint1_words: ["superhero crime thriller", "moral ambiguity"],
            hint2_words: ["gritty realistic", "chaotic villains dark atmosphere"],
            correctMovieId: 18,
            options: [18, 12, 13]
        },
        {
            id: 19,
            text: "I want a hilarious high school coming-of-age comedy. I love 'Booksmart' and 'American Pie'. Give me awkward teenage moments, party chaos, loyal friendships, and non-stop raunchy humor.",
            hint1_words: ["coming-of-age comedy", "raunchy humor"],
            hint2_words: ["high school party chaos", "awkward teenage moments"],
            correctMovieId: 19,
            options: [19, 11, 15]
        },
        {
            id: 20,
            text: "I want a magical, visually breathtaking animated fantasy. I adore 'My Neighbor Totoro' and 'Princess Mononoke'. I want spirit worlds, wondrous creatures, rich hand-drawn art, and deep themes.",
            hint1_words: ["animated fantasy", "spirit worlds"],
            hint2_words: ["hand-drawn art", "wondrous creatures deep themes"],
            correctMovieId: 20,
            options: [20, 5, 25]
        },
        {
            id: 21,
            text: "I want a claustrophobic sci-fi survival horror film. 'The Thing' and 'Jaws' are my favorite suspense films. Give me isolated crew members in deep space stalked by an terrifying extraterrestrial predator.",
            hint1_words: ["claustrophobic horror", "deep space"],
            hint2_words: ["isolated crew", "extraterrestrial predator"],
            correctMovieId: 21,
            options: [21, 2, 22]
        },
        {
            id: 22,
            text: "I want an eerie psychological horror set in a creepy location. I love 'Psycho' and 'Rosemary's Baby'. I'm looking for cabin fever isolation, gradual madness, supernatural hotel vibes, and iconic tension.",
            hint1_words: ["psychological horror", "gradual madness"],
            hint2_words: ["cabin fever isolation", "supernatural hotel vibes"],
            correctMovieId: 22,
            options: [22, 9, 14]
        },
        {
            id: 23,
            text: "I want a modern musical romance with vibrant visuals and jazz music. I loved 'Singin' in the Rain' and 'Moulin Rouge!'. Something bittersweet about pursuing artistic dreams and love in Los Angeles.",
            hint1_words: ["modern musical romance", "bittersweet"],
            hint2_words: ["vibrant visuals jazz", "pursuing artistic dreams"],
            correctMovieId: 23,
            options: [23, 24, 4]
        },
        {
            id: 24,
            text: "I'm looking for an intense, high-tension drama about relentless ambition and perfectionism. I loved 'Black Swan' and 'The Social Network'. Give me a ruthless mentor-student dynamic centered around music.",
            hint1_words: ["intense drama", "ruthless mentor-student"],
            hint2_words: ["relentless ambition", "perfectionism music"],
            correctMovieId: 24,
            options: [24, 23, 13]
        },
        {
            id: 25,
            text: "I want an innovative animated superhero movie with dynamic art styles and an incredible soundtrack. I enjoyed 'The Incredibles' and 'Big Hero 6'. Give me multiverse concepts and comic-book visual style.",
            hint1_words: ["innovative animated", "multiverse concepts"],
            hint2_words: ["comic-book visual style", "incredible soundtrack"],
            correctMovieId: 25,
            options: [25, 8, 20]
        },
        {
            id: 26,
            text: "I want a fun, charming 80s sci-fi adventure with time travel. I like 'The Goonies' and 'Ferris Bueller's Day Off'. Give me high school shenanigans, eccentric scientists, cool cars, and catchy music.",
            hint1_words: ["80s sci-fi adventure", "time travel"],
            hint2_words: ["eccentric scientists", "cool cars high school"],
            correctMovieId: 26,
            options: [26, 11, 3]
        },
        {
            id: 27,
            text: "I want a chilling serial killer crime thriller with psychological depth. I loved 'Se7en' and 'Zodiac'. Give me an intelligent FBI trainee interviewing a brilliant, manipulative incarcerated cannibal.",
            hint1_words: ["crime thriller", "psychological depth"],
            hint2_words: ["FBI trainee", "brilliant incarcerated cannibal"],
            correctMovieId: 27,
            options: [27, 9, 14]
        },
        {
            id: 28,
            text: "I'm looking for the ultimate 80s action thriller set in a single skyscraper. I like 'Lethal Weapon' and 'Speed'. Give me an everyday hero cop taking on clever thieves during Christmas time.",
            hint1_words: ["80s action thriller", "everyday hero cop"],
            hint2_words: ["single skyscraper", "clever thieves Christmas"],
            correctMovieId: 28,
            options: [28, 7, 18]
        },
        {
            id: 29,
            text: "I want a beautiful underwater animated ocean adventure for family viewing. I loved 'Toy Story' and 'Moana'. Give me father-son bond themes, colorful marine life, and memorable comedic side characters.",
            hint1_words: ["animated ocean adventure", "family viewing"],
            hint2_words: ["underwater ocean", "father-son bond marine life"],
            correctMovieId: 29,
            options: [29, 8, 5]
        },
        {
            id: 30,
            text: "I'm looking for a clever satirical drama with sci-fi elements about reality TV and privacy. I like 'Pleasantville' and 'Ex Machina'. Give me emotional depth, existential questions, and existential escape.",
            hint1_words: ["satirical drama", "reality TV and privacy"],
            hint2_words: ["existential questions", "existential escape"],
            correctMovieId: 30,
            options: [30, 10, 16]
        },
        {
            id: 31,
            text: "I need a hilarious fantasy comedy that parodies classic fairy tales. I like 'The Princess Bride'. Give me colorful ogres, talking animals, and broad humor for both kids and adults.",
            hint1_words: ["fantasy comedy", "fairy tale parody"],
            hint2_words: ["broad humor", "ogres and talking animals"],
            correctMovieId: 1,
            options: [1, 5, 8]
        },
        {
            id: 32,
            text: "I want a futuristic sci-fi film featuring simulated realities, leather trench coats, and ground-breaking bullet-time special effects. Loved 'Tron' and 'Dark City'. What do you recommend?",
            hint1_words: ["futuristic sci-fi", "simulated realities"],
            hint2_words: ["bullet-time effects", "trench coats"],
            correctMovieId: 2,
            options: [2, 16, 7]
        },
        {
            id: 33,
            text: "I'm looking for a thrill ride featuring genetically engineered creatures on an isolated tropical location. I loved 'King Kong' and 'Godzilla'. High tension, adventure, and great suspense!",
            hint1_words: ["thrill ride", "tropical location"],
            hint2_words: ["genetically engineered", "prehistoric thrill"],
            correctMovieId: 3,
            options: [3, 21, 28]
        },
        {
            id: 34,
            text: "I want a grand scale historical romance featuring class differences, grand sets, and high emotional drama at sea. Loved 'Gone with the Wind' and 'Doctor Zhivago'.",
            hint1_words: ["historical romance", "class differences"],
            hint2_words: ["grand sets at sea", "high emotional drama"],
            correctMovieId: 4,
            options: [4, 10, 23]
        },
        {
            id: 35,
            text: "I want an epic animated coming-of-age journey with majestic African wildlife settings and iconic music tracks. Loved 'Bambi' and 'Tarzan'. What fits best?",
            hint1_words: ["animated coming-of-age", "majestic settings"],
            hint2_words: ["African wildlife", "iconic music tracks"],
            correctMovieId: 5,
            options: [5, 20, 29]
        },
        {
            id: 36,
            text: "I want a gritty, nonlinear mob comedy-drama with iconic dance scenes and colorful dialogues. I enjoyed 'Goodfellas' and 'Casino'. Something very stylish from Quentin Tarantino's early filmography.",
            hint1_words: ["mob comedy-drama", "stylish crime"],
            hint2_words: ["nonlinear narrative", "iconic dance scenes"],
            correctMovieId: 6,
            options: [6, 13, 27]
        },
        {
            id: 37,
            text: "I need a high-octane 90s action sequel involving time-traveling cybernetic protectors and liquid metal assassins. Loved 'RoboCop' and 'Total Recall'.",
            hint1_words: ["90s action sequel", "cybernetic protectors"],
            hint2_words: ["liquid metal assassin", "high-octane action"],
            correctMovieId: 7,
            options: [7, 2, 28]
        },
        {
            id: 38,
            text: "I want a pioneering Pixar animated movie about rival toys becoming best friends. Loved 'Monsters Inc.' and 'A Bug's Life'. Perfect for a casual Sunday evening.",
            hint1_words: ["pioneering Pixar", "rivals becoming friends"],
            hint2_words: ["secret life of toys", "casual family viewing"],
            correctMovieId: 8,
            options: [8, 29, 25]
        },
        {
            id: 39,
            text: "Give me a creepy supernatural drama with a child who communicates with ghosts, guided by a compassionate therapist. Loved 'Unbreakable' and 'Signs'.",
            hint1_words: ["supernatural drama", "communicates with ghosts"],
            hint2_words: ["compassionate therapist", "creepy psychological"],
            correctMovieId: 9,
            options: [9, 22, 14]
        },
        {
            id: 40,
            text: "I need a wholesome, heartwarming drama following a sweet man witnessing iconic moments of 20th-century American history. Loved 'The Green Mile' and 'Cast Away'.",
            hint1_words: ["wholesome drama", "heartwarming"],
            hint2_words: ["20th-century history", "sweet protagonist"],
            correctMovieId: 10,
            options: [10, 30, 4]
        },
        {
            id: 41,
            text: "I want a sci-fi comedy about top-secret government agents policing alien activity on Earth using memory-erasing neuralyzers. Loved 'Ghostbusters' and 'Independence Day'.",
            hint1_words: ["sci-fi comedy", "policing alien activity"],
            hint2_words: ["top-secret agents", "memory-erasing tools"],
            correctMovieId: 11,
            options: [11, 26, 15]
        },
        {
            id: 42,
            text: "Looking for an epic swords-and-sandals spectacle featuring a disgraced Roman general fighting his way through the Colosseum. Loved 'Spartacus' and 'Troy'.",
            hint1_words: ["swords-and-sandals epic", "disgraced Roman general"],
            hint2_words: ["Colosseum arena battles", "revenge spectacle"],
            correctMovieId: 12,
            options: [12, 18, 7]
        },
        {
            id: 43,
            text: "I want an edgy, dark psychological thriller about bare-knuckle subterranean boxing clubs and anti-consumerist rebellion. Loved 'Seven' and 'Fight Club'-style vibes.",
            hint1_words: ["edgy psychological thriller", "anti-consumerist"],
            hint2_words: ["bare-knuckle boxing", "subterranean clubs"],
            correctMovieId: 13,
            options: [13, 6, 9]
        },
        {
            id: 44,
            text: "I'm looking for a self-aware horror movie with a masked killer targeting high schoolers via phone calls. Loved 'I Know What You Did Last Summer' and 'Urban Legend'.",
            hint1_words: ["self-aware horror", "masked killer"],
            hint2_words: ["high school phone calls", "teen slasher"],
            correctMovieId: 14,
            options: [14, 22, 21]
        },
        {
            id: 45,
            text: "I want a fun 90s crossover feature combining NBA superstars and classic Looney Tunes characters in an intergalactic basketball game. Loved 'Who Framed Roger Rabbit'.",
            hint1_words: ["90s crossover", "NBA superstars"],
            hint2_words: ["Looney Tunes characters", "intergalactic basketball"],
            correctMovieId: 15,
            options: [15, 8, 11]
        },
        {
            id: 46,
            text: "I want a Christopher Nolan sci-fi masterpiece where thieves infiltrate human subconscious minds through shared dream architecture. Loved 'Tenet' and 'Shutter Island'.",
            hint1_words: ["sci-fi masterpiece", "infiltrate subconscious"],
            hint2_words: ["shared dream architecture", "mind heist"],
            correctMovieId: 16,
            options: [16, 2, 17]
        },
        {
            id: 47,
            text: "I'm looking for a breathtaking space drama about a team searching for habitable planets near a supermassive black hole. Loved 'Gravity' and 'The Martian'.",
            hint1_words: ["space drama", "habitable planets"],
            hint2_words: ["supermassive black hole", "wormhole physics"],
            correctMovieId: 17,
            options: [17, 16, 3]
        },
        {
            id: 18,
            text: "I want a dark comic-book thriller where a vigilante detective fights a chaotic, theatrical terrorist mastermind in Gotham City. Loved 'Watchmen' and 'V for Vendetta'.",
            hint1_words: ["dark comic-book thriller", "vigilante detective"],
            hint2_words: ["chaotic theatrical terrorist", "Gotham urban conflict"],
            correctMovieId: 18,
            options: [18, 12, 13]
        },
        {
            id: 49,
            text: "I want an outrageously funny teen party comedy about high school seniors trying to buy alcohol for a wild night. Loved 'Project X' and '21 Jump Street'.",
            hint1_words: ["teen party comedy", "high school seniors"],
            hint2_words: ["wild night out", "raunchy teenage antics"],
            correctMovieId: 19,
            options: [19, 11, 15]
        },
        {
            id: 50,
            text: "I need a beautiful Studio Ghibli masterpiece about a young girl trapped in a mysterious bathhouse for spirits and gods. Loved 'Howl's Moving Castle' and 'Ponyo'.",
            hint1_words: ["Studio Ghibli masterpiece", "mysterious bathhouse"],
            hint2_words: ["spirits and gods", "young girl fantasy journey"],
            correctMovieId: 20,
            options: [20, 5, 25]
        }
    ]
};