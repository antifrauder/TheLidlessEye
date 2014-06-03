//TODO: реализовать функцию-подобие $.map из jQuery
var DevMark = {
	getMark : function() {
		var plugins = new Array();
		for (var i = 0; i < navigator.plugins.length; i++) {
			var mimeTypes = new Array();
			for (var j = 0; j < navigator.plugins[i].length; j++) {
				mimeTypes.push([ navigator.plugins[i][j].type,
						navigator.plugins[i][j].suffixes,
						navigator.plugins[i][j].description ].join(","));
			}
			plugins.push([ navigator.plugins[i].name,
					navigator.plugins[i].filename,
					navigator.plugins[i].description, mimeTypes.join("~") ]
					.join(":"));
		}

		return [ '' + !!window.globalStorage, '' + !!window.localStorage,
				'' + !!window.sessionStorage,
				'' + (new Date()).getTimezoneOffset(), navigator.userAgent,
				[ screen.height, screen.width, screen.colorDepth ].join("x"),
				plugins.join(";") ].join("$");
	}

};


var SiteMark = {
	MAX_RECURSION_DEPTH : 16,
	TIMEOUT : 100,
	markName : location.hostname + "0002",
	globalStorage : window.globalStorage,
	localStorage : window.localStorage,
	sessionStorage : window.sessionStorage,
	isDbStorage : window.openDatabase,
	savedValues : null,
	dbName : "hc6RTD9j",
	tableName : "VO59Eh78",
	nameField : "name",
	valueField : "value",

	generateMark : function() {
	    function _p8(s) {
	        var p = (Math.random().toString(16)+"000000000").substr(2,8);
	        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	    }
	    return _p8() + _p8(true) + _p8(true) + _p8();
	},

	setMark : function (value) {
		if (this.globalStorage) {
			this._saveMarkToGlobalStorage(this.markName, value);
		}
		if (this.localStorage) {
			this._saveMarkToLocalStorage(this.markName, value);
		}
		if (this.sessionStorage) {
			this._saveMarkToSessionStorage(this.markName, value);
		}
		if (this.isDbStorage) {
			this._saveMarkToDatabaseStorage(this.markName, value);
		}
	},

	getMark : function(callback) {
		this.savedValues = new Array();
		if (this.globalStorage) {
			this.savedValues["globalStorage"] = this._loadMarkFromGlobalStorage(this.markName);
		}
		if (this.localStorage) {
			this.savedValues["localStorage"] = this._loadMarkFromLocalStorage(this.markName);
		}
		if (this.sessionStorage) {
			this.savedValues["sessionStorage"] = this._loadMarkFromSessionStorage(this.markName);
		}
		if (this.isDbStorage) {
			this._loadMarkFromDatabaseStorage(this.markName);
		}
	
		setTimeout(function() {
			SiteMark._waitForLoadingValues(callback, 0);
		}, this.TIMEOUT);
	},

	_waitForLoadingValues : function(callback, recursionDepth) {
		var isAllValsLoaded = true;
		if (this.isDbStorage) {
			if (this.savedValues["dbStorage"] == null) {
				isAllValsLoaded = false;
			}
		}
		if (!isAllValsLoaded) {
			if (recursionDepth < this.MAX_RECURSION_DEPTH) {
				setTimeout(function() {
					SiteMark._waitForLoadingValues(callback, recursionDepth + 1);
				}, this.TIMEOUT);
				return;
			};
		}
		var bestValue = this._getBestMarkValue(this.savedValues);
		if (this.globalStorage) {
			if (bestValue != this.savedValues["globalStorage"]) {
				this._saveMarkToGlobalStorage(this.markName, bestValue);
			}
		}
		if (this.localStorage) {
			if (bestValue != this.savedValues["localStorage"]) {
				this._saveMarkToLocalStorage(this.markName, bestValue);
			}
		}
		if (this.sessionStorage) {
			if (bestValue != this.savedValues["sessionStorage"]) {
				this._saveMarkToSessionStorage(this.markName, bestValue);
			}
		}
		if (this.isDbStorage) {
			if (bestValue != this.savedValues["dbStorage"]) {
				this._saveMarkToDatabaseStorage(this.markName, bestValue);
			}
		}
	
		if (typeof callback === "function") {
			callback(bestValue);
		}
	},

	_getBestMarkValue : function(marks) {
		var candidates = new Array();
		for (var i in marks) {
			if (marks[i] && marks[i] !== null && marks[i] !== undefined) {
				candidates[marks[i]] = (candidates[marks[i]] === undefined) ? 1
						: candidates[marks[i]] + 1;
			}
		}
		var maxCount = 0;
		var bestMarkValue = null;
		for ( var i in candidates) {
			if (candidates[i] > maxCount) {
				maxCount = candidates[i];
				bestMarkValue = i;
			}
		}
		return bestMarkValue;
	},
	
	_saveMarkToGlobalStorage : function(name, value) {
		if (this.globalStorage) {
			this.globalStorage[location.host][name] = value;
		}
	},
	
	_loadMarkFromGlobalStorage : function(name) {
		if (this.globalStorage) {
			return this.globalStorage[location.host][name];
		}
	},
	
	_saveMarkToLocalStorage : function(name, value) {
		if (this.localStorage) {
			this.localStorage.setItem(name, value);
		}
	},
	
	_loadMarkFromLocalStorage : function(name) {
		if (this.localStorage) {
			return this.localStorage.getItem(name);
		}
	},
	
	_saveMarkToSessionStorage : function(name, value) {
		if (this.sessionStorage) {
			this.sessionStorage.setItem(name, value);
		}
	},

	_loadMarkFromSessionStorage : function(name) {
		if (this.sessionStorage) {
			return this.sessionStorage.getItem(name);
		}
	},
	
	_saveMarkToDatabaseStorage : function(name, value) {
		if (this.isDbStorage) {
			var db = window.openDatabase(this.dbName, "", "", 1024 * 1024);
			db.transaction(function(tx) {
				tx.executeSql("CREATE TABLE IF NOT EXISTS " + this.tableName + "("
						+ "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
						+ this.nameField + " TEXT NOT NULL, " + this.valueField
						+ " TEXT NOT NULL, " + "UNIQUE (" + this.nameField + ")" + ")",
						[], function(tx, rs) {}, function(tx, err) {});
				tx.executeSql("INSERT OR REPLACE " + "INTO " + this.tableName + "("
						+ this.nameField + ", " + this.valueField + ") " + "VALUES(?, ?)", [name, value], function(tx, rs) {}, function(tx, err) {});
			});
		}
	},
	
	_loadMarkFromDatabaseStorage : function(name) {
		if (this.isDbStorage) {
			var db = window.openDatabase(this.dbName, "", "", 1024 * 1024);
			db.transaction(function(tx) {
				tx.executeSql("SELECT " + this.valueField + " " + "FROM " + this.tableName
						+ " " + "WHERE " + this.nameField + "=?", [name], function(tx,	result1) {
					if (result1.rows.length >= 1) {
						this.savedValues["dbStorage"] = result1.rows.item(0).value;
					}
				}, function(tx, err) {});
			});
		}
	}
	
};

