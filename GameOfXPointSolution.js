var logger = require('tracer').dailyfile({root:'d:/logs'});

var TwentyFour = function(data) {
	this.data = data || [];
	this.path = "";
	this.target = 24
	this.solution = undefined;
	this.operator = ['+', '-', '*', '/'];

	var expressionData = function(value, expression) {
		this.value = value || 0;
		this.expression = expression || "";

		this.getValue = function() {
			return this.value;
		}

		this.getExpression = function() {
			return this.expression;
		}

		this.setValue = function(value) {
			this.value = value;
		}

		this.setExpression = function(expression) {
			this.expression = expression + '';
		}

		this.toString = function() {
			return this.value;
		}
	}

	this.getBaseOperation = function(num1, num2, operation) {
		var result = undefined;
		switch(operation) {
			case '+': 
				result = num1 + num2;
				break;
			case '-':
				if (num1 > num2) {
					result = num1 - num2;
				}
				break;
			case '*':
				result = num1 * num2;
				break;
			case '/':
				var tmp = num1 / num2;
				if ((tmp | 0) == tmp) {
					result = tmp;
				}
				break;
		}
		return result;
	}

	this.getArithOpRst = function(expsData1, expsData2) {
		var opRst = [];
		var num1 = expsData1.getValue();
		var expression1 = expsData1.getExpression();
		var num2 = expsData2.getValue();
		var expression2 = expsData2.getExpression();
		for (var i = 0; i < this.operator.length ; i++) {
			var expsData = new expressionData();
			var opt = this.operator[i];
			var value = this.getBaseOperation(num1, num2, opt);
			if (value !== undefined) {
				expsData.setValue(value);
				expsData.setExpression("(" + expression1 + " " + opt + " " + expression2 + ")");
				opRst.push(expsData);
			}
		}
		return opRst;
	}

	

	this.getSubDataList = function(list) {
		var sub2list = [];
		for (var i = 0; i < list.length; i++) {
			for (var j = 0; j < i; j++) {
				sub2list.push(
					[i, j]
				);
			}
		}
		return sub2list;
	}

	this.getRestList = function (list, index) {
		var dataInArray = function(data, array) {
			for (var i = 0 ; i < array.length; i++) {
				if (data == array[i]) {
					return true;
				}
			}
			return false;
		}
		var restList = [];
		for (var i = 0; i < list.length ; i++ ) {
			if (dataInArray(i, index)) {
				continue;
			}else {
				restList.push(list[i]);
			}
		}
		return restList;
	}

	this.findSolution = function(list) {
		if (this.solution !== undefined) {
			return;
		}
		if (list.length >= 2) {
			var subDataList = this.getSubDataList(list);
			for (var i = 0 ; i < subDataList.length ; i++) {
				var ind = subDataList[i];
				var expsData1 = list[ind[0]];
				var expsData2 = list[ind[1]];
				var arithOpRst = this.getArithOpRst(expsData1, expsData2);
				
				for (var j = 0 ; j < arithOpRst.length; j++) {
					var restList = this.getRestList(list, ind);
					var newList = restList.concat(arithOpRst[j]);
					this.findSolution(newList);
				}
			}
		}else if (list.length == 1 && list[0].getValue() == this.target) {
			this.solution = true;
			this.path = list[0].getExpression() + " = " + this.target;
			logger.log("aloha")
		}
	}

	this.generateData = function() {
		var data = [];
		for (var i = 0 ; i < 4; i++) {
			var d = Math.floor(Math.random() * 13);
			var expsData = new expressionData();
			expsData.setValue(d);
			expsData.setExpression(d);
			data.push(expsData);
		}
		
		return data;
	}
}



var twentyfour = new TwentyFour();
var data = twentyfour.generateData();
logger.log(data)
twentyfour.findSolution(data)
logger.log(twentyfour.path)
