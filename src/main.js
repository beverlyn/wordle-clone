// --- Constants and State ---
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const FLIP_ANIMATION_DURATION = 350; // ms per tile
const SHAKE_ANIMATION_DURATION = 500; // ms

// Word lists (should be uppercase)
// For a real app, fetch these or use a larger, more comprehensive list.
const TARGET_WORDS_LIST = ["ABOUT", "ALERT", "ARGUE", "BEACH", "BRAIN", "BREAD", "BRING", "CHAIR", "CLEAN", "CLOCK", "CLOUD", "CRANE", "CREAM", "DANCE", "DREAM", "DRINK", "EARTH", "ENJOY", "EQUAL", "EXACT", "FIELD", "FIGHT", "FLOOR", "FRUIT", "GHOST", "GIANT", "GLASS", "GRANT", "GRASS", "GREEN", "GROUP", "GUARD", "GUESS", "HEART", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE", "INPUT", "ISSUE", "JUDGE", "KNIFE", "LARGE", "LAUGH", "LEARN", "LEAVE", "LIGHT", "LIMIT", "LOCAL", "LOGIC", "LUCKY", "LUNCH", "MAGIC", "MAJOR", "MARCH", "MATCH", "METAL", "MODEL", "MONEY", "MONTH", "MORAL", "MOUSE", "MUSIC", "NEVER", "NIGHT", "NOISE", "NORTH", "NOVEL", "NURSE", "OCEAN", "OFFER", "ORDER", "OTHER", "OWNER", "PAINT", "PANEL", "PAPER", "PARTY", "PEACE", "PHONE", "PHOTO", "PIECE", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIZE", "PROOF", "PROUD", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH", "REACT", "READY", "REALM", "REPLY", "RIGHT", "RIVER", "ROUND", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCARE", "SCOPE", "SCORE", "SENSE", "SERVE", "SHADE", "SHAKE", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF", "SHIFT", "SHINE", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWS", "SIGHT", "SILVA", "SINCE", "SKILL", "SLEEP", "SLICE", "SMALL", "SMART", "SMILE", "SMOKE", "SOLID", "SOLVE", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPICE", "SPORT", "STAFF", "STAGE", "STAND", "STARE", "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK", "STONE", "STORE", "STORM", "STORY", "STUDY", "STUFF", "STYLE", "SUGAR", "TABLE", "TASTE", "TEACH", "THANK", "THEME", "THERE", "THESE", "THING", "THINK", "THREE", "THROW", "TIGER", "TIMER", "TIRED", "TITLE", "TODAY", "TOOTH", "TOPIC", "TOTAL", "TOUCH", "TOWER", "TRACK", "TRADE", "TRAIL", "TRAIN", "TRASH", "TREAT", "TREND", "TRIAL", "TRIBE", "TRICK", "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE", "UNCLE", "UNDER", "UNION", "UNTIL", "UPPER", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WEARY", "WEIGH", "WHALE", "WHEAT", "WHILE", "WHITE", "WHOLE", "WOMAN", "WORLD", "WORRY", "WORSE", "WOULD", "WRITE", "WRONG", "YACHT", "YEARN", "YIELD", "YOUNG", "YOUTH", "ZEBRA"];
const VALID_GUESSES_LIST = [...new Set([...TARGET_WORDS_LIST, ...["ABACK","ABASE","ABATE","ABBEY","ABBOT","ABHOR","ABIDE","ABLED","ABODE","ABORT","ABOUT","ABOVE","ABUSE","ABYSS","ACORN","ACRID","ACTOR","ACUTE","ADAGE","ADAPT","ADEPT","ADMIN","ADMIT","ADOBE","ADOPT","ADORE","ADORN","ADULT","AFFIX","AFIRE","AFOOT","AFOUL","AFTER","AGAIN","AGAPE","AGATE","AGENT","AGILE","AGING","AGLOW","AGONY","AGREE","AHEAD","AIDER","AISLE","ALARM","ALBUM","ALERT","ALGAE","ALIBI","ALIEN","ALIGN","ALIKE","ALIVE","ALLAY","ALLEY","ALLOT","ALLOW","ALLOY","ALOFT","ALONE","ALONG","ALOOF","ALOUD","ALPHA","ALTAR","ALTER","AMASS","AMAZE","AMBER","AMBLE","AMEND","AMISS","AMITY","AMONG","AMPLE","AMPLY","AMUSE","ANGEL","ANGER","ANGLE","ANGRY","ANGST","ANIME","ANKLE","ANNEX","ANNOY","ANNUL","ANODE","ANTIC","ANVIL","AORTA","APART","APHID","APING","APNEA","APPLE","APPLY","APRON","APTLY","ARBOR","ARDOR","ARENA","ARGUE","ARISE","ARMOR","AROMA","AROSE","ARRAY","ARROW","ARSON","ARTSY","ASCOT","ASHEN","ASIDE","ASKEW","ASSAY","ASSET","ATOLL","ATONE","ATTIC","AUDIO","AUDIT","AVAIL","AVERT","AVIAN","AVOID","AWAIT","AWAKE","AWARD","AWARE","AWASH","AWFUL","AWOKE","AXIAL","AXIOM","AXION","AZURE","BACON","BADGE","BADLY","BAGEL","BAGGY","BAKER","BALER","BALMY","BANAL","BANJO","BARGE","BARON","BASAL","BASIC","BASIL","BASIN","BASIS","BASTE","BATCH","BATHE","BATON","BATTY","BAWDY","BAYOU","BEACH","BEADY","BEARD","BEAST","BEECH","BEEFY","BEFIT","BEGAN","BEGAT","BEGET","BEGIN","BEGUN","BEING","BELCH","BELIE","BELLE","BELLY","BELOW","BENCH","BERET","BERRY","BERTH","BESET","BETEL","BEVEL","BEZEL","BIBLE","BICEP","BIDDY","BIGOT","BILGE","BILLY","BINGE","BINGO","BIOME","BIRCH","BIRTH","BISON","BITTY","BLACK","BLADE","BLAME","BLAND","BLANK","BLARE","BLAST","BLAZE","BLEAK","BLEAT","BLEED","BLEEP","BLEND","BLESS","BLIMP","BLIND","BLINK","BLISS","BLITZ","BLOAT","BLOCK","BLOKE","BLOND","BLOOD","BLOOM","BLOWN","BLUER","BLUFF","BLUNT","BLURB","BLURT","BLUSH","BOARD","BOAST","BOBBY","BONEY","BONGO","BONUS","BOOBY","BOOST","BOOTH","BOOTY","BOOZE","BOOZY","BORAX","BORNE","BOSOM","BOSSY","BOTCH","BOUGH","BOULE","BOUND","BOWEL","BOXER","BRACE","BRAID","BRAIN","BRAKE","BRAND","BRASH","BRASS","BRAVE","BRAVO","BRAWL","BRAWN","BREAD","BREAK","BREED","BRIAR","BRIBE","BRICK","BRIDE","BRIEF","BRINE","BRING","BRINK","BRINY","BRISK","BROAD","BROIL","BROKE","BROOD","BROOK","BROOM","BROTH","BROWN","BRUNT","BRUSH","BRUTE","BUDDY","BUDGE","BUGGY","BUILD","BUILT","BULGE","BULKY","BULLY","BUNCH","BUNNY","BURLY","BURNT","BURST","BUSED","BUSHY","BUTCH","BUTTE","BUXOM","BUYER","BYLAW","CABAL","CABBY","CABIN","CABLE","CACAO","CACHE","CACTI","CADDY","CADET","CAGEY","CAIRN","CAMEL","CAMEO","CANAL","CANDY","CANNY","CANOE","CANON","CAPER","CAPUT","CARAT","CARGO","CAROL","CARRY","CARVE","CASAL","CASTE","CATCH","CATER","CATTY","CAULK","CAUSE","CAVIL","CEASE","CEDAR","CELLO","CHAFE","CHAFF","CHAIN","CHAIR","CHALK","CHAMP","CHANT","CHAOS","CHARD","CHARM","CHART","CHASE","CHASM","CHEAP","CHEAT","CHECK","CHEEK","CHEER","CHESS","CHEST","CHICK","CHIDE","CHIEF","CHILD","CHILI","CHILL","CHIME","CHINA","CHIRP","CHOCK","CHOIR","CHOKE","CHORD","CHORE","CHOSE","CHUCK","CHUMP","CHUNK","CHURN","CHUTE","CIDER","CIGAR","CINCH","CIRCA","CIVIC","CIVIL","CLACK","CLAIM","CLAMP","CLANG","CLANK","CLASH","CLASP","CLASS","CLEAN","CLEAR","CLEAT","CLEFT","CLERK","CLICK","CLIFF","CLIMB","CLING","CLINK","CLOAK","CLOCK","CLONE","CLOSE","CLOTH","CLOUD","CLOUT","CLOVE","CLOWN","CLUCK","CLUED","CLUMP","CLUNG","COACH","COAST","COBRA","COCOA","COLON","COLOR","COMET","COMFY","COMIC","COMMA","CONCH","CONDO","CONIC","COPSE","CORAL","CORER","CORNY","COUCH","COUGH","COULD","COUNT","COUPE","COURT","COVEN","COVER","COVET","COVEY","COWER","COYLY","CRACK","CRAFT","CRANE","CRANK","CRASH","CRASS","CRATE","CRAVE","CRAWL","CRAZE","CRAZY","CREAK","CREAM","CREDO","CREED","CREEK","CREEP","CREME","CREPE","CREPT","CRESS","CREST","CRICK","CRIED","CRIER","CRIME","CRIMP","CRISP","CROAK","CROCK","CRONE","CRONY","CROOK","CROSS","CROUP","CROWD","CROWN","CRUDE","CRUEL","CRUMB","CRUMP","CRUSH","CRUST","CRYPT","CUBIC","CUMIN","CURIO","CURLY","CURRY","CURSE","CURVE","CURVY","CUTIE","CYBER","CYCLE","CYNIC","DADDY","DAILY","DAIRY","DAISY","DALLY","DANCE","DANDY","DATUM","DAUNT","DEALT","DEATH","DEBAR","DEBIT","DEBUG","DEBUT","DECAL","DECAY","DECOR","DECOY","DECRY","DEFER","DEIGN","DEITY","DELAY","DELTA","DELVE","DEMON","DEMUR","DENIM","DENSE","DEPOT","DEPTH","DERBY","DETER","DETOX","DEUCE","DEVIL","DIARY","DICEY","DIGIT","DILLY","DIMLY","DINER","DINGO","DINGY","DIODE","DIRGE","DIRTY","DISCO","DITCH","DITTO","DITTY","DIVER","DIZZY","DODGE","DODGY","DOGMA","DOING","DOLLY","DONOR","DONUT","DOPEY","DOUBT","DOUGH","DOWDY","DOWEL","DOWNY","DOWRY","DOZEN","DRAFT","DRAIN","DRAKE","DRAMA","DRANK","DRAPE","DRAWL","DRAWN","DREAD","DREAM","DRESS","DRIED","DRIER","DRIFT","DRILL","DRINK","DRIVE","DROIT","DROLL","DRONE","DROOL","DROOP","DROSS","DROVE","DROWN","DRUID","DRUNK","DRYER","DRYLY","DUCHY","DULLY","DUMMY","DUMPY","DUNCE","DUSKY","DUSTY","DUTCH","DUVET","DWARF","DWELL","DWELT","DYING","EAGER","EAGLE","EARLY","EARTH","EASEL","EATEN","EATER","EBONY","ECLAT","EDICT","EDIFY","EERIE","EGRET","EIGHT","EJECT","EKING","ELATE","ELBOW","ELDER","ELECT","ELEGY","ELFIN","ELIDE","ELITE","ELOPE","ELUDE","EMAIL","EMBED","EMBER","EMCEE","EMPTY","ENACT","ENDOW","ENEMA","ENEMY","ENJOY","ENNUI","ENSUE","ENTER","ENTRY","ENVOY","EPOCH","EPOXY","EQUAL","EQUIP","ERASE","ERECT","ERODE","ERROR","ERUPT","ESSAY","ESTER","ETHER","ETHIC","ETHOS","ETUDE","EVADE","EVENT","EVERY","EVICT","EVOKE","EXACT","EXALT","EXCEL","EXERT","EXILE","EXIST","EXPEL","EXTOL","EXTRA","EXULT","EYING","FABLE","FACET","FAINT","FAIRY","FAITH","FALSE","FANCY","FANNY","FARCE","FATAL","FATTY","FAULT","FAUNA","FAVOR","FEAST","FECAL","FEIGN","FELLA","FELON","FEMME","FEMUR","FENCE","FERAL","FERRY","FETAL","FETCH","FETID","FETUS","FEVER","FEWER","FIBER","FICUS","FIELD","FIEND","FIERY","FIFTH","FIFTY","FIGHT","FILER","FILET","FILLY","FILMY","FILTH","FINAL","FINCH","FINER","FIRST","FISHY","FIXER","FIZZY","FJORD","FLACK","FLAIL","FLAIR","FLAKE","FLAKY","FLAME","FLANK","FLARE","FLASH","FLASK","FLECK","FLEET","FLESH","FLICK","FLIER","FLING","FLINT","FLIRT","FLOAT","FLOCK","FLOOD","FLOOR","FLOSS","FLOUR","FLOUT","FLOWN","FLUFF","FLUID","FLUKE","FLUME","FLUNG","FLUNK","FLUSH","FLUTE","FLYER","FOAMY","FOCAL","FOCUS","FOGGY","FOIST","FOLIO","FOLLY","FORAY","FORCE","FORGE","FORGO","FORTE","FORTH","FORTY","FORUM","FOUND","FOYER","FRAIL","FRAME","FRANK","FRAUD","FREAK","FREED","FREER","FRESH","FRIAR","FRIED","FRILL","FRISK","FRITZ","FROCK","FROND","FRONT","FROST","FROTH","FROWN","FROZE","FRUIT","FUDGE","FUGUE","FULLY","FUMED","FUNKY","FUNNY","FUROR","FURRY","FUSSY","FUZZY","GAFFE","GAILY","GAMER","GAMMA","GAMUT","GASSY","GAUDY","GAUGE","GAUNT","GAUZE","GAVEL","GAWKY","GAYER","GAYLY","GAZER","GECKO","GEEKY","GEESE","GENIE","GENRE","GHOST","GHOUL","GIANT","GIDDY","GIPSY","GIRLY","GIRTH","GIVEN","GIVER","GLADE","GLAND","GLARE","GLASS","GLAZE","GLEAM","GLEAN","GLIDE","GLINT","GLOAT","GLOBE","GLOOM","GLORY","GLOSS","GLOVE","GLYPH","GNASH","GNOME","GODLY","GOING","GOLEM","GOLLY","GONAD","GONER","GOODY","GOOEY","GOOFY","GOOSE","GORGE","GOUGE","GOURD","GRACE","GRADE","GRAFT","GRAIL","GRAIN","GRAND","GRANT","GRAPE","GRAPH","GRASP","GRASS","GRATE","GRAVE","GRAVY","GRAZE","GREAT","GREED","GREEN","GREET","GRIEF","GRILL","GRIME","GRIMY","GRIND","GRIPE","GROAN","GROIN","GROOM","GROPE","GROSS","GROUP","GROUT","GROVE","GROWL","GROWN","GRUEL","GRUFF","GRUNT","GUARD","GUESS","GUEST","GUIDE","GUILD","GUILE","GUILT","GUISE","GULCH","GULLY","GUMBO","GUMMY","GUPPY","GUSTO","GUSTY","GYPSY","HABIT","HAIRY","HALVE","HANDY","HAPPY","HARDY","HAREM","HARPY","HARRY","HARSH","HASTE","HASTY","HATCH","HATED","HATER","HAUNT","HAUTE","HAVEN","HAVOC","HAZEL","HEADY","HEARD","HEART","HEATH","HEAVE","HEAVY","HEDGE","HEFTY","HEIST","HELIX","HELLO","HENCE","HERON","HILLY","HINGE","HOBBY","HOIST","HOLLY","HOMER","HONEY","HONOR","HORDE","HORNY","HORSE","HOTEL","HOTLY","HOUND","HOUSE","HOVEL","HOVER","HOWDY","HUMAN","HUMID","HUMOR","HUMPH","HUMUS","HUNCH","HUNKY","HURRY","HUSKY","HUSSY","HUTCH","HYDRO","HYENA","HYMEN","HYPER","ICILY","ICING","IDEAL","IDIOM","IDIOT","IDLER","IDYLL","IGLOO","ILIAC","IMAGE","IMBUE","IMPEL","IMPLY","INANE","INBOX","INCUR","INDEX","INEPT","INERT","INFER","INGOT","INLAY","INLET","INNER","INPUT","INTER","INTRO","IONIC","IRATE","IRONY","ISLET","ISSUE","ITCHY","IVORY","JAUNT","JAZZY","JELLY","JERKY","JETTY","JEWEL","JIFFY","JOINT","JOIST","JOKER","JOLLY","JOUST","JUDGE","JUICE","JUICY","JUMBO","JUMPY","JUNTA","JUNTO","JUROR","KAPPA","KARMA","KAYAK","KEBAB","KHAKI","KINKY","KIOSK","KITTY","KNACK","KNAVE","KNEAD","KNEED","KNEEL","KNELT","KNIFE","KNOCK","KNOLL","KNOWN","KOALA","KRILL","LABEL","LABOR","LADEN","LADLE","LAGER","LANCE","LANKY","LAPEL","LAPSE","LARGE","LARVA","LASSO","LATCH","LATER","LATHE","LATTE","LAUGH","LAYER","LEACH","LEAFY","LEAKY","LEANT","LEAPT","LEARN","LEASE","LEASH","LEAST","LEAVE","LEDGE","LEECH","LEERY","LEFTY","LEGAL","LEGGY","LEMON","LEMUR","LENDER","LEPER","LEVEL","LEVER","LIBEL","LIEGE","LIGHT","LIKEN","LILAC","LIMBO","LIMIT","LINEN","LINER","LINGO","LIPID","LITHE","LIVER","LIVID","LLAMA","LOAMY","LOATH","LOBBY","LOCAL","LOCUS","LODGE","LOFTY","LOGIC","LOGIN","LOOPY","LOOSE","LORRY","LOSER","LOUSE","LOUSY","LOVER","LOWER","LOWLY","LOYAL","LUCID","LUCKY","LUMEN","LUMPY","LUNAR","LUNCH","LUNGE","LUPUS","LURCH","LURID","LUSTY","LYING","LYMPH","LYRIC","MACAW","MACHO","MACRO","MADAM","MADLY","MAFIA","MAGIC","MAGMA","MAIZE","MAJOR","MAKER","MAMBO","MAMMA","MAMMY","MANGA","MANGE","MANGO","MANGY","MANIA","MANIC","MANLY","MANOR","MAPLE","MARCH","MARRY","MARSH","MASON","MASSE","MATCH","MATEY","MAUVE","MAXIM","MAYBE","MAYOR","MEALY","MEANT","MEATY","MECCA","MEDAL","MEDIA","MEDIC","MELEE","MELON","MERCY","MERGE","MERIT","MERRY","METAL","METER","METRO","MICRO","MIDGE","MIDST","MIGHT","MILKY","MIMIC","MINCE","MINER","MINIM","MINOR","MINTY","MINUS","MIRTH","MISER","MISSY","MOCHA","MODAL","MODEL","MODEM","MOGUL","MOIST","MOLAR","MOLDY","MONEY","MONTH","MOODY","MOOSE","MORAL","MORON","MORPH","MOSSY","MOTEL","MOTIF","MOTOR","MOTTO","MOULT","MOUND","MOUNT","MOURN","MOUSE","MOUTH","MOVER","MOVIE","MOWER","MUCKY","MUCUS","MUDDY","MULCH","MUMMY","MUNCH","MURAL","MURKY","MUSHY","MUSIC","MUSKY","MUSTY","MYRRH","NADIR","NAIVE","NANNY","NASAL","NASTY","NATAL","NAVAL","NEEDY","NEIGH","NERDY","NERVE","NEVER","NEWER","NEWLY","NICER","NICHE","NIECE","NIGHT","NINJA","NINNY","NINTH","NOBLE","NOBLY","NOISE","NOISY","NOMAD","NOOSE","NORTH","NOSEY","NOTCH","NOVEL","NUDGE","NURSE","NUTTY","NYLON","NYMPH","OAKEN","OBESE","OCCUR","OCEAN","OCTAL","OCTET","ODDER","ODDLY","OFFAL","OFFER","OFTEN","OLDEN","OLDER","OLIVE","OMBRE","OMEGA","ONION","ONSET","OPERA","OPINE","OPIUM","OPTIC","ORBIT","ORDER","ORGAN","OTHER","OTTER","OUGHT","OUNCE","OUTDO","OUTER","OUTGO","OVARY","OVATE","OVERT","OVINE","OVOID","OWING","OWNER","OXIDE","OZONE","PADDY","PAGAN","PAINT","PALER","PALSY","PANEL","PANIC","PANSY","PAPAL","PAPER","PARER","PARKA","PARRY","PARSE","PARTY","PASTA","PASTE","PASTY","PATCH","PATIO","PATSY","PATTY","PAUSE","PAVEY","PAYEE","PAYER","PEACE","PEACH","PEARL","PECAN","PEDAL","PENAL","PENCE","PENNE","PENNY","PERCH","PERIL","PERKY","PESKY","PESTO","PETAL","PETTY","PHASE","PHONE","PHONY","PHOTO","PIANO","PICKY","PIECE","PIETY","PIGGY","PILOT","PINCH","PINEY","PINKY","PINTO","PIPER","PIQUE","PITCH","PITHY","PIVOT","PIXEL","PIXIE","PIZZA","PLACE","PLAID","PLAIN","PLAIT","PLANE","PLANK","PLANT","PLATE","PLAZA","PLEAD","PLEAT","PLIED","PLIER","PLUCK","PLUMB","PLUME","PLUMP","PLUNK","PLUSH","POESY","POINT","POISE","POKER","POLAR","POLKA","POLYP","POOCH","POPPY","PORCH","POSER","POSIT","POSSE","POUCH","POUND","POUTY","POWER","PRANK","PRAWN","PREEN","PRESS","PRICE","PRICK","PRIDE","PRIED","PRIME","PRIMO","PRINT","PRIOR","PRISM","PRIVY","PRIZE","PROBE","PRONE","PRONG","PROOF","PROSE","PROUD","PROVE","PROWL","PROXY","PRUDE","PRUNE","PSALM","PUBIC","PUDGY","PUFFY","PULLY","PULPY","PULSE","PUNCH","PUPIL","PUPPY","PUREE","PURER","PURGE","PURSE","PUSHY","PUTTY","PYGMY","QUACK","QUAIL","QUAKE","QUALM","QUARK","QUART","QUASH","QUASI","QUEEN","QUEER","QUELL","QUERY","QUEST","QUEUE","QUICK","QUIET","QUILL","QUILT","QUITE","QUOTH","RABBI","RABID","RACER","RADAR","RADIO","RADON","RAFFY","RAINY","RAISE","RAJAH","RALLY","RALPH","RAMEN","RANCH","RANDY","RANGE","RAPID","RARER","RASCAL","RATIO","RATTY","RAVEN","RAYON","RAZOR","REACH","REACT","READS","READY","REALM","REARM","REBAR","REBEL","REBUS","RECAP","RECUR","REDEE","REEFY","REEKY","REFER","REFIX","REGAL","REHAB","REIGN","RELAX","RELAY","RELIC","REMIM","REMIT","RENAL","RENEW","REPAY","REPEL","REPLY","RERUN","RESET","RESIN","RETCH","RETRO","RETRY","REUSE","REVEL","REVUE","RHINO","RHYME","RIDER","RIDGE","RIFLE","RIGHT","RIGID","RIGOR","RINSE","RIPEN","RIPER","RISEN","RISER","RISKY","RIVAL","RIVER","RIVET","ROACH","ROAST","ROBIN","ROBOT","ROCKY","RODEO","ROGER","ROGUE","ROOMY","ROOST","ROTOR","ROUGE","ROUGH","ROUND","ROUSE","ROUTE","ROVER","ROWDY","ROWER","ROYAL","RUDDY","RUDER","RUGBY","RULER","RUMBA","RUMOR","RUPEE","RURAL","RUSTY","SADLY","SAFER","SAGEY","SAINT","SALAD","SALLY","SALON","SALSA","SALTY","SALVE","SALVO","SANDY","SANER","SAPPY","SASSY","SATIN","SATYR","SAUCE","SAUCY","SAUNA","SAUTE","SAVOR","SAVOY","SCALD","SCALE","SCALP","SCALY","SCAMP","SCANT","SCARE","SCARF","SCARY","SCENE","SCENT","SCOLD","SCOPE","SCORE","SCORN","SCOUR","SCOUT","SCOWL","SCRAM","SCRAP","SCREE","SCREW","SCRUB","SCRUM","SCUBA","SEDAN","SEEDY","SEEMY","SEIZE","SELLA","SEMIM","SENDA","SENNA","SENSE","SEPIA","SERUM","SERVE","SETUP","SEVEN","SEVER","SEWER","SHACK","SHADE","SHADY","SHAFT","SHAKE","SHAKY","SHALE","SHALL","SHAME","SHANK","SHAPE","SHARE","SHARK","SHARP","SHAVE","SHAWL","SHEAR","SHEEN","SHEEP","SHEER","SHEET","SHEIK","SHELF","SHELL","SHIED","SHIFT","SHILL","SHINE","SHINY","SHIRE","SHIRK","SHIRT","SHOAL","SHOCK","SHONE","SHOOK","SHOOT","SHORE","SHORN","SHORT","SHOUT","SHOVE","SHOWN","SHOWY","SHRED","SHREW","SHRUB","SHRUG","SHUCK","SHUNT","SHUSH","SHYLY","SIEGE","SIEVE","SIGHT","SIGMA","SILKY","SILLY","SILVA","SILVER","SIMIL","SINGE","SIPID","SIREN","SISAL","SISYY","SITUS","SIXTH","SIXTY","SKATE","SKEET","SKEIN","SKIER","SKIFF","SKILL","SKIMP","SKINY","SKIRT","SKULK","SKULL","SKUNK","SLACK","SLAIN","SLAKE","SLANG","SLANT","SLASH","SLATE","SLAVE","SLEEK","SLEEP","SLEET","SLEPT","SLICE","SLICK","SLIDE","SLIME","SLIMY","SLING","SLINK","SLOSH","SLOTH","SLUMP","SLUNG","SLUNK","SLURP","SLUSH","SLYLY","SMACK","SMALL","SMART","SMASH","SMEAR","SMELL","SMELT","SMILE","SMIRK","SMITE","SMITH","SMOCK","SMOGY","SMOKE","SMOKY","SMOTE","SNAFU","SNAIL","SNAKE","SNAKY","SNARE","SNARL","SNEAK","SNEER","SNIDE","SNIFF","SNIPE","SNOOP","SNORE","SNORT","SNOUT","SNOWY","SNUCK","SNUFF","SOAPY","SOBER","SOCKO","SODDY","SODOM","SOLAR","SOLID","SOLOS","SOLVE","SOMAL","SONAR","SONIC","SOOTH","SOOTY","SOPPY","SORRY","SOUND","SOUPY","SOURY","SOUTH","SOWER","SPACE","SPADE","SPANK","SPARE","SPARK","SPASM","SPATE","SPAWN","SPEAK","SPEAR","SPECK","SPEED","SPELL","SPELT","SPEND","SPENT","SPERM","SPICE","SPICY","SPIED","SPIEL","SPIKE","SPIKY","SPILL","SPILT","SPINE","SPINY","SPIRE","SPITE","SPLAT","SPOIL","SPOKE","SPOOF","SPOOK","SPOOL","SPOON","SPORE","SPORT","SPOTS","SPOUT","SPRAY","SPREE","SPRIG","SPUNK","SPURN","SPURT","SQUAD","SQUAT","SQUIB","SQUID","STACK","STAFF","STAGE","STAID","STAIN","STAIR","STAKE","STALE","STALK","STALL","STAMP","STAND","STANK","STARE","STARK","STARS","START","STATE","STAVE","STEAD","STEAK","STEAL","STEAM","STEED","STEEL","STEEP","STEER","STEIN","STERN","STICK","STIFF","STILL","STILT","STING","STINK","STINT","STIRK","STOCK","STOIC","STOKE","STOLE","STOMP","STONE","STONY","STOOD","STOOL","STOOP","STORE","STORK","STORM","STORY","STOUT","STOVE","STRAP","STRAW","STRAY","STREW","STRIP","STRUT","STUCK","STUDY","STUFF","STUMP","STUNG","STUNK","STUNT","STYLE","SUAVE","SUGAR","SUING","SUITE","SULKY","SULLY","SUMAC","SUNNY","SUPER","SURAL","SURER","SURGE","SURFY","SUSHI","SWAMI","SWAMP","SWARM","SWASH","SWATH","SWEAR","SWEAT","SWEEP","SWEET","SWELL","SWEPT","SWIFT","SWILL","SWINE","SWING","SWIRL","SWISH","SWOON","SWOOP","SWORD","SWORE","SWORN","SWUNG","SYBIL","SYNOD","SYRUP","TABBY","TABLE","TABOO","TACIT","TACKY","TAFFY","TAILS","TAINT","TAKEN","TAKER","TALLY","TALON","TAMER","TANGO","TANGY","TANKA","TAPAS","TAPER","TAPIR","TAPOO","TARDY","TAROT","TASSE","TASTE","TASTY","TATTY","TAUNT","TAWDR","TAWNY","TAXER","TEACH","TEARY","TEASE","TEDDY","TEEMO","TEETH","TELLA","TEMPO","TENDY","TENET","TENOR","TENSE","TENTH","TEPEE","TEPID","TERRA","TERSE","TESTY","THANK","THEFT","THEIR","THEME","THERE","THESE","THETA","THICK","THIEF","THIGH","THING","THINK","THIRD","THONG","THORN","THOSE","THREE","THREW","THROB","THROW","THRUM","THUMB","THUMP","THYME","TIARA","TIBIA","TIDAL","TIDDY","TIGER","TIGHT","TILDE","TIMER","TIMID","TINGE","TINNY","TIPSY","TIRED","TITAN","TITLE","TITRE","TOADY","TOAST","TODAY","TOILS","TOKEN","TOLLY","TONAL","TONER","TONGA","TONIC","TOOTH","TOPAZ","TOPER","TOPIC","TOPPY","TORCH","TORSO","TORUS","TOTAL","TOTEM","TOUCH","TOUGH","TOURN","TOWER","TOXIC","TOXIN","TRACE","TRACK","TRACT","TRADE","TRAIL","TRAIN","TRAIT","TRAMP","TRASH","TRAWL","TREAD","TREAT","TREES","TREND","TRIAD","TRIAL","TRIBE","TRICE","TRICK","TRIED","TRIPE","TRITE","TROLL","TROOP","TROPE","TROUT","TROVE","TROWY","TRUCE","TRUCK","TRUED","TRUER","TRULY","TRUMP","TRUNK","TRUSS","TRUST","TRUTH","TRYST","TUBAL","TUBER","TULIP","TULLE","TUMID","TUMMY","TUMOR","TUNDR","TUNED","TUNIC","TURBO","TUTOR","TWANG","TWEAK","TWEED","TWEEN","TWEEP","TWICE","TWINE","TWIRL","TWIXT","TYING","TYKES","TYPIC","UDDER","ULCER","ULTRA","UMBER","UMBRA","UNARM","UNBEF","UNCAP","UNCLE","UNCOS","UNDER","UNDID","UNDUE","UNFED","UNFIT","UNFIX","UNGOD","UNHIP","UNIFY","UNION","UNITE","UNITY","UNLAY","UNLIT","UNMAN","UNMET","UNMIX","UNPAY","UNPIN","UNRIG","UNRIP","UNSAY","UNSET","UNSET","UNSOW","UNSUN","UNTIE","UNTIL","UNWED","UNWET","UNWIT","UNWRO","UNZIP","UPEND","UPPER","UPSET","URATE","URBAN","URINE","USAGE","USHER","USING","USUAL","USURP","UTILE","UTTER","UVULA","VAGUE","VALET","VALID","VALOR","VALUE","VALVE","VAPID","VAULT","VAUNT","VEGAN","VENAL","VENDE","VENIN","VENOM","VENTE","VENUE","VERBE","VERBS","VERGE","VERSE","VERSO","VERVE","VESTA","VETCH","VEXTA","VIBEX","VICAR","VIDEO","VIEWY","VIGIL","VIGOR","VILLA","VINCA","VINYL","VIOLA","VIPER","VIRAL","VIREO","VIRGO","VIRID","VIRUS","VISAS","VISES","VISIT","VISNE","VISTA","VITAL","VITAS","VIVID","VIXEN","VOCAL","VODKA","VOGUE","VOICE","VOILA","VOLED","VOLTA","VOMIT","VOTER","VOUCH","VOWEL","VOXES","VOYER","VROOM","VULVA","VYING","WABBL","WACKO","WACKY","WADER","WAFER","WAGER","WAGON","WAIFS","WAILS","WAIST","WAIVE","WAKEN","WALER","WALKS","WALLA","WALLY","WALTZ","WANDR","WANEY","WANLY","WARBL","WARCH","WARDY","WARMS","WARNS","WARPS","WARTY","WASTE","WATCH","WATER","WATTS","WAVED","WAVER","WAXEN","WEAKN","WEALS","WEANS","WEARS","WEARY","WEAVE","WEBBY","WEDGE","WEEDY","WEENY","WEEPY","WEEST","WEIGH","WEIRD","WEKAS","WELCH","WELLS","WELSH","WELTS","WENCH","WHACK","WHALE","WHARF","WHEAT","WHEEL","WHELP","WHENM","WHERE","WHIFF","WHILE","WHINE","WHINY","WHIRL","WHISK","WHIST","WHITE","WHOLE","WHOOP","WHORL","WHOSE","WIDEN","WIDER","WIDOW","WIDTH","WIELD","WIFEY","WIGHT","WILCO","WILDY","WILDS","WILEY","WILLS","WILLY","WIMPY","WINCE","WINCH","WINDY","WINER","WINGS","WINKY","WINOS","WINZE","WIPER","WIRED","WIRES","WISDOM","WITCH","WITTY","WIVES","WIZEN","WOADS","WOKEN","WOMAN","WOMBY","WONKY","WOOER","WOOLY","WOOPS","WOOSY","WORDY","WORKS","WORLD","WORMS","WORMW","WORRY","WORSE","WORST","WORTH","WOULD","WOUND","WOVEN","WOWED","WRACK","WRANG","WRATH","WREAK","WRECK","WREST","WRICK","WRING","WRITE","WRONG","WROTE","WRUNG","WRYLY","YACHT","YAMEN","YAPOK","YAPPY","YARDS","YARER","YARFA","YARNS","YAULD","YAWED","YAWLS","YAWNS","YAWPS","YBORE","YEANS","YEARN","YEAST","YECCH","YELKS","YELLS","YELMS","YELPS","YENTA","YEPPE","YERBA","YERDS","YERKS","YESES","YESTS","YETIS","YETTS","YEUX","YIELD","YIKES","YLKED","YOBBO","YOBBY","YODEL","YOGHS","YOGIC","YOGIN","YOKED","YOKEL","YOLKS","YOLKY","YONIC","YORES","YOUNG","YOURS","YOUTH","YOWED","YOWES","YOWIE","YULEX","YUPON","YURTA","ZAPPY","ZEALS","ZEBEC","ZEBRA","ZERKS","ZEROS","ZESTY","ZETAS","ZILCH","ZILLY","ZINCS","ZINCY","ZINEB","ZINGY","ZIPPY","ZIRAM","ZLOTY","ZOEAE","ZOEAL","ZOEAS","ZOIDS","ZOMBI","ZONAL","ZONER","ZOOEA","ZOOKS","ZOOMS","ZOOID","ZOOEY"] ])];

