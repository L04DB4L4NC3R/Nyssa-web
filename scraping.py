import bs4
#from urllib import request
import requests
import sys


def bfulSoup(url):    #to return google,youtube and wiki links to given query adn extract top 10 links from wikipedia
    try:
        file= requests.get(url).text#request.urlopen(url).read()
        content = bs4.BeautifulSoup( file,'html.parser')


        imgs = content.findAll('a',{'class','a-link-normal'})
        f=open('routes/scraped.txt','w')
        for img in imgs:
            f.write(str(img))
        f.close()

    except:
        pass

    return "done"

bfulSoup(sys.argv[1])
