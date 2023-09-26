import shadowdarkrt from '../../data/shadowdarkrt.json';
import stoneydark from '../../data/stoneydark.json';
import entities from '../../data/entities.json';
import { randInt, weightedRandom, arrayPullElem, choose } from '../helpers.js';



export class Entities {
  all_entities = entities
}





export class Shadowdark {}

export class NPC extends Shadowdark {
  // Display order
  display = ['name', 'ancestry', 'age', 'alignment', 'wealth', 'appearance', 'does', 'secret', 'occupation'];
  // Ancestry,  name, age, alignment, wealth
  ancestry = weightedRandom(arrayPullElem(shadowdarkrt.npc.ancestry), arrayPullElem(shadowdarkrt.npc.ancestry, 1));
  name = this.chooseName(this.ancestry);
  age = weightedRandom(arrayPullElem(shadowdarkrt.npc.age), arrayPullElem(shadowdarkrt.npc.age, 1));
  alignment = weightedRandom(arrayPullElem(shadowdarkrt.npc.alignment), arrayPullElem(shadowdarkrt.npc.alignment, 1));
  wealth = weightedRandom(arrayPullElem(shadowdarkrt.npc.wealth), arrayPullElem(shadowdarkrt.npc.wealth, 1));

  // Qualities
  appearance = choose(shadowdarkrt.npc.qualities.appearance);
  does = choose(shadowdarkrt.npc.qualities.does);
  secret = choose(shadowdarkrt.npc.qualities.secret);

  // Occupation
  occupation = choose(shadowdarkrt.npc.occupation);

  chooseName(ancestry) {
    let r = randInt(1, 100);
    let outName = '';

    if (r <= 50) {
      outName = choose(shadowdarkrt['npcName']['namesByAncestry'][ancestry]);
    } else {
      outName = choose(shadowdarkrt.npcName.namesBySyllable.prefix) + choose(shadowdarkrt.npcName.namesBySyllable.syllable2) +
            choose(shadowdarkrt.npcName.namesBySyllable.syllable3) + choose(shadowdarkrt.npcName.namesBySyllable.suffix) + ' ' + choose(shadowdarkrt.npcName.namesBySyllable.identifier);
    }
    return outName;
  }
}

export class StoneyNPC extends NPC {
  display = ['name', 'ancestry', 'accent', 'age', 'alignment', 'wealth', 'appearance', 'does', 'secret', 'occupation'];
  accent = choose(stoneydark.npc.accents);
}