let targetWord = '';
let currentGuess = [];
let currentRowIndex = 0;
let isGameOver = false;
let isProcessingInput = false; // To prevent multiple submissions

const gameBoard = document.getElementById('game-board');
const messageArea = document.getElementById('message-area');
const resetButton = document.getElementById('reset-button');

// --- Initialization ---
function getDailyWord() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const seed = today; // Simple seed based on date
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % TARGET_WORDS_LIST.length;
    return TARGET_WORDS_LIST[index];
}

function initializeGame() {
    targetWord = getDailyWord();
    // console.log("Today's word:", targetWord); // For debugging

    currentGuess = [];
    currentRowIndex = 0;
    isGameOver = false;
    isProcessingInput = false;
    gameBoard.innerHTML = '';
    messageArea.textContent = '';
    messageArea.classList.remove('text-[#FF6B6B]', 'text-[#A8E6CF]');


    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.classList.add(
          'grid',
          `grid-cols-${WORD_LENGTH}`, // grid-cols-5 (annotation for Tailwind)
          'gap-1.5',
          'sm:gap-2',
        );
        for (let j = 0; j < WORD_LENGTH; j++) {
            const tileContainer = document.createElement('div');
            tileContainer.classList.add(
                'tile-container',
                'w-12', 'h-12', 'sm:w-14', 'sm:h-14', 'md:w-16', 'md:h-16',
                'flex', 'items-center', 'justify-center',
                'text-2xl', 'sm:text-3xl', 'font-bold', 'uppercase',
                'rounded-lg',
                'transition-all', 'duration-100' // For active state
            );

            const tileInner = document.createElement('div');
            tileInner.classList.add('tile-inner');

            const tileFront = document.createElement('div');
            tileFront.classList.add(
                'tile-face', 'bg-[#E3E8EF]', 'border-2', 'border-[#E3E8EF]'
            );

            const tileBack = document.createElement('div');
            tileBack.classList.add('tile-face', 'tile-back'); // Back starts empty

            tileInner.appendChild(tileFront);
            tileInner.appendChild(tileBack);
            tileContainer.appendChild(tileInner);
            row.appendChild(tileContainer);
        }
        gameBoard.appendChild(row);
    }
    loadGameState(); // Load after board is created
    updateBoard();
}

