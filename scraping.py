import bs4
import urllib.request
import lxml
import sys


def bfulSoup(sys.argv[1]):    #to return google,youtube and wiki links to given query adn extract top 10 links from wikipedia

    content = ''
    try:
        file= urllib.request.urlopen(url).read()

        content = bs4.BeautifulSoup( file,'html.parser')
        imgs = content.findAll('a',{'class','a-link-normal'})
        f=open('scraped.txt','w')
        for img in imgs:
            f.write(str(img) + '$')
        f.close()



    except: pass



    #print(content)
    #ls is list of all key and value pairs for links and titles of the first 10 links extracted from wikipedia
    #info is the particular wikipedia page for the exact query
    #ytd is the youtube link for searching the given query
    #goog_url is the google search results url

url="https://www.amazon.co.uk/s/?field-keywords=shirt"
bfulSoup(url)
