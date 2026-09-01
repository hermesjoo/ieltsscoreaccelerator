/* mock-data.js — IELTS Mock Test 1 — 100% original content.
   READING: 3 passages × 13-14 q = 40 | LISTENING: 4 sections × 10 = 40 (TTS scripts)
   Format notes: shortened-but-authentic format (real IELTS passages run longer).
   Answer types: mcq (opts), tfng, gap (text input; alts accepted case-insensitively), match (opts) */

window.MOCK_READING = [
  {
    title: "Passage 1 — The Return of the Night Trains",
    passage: `In 2016, the Austrian rail operator ÖBB did something that few European railways had dared for a generation: it expanded its fleet of sleeper trains. At the time, the decision looked eccentric. Budget airlines had spent two decades devouring the continent's overnight rail market, and night trains were widely seen as a charming relic — the setting of spy novels rather than a serious business.\n\nThe economics had always been brutal. Sleeper carriages carry far fewer passengers than a seated train of the same length, each compartment requires labour-intensive servicing, and the carriages sit idle all day at their destinations. In 2009, Germany's Deutsche Bahn cited precisely these costs when it withdrew its remaining night services, and other state operators followed. Within five years, a traveller could no longer cross France, Spain or Italy by sleeper without a convoluted series of changes.\n\nWhat the accountants had not priced in was politics. As awareness of aviation's carbon footprint grew, several governments began to treat night trains as climate infrastructure rather than commercial services. France voted a levy on short-haul flights where a train alternative under two and a half hours exists; Austria simply bought capacity. When Deutsche Bahn gave up, ÖBB acquired much of its sleeper stock at a discount — a purchase that industry insiders now describe as the deal of the decade.\n\nThe bet has paid off beyond expectations. ÖBB's Nightjet network now links Vienna with two dozen cities from Brussels to Rome, and load factors — the share of berths sold — have climbed steadily above seventy per cent, a figure many daytime services would envy. Crucially, the operator discovered a market segment the old railways had ignored: travellers who combined a night's travel with a night's accommodation, effectively paying once for transport and a hotel bed. Private competitors noticed. New entrants, several fuelled by venture capital, have announced routes from Munich to Stockholm and Zurich to Prague.\n\nNot everyone is convinced the renaissance will last. Sleeper trains remain dependent on path allocation — the negotiated slots on busy rail corridors — and daytime operators guard these fiercely. New carriages cost several million euros each and take years to build; current fleets are ageing fast. Yet the direction of travel seems clear. In a Europe taxing carbon and re-regulating its railways, the night train has moved from nostalgia to policy, and policy, unlike fashion, tends to fund what it favours.`,
    questions: [
      {n:1, type:'tfng', q:'ÖBB increased its sleeper train fleet in 2016 despite general expectations of the market declining.', a:'True'},
      {n:2, type:'tfng', q:'Budget airlines had captured most of the overnight travel market before 2016.', a:'True'},
      {n:3, type:'tfng', q:'Sleeper carriages earn more revenue per metre than seated carriages.', a:'False'},
      {n:4, type:'tfng', q:'Deutsche Bahn stopped its night services because passenger numbers were falling.', a:'False'},
      {n:5, type:'tfng', q:'France banned all flights on routes where train journeys take under 150 minutes.', a:'False'},
      {n:6, type:'gap', q:'When Deutsche Bank withdrew, ÖBB bought much of its sleeper stock at a ______.', alts:['discount']},
      {n:7, type:'gap', q:'ÖBB\'s Nightjet network now connects Vienna with roughly ______ cities.', alts:['two dozen','24','twenty four','twenty-four']},
      {n:8, type:'gap', q:'The share of berths sold, known as the ______, is now above seventy per cent.', alts:['load factor','load factors']},
      {n:9, type:'gap', q:'Travellers effectively pay once for transport and a ______.', alts:['hotel bed','hotel','bed']},
      {n:10, type:'gap', q:'New entrants have been fuelled by ______ capital.', alts:['venture']},
      {n:11, type:'mcq', q:'According to the writer, the main reason night trains collapsed before 2016 was:', opts:['high operating costs relative to seated trains','low passenger demand','competition from coaches','poor service quality'], a:0},
      {n:12, type:'mcq', q:'The phrase "the deal of the decade" suggests that ÖBB\'s purchase:', opts:['was remarkably good value in hindsight','cost more than expected','was forced by regulators','lasted ten years'], a:0},
      {n:13, type:'mcq', q:'What does the writer identify as the biggest threat to the night train revival?', opts:['Competition for rail corridor slots','Lack of passenger interest','Airline price cuts','Loss of government subsidies'], a:0},
    ]
  },
  {
    title: "Passage 2 — Farms Without Fields",
    passage: `On a former industrial site in Bedford, England, trays of leafy vegetables stack nine metres high beneath banks of purple light. No soil supports them, no rain falls on them, and no tractor will ever pass between their rows. This is vertical farming: the practice of growing crops in stacked, climate-sealed layers, usually inside cities, using artificial light and precisely dosed nutrients.\n\nThe pitch is seductive. A vertical farm claims to use up to ninety-five per cent less water than a field, needs no pesticides — insects cannot reach a sealed room — and, by sitting near consumers, removes thousands of food miles. Yields per square metre of floor space dwarf those of open fields, because growing continues around the clock and harvests come every few weeks rather than twice a year. Proponents paint a future in which grey warehouses feed megacities and arable land is returned to nature.\n\nThe obstacles, however, are written in the language of physics. Plants get their energy from light, and replacing the sun is expensive. Electricity typically accounts for a quarter to a half of operating costs, which is why the industry's fate is tied to power prices as closely as any aluminium smelter. When European energy prices spiked in 2022, several celebrated startups collapsed within months, and investors who had poured billions into the sector began asking uncomfortable questions about unit economics.\n\nThe crop list is the second constraint. Grains, the crops humanity actually lives on, convert light into calories too inefficiently to make stacking them worthwhile; no one has proposed a viable vertical wheat farm. Leafy greens, herbs and soft fruit — high-value, fast-growing, mostly water — remain the only crops where the sums work, and these already fill the market niches the first movers targeted. Critics point out, with some justice, that lettuce is a crop of limited nutritional consequence: feeding cities on vertical farms means, for now, feeding them salad.\n\nYet writing the technology off would misread how it is actually being used. The most durable operations are not freestanding farms but attached facilities — a warehouse beside a supermarket distribution hub, a growing room in a restaurant, a seedling factory supplying greenhouses. Here, the economics change: transport costs vanish entirely, waste falls because harvests match orders, and the farm earns its keep as part of a logistics chain rather than as an agricultural substitute. The green revolution, it turns out, will not arrive as a single sweeping change but as a hundred specialised ones.`,
    questions: [
      {n:14, type:'tfng', q:'Vertical farms in Bedford use natural rainfall for irrigation.', a:'False'},
      {n:15, type:'tfng', q:'Vertical farms typically achieve multiple harvests per year from the same floor space.', a:'True'},
      {n:16, type:'tfng', q:'Electricity usually represents less than ten per cent of a vertical farm\'s operating costs.', a:'False'},
      {n:17, type:'tfng', q:'Several vertical farming startups failed after energy prices rose in 2022.', a:'True'},
      {n:18, type:'tfng', q:'Wheat has been successfully grown in vertical farms at commercial scale.', a:'False'},
      {n:19, type:'gap', q:'Vertical farms use up to ______ per cent less water than open fields.', alts:['95','ninety five','ninety-five','95%']},
      {n:20, type:'gap', q:'Because rooms are sealed, insects cannot enter, so no ______ are needed.', alts:['pesticides','pesticide']},
      {n:21, type:'gap', q:'The industry\'s fate is tied to ______ prices.', alts:['power','electricity','energy']},
      {n:22, type:'gap', q:'Critics note that lettuce is a crop of limited ______ consequence.', alts:['nutritional','nutrition']},
      {n:23, type:'gap', q:'The most durable operations are ______ facilities attached to existing businesses.', alts:['attached']},
      {n:24, type:'mcq', q:'The writer\'s attitude to vertical farming claims is best described as:', opts:['impressed by the concept but firm about the constraints','entirely sceptical of the technology','an enthusiastic supporter of freestanding farms','indifferent to the debate'], a:0},
      {n:25, type:'mcq', q:'Why are grains unsuitable for vertical farming?', opts:['They convert light to calories too inefficiently to justify stacking','They cannot grow under artificial light','They require pesticides','They are not eaten in cities'], a:0},
      {n:26, type:'mcq', q:'The final paragraph suggests the realistic future of vertical farming is:', opts:['integration into existing supply chains','replacement of all traditional farms','export crops for poor countries','government-run mega-farms'], a:0},
    ]
  },
  {
    title: "Passage 3 — Minds Without Masters: Swarm Intelligence",
    passage: `A single honeybee possesses roughly a million neurons — one ten-thousandth the computing tissue of a human brain — and cannot, by any reasonable definition, reason. Yet a colony of twenty thousand bees solves problems that would embarrass a committee of professors: it allocates foragers to flower patches with uncanny efficiency, chooses the best site for a new nest from dozens of candidates, and does so without any individual understanding the question. This is swarm intelligence: problem-solving that emerges from the interactions of many simple agents following simple rules, with no one in charge.\n\nThe mechanism is best understood in the honeybee's house-hunting ritual. Scouts returning from a promising cavity perform a dance whose enthusiasm reflects the site's quality. Other bees follow the strongest dances, visit those sites, and dance for them in turn if impressed. No bee compares all options; each reports only what it saw, and the colony's decision emerges as one option's supporters gradually recruit everyone else. The process is slow but robust, and — remarkably — mathematical models of it converge on the objectively best site far more often than any individual scout would choose alone.\n\nComputer scientists noticed decades ago that such algorithms could be borrowed. Ant colony optimisation, which mimics how ants lay pheromone trails to mark good paths, is now used to route delivery vehicles and schedule airport gates. Particle swarm methods, inspired by flocking birds, tune the parameters of engineering designs. In each case the power comes from the same source: many cheap, unreliable evaluations, aggregated, outperform one expensive, expert evaluation — provided the agents remain diverse and independent. If every ant follows every other ant too closely, the swarm collapses into a single doomed highway, a failure mode biologists call a "runway" and engineers call premature convergence.\n\nThat caveat has grown teeth in the age of algorithmic recommendation. Some researchers now argue that human society is running an unplanned swarm experiment: millions of people making choices based on aggregated signals — rankings, ratings, trending lists — that were themselves produced by those same choices. When the signals are honest and diverse, the collective behaves intelligently; when platforms compress the signal, showing everyone the same few winners, the swarm's diversity dies and so does its wisdom. The bees, at least, cannot be talked out of dancing for a site they actually visited. Human scouts increasingly dance only for what the algorithm showed them.`,
    questions: [
      {n:27, type:'gap', q:'A bee colony decides on a new nest site through a ______ performed by returning scouts.', alts:['dance','waggle dance','waggle']},
      {n:28, type:'gap', q:'The dance\'s ______ reflects how good the site is.', alts:['enthusiasm','strength','vigour','vigor','intensity']},
      {n:29, type:'gap', q:'Ant colony optimisation mimics pheromone trails to mark good ______.', alts:['paths','path','routes','route']},
      {n:30, type:'gap', q:'Particle swarm methods help ______ the parameters of engineering designs.', alts:['tune','optimise','optimize','adjust']},
      {n:31, type:'gap', q:'Swarm aggregation fails when agents lose their ______ and independence.', alts:['diversity']},
      {n:32, type:'gap', q:'Biologists call the failed swarm state a ______.', alts:['runway','run way']},
      {n:33, type:'gap', q:'Engineers\' term for the same failure is ______ convergence.', alts:['premature']},
      {n:34, type:'gap', q:'Modern platforms show everyone the same winners, which kills the swarm\'s ______.', alts:['diversity','wisdom']},
      {n:35, type:'tfng', q:'An individual honeybee can evaluate and compare several nest sites before dancing.', a:'False'},
      {n:36, type:'tfng', q:'Mathematical models of the bees\' decision process usually settle on the objectively best site.', a:'True'},
      {n:37, type:'tfng', q:'Ant colony optimisation was invented by biologists studying airport scheduling.', a:'False'},
      {n:38, type:'mcq', q:'The writer\'s main point in the final paragraph is that:', opts:['recommendation systems can strip human crowds of the diversity that makes them wise','algorithms are always less intelligent than animal swarms','bees dance more honestly than humans','social media should be banned'], a:0},
      {n:39, type:'mcq', q:'The phrase "grown teeth" (paragraph 4) means the caveat has:', opts:['become a serious, practical concern','been disproven','been known for a long time','frightened researchers'], a:0},
      {n:40, type:'mcq', q:'The passage as a whole argues that collective intelligence depends on:', opts:['many independent, diverse participants','strong central coordination','expert evaluation','large colony size'], a:0},
    ]
  }
];