// --- Local Storage ---
function saveGameState() {
    if (isGameOver) { // Don't save if game is over, allow new game on next open
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('wordleCloneState', JSON.stringify({
            targetWord: targetWord,
            date: today,
            gameOver: true,
            won: currentGuess.join('') === targetWord && currentRowIndex > 0 // check if won
        }));
        return;
    }
    const gameState = {
        targetWord: targetWord,
        guesses: [],
        currentRowIndex: currentRowIndex,
        date: new Date().toISOString().split('T')[0] // Save current date
    };
    for (let i = 0; i < currentRowIndex; i++) {
        const rowTiles = gameBoard.children[i].children;
        let guessWord = "";
        for (let tile of rowTiles) {
            guessWord += tile.querySelector('.tile-inner .tile-back').textContent;
        }
        gameState.guesses.push(guessWord);
    }
    localStorage.setItem('wordleCloneState', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('wordleCloneState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        const today = new Date().toISOString().split('T')[0];

        // If it's a new day, or if the saved game was already over, reset for the new daily word
        if (gameState.date !== today || gameState.gameOver) {
            localStorage.removeItem('wordleCloneState');
            targetWord = getDailyWord(); // Ensure new word for new day
            // console.log("New day or game over, new word:", targetWord);
            return; // Start fresh for the new day's word
        }

        // Restore state for the current day's word if it matches
        if (gameState.targetWord === targetWord) {
            isGameOver = false; // Reset this, will be set if all attempts used
            currentRowIndex = 0; // Will be incremented by processGuess

            // Replay past guesses
            const guessesToReplay = [...gameState.guesses]; // Clone array
            gameState.guesses.forEach(guessStr => {
                if (!isGameOver) {
                    currentGuess = guessStr.split('');
                    processGuess(false); // Process guess without animation and saving
                    currentGuess = []; // Clear for next potential input
                }
            });
            // If after replaying, game was not over, set currentRowIndex from saved
            if (!isGameOver) {
                currentRowIndex = gameState.currentRowIndex;
            }

        } else {
            // Mismatch in targetWord (should ideally not happen if date check is correct)
            // This means the local storage is for a previous day's *unfinished* game,
            // and the user opened it on a new day.
            localStorage.removeItem('wordleCloneState');
            targetWord = getDailyWord(); // Ensure new word for new day
              // console.log("Target word mismatch, new word:", targetWord);
        }
    }
}

// --- UI Updates ---
function updateBoard() {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const rowTiles = gameBoard.children[i].children;
        for (let j = 0; j < WORD_LENGTH; j++) {
            const tileContainer = rowTiles[j];
            const tileInner = tileContainer.querySelector('.tile-inner');
            const tileFront = tileInner.querySelector('.tile-face:not(.tile-back)');
            const letter = (i === currentRowIndex && currentGuess[j]) ? currentGuess[j] : '';
            tileFront.textContent = letter;

            // Style for current input row
            if (i === currentRowIndex && letter) {
                tileFront.classList.add('border-[#FFAAA5]', 'scale-105');
                tileFront.classList.remove('border-[#E3E8EF]');
            } else {
                tileFront.classList.remove('border-[#FFAAA5]', 'scale-105');
                tileFront.classList.add('border-[#E3E8EF]');
            }
        }
    }
}

