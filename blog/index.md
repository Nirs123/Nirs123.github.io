---
layout: single
title: Blog
permalink: /blog/
author_profile: true
---

{% assign today = site.time | date: '%s' %}

<ul class="post-list">
  {% for post in site.posts %}
    {% assign post_date = post.date | date: '%s' %}
    {% if post_date <= today %}
      <li>
        <h3>
          <a href="{{ post.url | relative_url }}">
            {{ post.title }}
          </a>
          <small>{{ post.date | date: "%d/%m/%Y" }}</small>
        </h3>
        <a>{{ post.description }}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
