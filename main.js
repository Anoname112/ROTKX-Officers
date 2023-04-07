window.onload = function () {
	document.getElementById('filter').focus();
	inputChanged();
	
	/* FIND BIGGEST TOTAL STATS
	var biggestTotal = 0;
	var biggestName = '-';
	var haveDuplicate = false;
	for (var i = 0; i < officerarray.length; i++) {
		var total = parseInt(officerarray[i]['ldr']) + parseInt(officerarray[i]['war']) +
			parseInt(officerarray[i]['int']) + parseInt(officerarray[i]['pol']) +
			parseInt(officerarray[i]['chr']);
		
		if (total == biggestTotal) haveDuplicate = true;
		else if (total > biggestTotal) {
			biggestTotal = total;
			biggestName = officerarray[i]['name'];
			haveDuplicate = false;
		}
	}
	
	var alertString = biggestName + ' with ' + biggestTotal;
	if (haveDuplicate) alertString += ', but have duplicate.';
	else alertString += ', no duplicate.';
	alert(alertString);
	*/
}

function isNumeric (value) {
	return /^\d+$/.test(value);
}

function inputChanged (sender) {
	var sort = document.getElementById('sort').value;
	var order = document.getElementById('order').value;
	var filter = document.getElementById('filter').value;
	var filtertolower = filter.toLowerCase();
	
	/*
	// Auto ordering
	if (sender == 'sort') {
		if (sort == 'name') document.getElementById('order').value = 'asc';
		else document.getElementById('order').value = 'dsc';
		
		inputChanged();
		return;
	}
	*/
	
	// Create filtered array
	var filteredarray = new Array();
	for (var i = 0; i < officerarray.length; i++) {
		var nametolower = officerarray[i]['name'].toLowerCase();
		if (nametolower.indexOf(filtertolower) >= 0) {
			filteredarray.push({
				"name": officerarray[i]['name'],
				"ldr": officerarray[i]['ldr'],
				"war": officerarray[i]['war'],
				"int": officerarray[i]['int'],
				"pol": officerarray[i]['pol'],
				"chr": officerarray[i]['chr'],
				"total": officerarray[i]['total'],
				"nameunder": officerarray[i]['name'].split(' ').join('_')
			});
		}
	}
	
	// Sort filtered array
	for (var i = 0; i < filteredarray.length; i++) {
		for (var j = i + 1; j < filteredarray.length; j++) {
			var compareI = isNumeric(filteredarray[i][sort]) ? parseInt(filteredarray[i][sort]) : filteredarray[i][sort];
			var compareJ = isNumeric(filteredarray[j][sort]) ? parseInt(filteredarray[j][sort]) : filteredarray[j][sort];
			
			if (order == 'asc') {
				if (compareI > compareJ) {
					var temp = filteredarray[i];
					filteredarray[i] = filteredarray[j];
					filteredarray[j] = temp;
				}
			}
			else if (order == 'dsc') {
				if (compareI < compareJ) {
					var temp = filteredarray[i];
					filteredarray[i] = filteredarray[j];
					filteredarray[j] = temp;
				}
			}
		}
	}
	
	var output = '<table class="data"><tr><th>Name</th><th>LDR</th><th>WAR</th><th>INT</th><th>POL</th><th>CHR</th><th>Total</th></tr>';
	for (var i = 0; i < filteredarray.length; i++) {
		output += '<tr class="officer"><td>' + filteredarray[i]['name'] +
			'</th><td class="number">' + filteredarray[i]['ldr'] +
			'</td><td class="number">' + filteredarray[i]['war'] +
			'</td><td class="number">' + filteredarray[i]['int'] +
			'</td><td class="number">' + filteredarray[i]['pol'] +
			'</td><td class="number">' + filteredarray[i]['chr'] +
			'</td><td class="number">' + filteredarray[i]['total'] + 
			'</td><td class="portrait"><div><img src="portraits/' + filteredarray[i]['nameunder'] + '.jpg" alt="' + filteredarray[i]['name'] + '"></div>&nbsp;' +
			'</td></tr>';
	}
	output += '</table>';
	
	document.getElementById('output').innerHTML = output;
}