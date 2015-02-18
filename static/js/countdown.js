(function(window) {

	'use strict';

	
	function define_gbcountdown() {
		var GBCountdown = {};
		GBCountdown.end = new Date("03/08/2015 22:00:00");
		GBCountdown._second = 1000;
		GBCountdown._minute = GBCountdown._second * 60;
		GBCountdown._hour = GBCountdown._minute * 60;
		GBCountdown._day = GBCountdown._hour * 24;

		//let's get the ref to the element and use it later
		var element = document.getElementById("gbCountdown")

		GBCountdown.runCountdown = function() {
			this.timer = setInterval(this.updateRemaining.bind(this), 1000);
		}

		GBCountdown.fromDistance = function(distance, firstInterval, secondInterval) {
			return secondInterval? Math.floor((distance % firstInterval) / secondInterval) : Math.floor(distance / firstInterval)
		}

		GBCountdown.stopUpdating = function() {
			clearInterval(this.timer);
		}


		GBCountdown.postDeadline = function() {
			//comment this line to get rid of the alert
			window.alert('DEADLINE PASSED! hint: tweak countdown.js to get rid of this alert');
		}

		GBCountdown.updateRemaining = function() {

			var now = new Date();
			var distance = this.end - now;

			if (distance < 0) {
				this.stopUpdating();
				setInterval(this.postDeadline, 1000);
				element.innerHTML = "DEADLINE PASSED!";
				return;
			}

			var days = this.fromDistance(distance, this._day);
			var hours = this.fromDistance(distance, this._day, this._hour);
			var minutes = this.fromDistance(distance, this._hour, this._minute);
			var seconds = this.fromDistance(distance, this._minute, this._second);

			element.innerHTML = "Deadline: " + days + "days ";
			element.innerHTML += hours + "hrs ";
			element.innerHTML += minutes + "mins ";
			element.innerHTML += seconds + "secs";
		}

		return GBCountdown;
	}

	if (typeof(GBCountdown) === "undefined") {
		window.GBCountdown = define_gbcountdown();
	} else {
		console.log("GBCountdown already defined.");
	}

	GBCountdown.runCountdown();

})(window);
