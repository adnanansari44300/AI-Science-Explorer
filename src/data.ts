import { Lesson, Experiment, QuizQuestion, DictionaryTerm, ScienceFact, Achievement } from "./types";

export const LESSONS: Lesson[] = [
  // --- GRADE 5 ---
  {
    id: "g5-plants",
    grade: "5",
    subject: "Plants",
    title: "How Plants Feed the Planet",
    definition: "Photosynthesis is the process by which green plants use sunlight to turn water and carbon dioxide into simple sugars (food), releasing oxygen in the process.",
    explanation: "Imagine plants as miniature, solar-powered kitchens. Unlike animals that have to eat food, plants manufacture their own! Using green pigment called chlorophyll (which sits inside structures called chloroplasts), they capture sunlight. They take water from the soil through their roots and breathe in carbon dioxide from the tiny pores under their leaves called stomata. Using the sun's energy, they split these ingredients and cook them into glucose (sugar) which is plant fuel. The leftovers of this cooking show? Fresh Oxygen, which is breathed out into our atmosphere!",
    examples: [
      "Placing a green leaf under sunlight in a bowl of water will show tiny bubbles forming on it. Those bubbles are oxygen being exhaled by the plant!",
      "A houseplant placed in a dark cupboard will start looking pale and yellow because it can't capture sunlight to produce chlorophyll."
    ],
    illustrationType: "plants",
    keyTerms: [
      { term: "Chlorophyll", definition: "The green pigment in plant leaves that absorbs sunlight energy." },
      { term: "Stomata", definition: "Tiny mouth-like openings on the underside of leaves used for gas exchange." },
      { term: "Glucose", definition: "A type of simple sugar created by plants during photosynthesis to store energy." }
    ],
    funFacts: [
      "The Amazon Rainforest produces about 20% of the entire Earth's oxygen, which is why it is called the 'Lungs of the Earth'!",
      "Some plants like Venus Flytraps eat bugs not for sugar, but to get special soil nutrients they can't make themselves!"
    ],
    commonMistakes: [
      "Thinking plants only perform photosynthesis. Actually, plants also breathe (respire) day and night, taking in a little oxygen too!",
      "Believing water is absorbed through leaves. Water is mostly drawn up from the roots and travels up the stem."
    ],
    revisionNotes: [
      "Recipe for Photosynthesis: Sunlight + Water + Carbon Dioxide ➔ Glucose + Oxygen.",
      "Leaves are green because chlorophyll absorbs blue and red wavelengths but reflects green light.",
      "Glucose is stored as starch inside roots and stems for times when there is no sun."
    ],
    practiceQuestions: [
      {
        question: "What is the green pigment in leaves that traps sunlight?",
        options: ["Carotene", "Chlorophyll", "Stomata", "Sap"],
        answer: "B",
        explanation: "Chlorophyll is the green pigment that absorbs light energy necessary for photosynthesis."
      },
      {
        question: "Which of these is a byproduct of photosynthesis that animals breathe?",
        options: ["Carbon Dioxide", "Hydrogen", "Oxygen", "Nitrogen"],
        answer: "C",
        explanation: "Plants release oxygen as a waste product, which is vital for the survival of animals."
      }
    ]
  },
  {
    id: "g5-solarsystem",
    grade: "5",
    subject: "Solar System",
    title: "Our Galactic Neighborhood",
    definition: "The Solar System is a gravitationally bound system consisting of the Sun and the objects that orbit it, including eight planets, dwarf planets, moons, and asteroids.",
    explanation: "Our solar system is like a cosmic merry-go-round! At the very center is the Sun, a massive star so heavy that its powerful gravitational pull holds all eight planets, dwarf planets, and millions of space rocks in orbits around it. The planets are split into two groups: the inner rocky planets (Mercury, Venus, Earth, Mars) and the outer gas giants (Jupiter, Saturn, Uranus, Neptune). Jupiter is the largest planet—so huge that all other planets could fit inside it! The Sun holds 99.8% of all the matter in the entire solar system.",
    examples: [
      "Gravity holds you on Earth just like the Sun's gravity holds the Earth from flying away into dark, cold deep space.",
      "Venus is often called Earth's twin because of its similar size, but its thick greenhouse-gas atmosphere makes it hot enough to melt lead!"
    ],
    illustrationType: "space",
    keyTerms: [
      { term: "Gravity", definition: "The invisible pulling force that pulls objects toward one another." },
      { term: "Orbit", definition: "The curved path of a celestial object or spacecraft around a star, planet, or moon." },
      { term: "Asteroid", definition: "Small, rocky objects orbiting the Sun, mostly found between Mars and Jupiter." }
    ],
    funFacts: [
      "One year on Mercury takes only 88 Earth days, but a single day-night cycle takes 176 Earth days! Talk about a long school day!",
      "Saturn's rings are not solid; they are made of billions of pieces of ice, dust, and rock, ranging from tiny specks to mountain-sized chunks!"
    ],
    commonMistakes: [
      "Thinking the Sun is the biggest star in the universe. It is actually just an average-sized yellow dwarf star!",
      "Assuming Venus is the coldest planet because it isn't closest to the Sun. Venus is actually the hottest planet due to its extreme greenhouse effect."
    ],
    revisionNotes: [
      "Eight Planets order from Sun: My Very Easy Method Just Speeds Up Naming (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).",
      "Rocky planets are close to the Sun; gas/ice giants are further away.",
      "Pluto was reclassified as a dwarf planet in 2006 because it hasn't cleared its orbit."
    ],
    practiceQuestions: [
      {
        question: "Which planet is known as the 'Red Planet' due to iron-oxide (rust) on its surface?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        answer: "C",
        explanation: "Mars is covered in iron-rich dust, giving it a rusty, reddish hue."
      }
    ]
  },
  {
    id: "g5-humanbody",
    grade: "5",
    subject: "Human Body",
    title: "The Masterwork Inside You: Body Systems",
    definition: "An organ system is a group of organs that work together to perform vital life functions, such as digesting food, circulating blood, and supporting the skeleton.",
    explanation: "Your body is like a highly organized, bustling city! To keep it running smoothly, there are several dedicated 'departments' called organ systems. The Skeletal System is the city's concrete framework, using 206 bones to hold you up and protect organs. The Circulatory System is the delivery highway, with the heart pumping oxygen-rich blood through thousands of miles of vessels. The Respiratory System acts as the ventilation system, where your lungs exchange oxygen and carbon dioxide. The Digestive System is the city power plant, turning food into fuel by breaking it down from the stomach to the intestines! All these systems talk to each other to keep you alive.",
    examples: [
      "When you exercise, your muscles need more oxygen. Your brain tells your heart to pump faster and your lungs to breathe deeper to deliver it!",
      "Your ribs act like a built-in metal cage, protecting your delicate heart and lungs from bumps and falls."
    ],
    illustrationType: "human",
    keyTerms: [
      { term: "Organ System", definition: "A group of organs working together to perform specific complex functions." },
      { term: "Capillaries", definition: "Microscopic blood vessels where oxygen and nutrients pass from blood into body cells." },
      { term: "Joint", definition: "A place in the body where two bones connect, allowing movement." }
    ],
    funFacts: [
      "You are born with about 300 bones, but as you grow, many bones fuse together, leaving you with exactly 206 bones as an adult!",
      "Your heart beats about 100,000 times a day, pumping enough blood over a lifetime to fill three supertankers!"
    ],
    commonMistakes: [
      "Thinking bones are dead, dry, and rock-like. Bones are living tissues that grow, have their own blood vessels, and make blood cells inside their marrow!",
      "Believing digestion starts in the stomach. Digestion actually starts in the mouth, where saliva begins chemically breaking down food."
    ],
    revisionNotes: [
      "Key systems: Skeletal (support), Muscular (movement), Circulatory (transport), Respiratory (gas exchange), Digestive (nutrients).",
      "Red blood cells carry oxygen; white blood cells fight infections.",
      "Involuntary muscles (like the heart) work automatically, while voluntary muscles (skeletal) move on command."
    ],
    practiceQuestions: [
      {
        question: "Where does the process of digestion officially begin?",
        options: ["Stomach", "Mouth", "Small Intestine", "Esophagus"],
        answer: "B",
        explanation: "Digestion starts in the mouth with chewing and enzymes in saliva."
      }
    ]
  },
  {
    id: "g5-ecosystems",
    grade: "5",
    subject: "Ecosystems",
    title: "The Web of Life: Ecosystems & Food Chains",
    definition: "An ecosystem is a biological community of interacting organisms (living) and their physical environment (non-living), connected through food chains and energy transfers.",
    explanation: "No organism lives in isolation. An ecosystem is like a giant, cooperative community game. It is divided into Biotic parts (living things like trees, rabbits, and bacteria) and Abiotic parts (non-living things like sunshine, soil, air, and water). Energy flows through this system starting from the Sun. Producers (plants) trap solar energy. Primary Consumers (herbivores like caterpillars) eat plants, while Secondary Consumers (carnivores like frogs) eat herbivores. Finally, Decomposers (mushrooms and bacteria) clean up dead plants and animals, recycling nutrients back into the soil so plants can grow again. It's the circle of life!",
    examples: [
      "A single puddle can be a miniature ecosystem, containing water, pebbles, algae, insect larvae, and microscopic amoebas interacting.",
      "If you remove a top predator like wolves from a forest, deer will overpopulate and eat all the plants, causing the soil to wash away."
    ],
    illustrationType: "ecosystem",
    keyTerms: [
      { term: "Producer", definition: "An organism that makes its own food using energy from the sun (usually plants)." },
      { term: "Consumer", definition: "An organism that obtains energy by feeding on other living things." },
      { term: "Decomposer", definition: "An organism that breaks down dead organic matter and returns nutrients to the soil." }
    ],
    funFacts: [
      "Mushrooms may look like plants, but they are decomposers! They are more closely related to animals than plants.",
      "Only about 10% of the energy is passed from one level of a food chain to the next; the rest is lost as heat!"
    ],
    commonMistakes: [
      "Assuming a food chain is separate from other chains. In reality, food chains overlap to form complex, interconnected food webs.",
      "Thinking decomposers are bad or dirty. Without decomposers, dead leaves and logs would pile up hundreds of feet high!"
    ],
    revisionNotes: [
      "Ecosystem = Biotic (living) + Abiotic (non-living).",
      "Energy flows in one direction: Sun ➔ Producers ➔ Herbivores ➔ Carnivores ➔ Decomposers.",
      "Predator-prey relationships help maintain a healthy population balance."
    ],
    practiceQuestions: [
      {
        question: "Which of the following is an abiotic (non-living) factor in an ecosystem?",
        options: ["Fungus", "Earthworm", "Sunlight", "Oak tree"],
        answer: "C",
        explanation: "Sunlight is an abiotic factor because it is a non-living physical resource essential for ecosystems."
      }
    ]
  },
  {
    id: "g5-matter",
    grade: "5",
    subject: "States of Matter",
    title: "States of Matter & Physical Changes",
    definition: "Matter is anything that has mass and takes up space. It exists primarily in three states: solid, liquid, and gas, which can change due to temperature.",
    explanation: "Everything around you—your desk, juice, and even the air you breathe—is made of matter! The difference between them is how their tiny particles behave. In a Solid (like ice), particles are packed tightly together and only vibrate in place, giving solids a fixed shape. In a Liquid (like water), particles have enough energy to slide past each other, allowing liquids to flow and take the shape of their container. In a Gas (like steam), particles are hyperactive, zooming around in all directions. Adding or removing heat (thermal energy) causes matter to change states, which is a physical change because the chemical makeup stays the same!",
    examples: [
      "Heating solid ice turns it into liquid water (melting), and further heating turns it into gas (vaporization/boiling).",
      "When a cold glass of soda sweats on a hot day, gas in the air cools down on the glass surface and turns back into liquid (condensation)."
    ],
    illustrationType: "matter",
    keyTerms: [
      { term: "Matter", definition: "Anything that has mass (weight) and volume (occupies space)." },
      { term: "Evaporation", definition: "The process of a liquid turning into a gas at its surface, usually below its boiling point." },
      { term: "Sublimation", definition: "A rare phase change where a solid turns directly into a gas without becoming a liquid first (like dry ice)." }
    ],
    funFacts: [
      "There is a fourth state of matter called Plasma! It is super-heated gas found in stars, lightning bolts, and neon signs.",
      "Water is the only natural substance on Earth that exists abundantly in all three states (solid, liquid, and gas) naturally!"
    ],
    commonMistakes: [
      "Thinking gases have no mass or weight. Gases are made of atoms and absolutely have mass, which is why air-filled balloons sink if they are heavy!",
      "Believing a state change is a chemical change. Ice, water, and steam are all chemically identical (H2O); only the physical arrangement changes."
    ],
    revisionNotes: [
      "Solids: Fixed shape & volume. Liquids: Fixed volume, flexible shape. Gases: Flexible shape & volume.",
      "Phase changes: Melting (Solid➔Liquid), Freezing (Liquid➔Solid), Vaporization (Liquid➔Gas), Condensation (Gas➔Liquid).",
      "Temperature is a measure of how fast the particles inside matter are moving."
    ],
    practiceQuestions: [
      {
        question: "What state of matter has a definite volume but takes the shape of its container?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        answer: "B",
        explanation: "Liquids have a constant volume but adapt their shape to fit whatever vessel they are in."
      }
    ]
  },

  // --- GRADE 6 ---
  {
    id: "g6-cells",
    grade: "6",
    subject: "Cells",
    title: "Cells: The Building Blocks of Life",
    definition: "A cell is the smallest structural and functional unit of an organism, containing cytoplasm, genetic material, and various organelles enclosed within a membrane.",
    explanation: "Think of your body as a massive LEGO castle. If you zoom in close enough, you will find that the entire castle is built out of trillions of tiny, individual bricks. In living things, those bricks are called cells! Every plant, animal, and tiny bacteria is made of cells. Inside animal and plant cells, there are tiny structures called organelles (which means 'little organs') that have specific jobs. The Nucleus is the brain of the cell, telling it what to do. The Mitochondria are the powerhouses, turning food into energy. Plant cells also have tough outer Cell Walls and chloroplasts for photosynthesis, which animal cells do not have!",
    examples: [
      "If you peel a thin layer of onion skin and look at it under a microscope, you'll see a neat grid pattern of tiny boxes. Those are plant cells!",
      "Our skin cells shed constantly; you lose about 30,000 to 40,000 dead skin cells every single minute as fresh cells underneath grow to replace them."
    ],
    illustrationType: "cells",
    keyTerms: [
      { term: "Organelle", definition: "A tiny specialized structure within a cell that performs a specific function." },
      { term: "Nucleus", definition: "The central organelle that contains DNA and controls cell activities." },
      { term: "Mitochondria", definition: "The organelle responsible for respiration and generating cellular energy." }
    ],
    funFacts: [
      "The largest single cell in the world is an ostrich egg! It is a single cell weighing about 3 pounds.",
      "There are more bacterial cells living inside and on your body than there are human cells in your entire frame!"
    ],
    commonMistakes: [
      "Assuming plant and animal cells are identical. Plant cells have cell walls and chloroplasts; animal cells have neither.",
      "Thinking cells are flat. Cells are 3D structures with depth, just like tiny gelatin capsules."
    ],
    revisionNotes: [
      "Cells ➔ Tissues ➔ Organs ➔ Organ Systems ➔ Organisms.",
      "The Cell Membrane is like a picky security guard—it lets good nutrients in and keeps harmful things out.",
      "Vacuoles store water; plant cells have one giant vacuole to keep them upright, whereas animal cells have tiny, temporary ones."
    ],
    practiceQuestions: [
      {
        question: "Which of the following is ONLY found in plant cells, not animal cells?",
        options: ["Nucleus", "Cell Wall", "Mitochondria", "Cell Membrane"],
        answer: "B",
        explanation: "Cell walls provide structural support and are found in plants, fungi, and some bacteria, but never animals."
      }
    ]
  },
  {
    id: "g6-electricity",
    grade: "6",
    subject: "Electricity",
    title: "Electricity: Flow of Electrons",
    definition: "Electricity is the presence and flow of electric charge, usually electrons moving through a conductor like a metal wire.",
    explanation: "Electricity is like water flowing through pipes, but instead of water, it is a stream of tiny, invisible subatomic particles called electrons! These electrons live inside copper or metal wires. When you flip a switch, a power source (like a battery or generator) pushes these electrons, causing them to flow in a closed loop called an electrical circuit. If the loop is broken or has a gap (open circuit), the flow stops immediately! Conductors (like copper and silver) let electrons flow easily, while Insulators (like rubber, wood, and plastic) block them, keeping us safe from shocks.",
    examples: [
      "Rubbing a plastic balloon on your hair pulls electrons off your hair onto the balloon, creating static electricity that lets the balloon stick to the wall!",
      "Metal wires are covered in colorful rubber sleeves. The metal inside conducts the power, while the rubber acts as an insulator so you don't get zapped."
    ],
    illustrationType: "electricity",
    keyTerms: [
      { term: "Conductor", definition: "A material that allows electrical current to flow through it easily." },
      { term: "Insulator", definition: "A material that resists the flow of electric current and does not conduct electricity." },
      { term: "Circuit", definition: "A complete, closed path through which electric current can flow." }
    ],
    funFacts: [
      "Electric eels can generate a shock of up to 600 volts—enough to stun a horse! They use it for hunting and self-defense.",
      "A single bolt of lightning contains enough energy to power a 100-watt light bulb for more than 2 months!"
    ],
    commonMistakes: [
      "Believing batteries contain electricity. Batteries actually store chemical energy, which converts into electrical energy when connected to a circuit.",
      "Assuming pure water conducts electricity. Pure water is actually an insulator! It is the dissolved minerals and salts in tap water that conduct it."
    ],
    revisionNotes: [
      "A working circuit needs: 1) Power source (battery), 2) Conductor (wires), 3) Load (lightbulb), 4) Closed path.",
      "Current is measured in Amperes; voltage is the pushing pressure measured in Volts.",
      "Switches work by intentionally breaking or completing the circuit loop."
    ],
    practiceQuestions: [
      {
        question: "Which material is the best electrical conductor?",
        options: ["Plastic", "Copper", "Wood", "Glass"],
        answer: "B",
        explanation: "Copper has highly mobile electrons, making it an excellent and widely used conductor of electricity."
      }
    ]
  },
  {
    id: "g6-forces",
    grade: "6",
    subject: "Forces & Motion",
    title: "Forces, Friction, and Newton's Laws",
    definition: "A force is a push or pull acting on an object resulting from its interaction with another object. Forces change speed, direction, or shape.",
    explanation: "Nothing in the universe moves without a force! A force is simply a push or a pull. There are Contact Forces, like friction when you slide a box, and Non-contact Forces, like gravity pulling an apple down or magnetic fields. Sir Isaac Newton figured out how forces control the universe with his Three Laws of Motion. He showed that objects are lazy (Inertia): they keep doing what they are doing unless a force hits them. He also proved that heavier things need more force to accelerate, and that for every active push, there is an equal and opposite push back!",
    examples: [
      "A soccer ball sits on the grass until you kick it. Your foot provides the unbalanced force that overcomes its laziness (inertia)!",
      "Rubbing two hands together fast makes them warm. That heat is caused by friction, a force that opposes motion between sliding surfaces."
    ],
    illustrationType: "force",
    keyTerms: [
      { term: "Friction", definition: "A force that resists the sliding or rolling of one solid object over another." },
      { term: "Inertia", definition: "The resistance of any physical object to any change in its velocity or state of rest." },
      { term: "Balanced Forces", definition: "Equal forces acting on an object in opposite directions, resulting in zero movement change." }
    ],
    funFacts: [
      "Space is a near-perfect vacuum with no friction. If you throw a baseball in deep space, it will fly forever in a straight line until it hits a star or planet!",
      "Friction is what allows us to walk! Without friction, we would slip around like we're on a wet ice rink all day."
    ],
    commonMistakes: [
      "Thinking an object moving at a constant speed must have a force pushing it. No! Constant speed in a straight line means all forces are balanced.",
      "Confusing mass and weight. Mass is how much matter you are made of; weight is gravity pulling on that mass. You would weigh 1/6th on the Moon, but your mass is the same!"
    ],
    revisionNotes: [
      "Force = Mass × Acceleration (Newton's Second Law). Unit of force is the Newton (N).",
      "Friction always acts in the opposite direction of motion.",
      "Gravity pulls all objects toward the center of the Earth at the same acceleration rate, regardless of weight, if we ignore air resistance."
    ],
    practiceQuestions: [
      {
        question: "What unit of measurement is used for force?",
        options: ["Gram", "Joule", "Newton", "Volt"],
        answer: "C",
        explanation: "Forces are measured in Newtons (N), named in honor of Sir Isaac Newton."
      }
    ]
  },
  {
    id: "g6-watercycle",
    grade: "6",
    subject: "Earth & Weather",
    title: "The Water Cycle & Earth's Atmosphere",
    definition: "The water cycle is the continuous, natural movement of water on, above, and below the surface of the Earth, driven by solar energy.",
    explanation: "Every drop of water you drink might have been sipped by a T-Rex 100 million years ago! That's because Earth's water is recycled constantly in the Water Cycle. Driven by the heat of the Sun, water in oceans and lakes evaporates, turning from liquid into invisible water vapor gas. As this warm vapor rises, it cools and condenses into millions of tiny water droplets, forming clouds. When these droplets get too heavy, they fall back to the ground as precipitation (rain, snow, or hail). This water then runs into rivers, soaks into the soil, or flows back to the oceans, resetting the loop!",
    examples: [
      "The steam rising from a hot bowl of soup is evaporation in action inside your kitchen.",
      "A fogged-up mirror after a hot shower is condensation, where hot water vapor gas cools down and converts back to liquid water on the cold glass."
    ],
    illustrationType: "weather",
    keyTerms: [
      { term: "Evaporation", definition: "The chemical transition of liquid water into water vapor gas, driven by heat." },
      { term: "Condensation", definition: "The conversion of water vapor gas back into liquid droplets when cooled." },
      { term: "Precipitation", definition: "Rain, snow, sleet, or hail that falls from clouds back to Earth's surface." }
    ],
    funFacts: [
      "More water is stored underground in aquifers than in all the rivers and lakes on Earth combined!",
      "The atmosphere holds about 37.5 million-billion gallons of water as vapor, which is enough to flood the entire planet with 1 inch of water if it all rained at once!"
    ],
    commonMistakes: [
      "Thinking clouds are made of gas. No! Water vapor is invisible. Clouds are made of visible, tiny liquid water droplets or solid ice crystals floating in the sky.",
      "Believing the water cycle is a simple circle. It is actually a complex web with water soaking into plants, staying frozen in glaciers, or sitting in groundwater for centuries."
    ],
    revisionNotes: [
      "Four main stages: Evaporation, Transpiration (plants breathing out moisture), Condensation, and Precipitation.",
      "The Sun is the engine that drives the entire water cycle.",
      "Humidity is a measure of how much water vapor gas is packed into the air."
    ],
    practiceQuestions: [
      {
        question: "What is the process called when plants release water vapor through their leaves?",
        options: ["Respiration", "Transpiration", "Sublimation", "Infiltration"],
        answer: "B",
        explanation: "Transpiration is the process where plants absorb water from soil and release it as vapor through stomata."
      }
    ]
  },
  {
    id: "g6-animals",
    grade: "6",
    subject: "Diversity of Life",
    title: "Classification of Living Organisms",
    definition: "Taxonomy is the science of naming, describing, and classifying organisms into groups based on shared characteristics.",
    explanation: "If you had a library with millions of books dumped in a giant pile, you'd never find anything. To make sense of the wild variety of life, scientists organize all living things into classified groups. This system starts with broad Kingdoms (like Plants, Animals, and Fungi) and narrows down to species. The Animal Kingdom is split into Vertebrates (animals with backbones, like birds, fish, and humans) and Invertebrates (animals without backbones, like insects, jellyfish, and worms). Vertebrates are further divided into five famous classes: Mammals, Birds, Reptiles, Amphibians, and Fish.",
    examples: [
      "A dolphin looks like a fish, but it is a mammal because it breathes air with lungs, is warm-blooded, and feeds milk to its babies.",
      "An octopus has no bones at all, making it a highly advanced invertebrate belonging to the mollusk group."
    ],
    illustrationType: "animals",
    keyTerms: [
      { term: "Vertebrate", definition: "An animal that possesses a spinal cord enclosed in a backbone." },
      { term: "Invertebrate", definition: "An animal that lacks a backbone or skeleton, representing 95% of animal species." },
      { term: "Taxonomy", definition: "The scientific classification and naming of organisms." }
    ],
    funFacts: [
      "Invertebrates represent over 95% of all animal species on Earth! Humans and other vertebrates are in the tiny minority.",
      "Mushrooms used to be classified as plants, but scientists discovered they cannot photosynthesize, so they got their own Kingdom: Fungi!"
    ],
    commonMistakes: [
      "Thinking all warm-blooded animals are mammals. Birds are also warm-blooded, but they lay eggs and have feathers instead of fur!",
      "Assuming spiders are insects. Spiders are arachnids; they have 8 legs and 2 body segments, whereas insects have 6 legs and 3 segments."
    ],
    revisionNotes: [
      "Organisms are classified into five major Kingdoms: Animals, Plants, Fungi, Protists, and Bacteria.",
      "Vertebrate Groups: Mammals (milk/hair), Birds (feathers), Reptiles (scales), Amphibians (moist skin), Fish (gills).",
      "Scientific names use Binomial Nomenclature: Genus and Species (e.g., Homo sapiens)."
    ],
    practiceQuestions: [
      {
        question: "Which animal class is warm-blooded, has feathers, and lays hard-shelled eggs?",
        options: ["Mammals", "Reptiles", "Birds", "Amphibians"],
        answer: "C",
        explanation: "Birds are unique warm-blooded vertebrates with feathers and wings that lay hard-shelled eggs."
      }
    ]
  },

  // --- GRADE 7 ---
  {
    id: "g7-atoms",
    grade: "7",
    subject: "Atoms",
    title: "Atoms: The Ultimate Legos",
    definition: "An atom is the basic unit of a chemical element, consisting of a central nucleus (protons and neutrons) orbited by tiny electrons.",
    explanation: "Have you ever wondered what you, your computer, a banana, and the air around you are made of? If you keep chopping any object in half, eventually you will reach a point where you cannot chop it anymore. That ultimate, tiny piece is an atom! Atoms are so mind-bogglingly small that millions of them can fit on the head of a pin. Each atom has a dense nucleus at its center made of Protons (which have positive charges) and Neutrons (which have no charge). Buzzing around this nucleus at nearly the speed of light are tiny Electrons (which have negative charges), moving in orbital shells like hyperactive bees!",
    examples: [
      "Water is made of two Hydrogen atoms bonded to one Oxygen atom (H2O), like a Mickey Mouse head with ears!",
      "Helium gas in party balloons is made of light, independent helium atoms that are lighter than the heavy nitrogen and oxygen molecules in our air."
    ],
    illustrationType: "atoms",
    keyTerms: [
      { term: "Proton", definition: "A positively charged subatomic particle located in the nucleus of an atom." },
      { term: "Neutron", definition: "A neutral subatomic particle with no charge, located in the nucleus." },
      { term: "Electron", definition: "An extremely tiny, negatively charged particle that orbits the nucleus of an atom." }
    ],
    funFacts: [
      "An atom is mostly empty space! If you made the nucleus of an atom the size of a marble on a baseball field, the electrons would be like tiny gnats orbiting in the far-out nosebleed seats!",
      "Over 99.9% of your body's mass is in the nuclei of your atoms. If you removed all the empty space from every atom in the human race, the entire population of Earth could fit into a single sugar cube!"
    ],
    commonMistakes: [
      "Thinking protons and electrons have the same mass. Protons are actually about 1,836 times heavier than electrons!",
      "Believing atoms are static. Atoms and molecules are always vibrating and moving, even in solid ice!"
    ],
    revisionNotes: [
      "The atomic number of an element equals the number of protons in its nucleus.",
      "Opposite charges attract (protons attract electrons); like charges repel.",
      "Atoms join together to form molecules via chemical bonds."
    ],
    practiceQuestions: [
      {
        question: "What subatomic particle carries a negative electric charge?",
        options: ["Proton", "Neutron", "Electron", "Nucleus"],
        answer: "C",
        explanation: "Electrons carry a negative charge and orbit the positive nucleus of the atom."
      }
    ]
  },
  {
    id: "g7-elements",
    grade: "7",
    subject: "Elements & Compounds",
    title: "Elements, Compounds, and Mixtures",
    definition: "An element is a pure substance made of one atom type; a compound is chemically bonded different atoms; a mixture is physically combined substances.",
    explanation: "Let's visit the chemistry kitchen! Elements are the pure raw ingredients (like Gold, Carbon, or Oxygen)—each made of only one type of atom. Compounds are like baked cakes: different elements chemically fused together in exact recipes (like water, H2O). You cannot separate a compound without a chemical reaction. Mixtures are like fruit salads: different items thrown together physically (like sand and iron filings). In mixtures, the ingredients retain their original properties and can be easily separated using physical tricks like magnets, filters, or boiling!",
    examples: [
      "Pure gold foil is an element. Carbon dioxide gas is a compound (carbon + oxygen). Salt water is a mixture because you can boil the water away to get salt back.",
      "Air is a physical mixture of separate gases: Nitrogen, Oxygen, Carbon Dioxide, and Argon."
    ],
    illustrationType: "matter",
    keyTerms: [
      { term: "Compound", definition: "A substance formed when two or more chemical elements are chemically bonded together." },
      { term: "Mixture", definition: "A material made up of two or more different substances which are physically, not chemically, combined." },
      { term: "Filtration", definition: "A physical separation method used to separate insoluble solids from liquids." }
    ],
    funFacts: [
      "If you mix iron (grey metal magnetic powder) and sulfur (yellow smelly powder), they make a mixture you can pull apart with a magnet. But if you heat them up, they chemically fuse into Iron Sulfide—a black compound that is completely non-magnetic!",
      "Almost 99% of the Earth's atmosphere is made of just two elemental gases: Nitrogen (78%) and Oxygen (21%)."
    ],
    commonMistakes: [
      "Believing compounds have the same properties as their elements. Absolutely not! Toxic chlorine gas and explosive sodium metal chemically join to make safe, tasty table salt!",
      "Thinking solutions (like sugar in water) are compounds. Solutions are actually homogeneous mixtures; you can still separate them by evaporating the water."
    ],
    revisionNotes: [
      "Elements: Only one kind of atom. Compounds: Two or more kinds of atoms bonded. Mixtures: Physically mixed, not bonded.",
      "Separation methods: Filtration (solids from liquids), Distillation (liquids with different boiling points), Magnetism (magnetic metals)."
    ],
    practiceQuestions: [
      {
        question: "Which of the following is a chemical compound?",
        options: ["Oxygen gas", "Salt water", "Carbon dioxide", "Gold ring"],
        answer: "C",
        explanation: "Carbon dioxide (CO2) is a compound because Carbon and Oxygen are chemically bonded together in a fixed ratio."
      }
    ]
  },
  {
    id: "g7-respiration",
    grade: "7",
    subject: "Cellular Respiration",
    title: "Cellular Respiration: How Cells Breathe",
    definition: "Cellular respiration is the biochemical process by which cells break down glucose (sugar) with oxygen to produce usable energy (ATP), carbon dioxide, and water.",
    explanation: "Have you ever wondered why you breathe? It's not just for your lungs—it's for your trillions of cells! Cellular respiration is the exact opposite of photosynthesis. While plants make food, respiration is how your cells *burn* that food to get energy. Inside the mitochondria (the cell powerhouses), glucose from your food is combined with oxygen from the air you breathe. This chemical reaction releases energy in the form of a tiny molecule called ATP, which acts as cellular electricity. The waste products of this power generation are Carbon Dioxide (which you breathe out) and water!",
    examples: [
      "Your body temperature stays at a warm 37°C because cellular respiration constantly releases heat energy as it runs!",
      "When you run fast and run out of oxygen, your muscles switch to Anaerobic Respiration (without oxygen), making lactic acid which makes your legs ache."
    ],
    illustrationType: "cells",
    keyTerms: [
      { term: "ATP", definition: "Adenosine Triphosphate, the main energy-storing molecule used as fuel by living cells." },
      { term: "Aerobic", definition: "Processes that require oxygen to occur (such as normal cellular respiration)." },
      { term: "Mitochondria", definition: "The specialized double-membraned organelles where cellular respiration takes place." }
    ],
    funFacts: [
      "The chemical equation for respiration is the exact reverse of photosynthesis! What plants exhale, we inhale, and what we exhale, plants inhale!",
      "Yeasts perform anaerobic respiration called Fermentation, turning sugar into carbon dioxide bubbles and alcohol—which is how we get fluffy bread!"
    ],
    commonMistakes: [
      "Thinking only animals perform cellular respiration. No! Plants do not have stomachs, so they also must break down their cooked glucose using respiration to grow!",
      "Confusing breathing and cellular respiration. Breathing is the mechanical act of lungs inhaling and exhaling. Respiration is the chemical breakdown inside cells."
    ],
    revisionNotes: [
      "Aerobic Respiration: Glucose + Oxygen ➔ Carbon Dioxide + Water + ATP Energy.",
      "Mitochondria are the primary sites where ATP is manufactured.",
      "Anaerobic respiration produces much less energy and creates lactic acid in muscles or alcohol in yeast."
    ],
    practiceQuestions: [
      {
        question: "In which cellular organelle does aerobic respiration mostly take place?",
        options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
        answer: "B",
        explanation: "Mitochondria are the powerhouses of the cell where glucose is oxidized to produce ATP energy."
      }
    ]
  },
  {
    id: "g7-geology",
    grade: "7",
    subject: "Geology",
    title: "Earth's Layers & The Dynamic Rock Cycle",
    definition: "Earth is divided into core, mantle, and crust. The Rock Cycle is the continuous geological process where rocks transform between igneous, sedimentary, and metamorphic forms.",
    explanation: "The ground beneath your feet feels solid, but Earth is actually a giant, slow-cooking engine! Earth is built like a peach: it has a thin outer Crust (where we live), a thick semi-liquid hot Mantle, a liquid outer Core, and a solid iron inner Core. The crust is split into tectonic plates that float on the mantle, crashing into each other to build mountains or trigger earthquakes. Meanwhile, the rocks on the surface are constantly recycling in the Rock Cycle. Meltdown lava cools into Igneous Rock. Wind and rain crumble rocks into sand, which squeezes together into Sedimentary Rock. Intense heat and pressure bake these rocks underground into Metamorphic Rock, resetting the wheel!",
    examples: [
      "Basalt and granite are Igneous rocks made from cooled lava. Sandstone and limestone are Sedimentary rocks packed with fossils. Marble is Metamorphic rock baked from limestone.",
      "Earthquakes happen when two tectonic plates get stuck, build up pressure, and suddenly slip past each other!"
    ],
    illustrationType: "force",
    keyTerms: [
      { term: "Crust", definition: "The thin, outermost solid layer of Earth." },
      { term: "Igneous", definition: "Rocks formed from the cooling and solidification of molten magma or lava." },
      { term: "Rock Cycle", definition: "A series of processes on and beneath Earth's surface that slowly change rocks from one kind to another." }
    ],
    funFacts: [
      "The Earth's inner core is as hot as the surface of the Sun (about 5,400°C), but it remains solid because of the immense crushing pressure of the planet around it!",
      "Mount Everest is made of sedimentary limestone that was once at the bottom of the ocean! Tectonic plates pushed it miles into the sky."
    ],
    commonMistakes: [
      "Believing rocks last forever. In geological time, every rock is eventually crushed, melted, or washed away to become a new type of rock.",
      "Thinking the mantle is liquid water-like lava. The mantle is solid rock, but it is so hot that it flows very slowly like thick silly putty under pressure."
    ],
    revisionNotes: [
      "Earth's Layers: Crust (outer, thin), Mantle (hot, plastic), Outer Core (liquid metal), Inner Core (solid iron-nickel).",
      "Three rock classes: Igneous (melted & cooled), Sedimentary (compacted layers), Metamorphic (heated & squeezed).",
      "Convection currents in the mantle drive the movement of tectonic plates."
    ],
    practiceQuestions: [
      {
        question: "What rock type is formed directly from cooled magma or lava?",
        options: ["Sedimentary", "Igneous", "Metamorphic", "Fossilized"],
        answer: "B",
        explanation: "Igneous rocks (like basalt or granite) form when hot magma or lava cools down and hardens."
      }
    ]
  },
  {
    id: "g7-heat",
    grade: "7",
    subject: "Thermal Physics",
    title: "Heat Transfer: Conduction, Convection, & Radiation",
    definition: "Heat transfer is the movement of thermal energy from a warmer object to a cooler object through three main mechanisms: conduction, convection, and radiation.",
    explanation: "Heat is an energetic traveler! It always moves from hot places to cold places, never the other way. This travel happens in three ways. First is Conduction, where heat travels through direct contact (like a metal spoon getting hot in hot soup because atoms bump into each other). Second is Convection, which happens in liquids and gases (like boiling water, where hot water expands, becomes lighter, floats up, cools down, and sinks back in circular currents). Third is Radiation, where heat travels through empty space in invisible electromagnetic waves, requiring no atoms at all!",
    examples: [
      "You feel the Sun's heat on your skin through Radiation, even though space is completely empty.",
      "A hot air balloon floats up because Convection makes hot air less dense than cold air."
    ],
    illustrationType: "electricity",
    keyTerms: [
      { term: "Conduction", definition: "Heat transfer through direct physical contact between particles of matter." },
      { term: "Convection", definition: "Heat transfer in fluids (liquids and gases) caused by the movement of warmer, less dense areas rising." },
      { term: "Insulator", definition: "A material that blocks or slows down heat transfer (like wood, wool, or air)." }
    ],
    funFacts: [
      "Vacuum flasks (thermoses) keep coffee hot by having a double wall with the air vacuumed out. Since there are no atoms in a vacuum, Conduction and Convection cannot take place!",
      "Snow is a great heat insulator! Animals and Eskimos build snow shelters (igloos) because trapped air in the snow stops body heat from escaping."
    ],
    commonMistakes: [
      "Thinking 'cold' can transfer into an object. No! Cold is not a thing—it is simply the absence of heat. When you hold an ice cube, your hand loses heat to the ice; cold doesn't crawl into your hand.",
      "Assuming shiny and dark objects absorb heat the same. Dark, matte objects absorb radiation heat easily, while shiny, light objects reflect it."
    ],
    revisionNotes: [
      "Heat flows from high temperature to low temperature.",
      "Conduction is best in solids (especially metals). Convection occurs only in fluids (liquids and gases). Radiation can travel through a vacuum.",
      "Good heat conductors are usually good electricity conductors."
    ],
    practiceQuestions: [
      {
        question: "How does heat from the Sun travel through the vacuum of space to reach Earth?",
        options: ["Conduction", "Convection", "Radiation", "Insulation"],
        answer: "C",
        explanation: "Radiation is the only form of heat transfer that does not require matter (atoms) and travels as electromagnetic waves."
      }
    ]
  },

  // --- GRADE 8 ---
  {
    id: "g8-periodictable",
    grade: "8",
    subject: "Periodic Table Basics",
    title: "Cracking the Periodic Code",
    definition: "The Periodic Table is an organized chart of all known chemical elements, arranged by atomic number, electron configuration, and recurring chemical properties.",
    explanation: "Imagine walking into a grocery store where fruits, soaps, books, and milk are scattered randomly all over the floor—it would be a nightmare to find anything! Chemists faced a similar mess with elements until a scientist named Dmitri Mendeleev created the ultimate organizing system: the Periodic Table. It groups elements in vertical columns called Groups (which share 'family traits' and behaviors) and horizontal rows called Periods. Elements are ordered by their atomic number (number of protons). The columns group super-reactive elements together (like Group 1 Alkali metals that explode in water) and super-chill, unreactive gases together (like Group 18 Noble Gases).",
    examples: [
      "Table salt (NaCl) is made from Sodium (Na)—a soft metal that explodes in water—and Chlorine (Cl)—a toxic, choking green gas. Together they make delicious, safe food seasoning!",
      "Helium, Neon, and Argon are Noble Gases (Group 18) that never make chemical bonds, which is why Helium is safe to put in balloons."
    ],
    illustrationType: "periodic-table",
    keyTerms: [
      { term: "Element", definition: "A pure substance made of only one type of atom that cannot be broken down chemically." },
      { term: "Group", definition: "A vertical column in the periodic table; elements in a group have similar chemical properties." },
      { term: "Noble Gas", definition: "Elements in Group 18 that are extremely stable and do not easily react with other elements." }
    ],
    funFacts: [
      "There is no letter 'J' or 'Q' anywhere on the Periodic Table! Check for yourself!",
      "Carbon is the ultimate team-player element. Because it can form four bonds, it is the basis of almost all living things and organic chemistry!"
    ],
    commonMistakes: [
      "Assuming all metals are solid. Mercury (Hg) is a shiny liquid metal at room temperature!",
      "Thinking the Periodic Table is finished. Scientists have synthesized new heavy elements recently, up to element 118 (Oganesson)!"
    ],
    revisionNotes: [
      "The table currently contains 118 confirmed elements, 94 of which occur naturally on Earth.",
      "Metals are located on the left and center of the table; non-metals are on the far right.",
      "The staircase line separates metals from non-metals, hosting semi-metals called metalloids."
    ],
    practiceQuestions: [
      {
        question: "Which group of elements is extremely unreactive and stable?",
        options: ["Alkali Metals", "Halogens", "Noble Gases", "Transition Metals"],
        answer: "C",
        explanation: "Noble Gases have completely full outer electron shells, making them chemically unreactive and stable."
      }
    ]
  },
  {
    id: "g8-reactions",
    grade: "8",
    subject: "Chemical Reactions",
    title: "Chemical Reactions & Equations",
    definition: "A chemical reaction is a process where one or more substances (reactants) are rearranged into different chemical substances (products).",
    explanation: "Chemical reactions are like atomic dance matches! Original chemical molecules break their bonds, swap partners, and forge brand new substances. In chemistry, we write this down as an equation: Reactants (starting ingredients) ➔ Products (final result). Because of the Law of Conservation of Mass, atoms cannot be created or destroyed. That means the exact number of atoms entering a reaction must exit the reaction, requiring us to balance our equations! We can spot reactions by looking for telltale clues: bubbling gas, temperature shifts, color changes, or light being emitted.",
    examples: [
      "Iron rusts when it chemically reacts with oxygen in wet air, forming a brand new crumbly orange substance (iron oxide).",
      "When you bake a cake, the heat causes baking powder to undergo a chemical reaction, releasing carbon dioxide bubbles that make the cake fluffy."
    ],
    illustrationType: "atoms",
    keyTerms: [
      { term: "Reactants", definition: "The starting substances in a chemical reaction, written on the left of an equation." },
      { term: "Exothermic", definition: "A chemical reaction that releases thermal energy (heat) into its surroundings (making it feel hot)." },
      { term: "Endothermic", definition: "A chemical reaction that absorbs heat from its surroundings (making it feel cold)." }
    ],
    funFacts: [
      "Fireflies glow using a highly efficient chemical reaction called bioluminescence! Almost 100% of the energy is released as cool light rather than heat.",
      "Hydrogen gas is highly explosive, and oxygen supports burning. But when they chemically react, they make H2O (water), which we use to put out fires!"
    ],
    commonMistakes: [
      "Confusing physical and chemical changes. Melting chocolate is physical (still chocolate). Burning paper is chemical (turns to ash and gas, cannot be reversed!).",
      "Assuming mass disappears when something burns. It doesn't! If you trap and weigh all the smoke, ash, and gases, they will weigh exactly the same as the original wood and oxygen combined."
    ],
    revisionNotes: [
      "Law of Conservation of Mass: Mass is neither created nor destroyed in a chemical reaction.",
      "Clues of reaction: Gas release, precipitate forms, color change, temperature change.",
      "Catalysts are special chemicals that speed up reactions without being used up themselves."
    ],
    practiceQuestions: [
      {
        question: "What do we call a chemical reaction that releases energy, making the surroundings hot?",
        options: ["Endothermic", "Exothermic", "Sublimation", "Catalytic"],
        answer: "B",
        explanation: "Exothermic reactions release energy as heat, light, or sound into their surroundings."
      }
    ]
  },
  {
    id: "g8-waves",
    grade: "8",
    subject: "Waves & Optics",
    title: "Light, Sound, and Wave Mechanics",
    definition: "A wave is a disturbance that transfers energy from one point to another without transferring matter. Waves are mechanical (sound) or electromagnetic (light).",
    explanation: "Waves are the cosmic messengers of energy! If you throw a pebble in a pond, water ripples outward. The water molecules themselves just bob up and down; only the *energy* travels. Waves have high points called Crests and low points called Troughs. The distance between crests is the Wavelength, and the number of waves passing per second is the Frequency. Mechanical waves (like Sound) require physical atoms to wiggle through, meaning sound cannot travel in space. Electromagnetic waves (like Light) can travel through a complete vacuum, making light the fastest speed limit in the universe!",
    examples: [
      "Sound travels through air at 343 meters per second, but light travels at 300,000 kilometers per second! This is why you see lightning way before you hear the thunder claps.",
      "A straw in a glass of water looks bent because of Refraction, which is light waves slowing down and bending as they cross from air into denser water."
    ],
    illustrationType: "electricity",
    keyTerms: [
      { term: "Wavelength", definition: "The physical distance between two corresponding parts of consecutive waves (crest to crest)." },
      { term: "Refraction", definition: "The bending of a wave (especially light) as it passes from one medium to another of different density." },
      { term: "Amplitude", definition: "The height of a wave from its center resting line, representing its energy volume or brightness." }
    ],
    funFacts: [
      "There is no sound in space because there are no atoms to carry sound vibrations. Star Wars space dogfights would actually be dead silent!",
      "Visible light is just a tiny slice of the Electromagnetic Spectrum, which also contains radio waves, microwaves, X-rays, and deadly gamma rays!"
    ],
    commonMistakes: [
      "Thinking light and sound waves are identical. Light waves are transverse (wiggle perpendicular to direction) and travel in a vacuum. Sound waves are longitudinal (compress and expand forward) and need a medium.",
      "Believing mirrors only flip images. Mirrors actually reflect light angles exactly: the Angle of Incidence always equals the Angle of Reflection."
    ],
    revisionNotes: [
      "Wave Speed = Frequency × Wavelength.",
      "White light is actually a mix of all rainbow colors; a prism separates them because different colors bend at different speeds.",
      "High frequency sound waves are heard as high pitch; high amplitude waves are heard as loud volume."
    ],
    practiceQuestions: [
      {
        question: "Why does sound travel faster in water than in air?",
        options: ["Water has more empty space", "Water molecules are packed closer together", "Water is colder", "Water has no gravity"],
        answer: "B",
        explanation: "Sound is a mechanical wave that relies on molecular collisions. Closer-packed water molecules transfer sound energy faster than loose air molecules."
      }
    ]
  },
  {
    id: "g8-genetics",
    grade: "8",
    subject: "Genetics",
    title: "Genetics, DNA, and the Code of Heredity",
    definition: "Genetics is the study of heredity, exploring how biological instructions (DNA) are passed down from parents to offspring through genes.",
    explanation: "Imagine your body was built using a highly detailed blueprint manual. That manual is called DNA, and it lives inside the nucleus of almost every single cell! DNA is shaped like a twisted ladder called a Double Helix. The rungs of this ladder are built from four chemical bases (A, T, C, G) that act as letters. A set of these letters makes up a Gene, which codes for a specific trait, like your eye color or hair texture. You inherit two copies of each gene: one from your mother and one from your father. Gregor Mendel discovered that some genes are Dominant (stronger, always showing up if present) while others are Recessive (hidden unless both copies match).",
    examples: [
      "Having brown eyes is a Dominant trait (B), while blue eyes is Recessive (b). If you inherit B from mom and b from dad, your eyes will be brown!",
      "Punnett Squares are grid diagrams used by biologists to predict the genetic probabilities of offspring traits."
    ],
    illustrationType: "cells",
    keyTerms: [
      { term: "DNA", definition: "Deoxyribonucleic Acid, the double-helix molecule storing the genetic blueprint of life." },
      { term: "Gene", definition: "A specific segment of DNA that holds instructions for making a particular protein or trait." },
      { term: "Dominant Allele", definition: "An allele whose trait always shows up in the organism when the allele is present." }
    ],
    funFacts: [
      "If you uncoiled all the DNA inside a single one of your body cells, it would stretch about 6 feet long! If you uncoiled all the DNA in your entire body, it would stretch from Earth to Pluto and back!",
      "Humans share about 60% of their DNA blueprint with bananas, and 98.8% with chimpanzees!"
    ],
    commonMistakes: [
      "Thinking genes determine everything. While genes give the baseline blueprint, the environment (diet, lifestyle, climate) also plays a massive role in how traits develop.",
      "Believing dominant traits are more common simply because they are 'stronger'. Not always! For example, having six fingers is a dominant trait, but it is very rare."
    ],
    revisionNotes: [
      "Chromosomes are coiled bundles of DNA. Humans have 23 pairs (46 total) in each cell nucleus.",
      "Genotype is the genetic code (e.g., Bb); Phenotype is the physical expression (e.g., Brown Eyes).",
      "Mutations are accidental typos in the DNA code during copying, which can introduce new traits."
    ],
    practiceQuestions: [
      {
        question: "What is the shape of a DNA molecule called?",
        options: ["Triple Helix", "Single Strand", "Double Helix", "Spherical Loop"],
        answer: "C",
        explanation: "DNA is structurally organized as a Double Helix, resembling a twisted ladder."
      }
    ]
  },
  {
    id: "g8-universe",
    grade: "8",
    subject: "Cosmology",
    title: "Space Exploration & The Wonders of the Universe",
    definition: "Cosmology is the scientific study of the origin, evolution, and eventual fate of the universe, including stars, galaxies, and dark matter.",
    explanation: "Look up at the night sky. Every star is a sun, and there are more stars in the universe than grains of sand on all the beaches of Earth! The universe began about 13.8 billion years ago in an explosive expansion called the Big Bang. Since then, gravity has pulled matter together to build Stars, which are hot nuclear factories fusing hydrogen into helium. Stars group together into massive stellar islands called Galaxies. Our solar system lives inside the spiral-shaped Milky Way galaxy, which contains over 100 billion stars. To study this cosmic ocean, humans use powerful space telescopes and send robotic explorers to other planets!",
    examples: [
      "The Hubble and James Webb Space Telescopes float in space above Earth's blurry atmosphere, capturing crystal-clear photos of galaxies billions of light-years away.",
      "The Voyager 1 spacecraft, launched in 1977, is the farthest human-made object, having left our solar system and traveling into interstellar space."
    ],
    illustrationType: "space",
    keyTerms: [
      { term: "Light-Year", definition: "The astronomical distance that light travels in one Earth year (about 9.5 trillion kilometers)." },
      { term: "Galaxy", definition: "A massive system of millions or billions of stars, gas, dust, and dark matter held together by gravity." },
      { term: "Nebula", definition: "A giant cloud of dust and gas in space, acting as a nursery where new stars are born." }
    ],
    funFacts: [
      "Because light takes time to travel, when you look at a galaxy 2 million light-years away, you are actually looking at it as it was 2 million years ago! You are looking back in time!",
      "A neutron star is so incredibly dense that a single teaspoon of its material would weigh about 6 billion tons on Earth!"
    ],
    commonMistakes: [
      "Thinking a light-year is a measure of time. No! It is a unit of distance—the distance light travels in one year.",
      "Believing space is completely empty. While it is mostly a vacuum, it contains traces of gas, dust, magnetic fields, and dark energy."
    ],
    revisionNotes: [
      "The Big Bang is the leading scientific explanation for the origin of the universe.",
      "Stars generate energy through Nuclear Fusion in their cores.",
      "Galaxies are classified by shape: Spiral (like ours), Elliptical, and Irregular."
    ],
    practiceQuestions: [
      {
        question: "What is a giant cloud of gas and dust in space, where new stars are born, called?",
        options: ["Black Hole", "Nebula", "Galaxy", "Supernova"],
        answer: "B",
        explanation: "Nebulae are massive cosmic nurseries made of gas and dust where gravitational collapse initiates star formation."
      }
    ]
  }
];

