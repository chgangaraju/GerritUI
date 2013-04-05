
function printChangeIds(responseObject) {
	"use strict";
	var key = "", result = "<table class='table table-bordered table-striped table-hover'>";
	result += "<tr class='error'><td> ID </td><td>PROJECT NAME</td><td>OWNER</td><td>BRANCH</td><td>SUBJECT</td><td>UPDATED</td></tr>";
	for (key in responseObject) {
		if (Object.prototype.hasOwnProperty.call(responseObject, key)) {
			result += "<tr class='success'>" + " <td >  <a onclick='redirectPatch("
					+ responseObject[key]._number + ")'>" + responseObject[key].id + "</a>"
					+ " </td><td> <a onclick='redirectPatch(" + responseObject[key]._number
					+ ")'>" + responseObject[key].subject + "</a>" + " </td><td>"
					+ responseObject[key]["owner"].name + " </td><td>" + responseObject[key].branch
					+ " </td><td>" + responseObject[key].project + " </td><td>"
					+ responseObject[key].updated + "</td></tr>";
		}
	}
	result += "</table";
	document.getElementById("ChangeIds").innerHTML = result;
}

function printProjectList(responseObject) {
	"use strict";
	var result = "<table class='table table-bordered table-striped table-hover'>";
	result += "<tr class='error'><td>PROJECT-NAME</td><td>PROJECT-DESCRIPTION</td></tr>";
	for ( var key in responseObject) {
		result += "<tr class='success'>" + "<td>" + key + "</td><td>";
		var subkeys = responseObjectect.keys(responseObject[key]);
		if (subkeys.length > 0) {
			result += responseObject[key][subkeys[0]];
		}
		result += "</td></tr>";
	}
	result += "</table";
	document.getElementById("Projects1").innerHTML = result;
}

function printProjectDetails(responseObject) {
	"use strict";
	var result = "", key = "";
	result += "<strong>&nbsp; Change ID </strong> <br/> &nbsp;"
			+ responseObject[0].changeid[0].changeId + "<br/><br/>";
	result += "<table class='table'> <tr><td>Project</td><td><strong>"
			+ responseObject[0].project[0].project + "</strong></td></tr>";
	result += "<tr><td>Owner</td><td>" + responseObject[0].owner[0].owner + "</td></tr>";
	result += "<tr><td>Branch</td><td>" + responseObject[0].branch[0].branch
			+ "</td></tr>";
	result += "<tr><td>Topic</td><td>" + "" + "</td></tr>";
	result += "<tr><td>Uploaded</td><td>" + responseObject[0].createdtime.time
			+ "</td></tr>";
	result += "<tr><td>Updated</td><td>" + "" + "</td></tr>";
	result += "<tr><td>Status Merged</td><td>" + "" + "</td></tr></table><br/>";
	result += "<table class='table'> <tr><td><strong>Reviewer</strong></td><td>Verified</td><td>Code Rev.</td><td>IP Clean</td></tr>";
	for (key in responseObject[0].reviewers) {
		result += "<tr align='center'><td>" + responseObject[0].reviewers[key].name
				+ "</td>";
		if (responseObject[0].reviewers[key].hasOwnProperty('Verified')) {
			result += "<td>&nbsp;&nbsp;&nbsp;<img src='tick.gif' height='10px' width='20px' alt='OK'/></td>";
		} else {
			result += "<td></td>";
		}
		if (responseObject[0].reviewers[key].hasOwnProperty('Code-Review')) {
			result += "<td>&nbsp;&nbsp;&nbsp;<img src='tick.gif' height='10px' width='20px' alt='OK'/></td>";
		} else {
			result += "<td></td>";
		}
		if (responseObject[0].reviewers[key].hasOwnProperty('IP-Clean')) {
			result += "<td>&nbsp;&nbsp;&nbsp;<img src='tick.gif' height='20px' width='20px' alt='OK'/></td></tr>";
		} else {
			result += "<td></td></tr>";
		}
	}
	result += "</table>";
	document.getElementById("patchdiv1").innerHTML = result;
}

