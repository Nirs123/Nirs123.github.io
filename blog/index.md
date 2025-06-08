---
layout: default
title: Blog
permalink: /blog/
---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <h3>
        <a href="{{ post.url | relative_url }}">
          {{ post.title }}
        </a>
      </h3>
      <small>{{ post.date | date: "%d/%m/%Y" }}</small>
    </li>
  {% endfor %}
</ul>