function showMessage(text, type = 'info', duration = 3000) {
    messageArea.textContent = text;
    messageArea.classList.remove('text-[#FF6B6B]', 'text-[#A8E6CF]'); // Remove old color classes
    if (type === 'error') {
        messageArea.classList.add('text-[#FF6B6B]');
    } else if (type === 'success') {
        messageArea.classList.add('text-[#A8E6CF]');
    } else {
        // default text color is fine for info
    }

    if (duration > 0) {
        setTimeout(() => {
            if (messageArea.textContent === text) { // Clear only if message hasn't changed
                messageArea.textContent = '';
                messageArea.classList.remove('text-[#FF6B6B]', 'text-[#A8E6CF]');
            }
        }, duration);
    }
}

function shakeRow(rowIndex) {
    const row = gameBoard.children[rowIndex];
    row.classList.add('shake');
    setTimeout(() => {
        row.classList.remove('shake');
    }, SHAKE_ANIMATION_DURATION);
}

function flipTiles(rowIndex, feedback, onComplete) {
    const rowTiles = gameBoard.children[rowIndex].children;
    let animationCount = 0;

    feedback.forEach((fb, index) => {
        setTimeout(() => {
            const tileContainer = rowTiles[index];
            const tileInner = tileContainer.querySelector('.tile-inner');
            const tileFront = tileInner.querySelector('.tile-face:not(.tile-back)');
            const tileBack = tileInner.querySelector('.tile-back');

            // Set back face content and color
            tileBack.textContent = tileFront.textContent; // Letter from front
            tileBack.classList.remove('bg-[#A8E6CF]', 'bg-[#FFD3B6]', 'bg-[#D3D3D3]', 'text-white', 'border-transparent');
            tileBack.classList.add('border-2'); // Ensure border is reset

            if (fb.status === 'correct') {
                tileBack.classList.add('bg-[#A8E6CF]', 'text-white', 'border-[#A8E6CF]');
            } else if (fb.status === 'present') {
                tileBack.classList.add('bg-[#FFD3B6]', 'text-white', 'border-[#FFD3B6]');
            } else {
                tileBack.classList.add('bg-[#D3D3D3]', 'text-white', 'border-[#D3D3D3]');
            }

            // Remove active input styles from front if they were there
            tileFront.classList.remove('border-[#FFAAA5]', 'scale-105');
            tileFront.classList.add('border-[#E3E8EF]');


            tileContainer.classList.add('flipped');

            animationCount++;
            if (animationCount === WORD_LENGTH && onComplete) {
                onComplete();
            }
        }, index * FLIP_ANIMATION_DURATION);
    });
}