function printPatchList(responseObject) {
	"use strict";
	var result = "", key = "", key1 = "";
	for (key in responseObject) {
		result += "<div class='patchesList' onclick='redirectSinglePatch("
				+ (parseInt(key)) + ',' + responseObject[key].id[0].id + ")' id='patch"
				+ (parseInt(key) + 1) + "'>";
		result += "<div class='PatchNum' id='patchNum"
				+ (parseInt(key) + 1)
				+ "'>"
				+ (parseInt(key) + 1)
				+ "</div> <div class='PatchImage' id='patchImg"
				+ (parseInt(key) + 1)
				+ "'><br/> <img src='face1.jpg' height='60px' width='60px'> <font size='1'><br/>"
				+ responseObject[key].owner[0].owner + "<br/> "
				+ prettyDate(responseObject[key].createdtime.time) + "</font></div> <div>";
		result += "  Bug : " + responseObject[key].id[0].id + " | Changeid : "
				+ responseObject[key].revisionId.revisionId
				+ "<div class='comment'><i class='icon-comment'></i><b> "
				+ responseObject[key].nbrcomments + " </b>&nbsp;</div><br/>";
		result += " Verification <img src='tick.gif'>"
				+ "&nbsp; Code-Review <i class='icon-ok'></i>"
				+ "&nbsp IP-Clean <img src='info.gif' height='20px' width='20px'><br/>";
		result += "<i class='icon-comment'></i> "
				+ responseObject[key].commitmessage[0].commitMessage + "<br/>";
		result += "<div class='files'>";
		for (key1 in responseObject[key].filesList[0].files) {
			result += "<i class='icon-file'></i>"
					+ responseObject[key].filesList[0].files[key1].fileName + "<br/>";
		}
		result += "</div></div></div>";
	}
	document.getElementById("Patches").innerHTML = result;
}

function navBar(patch) {
	var result = "";
	result += "<div id='navBar'><div id='path' class='span6'>&nbsp;Patches > Patch "
			+ (parseInt(patch) + 1) + " > </div>";
	result += "<div id='next'> Patch " + (parseInt(patch) + 2)
			+ " > </div>&nbsp;</div>";
	document.getElementById("list").innerHTML = result;
}

function printInfo(responseObject, patch) {
	"use strict";
	var result = "";
	result += " <div id='bug'><b><font size='5'> Bug : " + responseObject[patch].id[0].id
			+ "</font></b><div class='comment'><i class='icon-comment'></i>"
			+ responseObject[patch].nbrcomments + " &nbsp;</div></div>";
	result += " ChangeId : " + responseObject[patch].revisionId.revisionId + "<br/>";
	result += "<div><div class='PatchImage'><br/> <img src='face1.jpg' height='60px' width='60px'> <font size='1'><br/>"
			+ responseObject[patch].owner[0].owner
			+ "<br/> "
			+ prettyDate(responseObject[patch].createdtime.time) + "</font></div>";
	result += "<div class='message'> Commit Messaage : <br/>"
			+ responseObject[patch].commitmessage[0].commitMessage + "</div></div>";
	document.getElementById("info").innerHTML = result;
}

