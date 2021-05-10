addLayer("s", {
    name: "shenanigans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	tabFormat: ["main-display", "prestige-button", "resource-display", "upgrades", "challenges", "blank", "buyables"],
	update(diff) {
		if(hasAchievement("a", 41) && player.points.gte(new Decimal(tmp.s.nextAt))) player.s.points = player.s.points.add(1)
		if(hasAchievement("a", 41) && hasMilestone("c", 2) && player.points.gte(new Decimal(tmp.s.nextAt))) {
			for (var i = 1; player.points.gte(new Decimal(tmp.s.nextAt)) && i < 10; i++) player.s.points = player.s.points.add(1)
		}
	},
	resetDescription: "Compress the nothings into ",
    color: "#791C29",
    requires() {let req = new Decimal(1).mul(player.s.points.add(1).pow(player.s.points.add(1)))
				if(hasUpgrade("s", 21) && !hasUpgrade("s", 14) && !inChallenge("s", 12)) req = req.mul(2)
				if(hasUpgrade("s", 14) && !inChallenge("s", 12) && !inChallenge("s", 21) && !inChallenge("s", 22)) req = req.div(42)
				if(hasUpgrade("s", 31) && !inChallenge("s", 12) && !inChallenge("s", 22)) req = req.div(upgradeEffect("s", 31))
				if(hasUpgrade("s", 35)) req = req.div(upgradeEffect("s", 35))
				if(hasUpgrade("s", 51)) req = req.div(upgradeEffect("s", 51))
				if(layers.i.layerShown() == true) req = req.div(layers.i.effect())
				if(hasUpgrade("c", 11)) req = req.mul(layers.c.upgrades[11].effect2().div(100))
				return req}, // Can be a function that takes requirement increases into account
    resource: "shenanigans", // Name of prestige currency
    baseResource: "nothings", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(1).div(new Decimal(1).add(player.s.points.mul(player.s.points.add(1))))}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		rows: 5,
		cols: 5,
		11: {
			title: "A Comeback",
			description() {return "Boosts your nothing's gain by "+format(this.effect2())+"x and you gain more nothings based on shenanigans"},
			effect() {let eff = player.s.points.add(1).root(1.5)
					  if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					  if(hasUpgrade("s", 53)) eff = eff.mul(24)
					  if(inChallenge("s", 12)) eff = new Decimal(1)
					  return eff},
			effect2() {let eff = new Decimal(10)
					   if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					   if(hasUpgrade("s", 53)) eff = eff.mul(24)
					   if(inChallenge("s", 12)) eff = new Decimal(1)
					   return eff},
			effectDisplay() {return "x"+format(this.effect())},
			cost() {return new Decimal(1).sub(layers.c.effect()).max(0)}
			},
		12: {
			title: "Vibe Check",
			description: "Nothings are boosting nothing's gain",
			effect() {let eff = player.points.add(10).log(10)
					  if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					  if(hasUpgrade("s", 32)) eff = eff.mul(upgradeEffect("s", 32))
					  if(hasUpgrade("s", 34)) eff = eff.mul(upgradeEffect("s", 34))
					  if(hasUpgrade("s", 41)) eff = eff.pow(upgradeEffect("s", 41))
					  if(inChallenge("s", 21)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(1)},
			cost() {return new Decimal(3).sub(layers.c.effect()).max(0)}
			},
		21: {
			title: "Sidegrade",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "You gain more nothings based on shenanigans" : hasUpgrade("s", 14) && !inChallenge("s", 21) ? "You gain more nothings based on shenanigans and shenanigans's requirement is divided by 42" : "You gain more nothings based on shenanigans, but shenanigans's requirement is multiplied by 2"},
			effect() {let eff = player.s.points.add(1).root(2)
					  if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					  if(inChallenge("s", 12)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(1)},
			cost() {return new Decimal(5).sub(layers.c.effect()).max(0)}
			},
		22: {
			title: "HERE COMES A NEW CHALLENGER",
			description: "Unlocks a single challenge",
			unlocked() {return player.se.points.gte(1)},
			cost() {return new Decimal(6).sub(layers.c.effect()).max(0)}
			},
		13: {
			title: "Chad Multiplication",
			description: "Boosts 3 first Shenanigans upgrades based on achievements",
			effect() {let eff = new Decimal(player.a.achievements.length).add(1).root(3)
					  if(hasUpgrade("s", 23)) eff = eff.pow(upgradeEffect("s", 23))
					  if(hasUpgrade("s", 42)) eff = eff.mul(upgradeEffect("s", 42))
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost() {return new Decimal(9).sub(layers.c.effect()).max(0)}
			},
		23: {
			title: "Virgin Exponential",
			description: "Boosts \"Chad Multiplication\" based on upgrades bought",
			effect() {let base = new Decimal(1000)
					  if(hasUpgrade("s", 44)) base = new Decimal(100)
					  if(hasUpgrade("c", 14)) base = base.div(layers.c.effect2())
				      let eff = new Decimal(player.s.upgrades.length).div(base).add(1)
					  if(hasUpgrade("s", 15)) eff = eff.mul(upgradeEffect("s", 15))
					  if(hasAchievement("a", 21)) eff = eff.mul(1.1)
					  if(hasUpgrade("s", 52) && !inChallenge("s", 21) && !inChallenge("s", 22)) eff = eff.mul(1.2)
					  if(eff.gte(10)) eff = new Decimal(9).add(eff.log(10))
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return upgradeEffect("s", 23).gte(10) ? "^"+format(this.effect())+"\n(Softcapped)" : "^"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost() {return new Decimal(12).sub(layers.c.effect()).max(0)}
			},
		31: {
			title: "Infinitish Boost",
			description: "Boosts nothing's gain and shenanigans's requirement, but it gets weaker the closer you are to the Infniity.",
			effect() {let eff = new Decimal(2).pow(10240).div(player.points.add(0.001).pow(9)).log(new Decimal(2).pow(1024))
					  if(hasMilestone("t", 0)) eff = eff.mul(layers.t.enlightedEffect())
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost() {return new Decimal(16).sub(layers.c.effect()).max(0)}
			},
		32: {
			title: "BUT ENOUGH REPETITIVE PATTERN, HAVE AT YOU!",
			description: "Boosts \"Vibe Check\" upgrade massively.",
			effect() {let eff = new Decimal(9001)
					  if(hasUpgrade("s", 54)) eff = eff.mul(11)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost() {return new Decimal(19).sub(layers.c.effect()).max(0)}
			},
		33: {
			title: "It's Time To M-M-M-M-M-M-M-M-M-M-M-MILK.",
			description: "Unlocks one more challenge.",
			unlocked() {return player.se.points.gte(2)},
			cost() {return new Decimal(26).sub(layers.c.effect()).max(0)}
			},
		14: {
			title: "The Answer To Shenanigans, pg132's Schedule And Everything",
			description: "\"Sidegrade\"'s 2nd effect is changed.",
			unlocked() {return player.se.points.gte(3)},
			cost() {return new Decimal(41).sub(layers.c.effect()).max(0)}
			},
		24: {
			title: "8th Deadly Sin",
			description() {return inChallenge("s", 21) || inChallenge("s", 22) ? "You've just wasted all of your shenanigans on some exotic airs... This is what you get for spending your shenaingans for something." : "You've just wasted all of your shenanigans on some exotic airs. Atleast they boost your nothing's gain by x420"},
			unlocked() {return player.se.points.gte(3)},
			cost() {return new Decimal(42).sub(layers.c.effect()).max(0)}
			},
		34: {
			title: "Beating Shenanigans Tree NG--",
			description: "What the fuck is wr- I MEAN uhhh- shenanigans boosts \"Vibe Check\" at slightly rate",
			effect() {let eff = player.s.points.add(1.33).log(1.33)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost() {return new Decimal(47).sub(layers.c.effect()).max(0)}
			},
		41: {
			title: "VIBING OVERLOAD!!!",
			description: "\"Vibe Check\"'s effect is exponented based on achievements",
			effect() {let eff = player.a.points.add(1).root(3)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "^"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost() {return new Decimal(50).sub(layers.c.effect()).max(0)}
			},
		42: {
			title: "\"StIlL cHiLl\"",
			description: "You decided to ease off nothing's gain and focus on upgrades, boosting \"Chad Manipulation\" based on bought upgrades",
			effect() {let eff = new Decimal(player.s.upgrades.length).add(1).root(10)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost() {return new Decimal(63).sub(layers.c.effect()).max(0)}
			},
		43: {
			title: "Tock Tock, Who's Knhere?",
			description: "Unlock one more challenge",
			unlocked() {return player.se.points.gte(3)},
			cost() {return new Decimal(69).sub(layers.c.effect()).max(0)}
			},
		44: {
			title() {return hasChallenge("s", 22) ? "Joe" : "???"},
			description() {return hasChallenge("s", 22) ? "Joe who-\nJoe Mama flips you upside down, ignores challenges's effects and boosts \"Virgin Exponential\"'s base by tenfold" : "????????????????"},
			unlocked() {return player.se.points.gte(3)},
			cost() {return hasChallenge("s", 22) ? new Decimal(73).sub(layers.c.effect()).max(0) : new Decimal(2).pow(1024).sub(layers.c.effect()).max(0)}
			},
		15: {
			title: "The Power Of Brotherhood",
			description: "\"Chad Multiplication\" boosts \"Virgin Exponential\" at reduced rate",
			effect() {let eff = upgradeEffect("s", 13).add(10).log(10)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(90).sub(layers.c.effect()).max(0)}
			},
		25: {
			title: "Something's Wrong, I Can Feel It",
			description() {return !inChallenge("s", 12) && !inChallenge("s", 22) ? "Boosts nothing's gain by x262,144" : "Boosts nothing's gain by x1"},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(91).sub(layers.c.effect()).max(0)}
			},
		35: {
			title: "The Idea-l Gun",
			description: "Diving-dies Shenron-nigans's requiem-ment BASED on she-NANI!?-guns",
			effect() {let eff = new Decimal(1.5).pow(player.s.points)
					  if(hasUpgrade("s", 45)) eff = eff.pow(3)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "/"+format(this.effect())},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(105).sub(layers.c.effect()).max(0)}
			},
		45: {
			title: "Hey! Buy This Upgrade!",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "Boosts \"The Idea-l Gun\"'s effect to the power of 1" : "Boosts \"The Idea-l Gun\" upgrade's effect to the power of 3"},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(117).sub(layers.c.effect()).max(0)}
			},
		51: {
			title: "Shenanigans Upgrade",
			description: "Impatience-inators boosts Impatience's effect and divides shenanigans's requirement",
			effect() {let eff = new Decimal(player.i.buyables[11]).add(1)
					  if(hasUpgrade("s", 55) && !inChallenge("s", 12) && !inChallenge("s", 22)) eff = eff.mul(62)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  if(hasUpgrade("c", 23)) eff = eff.mul(layers.c.chaoticEffect3())
					  return eff},
			effectDisplay() {return "x"+format(this.effect())+" /"+format(this.effect())},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(146).sub(layers.c.effect()).max(0)}
			},
		52: {
			title: "A Little Push Won't Hurt",
			description() {return inChallenge("s", 21) || inChallenge("s", 22) ? "Boosts \"Virgin Exponential\" by x1" : "Boosts \"Virgin Exponential\" by x1.2"},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(151).sub(layers.c.effect()).max(0)}
			},
		53: {
			title: "Omega Multiplier",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "\"A Comeback\" is boosted by 1x" : "\"A Comeback\" is boosted by x24"},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(154).sub(layers.c.effect()).max(0)}
			},
		54: {
			title() {return inChallenge("s", 21) || inChallenge("s", 22) ? "SHUT UP!... Wait-" : "IT'S OVER 9000- SHUT UP!"},
			description() {return inChallenge("s", 21) || inChallenge("s", 22) ? "Vegeta, come back! I didn't mean to offend your feelings." : "\"B.E.R.P, H.A.Y.!\"'s effect is multiplied by how many Food Battles there are"},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(161).sub(layers.c.effect()).max(0)}
			},
		55: {
			title: "Everything At The End Of Shenanigans",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "" : "Impatience-inators, Nothing's gain and \"Shenanigans Upgrade\"'s effects are boosted by an entire album of \"E.A.T.E.O.T.\""},
			unlocked() {return player.se.points.gte(4)},
			cost() {return new Decimal(169).sub(layers.c.effect()).max(0)}
			},
	},
	challenges: {
		rows: 3,
		cols: 2,
		11: {
			name: "\"Ouch\"",
			challengeDescription: "Nothing's gain is divided by 7,560 times",
			rewardDescription: "Nothing's gain's base is increased by 60x",
			currencyDisplayName: "nothings",
			goal: new Decimal(8589934592),
			unlocked() {return hasUpgrade("s", 22)}
		},
		12: {
			name: "Tic",
			challengeDescription: "All odd columm numbered Shenanigans upgrades has no effect",
			rewardDescription: "Unlocks another challenge and nothing's gain's base is increased by 60x, again",
			currencyDisplayName: "nothings",
			goal: new Decimal(12800000000000000000000),
			unlocked() {return hasUpgrade("s", 33)}
		},
		21: {
			name: "Tac",
			challengeDescription: "All even columm numbered Shenanigans upgrades has no effect",
			rewardDescription: "Nothing's gain's base is increased by 60x yet again",
			currencyDisplayName: "nothings",
			goal: new Decimal(25600000000000000000000000),
			unlocked() {return hasChallenge("s", 12)}
		},
		22: {
			name: "Toe",
			challengeDescription: "Only first 3 Shenanigans upgrades have effects",
			rewardDescription: "Reveals 16th Shenanigans upgrade and nothing's gain's base is increased by 60x yet again",
			currencyDisplayName: "nothings",
			goal: new Decimal(7.77e83),
			unlocked() {return hasUpgrade("s", 43)}
		},
	},
	buyables: {
		rows: 1,
		cols: 1,
		11: {
			title: "Shenanigans 2 layer",
			display() { return "GO ON TO THE MODFINDER AND YOU'LL BE ABLE  TO PLAY SHENANIGANS TREE 2 FOR FREE, YOU GODDAMN MOTHERFUCKER. IT'S A FUCKING TMT MOD, THEY DON'T EVEN CHARGE PEOPLE FOR IT. YOU DON'T KNOW A GODDAMN THING, IT'S FUCKING SHENANIGANS TREE 2, IT'S FREE!<br/>IT'S FREE<br/><br/>AND IT'S FUN!!!<br/><br/>Cost: IT'S FREE! IT'S FREE... FUCK!!!" },
			canAfford() { return true },
			buy() {
				player.s.buyables[11] = player.s.buyables[11].add(1)
			},
			unlocked() {return player.points.gte(new Decimal(2).pow(1024)) && player.s.buyables[11] < 1},
			style() { return {
				"font-size": "24px",
				"height": "360px",
				"width": "600px"
				}
			}
			}
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for shenanigans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.points.lt(new Decimal(308).pentate(2)) || player["tree-tab"].points.gte(12)},
	doReset(resettingLayer){
		if(layers[resettingLayer].symbol == "C" && hasMilestone("c", 0)) { player.s.points = new Decimal(player.se.points.add(1).pow(2))
																		   if(hasMilestone("c", 1) || player.c.points.gte(2)) player.s.upgrades = [11, 12, 21, 22]
																		   else player.s.upgrades = []
																		   player.s.challenges[11] = 0
																		   player.s.challenges[12] = 0
																		   player.s.challenges[21] = 0
																		   player.s.challenges[22] = 0
																		 }
		else if(layers[resettingLayer].symbol == "T" && hasMilestone("t", 0)) { player.s.points = new Decimal(0)
																				player.s.upgrades = []
																				player.s.challenges[11] = 0
																				player.s.challenges[12] = 0
																				player.s.challenges[21] = 0
																				player.s.challenges[22] = 0
																		      }
	},
})