export const VIRTUAL_EXPERIMENTS: Experiment[] = [
  {
    id: "exp-volcano",
    title: "Baking Soda Volcano",
    description: "Build a mini volcanic eruption using chemical acid-base reactions!",
    objective: "To demonstrate how acids and bases react to create gas pressure, mimicking volcanic eruptions.",
    materials: [
      "Baking Soda (Sodium Bicarbonate - Base)",
      "Vinegar (Acetic Acid - Acid)",
      "Red Food Coloring (for lava visual effect)",
      "Dish soap (to make the foam extra bubbly)",
      "Plastic bottle or clay volcano model"
    ],
    steps: [
      {
        number: 1,
        text: "Add 2-3 tablespoons of baking soda (sodium bicarbonate) into your dry volcano bottle.",
        actionLabel: "Add Baking Soda",
        animationState: "baking_soda_added"
      },
      {
        number: 2,
        text: "Squeeze a few drops of red food coloring and a squirt of liquid dish soap into the bottle.",
        actionLabel: "Mix Soap & Color",
        animationState: "soap_colored"
      },
      {
        number: 3,
        text: "Slowly pour in 1/2 cup of vinegar. Watch out! Stand back!",
        actionLabel: "Pour Vinegar & Ignite!",
        animationState: "erupting"
      }
    ],
    expectedResult: "A giant, red bubbly foam spills up and overflows out of the volcano neck, rolling down the sides just like molten lava!",
    explanation: "This explosion is a chemical reaction! Baking soda is a chemical base, and vinegar is a chemical acid. When they meet, they trade atoms and create a brand new substance: Carbon Dioxide (CO2) gas. Because gas takes up way more space than solids or liquids, it builds up pressure inside the bottle. The dish soap traps this gas inside millions of bubbles, making a spectacular foamy 'lava' that erupts upward to escape the bottle!",
    safetyTips: [
      "Wear protective safety goggles to prevent foam from splashing into your eyes.",
      "Perform this experiment outdoors, in a sink, or on a large tray because it can make a big, red mess!"
    ],
    illustrationType: "volcano"
  },
  {
    id: "exp-circuit",
    title: "Light the Bulb Circuit",
    description: "Build a working closed loop to light up an electric bulb!",
    objective: "To understand how conductors, power sources, and closed switches make electric current flow.",
    materials: [
      "1.5V AA Battery (Power source)",
      "Small LED Bulb or lightbulb (Load)",
      "Two insulated copper wires with alligator clips (Conductors)",
      "A metal paperclip (Switch)"
    ],
    steps: [
      {
        number: 1,
        text: "Connect one wire from the positive (+) terminal of the battery to the metal base of the lightbulb.",
        actionLabel: "Connect Battery to Bulb",
        animationState: "bulb_connected"
      },
      {
        number: 2,
        text: "Attach the second wire from the bulb to one side of the metal paperclip switch.",
        actionLabel: "Connect Switch",
        animationState: "switch_connected"
      },
      {
        number: 3,
        text: "Attach a third wire from the other side of the paperclip to the negative (-) terminal of the battery. Close the paperclip switch!",
        actionLabel: "Close Switch",
        animationState: "circuit_closed"
      }
    ],
    expectedResult: "The moment the paperclip switch is pressed shut to touch the second wire, the bulb instantly glows bright!",
    explanation: "Electricity requires a closed, unbroken loop (called a circuit) to flow. The battery acts as a water pump, pushing electrons. When you close the paperclip switch, you form a solid bridge of metal. Because metal is a great conductor, electrons flow continuously out of the negative terminal, through the lightbulb's tungsten filament (which heats up and glows from friction), and back into the positive terminal of the battery.",
    safetyTips: [
      "Never connect wires directly to wall sockets! Only use small 1.5V household batteries, which are completely safe.",
      "If you leave wires connected directly without a bulb, the wires can get hot. This is called a short circuit; disconnect them immediately."
    ],
    illustrationType: "circuit"
  },
  {
    id: "exp-magnet",
    title: "Magnetic Fields Explorer",
    description: "See the invisible magnetic field lines using iron filings!",
    objective: "To visualize the invisible lines of magnetic force surrounding a bar magnet.",
    materials: [
      "Bar Magnet (with North and South poles)",
      "A clear sheet of paper or plastic sheet",
      "Iron filings (tiny metal shavings)"
    ],
    steps: [
      {
        number: 1,
        text: "Place your bar magnet flat on a table.",
        actionLabel: "Place Bar Magnet",
        animationState: "magnet_placed"
      },
      {
        number: 2,
        text: "Lay the white piece of paper or clear plastic sheet directly over the magnet.",
        actionLabel: "Overlay Paper",
        animationState: "paper_overlaid"
      },
      {
        number: 3,
        text: "Gently sprinkle iron filings on top of the paper, then lightly tap the edges of the paper with your finger.",
        actionLabel: "Sprinkle Filings",
        animationState: "filings_pattern"
      }
    ],
    expectedResult: "The iron shavings spin and align themselves into beautiful, curved loop lines that loop from the North pole to the South pole of the magnet!",
    explanation: "Magnets have an invisible force field around them called a magnetic field. Even though humans cannot see this field, iron is magnetic and gets pulled by this force. Tapping the paper allows the tiny iron filings to float slightly and line up parallel to the magnetic field lines. Notice how the lines are super dense at the North and South poles? That's because the magnetic force is strongest at the poles!",
    safetyTips: [
      "Do not touch your eyes or face after handling iron filings, as they can scratch your skin. Wash your hands thoroughly with soap.",
      "Keep iron filings away from magnets directly, as they are very difficult to pull off the magnet face!"
    ],
    illustrationType: "magnet"
  }
];

