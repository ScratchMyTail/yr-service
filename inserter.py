from pymongo import MongoClient, GEO2D

client = MongoClient('localhost', 27017)
db = client.yr
db.steder.remove()
with open('stader.txt') as f:
    content = f.read().splitlines()

    for line in content:
    	line = line.split("\t")
    	sted = line[1]
    	kommune = line[6]
    	lat = line[8]
    	lng = line[9]
    	url = line[12]

    	db.steder.insert({"sted": sted, "kommune": kommune, "url": url, "loc":[float(lat), float(lng)]})

db.steder.create_index([("loc", GEO2D)])














