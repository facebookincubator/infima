# Introduction

## What is it?

Infima is a styling framework that is designed for content-driven websites such as Facebook's open source websites. Many open source maintainers at Facebook are not front-end engineers nor designers, hence expecting them to come up with their own designs for their open source project websites will be additional work on top of the act of preparing their project for open sourcing and writing the necessary documentation. As a styling framework, Infima offers styles for different common user interfaces components - grid, buttons, forms, etc. It is ready to use out-of-the-box via a link tag in your website or power users can customize by selecting exactly what they need.

The main difference between Infima and existing CSS frameworks (e.g. Bootstrap, Bulma) is that it's built with a modern theming approach (CSS variables), modern tooling and has dark mode support out of the box, which makes it perfect for building content-driven websites such as documentation websites. Secondly, an existing problem with using third-party components on your website that leverages a different CSS framework is that the styles (and hence visual appearance) are not compatible with each other. By creating a CSS framework where CSS variables are a first class citizen, third-party components can easily adopt the same style by reading from Infima's CSS variables, resulting in a consistent style even though components are built externally.

## Why the name "Infima"?

In mathematics, the infimum (abbreviated inf; plural infima) of a subset S of a partially ordered set T is the greatest element in T that is less than or equal to all elements of S, if such an element exists.

Infima is a UI framework that provides websites with the minimal CSS and JS needed to get started with building a modern responsive beautiful website. Hence, Infima is a suitable name because if you think of T as the things needed to build a website, and S is the components needed, the infimum of a website will be the styling.
