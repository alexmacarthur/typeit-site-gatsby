---
title: Changelog
description: A description of what each new version of TypeIt carries with it.
enable_sidebar: true
---

## v8.0.0

- BREAKING: Remove support for legacy browsers (primarily Internet Explorer).
- BREAKING: The `.move()` method no longer accepts 'START' or 'END' as the first paramter. Instead, it must be passed as an option in the second parameter. For example: `.move('.selector', {to: 'START'})`.
- ENHANCEMENT: Switch from Rollup to Microbundle for bundling.
- ENHANCEMENT: Reduce bundle size.
- FEATURE: Add ability to make `.type()`, `.delete()`, and `.move()` methods execute instantly by passing an `{ instant: true }` option.
- FEATURE: Allow `.move()` method to accept selectors for typed elements to which the cursor should move.
- FEATURE: Allow `.delete()` method to accept selectors for typed elements to which text should be deleted.
- FEATURE: Allow all chainable methods to accept a function that returns a value, rather than the value itself.
- FEATURE: Introduce CSS custom properties for cursor styling.
- FIX: Fix bug causing the `.move()` method not to work when the cursor was disabled.
- FIX: Fix bug causing hard-coded strings to mess with the `lineBreak` configuration option.
