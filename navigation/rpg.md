---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameLevelWater from '{{site.baseurl}}/assets/js/rpg/GameLevelWater.js';
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    const path = "{{site.baseurl}}";
    const gameLevelWater = new GameLevelWater(path);

    // Start game engine
    GameControl.start(gameLevelWater);
</script>

<div id="prompt" style="display:none; position:absolute; top:50px; left:50px; background-color: white; padding: 10px; border: 1px solid black;">Hello!</div>
