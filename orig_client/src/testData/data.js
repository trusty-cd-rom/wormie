var data = {
		wormholeList: [
		{
			"id": 3,
			"title": "McDonalds line right now",
			"latitude": "50.0000000",
			"longitude": "60.0000000",
			"deadline": "2015-12-07T19:03:50.702834Z",
			"notes": "now!",
			"status": "completed",
			"owner": 1,
			"owner_name": "wormieadmin",
			"submissions": [
				{
					"id": 2,
					"owner_name": "sun",
					"created_at": "2015-12-07T23:17:23.385998Z",
					"updated_at": "2015-12-07T23:17:23.386086Z",
					"notes": "this video quality is bad",
					"video_url": "nt7gHEEqb4M",
					"wormhole_id": 10,
					"owner": 3
				}
			]
		},
		{
			"id": 4,
			"title": "hiking trail",
			"latitude": "50.0000000",
			"longitude": "60.0000000",
			"deadline": "2015-12-07T20:04:58.456637Z",
			"notes": "hahahahaha",
			"status": "completed",
			"owner": 1,
			"owner_name": "wormieadmin",
			"submissions": [
				{
					"id": 3,
					"owner_name": "charlie",
					"created_at": "2015-12-07T23:43:43.117379Z",
					"updated_at": "2015-12-07T23:43:43.117432Z",
					"notes": "Here's my new video",
					"video_url": "M99AyKrjINI",
					"wormhole_id": 9,
					"owner": 2
				}
			]
		},
		{
			"id": 6,
			"title": "golden gate",
			"latitude": "20.0000000",
			"longitude": "20.0000000",
			"deadline": "2015-12-07T20:04:58.456637Z",
			"notes": "can you walk backwards?",
			"status": "completed",
			"owner": 1,
			"owner_name": "wormieadmin",
			"submissions": [
				{
					"id": 1,
					"owner_name": "nick",
					"created_at": "2015-12-07T23:43:43.117379Z",
					"updated_at": "2015-12-07T23:43:43.117432Z",
					"notes": "this is a weird request....",
					"video_url": "3kryJpuVHio",
					"wormhole_id": 7,
					"owner": 1
				}
			]
		},
		{
			"id": 9,
			"title": "bla",
			"latitude": "40.0000000",
			"longitude": "40.0000000",
			"deadline": "2015-10-10T10:10:00Z",
			"notes": "test",
			"status": "open",
			"owner": 6,
			"owner_name": "sun",
			"submissions": []
		},
		{
			"id": 10,
			"title": "Hack Reactor Graduation",
			"latitude": "10.0000000",
			"longitude": "10.0000000",
			"deadline": "2015-10-10T10:10:00Z",
			"notes": "IS THIS REAL",
			"status": "open",
			"owner": 6,
			"owner_name": "sun",
			"submissions": []
		},
		{
			"id": 11,
			"title": "Charlie's house",
			"latitude": "55.0000000",
			"longitude": "55.0000000",
			"deadline": "2015-10-10T10:10:00Z",
			"notes": "Behind the trees",
			"status": "open",
			"owner": 6,
			"owner_name": "sun",
			"submissions": []
		}
		],
	wormholeDetail: {
    "id": 6,
    "title": "golden gate",
    "latitude": "20.0000000",
    "longitude": "20.0000000",
    "deadline": "2015-12-07T20:04:58.456637Z",
    "notes": "can you walk backwards?",
    "status": "OPEN!!!",
    "owner": 1,
    "owner_name": "wormieadmin",
    "submissions": []
	},
	submissionList: [
		{
			"id": 2,
			"owner_name": "sun",
			"created_at": "2015-12-07T23:17:23.385998Z",
			"updated_at": "2015-12-07T23:17:23.386086Z",
			"notes": "this video quality is bad",
			"video_url": "https://www.youtube.com/watch?v=nt7gHEEqb4M",
			"wormhole_id": 10,
			"owner": 3
		},
		{
			"id": 3,
			"owner_name": "charlie",
			"created_at": "2015-12-07T23:43:43.117379Z",
			"updated_at": "2015-12-07T23:43:43.117432Z",
			"notes": "Here's my new video",
			"video_url": "https://www.youtube.com/watch?v=M99AyKrjINI",
			"wormhole_id": 9,
			"owner": 2
		},
		{
			"id": 1,
			"owner_name": "nick",
			"created_at": "2015-12-07T23:43:43.117379Z",
			"updated_at": "2015-12-07T23:43:43.117432Z",
			"notes": "this is a weird request....",
			"video_url": "https://www.youtube.com/watch?v=3kryJpuVHio",
			"wormhole_id": 7,
			"owner": 1
		}
	],
	submissionDetail: {
    "id": 2,
    "owner_name": "sun",
    "created_at": "2015-12-07T23:17:23.385998Z",
    "updated_at": "2015-12-07T23:17:23.386086Z",
    "notes": "this video quality is bad",
    "video_url": "http://google.com",
    "wormhole_id": 10,
    "owner": 6
	},
	userList: [
		{
			"id": 2,
			"user": {
				"username": "dude4",
				"first_name": "charlie",
				"last_name": "harrington",
				"email": "chdude@gmail.com",
				"wormholes": [
					{
						"id": 3,
						"title": "McDonalds line right now",
						"latitude": "50.0000000",
						"longitude": "60.0000000",
						"deadline": "2015-12-07T19:03:50.702834Z",
						"notes": "now!",
						"status": "open",
						"owner": 1,
						"owner_name": "wormieadmin",
						"submissions": []
					},
					{
						"id": 4,
						"title": "hiking trail",
						"latitude": "50.0000000",
						"longitude": "60.0000000",
						"deadline": "2015-12-07T20:04:58.456637Z",
						"notes": "hahahahaha",
						"status": "forever and ever",
						"owner": 1,
						"owner_name": "wormieadmin",
						"submissions": []
					},
					{
						"id": 6,
						"title": "golden gate",
						"latitude": "20.0000000",
						"longitude": "20.0000000",
						"deadline": "2015-12-07T20:04:58.456637Z",
						"notes": "can you walk backwards?",
						"status": "OPEN!!!",
						"owner": 1,
						"owner_name": "wormieadmin",
						"submissions": []
					}
				],
				"submissions": []
			},
			"created_at": "2015-12-08T04:22:31.821453Z",
			"updated_at": "2015-12-08T04:22:31.821523Z",
			"picture_url": "http://innovateelt.com/wp/wp-content/uploads/2015/09/charlie-harrington-headshot-330x330.jpg",
			"location": "",
			"about_me": "I want a HUGE black dog!!!!!",
			"wormie_color": "Red"
		},
		{
			"id": 1,
			"user": {
				"username": "dude1",
				"first_name": "nick",
				"last_name": "fujita",
				"email": "zoomoo@gmail.com",
				"wormholes": [],
				"submissions": []
			},
			"created_at": "2015-12-08T04:22:31.821453Z",
			"updated_at": "2015-12-08T04:22:31.821523Z",
			"picture_url": "https://avatars1.githubusercontent.com/u/6342442?v=3&s=460",
			"location": "honolulu, hi",
			"about_me": "food...NOW!!!",
			"wormie_color": "Green"
		},
		{
			"id": 3,
			"user": {
				"username": "chick5",
				"first_name": "sun",
				"last_name": "kim",
				"email": "chocoKid@gmail.com",
				"wormholes": [],
				"submissions": []
			},
			"created_at": "2015-12-08T04:22:31.821453Z",
			"updated_at": "2015-12-08T04:22:31.821523Z",
			"picture_url": "https://avatars1.githubusercontent.com/u/11023936?v=3&s=460",
			"location": "seoul, south korea",
			"about_me": "i laaaaaaaaaav chocolaaaaaaateeeeeee~!~!~!~!",
			"wormie_color": "purple"
		}
	]
}

export default data;