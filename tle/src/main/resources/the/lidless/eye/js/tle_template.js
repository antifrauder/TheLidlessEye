//TODO: реализовать функцию-подобие $.map из jQuery
//var DevMark = {
//	getMark : function() {
//		var ver = 0;
//		var plugins = new Array();
//		for (var i = 0; i < navigator.plugins.length; i++) {
//			var mimeTypes = new Array();
//			for (var j = 0; j < navigator.plugins[i].length; j++) {
//				mimeTypes.push([ navigator.plugins[i][j].type,
//						navigator.plugins[i][j].suffixes,
//						navigator.plugins[i][j].description ].join(","));
//			}
//			plugins.push([ navigator.plugins[i].name,
//					navigator.plugins[i].filename,
//					navigator.plugins[i].description, mimeTypes.join("~") ]
//					.join(":"));
//		}
//
//		return ['' + ver, 
//		        '' + !!window.globalStorage, '' + !!window.localStorage, '' + !!window.sessionStorage,
//				'' + (new Date()).getTimezoneOffset(), navigator.userAgent,
//				[ screen.height, screen.width, screen.colorDepth ].join("x"),
//				plugins.join(";") ].join("$");
//	}
//
//};

var SiteMark = new function() {
	this.MAX_RECURSION_DEPTH = 16;
	this.TIMEOUT = 100;
	
	//!!!
	this.markName = location.hostname + "0003";
	
	try {
		this.globalStorage = window.globalStorage;
	} catch (e) {};
	try {
		this.localStorage = window.localStorage;
	} catch (e) {};
	try {
		this.sessionStorage = window.sessionStorage;
	} catch (e) {};

	this.isDbStorage = window.openDatabase;
	this.savedValues = null;

	//!!!
	this.dbName = "hc6RTD9j",
	this.tableName = "VO59Eh78",
	this.nameField = "name",
	this.valueField = "value",

	this.generateMark = function() {
	    function _p8(s) {
	        var p = (Math.random().toString(16)+"000000000").substr(2,8);
	        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	    }
	    return _p8() + _p8(true) + _p8(true) + _p8();
	};

	this.setMark = function (value) {
		
		//!!!
		this._saveMarkToCookieStorage(this.markName, value);
		
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
		
		this._saveMarkToUserdataStorage(this.markName, value);

		this._saveMarkToWindowStorage(this.markName, value);
	};

	this.getMark = function(callback) {
		this.savedValues = new Array();
		
		this.savedValues["cookieStorage"] = this._loadMarkFromCookieStorage(this.markName);
		
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

		this.savedValues["userdataStorage"] = this._loadMarkFromUserdataStorage(this.markName);

		this.savedValues["windowStorage"] = this._loadMarkFromWindowStorage(this.markName);

		setTimeout(function() {
			SiteMark._waitForLoadingValues(callback, 0);
		}, this.TIMEOUT);
	};

	this._waitForLoadingValues = function(callback, recursionDepth) {
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
		
		if (bestValue != this.savedValues["cookieStorage"]) {
			this._saveMarkToCookieStorage(this.markName, bestValue);
		} 
			
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
		if (bestValue != this.savedValues["userdataStorage"]) {
			this._saveMarkToUserdataStorage(this.markName, bestValue);
		}
		if (bestValue != this.savedValues["windowStorage"]) {
			this._saveMarkToWindowStorage(this.markName, bestValue);
		}
	
		if (typeof callback === "function") {
			callback(bestValue);
		}
	};

	this._getBestMarkValue = function(marks) {
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
	};
	
	this._saveMarkToCookieStorage = function(name, value) {
		document.cookie = name + "=; expires=Mon, 20 Sep 2010 00:00:00 UTC";
		document.cookie = name + "=" + value + "; ${the.lidless.eye.sitemark.cookie.expires_domain_path}";
	};
	
	this._loadMarkFromCookieStorage = function(name) {
		return this._getValue(document.cookie, name);
	};

	this._saveMarkToGlobalStorage = function(name, value) {
		if (this.globalStorage) {
			this.globalStorage[location.host][name] = value;
		}
	};
	
	this._loadMarkFromGlobalStorage = function(name) {
		if (this.globalStorage) {
			return this.globalStorage[location.host][name];
		}
	};
	
	this._saveMarkToLocalStorage = function(name, value) {
		if (this.localStorage) {
			this.localStorage.setItem(name, value);
		}
	};
	
	this._loadMarkFromLocalStorage = function(name) {
		if (this.localStorage) {
			return this.localStorage.getItem(name);
		}
	};
	
	this._saveMarkToSessionStorage = function(name, value) {
		if (this.sessionStorage) {
			this.sessionStorage.setItem(name, value);
		}
	};

	this._loadMarkFromSessionStorage = function(name) {
		if (this.sessionStorage) {
			return this.sessionStorage.getItem(name);
		}
	};
	
	this._saveMarkToDatabaseStorage = function(name, value) {
		if (this.isDbStorage) {
			try {
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
			} catch (e) {}
		}
	};
	
	this._loadMarkFromDatabaseStorage = function(name) {
		if (this.isDbStorage) {
			try {
				var db = window.openDatabase(this.dbName, "", "", 1024 * 1024);
				db.transaction(function(tx) {
					tx.executeSql("SELECT " + this.valueField + " " + "FROM " + this.tableName
							+ " " + "WHERE " + this.nameField + "=?", [name], function(tx,	result1) {
						if (result1.rows.length >= 1) {
							this.savedValues["dbStorage"] = result1.rows.item(0).value;
						}
					}, function(tx, err) {});
				});
			} catch (e) {}
		}
	};
	
	this._saveMarkToUserdataStorage = function(name, value) {
        //!!! name
		var element = this._createElement("div", "uel");
        element.style.behavior = "url(#default#userData)";
        element.setAttribute(name, value);
        element.save(name);
	};
	
	this._loadMarkFromUserdataStorage = function(name) {
        //!!! name
		var element = this._createElement("div", "uel");
        element.style.behavior = "url(#default#userData)";
        element.load(name);
        return element.getAttribute(name);
	};
	
	this._saveMarkToWindowStorage = function(name, value) {
		window.name = this._replace(window.name, name, value);
	};

	this._loadMarkFromWindowStorage = function(name) {
		return this._getValue(window.name, name);
	};
	
	//TODO rename
	this._getValue = function (text, name) {
        var nameAndEqual = name + "=";
        var textItems = text.split(/[;&]/);
        for (var i = 0; i < textItems.length; i++) {
            var textItem = textItems[i];
            while (textItem.charAt(0) === " ") {
            	textItem = textItem.substring(1, textItem.length);
            }
            if (textItem.indexOf(nameAndEqual) === 0) {
                return textItem.substring(nameAndEqual.length, textItem.length);
            }
        }
        return null;
    };
    
    //TODO rename, rewrite
    this._replace = function (str, key, value) {
        if (str.indexOf("&" + key + "=") > -1 || str.indexOf(key + "=") === 0) {
            var idx = str.indexOf("&" + key + "="),
                end, newstr;
            if (idx === -1) {
                idx = str.indexOf(key + "=");
            }
            end = str.indexOf("&", idx + 1);
            if (end !== -1) {
                newstr = str.substr(0, idx) + str.substr(end + (idx ? 0 : 1)) + "&" + key + "=" + value;
            } else {
                newstr = str.substr(0, idx) + "&" + key + "=" + value;
            }
            return newstr;
        } else {
            return str + "&" + key + "=" + value;
        }
    };
    
    //TODO rename
    this._createElement = function (type, name) {
        var element = document.getElementById(name);
        if (!element) {
        	element = document.createElement(type);
        }
        element.style.visibility = "hidden";
        element.style.position = "absolute";
       	element.setAttribute("id", name);
       	document.body.appendChild(element);
        return element;
    };

};

