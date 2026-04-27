var allGameplayData =
{
	"enemies": [
		{
			"type" : "soldier",
			"speed": 15, // Pixels per second
			"hp": 60,
			"damage": 1, // HP removed from base on enemy reached
			"payout": 15, // Money retrieved upon killing the enemy
			"takesDamageFrom": ["archer", "cannon", "blowdart"]
		},
		{
			"type" : "armed_soldier",
			"speed": 9,
			"hp": 240,
			"damage": 1,
			"payout": 20,
			"takesDamageFrom": ["archer", "cannon", "witch"]
		},
		{
			"type" : "cavalry",
			"speed": 30,
			"hp": 70,
			"damage": 1,
			"payout": 15,
			"takesDamageFrom": ["archer", "cannon","blowdart"]
		},
		{
			"type" : "armed_cavalry",
			"speed": 20,
			"hp": 240,
			"damage": 1,
			"payout": 20,
			"takesDamageFrom": ["archer", "cannon", "witch"]
		},
		{
			"type" : "flying",
			"speed": 20,
			"hp": 70,
			"damage": 1,
			"payout": 15,
			"takesDamageFrom": ["archer"]
		},
		{
			"type" : "armed_flying",
			"speed": 15,
			"hp": 240,
			"damage": 1,
			"payout": 20,
			"takesDamageFrom": ["archer", "witch"]
		}
	],
	
	"towers": [
		{
			"type" : "archer",
			"unlockLevel": 1,
									// Tower Attributes, per level! 0 is the "stock" tower
									
			"attackRadius": 		[60, 82, 82], // Pixels
			"attackDamage": 		[13, 13, 15], // HP
			"attackSpeed": 			[0.3,   0.3,  0.3],	  // Seconds, timed from spotting the enemy up to hitting it
			"attackCooldown": 		[1,   1,  1],	  // Interval between two attacks
			"purchasePrice": 		[150, 200, 250],
			"sellingRevenue": 		[75, 100, 200]
		},
		{
			"type" : "cannon",
			"unlockLevel": 3,
									// Tower Attributes, per level! 0 is the "stock" tower
			"attackRadius": 		[70, 92, 92], // Pixels
			"attackInnerRadius": 	[0.5, 0.5, 0.5], // of attackRadius
			"attackSplashRadius": 	[30, 30, 30], // Pixels
			"attackDamage": 		[50, 50, 50], // HP
			"attackSpeed": 			[1,   1,  1],	  // Seconds, timed from spotting the enemy up to hitting it
			"attackCooldown": 		[9,   9,  6],	  // Interval between two attacks
			"purchasePrice": 		[175, 225, 300],
			"sellingRevenue": 		[100, 150, 200]
		},
		{
			"type" : "witch",
			"unlockLevel": 7,
									// Tower Attributes, per level! 0 is the "stock" tower
			"attackRadius": 		[65, 65, 65], // Pixels
			"attackDamage": 		[40, 40, 50], // HP
			"attackSpeed": 			[0.3,   0.3,  0.3],	  // Seconds, timed from spotting the enemy up to hitting it
			"attackCooldown": 		[1,   0.5,  0.5],	  // Interval between two attacks
			"purchasePrice": 		[250, 300, 350],
			"sellingRevenue": 		[50, 70, 100]
		},
		{
			"type" : "blowdart",
			"unlockLevel": 5,
									// Tower Attributes, per level! 0 is the "stock" tower
			"attackRadius": 		[55, 65, 65], // Pixels
			"attackDamage": 		[6, 6, 10], // HP
			"attackSpeed": 			[0.3,   0.3,  0.3],	  // Seconds, timed from spotting the enemy up to hitting it
			"attackCooldown": 		[0.5,  0.5,  0.5],	  // Interval between two attacks
			"enemiesToAttack":		[5, 5, 5], // Number of enemies to attack
			"purchasePrice": 		[100, 150, 200],
			"sellingRevenue": 		[40, 60, 90]
		}
	],
	"magic": [
		{
			"type" : "slow",
			"effectDuration": 3,
			"speedFactor": 0.5,
			"cooldown": 20,
			"radius": 50,
			"unlockLevel": 2
		},
		{
			"type" : "fire",
			"effectDamage": 20,
			"cooldown": 20,
			"radius": 50,
			"unlockLevel": 4
		},
		{
			"type" : "wardrum",
			"effectDuration": 4,
			"damageFactor": 2,
			"cooldown": 20,
			"radius": 55,
			"unlockLevel": 6
		}
	]
}

var allMenuData =
{
	"screens": [
		{
			"levels": [
				{
					"id": 1,
					"x": 125,
					"y": 418
				},
				{
					"id": 2,
					"x": 175,
					"y": 325
				},
				{
					"id": 3,
					"x": 135,
					"y": 218
				},
				{
					"id": 4,
					"x": 125,
					"y": 70
				},
				{
					"id": 5,
					"x": 226,
					"y": 159
				}
			]
		},
		{
			"levels": [
				{
					"id": 6,
					"x": 32,
					"y": 180
				},
				{
					"id": 7,
					"x": 112,
					"y": 68
				},
				{
					"id": 8,
					"x": 122,
					"y": 183
				},
				{
					"id": 9,
					"x": 130,
					"y": 298
				},
				{
					"id": 10,
					"x": 67,
					"y": 400
				}
			]
		}
	]
}

function GameplayDB() {
}

GameplayDB.prototype.getGameplayData= function() {
	return allGameplayData;
}

GameplayDB.prototype.getMenuData= function() {
	return allMenuData;
}