// --- Game Logic ---
function handleKeyPress(key) {
    if (isGameOver || isProcessingInput) return;

    if (key === 'Enter') {
        submitGuess();
    } else if (key === 'Backspace' || key === 'Delete') {
        if (currentGuess.length > 0) {
            currentGuess.pop();
            updateBoard();
        }
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
        if (currentGuess.length < WORD_LENGTH) {
            currentGuess.push(key.toUpperCase());
            updateBoard();
        }
    }
}

function isValidWord(word) {
    return VALID_GUESSES_LIST.includes(word.toUpperCase());
}

function getFeedback(guessArray) {
    const feedback = [];
    const targetArray = targetWord.split('');
    const guess = guessArray.join('');

    // Track used target letters to handle duplicates correctly
    const targetLetterCounts = {};
    for (const letter of targetArray) {
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
    }

    // First pass: Green (correct letter, correct position)
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guessArray[i] === targetArray[i]) {
            feedback[i] = { letter: guessArray[i], status: 'correct' };
            targetLetterCounts[guessArray[i]]--;
        } else {
            feedback[i] = null; // Placeholder
        }
    }

    // Second pass: Yellow (correct letter, wrong position) and Gray
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (feedback[i] === null) { // Only process if not already green
            if (targetArray.includes(guessArray[i]) && targetLetterCounts[guessArray[i]] > 0) {
                feedback[i] = { letter: guessArray[i], status: 'present' };
                targetLetterCounts[guessArray[i]]--;
            } else {
                feedback[i] = { letter: guessArray[i], status: 'absent' };
            }
        }
    }
    return feedback;
}

