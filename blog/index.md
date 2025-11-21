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
          {% for tag in post.tags %}
            {% assign color = "" %}
            {% if tag == "conference" %}
              {% assign color = "blue" %}
            {% elsif tag == "concours" %}
              {% assign color = "red" %}
            {% elsif tag == "project" %}
              {% assign color = "green" %}
            {% else %}
              {% assign color = "lightgrey" %}
            {% endif %}
            <a href="https://nirs123.github.io/tags#{{ tag }}/"><img src="https://img.shields.io/badge/{{ tag }}-{{ color }}" alt="{{ tag }}"/></a>
          {% endfor %}
          <a href="{{ post.url | relative_url }}">
            {{ post.title }}
          </a>
          <small>{{ post.date | date: "%d/%m/%Y" }}</small>
        </h3>
        <p>{{ post.description }}</p>
      </li>
    {% endif %}
  {% endfor %}
</ul>
