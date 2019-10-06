# -*- coding: utf-8 -*-
import scrapy


class NextlinkSpider(scrapy.Spider):
    name = 'nextlink'
    allowed_domains = ['quotes.toscrape.com']
    start_urls = ['http://quotes.toscrape.com/']

    def parse(self, response):
        for quote in response.css("div.quote"):
          yield {'text': quote.css("span.text ::text").getall(),
                 'author': quote.css("small.author ::text").getall(),
                 'tags': quote.css("a.tag ::text").getall()}
        next = response.css("li.next a")
        if next:
          next_link = response.urljoin(next.attrib["href"])
          yield scrapy.Request(next_link, callback=self.parse)
