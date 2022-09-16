# Domain Driven Design

Designing architectures based on business domains so that things are consistent between the technical and business side.

## Subdomain

"Domain" is a very wide concept. It's the top most level of business that cannot be further divided.

"Subdomain" as the name suggests, is a sub part of the main domain. A subdomain is divided into further subdomains until an independent bounded context is reached.

### Types of Subdomains

#### Core Subdomain

This is where most effort is put and where the company distinguishes itself from the competitors and where the most focus is placed.

#### Supporting Subdomain

It supports the main domain and without it the main domain cannot be successfully worked out. An already existing solution doesn't exist and it requires custom development.

#### Generic Subdomain

A ready-made solution that isn't related to the actual domain in terms of business but is required for the facilitation of the main domain.

## Bounded Context

A bounded context is a logical boundary in terms of context. It defines tangible boundaries of applicability of some subdomain. The same thing might have different meaning in different bounded contexts.

### Ubiquitous Language

Some terms might have different meanings in different contexts. For example, a user when registering is a customer but when checking out is a buyer. The idea is to have the same terminology as the business on the implementation side.
