---
title: Using the .flush() Method
codepen_slug: bGaXbLy
---

The `.flush()` method can be used in place of `.go()` to kick off an animation you've built. It's handy if you'd like to type out some one-off content that's unknown until runtime. For example, you begin with a pre-defined animation (using `.go()`), and then wait to accept some user input before typing some more.

Animations executed via `.flush()` are forgotten upon execution, so calling `.reset().go()` later on will not type them out again. Additionally, since its intended to be used for more emphemeral content, `.flush()` will not execute the `afterComplete` callback.

For more information, check out the [docs](/docs/vanilla/instance-methods/#flush).