function submitGuess() {
    if (isProcessingInput || isGameOver) return;

    const guessStr = currentGuess.join('');

    if (guessStr.length !== WORD_LENGTH) {
        showMessage(`Word must be ${WORD_LENGTH} letters long`, 'error');
        shakeRow(currentRowIndex);
        return;
    }

    if (!isValidWord(guessStr)) {
        showMessage('Not in word list', 'error');
        shakeRow(currentRowIndex);
        return;
    }

    isProcessingInput = true; // Lock input during animation/processing
    processGuess(true); // True means with animation and saving
}

function processGuess(withEffectsAndSave) {
    const guessStr = currentGuess.join('');
    const feedback = getFeedback(currentGuess);

    if (withEffectsAndSave) {
        flipTiles(currentRowIndex, feedback, () => {
            checkWinOrLoss(guessStr, withEffectsAndSave);
        });
    } else {
        // For loading state, directly apply feedback without animation
        const rowTiles = gameBoard.children[currentRowIndex].children;
        feedback.forEach((fb, index) => {
            const tileContainer = rowTiles[index];
            const tileInner = tileContainer.querySelector('.tile-inner');
            const tileFront = tileInner.querySelector('.tile-face:not(.tile-back)');
            const tileBack = tileInner.querySelector('.tile-back');

            tileBack.textContent = fb.letter;
            tileBack.classList.remove('bg-[#A8E6CF]', 'bg-[#FFD3B6]', 'bg-[#D3D3D3]', 'text-white', 'border-transparent');
            tileBack.classList.add('border-2');

            if (fb.status === 'correct') {
                tileBack.classList.add('bg-[#A8E6CF]', 'text-white', 'border-[#A8E6CF]');
            } else if (fb.status === 'present') {
                tileBack.classList.add('bg-[#FFD3B6]', 'text-white', 'border-[#FFD3B6]');
            } else {
                tileBack.classList.add('bg-[#D3D3D3]', 'text-white', 'border-[#D3D3D3]');
            }
            // Ensure front tile border is reset if it had active style
            tileFront.classList.remove('border-[#FFAAA5]', 'scale-105');
            tileFront.classList.add('border-[#E3E8EF]');

            tileContainer.classList.add('flipped');
        });
        checkWinOrLoss(guessStr, withEffectsAndSave);
    }
}

