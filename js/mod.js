let modInfo = {
	name: "The Shenanigans Tree: Rewritten",
	id: "holyfuckingshitisthatshenaniganstree!?!??!?!??!?!??!?!",
	author: "stupidoleg",
	pointsName: "nothings",
	discordName: "Holy Broly#0530",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3.1",
	name: "god OOFing damn it let me take a break for 5 hours",
}

let changelog = `<h1>Changelog:</h1><br>
		v0.3.1: god OOFing damn it let me take a break for 5 hours<br>
		- Fixed some grammatical errors
		- Increased most Shenanigans upgrades's cost<br>
		- Increased Chaos and Transcendence layers's base<br>
		- Nerfed NerfBusters (rip Nerf Meta)<br>
		- Removed Transcended Exponent's hardcap and made 30th achievement "better"<br>
		- Also increased some of Chaos's and Transcendence's upgrades's cost<br>
		- Now you can buy NerfBusters before buying first Impatience-inator, so long as you have 2 Impatiences to spend 
	<h3>v0.3: The moment you all have been waiting for</h3><br>
		[1/2]<br>
		- Updated TMT from 2.π to 2.5.2.1
		- NerfBusters is now only purchasable with at least one Impatience-inator<br>
		- Chaos and Transcendence layers are now functionable<br>
		- Gave the name of each version and fixed the spacing in changelog<br>
		- Achievements now has images (Wow. Much quality. Such fun.) [NOT IMPLEMENTED]<br><br>
		What comes with those new layers:<br>
		- A total of 12 upgrades (18 more upgrades will be added later)<br>
		- Five more achievements (6 more achievements will be added layer)<br>
		- Even more shitposts, memes and (JOJO) references<br>
		- Still no 5th Square Expansion<br><br>
		[2/2]<br>
		- 6 more achivements were added in, as promised<br>
		- Transcended is now connected to Impatience and both 2nd row layers are connected to each other<br>
		- 19 more upgrades were added in (E P I C)<br>
		- Even more of electric boogaloo with unexpected ending and gimmicks<br>
		- You still can't get 5th Square Expansion and I swear to god if you tell me that it's supposed to drop down 1 Shenanigans more, then guess what? 5th Square Expansion doesn't exist.<br><br>
		It does not exist.<br><br>
		It does not exist.<br><br>
		It does not exist.<br><br><br>
		v0.2.1: haha shitpost go brrrrrrrrrrrrrrrr<br>
		- Rebalanced early-late game (Reworked 2nd Impatience buyable)<br>
		- ???<br><br>
	<h3>v0.2: Rebalance Update</h3><br>
		- Reworked/Added Impatience Layer (2 buyables, 5 upgrades)<br>
		- Changed "Ah yes, the Nothinginator"'s formula<br>
		- Due the previous change in this changelog, some of upgrades's cost were balanced<br>
		- Achievement layer now becomes green when you get all achievements<br>
		- Changed descriptions there and there, you know the stuff.<br>
		- 9 more Shenanigans upgrades, 1 more Square Expansions milestone and 8 more achievements<br>
		- Shitton of references were poured in<br>
		- Unnecessary amount of texts were added in<br>
		- Fixed the bug, where challenge's effect still persist after Square Expansion reset<br>
		- just play this mod already already omg.<br><br>
		v0.1.1: Balance Update<br>
		- Changed 14th upgrade's effects to make it feel like it actually does something<br>
		- Due it working more effecient, the costs of later upgrades were raised to match the changes <br><br>
	<h3>v0.1: Grand opening... Or is it grand publishing?</h3><br>
		- Added this, that, did some stuff there- you get the point.<br>
		- But seriously, there's 3 "layers" in total, craptons of upgrades and challenges for v0.1.<br>
		- idk what else to say about the mod, that was just released.`

let winText = `Congratulations! You have reached the end and beaten this game. Hope you enjoyed reloading the page over, and over, and over again.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.points.lt(new Decimal(308).pentate(2))
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1/60)
	let challengeReward = new Decimal(60)
	if(hasUpgrade("c", 31)) challengeReward = new Decimal(3600)
	if(hasChallenge("s", 11)) gain = gain.mul(challengeReward)
	if(hasChallenge("s", 12)) gain = gain.mul(challengeReward)
	if(hasChallenge("s", 21)) gain = gain.mul(challengeReward)
	if(hasChallenge("s", 22)) gain = gain.mul(challengeReward)
	let funnyAchievementMultiplier = new Decimal(1).mul(player.s.points.add(1).root(3)).mul(new Decimal(player.timePlayed).add(60).log(60)).mul(player.i.points.add(10).log(10)).mul(player.t.points.add(3).log(3)).mul(player.t.realPoints.add(10).log(10)).mul(player.c.points.add(3).log(3)).mul(player.c.chaoticPoints.add(10).log(10)).mul(player.se.points.add(1).root(2)).mul(player.points.add(1).root(1024))
	if(hasAchievement("a", 11)) gain = gain.mul(6)
	if(hasAchievement("a", 13)) gain = gain.mul(funnyAchievementMultiplier)
	if(hasUpgrade("s", 11)) gain = gain.mul(layers.s.upgrades[11].effect2()).mul(layers.s.upgrades[11].effect())
	if(hasUpgrade("s", 12)) gain = gain.mul(upgradeEffect("s", 12))
	if(hasUpgrade("s", 21)) gain = gain.mul(upgradeEffect("s", 21))
	if(hasUpgrade("s", 31)) gain = gain.mul(upgradeEffect("s", 31))
	if(hasUpgrade("s", 24) && !inChallenge("s", 21) && !inChallenge("s", 22)) gain = gain.mul(420)
	if(hasUpgrade("s", 25) && !inChallenge("s", 12) && !inChallenge("s", 22)) gain = gain.mul(262144)
	if(hasUpgrade("s", 55) && !inChallenge("s", 12) && !inChallenge("s", 22)) gain = gain.mul(62)
	if(layers.i.layerShown() == true) gain = gain.mul(layers.i.effect())
	if(gain.gte(1)) gain = gain.pow(player.se.points.add(1))
	if(hasUpgrade("c", 11)) gain = gain.mul(new Decimal(100).add(layers.c.upgrades[11].effect()).div(100))
	gain = gain.mul(buyableEffect("c", 11))
	if(hasUpgrade("t", 53)) gain = gain.pow(buyableEffect("t", 11).root(5))
	if(hasUpgrade("c", 13)) gain = gain.pow(layers.c.chaoticEffect2())
	if(hasUpgrade("c", 33)) gain = gain.pow(1.10)
	if(hasUpgrade("c", 51)) gain = gain.mul(new Decimal(2).pow(1024))
	if(inChallenge("s", 11)) gain = gain.div(362880)
	let shitpostPower = new Decimal(69420).pow(player.s3.secretPoints.add(1).pow(player.s3.secretPoints.add(1)))
	if(hasUpgrade("s3", 61)) shitpostPower = shitpostPower.pow(69420).pow(player.s3.topSecretPoints)
	if(layers.s2.layerShown() == true) {for (var i = 1; i < player.s2.secretPoints; i++) {		
										gain = gain.pow(shitpostPower)
	}}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return player.points.gte(new Decimal(308).pentate(2)) ? "(Oh shit/sec)" : ""}
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("t", 61)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
