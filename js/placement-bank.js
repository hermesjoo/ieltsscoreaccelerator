/* placement-bank.js — original adaptive placement questions, tagged by level + skill.
   difficulty ladder: A1 (easy) → B2 (hard). All items written originally. */
window.PLACEMENT_BANK = {
  A1: [
    {id:'a1-g1', skill:'grammar', q:'"___ name is Ali."', opts:['My','Me','I'], a:0},
    {id:'a1-g2', skill:'grammar', q:'"She ___ a teacher."', opts:['is','are','am'], a:0},
    {id:'a1-g3', skill:'grammar', q:'"They ___ football on Sundays."', opts:['play','plays','playing'], a:0},
    {id:'a1-v1', skill:'vocab', q:'You eat lunch in the ___.', opts:['afternoon','midnight','weekend'], a:0},
    {id:'a1-v2', skill:'vocab', q:'The opposite of "open" is ___.', opts:['closed','clean','dark'], a:0},
    {id:'a1-v3', skill:'vocab', q:'We see with our ___.', opts:['eyes','ears','hands'], a:0},
    {id:'a1-r1', skill:'reading', q:'"Ali has a red car." — What color is the car?', opts:['red','blue','black'], a:0},
    {id:'a1-r2', skill:'reading', q:'"The shop opens at 9 and closes at 5." — The shop is open ___ hours.', opts:['8','9','5'], a:0},
  ],
  A2: [
    {id:'a2-g1', skill:'grammar', q:'"I ___ my homework yesterday."', opts:['did','do','done'], a:0},
    {id:'a2-g2', skill:'grammar', q:'"She is ___ than her brother."', opts:['taller','tall','tallest'], a:0},
    {id:'a2-g3', skill:'grammar', q:'"There aren\'t ___ apples left."', opts:['any','some','much'], a:0},
    {id:'a2-v1', skill:'vocab', q:'You borrow books from a ___.', opts:['library','bakery','station'], a:0},
    {id:'a2-v2', skill:'vocab', q:'"Delicious" describes ___.', opts:['food','weather','music'], a:0},
    {id:'a2-r1', skill:'reading', q:'"Mary bought a ticket, waited at platform 2, and the train arrived ten minutes late." — Where was Mary?', opts:['at a train station','at an airport','at a cinema'], a:0},
    {id:'a2-r2', skill:'reading', q:'"The museum is free on Mondays but costs $10 on other days." — You visit on Wednesday. You pay ___.', opts:['$10','nothing','$5'], a:0},
  ],
  B1: [
    {id:'b1-g1', skill:'grammar', q:'"If I ___ more time, I would learn the guitar."', opts:['had','have','will have'], a:0},
    {id:'b1-g2', skill:'grammar', q:'"He ___ here since March."', opts:['has worked','works','worked'], a:0},
    {id:'b1-g3', skill:'grammar', q:'"The report ___ by the committee last week."', opts:['was reviewed','reviewed','has reviewed'], a:0},
    {id:'b1-v1', skill:'vocab', q:'"The new policy will ___ employment." (help it grow)', opts:['boost','boom','bloom'], a:0},
    {id:'b1-v2', skill:'vocab', q:'"Despite" and "Although" both express ___.', opts:['contrast','reason','result'], a:0},
    {id:'b1-r1', skill:'reading', q:'"Remote work has grown sharply since 2020. Many companies now allow employees to work from home three days a week, though some roles require full-time office presence." — Which is TRUE?', opts:['Some jobs cannot be done remotely.','All workers stay home all week.','Companies ban remote work.'], a:0},
    {id:'b1-r2', skill:'reading', q:'"The city introduced bike lanes to reduce traffic. Within a year, cycling rose 40%, but bus journeys fell only slightly." — What happened to bus use?', opts:['It decreased a little.','It decreased a lot.','It increased.'], a:0},
  ],
  B2: [
    {id:'b2-g1', skill:'grammar', q:'"Had I known about the delay, I ___ differently."', opts:['would have planned','will plan','planned'], a:0},
    {id:'b2-g2', skill:'grammar', q:'"Rarely ___ such dedication in a new employee."', opts:['have we seen','we have seen','we saw'], a:0},
    {id:'b2-g3', skill:'grammar', q:'"The project, ___ funding was secured last month, begins in June."', opts:['whose','which','that'], a:0},
    {id:'b2-v1', skill:'vocab', q:'"The evidence is too ___ to ignore." (strong and convincing)', opts:['compelling','compulsory','complimentary'], a:0},
    {id:'b2-v2', skill:'vocab', q:'"To ___ a theory" means to test it carefully.', opts:['evaluate','evacuate','elevate'], a:0},
    {id:'b2-r1', skill:'reading', q:'"Critics argue that standardized testing narrows curricula, as schools prioritize test subjects. Proponents counter that without common metrics, inequality between schools would be invisible." — Proponents believe tests ___.', opts:['reveal differences between schools','damage education quality','should be abolished'], a:0},
    {id:'b2-r2', skill:'reading', q:'"While urban green spaces improve wellbeing, their benefits are distributed unevenly: wealthier districts typically enjoy larger, better-maintained parks." — The passage suggests green space access is ___.', opts:['linked to district wealth','equal across the city','declining everywhere'], a:0},
  ],
};
