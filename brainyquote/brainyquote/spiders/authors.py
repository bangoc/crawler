# -*- coding: utf-8 -*-
import scrapy
from brainyquote.items import AuthorItem

class AuthorsSpider(scrapy.Spider):
    name = 'authors'
    allowed_domains = ['www.brainyquote.com']
    start_urls = ['https://www.brainyquote.com']

    def parse(self, response):
        authors_lists = response.css('span.body.bq-tn-letters').css('a')
        for a in authors_lists:
          link = response.urljoin(a.attrib['href'])
          yield scrapy.Request(link, callback=self.parseAuthorsList)

    def parseAuthorsList(self, response):
      rows = response.css("div.bq_s table tbody tr")
      for r in rows:
        cols = r.css("td")
        item = AuthorItem()
        item["link"] = cols[0].css('a').attrib['href']
        item["prof"] = cols[1].css('::text').extract_first()
        yield item
      lis = response.css("ul.pagination > li")
      next_button = lis[len(lis) - 1].css('a')
      if next_button:
        next_link = response.urljoin(next_button.attrib['href'])
        yield scrapy.Request(next_link, callback=self.parseAuthorsList)
