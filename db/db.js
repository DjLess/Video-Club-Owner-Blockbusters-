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
            text: "Ugh, my kids have been screaming all day and I just had a brutal shift at work. I need a fun animated movie for family night, but honestly, I need a good laugh too. I usually like witty fairy tales or irreverent humor like 'Despicable Me'. Got anything like that?",
            hint1_words: ["family night", "fun animated movie"],
            hint2_words: ["irreverent humor", "witty fairy tales"],
            correctMovieId: 1,
            options: [1, 8, 29]
        },
        {
            id: 2,
            text: "I'm having some friends over for a tech meet-up tonight. We've been discussing AI and philosophy all week. We want a stylish 90s action movie with mind-blowing concepts about reality and great martial arts choreography. Something like 'Blade Runner' or 'Equilibrium'.",
            hint1_words: ["tech meet-up", "philosophy"],
            hint2_words: ["mind-blowing concepts", "stylish 90s action"],
            correctMovieId: 2,
            options: [2, 16, 7]
        },
        {
            id: 3,
            text: "My family is visiting from out of town and we want a big blockbusting adventure for movie night. We love 90s cinema with high stakes, practical effects, and nature taking over. Something thrilling like 'Jaws' or 'King Kong' would be awesome.",
            hint1_words: ["blockbusting adventure", "family visiting"],
            hint2_words: ["90s cinema", "nature taking over"],
            correctMovieId: 3,
            options: [3, 21, 26]
        },
        {
            id: 4,
            text: "It's my anniversary tonight and my partner and I just want to wrap up in blankets and have a good cry. We love grand, sweepingly romantic historical dramas with huge emotional stakes. We really enjoyed 'The Notebook' and 'Atonement'.",
            hint1_words: ["anniversary tonight", "have a good cry"],
            hint2_words: ["romantic historical dramas", "huge emotional stakes"],
            correctMovieId: 4,
            options: [4, 10, 23]
        },
        {
            id: 5,
            text: "I took my younger sister to the zoo today and it brought back so many childhood memories. I want an epic animated musical with amazing songs, regal drama, and deep emotional themes. Something timeless like 'Beauty and the Beast'.",
            hint1_words: ["childhood memories", "animated musical"],
            hint2_words: ["amazing songs", "regal drama"],
            correctMovieId: 5,
            options: [5, 20, 1]
        },
        {
            id: 6,
            text: "I just finished writing my screenplay and I'm looking for inspiration. I love 90s indie films with edgy dialogue, underground crime vibes, and non-linear storytelling. Big fan of Guy Ritchie and Tarantino movies.",
            hint1_words: ["edgy dialogue", "writing my screenplay"],
            hint2_words: ["underground crime vibes", "non-linear storytelling"],
            correctMovieId: 6,
            options: [6, 13, 27]
        },
        {
            id: 7,
            text: "I spent the whole day working on my car in the garage and now I just want to chill with a cold drink. Give me a high-octane 90s action movie with relentless pacing, crazy explosions, and futuristic tech. Loved 'Predator' and 'Mad Max'.",
            hint1_words: ["working on my car", "high-octane action"],
            hint2_words: ["relentless pacing", "futuristic tech"],
            correctMovieId: 7,
            options: [7, 2, 28]
        },
        {
            id: 8,
            text: "I'm babysitting my nephew and he's feeling a bit homesick. I need a warm, heartwarming 3D animated movie about friendship and imagination. Something comforting like 'A Bug's Life' or 'Monsters, Inc.'.",
            hint1_words: ["babysitting my nephew", "warm and heartwarming"],
            hint2_words: ["friendship and imagination", "3D animated"],
            correctMovieId: 8,
            options: [8, 29, 15]
        },
        {
            id: 9,
            text: "I've been reading ghost stories all week and I'm in the mood for a haunting psychological thriller. I want something quiet, eerie, and atmospheric with a twist that leaves you thinking. Loved 'The Others' and 'Shutter Island'.",
            hint1_words: ["ghost stories", "psychological thriller"],
            hint2_words: ["eerie and atmospheric", "twist ending"],
            correctMovieId: 9,
            options: [9, 22, 14]
        },
        {
            id: 10,
            text: "Honestly, I've had a really tough month and I just need a feeling of hope. I want an uplifting, life-affirming epic that follows a sweet character over many years. Something hopeful like 'Big Fish' or 'The Pursuit of Happyness'.",
            hint1_words: ["tough month", "feeling of hope"],
            hint2_words: ["uplifting life-affirming epic", "follows a sweet character"],
            correctMovieId: 10,
            options: [10, 30, 4]
        },
        {
            id: 11,
            text: "My roommate and I just want to order pizza and laugh tonight. We love sci-fi comedies from the late 90s with fun alien stuff, cool gadgets, and charismatic lead chemistry. Similar to 'Ghostbusters' or 'Evolution'.",
            hint1_words: ["order pizza and laugh", "sci-fi comedy"],
            hint2_words: ["late 90s", "cool gadgets and aliens"],
            correctMovieId: 11,
            options: [11, 26, 15]
        },
        {
            id: 12,
            text: "I just finished reading a history book on the ancient Mediterranean and now I want a huge cinematic experience. I love historical action epics with intense sword fights, honor, and betrayal. Loved 'Braveheart' and '300'.",
            hint1_words: ["history book", "cinematic experience"],
            hint2_words: ["historical action epic", "honor and betrayal"],
            correctMovieId: 12,
            options: [12, 7, 18]
        },
        {
            id: 13,
            text: "I've been working 60 hours a week in a corporate office and I'm so sick of the daily grind. I want a gritty, rebellious late-90s psychological drama that challenges modern culture. Big fan of 'Taxi Driver' and 'Nightcrawler'.",
            hint1_words: ["sick of daily grind", "rebellious"],
            hint2_words: ["late-90s psychological drama", "challenges modern culture"],
            correctMovieId: 13,
            options: [13, 6, 9]
        },
        {
            id: 14,
            text: "Hosting a Halloween party for my college dorm mates tonight! We want a fun, self-aware 90s slasher horror that makes fun of horror tropes while still being scary. We love 'I Know What You Did Last Summer' and 'Halloween'.",
            hint1_words: ["Halloween party", "fun slasher"],
            hint2_words: ["self-aware 90s horror", "makes fun of tropes"],
            correctMovieId: 14,
            options: [14, 22, 21]
        },
        {
            id: 15,
            text: "Feeling super nostalgic today after looking through my childhood bedroom. I want a goofy, fun 90s movie that mixes live-action sports with classic cartoon characters. Loved 'Who Framed Roger Rabbit' growing up.",
            hint1_words: ["super nostalgic", "goofy fun 90s"],
            hint2_words: ["mixes live-action sports", "classic cartoon characters"],
            correctMovieId: 15,
            options: [15, 8, 1]
        },
        {
            id: 16,
            text: "I had the strangest dream last night and it made me want to watch something complex. I love mind-bending sci-fi thrillers with clever heist mechanics, high stakes, and stunning visuals. Big fan of 'Tenet' and 'Source Code'.",
            hint1_words: ["strangest dream", "complex"],
            hint2_words: ["mind-bending sci-fi", "clever heist mechanics"],
            correctMovieId: 16,
            options: [16, 2, 17]
        },
        {
            id: 17,
            text: "I was stargazing in my backyard yesterday and got lost in thought. I want a sweeping, emotional sci-fi space exploration movie about humanity, time, and family bonds. Something grand like 'Contact' or '2001: A Space Odyssey'.",
            hint1_words: ["stargazing", "emotional sci-fi"],
            hint2_words: ["space exploration", "time and family bonds"],
            correctMovieId: 17,
            options: [17, 16, 3]
        },
        {
            id: 18,
            text: "I'm in the mood for a dark, grounded crime story tonight. I like superhero worlds when they feel like realistic neo-noir thrillers with complex villains and moral dilemmas. Loved 'Heat' and 'The Batman'.",
            hint1_words: ["dark crime story", "neo-noir thriller"],
            hint2_words: ["grounded superhero world", "complex villains"],
            correctMovieId: 18,
            options: [18, 12, 13]
        },
        {
            id: 19,
            text: "It's Friday night, my parents are out of town, and my friends are coming over. We want an outrageously funny, raunchy teen comedy about high school parties and awkward teenage moments. Loved 'Booksmart' and '21 Jump Street'.",
            hint1_words: ["Friday night", "raunchy teen comedy"],
            hint2_words: ["high school parties", "outrageously funny"],
            correctMovieId: 19,
            options: [19, 11, 15]
        },
        {
            id: 20,
            text: "I had a stressful week and I just want to escape into a magical, hand-drawn animated world. I love rich fantasy stories deeply connected to spirits, nature, and wonder. Loved 'My Neighbor Totoro' and 'The Red Turtle'.",
            hint1_words: ["stressful week", "magical world"],
            hint2_words: ["hand-drawn animated fantasy", "spirits and wonder"],
            correctMovieId: 20,
            options: [20, 5, 25]
        },
        {
            id: 21,
            text: "I love tense survival horror where people are trapped in tight spaces. I'm looking for a claustrophobic sci-fi suspense movie set far from Earth with an unsettling atmosphere. Loved 'The Thing' and '10 Cloverfield Lane'.",
            hint1_words: ["tense survival horror", "claustrophobic"],
            hint2_words: ["sci-fi suspense", "unsettling atmosphere far from Earth"],
            correctMovieId: 21,
            options: [21, 2, 22]
        },
        {
            id: 22,
            text: "I'm staying alone at a cabin in the woods this weekend and want to scare myself! I love classic psychological horror movies about isolation, paranoia, and slowly losing your mind. Big fan of 'Psycho' and 'Misery'.",
            hint1_words: ["staying alone at a cabin", "psychological horror"],
            hint2_words: ["isolation and paranoia", "slowly losing your mind"],
            correctMovieId: 22,
            options: [22, 9, 14]
        },
        {
            id: 23,
            text: "I recently started taking jazz piano lessons and I'm obsessed with musical films. I want a modern, bittersweet romantic drama with stunning colors, great music, and themes about pursuing your passion. Loved 'Singin' in the Rain'.",
            hint1_words: ["jazz piano lessons", "musical films"],
            hint2_words: ["modern bittersweet romance", "pursuing your passion"],
            correctMovieId: 23,
            options: [23, 24, 4]
        },
        {
            id: 24,
            text: "I used to play drums in high school band and I love intense movies about perfectionism. Give me a raw, high-tension drama about relentless ambition and a harsh mentor relationship. Loved 'The Social Network' and 'Black Swan'.",
            hint1_words: ["high school band", "high-tension drama"],
            hint2_words: ["perfectionism and ambition", "harsh mentor relationship"],
            correctMovieId: 24,
            options: [24, 23, 13]
        },
        {
            id: 25,
            text: "I'm an illustrator and I want to watch something with mind-blowing animation style and a killer urban soundtrack. I love fresh takes on comic book heroes with multiverse elements. Loved 'The Incredibles' and 'Big Hero 6'.",
            hint1_words: ["I'm an illustrator", "fresh superhero take"],
            hint2_words: ["mind-blowing animation style", "urban soundtrack"],
            correctMovieId: 25,
            options: [25, 8, 20]
        },
        {
            id: 26,
            text: "I took my dad's old 80s car for a spin today and I'm in a total retro mood. I want a charming 80s sci-fi comedy adventure with time travel, eccentric characters, and classic rock tunes. Loved 'The Goonies' and 'Ferris Bueller'.",
            hint1_words: ["retro mood", "80s sci-fi comedy"],
            hint2_words: ["time travel adventure", "eccentric characters"],
            correctMovieId: 26,
            options: [26, 11, 3]
        },
        {
            id: 27,
            text: "I'm studying forensic psychology in college and I love intense psychological crime thrillers. Give me a classic film about an investigator interviewing an extraordinarily intelligent criminal mastermind. Loved 'Se7en' and 'Zodiac'.",
            hint1_words: ["studying forensic psychology", "crime thriller"],
            hint2_words: ["investigator and criminal mastermind", "intense psychological depth"],
            correctMovieId: 27,
            options: [27, 9, 14]
        },
        {
            id: 28,
            text: "It's raining outside, I've got my couch ready, and I want pure 80s action excitement. Something about an under-prepared protagonist trapped in a tight location taking down bad guys. Loved 'Lethal Weapon' and 'Speed'.",
            hint1_words: ["raining outside", "pure 80s action"],
            hint2_words: ["under-prepared protagonist", "trapped in a tight location"],
            correctMovieId: 28,
            options: [28, 7, 18]
        },
        {
            id: 29,
            text: "My toddler is fascinated by sea life after our trip to the aquarium today! I need a colorful, wholesome animated adventure about the ocean, family, and courage. Something charming like 'Moana' or 'A Bug's Life'.",
            hint1_words: ["trip to the aquarium", "wholesome animation"],
            hint2_words: ["ocean family adventure", "colorful and charming"],
            correctMovieId: 29,
            options: [29, 8, 5]
        },
        {
            id: 30,
            text: "I was deleting my social media accounts today and thinking a lot about modern privacy. I want a clever, satirical drama with sci-fi themes about someone living under constant observation. Loved 'Ex Machina' and 'Pleasantville'.",
            hint1_words: ["deleting social media", "satirical drama"],
            hint2_words: ["constant observation", "clever sci-fi themes"],
            correctMovieId: 30,
            options: [30, 10, 16]
        },
        {
            id: 31,
            text: "I've been feeling down lately and just want a good laugh. I love lighthearted animated comedies that poke fun at classic stories while keeping things light and silly. Enjoyed 'Despicable Me' and 'Megamind'.",
            hint1_words: ["feeling down", "animated comedy"],
            hint2_words: ["pokes fun at classic stories", "lighthearted and silly"],
            correctMovieId: 1,
            options: [1, 5, 8]
        },
        {
            id: 32,
            text: "I spent my night reading tech forums on simulation theory. Now I want a stylish, groundbreaking late 90s sci-fi action film with philosophical questions and cool fights. Loved 'Equilibrium' and 'Dark City'.",
            hint1_words: ["tech forums", "simulation theory"],
            hint2_words: ["late 90s sci-fi action", "cool fights and philosophy"],
            correctMovieId: 2,
            options: [2, 16, 7]
        },
        {
            id: 33,
            text: "My son is obsessed with science and biology lately. I want an exciting, classic 90s adventure film about science going out of control in a wild location. Something thrilling like 'King Kong' or 'Jaws'.",
            hint1_words: ["biology interest", "classic 90s adventure"],
            hint2_words: ["science out of control", "wild location thrill"],
            correctMovieId: 3,
            options: [3, 21, 28]
        },
        {
            id: 34,
            text: "My partner and I are having a cozy date night at home with wine. We want a grand, sweeping romantic drama with unforgettable tragedy and historic vibes. Loved 'Atonement' and 'The Notebook'.",
            hint1_words: ["cozy date night", "romantic drama"],
            hint2_words: ["sweeping historic vibes", "unforgettable tragedy"],
            correctMovieId: 4,
            options: [4, 10, 23]
        },
        {
            id: 35,
            text: "I'm feeling nostalgic for the movies I watched on VHS as a kid. I want an epic animated musical with wild kingdom themes, great songs, and emotional growth. Loved 'Tarzan' and 'Aladdin'.",
            hint1_words: ["nostalgic VHS", "animated musical"],
            hint2_words: ["wild kingdom themes", "emotional growth and songs"],
            correctMovieId: 5,
            options: [5, 20, 29]
        },
        {
            id: 36,
            text: "I'm chilling with my college friends and we want a cool 90s crime movie with sharp banter, quirky characters, and non-linear chapters. Something iconic like 'Snatch' or 'Reservoir Dogs'.",
            hint1_words: ["chilling with friends", "cool 90s crime"],
            hint2_words: ["sharp banter and quirky characters", "non-linear chapters"],
            correctMovieId: 6,
            options: [6, 13, 27]
        },
        {
            id: 37,
            text: "Just got back from a workout and I'm pumped up! I want a relentless, action-packed 90s sci-fi movie with awesome special effects and unstoppable threats. Big fan of 'RoboCop' and 'Total Recall'.",
            hint1_words: ["pumped after workout", "action-packed sci-fi"],
            hint2_words: ["relentless 90s style", "unstoppable threats"],
            correctMovieId: 7,
            options: [7, 2, 28]
        },
        {
            id: 38,
            text: "Looking for a heartwarming film for a family gathering tonight. Something animated that appeals to both kids and adults, with themes of loyalty, growing up, and imagination. Loved 'Monsters Inc.'.",
            hint1_words: ["family gathering", "heartwarming animated"],
            hint2_words: ["appeals to kids and adults", "loyalty and imagination"],
            correctMovieId: 8,
            options: [8, 29, 25]
        },
        {
            id: 39,
            text: "I love movies that keep you guessing until the very last minute. Looking for a quiet, supernatural mystery drama with emotional depth and an unforgettable twist. Loved 'The Others' and 'Unbreakable'.",
            hint1_words: ["keep you guessing", "supernatural mystery"],
            hint2_words: ["emotional depth", "unforgettable twist"],
            correctMovieId: 9,
            options: [9, 22, 14]
        },
        {
            id: 40,
            text: "I need a comforting, life-affirming movie after a long week. Something epic in scale that follows an innocent protagonist through different eras of life. Loved 'Cast Away' and 'The Truman Show'.",
            hint1_words: ["comforting life-affirming", "long week"],
            hint2_words: ["innocent protagonist", "spans different eras"],
            correctMovieId: 10,
            options: [10, 30, 4]
        },
        {
            id: 41,
            text: "My brother and I want a fast-paced sci-fi comedy for movie night. We love 90s blockbusters with funny leads, crazy creatures, and secret agency vibes. Big fans of 'Ghostbusters' and 'Men in Black'.",
            hint1_words: ["fast-paced sci-fi comedy", "movie night"],
            hint2_words: ["funny leads and creatures", "secret agency vibes"],
            correctMovieId: 11,
            options: [11, 26, 15]
        },
        {
            id: 42,
            text: "I've been visiting historical museums lately and I'm in the mood for a massive action epic set in ancient times. Something about vengeance, destiny, and epic battles. Loved '300' and 'Braveheart'.",
            hint1_words: ["historical museums", "ancient action epic"],
            hint2_words: ["vengeance and destiny", "epic battles"],
            correctMovieId: 12,
            options: [12, 18, 7]
        },
        {
            id: 43,
            text: "I'm feeling really stressed about my office routine and want something dark and anti-establishment. A psychological drama about underground subcultures and mental breakdowns. Loved 'Nightcrawler' and 'Taxi Driver'.",
            hint1_words: ["stressed about routine", "dark anti-establishment"],
            hint2_words: ["underground subcultures", "psychological breakdown"],
            correctMovieId: 13,
            options: [13, 6, 9]
        },
        {
            id: 44,
            text: "Having a movie night with my roommates and we want a thrilling, self-referential horror film from the 90s. Something with high school drama and suspenseful scares. Loved 'Halloween' and 'Urban Legend'.",
            hint1_words: ["roommates movie night", "self-referential horror"],
            hint2_words: ["90s high school drama", "suspenseful scares"],
            correctMovieId: 14,
            options: [14, 22, 21]
        },
        {
            id: 45,
            text: "I'm looking for a fun 90s movie for my younger cousins. Something that combines real-life sports stars with hilarious cartoon antics. They loved 'Who Framed Roger Rabbit' when I showed it to them.",
            hint1_words: ["for younger cousins", "fun 90s movie"],
            hint2_words: ["sports stars and cartoons", "hilarious antics"],
            correctMovieId: 15,
            options: [15, 8, 11]
        },
        {
            id: 46,
            text: "I'm fascinated by psychology and subconscious thoughts. I want an intense sci-fi thriller with intricate plotting, heist elements, and amazing visual concepts. Loved 'Shutter Island' and 'Tenet'.",
            hint1_words: ["psychology and subconscious", "sci-fi thriller"],
            hint2_words: ["intricate plotting", "heist and visual concepts"],
            correctMovieId: 16,
            options: [16, 2, 17]
        },
        {
            id: 47,
            text: "I spent the night watching space documentaries and now I want a sweeping cinematic experience. A sci-fi drama about human survival, deep space travel, and emotional connections. Loved 'Gravity' and 'The Martian'.",
            hint1_words: ["space documentaries", "sweeping cinematic"],
            hint2_words: ["sci-fi survival and travel", "deep emotional connections"],
            correctMovieId: 17,
            options: [17, 16, 3]
        },
        {
            id: 48,
            text: "I love gritty urban thrillers with strong central conflicts between law and chaos. Something intense and dark set in a atmospheric city. Loved 'Heat' and 'Zodiac'.",
            hint1_words: ["gritty urban thriller", "law and chaos"],
            hint2_words: ["intense and dark", "atmospheric city setting"],
            correctMovieId: 18,
            options: [18, 12, 13]
        },
        {
            id: 49,
            text: "Just graduated high school and my friends are having a celebration party! We want a super funny, wild teen comedy about friendship and chaotic party nights. Loved 'Superbad'-style humor and 'Project X'.",
            hint1_words: ["graduated high school", "celebration party"],
            hint2_words: ["wild teen comedy", "chaotic party nights"],
            correctMovieId: 19,
            options: [19, 11, 15]
        },
        {
            id: 50,
            text: "I went to an art gallery exhibition today and felt so inspired. I want a mesmerizing animated fantasy with rich folklore, beautiful scenery, and deep emotional themes. Loved 'Howl's Moving Castle' and 'Ponyo'.",
            hint1_words: ["art gallery exhibition", "mesmerizing animated fantasy"],
            hint2_words: ["rich folklore", "beautiful scenery and emotion"],
            correctMovieId: 20,
            options: [20, 5, 25]
        }
    ]
};