addLayer("a", {
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
		tabFormat: ["main-display", "blank", "blank", "achievements"],
        color() {return player.a.achievements.length >= 18 && player["tree-tab"].points.lt(12) ? "#77BF5F" : "#E0E0E0"},
        resource: "achievements", 
        row: "side",
        layerShown() {return player.points.lt(new Decimal(308).pentate(2)) || player["tree-tab"].points.gte(12)}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        achievements: {
            rows: 5,
            cols: 6,
            11: {
                name: "Not dealing with this crap",
                done() {return player.points.gte(1/6)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip: "Reach 0.166 nothings<br>Reward: Nothing's gain is x6 bigger", // Shows when achievement is not completed
            },
            12: {
                name: "\"We've reached the endgame already...?\"",
                done() {return player.s.points.gte(3)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip() {return hasAchievement("a", 12) ? "Get 3 shenanigans<br>Reward: Unlocks Square Expansion layer" : "Get 3 shenanigans<br>Reward: Unlocks ██████ █████████ █████"}, // Shows when achievement is not completed
            },
            13: {
                name: "Ah yes, the Nothingiator",
                done() {return player.points.gte(1024)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip() {return "Reach 2^10 nothings<br>Reward: Nothing's gain gets boosted based on time played and all points (achievements excluded)\nCurrently: x"+format(new Decimal(1).mul(player.s.points.add(1).root(3)).mul(new Decimal(player.timePlayed).add(1).log(60)).mul(player.i.points.add(10).log(10)).mul(player.t.points.add(3).log(3)).mul(player.t.realPoints.add(10).log(10)).mul(player.c.points.add(3).log(3)).mul(player.c.chaoticPoints.add(10).log(10)).mul(player.se.points.add(1).root(2)).mul(player.points.add(1).root(1024)))}, // Shows when achievement is not completed
            },
            14: {
                name: "Ah shuckles, here we go again...",
                done() {return player.se.points.gte(1)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 12)},
                tooltip() {return hasAchievement("a", 12) ? "Do 1st Square Expansion reset" : "Do ███ ██████ █████████ █████ ██████ █████████ █████"}, // Shows when achievement is not completed
            },
            15: {
                name: "bruh.mp1",
                done() {return hasUpgrade("s", 22)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 14)},
                tooltip() {return "Buy 4th Shenanigans upgrade"}, // Shows when achievement is not completed
            },
            16: {
                name: "The more, the merrier!",
                done() {return player.se.points.gte(2)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 14)},
                tooltip() {return "Do 2nd Square Expansion reset"}, // Shows when achievement is not completed
            },
            21: {
                name: "To be honest, expotential should be buffed",
                done() {return hasUpgrade("s", 23)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 16)},
                tooltip() {return "Buy 1st exponential-based upgrade<br>Reward: 10% buff to \"Virgin Exponential\""}, // Shows when achievement is not completed
            },
            22: {
                name: "No, seriously. It hurts.",
                done() {return hasChallenge("s", 11)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 15)},
                tooltip() {return "Complete 1st Shenanigans challenge"}, // Shows when achievement is not completed
            },
            23: {
                name: "Micro-Microsoft",
                done() {return player.se.points.gte(3)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 16)},
                tooltip() {return "Do 3rd Square Expansion reset"}, // Shows when achievement is not completed
            },
            24: {
                name: "Super Viber",
                done() {return upgradeEffect("s", 12).gte(1000000)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 16)},
                tooltip() {return "Reach x1,000,000 effect on \"Vibe Check\""}, // Shows when achievement is not completed
            },
            25: {
                name: "SHENANIGANS TREE INSIDE THE SHENANIGANS TREE!?",
                done() {return hasUpgrade("s", 34)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Buy 12th Shenanigans upgrade<br>Reward: You just sold your soul, dummy"}, // Shows when achievement is not completed
            },
            26: {
                name: "Check-Mate-Bro",
                done() {return hasChallenge("s", 12) && hasChallenge("s", 21) && hasChallenge("s", 22) }, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Complete three Tic-Tac-Toe-related challenges"}, // Shows when achievement is not completed
            },
            31: {
                name: "5**5≤24",
                done() {return player.se.points.gte(4)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Do 4th Square Expansion reset"}, // Shows when achievement is not completed
            },
            32: {
                name: "Shenanigans Tetris 99",
                done() {return player.s.points.gte(99)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)
							  player.i.points = player.i.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Get 99 shenanigans<br>Reward: Unlocks Impatience layer with 1 impatient point"}, // Shows when achievement is not completed
            },
            33: {
                name: "Please be patient, I have an autism.",
                done() {return player.i.buyables[11].gte(10)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 32)},
                tooltip() {return "Get 10 Impatience-inators<br>Reward: Wow, you guys are really patient after all, huh? Well, let me explain what this achievement does. This achievement unlocks 5 Impatience upgrades and that's it, this is all you can have for you... Yep, still gonna keep talking random shit so it reaches your search bar. Did you know that mitochondria is the powerhouse of the cell?"}, // Shows when achievement is not completed
            },
            34: {
                name: "Uhhh... Why do I still feel joy again?",
                done() {return new Decimal(player.i.upgrades.length).gte(5)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 32)},
                tooltip() {return "Buy all Impatience upgrades"}, // Shows when achievement is not completed
            },
            35: {
                name: "｢𝕊 𝕋 𝕆 ℙ｣",
                done() {return player.i.buyables[11].gte(25)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 32)},
                tooltip() {return "Get 25 Impatience-inators<br>Reward: Impatience-inators are 25% better"}, // Shows when achievement is not completed
            },
            36: {
                name: "So close...",
                done() {return player.s.points.gte(180)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)
							  player.i.points = player.i.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Get 180 shenanigans<br>Reward: Unlocks another Impatience buyable"}, // Shows when achievement is not completed
            },
            41: {
                name: "\"It was all a bad dream\"",
                done() {return player["tree-tab"].points.gte(12)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)
							  player.i.points = player.i.points.add(1)},
				unlocked() {return player["tree-tab"].points.gte(12)},
                tooltip() {return "Get way too far and meet Holy Broly himself<br>Reward: Unlocks two layers and you automatically gain shenanigans"}, // Shows when achievement is not completed
            },
            42: {
                name: "The Illusion of Free Choice",
                done() {return player.c.points.gte(1) || player.t.points.gte(1)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return player["tree-tab"].points.gte(12)},
                tooltip() {return "Choose one of the two layers"}, // Shows when achievement is not completed
            },
            43: {
                name: "The Chaos Tree",
                done() {return player.c.upgrades.length >= 5}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return player["tree-tab"].points.gte(12) && player.c.unlocked},
                tooltip() {return "Buy 5 Chaos upgrades<br>Reward: Unlock more upgrades (n-1, where n is how many Chaos upgrades there was above the unlocked row) for each bought row of Chaos upgrades"}, // Shows when achievement is not completed
            },
            44: {
                name: "8 ███████ hours later",
                done() {return player.c.chaoticPoints.gte(28800)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return player["tree-tab"].points.gte(12) && player.c.unlocked},
                tooltip() {return "Get 28800 chaotic energies"}, // Shows when achievement is not completed
            },
            53: {
                name: "But wait, there's more!",
                done() {return player.t.upgrades.length >= 1}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return player["tree-tab"].points.gte(12) && player.t.unlocked},
                tooltip() {return "Buy 1st Transcendence upgrade<br>Reward: Unlock more upgrades (n+1, where n is how many Transcendence upgrades there was above the unlocked row) for each bought row of Transcendence upgrades"}, // Shows when achievement is not completed
            },
            54: {
                name: "Wait, that's illegal",
                done() {return upgradeEffect("i", 15).gte(666)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return player["tree-tab"].points.gte(12) && player.t.unlocked},
                tooltip() {return "Reach x666 effect on \"Shenanigans Power\""}, // Shows when achievement is not completed
            },
        },
    }, 
)