window.MOCK_LISTENING = [
  {
    title: "Section 1 — Library membership (form completion)",
    intro: 'You hear a conversation at a public library. A new member registers. First you have some time to look at questions 1-5.',
    scripts: [
      {label:'Part A', text:"LIBRARIAN: Good morning, Greenfield Library — how can I help?\nWOMAN: Hi, I've just moved to the area and I'd like to join the library.\nLIBRARIAN: Of course. I just need a few details. Can I take your name?\nWOMAN: It's Rachel Barber.\nLIBRARIAN: Rachel — B-A-R-B-E-R. And your address?\nWOMAN: Fourteen, Windermere Road — that's W-I-N-D-E-R-M-E-R-E.\nLIBRARIAN: Flat number?\nWOMAN: No, it's a house. Just number fourteen.\nLIBRARIAN: Perfect. And a contact number?\nWOMAN: My mobile — oh-seven-seven-zero-zero, then nine-one, four-four-two. Sorry, let me say that again: oh-seven-seven-zero-zero nine-one four-four-two.\nLIBRARIAN: Got it. Now, membership is free, but I do need one proof of address — a bank statement or utility bill, no older than three months.\nWOMAN: I have a phone bill from last week, is that OK?\nLIBRARIAN: Ideal. Now, which of our newsletters would you like? We do a monthly one by email and a quarterly printed one.\nWOMAN: Email's better — less paper.\nLIBRARIAN: Quite right. And your occupation, just for our statistics?\nWOMAN: I'm a dental nurse — I work at the practice on High Street."},
      {label:'Part B', text:"LIBRARIAN: Lovely. Now let me explain what you get. Standard membership allows six items at a time, and books go out for three weeks.\nWOMAN: What about late returns?\nLIBRARIAN: We don't charge fines anymore — but if a book is more than two weeks overdue, borrowing stops until it comes back.\nWOMAN: That's fair. Do you do e-books?\nLIBRARIAN: Yes — through the Libra app. Your card number works there too, and e-books return themselves on the due date.\nWOMAN: Brilliant. And DVDs?\nLIBRARIAN: We have a small collection — two at a time, one week each. There's a small charge for those, one pound fifty per week.\nWOMAN: OK. One more thing — is there parking?\nLIBRARIAN: Behind the building, free for the first hour, then it's the town car park. The bus — number 12 — stops right outside.\nWOMAN: Perfect. I'll take my card now and come back Saturday with my son — he's four. Is there a children's section?\nLIBRARIAN: Downstairs, with a story session every Saturday at ten. Just sign him up at the desk on your first visit."}
    ],
    questions: [
      {n:1, type:'gap', q:'First name: Rachel. Surname: ______', alts:['barber']},
      {n:2, type:'gap', q:'Address: 14 ______ Road', alts:['windermere']},
      {n:3, type:'gap', q:'Mobile: 07700 91 ______', alts:['442','4 4 2','44 2']},
      {n:4, type:'gap', q:'Proof required: bank statement or ______', alts:['utility bill','phone bill','a phone bill','a utility bill']},
      {n:5, type:'mcq', q:'Which newsletter does Rachel choose?', opts:['Monthly email','Quarterly printed','Both','Neither'], a:0},
      {n:6, type:'gap', q:'Occupation: dental ______', alts:['nurse']},
      {n:7, type:'gap', q:'Books may be borrowed for ______ weeks.', alts:['3','three','three weeks']},
      {n:8, type:'mcq', q:'What happens if a book is very late?', opts:['Borrowing is suspended until it is returned','A fine is charged per day','Membership is cancelled','Nothing'], a:0},
      {n:9, type:'gap', q:'DVD hire costs £______ per week.', alts:['1.50','1.5','£1.50','one fifty','1 50']},
      {n:10, type:'gap', q:'Bus number ______ stops outside the library.', alts:['12','twelve','the 12','no. 12','number 12']},
    ]
  },
  {
    title: "Section 2 — Community Sports Centre (talk)",
    intro: 'You hear the manager of a new community sports centre speaking at its opening event.',
    scripts: [
      {label:'Part A', text:"Good afternoon everyone, and thank you for coming to the official opening of the Riverside Community Sports Centre. I'm Dana Okafor, the centre manager, and I'd like to take two minutes of your time before you look around.\n\nFirst, the hours. We're open seven days a week, weekdays from six in the morning — yes, six, for the early swimmers — until ten at night, and weekends from eight until eight. The centre is fully accessible, with step-free access everywhere and a hoist at the main pool.\n\nNow, pricing, because everyone asks. A single adult session is four pounds fifty. But the deal everyone should know about is the community card: twenty pounds a month, unlimited sessions, and it covers two children per adult. Students and over-sixty-fives pay half. We never want money to be the reason someone skips exercise.\n\nThe building you're standing in used to be a furniture warehouse. It sat empty for nine years before the council and a local trust bought it. Almost everything you'll see was built or refurbished by local firms, and the climbing wall — I should mention — was donated by the family of Martin Cole, a climber and teacher from this estate. It's the tallest wall of any community centre in the county."},
      {label:'Part B', text:"A few practical points for today. Tours leave from reception every fifteen minutes; the last one is at half past four. The café is serving free tea and coffee all afternoon — it's at the far end, past the studio.\n\nFor the programme: week one is completely free for residents. That includes the fitness classes, the pool, badminton, and — new for us — wheelchair basketball on Thursday evenings. Please do book online, because classes are capped at sixteen, and the app shows live availability.\n\nOne thing to flag: the car park is small — twenty spaces — and it will fill. There's street parking on Riverside Drive after five, but honestly? The number 12 bus stops at our door, and the riverside footpath from the town centre is a lovely ten-minute walk.\n\nFinally, we're hiring. Reception, swimming teachers, and — this being a community centre — anyone who can drive the minibus. Details on the noticeboard by the main doors. Thank you, and please enjoy your visit."}
    ],
    questions: [
      {n:11, type:'gap', q:'Weekday opening begins at ______ a.m.', alts:['6','six','6am','6 a.m']},
      {n:12, type:'gap', q:'Community card costs £______ per month.', alts:['20','twenty']},
      {n:13, type:'gap', q:'The building was previously a ______ warehouse.', alts:['furniture']},
      {n:14, type:'gap', q:'The climbing wall was donated by the family of ______ Cole.', alts:['martin','martin cole']},
      {n:15, type:'mcq', q:'Who pays half price?', opts:['Students and over-65s','Children','Unemployed residents','Everyone in week one'], a:0},
      {n:16, type:'mcq', q:'What is the maximum class size?', opts:['16','15','20','12'], a:0},
      {n:17, type:'mcq', q:'Which activity is NEW for the centre?', opts:['Wheelchair basketball','Badminton','Fitness classes','Swimming'], a:0},
      {n:18, type:'gap', q:'The car park has only ______ spaces.', alts:['20','twenty']},
      {n:19, type:'gap', q:'The ______ bus stops at the centre.', alts:['12','number 12','no. 12','12 bus','twelve']},
      {n:20, type:'mcq', q:'Which job is NOT mentioned?', opts:['Swimming teacher','Minibus driver','Receptionist','Café cook'], a:3},
    ]
  },
  {
    title: "Section 3 — Two students discuss a history project",
    intro: 'You hear two university students, Tom and Priya, discussing their joint history presentation.',
    scripts: [
      {label:'Part A', text:"TOM: Priya — did the tutor say anything about our presentation? I couldn't make office hours.\nPRIYA: I got the gist. He liked the topic — travel writing in the nineteenth century — but he said our plan tries to cover far too much.\nTOM: Too much? We've only got three case studies.\nPRIYA: Three, across three continents, in fifteen minutes. He suggested we drop one and go deeper. His words were 'depth beats breadth'.\nTOM: Fine. Which one goes?\nPRIYA: Well, I'd keep Isabella Bird — her letters from Japan are the most vivid material we have.\nTOM: Agreed. And Mary Kingsley, surely — West African Voyages is practically a set text.\nPRIYA: That leaves de Saussure. It hurts, because the Alpine journals are lovely, but you're right, he's the obvious cut — he's also the least written-about, which makes sourcing hard.\nTOM: OK, so two travellers, fifteen minutes. What did he say about structure?\nPRIYA: He wants context first — why the 1890s specifically. Improving transport, the growth of the middle class, and the magazines that paid for it all.\nTOM: The magazines! That's a strong angle — nobody else in the seminar has anything on publishing economics.\nPRIYA: Then each traveller gets five minutes, and we finish with what the travel genre owes them. He said one thing we must fix: quotes. Apparently we quote too much and analyse too little."},
      {label:'Part B', text:"TOM: Guilty. I had nine quotes in my draft.\nPRIYA: Nine! He said aim for three per section, maximum, each followed by our own reading of it.\nTOM: Noted. What about slides — he had opinions there too, I assume?\nPRIYA: Only one: fewer words. He said a slide is a signpost, not a script.\nTOM: Easy for him to say. Timeline?\nPRIYA: Draft script by Friday, slides by Sunday, and we rehearse Monday morning in the seminar room — it's booked, nine to ten.\nTOM: Booked? Impressive. Division of labour?\nPRIYA: I assumed you'd take Kingsley since you've read the biography, and I'll do Bird plus the 1890s context. That leaves the conclusion — shall we each draft half and merge?\nTOM: Works for me. Oh — the reading list. He mentioned a new book on Victorian periodicals?\nPRIYA: 'Selling the Sunset' — it's in the library, three copies, and he's put a chapter on the reading list as essential. The one on advertising revenue.\nTOM: Then that's our weekend sorted."}
    ],
    questions: [
      {n:21, type:'mcq', q:'The tutor\'s main criticism of the plan was that it:', opts:['covered too much material','had a boring topic','lacked primary sources','was too short'], a:0},
      {n:22, type:'mcq', q:'Which traveller do they decide to drop?', opts:['De Saussure','Isabella Bird','Mary Kingsley','They keep all three'], a:0},
      {n:23, type:'gap', q:'Reason: he is the least ______ about, making sourcing hard.', alts:['written-about','written about','written']},
      {n:24, type:'mcq', q:'Their new \'angle\' is:', opts:['the economics of magazine publishing','transport improvements','colonial politics','biography writing'], a:0},
      {n:25, type:'gap', q:'Maximum quotes per section: ______', alts:['3','three']},
      {n:26, type:'mcq', q:'"A slide is a signpost, not a script" means slides should:', opts:['guide briefly, not carry the full text','use only images','be read aloud exactly','list all quotes'], a:0},
      {n:27, type:'gap', q:'Slides must be finished by ______', alts:['sunday','sunday.','sun']},
      {n:28, type:'gap', q:'The seminar room is booked for Monday ______ to ten.', alts:['nine','9','nine a.m','9am','9 a.m']},
      {n:29, type:'mcq', q:'Tom will present:', opts:['Mary Kingsley','Isabella Bird','The 1890s context','The conclusion alone'], a:0},
      {n:30, type:'gap', q:"Essential reading: 'Selling the ______', chapter on advertising revenue.", alts:['sunset']},
    ]
  },
  {
    title: "Section 4 — Lecture: how animals find their way",
    intro: 'You hear part of a university lecture on animal navigation.',
    scripts: [
      {label:'Lecture', text:"Today I want to unpick one of biology's quietest mysteries: how animals navigate. A carrier pigeon released five hundred kilometres from its loft flies home in a day. A leatherback turtle crosses an ocean to the beach where it hatched. For most of the twentieth century, navigation research focused on single senses — the sun, the stars, smell. The modern picture, though, is of toolkits: animals carry several navigation systems and switch between them depending on conditions.\n\nConsider the desert ant. It leaves its nest, walks a zig-zag path of two hundred metres in search of dead insects, and then — across featureless sand, with no landmarks — walks an almost straight line home. The trick is path integration: the ant continuously tracks the direction and distance of every step, effectively maintaining a running vector back to the nest. The sun compass provides direction; for distance, remarkably, the ant counts its steps — experiments in which ants were given stilts, lengthening their stride, showed them overshooting the nest precisely as the step-count model predicts.\n\nBirds layer further tools. They can sense the earth's magnetic field — though not, as once thought, through a single organ. There is chemical compass machinery in the eye, possibly iron-based magnetite in the beak, and the two systems seem to interact. Crucially, magnetic sense alone is coarse: it gives direction but not position. For position, birds learn landmarks, and — the current excitement — an olfactory map. Homing pigeons with severed smell nerves are famously hopeless, suggesting they learn, over years, what the wind carries from each direction: an invisible, coast-to-coast odour landscape.\n\nTwo implications to take away. First, redundancy: because systems overlap, disabling one sense rarely ends a journey — which is why early single-sense experiments kept producing confusing null results. And second, learning: navigation is not purely innate. Young turtles, young birds — they calibrate their compasses against experience. The map, as one researcher put it, is grown, not given."}
    ],
    questions: [
      {n:31, type:'gap', q:'Modern science views navigation as a ______ of several systems.', alts:['toolkit','toolkits','set','set of tools']},
      {n:32, type:'gap', q:'The desert ant\'s method is called path ______.', alts:['integration']},
      {n:33, type:'gap', q:'For distance, the ant effectively counts its ______.', alts:['steps','step']},
      {n:34, type:'mcq', q:'The stilts experiment showed:', opts:['ants overshoot the nest exactly as step-counting predicts','stilts confuse the sun compass','ants use landmarks after all','stride length is irrelevant'], a:0},
      {n:35, type:'gap', q:'One compass mechanism is chemical machinery in the ______.', alts:['eye']},
      {n:36, type:'gap', q:'Magnetite in the beak may be ______-based.', alts:['iron','fe','fe-based']},
      {n:37, type:'mcq', q:'A key limitation of magnetic sense alone:', opts:['it gives direction but not position','it only works at night','it fails over oceans','it requires landmarks'], a:0},
      {n:38, type:'gap', q:'Pigeons with severed ______ nerves cannot navigate home well.', alts:['smell','olfactory','smell nerves','olfactory nerves']},
      {n:39, type:'gap', q:'Animals learn an odour map from what the ______ carries.', alts:['wind']},
      {n:40, type:'mcq', q:'The researcher\'s conclusion: the map is:', opts:['grown, not given','given, not grown','innate and fixed','a human invention'], a:0},
    ]
  }
];

