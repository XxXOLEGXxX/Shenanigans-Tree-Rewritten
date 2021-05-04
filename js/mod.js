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
	num: "0.1.1",
	name: "Balance Update",
}

let changelog = `<h1>Changelog:</h1><br>
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
	let funnyAchievementMultiplier = new Decimal(1).add(player.s.points.add(100).log(100)).add(player.se.points.add(10).log(10)).add(player.points.add(10).log(1000))
	if(hasAchievement("a", 11)) gain = gain.mul(6)
	if(hasAchievement("a", 13)) gain = gain.mul(funnyAchievementMultiplier)
	if(hasUpgrade("s", 11)) gain = gain.mul(layers.s.upgrades[11].effect2()).mul(layers.s.upgrades[11].effect())
	if(hasUpgrade("s", 12)) gain = gain.mul(upgradeEffect("s", 12))
	if(hasUpgrade("s", 21)) gain = gain.mul(upgradeEffect("s", 21))
	if(hasUpgrade("s", 31)) gain = gain.mul(upgradeEffect("s", 31))
	if(hasUpgrade("s", 24) && !inChallenge("s", 21) && !inChallenge("s", 22)) gain = gain.mul(420)
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
	return player.s.points.gte(73)
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