addLayer("se", {
    name: "sex without x", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	resetDescription: "Abandon your progress for ",
    color: "#94d0d8",
    requires() {return player.se.points.gte(4) ? new Decimal(9999999) : player.se.points.gte(3) ? new Decimal(9.25) : player.se.points.gte(2) ? new Decimal(8) : new Decimal(3)}, // Can be a function that takes requirement increases into account
    resource: "square expansions", // Name of prestige currency
    baseResource: "shenanigans", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
	effectDescription() {return "adding "+formatWhole(player.se.points.add(1).pow(2).sub(1))+" shenanigans upgrades and increases nothing's gain by ^"+formatWhole(player.se.points.add(1))+" when nothing's gain reaches 1/sec"},
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
	milestones: {
		0: {
			requirementDescription: "4 sqaure expansions",
			effectDescription: "Keeps first 4 Shenanigans upgrades on Square Expansion reset",
			done() { return player.se.points.gte(4) }
		}
	},
    hotkeys: [
        {key: "e", description: "E: Reset for square expansion", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return ((player.s.points.gte(3) || hasAchievement("a", 14)) && player.points.lt(new Decimal(308).pentate(2))) || player["tree-tab"].points.gte(12)},
	doReset(resettingLayer){
		if(layers[resettingLayer].symbol == "SE") {let keep = []
												   if(hasMilestone("se", 0)) keep = [11, 12, 21, 22]
												   player.points = new Decimal(0)
												   player.s.points = new Decimal(0)
												   player.s.upgrades = keep
												   player.s.challenges[11] = 0
												   player.s.challenges[12] = 0
												   player.s.challenges[21] = 0
												   player.s.challenges[22] = 0
												   player["s"].activeChallenge = null}
	},
})

addLayer("i", {
    name: "impatient fucks be like", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	tabFormat: ["main-display", "blank", "blank", "buyables", "blank", "upgrades"],
	update(diff) {	
		if(player.i.buyables[11].gte(1) && layers.i.layerShown()) player.i.points = player.i.points.add(new Decimal(diff).mul(layers.i.buyables[11].effect()))
	},
	effect() {let eff = player.i.points.add(new Decimal(64).div(layers.i.buyables[12].effect())).log(new Decimal(64).div(layers.i.buyables[12].effect()))
			  if(hasUpgrade("i", 15)) eff = eff.mul(upgradeEffect("i", 15))
			  if(hasUpgrade("s", 51)) eff = eff.mul(upgradeEffect("s", 51))
			  return eff},
	effectDescription() {return "boosting nothing's gain by x"+format(layers.i.effect())+" and diving shenanigans's requirement by /"+format(layers.i.effect())},
    color: "#D00000",
    resource: "impatiences", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		rows: 1,
		cols: 5,
		11: {
			title: "Impatient Boost",
			description: "Boosts Impatience-inator's effect by ^1.5",
			cost: new Decimal(300),
			unlocked() {return hasAchievement("a", 33)}
		},
		12: {
			title: "Nothing Is Eternal",
			description: "Nothings boost Impatience-inator's effect",
			effect() { let eff = player.points.root(420)
					   if(hasUpgrade("t", 22)) eff = eff.mul(layers.t.enlightedEffect())
					   return eff },
			effectDisplay() { return "x"+format(this.effect()) },
			cost: new Decimal(1000),
			unlocked() {return hasAchievement("a", 33)}
		},
		13: {
			title: "Impatience-inator-inator",
			description: "Boosts Impatience-inator's effect based on Impatience-inators",
			effect() { let eff = player.i.buyables[11].add(1)
					   if(hasUpgrade("t", 22)) eff = eff.mul(layers.t.enlightedEffect())
					   return eff },
			effectDisplay() { return "x"+format(this.effect()) },
			cost: new Decimal(5000),
			unlocked() {return hasAchievement("a", 33)}
		},
		14: {
			title: "CONDENSE.",
			description: "1 Impatience-inator generates impatiences as much as as 19 Impatience-inators",
			currencyLocation() {return player.i.buyables},
			currencyDisplayName: "Impatience-inators",
			currencyInternalName: 11,
			cost: new Decimal(19),
			unlocked() {return hasAchievement("a", 33)}
		},
		15: {
			title: "Shenanigans Power",
			description: "Shenanigans boosts Impaitence's effect after log(64)",
			effect() { let eff = player.s.points.add(1)
					   if(hasUpgrade("t", 21)) eff = eff.mul(layers.t.enlightedEffect())
					   return eff},
			effectDisplay() { return "x"+format(this.effect()) },
			cost: new Decimal(10200000),
			unlocked() {return hasAchievement("a", 33)}
		},
	},
	buyables: {
		rows: 1,
		cols: 2,
		11: {
			cost() { return new Decimal(1).mul(2).pow(player.i.buyables[11]) },
			effect() { let base = new Decimal(player.i.buyables[11])
					   if(hasAchievement("a", 35)) base = base.mul(1.25)
					   let eff = new Decimal(1).mul(base).pow(layers.i.buyables[12].effect())
					   if(hasUpgrade("i", 11)) eff = eff.pow(1.5)
					   if(hasUpgrade("i", 12)) eff = eff.mul(upgradeEffect("i", 12))
					   if(hasUpgrade("i", 13)) eff = eff.mul(upgradeEffect("i", 13))
					   if(hasUpgrade("i", 14)) eff = eff.mul(19)
					   if(hasUpgrade("s", 55) && !inChallenge("s", 12) && !inChallenge("s", 22)) eff = eff.mul(62)
					   return eff},
			title: "Impatience-inators",
			display() { return "By demonstrating you how it works in the most boring way, it'll suck out the impatience out of your body via the Theory of Limitless Impatientonational Energy, Laws of Unremovable Impatientonational Energy and equation for how long it takes for your impatience to reach the Infinity faster than Impatience-inators will generate impatiences up to the Infinity. I hope you all can comprehend this before you leave The Shenanigans Tree: Rewritten due just how many irrelevant texts there are for a single buyable. Anyways.<br/>Amount: "+formatWhole(player.i.buyables[11])+"<br/>Cost: "+format(this.cost())+" impatiences<br/>IPS: "+format(this.effect()) },
			canAfford() { return player.i.points.gte(this.cost()) },
			buy() {
				player.i.points = player.i.points.sub(this.cost())
				player.i.buyables[11] = player.i.buyables[11].add(1)
			},
			style() { return {
				"width": "302px",
				}
			}
			},
		12: {
			cost() { return new Decimal(1).mul(new Decimal(3).pow(player.i.buyables[12])) },
			effect() { let base = new Decimal(1.15)
					   let eff = new Decimal(1)
					   for (var i = 0; i < player.i.buyables[12] && i < 4; i++) {		
					   eff = eff.mul(base)
		               }
					   if(player.i.buyables[12] >= 2)  {if(hasUpgrade("c", 13)) base = base.root(new Decimal(2).root(layers.c.chaoticEffect()))
													   else base = base.root(2)
														for (var i = 2; i < player.i.buyables[12] && i < 5; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 5)  {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.9).root(layers.c.chaoticEffect()))
													   else base = base.root(1.9)
														for (var i = 5; i < player.i.buyables[12] && i < 9; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 9)  {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.8).root(layers.c.chaoticEffect()))
													    else base = base.root(1.8)
														for (var i = 9; i < player.i.buyables[12] && i < 14; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 14) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.7).root(layers.c.chaoticEffect()))
													    else base = base.root(1.7)
														for (var i = 14; i < player.i.buyables[12] && i < 20; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 20) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.6).root(layers.c.chaoticEffect()))
													    else base = base.root(1.6)
														for (var i = 20; i < player.i.buyables[12] && i < 27; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 27) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.5).root(layers.c.chaoticEffect()))
													    else base = base.root(1.5)
														for (var i = 27; i < player.i.buyables[12] && i < 35; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 35) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.4).root(layers.c.chaoticEffect()))
													    else base = base.root(1.4)
														for (var i = 35; i < player.i.buyables[12] && i < 44; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 44) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.3).root(layers.c.chaoticEffect()))
													    else base = base.root(1.3)
														for (var i = 44; i < player.i.buyables[12] && i < 54; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 54) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.2).root(layers.c.chaoticEffect()))
													    else base = base.root(1.2)
														for (var i = 54; i < player.i.buyables[12] && i < 65; i++) {		
														eff = eff.mul(base)
														}}
					   if(player.i.buyables[12] >= 65) {if(hasUpgrade("c", 13)) base = base.root(new Decimal(1.1).root(layers.c.chaoticEffect()))
													    else base = base.root(1.1)
														for (var i = 65; i < player.i.buyables[12]; i++) {		
														eff = eff.mul(base)
														}}
					   if(eff.gte(63)) eff = new Decimal(63)
					   return eff},
			title: "NerfBusters",
			display() { return player.i.buyables[11] >= 1 ? "Reduces Impatience's base nerf and log, exponents Impatience-inators's base. 2th, 5th, 9th, 14th, 20th, 27th, 35th, 44th, 54th and 65th NerfBuster applies root formula (square root initially, each nerf is weaker than another.) on other NerfBusters's effect, nerfs are stackable.<br/>Amount: "+formatWhole(player.i.buyables[12])+"<br/>Cost: "+format(this.cost())+" impatiences<br/>Currently: /"+format(this.effect())+" ^"+format(this.effect()) : "You need to buy Impatience-inator first."},
			canAfford() { return player.i.points.gte(this.cost()) && player.i.buyables[11] >= 1 },
			buy() {
				player.i.points = player.i.points.sub(this.cost())
				player.i.buyables[12] = player.i.buyables[12].add(1)
			},
			unlocked() {return hasAchievement("a", 36)},
			style() { return {
				"width": "302px",
				}
			}
			},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
	branches: ["s"],
    layerShown(){return (hasAchievement("a", 32) && player.points.lt(new Decimal(308).pentate(2))) || player["tree-tab"].points.gte(12)},
	doReset(resettingLayer){
		if(layers[resettingLayer].symbol == "C" && hasUpgrade("c", 15)) { player.i.buyables[11] = new Decimal(2)
																		  player.i.buyables[12] = new Decimal(2)
																		  if(hasUpgrade("c", 24)) {player.i.buyables[11] = new Decimal(3)
																								   player.i.buyables[12] = new Decimal(3)}
																		  player.i.upgrades = []
																		 }
		else if(layers[resettingLayer].symbol == "T" && hasMilestone("t", 0)) {player.i.buyables[11] = new Decimal(0)
																		       player.i.buyables[12] = new Decimal(0)
																		 }
		else if(layers[resettingLayer].symbol == "S") player.i.points = player.i.points
		else layerDataReset("i")
		player.i.points = new Decimal(1)
	},
})