export const DICTIONARY: DictionaryTerm[] = [
  {
    term: "Photosynthesis",
    meaning: "The process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
    pronunciation: "foh-toe-SIN-thuh-sis",
    example: "Leaves are like tiny solar factories that conduct photosynthesis to feed the tree.",
    relatedConcepts: ["Chlorophyll", "Stomata", "Chloroplast", "Glucose"]
  },
  {
    term: "Gravity",
    meaning: "The invisible force that attracts any objects with mass toward each other.",
    pronunciation: "GRAV-i-tee",
    example: "Gravity is the reason why objects fall back down when you toss them in the air, and why Earth orbits the Sun.",
    relatedConcepts: ["Mass", "Orbit", "Acceleration", "Weight"]
  },
  {
    term: "Mitochondria",
    meaning: "An organelle found in large numbers in most cells, in which the biochemical processes of respiration and energy production occur.",
    pronunciation: "my-toe-KON-dree-uh",
    example: "Mitochondria are known as the cellular engines or powerhouses because they produce ATP energy.",
    relatedConcepts: ["Cell Biology", "Organelle", "Respiration", "Glucose"]
  },
  {
    term: "Conductor",
    meaning: "A material or substance that allows electricity or heat to flow through it easily.",
    pronunciation: "kuhn-DUHK-ter",
    example: "Copper is widely used in power cables because it is an excellent conductor of electricity.",
    relatedConcepts: ["Electricity", "Insulator", "Electrons", "Resistance"]
  },
  {
    term: "Ecosystem",
    meaning: "A biological community of interacting living organisms (plants, animals) and their physical, non-living environment (soil, air, climate).",
    pronunciation: "EE-koh-sis-tuhm",
    example: "In a forest ecosystem, deer eat grass, wolves hunt deer, and decomposers recycle nutrients back into the soil.",
    relatedConcepts: ["Food Chain", "Ecology", "Biodiversity", "Abiotic Factor"]
  }
];

