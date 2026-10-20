/* ==========================================================
   PawPedia — script.js
   Vanilla JavaScript only. Everything lives inside one IIFE
   so there are no stray global variables.
   ========================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. DATA
     To add an animal, copy one object and change its values.
     "image" is a photo URL. Swap it for any image you like.
     --------------------------------------------------------- */

  // Helper that builds a photo URL from keywords (loremflickr serves
  // real photographs matching the tags). "lock" keeps the same photo
  // each time. Replace with any URL or a local file such as "images/buddy.jpg".
  function photo(tags, lock, w, h) {
    return "https://loremflickr.com/" + (w || 800) + "/" + (h || 600) + "/" + tags + "?lock=" + lock;
  }

  // Display labels for each species key
  const SPECIES = {
    dogs: "Dogs",
    cats: "Cats",
    rabbits: "Rabbits",
    birds: "Birds",
    hamsters: "Hamsters",
    "guinea-pigs": "Guinea Pigs",
    horses: "Horses",
    goats: "Goats",
    sheep: "Sheep",
    cows: "Cows"
  };

  const ANIMALS = [
    // ----- Dogs -----
    {
      id: 1, name: "Buddy", species: "dogs", breed: "Golden Retriever",
      image: photo("golden,retriever", 101),
      description: "A playful, endlessly friendly retriever who greets everyone like a long-lost friend and lives for a game of fetch.",
      facts: [
        "Golden Retrievers were originally bred in Scotland to retrieve waterfowl.",
        "Their water-repellent double coat keeps them warm while swimming.",
        "They are among the most popular guide and therapy dog breeds."
      ]
    },
    {
      id: 2, name: "Luna", species: "dogs", breed: "Siberian Husky",
      image: photo("siberian,husky", 102),
      description: "An energetic husky with striking blue eyes and a talkative, adventurous spirit.",
      facts: [
        "Huskies were bred by the Chukchi people to pull sleds over long distances.",
        "They often \"talk\" with howls and woo-woo sounds instead of barking.",
        "Their thick coat can handle temperatures as low as -60°F (-51°C)."
      ]
    },
    {
      id: 3, name: "Max", species: "dogs", breed: "German Shepherd",
      image: photo("german,shepherd", 103),
      description: "A loyal, intelligent shepherd who thrives on having a job to do and a family to protect.",
      facts: [
        "German Shepherds are widely used as police, search-and-rescue and service dogs.",
        "They can learn a new command in just a handful of repetitions.",
        "The breed was standardized in Germany in the late 1800s."
      ]
    },
    {
      id: 4, name: "Daisy", species: "dogs", breed: "Beagle",
      image: photo("beagle", 104),
      description: "A curious, nose-driven beagle who follows every interesting scent with a happy wag.",
      facts: [
        "Beagles have around 220 million scent receptors.",
        "They are often used by airports to sniff out prohibited food items.",
        "Their baying howl was made for tracking rabbits over long distances."
      ]
    },
    {
      id: 5, name: "Rocky", species: "dogs", breed: "French Bulldog",
      image: photo("french,bulldog", 105),
      description: "A charming, clownish companion with bat-like ears and a big personality in a compact body.",
      facts: [
        "Frenchies are known for their distinctive \"bat ears\".",
        "They are a very popular apartment-friendly breed.",
        "Despite the name, the breed was refined largely in France from English bulldogs."
      ]
    },
    {
      id: 6, name: "Coco", species: "dogs", breed: "Pembroke Welsh Corgi",
      image: photo("corgi", 106),
      description: "A cheerful, short-legged corgi with a fluffy rear and a surprisingly fast herding sprint.",
      facts: [
        "Corgis were originally bred to herd cattle by nipping at their heels.",
        "Their short legs help them dodge kicks from cows.",
        "The breed has long been associated with British royalty."
      ]
    },

    // ----- Cats -----
    {
      id: 7, name: "Whiskers", species: "cats", breed: "Maine Coon",
      image: photo("maine,coon,cat", 107),
      description: "A gentle giant with a plush mane and tufted ears, known as the dog of the cat world.",
      facts: [
        "Maine Coons are one of the largest domesticated cat breeds.",
        "They often chirp and trill instead of meowing.",
        "Their water-resistant fur and big paws suit cold climates."
      ]
    },
    {
      id: 8, name: "Cleo", species: "cats", breed: "Siamese",
      image: photo("siamese,cat", 108),
      description: "A vocal, elegant cat with sapphire eyes who loves to chat and follow you from room to room.",
      facts: [
        "Siamese kittens are born almost entirely white.",
        "Their darker points come from a temperature-sensitive pigment.",
        "They are famously social and talkative."
      ]
    },
    {
      id: 9, name: "Oliver", species: "cats", breed: "British Shorthair",
      image: photo("british,shorthair,cat", 109),
      description: "A calm, round-faced cat with a dense plush coat and a dignified, easy-going nature.",
      facts: [
        "British Shorthairs are said to have inspired the Cheshire Cat.",
        "They tend to enjoy company but are not overly clingy.",
        "Their thick coat feels like a soft teddy bear."
      ]
    },
    {
      id: 10, name: "Mochi", species: "cats", breed: "Ragdoll",
      image: photo("ragdoll,cat", 110),
      description: "A sweet, floppy ragdoll who melts into your arms and purrs the whole time.",
      facts: [
        "Ragdolls are named for how relaxed they become when picked up.",
        "They have bright blue eyes and silky semi-long fur.",
        "Many Ragdolls follow their owners around like puppies."
      ]
    },
    {
      id: 11, name: "Shadow", species: "cats", breed: "Bombay",
      image: photo("black,cat", 111),
      description: "A sleek, panther-like black cat with copper eyes and a love of lap time.",
      facts: [
        "The Bombay breed was developed to resemble a miniature black panther.",
        "Their short coat shines with minimal grooming.",
        "They are playful well into adulthood."
      ]
    },

    // ----- Rabbits -----
    {
      id: 12, name: "Clover", species: "rabbits", breed: "Holland Lop",
      image: photo("lop,rabbit", 112),
      description: "A snuggly, floppy-eared bunny who binkies across the room whenever she's happy.",
      facts: [
        "Holland Lops are one of the smallest lop-eared breeds.",
        "A \"binky\" is a joyful jump and twist rabbits do when happy.",
        "Rabbit teeth never stop growing, so they need hay to chew."
      ]
    },
    {
      id: 13, name: "Biscuit", species: "rabbits", breed: "Netherland Dwarf",
      image: photo("dwarf,rabbit", 113),
      description: "A tiny, spirited bunny with a round face and short ears who loves exploring.",
      facts: [
        "Netherland Dwarfs weigh only about 2 to 2.5 pounds as adults.",
        "Rabbits can see almost 360 degrees around them.",
        "They are crepuscular, meaning most active at dawn and dusk."
      ]
    },

    // ----- Birds -----
    {
      id: 14, name: "Sunny", species: "birds", breed: "Budgerigar",
      image: photo("budgerigar", 114),
      description: "A cheerful little parakeet with bright feathers who chatters away and can learn to mimic words.",
      facts: [
        "Budgies are native to the dry plains of Australia.",
        "Some budgies learn hundreds of words.",
        "In the wild, they travel in large flocks."
      ]
    },
    {
      id: 15, name: "Kiwi", species: "birds", breed: "Cockatiel",
      image: photo("cockatiel", 115),
      description: "A gentle, crested cockatiel who whistles tunes and wears her feelings on her feathers.",
      facts: [
        "A cockatiel's crest shows its mood: raised means curious or alert.",
        "They are the smallest members of the cockatoo family.",
        "Cockatiels love to whistle and often learn short melodies."
      ]
    },
    {
      id: 16, name: "Peaches", species: "birds", breed: "Lovebird",
      image: photo("lovebird", 116),
      description: "A tiny, colorful parrot with a big attitude who forms very strong bonds with her people.",
      facts: [
        "Lovebirds get their name from the close bonds between mated pairs.",
        "They are native to Africa and Madagascar.",
        "Despite their size, they can be fearless and feisty."
      ]
    },

    // ----- Hamsters -----
    {
      id: 17, name: "Peanut", species: "hamsters", breed: "Syrian Hamster",
      image: photo("syrian,hamster", 117),
      description: "A chubby-cheeked hamster who stuffs her pouches and runs on her wheel all night.",
      facts: [
        "Syrian hamsters are solitary and prefer living alone.",
        "Their cheek pouches can stretch to carry food back to the burrow.",
        "Hamsters are nocturnal and most active in the evening."
      ]
    },
    {
      id: 18, name: "Nibbles", species: "hamsters", breed: "Dwarf Hamster",
      image: photo("dwarf,hamster", 118),
      description: "A pocket-sized, speedy hamster who loves to burrow and explore every tunnel.",
      facts: [
        "Dwarf hamsters are much smaller than Syrian hamsters.",
        "A hamster's teeth grow continuously throughout life.",
        "They can run several miles on a wheel in a single night."
      ]
    },

    // ----- Guinea pigs -----
    {
      id: 19, name: "Pippin", species: "guinea-pigs", breed: "Abyssinian",
      image: photo("abyssinian,guinea,pig", 119),
      description: "A fuzzy, rosette-coated guinea pig who \"wheeks\" with excitement whenever the fridge opens.",
      facts: [
        "Abyssinian guinea pigs are known for their swirling fur rosettes.",
        "Guinea pigs need vitamin C in their diet because they can't make it themselves.",
        "They communicate with a range of squeaks, purrs, and wheeks."
      ]
    },
    {
      id: 20, name: "Truffle", species: "guinea-pigs", breed: "American Guinea Pig",
      image: photo("guinea,pig", 120),
      description: "A calm, sweet-natured guinea pig with a smooth coat who loves fresh veggies and cuddles.",
      facts: [
        "Guinea pigs are highly social and are happiest in pairs.",
        "They originated in the Andes of South America.",
        "When happy, guinea pigs may \"popcorn\" by hopping in the air."
      ]
    },

    // ----- Horses -----
    {
      id: 21, name: "Starlight", species: "horses", breed: "Arabian",
      image: photo("arabian,horse", 121),
      description: "An elegant, spirited Arabian with a dished face and a flowing tail carried high.",
      facts: [
        "Arabians are one of the oldest horse breeds in the world.",
        "They have a distinctive dished face and arched neck.",
        "The breed is famous for stamina in endurance riding."
      ]
    },
    {
      id: 22, name: "Maple", species: "horses", breed: "Shetland Pony",
      image: photo("shetland,pony", 122),
      description: "A small but mighty pony with a thick mane and a mischievous, friendly streak.",
      facts: [
        "Shetland ponies come from the Shetland Isles of Scotland.",
        "They are among the strongest equines for their size.",
        "Their thick double coat helps them endure harsh weather."
      ]
    },
    {
      id: 23, name: "Thunder", species: "horses", breed: "Clydesdale",
      image: photo("clydesdale,horse", 123),
      description: "A towering draft horse with feathered hooves and a gentle, patient temperament.",
      facts: [
        "Clydesdales can stand over 17 hands tall.",
        "They are known for the long white \"feathering\" on their lower legs.",
        "The breed originated in Lanarkshire, Scotland."
      ]
    },

    // ----- Goats -----
    {
      id: 24, name: "Gus", species: "goats", breed: "Nigerian Dwarf Goat",
      image: photo("nigerian,dwarf,goat", 124),
      description: "A curious little goat who climbs on everything and headbutts gently for attention.",
      facts: [
        "Goats have rectangular pupils that give them a wide field of vision.",
        "Nigerian Dwarf goats are small dairy goats with sweet milk.",
        "Goats are excellent climbers and love high perches."
      ]
    },
    {
      id: 25, name: "Hazel", species: "goats", breed: "Nubian Goat",
      image: photo("nubian,goat", 125),
      description: "A graceful goat with long, drooping ears and a loud, expressive voice.",
      facts: [
        "Nubian goats are recognized by their long, floppy ears.",
        "They are popular dairy goats thanks to rich milk.",
        "Goats have been domesticated for roughly 10,000 years."
      ]
    },

    // ----- Sheep -----
    {
      id: 26, name: "Wooly", species: "sheep", breed: "Merino Sheep",
      image: photo("merino,sheep", 126),
      description: "A fluffy merino with a cloud-soft fleece and a calm, grass-munching routine.",
      facts: [
        "Merino wool is prized for being exceptionally soft and fine.",
        "Sheep have excellent memories and can recognize faces.",
        "A flock tends to follow a leader through the pasture."
      ]
    },
    {
      id: 27, name: "Dolly", species: "sheep", breed: "Suffolk Sheep",
      image: photo("suffolk,sheep", 127),
      description: "A bold black-faced sheep with a sturdy build and a friendly, curious look.",
      facts: [
        "Suffolk sheep are easily spotted by their black heads and legs.",
        "They are raised mainly for their meat and rapid growth.",
        "Sheep have rectangular pupils and see widely around them."
      ]
    },

    // ----- Cows -----
    {
      id: 28, name: "Bessie", species: "cows", breed: "Holstein Cow",
      image: photo("holstein,cow", 128),
      description: "A gentle black-and-white dairy cow who loves a sunny pasture and a good scratch.",
      facts: [
        "Holsteins are the world's highest-producing dairy breed.",
        "Every Holstein has a unique black-and-white pattern.",
        "Cows have almost 360-degree panoramic vision."
      ]
    },
    {
      id: 29, name: "Clementine", species: "cows", breed: "Highland Cow",
      image: photo("highland,cow", 129),
      description: "A shaggy, long-horned Highland cow with a golden fringe and a placid, friendly nature.",
      facts: [
        "Highland cattle come from the Scottish Highlands.",
        "Their long, double-layered coat protects them from rain and cold.",
        "Despite their impressive horns, they are known for being docile."
      ]
    }
  ];

  /* ---------------------------------------------------------
     2. STATE & CONSTANTS
     --------------------------------------------------------- */
  const PAGE_SIZE = 8;                        // cards shown at first / per "Load More"
  const FAV_KEY = "pawpedia-favorites";       // localStorage key for favorites
  const THEME_KEY = "pawpedia-theme";         // localStorage key for theme

  // Inline SVG placeholder used when an image fails to load
  const FALLBACK_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
    '<rect width="800" height="600" fill="#e9dcc3"/>' +
    '<g fill="#8a5a3c" opacity="0.65">' +
    '<ellipse cx="400" cy="340" rx="90" ry="72"/>' +
    '<ellipse cx="290" cy="240" rx="38" ry="52" transform="rotate(-20 290 240)"/>' +
    '<ellipse cx="370" cy="190" rx="38" ry="52"/>' +
    '<ellipse cx="450" cy="190" rx="38" ry="52"/>' +
    '<ellipse cx="530" cy="240" rx="38" ry="52" transform="rotate(20 530 240)"/>' +
    '</g>' +
    '<text x="400" y="500" font-family="Georgia, serif" font-size="34" fill="#6a6257" text-anchor="middle">Photo unavailable</text>' +
    '</svg>'
  );

  const state = {
    species: "all",
    query: "",
    sort: "default",
    visibleCount: PAGE_SIZE,
    favorites: loadFavorites(),
    lastFocused: null,        // element to return focus to after closing modal
    currentModalId: null
  };

  /* ---------------------------------------------------------
     3. DOM REFERENCES
     --------------------------------------------------------- */
  const $ = function (id) { return document.getElementById(id); };

  const els = {
    menuToggle: $("menuToggle"),
    siteNav: $("siteNav"),
    themeToggle: $("themeToggle"),
    favCount: $("favCount"),
    statAnimals: $("statAnimals"),
    statSpecies: $("statSpecies"),
    statFavorites: $("statFavorites"),
    heroRandomBtn: $("heroRandomBtn"),
    dayCard: $("dayCard"),
    searchInput: $("searchInput"),
    clearSearch: $("clearSearch"),
    sortSelect: $("sortSelect"),
    randomBtn: $("randomBtn"),
    filterBar: $("filterBar"),
    resultsCount: $("resultsCount"),
    animalGrid: $("animalGrid"),
    emptyState: $("emptyState"),
    resetFilters: $("resetFilters"),
    loadMoreBtn: $("loadMoreBtn"),
    favoritesGrid: $("favoritesGrid"),
    favoritesEmpty: $("favoritesEmpty"),
    currentYear: $("currentYear"),
    modalBackdrop: $("modalBackdrop"),
    modal: $("animalModal"),
    modalClose: $("modalClose"),
    modalImage: $("modalImage"),
    modalSpecies: $("modalSpecies"),
    modalTitle: $("modalTitle"),
    modalBreed: $("modalBreed"),
    modalDescription: $("modalDescription"),
    modalFacts: $("modalFacts"),
    modalFav: $("modalFav"),
    modalRandom: $("modalRandom")
  };

  /* ---------------------------------------------------------
     4. SMALL HELPERS
     --------------------------------------------------------- */

  // Escape text before putting it into HTML strings
  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
  }

  function getAnimalById(id) {
    return ANIMALS.find(function (a) { return a.id === Number(id); });
  }

  function speciesLabel(key) { return SPECIES[key] || key; }

  // Singular form used in alt text and tags (Dogs -> Dog)
  function speciesSingular(key) {
    const map = { dogs: "Dog", cats: "Cat", rabbits: "Rabbit", birds: "Bird", hamsters: "Hamster",
      "guinea-pigs": "Guinea Pig", horses: "Horse", goats: "Goat", sheep: "Sheep", cows: "Cow" };
    return map[key] || key;
  }

  function isFavorite(id) { return state.favorites.indexOf(id) !== -1; }

  /* ---------------------------------------------------------
     5. FAVORITES (localStorage)
     --------------------------------------------------------- */
  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(function (n) { return typeof n === "number"; }) : [];
    } catch (err) {
      return [];   // storage blocked or corrupted: start empty
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites));
    } catch (err) {
      /* storage unavailable: favorites just won't persist */
    }
  }

  // Add or remove an animal from favorites, then refresh every place it appears
  function toggleFavorite(id) {
    id = Number(id);
    const index = state.favorites.indexOf(id);
    if (index === -1) {
      state.favorites.push(id);
    } else {
      state.favorites.splice(index, 1);
    }
    saveFavorites();
    updateFavoriteUI();
  }

  // Update heart buttons in place (so scroll position and loaded cards stay),
  // rebuild the Favorites section, and update counters.
  function updateFavoriteUI() {
    document.querySelectorAll("[data-fav-id]").forEach(function (btn) {
      const fav = isFavorite(Number(btn.dataset.favId));
      setFavButtonState(btn, fav);
    });

    renderFavorites();

    const count = state.favorites.length;
    els.favCount.textContent = count;
    els.favCount.setAttribute("aria-label", count + (count === 1 ? " favorite" : " favorites"));
    els.statFavorites.textContent = count;
  }

  function setFavButtonState(btn, fav) {
    btn.classList.toggle("is-fav", fav);
    btn.setAttribute("aria-pressed", String(fav));
    const heart = btn.querySelector(".heart");
    if (heart) heart.textContent = fav ? "♥" : "♡";
    const label = btn.querySelector(".fav-label");
    if (label) label.textContent = fav ? "Saved to favorites" : "Add to favorites";
    // Card heart buttons carry a name-specific aria-label
    if (btn.dataset.name) {
      btn.setAttribute("aria-label", (fav ? "Remove " : "Add ") + btn.dataset.name + (fav ? " from favorites" : " to favorites"));
    }
  }

  /* ---------------------------------------------------------
     6. FILTER / SEARCH / SORT
     --------------------------------------------------------- */

  // Keep only animals of the chosen species
  function filterAnimals(list, species) {
    if (species === "all") return list;
    return list.filter(function (a) { return a.species === species; });
  }

  // Keep animals matching the query in name, species, breed or description
  function searchAnimals(list, query) {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    const words = q.split(/\s+/);
    return list.filter(function (a) {
      const haystack = [
        a.name, a.breed, speciesLabel(a.species), speciesSingular(a.species),
        a.species.replace("-", " "), a.description, a.facts.join(" ")
      ].join(" ").toLowerCase();
      // every typed word must appear somewhere
      return words.every(function (w) { return haystack.indexOf(w) !== -1; });
    });
  }

  // Return a sorted COPY so the original data order is preserved
  function sortAnimals(list, mode) {
    const copy = list.slice();
    switch (mode) {
      case "name-asc":
        copy.sort(function (a, b) { return a.name.localeCompare(b.name); });
        break;
      case "name-desc":
        copy.sort(function (a, b) { return b.name.localeCompare(a.name); });
        break;
      case "species":
        copy.sort(function (a, b) {
          return speciesLabel(a.species).localeCompare(speciesLabel(b.species)) || a.name.localeCompare(b.name);
        });
        break;
      default:
        break; // "default" keeps the original order
    }
    return copy;
  }

  // Run search + filter + sort together
  function getVisibleResults() {
    let results = filterAnimals(ANIMALS, state.species);
    results = searchAnimals(results, state.query);
    results = sortAnimals(results, state.sort);
    return results;
  }

  /* ---------------------------------------------------------
     7. RENDERING
     --------------------------------------------------------- */

  // Build one animal card <li>
  function createCard(animal, index) {
    const fav = isFavorite(animal.id);
    const li = document.createElement("li");
    li.className = "card";
    li.style.animationDelay = Math.min(index, 8) * 45 + "ms";   // set via JS, not inline HTML
    li.innerHTML =
      '<div class="card-media">' +
        '<img src="' + escapeHTML(animal.image) + '" alt="' + escapeHTML(animal.name + ", a " + animal.breed + " " + speciesSingular(animal.species).toLowerCase()) + '" loading="lazy" width="800" height="600">' +
        '<span class="species-tag">' + escapeHTML(speciesSingular(animal.species)) + '</span>' +
        '<button class="fav-btn' + (fav ? ' is-fav' : '') + '" type="button" data-fav-id="' + animal.id + '" data-name="' + escapeHTML(animal.name) + '" aria-pressed="' + fav + '" aria-label="' + (fav ? 'Remove ' : 'Add ') + escapeHTML(animal.name) + (fav ? ' from favorites' : ' to favorites') + '">' +
          '<span class="heart" aria-hidden="true">' + (fav ? "♥" : "♡") + '</span>' +
        '</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<h3>' + escapeHTML(animal.name) + '</h3>' +
        '<p class="card-breed">' + escapeHTML(animal.breed) + '</p>' +
        '<p class="card-desc">' + escapeHTML(animal.description) + '</p>' +
        '<button class="btn btn-secondary" type="button" data-details-id="' + animal.id + '" aria-label="View details for ' + escapeHTML(animal.name) + '">View Details</button>' +
      '</div>';
    return li;
  }

  // Draw the main gallery (respecting how many cards are currently revealed)
  function renderAnimals() {
    const results = getVisibleResults();
    const shown = results.slice(0, state.visibleCount);

    els.animalGrid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    shown.forEach(function (animal, i) { fragment.appendChild(createCard(animal, i)); });
    els.animalGrid.appendChild(fragment);

    // Results count message
    const total = results.length;
    let message;
    if (total === 0) {
      message = "No animals match your search.";
    } else {
      message = "Showing " + shown.length + " of " + total + (total === 1 ? " animal" : " animals");
      if (state.species !== "all") message += " in " + speciesLabel(state.species);
      if (state.query.trim()) message += " for “" + state.query.trim() + "”";
    }
    els.resultsCount.textContent = message;

    // Empty state
    els.emptyState.hidden = total !== 0;
    els.animalGrid.hidden = total === 0;

    // Load More visibility
    els.loadMoreBtn.hidden = shown.length >= total;
    if (!els.loadMoreBtn.hidden) {
      els.loadMoreBtn.textContent = "Load More (" + (total - shown.length) + " remaining)";
    }
  }

  // Draw the Favorites section
  function renderFavorites() {
    const favAnimals = ANIMALS.filter(function (a) { return isFavorite(a.id); });
    els.favoritesGrid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    favAnimals.forEach(function (animal, i) { fragment.appendChild(createCard(animal, i)); });
    els.favoritesGrid.appendChild(fragment);

    els.favoritesGrid.hidden = favAnimals.length === 0;
    els.favoritesEmpty.hidden = favAnimals.length !== 0;
  }

  // Build the species filter buttons from the SPECIES object
  function renderFilters() {
    els.filterBar.innerHTML = "";
    const entries = [["all", "All Animals"]].concat(Object.keys(SPECIES).map(function (k) { return [k, SPECIES[k]]; }));
    entries.forEach(function (entry) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (entry[0] === state.species ? " active" : "");
      btn.dataset.species = entry[0];
      btn.textContent = entry[1];
      btn.setAttribute("aria-pressed", String(entry[0] === state.species));
      els.filterBar.appendChild(btn);
    });
  }

  function updateFilterButtons() {
    els.filterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
      const active = btn.dataset.species === state.species;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  // Whenever search / filter / sort change, go back to the first page
  function refreshGallery() {
    state.visibleCount = PAGE_SIZE;
    renderAnimals();
  }

  function loadMoreAnimals() {
    state.visibleCount += PAGE_SIZE;
    renderAnimals();
  }

  function resetFilters() {
    state.species = "all";
    state.query = "";
    state.sort = "default";
    els.searchInput.value = "";
    els.sortSelect.value = "default";
    els.clearSearch.hidden = true;
    updateFilterButtons();
    refreshGallery();
  }

  /* ---------------------------------------------------------
     8. ANIMAL OF THE DAY
     Same animal all day (based on the local date), new one tomorrow.
     --------------------------------------------------------- */
  function getAnimalOfTheDay() {
    const now = new Date();
    // Number of whole days since 1 Jan 1970 in the user's local calendar date
    const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
    return ANIMALS[dayNumber % ANIMALS.length];
  }

  function renderAnimalOfTheDay() {
    const a = getAnimalOfTheDay();
    els.dayCard.innerHTML =
      '<div class="day-media"><img src="' + escapeHTML(a.image) + '" alt="' + escapeHTML(a.name + ", a " + a.breed) + '" width="800" height="600"></div>' +
      '<div class="day-info">' +
        '<span class="eyebrow">' + escapeHTML(speciesSingular(a.species)) + ' · ' + escapeHTML(a.breed) + '</span>' +
        '<h3>' + escapeHTML(a.name) + '</h3>' +
        '<p>' + escapeHTML(a.description) + '</p>' +
        '<div class="day-fact"><strong>Did you know?</strong>' + escapeHTML(a.facts[0]) + '</div>' +
        '<button class="btn btn-primary" type="button" data-details-id="' + a.id + '">Meet ' + escapeHTML(a.name) + '</button>' +
      '</div>';
  }

  /* ---------------------------------------------------------
     9. MODAL
     --------------------------------------------------------- */
  function openAnimalModal(id, triggerEl) {
    const a = getAnimalById(id);
    if (!a) return;

    // Remember where focus was so we can return it on close
    if (!state.currentModalId) {
      state.lastFocused = triggerEl || document.activeElement;
    }
    state.currentModalId = a.id;

    els.modalImage.src = a.image;
    els.modalImage.alt = a.name + ", a " + a.breed + " " + speciesSingular(a.species).toLowerCase();
    els.modalSpecies.textContent = speciesLabel(a.species);
    els.modalTitle.textContent = a.name;
    els.modalBreed.textContent = a.breed;
    els.modalDescription.textContent = a.description;

    els.modalFacts.innerHTML = "";
    a.facts.forEach(function (fact) {
      const li = document.createElement("li");
      li.textContent = fact;
      els.modalFacts.appendChild(li);
    });

    els.modalFav.dataset.favId = a.id;
    setFavButtonState(els.modalFav, isFavorite(a.id));

    els.modalBackdrop.hidden = false;
    document.body.classList.add("no-scroll");
    els.modal.scrollTop = 0;
    els.modalClose.focus();
  }

  function closeAnimalModal() {
    if (els.modalBackdrop.hidden) return;
    els.modalBackdrop.hidden = true;
    document.body.classList.remove("no-scroll");
    state.currentModalId = null;
    if (state.lastFocused && typeof state.lastFocused.focus === "function" && document.contains(state.lastFocused)) {
      state.lastFocused.focus();
    }
    state.lastFocused = null;
  }

  // Keep Tab / Shift+Tab inside the open modal
  function trapFocus(event) {
    const focusable = els.modal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------------------------------------------------------
     10. RANDOM DISCOVERY
     --------------------------------------------------------- */
  function discoverRandomAnimal(triggerEl) {
    let pick;
    // Avoid showing the same animal twice in a row
    do {
      pick = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    } while (ANIMALS.length > 1 && pick.id === state.currentModalId);
    openAnimalModal(pick.id, triggerEl);
  }

  /* ---------------------------------------------------------
     11. THEME (dark mode)
     --------------------------------------------------------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const dark = theme === "dark";
    els.themeToggle.setAttribute("aria-pressed", String(dark));
    els.themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    els.themeToggle.querySelector(".theme-icon").textContent = dark ? "☀️" : "🌙";
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (err) { /* ignore */ }
    if (!saved) {
      // First visit: follow the system preference
      saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(saved);
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* ignore */ }
  }

  /* ---------------------------------------------------------
     12. MOBILE NAV
     --------------------------------------------------------- */
  function setMenu(open) {
    els.siteNav.classList.toggle("open", open);
    els.menuToggle.setAttribute("aria-expanded", String(open));
    els.menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  /* ---------------------------------------------------------
     13. EVENT LISTENERS
     --------------------------------------------------------- */
  function bindEvents() {
    // Mobile menu
    els.menuToggle.addEventListener("click", function () {
      setMenu(els.menuToggle.getAttribute("aria-expanded") !== "true");
    });
    els.siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Theme
    els.themeToggle.addEventListener("click", toggleTheme);

    // Species filter buttons
    els.filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      state.species = btn.dataset.species;
      updateFilterButtons();
      refreshGallery();
    });

    // Live search
    els.searchInput.addEventListener("input", function () {
      state.query = els.searchInput.value;
      els.clearSearch.hidden = state.query === "";
      refreshGallery();
    });
    els.clearSearch.addEventListener("click", function () {
      els.searchInput.value = "";
      state.query = "";
      els.clearSearch.hidden = true;
      refreshGallery();
      els.searchInput.focus();
    });

    // Sorting
    els.sortSelect.addEventListener("change", function () {
      state.sort = els.sortSelect.value;
      refreshGallery();
    });

    // Load more, reset
    els.loadMoreBtn.addEventListener("click", loadMoreAnimals);
    els.resetFilters.addEventListener("click", resetFilters);

    // Random discovery buttons
    els.randomBtn.addEventListener("click", function () { discoverRandomAnimal(els.randomBtn); });
    els.heroRandomBtn.addEventListener("click", function () { discoverRandomAnimal(els.heroRandomBtn); });
    els.modalRandom.addEventListener("click", function () { discoverRandomAnimal(els.modalRandom); });

    // One delegated click handler for hearts and "View Details" buttons
    // (works in the gallery, the favorites list and the Animal of the Day card)
    document.addEventListener("click", function (e) {
      const favBtn = e.target.closest("[data-fav-id]");
      if (favBtn) {
        toggleFavorite(favBtn.dataset.favId);
        return;
      }
      const detailsBtn = e.target.closest("[data-details-id]");
      if (detailsBtn) {
        openAnimalModal(detailsBtn.dataset.detailsId, detailsBtn);
      }
    });

    // Modal closing: button, backdrop click, Escape
    els.modalClose.addEventListener("click", closeAnimalModal);
    els.modalBackdrop.addEventListener("click", function (e) {
      if (e.target === els.modalBackdrop) closeAnimalModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (!els.modalBackdrop.hidden) closeAnimalModal();
        else setMenu(false);
      } else if (e.key === "Tab" && !els.modalBackdrop.hidden) {
        trapFocus(e);
      }
    });

    // Broken-image fallback. "error" events don't bubble, so listen in the capture phase.
    document.addEventListener("error", function (e) {
      const img = e.target;
      if (img && img.tagName === "IMG" && img.src !== FALLBACK_IMAGE && !img.dataset.failed) {
        img.dataset.failed = "true";
        img.src = FALLBACK_IMAGE;
      }
    }, true);
  }

  /* ---------------------------------------------------------
     14. INIT
     --------------------------------------------------------- */
  function init() {
    initTheme();

    // Hero stats and footer year
    els.statAnimals.textContent = ANIMALS.length;
    els.statSpecies.textContent = Object.keys(SPECIES).length;
    els.currentYear.textContent = new Date().getFullYear();

    renderFilters();
    renderAnimalOfTheDay();
    renderAnimals();
    updateFavoriteUI();
    bindEvents();
  }

  init();
})();
