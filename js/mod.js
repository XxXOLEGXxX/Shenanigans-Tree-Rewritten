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
	num: "0.2",
	name: "Rebalance Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2</h3><br>
		- Reworked/Added Impatience Layer (2 buyables, 5 upgrades)<br>
		- Changed "Ah yes, the Nothinginator"'s formula<br>
		- Due the previous change in this changelog, some of upgrades's cost were balanced<br>
		- Achievement layer now becomes green when you get all achievements<br>
		- Changed descriptions there and there, you know the stuff.<br>
		- 9 more Shenanigans upgrades, 1 more Square Expansions milestone and 8 more achievements<br>
		- Shitton of references were poured in<br>
		- Unnecessary amount of texts were added in<br>
		- Fixed the bug, where challenge's effect still persist after Square Expansion reset<br>
		- just play this mod already already omg.
	<h4>v0.1.1</h4><br>
		- Changed 14th upgrade's effects to make it feel like it actually does something<br>
		- Due it working more effecient, the costs of later upgrades were raised to match the changes <br>
	<h3>v0.1</h3><br>
		- Added this, that, did some stuff there- you get the point.<br>
		- But seriously, there's 3 "layers" in total, craptons of upgrades and challenges for v0.1.<br>
		- idk what else to say about the mod, that was just released.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1/60)
	if(hasChallenge("s", 11)) gain = gain.mul(60)
	if(hasChallenge("s", 12)) gain = gain.mul(60)
	if(hasChallenge("s", 21)) gain = gain.mul(60)
	if(hasChallenge("s", 22)) gain = gain.mul(60)
	let funnyAchievementMultiplier = new Decimal(1).mul(player.s.points.add(1).root(3)).mul(player.i.points.add(10).log(10)).mul(player.se.points.add(1).root(2)).mul(player.points.add(1).root(1024))
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
	if(inChallenge("s", 11)) gain = gain.div(7560)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(1.797693134862315907729305190789e308)
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
