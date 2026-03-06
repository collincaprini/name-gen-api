Below is a cleaned-up version that keeps the same tone and intent but tightens the structure, removes repetition, and fixes grammar. I did **not** change the argument or voice—just clarified and organized it.

---

# Rich Name Generation

I built this name generator based on lessons learned from a number of name-searching projects I have contributed to.

Name generation seems like a simple problem. Make some lists of given names and surnames, generate names in the format `"First Middle Last"`, stick them wherever you need mock data, and move on.

Depending on the use case, however, this approach can cause problems.

**TODO:** write tests for 1,000,000 names in Elasticsearch using three configurations:

* 1 given name
* 4 given names
* realistic distribution

Measure:

* storage sizes
* query times
* indexing behavior

For the initial testing, I generated several Elasticsearch indices, each containing **100,000 records**, to compare different assumptions about name structure.

---

## Notes on Ethnicity Buckets

The terminology used here to group ethnicities is dated and sometimes uncomfortable. These labels are simply the categories used in large datasets of names.

I am not a social scientist and am not interested in analyzing the demographics themselves. The only reason these groupings matter here is because **different naming conventions across cultures affect storage size, tokenization, and query behavior** when working with search systems.

---

# The Problem Statement

Imagine you need to generate mock data for an application whose user base roughly mirrors the diversity of the United States. The system includes **name-search functionality** and uses Elasticsearch's `semantic_text` field type.

You need to estimate:

* storage requirements
* sharding strategies
* expected query latency

So you generate a mock dataset.

A common naive approach would be:

* assume names follow the structure **first / middle / last**
* take the **top 100 names in the U.S.**
* generate combinations from those lists

This produces data like:

```json
[
  "Elizabeth Amanda Cole",
  "James Kevin Cook",
  "Stephanie Cynthia Cox",
  "Mary Mary Phillips",
  "James Edward Young"
]
```

The problem is that this approach quietly assumes a few things:

1. Names follow **Western naming conventions**
2. Most names are derived from **census-white surname distributions**
3. Everyone has **exactly three names**

But a real dataset might contain names like:

```json
[
  "Mary Patricia Turner",
  "Daniela Beatriz Sanchez",
  "Latisha Kayla Barbara Mary Baker",
  "Juana Alvarez",
  "Joshua Wesley Morgan"
]
```

Even in these five examples we see several patterns:

1. Some cultures are more likely to have **only one given name**.
2. Some cultures commonly have **more than two given names**.
3. Some cultures use **longer and more complex given names or surnames**.

These differences affect **token counts, document length, index size, and query latency**.

---

# Dataset Experiments

## semantic-normal

This dataset attempts to approximate the **U.S. population distribution** using census and related data.

The number of given names ranged between **1 and 4**, sampled from a cumulative distribution function representing real naming patterns.

Queries were generated using the **same parameters as the dataset itself**.

**Results**

* 100,000 documents
* index size: **36 MB**

Latency:

* min: 4 ms
* max: 79 ms
* avg: 32.623 ms
* p50: 33 ms
* p95: 45 ms

---

## semantic-white-first-middle-last

This dataset represents a **naive implementation**:

* only names classified as "white"
* strict **first / middle / last** structure

**Results**

* 100,000 documents
* index size: **29.6 MB**

Latency:

* min: 4 ms
* max: 56 ms
* avg: 30.309 ms
* p50: 33 ms
* p95: 38 ms

---

## Comparison

At this scale the results look fairly similar, but some patterns emerge.

**Index size**

* realistic dataset is **17.8% larger**

**Average latency**

* naive dataset is **7.1% faster**

**Median latency**

* identical (**33 ms**)

**Tail latency**

* realistic dataset is **15.6% worse**

In other words:

* typical queries behave similarly
* **slow queries are noticeably slower**
* index footprint is meaningfully different

These differences become more important as the dataset grows.

---

# Another Scenario

Now imagine a different situation.

You are building a mock dataset for a **Middle Eastern government database** containing citizen identities.

Again, you must estimate:

* storage requirements
* distribution strategies
* expected query performance

But you generate your test data using one of the naive methods above.

After all, they're just names in a database. Why would it matter?

What you don't know is that the real dataset looks like this:

```json
[
  "Hassan Muhammad Ahmad Youssef",
  "Muhammad Abdullah",
  "Rivka Fatma Amira Ali",
  "Sibel Sahar Haddad",
  "Ahmad Muhammad Ahmed Muhammad Ahmed"
]
```

Now the question becomes:

**How far off are your infrastructure estimates?**

---

## semantic-mena

This dataset was generated using names classified as **Middle Eastern or North African**.

**Results**

* 100,000 documents
* index size: **51 MB**

Latency:

* min: 4 ms
* max: 85 ms
* avg: 35.817 ms
* p50: 35 ms
* p95: 58 ms

---

## Comparison

Now the differences are substantial.

**Index size**

* **41.7% larger** than the U.S. distribution
* **72.3% larger** than the naive white-first-middle-last dataset

**Average latency**

* **9.8% slower** than the U.S. distribution
* **18.2% slower** than the naive dataset

**Median latency**

* roughly the same

**Tail latency**

* **28.9% worse** than the U.S. distribution
* **52.6% worse** than the naive dataset

At this point the assumptions begin to matter.

If you used the naive dataset to estimate infrastructure:

* your storage projections are wrong
* your latency expectations are wrong
* your capacity planning is wrong

Your boss is unhappy.
Your users are unhappy.

---

# Summary

That is why this project exists.

Creating **useful mock name datasets** is more complicated than it appears. When working at scale, small structural differences in naming conventions can have real effects on:

* storage size
* tokenization
* indexing behavior
* query latency

This tool exists so that developers can quickly generate **more realistic mock name datasets** when testing systems that involve name search.

Also, my portfolio was empty and I had done some interesting work on this topic, so this seemed like a good thing to build.
