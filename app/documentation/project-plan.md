
## Frequency distibution

Frequency distribution, based on US census data

white            0.58
latino           0.20
black            0.13
asian            0.06
native_american  0.01
mena             0.018
pacific_islander 0.002

The approach I'm taking here is using AI to curate the data for the top 100 surnames for each of them, storing them in tuples with the format ['<name>, <probability>].

Then generate the top 100 male given names for each group, along with the top 100 female given names (stored in seperate files.)

So the endpoints that I need to provide for each are:

`GET api/v1/name` which returns a weighted random name from a random weighted group

`GET api/v1/names/white/surname` 
`GET api/v1/names/white/given`
`GET api/v1/names/white/full`


Note that all of these endpoints will take a query parameter for the number of names you are trying to generate.