addLayer("s2", {
    name: "shenanigans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		secretPoints: new Decimal(1),
    }},
	resetsNothing() {return true},
	tabFormat: ["main-display", "prestige-button", "resource-display", "upgrades", "buyables"],
    color: "#791C29",
    requires() {return new Decimal(1)}, // Can be a function that takes requirement increases into account
    resource: "shenanigans 2", // Name of prestige currency
    baseResource: "shenanigans", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(1)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		rows: 5,
		cols: 5,
		11: {
			title: "LET'S",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		12: {
			title: "FUCKING",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		13: {
			title: "GO",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		14: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		15: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		21: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		22: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		23: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		24: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		25: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		31: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		32: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		33: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		34: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		35: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		41: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		42: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		43: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		44: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		45: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		51: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		52: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		53: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		54: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
		55: {
			title: "O",
			description() {return "Exponents nothing's gain by 69420"},
			cost: new Decimal(1),
			onPurchase() {return player.s2.secretPoints = player.s2.secretPoints.add(1)},
			},
	},
	buyables: {
		rows: 1,
		cols: 1,
		11: {
			title: "Shenanigans 3 layer",
			display() { return "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO<br/>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" },
			canAfford() { return true },
			buy() {
				player.s2.buyables[11] = player.s2.buyables[11].add(1)
			},
			unlocked() {return player.s2.upgrades.length >= 25 && player.s2.buyables[11] < 1},
			style() { return {
				"font-size": "24px",
				"height": "360px",
				"width": "600px"
				}
			}
			}
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "X: Reset for shenanigans 2", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	branches: ["s"],
    layerShown(){return player.s.buyables[11] >= 1 && player.points.lt(new Decimal(308).pentate(2)) && player["tree-tab"].points.lt(12)}
})

addLayer("s3", {
    name: "shenanigans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		secretPoints: new Decimal(1),
		topSecretPoints: new Decimal(1),
    }},
	update(diff){
		if(hasUpgrade("s3", 61)) player.s3.topSecretPoints = player.s3.topSecretPoints.add(1).pow(player.s3.topSecretPoints)
	},
	resetsNothing() {return true},
	tabFormat: ["main-display", "prestige-button", "resource-display", "upgrades"],
    color: "#791C29",
    requires() {return new Decimal(1)}, // Can be a function that takes requirement increases into account
    resource: "shenanigans 3", // Name of prestige currency
    baseResource: "shenanigans 2", // Name of resource prestige is based on
    baseAmount() {return player.s2.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(1)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		rows: 6,
		cols: 5,
		11: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		12: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		13: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		14: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		15: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		21: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		22: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		23: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		24: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		25: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		31: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		32: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		33: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		34: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		35: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		41: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		42: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		43: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		44: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		45: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		51: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		52: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		53: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		54: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		55: {
			title: "O",
			description() {return "Shenanigans 2's upgrades has much better effect"},
			cost: new Decimal(1),
			onPurchase() {return player.s3.secretPoints = player.s3.secretPoints.add(1)},
			},
		61: {
			title: "THE ILLEGAL UPGRADE.",
			description() {return "Exponents whatever effect there is and itself by 69420 every tick"},
			cost: new Decimal(1),
			unlocked() {return player.s3.upgrades.length >= 25},
			},
	},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "2", description: "2: Reset for shenanigans 3", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	branches: ["s2"],
    layerShown(){return player.s2.buyables[11] >= 1 && player.points.lt(new Decimal(308).pentate(2)) && player["tree-tab"].points.lt(12)}
})