/* Official-style raw→band tables */
window.BAND_TABLES = {
  listening: [[39,40,9],[37,38,8.5],[35,36,8],[32,34,7.5],[30,31,7],[26,29,6.5],[23,25,6],[18,22,5.5],[16,17,5],[13,15,4.5],[10,12,4],[8,9,3.5],[6,7,3],[4,5,2.5],[0,3,2]],
  reading:   [[39,40,9],[37,38,8.5],[35,36,8],[33,34,7.5],[30,32,7],[27,29,6.5],[23,26,6],[19,22,5.5],[15,18,5],[13,14,4.5],[10,12,4],[8,9,3.5],[6,7,3],[4,5,2.5],[0,3,2]],
};

window.MOCK_WRITING = {
  task1: {
    title: "Writing Task 1 (Academic) — 20 minutes recommended",
    prompt: "The chart below shows the number of international students enrolled at three universities in one country over a ten-year period. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    data: [
      {label:'2005', a:2100, b:1450, c:600},
      {label:'2010', a:2900, b:2300, c:1400},
      {label:'2015', a:3400, b:3600, c:3100},
    ],
    seriesNames: ['Riverside University','Central Institute','Hillcrest College'],
    note: 'Enrolment figures in numbers of students. A = Riverside, B = Central, C = Hillcrest.'
  },
  task2: {
    title: "Writing Task 2 — 40 minutes recommended",
    prompt: "Some people believe that universities should only offer places to students with the highest exam results. Others argue that admissions should also consider a candidate's background and life experience. Discuss both views and give your own opinion. Write at least 250 words.",
  }
};

window.MOCK_SPEAKING = {
  part1: {
    title: 'Part 1 — Introduction & interview (4–5 minutes)',
    questions: [
      'Where do you live now — and do you like it?',
      'Do you work, or are you a student?',
      'How much time do you spend online every day?',
      'Do you prefer reading news online or watching it? Why?',
    ]
  },
  part2: {
    title: 'Part 2 — Long turn (1 min prep, 2 min talk)',
    cue: 'Describe a skill you learned outside school or work. You should say: what the skill is, how you learned it, how long it took to feel confident, and explain how this skill has been useful to you.'
  },
  part3: {
    title: 'Part 3 — Discussion (4–5 minutes)',
    questions: [
      'Should practical skills be taught alongside academic subjects? Why?',
      'How has online learning changed how people acquire new skills?',
      'Some say older people find it harder to learn new skills. Do you agree?',
      'Which matters more for success: natural talent or learned skill?',
    ]
  }
};
