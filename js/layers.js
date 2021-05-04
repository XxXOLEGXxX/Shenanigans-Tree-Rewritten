addLayer("s", {
    name: "shenanigans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	resetDescription: "Compress the nothings into ",
    color: "#791C29",
    requires() {let req = new Decimal(1).mul(player.s.points.add(1).pow(player.s.points.add(1)))
				if(hasUpgrade("s", 21) && !hasUpgrade("s", 14) && !inChallenge("s", 12)) req = req.mul(2)
				if(hasUpgrade("s", 14) && !inChallenge("s", 12) && !inChallenge("s", 22)) req = req.div(42)
				return req}, // Can be a function that takes requirement increases into account
    resource: "shenanigans", // Name of prestige currency
    baseResource: "nothings", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {return new Decimal(1).div(new Decimal(1).add(player.s.points.mul(player.s.points.add(1))))}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("s", 31)) mult = mult.div(upgradeEffect("s", 31))
		if(hasUpgrade("s", 42)) mult = mult.div(upgradeEffect("s", 42))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		rows: 4,
		cols: 4,
		11: {
			title: "A Comeback",
			description() {return "Boosts your nothing's gain by "+format(this.effect2())+"x and you gain more nothings based on shenanigans"},
			effect() {let eff = player.s.points.add(1).root(1.5)
					  if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					  if(inChallenge("s", 12)) eff = new Decimal(1)
					  return eff},
			effect2() {let eff = new Decimal(10)
					   if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					   if(inChallenge("s", 12)) eff = new Decimal(1)
					   return eff},
			effectDisplay() {return format(this.effect())+"x"},
			cost: new Decimal(1)
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
			effectDisplay() {return format(this.effect())+"x"},
			unlocked() {return player.se.points.gte(1)},
			cost: new Decimal(3)
			},
		21: {
			title: "Sidegrade",
			description() {return hasUpgrade("s", 14) ? "You gain more nothings based on shenanigans and shenanigans's requirement is divided by 42" : "You gain more nothings based on shenanigans, but shenanigans's requirement is multiplied by 2"},
			effect() {let eff = player.s.points.add(1).root(2)
					  if(hasUpgrade("s", 13)) eff = eff.mul(upgradeEffect("s", 13))
					  if(inChallenge("s", 21)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return format(this.effect())+"x"},
			unlocked() {return player.se.points.gte(1)},
			cost: new Decimal(6)
			},
		22: {
			title: "HERE COMES A NEW CHALLENGER",
			description: "Unlocks a single challenge",
			unlocked() {return player.se.points.gte(1)},
			cost: new Decimal(7)
			},
		13: {
			title: "Chad Multiplication",
			description: "Boosts 3 first shenanigans upgrades based on achievements",
			effect() {let eff = new Decimal(player.a.achievements.length).add(1).root(3)
					  if(hasUpgrade("s", 23)) eff = eff.pow(upgradeEffect("s", 23))
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return format(this.effect())+"x"},
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(10)
			},
		23: {
			title: "Virgin Exponential",
			description: "Boosts \"Chad Multiplication\" based on upgrades bought",
			effect() {let eff = new Decimal(player.s.upgrades.length).div(1000).add(1)
					  if(hasUpgrade("s", 44)) eff = new Decimal(player.s.upgrades.length).div(100).add(1)
					  if(hasAchievement("s", 21)) eff = eff.mul(1.1)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "^"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(12)
			},
		31: {
			title: "Infinitish Boost",
			description: "Boosts nothing and shenanigans gain, but it gets weaker the closer you are to the Infniity.",
			effect() {let eff = new Decimal(2).pow(10240).div(player.points.add(0.001).pow(9)).log(new Decimal(2).pow(1024))
					  if(eff.lt(0.01)) eff = new Decimal(0.01)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(17)
			},
		32: {
			title: "BUT ENOUGH REPETITIVE PATTERN, HAVE AT YOU!",
			description: "Boosts \"Vibe Check\" upgrade massively.",
			effect() {let eff = new Decimal(9001)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(19)
			},
		33: {
			title: "It's time to M-M-M-M-M-M-M-M-M-M-M-MILK.",
			description: "Unlocks one more challenge.",
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(26)
			},
		14: {
			title: "The answer to shenanigans, pg132's schedule and everything",
			description: "\"Sidegrade\"'s 2nd effect is changed.",
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(41)
			},
		24: {
			title: "8th Deadly Sin",
			description() {return "You've just wasted all of your shenanigans on some exotic airs. Atleast they boost your nothing's gain by 420x"},
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(42)
			},
		34: {
			title: "Beating Shenanigans Tree NG--",
			description: "What the fuck is wr- I MEAN uhhh- shenanigans boosts \"Vibe Check\" at slightly rate",
			effect() {let eff = player.s.points.add(1.33).log(1.33)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(48)
			},
		41: {
			title: "VIBING OVERLOAD!!!",
			description: "\"Vibe Check\"'s effect is exponented based on achievements",
			effect() {let eff = player.a.points.add(1).root(3)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "^"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(50)
			},
		42: {
			title: "\"StIlL cHiLl\"",
			description: "You decided to ease off nothing's gain and focus on shenanigans, boosting shenanigans based on bought upgrades and achievements",
			effect() {let eff = new Decimal(player.s.upgrades.length).add(1).pow(new Decimal(player.a.achievements.length).add(1))
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(68)
			},
		43: {
			title: "Tock Tock, who's knhere?",
			description: "Unlock one more challenge",
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(68)
			},
		44: {
			title() {return hasChallenge("s", 22) ? "Joe" : "???"},
			description() {return hasChallenge("s", 22) ? "Joe who-\nJoe Mama flips you upside down, ignores challenges and boosts \"Virgin Exponential\"'s base by tenfold" : "????????????????"},
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(71)
			},
	},
	challenges: {
		rows: 3,
		cols: 2,
		11: {
			name: "\"Ouch\"",
			challengeDescription: "Nothing's gain is divided by 7,560 times",
			rewardDescription: "Nothing's gain's base is increased by 60x",
			goal: new Decimal(34359738368),
			unlocked() {return hasUpgrade("s", 22)}
		},
		12: {
			name: "Tic",
			challengeDescription: "All odd numbered upgrades has no effect",
			rewardDescription: "Unlocks another challenge and nothing's gain's base is increased by 60x, again",
			goal: new Decimal(12800000000000000000000000),
			unlocked() {return hasUpgrade("s", 33)}
		},
		21: {
			name: "Tac",
			challengeDescription: "All even numbered upgrades has no effect",
			rewardDescription: "Nothing's gain's base is increased by 60x yet again",
			goal: new Decimal(80000000000000000000000),
			unlocked() {return hasChallenge("s", 12)}
		},
		22: {
			name: "Toe",
			challengeDescription: "Only first 4 upgrades have effects",
			rewardDescription: "Nothing's gain's base is increased by 60x yet again",
			goal: new Decimal(5e79),
			unlocked() {return hasUpgrade("s", 43)}
		},
	},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for shenanigans", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})

addLayer("a", {
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#E0E0E0",
        resource: "achievements", 
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        achievements: {
            rows: 2,
            cols: 6,
            11: {
                name: "Not dealing with this crap",
                done() {return player.points.gte(1/6)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip: "Reach 0.166 nothings\nReward: Nothing's gain is 6x bigger", // Shows when achievement is not completed
            },
            12: {
                name: "\"We've reached the endgame already...?\"",
                done() {return player.s.points.gte(3)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip() {return hasAchievement("a", 12) ? "Get 3 shenanigans\nReward: Unlocks Square Expansion layer" : "Get 3 shenanigans\nReward: Unlocks ██████ █████████ █████"}, // Shows when achievement is not completed
            },
            13: {
                name: "Ah yes, the Nothingiator",
                done() {return player.points.gte(1024)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip() {return "Reach 2^10 nothings\nReward: Nothing's gain gets boosted by every kind of points/resources at reduced rate\nCurrently: "+format(new Decimal(1).add(player.s.points.add(100).log(100)).add(player.se.points.add(10).log(10)).add(player.points.add(10).log(1000)))+"x"}, // Shows when achievement is not completed
            },
            14: {
                name: "Ah shuckles, here we go again...",
                done() {return player.se.points.gte(1)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 12)},
                tooltip() {return hasAchievement("a", 12) ? "Do 1st Square Expansion reset" : "Make ███ ██████ █████████ █████ ██████ █████████ █████"}, // Shows when achievement is not completed
            },
            15: {
                name: "bruh.mp1",
                done() {return hasUpgrade("s", 22)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 14)},
                tooltip() {return "Buy 4th shenanigans upgrade"}, // Shows when achievement is not completed
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
                tooltip() {return "Buy 1st exponential-based upgrade\nReward: 10% buff to \"Virgin Exponential\""}, // Shows when achievement is not completed
            },
            22: {
                name: "Micro-Microsoft",
                done() {return player.se.points.gte(3)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 16)},
                tooltip() {return "Do 3rd Square Expansion reset"}, // Shows when achievement is not completed
            },
            23: {
                name: "Super Viber",
                done() {return upgradeEffect("s", 12).gte(1000000)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 16)},
                tooltip() {return "Reach 1,000,000x effect on \"Vibe Check\""}, // Shows when achievement is not completed
            },
            24: {
                name: "SHENANIGANS TREE INSIDE THE SHENANIGANS TREE!?",
                done() {return hasUpgrade("s", 34)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 22)},
                tooltip() {return "Buy 12th shenanigans upgrade\nReward: You just sold your soul, dummy."}, // Shows when achievement is not completed
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
    requires() {return player.se.points.gte(3) ? new Decimal(9999999) : player.se.points.gte(2) ? new Decimal(8) : player.se.points.eq(1) ? new Decimal(3.5) : new Decimal(3)}, // Can be a function that takes requirement increases into account
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
    hotkeys: [
        {key: "e", description: "E: Reset for square expansions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.s.points.gte(3) || hasAchievement("a", 14)},
	doReset(resettingLayer){
		if(layers[resettingLayer].symbol == "SE") {player.points = new Decimal(0)
												   player.s.points = new Decimal(0)
												   player.s.upgrades = []
												   player.s.challenges[11] = 0
												   player.s.challenges[12] = 0
												   player.s.challenges[21] = 0}
	},
})