addLayer("c", {
    name: "jevile", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		chaoticPoints: new Decimal(0),
    }},
	update(diff) {
		let funny = new Decimal(diff)
		if(hasUpgrade("c", 12)) funny = funny.mul(upgradeEffect("c", 12))
		if(hasUpgrade("c", 22)) funny = funny.mul(upgradeEffect("c", 22))
		if(hasUpgrade("c", 13)) player.c.chaoticPoints = player.c.chaoticPoints.add(funny)
	},
	tabFormat: ["main-display", "prestige-button", "resource-display", ["display-text", function() {return player.c.chaoticPoints.gt(0) ? "You have "+format(player.c.chaoticPoints)+" chaotic energies, nerfing NerfBusters's nerfs by root("+format(layers.c.chaoticEffect())+"), boosting your nothing's gain by ^"+format(layers.c.chaoticEffect2())+" and boosts \"Shenanigans Upgrade\" by x"+format(layers.c.chaoticEffect3()) : player.c.chaoticPoints.gt(0) ? "You have "+format(player.c.chaoticPoints)+" chaotic energies, nerfing NerfBusters's nerfs by root("+format(layers.c.chaoticEffect())+") and boosting your nothing's gain by ^"+format(layers.c.chaoticEffect2()) : ""}], "blank", "milestones", "upgrades"],
	prestigeButtonText() {return "Explore the secret of nothing and obtain one of the Chaoses of Condensed Kong<br/><br/>Requirement: "+format(tmp.c.nextAt)+" nothings"},
    color: "#6d6dc0",
    requires() {return player.t.unlocked ? new Decimal(308).pentate(2) : new Decimal(2).pow(1024)}, // Can be a function that takes requirement increases into account
    resource() {return player.c.points.gt(2) ? "Chaoses of Condensed Kong" : "Chaos of Condensed Kong"}, // Name of prestige currency
	effect() {return player.c.points.mul(7)},
	effect2() {return new Decimal(1).add(player.c.points.mul(0.7))},
	chaoticEffect() {return player.c.chaoticPoints.add(1).root(69)},
	chaoticEffect2() {return player.c.chaoticPoints.add(1).root(420)},
	chaoticEffect3() {return player.c.chaoticPoints.add(1).root(6.0869565217391304347826086956522)},
	effectDescription() {return hasUpgrade("c", 14) ? "lowering Shenanigans Upgrades's cost by "+format(this.effect())+" and multiplying \"Virgin Exponential\"'s base by x"+format(this.effect2()) : "lowering Shenanigans Upgrades's cost by "+format(this.effect())+" shenanigans"}, 
    baseResource: "nothings", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 5000000000000000,
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	milestones: {
		0: {
			requirementDescription: "1 Chaos of Condensed Kong",
			effectDescription() {return "You start off with "+formatWhole(player.se.points.add(1).pow(2))+" shenanigans on Chaos reset based on Square Expansions."},
			done() { return player.c.points.gte(1) }
		},
		1: {
			requirementDescription: "2 Chaos of Condensed Kong",
			effectDescription() {return "Chaos reset no longer resets first four Shenanigans upgrades."},
			done() { return player.c.points.gte(2) }
		},
		2: {
			requirementDescription: "3 Chaos of Condensed Kong",
			effectDescription() {return "You automatically gain more Shenanigans."},
			done() { return player.c.points.gte(3) }
		},
	},
	upgrades: {
		rows: 5,
		cols: 5,
		11: {
			title: "Box Of \"What the hell is this?\" Biscuits",
			description() {return "Each Chaos upgrade has additional effect of Cookie Clicker biscuit, increasing nothing's gain and lowering shenanigans's requirement"},
			effect() {let base = new Decimal(10)
					  let eff = new Decimal(0)
					  for (var i = 0; i < player.c.upgrades.length; i++){
					  eff = eff.add(base) 
					  base = base.mul(1.1)}
					  if(hasUpgrade("c", 21)) {for (var i = 0; i < player.s.upgrades.length; i++){
					  eff = eff.add(base) 
					  base = base.mul(1.1)}}
					  return eff},
			effect2() {let eff = new Decimal(100).mul(new Decimal(0.9).pow(player.c.upgrades.length))
					   if(hasUpgrade("c", 21)) eff = eff.mul(new Decimal(0.9).pow(player.s.upgrades.length))
					   return eff},
			effectDisplay() {return "+"+format(this.effect())+"% "+format(this.effect2())+"%"},
			cost: new Decimal(1)
		},
		12: {
			title: "Chaotic Recursion",
			description: "Boosts chaotic energy's gain by chatic energy at reduced rate",
			effect() {let eff = player.c.chaoticPoints.add(2).log(2)
					  if(hasUpgrade("c", 22)) eff = eff.mul(upgradeEffect("c", 22))
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			cost: new Decimal(2)
		},
		13: {
			title: "Chaos Energy",
			description: "Unlocks a new type of chaotic source",
			cost: new Decimal(1)
		},
		14: {
			title: "Chaotic Enchantment",
			description: "Adds another effect to C.o.C.K.",
			cost: new Decimal(2)
		},
		15: {
			title: "Two Pair",
			description: "You start off with two of Impatience buyables each on Chaos reset",
			cost: new Decimal(1)
		},
		21: {
			title: "Box Of \"Box Of Biscuits\" Biscuits",
			description: "\"Box Of \"What the hell is this?\" Biscuits\" includes Shenanigans upgrades as well",
			cost: new Decimal(2),
			unlocked() {return player.c.upgrades.length >= 5}
		},
		22: {
			title: "Shit Gets Wackier",
			description: "Boosts chatic energy's gain and \"Chaotic Recursion\" by chaotic energy at more reduced rate",
			effect() {return player.c.chaoticPoints.add(10).log(10)},
			effectDisplay() {return "x"+format(this.effect())},
			cost: new Decimal(3),
			unlocked() {return player.c.upgrades.length >= 5}
		},
		23: {
			title: "Enchanted Chaos",
			description: "Adds another effect to chaotic energies",
			cost: new Decimal(1),
			unlocked() {return player.c.upgrades.length >= 5}
		},
		24: {
			title: "One Pair",
			description: "You start off with one more of Impatience buyables each on Chaos reset",
			cost: new Decimal(1),
			unlocked() {return player.c.upgrades.length >= 5}
		},
	},
    row: 1, // Row the layer is in on the tree (0 is the first row)
	branches: ["s"],
    hotkeys: [
        {key: "c", description: "C: Reset for Chaos", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player["tree-tab"].points.gte(12)}
})

