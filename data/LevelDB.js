var allLevelData =
{
	// Levels
	"levels": [
		{
			//level 1
			"id" : 1,
			"baseHp": 10,
			"threeStars": 6,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2.5,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 60,				  // Seconds, from the end of the last wave!
				    "noticeTime": 40, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 8,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,				  // Seconds, from the end of the last wave!
				    "noticeTime": 40, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 10,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
			],
		"routes": [ 
			{ "id": 1, 
			"points": [ 
			{"x": 4, "y": 0},
			{"x": 4, "y": 1},
			{"x": 5, "y": 1},
			{"x": 6, "y": 1},
			{"x": 6, "y": 2},
			{"x": 6, "y": 3},
			{"x": 6, "y": 4},
			{"x": 6, "y": 5},
			{"x": 6, "y": 6},
			{"x": 2, "y": 7},
			{"x": 3, "y": 7},
			{"x": 4, "y": 7},
			{"x": 5, "y": 7},
			{"x": 6, "y": 7}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 5, "y": 3},
			{"x": 7, "y": 5},
			{"x": 5, "y": 6},
			{"x": 4, "y": 8},
			{"x": 6, "y": 8}
			], 
			"bases": [ 
			{"x": 1, "y": 7}
			] 

		},

		{
		//level 2
			"id" : 2,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 25,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 5,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 22,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
			],
		"routes": [ 
			{ "id": 1, 
			"points": [ 
			{"x": 0, "y": 2},
			{"x": 1, "y": 2},
			{"x": 2, "y": 2},
			{"x": 3, "y": 2},
			{"x": 3, "y": 3},
			{"x": 3, "y": 4},
			{"x": 4, "y": 4},
			{"x": 5, "y": 4},
			{"x": 6, "y": 4},
			{"x": 6, "y": 5},
			{"x": 6, "y": 6},
			{"x": 4, "y": 7},
			{"x": 5, "y": 7},
			{"x": 6, "y": 7},
			{"x": 4, "y": 8}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 2, "y": 3},
			{"x": 6, "y": 3},
			{"x": 5, "y": 5},
			{"x": 3, "y": 7},
			{"x": 7, "y": 7},
			{"x": 5, "y": 8}
			], 
			"bases": [ 
			{"x": 3, "y": 8}
			] 

		},
		
		{
			//level 3
			"id" : 3,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 7,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 3,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 14,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 24,
						  "spawnInterval": 3,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 60,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 13,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 20,
						  "spawnInterval": 3,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 60,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 24,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 60,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 5,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 15,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
			],
		"routes": [ 
			{ "id": 1, 
			"points": [ 
			{"x": 5, "y": 2},
			{"x": 6, "y": 2},
			{"x": 7, "y": 2},
			{"x": 1, "y": 3},
			{"x": 2, "y": 3},
			{"x": 3, "y": 3},
			{"x": 5, "y": 3},
			{"x": 1, "y": 4},
			{"x": 3, "y": 4},
			{"x": 5, "y": 4},
			{"x": 1, "y": 5},
			{"x": 3, "y": 5},
			{"x": 5, "y": 5},
			{"x": 1, "y": 6},
			{"x": 3, "y": 6},
			{"x": 5, "y": 6},
			{"x": 3, "y": 7},
			{"x": 5, "y": 7},
			{"x": 3, "y": 8},
			{"x": 4, "y": 8},
			{"x": 5, "y": 8}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 2, "y": 2},
			{"x": 6, "y": 3},
			{"x": 2, "y": 5},
			{"x": 6, "y": 5},
			{"x": 4, "y": 6},
			{"x": 2, "y": 8}
			], 
			"bases": [ 
			{"x": 0, "y": 6}
			] 


		},
		
		{
			//level 4
			"id" : 4,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 30, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 3,
						  "spawnTime": 9,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 16,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 18,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 80,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 3,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 16,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},

			],
		"routes": [ 
			{ "id": 2, 
			"points": [ 
			{"x": 6, "y": 2},
			{"x": 7, "y": 2},
			{"x": 5, "y": 3},
			{"x": 6, "y": 3},
			{"x": 5, "y": 4},
			{"x": 5, "y": 5},
			{"x": 4, "y": 6},
			{"x": 5, "y": 6},
			{"x": 4, "y": 7}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 0, "y": 2},
			{"x": 1, "y": 2},
			{"x": 2, "y": 2},
			{"x": 2, "y": 3},
			{"x": 2, "y": 4},
			{"x": 2, "y": 5},
			{"x": 2, "y": 6},
			{"x": 3, "y": 6},
			{"x": 4, "y": 6},
			{"x": 4, "y": 7}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 5, "y": 2},
			{"x": 1, "y": 3},
			{"x": 3, "y": 5},
			{"x": 6, "y": 5},
			{"x": 2, "y": 7},
			{"x": 5, "y": 7}
			], 
			"bases": [ 
			{"x": 4, "y": 8}
			] 

		},
		
		{
			//level 5
			"id" : 5,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 35, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 2			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 3,
						  "spawnTime": 5,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 7,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 1,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 11,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 1,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 3 , 
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 7,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 2,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 2,
						  "spawnTime": 13,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 25,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 4,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 14,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 70,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},

			],
		"routes": [ 
			{ "id": 2, 
			"points": [ 
			{"x": 1, "y": 1},
			{"x": 2, "y": 1},
			{"x": 3, "y": 1},
			{"x": 1, "y": 2},
			{"x": 3, "y": 2},
			{"x": 1, "y": 3},
			{"x": 3, "y": 3},
			{"x": 1, "y": 4},
			{"x": 3, "y": 4},
			{"x": 1, "y": 5},
			{"x": 1, "y": 6},
			{"x": 1, "y": 7},
			{"x": 0, "y": 8},
			{"x": 1, "y": 8}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 6, "y": 1},
			{"x": 7, "y": 1},
			{"x": 6, "y": 2},
			{"x": 6, "y": 3},
			{"x": 6, "y": 4},
			{"x": 4, "y": 5},
			{"x": 6, "y": 5},
			{"x": 4, "y": 6},
			{"x": 6, "y": 6},
			{"x": 4, "y": 7},
			{"x": 6, "y": 7},
			{"x": 4, "y": 8},
			{"x": 5, "y": 8},
			{"x": 6, "y": 8}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 2, "y": 2},
			{"x": 7, "y": 2},
			{"x": 0, "y": 3},
			{"x": 2, "y": 4},
			{"x": 5, "y": 5},
			{"x": 7, "y": 6},
			{"x": 0, "y": 7},
			{"x": 5, "y": 7}
			], 
			"bases": [ 
			{"x": 4, "y": 4}
			] 

		},
		
		{
			//level 6
			"id" : 6,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 35, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 2,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 5,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 22,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 3,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 14,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 13,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 17,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 60,
                    "noticeTime": 30,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 7,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 3,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 2,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 12,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 10 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 7,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 24,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},

			],
		"routes": [ 
			{ "id": 3, 
			"points": [ 
			{"x": 0, "y": 5},
			{"x": 1, "y": 5},
			{"x": 2, "y": 5},
			{"x": 3, "y": 5},
			{"x": 4, "y": 5},
			{"x": 5, "y": 5},
			{"x": 6, "y": 5}
			] 
			 }, 
			{ "id": 2, 
			"points": [ 
			{"x": 0, "y": 2},
			{"x": 1, "y": 2},
			{"x": 2, "y": 2},
			{"x": 2, "y": 3},
			{"x": 2, "y": 4},
			{"x": 2, "y": 5},
			{"x": 6, "y": 5},
			{"x": 2, "y": 6},
			{"x": 6, "y": 6},
			{"x": 2, "y": 7},
			{"x": 6, "y": 7},
			{"x": 2, "y": 8},
			{"x": 3, "y": 8},
			{"x": 4, "y": 8},
			{"x": 5, "y": 8},
			{"x": 6, "y": 8}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 2, "y": 2},
			{"x": 3, "y": 2},
			{"x": 4, "y": 2},
			{"x": 5, "y": 2},
			{"x": 6, "y": 2},
			{"x": 2, "y": 3},
			{"x": 6, "y": 3},
			{"x": 2, "y": 4},
			{"x": 6, "y": 4},
			{"x": 2, "y": 5},
			{"x": 6, "y": 5},
			{"x": 2, "y": 6},
			{"x": 2, "y": 7},
			{"x": 0, "y": 8},
			{"x": 1, "y": 8},
			{"x": 2, "y": 8}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 3, "y": 3},
			{"x": 5, "y": 3},
			{"x": 1, "y": 4},
			{"x": 5, "y": 4},
			{"x": 1, "y": 6},
			{"x": 5, "y": 6},
			{"x": 3, "y": 7},
			{"x": 5, "y": 7}
			], 
			"bases": [ 
			{"x": 7, "y": 5}
			] 

		},
		
		{
			//level 7
			"id" : 7,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 35, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 2			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 5,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 6,			 // Number of enemies
						  "spawnTime": 8,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 3,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 12,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 13,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 16,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 11,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 10 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 11,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 18,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 13,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 11 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 14 ,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 3,
						  "spawnTime": 3,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 12,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 22,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},

			],
		"routes": [ 
			{ "id": 2, 
			"points": [ 
			{"x": 0, "y": 2},
			{"x": 1, "y": 2},
			{"x": 2, "y": 2},
			{"x": 3, "y": 2},
			{"x": 3, "y": 3},
			{"x": 1, "y": 4},
			{"x": 2, "y": 4},
			{"x": 3, "y": 4},
			{"x": 1, "y": 5},
			{"x": 1, "y": 6},
			{"x": 1, "y": 7}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 6, "y": 2},
			{"x": 7, "y": 2},
			{"x": 6, "y": 3},
			{"x": 6, "y": 4},
			{"x": 4, "y": 5},
			{"x": 5, "y": 5},
			{"x": 6, "y": 5},
			{"x": 4, "y": 6},
			{"x": 4, "y": 7}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 5, "y": 2},
			{"x": 2, "y": 3},
			{"x": 7, "y": 3},
			{"x": 0, "y": 4},
			{"x": 5, "y": 4},
			{"x": 2, "y": 5},
			{"x": 0, "y": 6},
			{"x": 5, "y": 6},
			{"x": 2, "y": 7},
			{"x": 3, "y": 7}
			], 
			"bases": [ 
			{"x": 1, "y": 8},
			{"x": 4, "y": 8}
			] 

		},
		
		{
			//level 8
			"id" : 8,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 35, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "soldier",
						  "amount" : 4,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 55,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 5,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 2,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 6,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_flying",
						  "amount" : 2,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 18,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 12,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 7,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 12,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 10 ,
				    "startTime": 70,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 2,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 4,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 11 ,
				    "startTime": 70,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 4,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},

			],
		"routes": [ 
			{ "id": 2, 
			"points": [ 
			{"x": 3, "y": 0},
			{"x": 3, "y": 1},
			{"x": 3, "y": 2},
			{"x": 3, "y": 3},
			{"x": 3, "y": 4},
			{"x": 4, "y": 4},
			{"x": 5, "y": 4},
			{"x": 6, "y": 4},
			{"x": 6, "y": 5},
			{"x": 6, "y": 6},
			{"x": 6, "y": 7}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 3, "y": 0},
			{"x": 3, "y": 1},
			{"x": 3, "y": 2},
			{"x": 3, "y": 3},
			{"x": 1, "y": 4},
			{"x": 2, "y": 4},
			{"x": 3, "y": 4},
			{"x": 1, "y": 5},
			{"x": 1, "y": 6},
			{"x": 1, "y": 7}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 4, "y": 1},
			{"x": 2, "y": 3},
			{"x": 4, "y": 3},
			{"x": 2, "y": 5},
			{"x": 5, "y": 5},
			{"x": 0, "y": 6},
			{"x": 7, "y": 6},
			{"x": 2, "y": 7},
			{"x": 5, "y": 7}
			], 
			"bases": [ 
			{"x": 1, "y": 8},
			{"x": 6, "y": 8}
			] 

		},
		
		{
			//level 9
			"id" : 9,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 35, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 4,			 // Number of enemies
						  "spawnTime": 1,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 1,	 // Seconds, time between each single enemy spawn
						  "routeId": 2			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,			 // Number of enemies
						  "spawnTime": 5,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 6,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 3			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 3,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 9,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 3,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 9,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 13,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 2,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 3,
						  "spawnTime": 15,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 6,
						  "spawnTime": 15,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 4,
						  "spawnTime": 25,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 75,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 4,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 5,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 75,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 3,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 30,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 30,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 75,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 4,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 6,
						  "spawnTime": 7,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 10 ,
				    "startTime": 75,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 8,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 8,
						  "spawnTime": 20,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 11 ,
				    "startTime": 75,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 5,
						  "spawnTime": 12,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "cavalry",
						  "amount" : 3,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 12 ,
				    "startTime": 75,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_flying",
						  "amount" : 4,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 6,
						  "spawnTime": 17,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 6,
						  "spawnTime": 20,
						  "spawnInterval": 2,
						  "routeId": 1
						},
					]
				},

			],
		"routes": [ 
			{ "id": 3, 
			"points": [ 
			{"x": 3, "y": 2},
			{"x": 4, "y": 2},
			{"x": 5, "y": 2},
			{"x": 6, "y": 2},
			{"x": 7, "y": 2},
			{"x": 3, "y": 3},
			{"x": 3, "y": 4},
			{"x": 4, "y": 4},
			{"x": 4, "y": 5},
			{"x": 6, "y": 5},
			{"x": 4, "y": 6},
			{"x": 5, "y": 6},
			{"x": 6, "y": 6}
			] 
			 }, 
			{ "id": 2, 
			"points": [ 
			{"x": 3, "y": 0},
			{"x": 3, "y": 1},
			{"x": 3, "y": 2},
			{"x": 3, "y": 3},
			{"x": 3, "y": 4},
			{"x": 4, "y": 4},
			{"x": 4, "y": 5},
			{"x": 4, "y": 6},
			{"x": 4, "y": 7},
			{"x": 3, "y": 8},
			{"x": 4, "y": 8}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 0, "y": 2},
			{"x": 1, "y": 2},
			{"x": 2, "y": 2},
			{"x": 3, "y": 2},
			{"x": 3, "y": 3},
			{"x": 3, "y": 4},
			{"x": 4, "y": 4},
			{"x": 4, "y": 5},
			{"x": 1, "y": 6},
			{"x": 2, "y": 6},
			{"x": 3, "y": 6},
			{"x": 4, "y": 6}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 4, "y": 1},
			{"x": 2, "y": 3},
			{"x": 4, "y": 3},
			{"x": 3, "y": 5},
			{"x": 5, "y": 5},
			{"x": 3, "y": 7},
			{"x": 5, "y": 7}
			], 
			"bases": [ 
			{"x": 6, "y": 4},
			{"x": 1, "y": 5},
			{"x": 2, "y": 8}
			] 

		},
		
		{
			//level 10
			"id" : 10,
			"baseHp": 10,
			"threeStars": 8,
			"twoStars": 4,
			"balance": 400,
			"waves": [
				{ "waveId" : 1 ,
				    "startTime": 40,				  // Seconds, from the end of the last wave!
				    "noticeTime": 35, 			  // Seconds, declares when to display wave notice icon
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,			 // Number of enemies
						  "spawnTime": 2,		 // Seconds, when to start spawning (from the beginning of the current wave)
						  "spawnInterval": 2,	 // Seconds, time between each single enemy spawn
						  "routeId": 1			 // Id of the route as described in the routes list.
						},
					]
				},
				{ "waveId" : 2 ,
				    "startTime": 50,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 3 ,
				    "startTime": 50,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 4 ,
				    "startTime": 50,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 2,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "cavalry",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 5 ,
				    "startTime": 55,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 4
						},
						{ "enemyType": "soldier",
						  "amount" : 8,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 6 ,
				    "startTime": 55,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 3,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 4
						},
					]
				},
				{ "waveId" : 7 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 3,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 8 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 8,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 9 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 10,
						  "spawnTime": 5,
						  "spawnInterval": 1,
						  "routeId": 4
						},
					]
				},
				{ "waveId" : 10 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 4
						},
						{ "enemyType": "armed_flying",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 5,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 5,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 1
						},
					]
				},
				{ "waveId" : 11 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_cavalry",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_soldier",
						  "amount" : 2,
						  "spawnTime": 8,
						  "spawnInterval": 2,
						  "routeId": 4
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 12,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "soldier",
						  "amount" : 8,
						  "spawnTime": 22,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 12 ,
				    "startTime": 70,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_flying",
						  "amount" : 2,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 4,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 16,
						  "spawnInterval": 2,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 13 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 6,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 1
						},
						{ "enemyType": "soldier",
						  "amount" : 7,
						  "spawnTime": 4,
						  "spawnInterval": 1,
						  "routeId": 4
						},
						{ "enemyType": "flying",
						  "amount" : 2,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 15,
						  "spawnInterval": 2,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 14 ,
				    "startTime": 65,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 3,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 6,
						  "spawnTime": 5,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 10,
						  "spawnInterval": 1,
						  "routeId": 3
						},
					]
				},
				{ "waveId" : 15 ,
				    "startTime": 70,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "flying",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "armed_flying",
						  "amount" : 2,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "soldier",
						  "amount" : 8,
						  "spawnTime": 14,
						  "spawnInterval": 1,
						  "routeId": 2
						},
					]
				},
				{ "waveId" : 16 ,
				    "startTime": 60,
                    "noticeTime": 35,
					"enemyGroups": [
						{ "enemyType": "armed_soldier",
						  "amount" : 4,
						  "spawnTime": 1,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "armed_flying",
						  "amount" : 3,
						  "spawnTime": 6,
						  "spawnInterval": 2,
						  "routeId": 3
						},
						{ "enemyType": "armed_cavalry",
						  "amount" : 3,
						  "spawnTime": 14,
						  "spawnInterval": 2,
						  "routeId": 1
						},
						{ "enemyType": "flying",
						  "amount" : 4,
						  "spawnTime": 22,
						  "spawnInterval": 1,
						  "routeId": 3
						},
						{ "enemyType": "cavalry",
						  "amount" : 5,
						  "spawnTime": 30,
						  "spawnInterval": 1,
						  "routeId": 2
						},
						{ "enemyType": "soldier",
						  "amount" : 8,
						  "spawnTime": 38,
						  "spawnInterval": 1,
						  "routeId": 4
						},
					]
				},

			],
		"routes": [ 
			{ "id": 4, 
			"points": [ 
			{"x": 2, "y": 5},
			{"x": 2, "y": 6},
			{"x": 1, "y": 7},
			{"x": 2, "y": 7},
			{"x": 0, "y": 8},
			{"x": 1, "y": 8}
			] 
			 }, 
			{ "id": 3, 
			"points": [ 
			{"x": 4, "y": 5},
			{"x": 4, "y": 6},
			{"x": 5, "y": 6},
			{"x": 5, "y": 7},
			{"x": 6, "y": 7},
			{"x": 6, "y": 8},
			{"x": 7, "y": 8}
			] 
			 }, 
			{ "id": 2, 
			"points": [ 
			{"x": 0, "y": 2},
			{"x": 1, "y": 2},
			{"x": 1, "y": 3},
			{"x": 2, "y": 3},
			{"x": 2, "y": 4},
			{"x": 2, "y": 5}
			] 
			 }, 
			{ "id": 1, 
			"points": [ 
			{"x": 6, "y": 2},
			{"x": 7, "y": 2},
			{"x": 4, "y": 3},
			{"x": 5, "y": 3},
			{"x": 6, "y": 3},
			{"x": 4, "y": 4},
			{"x": 4, "y": 5}
			] 
			 }, 
			], 
			"towerSlots": [ 
			{"x": 2, "y": 2},
			{"x": 5, "y": 2},
			{"x": 0, "y": 3},
			{"x": 7, "y": 3},
			{"x": 1, "y": 4},
			{"x": 5, "y": 4},
			{"x": 1, "y": 6},
			{"x": 6, "y": 6},
			{"x": 0, "y": 7},
			{"x": 4, "y": 7},
			{"x": 2, "y": 8},
			{"x": 5, "y": 8}
			], 
			"bases": [ 
			{"x": 3, "y": 5}
			] 

		},

	]
}

function LevelDB() {
}

LevelDB.prototype.getLevelData= function() {
	return allLevelData;
}