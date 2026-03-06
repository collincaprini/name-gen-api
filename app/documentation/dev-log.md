# Dev Log

03mar2026
- yesterday I...
  - created the repo
  - initialized the Next.js project
  - installed most of th UI components I plan to use
- today I will...
  - create versioned API structure
  - generate all of the data I will need for given and surnames across the census groups
  - make a test function

04mar2026:
- yesterday I 
  - created all the names with frequency jsons
  - made a basic test function
  - created versioned api folders
- today I will 
  - implement the cdfStart and cdfEnd values, going from tuples to quadruples
  - write some basic functions that test that all of the ai generated 
  - write the functions that generate random names based

05mar2026:
- yesterday I...
  - created the quadruples for generating names
  - created a basic first pass function that gets values from quadruples
  - wrote functions to allow quadruple validation
- today I will...
  - create the api endpoint and define the parameters
  - create a UI page to help the user build queries to run against the api
  - get it uploaded to vercel and link it from my resume site

06mar2026:
- yesterday I...
- today I will...

### AI Use in Development:
Keeping a list here of the places I used AI.  
Functionality and design decisions are made by me, I'm using Codex in the IDE as my assistant here for tedious and repetitive tasks that I understand fully, and ChatGPT pro research for relatively unimportant research tasks
- 03mar2026-ChatGPT Pro- Used to research the most common 100 names for each group, and output json files with tuples in the format of `[<name>, <raw_probability]`
  - this took about 40 minutes for all 7 of the groups to generate:
    - 100 given male names (for each group)
    - 100 given female (for each group)
    - 100 given surnames (for each group)
- 04mar2026-Codex-Used to iterate through each of the tuples, transforming them into quadruples with cdfStart and cdfEnd values
  - this was nearly instant.  GPT-5.3-Codex
  - it worked essentially flawlessly.  The only difference being one array sums to 0.9999999999999999, but that is within a resonable margin of error.
- 05mar2026-ChatGPT Pro-used to help with the data analysis, also to look at my docs and help spellcheck
- 