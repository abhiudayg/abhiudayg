---
title: 'starting this dev journey: building a cozy corner on the web ✨'
description: 'why i built a small personal blog with RSS, and why sharing things as you build them makes engineering joyful 🤍'
pubDate: 2026-06-17
tags: ['engineering-manifesto', 'systems-engineering', 'open-source', 'dev-blog', 'architecture-notes']
---

i wanted a cozy little corner of the internet that truly belongs to me — not an algorithmic feed, not a rented platform thread, and definitely not a corporate newsletter 🤍.

so i spent a fun evening putting this together: a small, featherlight static site with pure Markdown posts in Git and a 100% tracker-free RSS feed at `/rss.xml`!

---

## why open RSS is so special ✨

RSS fits how i actually love to read.

i can follow friends, independent engineers, and my own notes in one quiet reader (like NetNewsWire or Reeder) without an algorithm trying to maximize my screen time or push ads in my face.

for an engineering blog, that matters so much. these posts are reference material as much as updates. i want them archived, searchable, and easy to read whenever someone needs them ☕.

---

## what i'll be sharing

expect a fun mix of:

- **shipping logs 🚢** — what we built this week, why we made certain trade-offs, and what broke along the way!
- **debugging stories 🐛** — the weird error message, the funny assumption, and the 5-minute fix that saved the day.
- **notes to future me 🤍** — little Linux quirks, compiler tricks, and patterns i don't want to forget.

no rigid publishing schedules or artificial growth tactics here. the goal is just genuine delight in building and documenting the journey.

---

## how this little site runs 🚀

under the hood, it's [Astro](https://astro.build/) with static Markdown in `src/content/blog/`. running `bun dev` boots locally in a few milliseconds, and `bun run build` outputs pure static HTML with zero client-side tracking scripts.

to publish a post, i just write a new markdown file, push to git, and the site updates automatically.

the doors are open, the feed is warm, and the shipping intensifies 🚢✨!

welcome, and hope you enjoy poking around 🤍!
