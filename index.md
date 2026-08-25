---
layout: default
title: Home
---
<h1 class="page-heading">{{ site.title }}</h1>
<p class="page-intro">{{ site.description }}</p>

<div class="how-to">
  <p><strong>Browse</strong> — pick a subject below to see its links, grouped by area.</p>
  <p><strong>Search</strong> — press <kbd>/</kbd> or use the bar above to search every subject at once.</p>
</div>

<div class="subject-grid">
  {% for subject in site.subjects %}
  {%- assign groups = site.data.links[subject.key] -%}
  {%- assign total = 0 -%}
  {%- for group in groups -%}{%- assign total = total | plus: group[1].size -%}{%- endfor -%}
  <a class="subject-tile" href="{{ subject.slug | prepend: '/' | append: '/' | relative_url }}">
    <span class="icon" aria-hidden="true">{{ subject.icon }}</span>
    <span class="name">{{ subject.title }}</span>
    <span class="tally">{{ total }} link{% unless total == 1 %}s{% endunless %} · {{ groups.size }} area{% unless groups.size == 1 %}s{% endunless %}</span>
  </a>
  {% endfor %}
</div>
