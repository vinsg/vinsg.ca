---
title: Graphql introduction
description: Introduction to Graphql and Spring Boot support.
date: 2022-07-01
draft: false
---

## Introduction to Graphql

![graphql logo](/assets/lectures/graphql-intro/graphql-logo.png) <!-- .element: class="r-stretch" width="20%" style="margin:auto"-->

press space to continue <!-- .element: class="pt-10 text-base text-slate-300 animate-pulse" -->

Notes:
By Vincent Salamanca-Gagnon

---

### Outline

- What is Graphql
- Basic concepts and usage
- Spring Boot support
- Demo use case

---

## What is Graphql

---

A query language for your API

```graphql
type Project {
  name: String
  tagline: String
  contributors: [User]
}
```

Notes: Graphql is a query language for your API. It is a specification that describes how to ask for data and how to respond to those requests. It is a way to create APIs that provide data in a flexible, efficient and declarative way.

---

### History

- Created by Facebook in 2012 <!-- .element: class="fragment" -->
- Open sourced in 2015 <!-- .element: class="fragment" -->
- GraphQL Foundation and 1.0 in 2018 <!-- .element: class="fragment" -->
- Spring Boot support in 2019 <!-- .element: class="fragment" -->

Notes: Created by Facebook to address challenges with building a mobile application.

---

## Why Graphql

---

![problem](/assets/lectures/graphql-intro/problem-4.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![problem](/assets/lectures/graphql-intro/problem-3.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![problem](/assets/lectures/graphql-intro/problem-2.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![problem](/assets/lectures/graphql-intro/problem-1.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![problem](/assets/lectures/graphql-intro/problem-0.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

---

### Issues

- over or under fetching <!-- .element: class="fragment" -->
- multiplication of endpoints <!-- .element: class="fragment" -->
- no standard schema <!-- .element: class="fragment" -->

---

## A better way

---

![solution](/assets/lectures/graphql-intro/solution-3.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![solution](/assets/lectures/graphql-intro/solution-2.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![solution](/assets/lectures/graphql-intro/solution-1.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

--

![solution](/assets/lectures/graphql-intro/solution-0.svg) <!-- .element: style="filter: brightness(0) invert(1)" -->

---

### Benefits
- Unified API endpoint /graphql <!-- .element: class="fragment" -->
- Efficient data fetching <!-- .element: class="fragment" -->
- Faster performance <!-- .element: class="fragment" -->
- Strongly typed schema <!-- .element: class="fragment" -->

---

## The schema

---

A **schema.graphqls** file describes the API

```graphql[1-5|2|7-10|8|9|12-14]
type Order {
	id: ID!
	name: String!
	status: String!
}

type Query {
	orders: [Order]
	orderById(id: ID!): Order
}

type Mutation {
	updateOrderStatus(id: ID!, status: String!): Order
}
```

Notes:
Schema is a collection of types. Each type has a set of fields. Each field has a type.
! means that the field is required.
ID is a special type that is serialized as a String but is expected to be unique.
Query are read operations.
[Order] is a list of Order.
You can also have arguments on fields.
Mutation are write operations.

---

On the client side, we write **queries**

```graphql
query {
  orders {
    id
    name
    status
  }
}
```

---

### Graphiql ♥️

<iframe title="GraphiQL" width="100%" height="500px" class="fragment" src="https://embed.graphql.com/embed?endpointURL=%22https%3A%2F%2Fswapi-graphql.netlify.app%2F.netlify%2Ffunctions%2Findex%22&query=%22query%20Query%20%7B%5Cn%20%20allFilms%20%7B%5Cn%20%20%20%20films%20%7B%5Cn%20%20%20%20%20%20title%5Cn%20%20%20%20%20%20director%5Cn%20%20%20%20%20%20releaseDate%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5Cn%7D%22&variables=%22%22&response=%22Hit%20run!%5Cn%22&history=false&prettify=false&docs=true"></iframe> 

Notes:
Graphiql is a tool that allows you to explore your schema and write queries.
It is a web application that you can embed in your application easily.

---

### Operations
- query <!-- .element: class="fragment" -->
- mutation <!-- .element: class="fragment" -->
- subscription  <!-- .element: class="fragment" -->
- fragment <!-- .element: class="fragment" -->

Notes: 
- query for read operations
- mutation for write operations
- subscription for real-time data 
- fragment for reusable pieces

---

### Types
- Scalar (String, Int, Float, Boolean, ID) <!-- .element: class="fragment" -->
- Object (User, Order, ...) <!-- .element: class="fragment" -->
- Enum (Status, ...) <!-- .element: class="fragment" -->
- Interface (Node, ...) <!-- .element: class="fragment" -->

Notes:
- Scalar are the primitive types
- Object are the types that you define
- Enum are a set of possible values
- Interface are a set of fields that can be implemented by other types
  
---

### Spring Boot support
- Based on GraphQL Java <!-- .element: class="fragment" -->
- Use annotations <!-- .element: class="fragment" -->
- Auto configuration <!-- .element: class="fragment" -->
- Integrate with Spring Data! <!-- .element: class="fragment" -->

---

# DEMO

---

### Tech used
<div class="gallery" style="filter: brightness(0) invert(1)">
  <div class="gallery__item fragment">
    <img src="/assets/lectures/graphql-intro/android.png" alt="Android">
	</div>
  <div class="gallery__item fragment">
    <img src="/assets/lectures/graphql-intro/apollo.png" alt="Apollo">
  </div>
  <div class="gallery__item fragment" width="10%">
	<img src="/assets/lectures/graphql-intro/spring-graphql.svg" alt="Spring-for-GraphQL">
  </div>
</div>

---

### Much more to learn
- pagination, filtering, sorting <!-- .element: class="fragment" -->
- security <!-- .element: class="fragment" -->
- schema federation <!-- .element: class="fragment" -->
- and more <!-- .element: class="fragment" -->

---

### References
- [graphql.org](https://graphql.org/)
- [GraphQL: The Documentary](https://www.youtube.com/watch?v=783ccP__No8)
- [Apollo client](https://www.apollographql.com/docs/kotlin)
- [Spring for GraphQL](https://docs.spring.io/spring-graphql/docs/current-SNAPSHOT/reference/html/#overview)

Notes:
- graphql.org is the official website
- Graphql: the documentary is a great video to learn more about the history of GraphQL
- Apollo client is a great client library for GraphQL, the tutorial is a great strating point
- Spring for GraphQL is the official documentation for the Spring Boot integration

---

# Questions?

---

<section data-background-video="/assets/lectures/graphql-intro/thank-you.mp4" 
          data-background-video-loop data-background-video-muted data-background-opacity=0.5> 
  <h2>Thank you</h2>
  <p><a href="https://github.com/vinsg">github.com/vinsg</a> · <a href="https://vinsg.ca">vinsg.ca</a> · <a href="https://github.com/vinsg/vinsg.ca/blob/master/src/content/lectures/graphql-intro.md">slides source</a></p>
</section>

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 1rem;
}

.gallery__item {
  position: relative;
}

.gallery__item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.gallery__item p {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  text-align: center;
}
</style>

