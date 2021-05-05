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
				if(hasUpgrade("s", 14) && !inChallenge("s", 12) && !inChallenge("s", 21) && !inChallenge("s", 22)) req = req.div(42)
				if(hasUpgrade("s", 31) && !inChallenge("s", 12) && !inChallenge("s", 22)) req = req.div(upgradeEffect("s", 31))
				if(hasUpgrade("s", 35)) req = req.div(upgradeEffect("s", 35))
				if(hasUpgrade("s", 51)) req = req.div(upgradeEffect("s", 51))
				if(layers.i.layerShown() == true) req = req.div(layers.i.effect())
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
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(1)},
			cost: new Decimal(3)
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
			cost: new Decimal(5)
			},
		22: {
			title: "HERE COMES A NEW CHALLENGER",
			description: "Unlocks a single challenge",
			unlocked() {return player.se.points.gte(1)},
			cost: new Decimal(6)
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
			cost: new Decimal(9)
			},
		23: {
			title: "Virgin Exponential",
			description: "Boosts \"Chad Multiplication\" based on upgrades bought",
			effect() {let eff = new Decimal(player.s.upgrades.length).div(1000).add(1)
					  if(hasUpgrade("s", 44)) eff = new Decimal(player.s.upgrades.length).div(100).add(1)
					  if(hasUpgrade("s", 15)) eff = eff.mul(upgradeEffect("s", 15))
					  if(hasAchievement("a", 21)) eff = eff.mul(1.1)
					  if(hasUpgrade("s", 52) && !inChallenge("s", 21) && !inChallenge("s", 22)) eff = eff.mul(1.2)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "^"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(12)
			},
		31: {
			title: "Infinitish Boost",
			description: "Boosts nothing's gain and shenanigans's requirement, but it gets weaker the closer you are to the Infniity.",
			effect() {let eff = new Decimal(2).pow(10240).div(player.points.add(0.001).pow(9)).log(new Decimal(2).pow(1024))
					  if(eff.lt(0.01)) eff = new Decimal(0.01)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(16)
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
			cost: new Decimal(19)
			},
		33: {
			title: "It's Time To M-M-M-M-M-M-M-M-M-M-M-MILK.",
			description: "Unlocks one more challenge.",
			unlocked() {return player.se.points.gte(2)},
			cost: new Decimal(26)
			},
		14: {
			title: "The Answer To Shenanigans, pg132's Schedule And Everything",
			description: "\"Sidegrade\"'s 2nd effect is changed.",
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(41)
			},
		24: {
			title: "8th Deadly Sin",
			description() {return inChallenge("s", 21) || inChallenge("s", 22) ? "You've just wasted all of your shenanigans on some exotic airs... This is what you get for spending your shenaingans for something." : "You've just wasted all of your shenanigans on some exotic airs. Atleast they boost your nothing's gain by x420"},
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
			cost: new Decimal(47)
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
			description: "You decided to ease off nothing's gain and focus on upgrades, boosting \"Chad Manipulation\" based on bought upgrades",
			effect() {let eff = new Decimal(player.s.upgrades.length).add(1).root(10)
					  if(inChallenge("s", 21) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(68)
			},
		43: {
			title: "Tock Tock, Who's Knhere?",
			description: "Unlock one more challenge",
			unlocked() {return player.se.points.gte(3)},
			cost: new Decimal(69)
			},
		44: {
			title() {return hasChallenge("s", 22) ? "Joe" : "???"},
			description() {return hasChallenge("s", 22) ? "Joe who-\nJoe Mama flips you upside down, ignores challenges's effects and boosts \"Virgin Exponential\"'s base by tenfold" : "????????????????"},
			unlocked() {return player.se.points.gte(3)},
			cost() {return hasChallenge("s", 22) ? new Decimal(73) : new Decimal(2).pow(1024)}
			},
		15: {
			title: "The Power Of Brotherhood",
			description: "\"Chad Multiplication\" boosts \"Virgin Exponential\" at reduced rate",
			effect() {let eff = upgradeEffect("s", 13).add(10).log(10)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(90)
			},
		25: {
			title: "Something's Wrong, I Can Feel It",
			description() {return !inChallenge("s", 12) && !inChallenge("s", 22) ? "Boosts nothing's gain by x262,144" : "Boosts nothing's gain by x1"},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(91)
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
			cost: new Decimal(105)
			},
		45: {
			title: "Hey! Buy This Upgrade!",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "Boosts \"The Idea-l Gun\" upgrade's effect to the power of 1" : "Boosts \"The Idea-l Gun\" upgrade's effect to the power of 3"},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(117)
			},
		51: {
			title: "Shenanigans Upgrade ",
			description: "Impatience-inators boosts Impatience's effect and divides shenanigans's requirement",
			effect() {let eff = new Decimal(player.i.buyables[11]).add(1)
					  if(hasUpgrade("s", 55) && !inChallenge("s", 12) && !inChallenge("s", 22)) eff = eff.mul(62)
					  if(inChallenge("s", 12) || inChallenge("s", 22)) eff = new Decimal(1)
					  return eff},
			effectDisplay() {return "x"+format(this.effect())+" /"+format(this.effect())},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(146)
			},
		52: {
			title: "A Little Push Won't Hurt",
			description() {return inChallenge("s", 21) || inChallenge("s", 22) ? "Boosts \"Virgin Exponential\" by x1" : "Boosts \"Virgin Exponential\" by x1.2"},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(151)
			},
		53: {
			title: "Omega Multiplier",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "\"A Comeback\" is boosted by 1x" : "\"A Comeback\" is boosted by x24"},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(154)
			},
		54: {
			title() {return inChallenge("s", 21) || inChallenge("s", 22) ? "SHUT UP!... Wait-" : "IT'S OVER 9000- SHUT UP!"},
			description() {return inChallenge("s", 21) || inChallenge("s", 22) ? "Vegeta, come back! I didn't mean to offend your feelings." : "\"B.E.R.P, H.A.Y.!\"'s effect is multiplied by how many Food Battles there are"},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(161)
			},
		55: {
			title: "Everything At The End Of Shenanigans",
			description() {return inChallenge("s", 12) || inChallenge("s", 22) ? "" : "Impatience-inators, Nothing's gain and \"Shenanigans Upgrade\"'s effects are boosted by an entire album of \"E.A.T.E.O.T.\""},
			unlocked() {return player.se.points.gte(4)},
			cost: new Decimal(169)
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
		tabFormat: ["main-display", "blank", "blank", "achievements"],
        color() {return player.a.achievements.length >= 18 ? "#77BF5F" : "#E0E0E0"},
        resource: "achievements", 
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        achievements: {
            rows: 3,
            cols: 6,
            11: {
                name: "Not dealing with this crap",
                done() {return player.points.gte(1/6)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
                tooltip: "Reach 0.166 nothings\nReward: Nothing's gain is x6 bigger", // Shows when achievement is not completed
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
                tooltip() {return "Reach 2^10 nothings\nReward: Nothing's gain gets boosted based on time played and all points (achievements excluded)\nCurrently: x"+format(new Decimal(1).mul(player.s.points.add(1).root(3)).mul(new Decimal(player.timePlayed).add(1).log(60)).mul(player.i.points.add(10).log(10)).mul(player.se.points.add(1).root(2)).mul(player.points.add(1).root(1024)))}, // Shows when achievement is not completed
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
                tooltip() {return "Buy 1st exponential-based upgrade\nReward: 10% buff to \"Virgin Exponential\""}, // Shows when achievement is not completed
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
                tooltip() {return "Reach 1,000,000x effect on \"Vibe Check\""}, // Shows when achievement is not completed
            },
            25: {
                name: "SHENANIGANS TREE INSIDE THE SHENANIGANS TREE!?",
                done() {return hasUpgrade("s", 34)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Buy 12th Shenanigans upgrade\nReward: You just sold your soul, dummy."}, // Shows when achievement is not completed
            },
            26: {
                name: "Check-Mate-Bro",
                done() {return hasChallenge("s", 12) && hasChallenge("s", 21) && hasChallenge("s", 22) }, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Complete three Tic-Tac-Toe-related challenges."}, // Shows when achievement is not completed
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
                tooltip() {return "Get 99 shenanigans\nReward: Unlocks Impatience layer with 1 impatient point"}, // Shows when achievement is not completed
            },
            33: {
                name: "Please be patient, I have an autism.",
                done() {return player.i.buyables[11].gte(10)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)},
				unlocked() {return hasAchievement("a", 32)},
                tooltip() {return "Get 10 Impatience-inators\nReward: Wow, you guys are really patient after all, huh? Well, let me explain what this achievement does. This achievement unlocks 5 Impatience upgrades and that's it, this is all you can have for you... Yep, still gonna keep talking random shit so it reaches your search bar. Did you know that mitochondria is the powerhouse of the cell?"}, // Shows when achievement is not completed
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
                tooltip() {return "Get 25 Impatience-inators\nReward: Impatience-inators are 25% better"}, // Shows when achievement is not completed
            },
            36: {
                name: "So close...",
                done() {return player.s.points.gte(180)}, // This one is a freebie
				onComplete() {player.a.points = player.a.points.add(1)
							  player.i.points = player.i.points.add(1)},
				unlocked() {return hasAchievement("a", 23)},
                tooltip() {return "Get 180 shenanigans\nReward: Unlocks another Impatience buyable"}, // Shows when achievement is not completed
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
			effectDescription: "Keeps first 4 Shenanigans upgrades on Square Sxpansion reset",
			done() { return player.se.points.gte(4) }
		}
	},
    hotkeys: [
        {key: "e", description: "E: Reset for square expansion", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.s.points.gte(3) || hasAchievement("a", 14)},
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
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	tabFormat: ["main-display", "blank", "blank", "buyables", "blank", "upgrades"],
	update(diff) {	
		if(player.i.buyables[11].gte(1)) player.i.points = player.i.points.add(new Decimal(diff).mul(layers.i.buyables[11].effect()))
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
			title: "Nothing is eternal",
			description: "Nothings boost Impatience-inator's effect",
			effect() { return player.points.root(420) },
			effectDisplay() { return "x"+format(this.effect()) },
			cost: new Decimal(1000),
			unlocked() {return hasAchievement("a", 33)}
		},
		13: {
			title: "Impatience-inator-inator",
			description: "Boosts Impatience-inator's effect based on Impatience-inators",
			effect() { return player.i.buyables[11].add(1) },
			effectDisplay() { return "x"+format(this.effect()) },
			cost: new Decimal(5000),
			unlocked() {return hasAchievement("a", 33)}
		},
		14: {
			title: "CONDENSE.",
			description: "1 Impatience-inator is as powerful as 17 Impatience-inators",
			currencyLocation() {return player.i.buyables},
			currencyDisplayName: "Impatience-inators",
			currencyInternalName: 11,
			cost: new Decimal(17),
			unlocked() {return hasAchievement("a", 33)}
		},
		15: {
			title: "Shenanigans Power",
			description: "Shenanigans boosts Impaitence's effect after log(64)",
			effect() { return player.s.points.add(1) },
			effectDisplay() { return "x"+format(this.effect()) },
			cost: new Decimal(6000000),
			unlocked() {return hasAchievement("a", 33)}
		},
	},
	buyables: {
		rows: 1,
		cols: 2,
		11: {
			cost() { return new Decimal(1).mul(2).pow(player.i.buyables[11]) },
			effect() { let eff = new Decimal(1).mul(player.i.buyables[11]).pow(layers.i.buyables[12].effect())
					   if(hasUpgrade("i", 11)) eff = eff.pow(1.5)
					   if(hasUpgrade("i", 12)) eff = eff.mul(upgradeEffect("i", 12))
					   if(hasUpgrade("i", 13)) eff = eff.mul(upgradeEffect("i", 13))
					   if(hasUpgrade("i", 14)) eff = eff.mul(17)
					   if(hasUpgrade("s", 55) && !inChallenge("s", 12) && !inChallenge("s", 22)) eff = eff.mul(62)
					   if(hasAchievement("i", 35)) eff = eff.mul(1.25)
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
			effect() { let base = new Decimal(1.04)
					   let eff = new Decimal(base).pow(player.i.buyables[12])
					   if(new Decimal(player.i.buyables[12]).gte(107)) eff = new Decimal(64)
					   return eff},
			title: "NerfBusters",
			display() { return "Reduces Impatience's base nerf and log, exponents Impatience-inators's base.<br/>Amount: "+formatWhole(player.i.buyables[12])+"<br/>Cost: "+format(this.cost())+" impatiences<br/>Currently: /"+format(this.effect())+" ^"+format(this.effect()) },
			canAfford() { return player.i.points.gte(this.cost()) },
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
    layerShown(){return hasAchievement("a", 32)},
})


