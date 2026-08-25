---
layout: default
title: Home
---
<h1 class="page-heading">{{ site.title }}</h1>
<p class="page-intro">{{ site.description }}</p>

<div class="subject-grid">
  {% for subject in site.subjects %}
  <a class="subject-tile" href="{{ site.baseurl }}/{{ subject.key }}/">
    <span class="icon">{{ subject.icon }}</span>
    <span class="name">{{ subject.title }}</span>
  </a>
  {% endfor %}
</div>
