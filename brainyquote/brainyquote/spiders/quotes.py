# -*- coding: utf-8 -*-
import scrapy
import json
from brainyquote.items import QuoteItem

class QuotesSpider(scrapy.Spider):
    name = 'quotes'
    allowed_domains = ['www.brainyquote.com']
    root = 'https://www.brainyquote.com'
    start_urls = []

    def parse(self, response):
        quotes = response.css('div.m-brick.bqQt')
        for qt in quotes:
          item = QuoteItem()
          item['text'] = qt.css('a.b-qt ::text').extract_first()
          item['author'] = qt.css('a.bq-aut ::text').extract_first()
          item["tags"] = []
          tags = qt.css('a.qkw-btn')
          for tg in tags:
            item['tags'].append(tg.css('::text').extract_first())
          yield item

    def start_requests(self):
        if hasattr(self, 'filename'):
          print(self.filename)
        else:
          print("Usage: scrapy crawl -a filename=authors.json")
          return

        with open(self.filename) as input:
          data = json.load(input)
          for item in data:
            full_link = self.root + item['link']
            yield scrapy.Request(full_link, callback=self.parse)