//function f(data) {
//	if (data !== null) {
//		alert(data);
//	}
//};
//
//var Sender = {
//	send : function(params) {
//		var url = "http://localhost:8080/AntiFrodo-0.0.1-SNAPSHOT/jsonp";
//		for ( var i in params) {
//			url = this.addParamToUrl(url, Base64.encode(i), Base64.encode(params[i]));
//		}
//		var s = document.createElement("script");
//		s.async = 1;
//		s.src = url;
//		var e = document.getElementsByTagName("script")[0];
//		e.parentNode.insertBefore(s, e);
//	},
//	
//	addParamToUrl : function(url, param, value) {
//		url += (url.split('?')[1] ? '&' : '?') + param + '=' + value;
//		return url;
//	}
//};
//
//var Base64 = {
//
//	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
//
//	encode : function(input) {
//		var output = "";
//		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
//		var i = 0;
//		input = Base64._utf8_encode(input);
//		while (i < input.length) {
//			chr1 = input.charCodeAt(i++);
//			chr2 = input.charCodeAt(i++);
//			chr3 = input.charCodeAt(i++);
//			enc1 = chr1 >> 2;
//			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
//			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
//			enc4 = chr3 & 63;
//			if (isNaN(chr2)) {
//				enc3 = enc4 = 64;
//			} else if (isNaN(chr3)) {
//				enc4 = 64;
//			}
//			output = output + this._keyStr.charAt(enc1)
//					+ this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
//					+ this._keyStr.charAt(enc4);
//		}
//		return output;
//	},
//
//	_utf8_encode : function(string) {
//		string = string.replace(/\r\n/g, "\n");
//		var utftext = "";
//		for (var n = 0; n < string.length; n++) {
//			var c = string.charCodeAt(n);
//			if (c < 128) {
//				utftext += String.fromCharCode(c);
//			} else if ((c > 127) && (c < 2048)) {
//				utftext += String.fromCharCode((c >> 6) | 192);
//				utftext += String.fromCharCode((c & 63) | 128);
//			} else {
//				utftext += String.fromCharCode((c >> 12) | 224);
//				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
//				utftext += String.fromCharCode((c & 63) | 128);
//			}
//		}
//		return utftext;
//	}
//
//};
//
//var MarkSender = {
//	sendMark : function(cId) {
//		SiteMark.getMark(function(siteMark) {
//			if (siteMark === null) {
//				siteMark = SiteMark.generateMark();
//				SiteMark.setMark(siteMark);
//			}
//			var marks = new Array();
//			marks["c_id"] = cId;
//			marks["d_m"] = DevMark.getMark();
//			marks["s_m"] = siteMark;
//			Sender.send(marks);
//		});
//	}
//
//};
