# Rich Name Generation

I built this name generator based lessons learned from on a number of name searching projects I have contributed to.  Name generation seems like a simple problem; make some simple lists of given names and surnames, generate a bunch of names in the format of "First Middle Last", stick your these in whatever place you need mock data for names, move on with whatever you are doing.

Depending on the use case, however, this will cause a lot of issues. 

TODO: write tests for 1,000,000 names in elasticsearch, in 3 configurations: 1 given name, 4 given names, on average distibuition.  Show storage sizes, query times, etc.