export const DAILY_FACTS: ScienceFact[] = [
  {
    id: "f-space",
    category: "space",
    fact: "One day on Venus is longer than its whole year!",
    details: "Venus spins on its axis extremely slowly, taking 243 Earth days to make one rotation, but it only takes 225 Earth days to orbit the Sun!"
  },
  {
    id: "f-animal",
    category: "animal",
    fact: "Octopuses have three hearts and blue blood!",
    details: "Two of their hearts pump blood to the gills, while the third circulates it to the rest of the body. Their blood is blue because it uses copper instead of iron to transport oxygen!"
  },
  {
    id: "f-human",
    category: "human",
    fact: "Your brain generates enough electricity to power a small light bulb!",
    details: "The brain contains about 86 billion neurons, sending electrical signals constantly. All together, they generate about 12 to 25 watts of electrical power while you are awake!"
  },
  {
    id: "f-nature",
    category: "nature",
    fact: "Water can boil and freeze at the exact same time!",
    details: "This is called the 'triple point'. It happens when the temperature and pressure are adjusted precisely so that gas, liquid, and solid phases exist in perfect balance."
  },
  {
    id: "f-ocean",
    category: "ocean",
    fact: "We know more about the surface of Mars than the bottom of our oceans!",
    details: "Over 80% of the Earth's oceans remain completely unmapped, unobserved, and unexplored, hidden under thousands of feet of crushing pressure."
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-welcome",
    title: "Curiosity Spark",
    description: "Launch the AI Science Explorer and begin your scientific journey.",
    xpReward: 50,
    iconName: "Sparkles",
    progress: 100,
    unlocked: true
  },
  {
    id: "ach-lesson",
    title: "Eager Brain",
    description: "Read your first scientific lesson in the Explore tab.",
    xpReward: 100,
    iconName: "BookOpen",
    progress: 0,
    unlocked: false
  },
  {
    id: "ach-experiment",
    title: "Lab Assistant",
    description: "Simulate and complete your first virtual science experiment.",
    xpReward: 150,
    iconName: "FlaskConical",
    progress: 0,
    unlocked: false
  },
  {
    id: "ach-quiz",
    title: "Quiz Master",
    description: "Score 100% on any Science Quiz challenge.",
    xpReward: 200,
    iconName: "Award",
    progress: 0,
    unlocked: false
  },
  {
    id: "ach-chat",
    title: "Philosopher's Stone",
    description: "Ask a custom question to the Science AI Tutor.",
    xpReward: 100,
    iconName: "MessageCircleCode",
    progress: 0,
    unlocked: false
  },
  {
    id: "ach-vision",
    title: "X-Ray Eyes",
    description: "Upload or select a science diagram for AI Image Analysis.",
    xpReward: 150,
    iconName: "Eye",
    progress: 0,
    unlocked: false
  }
];
