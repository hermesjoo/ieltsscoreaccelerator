/* placement-bank.js — v2: realistic CEFR placement bank (original content).
   Structure per item:
     id, skill (grammar|vocab|reading|listening), level (A1..B2),
     q (question), p (optional passage shown above question), opts, a (correct index)
   Answer positions are deliberately scattered — no pattern to exploit.
   Reading passages are original texts written for this site (no copyrighted material).
*/
window.PLACEMENT_BANK = {

  /* ============ A1 ============ */
  A1: [
    {id:'a1-01', skill:'grammar', level:'A1', q:'___ from Iran.', opts:['He is','His','Him'], a:0},
  {id:'a1-02', skill:'grammar', level:'A1', q:'Look! The baby ___ now.', opts:['is sleeping','sleeps','sleeping'], a:0},
  {id:'a1-03', skill:'grammar', level:'A1', q:'There ___ two apples on the table.', opts:['are','is','be'], a:0},
  {id:'a1-04', skill:'grammar', level:'A1', q:'I go to school ___ bus.', opts:['by','with','on'], a:0},
  {id:'a1-05', skill:'vocab', level:'A1', q:'My father\'s brother is my ___.', opts:['uncle','cousin','grandfather'], a:1},
  {id:'a1-06', skill:'vocab', level:'A1', q:'We boil water in a ___.', opts:['kettle','basket','mirror'], a:0},
  {id:'a1-07', skill:'vocab', level:'A1', q:'Winter is ___, then spring comes.', opts:['before','after','during'], a:0},
  {id:'a1-08', skill:'reading', level:'A1',
   p:'Sara is a nurse. She works at a small hospital near her house. Every morning she wakes up at six, drinks a cup of tea, and walks to work. She starts at seven and finishes at three in the afternoon.',
   q:'What time does Sara start working?', opts:['At 7 a.m.','At 6 a.m.','At 3 p.m.'], a:0},
  {id:'a1-09', skill:'reading', level:'A1',
   p:'Sara is a nurse. She works at a small hospital near her house. Every morning she wakes up at six, drinks a cup of tea, and walks to work. She starts at seven and finishes at three in the afternoon.',
   q:'How does Sara go to work?', opts:['She walks.','She drives.','She takes a taxi.'], a:0},
  {id:'a1-10', skill:'listening', level:'A1',
   t:'Welcome to the City Sports Club. We are open every day from eight in the morning until nine at night. Our swimming pool closes one hour before the club closes.',
   q:'When does the swimming pool close?', opts:['At 8 a.m.','At 8 p.m.','At 9 p.m.'], a:1},

  ],

  /* ============ A2 ============ */
  A2: [
    {id:'a2-01', skill:'grammar', level:'A2', q:'I ___ TV when the phone rang.', opts:['was watching','watched','am watching'], a:0},
  {id:'a2-02', skill:'grammar', level:'A2', q:'You ___ smoke here. It\'s a hospital.', opts:['mustn\'t','don\'t have to','couldn\'t'], a:0},
  {id:'a2-03', skill:'grammar', level:'A2', q:'This shirt is ___ expensive than that one.', opts:['less','least','little'], a:0},
  {id:'a2-04', skill:'vocab', level:'A2', q:'Can you ___ me five euros? I\'ll pay you back tomorrow.', opts:['lend','borrow','owe'], a:0},
  {id:'a2-05', skill:'vocab', level:'A2', q:'The plane finally ___ after two hours of delay.', opts:['took off','took up','took in'], a:0},
  {id:'a2-06', skill:'reading', level:'A2',
   p:'Dear Mr. Klein,\nThank you for your order #A4471. Your package left our warehouse on Tuesday and should reach you within five working days. If it does not arrive by Monday the 20th, please contact us and we will send a replacement free of charge.\n— NovaShop Support',
   q:'What should Mr. Klein do if the package is late?', opts:['Contact the company for a free replacement','Pay extra for a new package','Wait another five working days'], a:0},
  {id:'a2-07', skill:'reading', level:'A2',
   p:'Dear Mr. Klein,\nThank you for your order #A4471. Your package left our warehouse on Tuesday and should reach you within five working days. If it does not arrive by Monday the 20th, please contact us and we will send a replacement free of charge.\n— NovaShop Support',
   q:'When did the package leave the warehouse?', opts:['Tuesday','Monday the 20th','Within five working days'], a:0},
  {id:'a2-08', skill:'listening', level:'A2',
   t:'Hello, this is a message for passengers on flight A2-214 to Istanbul. Boarding now starts at gate 14, not gate 6 as printed on your tickets. We apologize for the change.',
   q:'Which gate is correct for this flight?', opts:['Gate 6','Gate 14','Gate 2'], a:1},
  {id:'a2-09', skill:'listening', level:'A2',
   t:'The cooking class meets twice a week, on Mondays and Thursdays, from six to eight in the evening. This month the Thursday class is cancelled because the teacher is on holiday.',
   q:'Which class is cancelled this month?', opts:['Monday','Thursday','Both'], a:1},

  ],

  /* ============ B1 ============ */
  B1: [
    {id:'b1-01', skill:'grammar', level:'B1', q:'If she ___ about the meeting, she would have come.', opts:['had known','knew','has known'], a:0},
  {id:'b1-02', skill:'grammar', level:'B1', q:'I\'d rather you ___ anything to the manager yet.', opts:['didn\'t say','don\'t say','won\'t say'], a:0},
  {id:'b1-03', skill:'grammar', level:'B1', q:'The house ___ windows are broken has been empty for years.', opts:['whose','which','its'], a:0},
  {id:'b1-04', skill:'vocab', level:'B1', q:'She ___ her presentation well; everyone stayed focused.', opts:['delivered','declared','denied'], a:0},
  {id:'b1-05', skill:'vocab', level:'B1', q:'The medicine will ___ the pain, not cure the cause.', opts:['relieve','retrieve','revise'], a:0},
  {id:'b1-06', skill:'vocab', level:'B1', q:'Honestly, his explanation didn\'t ___ sense.', opts:['make','do','take'], a:0},
  {id:'b1-07', skill:'reading', level:'B1',
   p:'When the small town of Ashford lost its only cinema, most residents expected the building to stay empty. Instead, a group of volunteers turned it into a community kitchen. Today it serves over two hundred free meals a week, funded entirely by local businesses. Attendance at town meetings has doubled since it opened — something the mayor credits to the kitchen bringing people together.',
   q:'Why does the mayor think more people attend town meetings?', opts:['The kitchen brings the community together','There are more problems to discuss now','Meetings are held inside the kitchen'], a:0},
  {id:'b1-08', skill:'reading', level:'B1',
   p:'When the small town of Ashford lost its only cinema, most residents expected the building to stay empty. Instead, a group of volunteers turned it into a community kitchen. Today it serves over two hundred free meals a week, funded entirely by local businesses. Attendance at town meetings has doubled since it opened — something the mayor credits to the kitchen bringing people together.',
   q:'Who pays for the meals?', opts:['Local businesses','The town council','The volunteers themselves'], a:0},
  {id:'b1-09', skill:'listening', level:'B1',
   t:'Good morning, everyone. Quick reminder before we start the tour: photography is allowed inside the museum, but flash photography is strictly forbidden in the ancient gallery — the light damages the paintings. Lunch will be at half past twelve in the courtyard.',
   q:'Why is flash photography forbidden in the ancient gallery?', opts:['It damages the paintings','It disturbs other visitors','The gallery is too dark'], a:0},
  {id:'b1-10', skill:'listening', level:'B1',
   t:'You have reached the Riverside Clinic. If this is a medical emergency, hang up and dial 115. For prescription refills, press one. To book or move an appointment, press two. Please note: the clinic will close early this Friday at two o\'clock for staff training.',
   q:'What happens this Friday?', opts:['The clinic closes at 2 p.m.','Staff cannot refill prescriptions','The clinic is completely closed'], a:0},

  ],

  /* ============ B2 ============ */
  B2: [
    {id:'b2-01', skill:'grammar', level:'B2', q:'Not only ___ the deadline, but the report also won an award.', opts:['did the team meet','the team met','met the team'], a:0},
  {id:'b2-02', skill:'grammar', level:'B2', q:'The minister was ___ resign after the scandal broke.', opts:['forced to','forced','forcing'], a:0},
  {id:'b2-03', skill:'grammar', level:'B2', q:'___ the traffic, we arrived only ten minutes late.', opts:['Despite','Although','Even'], a:0},
  {id:'b2-04', skill:'vocab', level:'B2', q:'The CEO\'s statement did little to ___ fears of job cuts.', opts:['allay','alleviate','alloy'], a:0},
  {id:'b2-05', skill:'vocab', level:'B2', q:'The two accounts of the accident are broadly ___.', opts:['congruent','consecutive','contingent'], a:0},
  {id:'b2-06', skill:'vocab', level:'B2', q:'Critics called the policy a ___ attempt to win votes before the election.', opts:['cynical','clandestine','chronic'], a:0},
  {id:'b2-07', skill:'reading', level:'B2',
   p:'For decades, sleep researchers treated the brain\'s waste-clearance system — the glymphatic system — as an area of niche interest. The 2010s changed that. Imaging studies showed that during deep sleep, the spaces between brain cells expand by as much as sixty percent, allowing cerebrospinal fluid to flush out metabolic debris, including the beta-amyloid plaques associated with Alzheimer\'s disease. The finding reframed sleep deprivation from a lifestyle annoyance into a measurable neurological risk, and it did something sleep advocates had long failed to do: it gave policy-makers a molecular argument for later school start times.',
   q:'What did the imaging studies show about deep sleep?', opts:['Brain cell spaces expand, letting fluid clear waste','The brain produces more beta-amyloid at night','Sleep deprivation shrinks the glymphatic system'], a:0},
  {id:'b2-08', skill:'reading', level:'B2',
   p:'For decades, sleep researchers treated the brain\'s waste-clearance system — the glymphatic system — as an area of niche interest. The 2010s changed that. Imaging studies showed that during deep sleep, the spaces between brain cells expand by as much as sixty percent, allowing cerebrospinal fluid to flush out metabolic debris, including the beta-amyloid plaques associated with Alzheimer\'s disease. The finding reframed sleep deprivation from a lifestyle annoyance into a measurable neurological risk, and it did something sleep advocates had long failed to do: it gave policy-makers a molecular argument for later school start times.',
   q:'The phrase "reframed sleep deprivation" suggests that the finding ___.', opts:['changed how society views lack of sleep','proved sleep deprivation is harmless','made sleep research less popular'], a:0},
  {id:'b2-09', skill:'listening', level:'B2',
   t:'Before we sign off, one housekeeping note for next week\'s seminar. Professor Lindqvist\'s lecture has been moved from Wednesday to Thursday at four, in hall B — not because of scheduling conflicts, but because the recording equipment in hall A is being upgraded. Students who cannot attend Thursday should register for the livestream by Monday.',
   q:'Why was the lecture moved?', opts:['Hall A\'s recording equipment is being upgraded','Professor Lindqvist has a scheduling conflict','Hall B is bigger than hall A'], a:0},
    {id:'b2-10', skill:'listening', level:'B2',
   t:'Thank you for calling Meridian Insurance. Please listen carefully, as our menu options have changed. For claims related to property damage, press one. For vehicle claims, press two. For life insurance and pension enquiries, press three. If you are calling about a policy purchased before January this year, please note that those policies are now managed by Halcyon Group — you can reach them directly at the number printed on your documents.',
   q:'What has changed about older policies?', opts:['Another company now manages them','They can no longer be claimed','Their prices have increased'], a:0},
  ],
};

// Pair passages with their questions at render time (bank entries above carry `p`).
// Listening items carry `t` (script) — the player page speaks it via TTS.

// ---- runtime shuffle: kill any answer-position pattern ----
(function shuffleBank(bank){
  Object.keys(bank).forEach(function(lvl){
    bank[lvl].forEach(function(it){
      var correct = it.opts[it.a];
      // deterministic-ish shuffle per item id (stable across reloads within a session)
      for(var i = it.opts.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var t = it.opts[i]; it.opts[i] = it.opts[j]; it.opts[j] = t;
      }
      it.a = it.opts.indexOf(correct);
    });
  });
})(window.PLACEMENT_BANK);
