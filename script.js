/* =========================================================
   0. TYPEWRITER INTRO LINE
========================================================= */
(function typewriter(){
  const el = document.getElementById('typewriter');
  const line = "one random day. one name. one very long story.";
  let i = 0;
  function type(){
    if(i <= line.length){
      el.textContent = line.slice(0, i);
      i++;
      setTimeout(type, 32);
    }
  }
  type();
})();

/* =========================================================
   1. AMBIENT BOKEH PARTICLES (canvas, gentle upward drift)
========================================================= */
(function bokeh(){
  const canvas = document.getElementById('bokeh');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  window.addEventListener('resize', () => {
    resize(); build();
  });

  function build(){
    const count = Math.min(60, Math.floor((w * h) / 60000));
    particles = Array.from({length: count}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.15 + 0.03,
      alpha: Math.random() * 0.4 + 0.1
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#d4a857';
    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speed;
      if(p.y < -10) p.y = h + 10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize(); build(); draw();
})();


/* =========================================================
   2. LIVE AGE CLOCK — Baseer's age
   Born: 5 September 1995, 12:00 AM IST
========================================================= */

(function ageClock(){

  const birthDate = new Date("1995-09-05T00:00:00+05:30");

  function setOrb(unit, value){
    const orb = document.querySelector(
      `.orb[data-unit="${unit}"] .orb-num`
    );

    if(orb){
      orb.textContent = String(value).padStart(2, '0');
    }
  }

  function updateAge(){

    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    /* Fix negative seconds */
    if(seconds < 0){
      seconds += 60;
      minutes--;
    }

    /* Fix negative minutes */
    if(minutes < 0){
      minutes += 60;
      hours--;
    }

    /* Fix negative hours */
    if(hours < 0){
      hours += 24;
      days--;
    }

    /* Fix negative days */
    if(days < 0){
      const previousMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      );

      days += previousMonth.getDate();
      months--;
    }

    /* Fix negative months */
    if(months < 0){
      months += 12;
      years--;
    }

    setOrb('years', years);
    setOrb('months', months);
    setOrb('days', days);
    setOrb('hours', hours);
    setOrb('minutes', minutes);
    setOrb('seconds', seconds);
  }

  updateAge();

  setInterval(updateAge, 1000);

})();
/* =========================================================
   3. FAN-JOURNEY TIMELINE — scroll-synced fill + reveal
========================================================= */
(function timeline(){
  const points = document.querySelectorAll('.timeline-point');
  const fill = document.getElementById('timelineFill');
  const track = document.querySelector('.timeline');

  function update(){
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const scrolled = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    fill.style.height = pct + '%';

    points.forEach(p => {
      const r = p.getBoundingClientRect();
      if(r.top < vh * 0.8) p.classList.add('active');
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* =========================================================
   4. FILM-STRIP GALLERY — duplicate frames for seamless loop
========================================================= */
(function filmstrip(){
  const strip = document.getElementById('filmstrip');
  strip.innerHTML += strip.innerHTML;
})();

/* =========================================================
   5. MARQUEE BACKGROUND — vertical drifting photo column
========================================================= */
(function marquee(){
  const col = document.getElementById('marqueeCol');
  const files = [
    'm01_blazer.jpg','m02_yellow_jacket.jpg','m03_black_jacket_sit.jpg',
    'm04_brown_hoodie.jpg','m05_group_four.jpg','m06_black_shirt_laugh.jpg',
    'm07_leather_vest.jpg','m08_couch.jpg','m09_kurta.jpg',
    'm10_green_velvet.jpg','m11_red_jacket.jpg'
  ];
 const set = files.map(f => `<img src="images/${f}" alt="">`).join('');
  col.innerHTML = set + set; // doubled for seamless loop
})();

/* =========================================================
   6. LETTER — inject paragraphs + reveal on scroll
========================================================= */
(function letter(){
  const card = document.getElementById('letterCard');

  const paragraphs = [
    `Happiesttt birthdayyy Baseer 🥹🫶🏻`,

    `Sometimes I think about how all of this started, and honestly, it’s funny how completely random it was🫠`,

    `One random day, I saw you for the first time on Bigg Boss, with your name appearing on the screen — “Baseer Ali” — and the first thing I remember noticing was your hair colour😭
I obviously had no idea that this random little moment would eventually turn into something so important to me😌`,

    `Slowly, I kept watching Bigg Boss, started liking those edits of that delusional ship 😭, and without even realising it, I became emotionally attached to you🤍
I loved listening to your strong POVs, watching you absolutely cook people when you had something to say, and somehow even your aggressive side became something I enjoyed watching😭`,

    `But your laugh? I think I’ll always love that more than your charming smile 🤌🏻🥹`,

    `I remember celebrating when you became the captain of the house, loving your fun moments with Salman Khan during Weekend Ka Vaar, getting genuinely worried every time you went into nominations, literally dancing when you came back from nominations, and feeling ridiculously happy every time I saw your follower count going up✋🏻😭`,

    `And I still remember how emotionally affected I’d get whenever I saw you sad or upset in the house😖
There were moments when seeing you hurt genuinely brought tears to my eyes...I don't think I ever expected to care that deeply about someone I was watching on a screen🫠`,

    `I didn’t even realise I was watching Bigg Boss for you until your screen time started getting less and less, and suddenly we barely got to see you😑`,

    `And then came your unfair eviction...❤️‍🩹`,

    `I remember fighting against all those news saying you had been evicted, and then actually crying that entire Sunday-Monday night 😭
I refused to believe it even when I was literally seeing it happen with my own eyes 💔
I was reporting every post that said you were evicted and desperately wishing for you to re-enter😣`,

    `And somehow, that was also when I joined Twitter/X — literally because of you.
I joined for one random trend, and somehow ended up staying here, becoming a part of Baseer Squad and standing strong for you ever since🙂‍↔️`,

    `Leaving the Bigg Boss era aside, I started watching your interviews, listening to you more, watching your vlogs, and constantly demanding Spaces and Ask Sessions on X every chance I got 😂`,

    `And then came that random Thursday morning during Ramadan....`,

    `I still remember seeing that you had accepted my DM request and genuinely thinking, what the heck just happened? 😭😭
I started getting likes and replies from you, and somehow, even now, every single like or reply still gives me that same little excitement🎀
I don’t think I’ll ever get used to it 🥹🫶🏻`,

    `And I think one of the most unexpected and beautiful parts of this journey has been the people I’ve met because of you🙌🏻`,

    `I joined X because of you, but somewhere along the way, I found people who made this journey so much more special.
From random conversations and endless fangirling to our chaotic GCs, celebrating your smallest wins, stressing over your projects, fighting over you, laughing at the most ridiculous things and collectively losing our minds over your posts 😂 — these people slowly became a part of my life !`,

    `I’ve genuinely met some of the most amazing, warm and beautiful souls through this fandom. People I probably would have never crossed paths with if it weren’t for you🥹 
Some of them started as complete strangers and somehow became people I can laugh with, rant to, celebrate with and share so many little moments with🥹🫂`,

    `So, in a strange way, you’ve given me more than just a fandom💖
You gave me a place where I found people I genuinely cherish !!
And for that too, I’ll always be grateful to you🤍`,

    `Somewhere along the way, supporting you stopped being just about liking an actor, a contestant, or a creator.
I started genuinely caring about how you’re doing.When you’re worried, I get worried. When something good happens for you, I feel ridiculously happy 😭
I keep you in my prayers, I defend you whenever I can, I want to counter every false narrative that comes your way, and I’ll always stand up for you whenever I feel you’re being treated unfairly 💁🏻‍♀️
And yes, I sometimes genuinely feel like plucking the tongues out of every hater who says unnecessary things about you 😭`,

    `But beneath all the edits, trends, defending, screaming over your posts, celebrating your wins and complaining about your screen time 😭, there’s something very simple that has stayed constant — I genuinely want the best for you 🫶🏻`,

    `I want to see you happy. 
I want to see you surrounded by people who genuinely value you. 
I want to see you get opportunities that actually match your potential. 
I want to see you reach the kind of success that makes you look back at all the uncertain phases and realise that they were only temporary.`,

    `More than anything, I want to see you at your absolute peak`,

    `Maybe that’s why I get so emotionally invested in your journey. I’ve never supported anyone like this before, and I honestly don’t think I ever will again...
You became my first real favourite, my first reason to join X, and somehow a person whose journey I genuinely want to keep witnessing.`,

    `And somewhere in all of this, I also have this little hope of meeting you someday. 🥹 
Maybe one day I’ll actually get to meet the person who unknowingly became such a huge part of my life from the other side of a screen😩 
I don’t know when or how that day will happen, but I really hope it does🫠
And if it ever does, I know I’ll probably stand there wondering how the person I first saw on a Bigg Boss screen somehow ended up standing right in front of me 😭`,

    `I don’t know what the future holds for you, but I hope it is incredibly kind to you. 
I hope every door that is meant for you opens at the right time. 
I hope no temporary phase ever makes you forget how much potential you carry. 
And I hope you always have people around you who see your heart and your potential as clearly as the people who genuinely support you do.`,

    `Thank you for giving me so many memories without even knowing you were creating them. 
Thank you for the laughs, the excitement, the nervous nomination nights, the celebrations, the endless edits, the random screams over your posts and replies, and honestly… this entire crazy journey 😭🫶🏻`,

    `From that random girl who first noticed “Baseer Ali” on a Bigg Boss screen because she liked your hair colour, to someone sitting here writing an entire birthday letter for you — I guess I really did come a long way 😭`,

    `Happy birthday once again Baseerrr 🥹🤍`,

    `I genuinely hope this is the year that brings you closer to everything you deserve. 
And selfishly, I hope I get to witness it all — every opportunity, every achievement, every milestone, and especially the day when I can finally look at you and say, “See? I told you. 
You were always capable of this” 🥹🫶🏻`,

    `May you always have reasons to smile, reasons to laugh that beautiful laugh of yours, and reasons to be proud of how far you’ve come😌`,

    `Keep growing. 
Keep winning. 
Keep being you 🙌🏻`,

    `And please know that somewhere on this side of the screen, there will always be a very emotionally invested girl cheering for you way louder than necessary 😭🫶🏻`,

    `Happiest birthday once again 🎂`
  ];

  paragraphs.forEach((text, i) => {
    const p = document.createElement('p');
    p.className = 'letter-para' + (i === paragraphs.length - 1 ? ' signoff' : '');
    p.textContent = text;
    card.appendChild(p);
  });

  const items = card.querySelectorAll('.letter-para');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.25 });

  items.forEach(p => io.observe(p));
})();
/* =========================================================
   7. GOLDEN CONSTELLATION + OPENING STAR SHOWER
========================================================= */

/* constellation reveal */

(function constellation(){
  const constellationEl = document.getElementById('constellation');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        constellationEl.classList.add('visible');
        io.disconnect();
      }
    });
  }, {
    threshold:0.35
  });

  io.observe(constellationEl);
})();


/* falling stars when the page opens */

(function starShower(){

  const shower = document.createElement('div');
  shower.className = 'star-shower';
  document.body.appendChild(shower);

  const starCount = 45;

  for(let i = 0; i < starCount; i++){

    const star = document.createElement('span');
    star.className = 'falling-star';

    star.style.left = Math.random() * 100 + 'vw';

    const size = Math.random() * 2.5 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    const duration = Math.random() * 2.5 + 2.5;
    star.style.animationDuration = duration + 's';

    const delay = Math.random() * 2.5;
    star.style.animationDelay = delay + 's';

    const drift = (Math.random() * 120 - 60) + 'px';
    star.style.setProperty('--drift', drift);

    shower.appendChild(star);
  }

  /* remove the shower after the animation finishes */

  setTimeout(() => {
    shower.remove();
  }, 6500);

})();

