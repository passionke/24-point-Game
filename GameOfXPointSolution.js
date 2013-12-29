
var TwentyFor = function(data, target, path) {
	this.data = data || [];
	this.path = path || "";
	this.target = target || 0;
	this.solution = undefined;
	this.path = "";

	this.combineData = function(d1, d2) {
		return [
		{
			result: d1 + d2,
			path: d1 + " + " + d2
		},
		{
			result: d1 - d2,
			path: d1 + " - " + d2
		},
		{
			result: d1 * d2,
			path: d1 + " * " + d2
		},
		{
			result: d1 / d2,
			path: d1 + " / " + d2
		},
		{
			result: d2 - d1,
			path: d2 + " - " + d1
		},
		{
			result: d2 / d1,
			path: d2 + " / " + d1
		},
		];
	}

	

	this.getSub2Datas = function(list) {
		var sub2list = [];
		for (var i = 0; i < list.length; i++) {
			for (var j = 0; j < i; j++) {
				sub2list.push({
					data: [list[j], list[i]],
					index: [j, i]
				});
			}
		}
		return sub2list;
	}

	this.dataInArray = function(data, list) {
		for (var i = 0 ; i < list.length; i++) {
			if (data == list[i]) {
				return true;
			}
		}
		return false;
	}

	this.getRestList = function (list, index) {
		var restList = [];
		for (var i = 0; i < list.length ; i++ ) {
			if (this.dataInArray(i, index)) {
				continue;
			}else {
				restList.push(list[i]);
			}
		}
		return restList;
	}

	this.findSolution = function(list, path) {
		if (this.solution !== undefined) {
			return;
		}
		if (list.length >= 2) {
			var twoDatas = this.getSub2Datas(list);
			for (var i = 0 ; i < twoDatas.length ; i++) {
				var data = twoDatas[i].data;
				var combins = this.combineData(data[0], data[1]);
				var restList = this.getRestList(list, twoDatas[i].index);
				for (var j = 0 ; j < combins.length; j++) {
					var newList = restList.concat(combins[j].result);
					this.findSolution(newList, path + "|" + combins[j].path);
				}
			}
		}else if (list.length == 1 && list[0] == this.target) {
			this.solution = true;
			this.path = path;
			console.log("aloha")
		}
	}

	this.generateData = function() {
		for (var i = 0 ; i < 4; i++) {
			var d = Math.floor(Math.random() * 13);
			this.data.push(d);
		}
	}
}



var ten24 = new TwentyFor();
ten24.generateData();
ten24.target = 24;
console.log(ten24.data)
ten24.findSolution(ten24.data, "")
console.log(ten24.path)
