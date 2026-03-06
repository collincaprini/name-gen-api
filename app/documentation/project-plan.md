
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

`GET api/v1/names


Note that all of these endpoints will take a query parameters for:
- gender (which will be male or female)
- ethnicity (comma separated list)
- givenNameCount (an integer less than 10) for hardcoding number of names
- count (an integer number less than 1000) 

## Features to come
I want to make the quadruple profiles something the user can modify and pass in, for some of them.
So let's say gender, number of names, and ethnicity can be configured and passed in to the endpoints.
Right now the ethnicity selector is the most naive of the query params.  It works, but it really is only useful if you are doing default distibutions or a single ethnicity, because if you are getting more than one ethnicity you have no way of adjusting the distribution.  