---
layout: single
permalink: /tags/
title: "Posts by Tags"
author_profile: true
---

{% include base_path %}
{% include group-by-array collection=site.posts field="tags" %}

{% assign today = site.time | date: '%s' %}

{% for tag in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ tag | slugify }}" class="archive__subtitle">{{ tag }}</h2>
  {% for post in posts %}
    {% assign post_date = post.date | date: '%s' %}
    {% if post_date <= today %}
      {% include archive-single.html %}
    {% endif %}
  {% endfor %}
{% endfor %}