addLayer("t", {
    name: "domination", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		realPoints: new Decimal(0),
    }},
	update(diff){
		let funny = new Decimal(diff).mul(layers.t.effect())
		if(hasUpgrade("t", 11)) funny = funny.mul(upgradeEffect("t", 11))
		if(hasMilestone("t", 0)) player.t.realPoints = player.t.realPoints.add(funny)
	},
	tabFormat: ["main-display", "prestige-button", "resource-display", ["display-text", function() {return player.t.realPoints.gt(0) && hasUpgrade("t", 22) ? "You have "+format(player.t.realPoints)+" enlightment points, enhancing \"Infinitish Boost\", \"Shenanigans Power\", \"Nothing Is Eternal\" and \"Impatience-inator-inator\" by x"+format(layers.t.enlightedEffect()) : player.t.realPoints.gt(0) && hasUpgrade("t", 21) ? "You have "+format(player.t.realPoints)+" enlightment points, enhancing \"Infinitish Boost\" and \"Shenanigans Power\" by x"+format(layers.t.enlightedEffect()) : player.t.realPoints.gt(0) ? "You have "+format(player.t.realPoints)+" enlightment points, enhancing \"Infinitish Boost\" by x"+format(layers.t.enlightedEffect()) : ""}], "blank", "milestones", "upgrades"],
	prestigeButtonText() {return "Reject bullshit, become transcended<br/><br/>Requirement: "+format(tmp.t.nextAt)+" nothings"},
    color: "#fefbaa",
	effect() {return player.t.points.gte(1) ? player.t.points.pow(player.t.points) : new Decimal(0)},
	enlightedEffect() {return player.t.realPoints.add(10).log(10)},
	effectDescription() {return "increasing enlightment points's gain by x"+format(layers.t.effect())},
    requires() {return player.c.unlocked ? new Decimal(308).pentate(2) : new Decimal(2).pow(1024)}, // Can be a function that takes requirement increases into account
    resource() {return player.t.points.gte(2) ? "Transcendence Levels" : "Transcendence Level"}, // Name of prestige currency
    baseResource: "nothings", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	milestones: {
		0: {
			requirementDescription: "1 Transcendence Level",
			effectDescription() {return "Begin the production of enlightment points. Also keeps all Impatience upgrades on Trascendence reset."},
			done() { return player.t.points.gte(1) }
		},
	},
	upgrades: {
		rows: 2,
		cols: 2,
		11: {
			title: "Self-Enlightment",
			description() {return "Boosts enlightment points's gain by the magnitude of enlightment points"},
			currencyDisplayName: "enlightment points",
            currencyInternalName: "realPoints",
            currencyLayer: "t",
			effect() {let eff = new Decimal(1)
					  for (var i = 1; i < player.t.realPoints; i = i * 10) eff = eff.add(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			cost: new Decimal(60),
		},
		21: {
			title: "Power Transfering",
			description() {return "Enlightment points enhances \"Shenanigans Power\" too"},
			currencyDisplayName: "enlightment points",
            currencyInternalName: "realPoints",
            currencyLayer: "t",
			cost: new Decimal(438),
			unlocked() {return player.t.upgrades.length >= 1}
		},
		22: {
			title: "Anti-Impatience",
			description() {return "Enlightment points enhances \"Nothing Is Eternal\" and \"Impatience-inator-inator\" as well"},
			currencyDisplayName: "enlightment points",
            currencyInternalName: "realPoints",
            currencyLayer: "t",
			cost: new Decimal(918),
			unlocked() {return player.t.upgrades.length >= 1}
		},
	},
	base: 833333333333333.33333333333333333,
    exponent: 2, // Prestige currency exponent
    row: 1, // Row the layer is in on the tree (0 is the first row)
	branches: ["s"],
    hotkeys: [
        {key: "t", description: "T: Reset for Transcendence", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player["tree-tab"].points.gte(12)},
})
