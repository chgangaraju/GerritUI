var gerrit_hostpagedata = {
	"config" : {
		"registerUrl" : "https://dev.eclipse.org/site_login/createaccount.php",
		"reportBugUrl" : "http://code.google.com/p/gerrit/issues/list",
		"useContributorAgreements" : false,
		"useContactInfo" : false,
		"allowRegisterNewEmail" : false,
		"authType" : "LDAP",
		"downloadSchemes" : [ "SSH", "ANON_HTTP", "HTTP", "ANON_GIT" ],
		"downloadCommands" : [ "DEFAULT_DOWNLOADS" ],
		"gitDaemonUrl" : "git://git.eclipse.org/gitroot/",
		"sshdAddress" : "git.eclipse.org:29418",
		"wildProject" : {
			"name" : "All-Projects"
		},
		"approvalTypes" : {
			"approvalTypes" : [ {
				"category" : {
					"categoryId" : {
						"id" : "VRIF"
					},
					"name" : "Verified",
					"abbreviatedName" : "V",
					"position" : 0,
					"functionName" : "MaxWithBlock",
					"copyMinScore" : false,
					"labelName" : "Verified"
				},
				"values" : [ {
					"key" : {
						"categoryId" : {
							"id" : "VRIF"
						},
						"value" : -1
					},
					"name" : "Fails"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "VRIF"
						},
						"value" : 0
					},
					"name" : "No score"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "VRIF"
						},
						"value" : 1
					},
					"name" : "Verified"
				} ],
				"maxNegative" : -1,
				"maxPositive" : 1
			}, {
				"category" : {
					"categoryId" : {
						"id" : "CRVW"
					},
					"name" : "Code Review",
					"abbreviatedName" : "R",
					"position" : 1,
					"functionName" : "MaxWithBlock",
					"copyMinScore" : true,
					"labelName" : "Code-Review"
				},
				"values" : [ {
					"key" : {
						"categoryId" : {
							"id" : "CRVW"
						},
						"value" : -2
					},
					"name" : "Do not submit"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "CRVW"
						},
						"value" : -1
					},
					"name" : "I would prefer that you didn\u0027t submit this"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "CRVW"
						},
						"value" : 0
					},
					"name" : "No score"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "CRVW"
						},
						"value" : 1
					},
					"name" : "Looks good to me, but someone else must approve"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "CRVW"
						},
						"value" : 2
					},
					"name" : "Looks good to me, approved"
				} ],
				"maxNegative" : -2,
				"maxPositive" : 2
			}, {
				"category" : {
					"categoryId" : {
						"id" : "IPCL"
					},
					"name" : "IP Clean",
					"abbreviatedName" : "I",
					"position" : 3,
					"functionName" : "MaxWithBlock",
					"copyMinScore" : false,
					"labelName" : "IP-Clean"
				},
				"values" : [ {
					"key" : {
						"categoryId" : {
							"id" : "IPCL"
						},
						"value" : -1
					},
					"name" : "Unclean IP, do not check in"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "IPCL"
						},
						"value" : 0
					},
					"name" : "No score"
				}, {
					"key" : {
						"categoryId" : {
							"id" : "IPCL"
						},
						"value" : 1
					},
					"name" : "IP review completed"
				} ],
				"maxNegative" : -1,
				"maxPositive" : 1
			} ]
		},
		"editableAccountFields" : [ "REGISTER_NEW_EMAIL" ],
		"commentLinks" : [
				{
					"find" : "(I[0-9a-f]{8,40})",
					"replace" : "\u003ca href\u003d\"#/q/$1,n,z\"\u003e$\u0026\u003c/a\u003e"
				},
				{
					"find" : "([Bb]ug:?\\s*#?)(\\d+)",
					"replace" : "$1\u003ca href\u003d\"https://bugs.eclipse.org/bugs/show_bug.cgi?id\u003d$2\"\u003e$2\u003c/a\u003e"
				},
				{
					"find" : "(CQ:?\\s*#?)(\\d+)",
					"replace" : "$1\u003ca href\u003d\"https://dev.eclipse.org/ipzilla/show_bug.cgi?id\u003d$2\"\u003e$2\u003c/a\u003e"
				} ],
		"documentationAvailable" : true,
		"testChangeMerge" : false,
		"anonymousCowardName" : "Anonymous Coward"
	}
};
gerrit_hostpagedata.theme = {
	"backgroundColor" : "#FCFEEF",
	"topMenuColor" : "#d3d3d3",
	"textColor" : "#000000",
	"trimColor" : "#d3d3d3",
	"selectionColor" : "#FFFFCC",
	"changeTableOutdatedColor" : "#F08080",
	"tableOddRowColor" : "transparent",
	"tableEvenRowColor" : "transparent"
};