function printApprovals(responseObject) {
	"use strict";
	var result = "", key = "";
	result += "<div> <div class='span1'></div><button class='approve btn btn-success' type='button'>Approve</button>"
			+ "<button class='disapprove btn btn-danger' type='button'>Disapprove</button><div class='span1'></div></div>";

	result += "<table class='table'> <tr><td><strong>Reviewer</strong></td><td>Verified</td><td>Code Rev.</td><td>IP Clean</td></tr>";
	for (key in responseObject[0].reviewers) {
		result += "<tr align='center'><td>" + responseObject[0].reviewers[key].name
				+ "</td>";
		if (responseObject[0].reviewers[key].hasOwnProperty('Verified')) {
			result += "<td>&nbsp;&nbsp;&nbsp;<img src='tick.gif' height='10px' width='20px' alt='OK'/></td>";
		} else {
			result += "<td></td>";
		}
		if (responseObject[0].reviewers[key].hasOwnProperty('Code-Review')) {
			result += "<td>&nbsp;&nbsp;&nbsp;<img src='tick.gif' height='10px' width='20px' alt='OK'/></td>";
		} else {
			result += "<td></td>";
		}
		if (responseObject[0].reviewers[key].hasOwnProperty('IP-Clean')) {
			result += "<td>&nbsp;&nbsp;&nbsp;<img src='tick.gif' height='20px' width='20px' alt='OK'/></td></tr>";
		} else {
			result += "<td></td></tr>";
		}
	}
	result += "</table";
	document.getElementById("approval").innerHTML = result;
}

function printFiles(responseObject, patch) {
	"use strict";
	var result = "", key1 = "";
	result += "<div><table class='table'> <tr class='info'><td><strong><i class='icon-file'></i>Files("
			+ responseObject[patch].filesList[0].files.length
			+ ")</strong></td><td>Size</td><td>Side By Side</td><td>Unified</td><td>New Changes</td></tr>";
	for (key1 in responseObject[patch].filesList[0].files) {
		result += "<tr class='success'><td><font color='blue'>"
				+ responseObject[patch].filesList[0].files[key1].fileName + "</font></td>";
		result += "<td> +" + responseObject[patch].filesList[0].files[key1].insertions
				+ " , -" + responseObject[patch].filesList[0].files[key1].deletions
				+ "</td>";
		result += "<td> <i class='icon-zoom-in'></i></td>";
		result += "<td> <i class='icon-zoom-in'></i></td>";
		if (responseObject[patch].filesList[0].files[key1].newChange) {
			result += "<td> Yes </td>";
		} else {
			result += "<td> No </td>";
		}
		result += "</tr>";
	}
	result += "</table></div>";
	document.getElementById("filestable").innerHTML = result;
}

function printComments(responseObject, patch) {
	"use strict";
	var result = "", key = "";
	result += "<table class='table'><tr class='info'><td><i class='icon-comment'></i> Comments("
			+ responseObject[patch].nbrcomments + ")</td></tr></table>";
	result += "Leave a comment<br/>";
	result += "<div><textarea rows='3'></textarea> <button class='btn btn-small' type='button'>Post Comment</button></div>";
	for (key in responseObject[patch].Comments) {
		result += "<div class='commentList row' id='comment"
				+ (parseInt(key) + 1) + "'>";
		result += "<div class='commentImage' id='commentImg"
				+ (parseInt(key) + 1)
				+ "'><br/> <img src='face1.jpg' height='60px' width='60px'> <font size='1'><br/>"
				+ responseObject[patch].owner[0].owner + "<br/> "
				+ prettyDate(responseObject[patch].createdtime.time) + "</font></div>";
		result += " <div> <b>" + responseObject[patch].Comments[key].authorID
				+ " </b> <div class='commentTime'>"
				+ responseObject[patch].Comments[key].writtenOn + " &nbsp;</div><br/>";
		result += "" + responseObject[patch].Comments[key].message;
		result += "</div></div>";
	}
	document.getElementById("comments").innerHTML = result;
}

function change() {
	"use strict";
	var result = "";
	result += "<div id='tab' class='btn-group' data-toggle='buttons-radio'>"
			+ "<a href='#ChangeIds' class='btn active' data-toggle='tab'"
			+ "onclick='javascript:changeIds();'>ChangeIds</a> <a href='#Projects1'"
			+ "	class='btn' data-toggle='tab' onclick='javascript:projectList();'>Projects</a>"
			+ "<a href='#Patches' class='btn' data-toggle='tab'"
			+ "	onclick='javascript:pluginsList();'>Plugins</a>" + "	</div>"
			+ "	<hr>" + "	<div class='tab-content'>"
			+ "<div class='tab-pane active' id='ChangeIds'></div>"
			+ "<div class='tab-pane' id='Projects1'></div>"
			+ "<div class='tab-pane' id='Patches'></div>" + "</div>";
	document.getElementById("gerrit_body").innerHTML = result;
}