function f(data) {
	if (data !== null) {
		alert(data);
	}
};

var Sender = {
	send : function(params) {
		var url = "http://localhost:8080/AntiFrodo-0.0.1-SNAPSHOT/jsonp";
		for ( var i in params) {
			url = this.addParamToUrl(url, Base64.encode(i), Base64.encode(params[i]));
		}
		var s = document.createElement("script");
		s.async = 1;
		s.src = url;
		var e = document.getElementsByTagName("script")[0];
		e.parentNode.insertBefore(s, e);
	},
	
	addParamToUrl : function(url, param, value) {
		url += (url.split('?')[1] ? '&' : '?') + param + '=' + value;
		return url;
	}
};

var Base64 = {

	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	encode : function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + this._keyStr.charAt(enc1)
					+ this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
					+ this._keyStr.charAt(enc4);
		}
		return output;
	},

	_utf8_encode : function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

};

var MarkSender = {
	sendMark : function(cId) {
		SiteMark.getMark(function(siteMark) {
			if (siteMark === null) {
				siteMark = SiteMark.generateMark();
				SiteMark.setMark(siteMark);
			}
			var marks = new Array();
			marks["c_id"] = cId;
			marks["d_m"] = DevMark.getMark();
			marks["s_m"] = siteMark;
			Sender.send(marks);
		});
	}

};