function checkWinOrLoss(guessStr, withSave) {
    if (guessStr === targetWord) {
        if (withSave) showMessage('🎉 You won! 🎉', 'success', 0); // Persistent message
        isGameOver = true;
    } else if (currentRowIndex === MAX_ATTEMPTS - 1) {
        if (withSave) showMessage(`😅 Game Over! Word was: ${targetWord}`, 'error', 0); // Persistent
        isGameOver = true;
    }

    currentRowIndex++;
    currentGuess = []; // Clear for next guess or end of game
    isProcessingInput = false; // Unlock for next input if game not over

    if (withSave) {
        saveGameState(); // Save after each guess attempt
    }
    updateBoard(); // Clear the current input row display if game continues
}

function resetGame() {
    // Clear local storage for today's word to allow a fresh start on the same word.
    // Note: PRD says "next day's word only" for reset, which is unusual.
    // Typical Wordle reset clears current day's attempt.
    // I will implement it to clear the *current day's* progress
    // to allow retrying the *same* daily word.
    // If it strictly means "only allow reset if it loads next day's word",
    // then the reset button is essentially a "force refresh for new day word" button.
    // The current implementation of initializeGame + loadGameState already handles new day.

    // Clarification: "Reset button allows the user to start a new game (next day’s word only)."
    // This implies the reset button does nothing *until* the next day arrives.
    // A more user-friendly interpretation would be "start a new game with the current day's word",
    // effectively clearing progress. I'll go with the latter as it's more standard.
    // If the PRD is strict, the button would only work to force a new day's word if the date changes.

    const today = new Date().toISOString().split('T')[0];
    const savedStateRaw = localStorage.getItem('wordleCloneState');
    if (savedStateRaw) {
        const savedState = JSON.parse(savedStateRaw);
        if (savedState.date === today) {
            localStorage.removeItem('wordleCloneState');
        }
    }
    // Re-initialize with potentially the same daily word but cleared progress
    initializeGame();
}


// --- Event Listeners ---
document.addEventListener('keydown', (event) => {
    handleKeyPress(event.key);
});

resetButton.addEventListener('click', resetGame);

// --- Start Game ---
initializeGame();