function patch() {
	"use strict";
	var result = "";
	result += "<div id='tab' class='btn-group' data-toggle='buttons-radio'>"
			+ "<a href='#Patches' class='btn active' data-toggle='tab'"
			+ "onclick='javascript:patches();'>Patches</a> <a href='#IncludedIn'"
			+ "class='btn' data-toggle='tab' onclick='javascript:projectList();'>Included"
			+ "In</a> <a href='#Dependencies' class='btn' data-toggle='tab'"
			+ "onclick='javascript:pluginsList();'>Dependencies</a> <a"
			+ "href='#Comments' class='btn' data-toggle='tab'"
			+ "onclick='javascript:pluginsList();'>Comments</a>"
			+ "</div><hr><div>" + "<div id='ganga'>"
			+ "<div id='patchdiv' class='span11'>"
			+ "<div class='tab-content'>"
			+ "<div class='tab-pane active ' id='Patches'></div>"
			+ "<div class='tab-pane' id='IncludedIn'></div>"
			+ "<div class='tab-pane' id='Dependencies'></div>"
			+ "<div class='tab-pane' id='Comments'></div>" + "</div></div>"
			+ "<div id='patchdiv1' class='span5'>" + "<hr></div></div></div>";
	document.getElementById("gerrit_body").innerHTML = result;
}

function eachPatch() {
	"use strict";
	var result = "";
	result += "<div id='list' style='height: 30px;'></div>"
			+ "<div id='info_approval' class='row'>" + "	<div id='info'></div>"
			+ "	<div id='approval'></div>" + "</div><hr>"
			+ "<div id='filestable' class='row' style='height: auto;'></div>"
			+ "<div id='comments' ></div>";
	document.getElementById("gerrit_body").innerHTML = result;

}

function editResponse(response, q) {
	"use strict";
	var responseObject = JSON.parse(response);
	switch (q) {
	case "change":
		change();
		printChangeIds(responseObject);
		break;
	case "pList":
		// change();
		printProjectList(responseObject);
		break;
	case "patches":
		patch();
		printProjectDetails(responseObject);
		printPatchList(responseObject);
		break;
	case "singlePatch":
		eachPatch();
		printFiles(responseObject);
		printApprovals(responseObject);
		printInfo(responseObject);
		printComments(responseObject);
		break;

	default:
		break;
	}
}

function editSinglePatchResponse(response, q, patch) {
	var responseObject = JSON.parse(response);
	eachPatch();
	navBar(patch);
	printFiles(responseObject, patch);
	printApprovals(responseObject);
	printInfo(responseObject, patch);
	printComments(responseObject, patch);
}

function callServlet(xmlhttp, q, id) {
	"use strict";
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				editResponse(xmlhttp.responseText, q);
			}
		} else {
			 document.getElementById("gerrit_body").innerHTML = "<font color='blue'><u>Loading Code Review</u></font>";
		}
	};
	xmlhttp.open("GET", "/embed/gerrit?q=" + q, true);
	xmlhttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlhttp.send();
}

function callServletPatch(xmlhttp, q, id, project) {
	"use strict";
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				editResponse(xmlhttp.responseText, q);
			}
		} else {
			 document.getElementById("gerrit_body").innerHTML = "<font color='blue'><u>Loading Code Review</u></font>";
		}
	};
	xmlhttp.open("GET", "/embed/gerrit?q=" + q + "&project=" + project, true);
	xmlhttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlhttp.send();
}

function callSinglePatchServlet(xmlhttp, q, patch, project) {
	"use strict";
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				editSinglePatchResponse(xmlhttp.responseText, q, patch);
			}
		} else {
			 document.getElementById("gerrit_body").innerHTML = "<font color='blue'><u>Loading Code Review</u></font>";
		}
	};
	xmlhttp.open("GET", "/embed/gerrit?q=" + q + "&project=" + project, true);
	xmlhttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlhttp.send();
}

function createXmlHttp() {
	"use strict";
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

function changeIds() {
	"use strict";
	var xmlhttp = createXmlHttp();
	callServlet(xmlhttp, "change", "ChangeIds");
}

function go_now() {
	"use strict";
	javascript: changeIds();
}

function projectList() {
	"use strict";
	var xmlhttp = createXmlHttp();
	callServlet(xmlhttp, "pList", "Projects1");
}

//function pluginsList() {
//	"use strict";
//	var output = "";
//	output += "<table class='table table-bordered table-striped table-hover'>";
//	output += "<tr class='error'><td>PLUGIN-NAME</td><td>VERSION</td><td>STATUS</td></tr>";
//	output += "<tr class='success'>" + " <td >" + "plugin10mins" + " </td><td>"
//			+ "1.0" + " </td><td>" + "" + "</td></tr>";
//	output += "</table>";
//	document.getElementById("Plugins").innerHTML = output;
//}

function redirectPatch(project) {
	"use strict";
	var xmlhttp = createXmlHttp();
	callServletPatch(xmlhttp, "patches", "Patches", project);
}

function redirectSinglePatch(patch, project) {
	"use strict";
	var xmlhttp = createXmlHttp();
	callSinglePatchServlet(xmlhttp, "singlePatch", patch, project);
}

function patches() {
	"use strict";
	var xmlhttp = createXmlHttp();
	callServlet(xmlhttp, "patches", "Patches");
}

function singlePatch() {
	"use strict";
	var xmlhttp = createXmlHttp();
	callServlet(xmlhttp, "singlePatch", "ChangeIds");
}

function prettyDate(date_str) {
	var time_formats = [ [ 60, 'just now', 1 ], // 60
	[ 120, '1 minute ago', '1 minute from now' ], // 60*2
	[ 3600, 'minutes', 60 ], // 60*60, 60
	[ 7200, '1 hour ago', '1 hour from now' ], // 60*60*2
	[ 86400, 'hours', 3600 ], // 60*60*24, 60*60
	[ 172800, 'yesterday', 'tomorrow' ], // 60*60*24*2
	[ 604800, 'days', 86400 ], // 60*60*24*7, 60*60*24
	[ 1209600, 'last week', 'next week' ], // 60*60*24*7*4*2
	[ 2419200, 'weeks', 604800 ], // 60*60*24*7*4, 60*60*24*7
	[ 4838400, 'last month', 'next month' ], // 60*60*24*7*4*2
	[ 29030400, 'months', 2419200 ], // 60*60*24*7*4*12, 60*60*24*7*4
	[ 58060800, 'last year', 'next year' ], // 60*60*24*7*4*12*2
	[ 2903040000, 'years', 29030400 ], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
	[ 5806080000, 'last century', 'next century' ], // 60*60*24*7*4*12*100*2
	[ 58060800000, 'centuries', 2903040000 ] // 60*60*24*7*4*12*100*20,
	// 60*60*24*7*4*12*100
	];
	var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " ")
			.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if (time.substr(time.length - 10, 1) == ".")
		time = time.substr(0, time.length - 10);
	var cur_date = new Date(), given_date = new Date(time);

	var seconds = (cur_date - given_date) / 1000;
	var token = 'ago', list_choice = 1;
	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = 'from now';
		list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++])
		if (seconds < format[0]) {
			if (typeof format[2] == 'string')
				return format[list_choice];
			else
				return Math.floor(seconds / format[2]) + ' ' + format[1] + ' '
						+ token;
		}
	return time;
};