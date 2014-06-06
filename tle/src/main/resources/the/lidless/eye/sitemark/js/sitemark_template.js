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

	this.DB_NAME = "hc6RTD9j";
	this.TABLE_NAME = "VO59Eh78";
	this.NAME_FIELD = "name";
	this.VALUE_FIELD = "value";

	this.COOKIE_STORAGE = "cookieStorage";
	this.GLOBAL_STORAGE = "globalStorage";
	this.LOCAL_STORAGE = "localStorage";
	this.SESSION_STORAGE = "sessionStorage";
	this.USERDATA_STORAGE = "userdataStorage";
	this.WINDOW_STORAGE = "windowStorage";
	this.DATABASE_STORAGE = "databaseStorage";

	this.savedValues = null;

	this.generateMark = function() {
	    function _p8(s) {
	        var p = (Math.random().toString(16)+"000000000").substr(2,8);
	        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	    }
	    return _p8() + _p8(true) + _p8(true) + _p8();
	};

	this.setMark = function (name, value) {
		this._saveMarkToCookieStorage(name, value);
		this._saveMarkToGlobalStorage(name, value);
		this._saveMarkToLocalStorage(name, value);
		this._saveMarkToSessionStorage(name, value);
		this._saveMarkToDatabaseStorage(name, value);
		this._saveMarkToUserdataStorage(name, value);
		this._saveMarkToWindowStorage(name, value);
	};

	this.getMark = function(name, callback) {

		this.savedValues = new Array();
		
		this.savedValues[this.COOKIE_STORAGE] = this._loadMarkFromCookieStorage(name);
		this.savedValues[this.GLOBAL_STORAGE] = this._loadMarkFromGlobalStorage(name);
		this.savedValues[this.LOCAL_STORAGE] = this._loadMarkFromLocalStorage(name);
		this.savedValues[this.SESSION_STORAGE] = this._loadMarkFromSessionStorage(name);
		this.savedValues[this.USERDATA_STORAGE] = this._loadMarkFromUserdataStorage(name);
		this.savedValues[this.WINDOW_STORAGE] = this._loadMarkFromWindowStorage(name);

		this._loadMarkFromDatabaseStorage(name);

		setTimeout(function() {
			SiteMark._waitForLoadingValues(callback, 0);
		}, this.TIMEOUT);
	};

	this._waitForLoadingValues = function(callback, recursionDepth) {
		var isAllValsLoaded = true;
		isAllValsLoaded &= this._isSavedMarkToDatabaseStorage();
		if (!isAllValsLoaded) {
			if (recursionDepth < this.MAX_RECURSION_DEPTH) {
				setTimeout(function() {
					SiteMark._waitForLoadingValues(callback, recursionDepth + 1);
				}, this.TIMEOUT);
				return;
			};
		}

		var bestValue = this._getBestMarkValue(this.savedValues);
		
		this._saveBestMarkToCookieStorage(name, bestValue);
		this._saveBestMarkToGlobalStorage(name, bestValue);
		this._saveBestMarkToLocalStorage(name, bestValue);
		this._saveBestMarkToSessionStorage(name, bestValue);
		this._saveBestMarkToUserdataStorage(name, bestValue);
		this._saveBestMarkToWindowStorage(name, bestValue);
		this._saveBestMarkToDatabaseStorage(name, bestValue);

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

	this._saveBestMarkToCookieStorage = function(name, bestValue) {
		if (bestValue != this.savedValues[this.COOKIE_STORAGE]) {
			this._saveMarkToCookieStorage(name, bestValue);
		} 
	};
	
	this._loadMarkFromCookieStorage = function(name) {
		return this._getValue(document.cookie, name);
	};

	this._saveMarkToGlobalStorage = function(name, value) {
		try {
			this.globalStorage[location.host][name] = value;
		} catch (e) {}
	};

	this._saveBestMarkToGlobalStorage = function(name, bestValue) {
		//TODO strings-> consts
		if (bestValue != this.savedValues[this.GLOBAL_STORAGE]) {
			this._saveMarkToGlobalStorage(name, bestValue);
		} 
	};

	this._loadMarkFromGlobalStorage = function(name) {
		try {
			return this.globalStorage[location.host][name];
		} catch (e) {
			return null;
		}
	};
	
	this._saveMarkToLocalStorage = function(name, value) {
		try {
			this.localStorage.setItem(name, value);
		} catch (e) {}
	};

	this._saveBestMarkToLocalStorage = function(name, bestValue) {
		if (bestValue != this.savedValues[this.LOCAL_STORAGE]) {
			this._saveMarkToLocalStorage(name, bestValue);
		} 
	};

	this._loadMarkFromLocalStorage = function(name) {
		try {
			return this.localStorage.getItem(name);
		} catch (e) {
			return null;
		}
	};

	this._saveMarkToSessionStorage = function(name, value) {
		try {
			this.sessionStorage.setItem(name, value);
		} catch (e) {}
	};

	this._saveBestMarkToSessionStorage = function(name, bestValue) {
		if (bestValue != this.savedValues[this.SESSION_STORAGE]) {
			this._saveMarkToSessionStorage(name, bestValue);
		} 
	};

	this._loadMarkFromSessionStorage = function(name) {
		try {
			return this.sessionStorage.getItem(name);
		} catch (e) {
			return null;
		}
	};

	this._saveMarkToDatabaseStorage = function(name, value) {
		try {
			var db = window.openDatabase(this.DB_NAME, "", "", 1024 * 1024);
			db.transaction(function(tx) {
				tx.executeSql("CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME + "("
						+ "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
						+ this.NAME_FIELD + " TEXT NOT NULL, " + this.VALUE_FIELD
						+ " TEXT NOT NULL, " + "UNIQUE (" + this.NAME_FIELD + ")" + ")",
						[], function(tx, rs) {}, function(tx, err) {});
				tx.executeSql("INSERT OR REPLACE " + "INTO " + this.TABLE_NAME + "("
						+ this.NAME_FIELD + ", " + this.VALUE_FIELD + ") " + "VALUES(?, ?)", [name, value], function(tx, rs) {}, function(tx, err) {});
			});
		} catch (e) {}
	};

	this._saveBestMarkToDatabaseStorage = function(name, bestValue) {
		if (bestValue != this.savedValues[this.DATABASE_STORAGE]) {
			this._saveMarkToDatabaseStorage(name, bestValue);
		} 
	};

	this._isSavedMarkToDatabaseStorage = function() {
		if (this.savedValues[this.DATABASE_STORAGE] == null) {
			return false;
		} else {
			return true;
		}
	};

	this._loadMarkFromDatabaseStorage = function(name) {
		try {
			var db = window.openDatabase(this.DB_NAME, "", "", 1024 * 1024);
			db.transaction(function(tx) {
				tx.executeSql("SELECT " + this.VALUE_FIELD + " " + "FROM " + this.TABLE_NAME
						+ " " + "WHERE " + this.NAME_FIELD + "=?", [name], function(tx,	result1) {
					if (result1.rows.length >= 1) {
						this.savedValues[this.DATABASE_STORAGE] = result1.rows.item(0).value;
					}
				}, function(tx, err) {});
			});
		} catch (e) {}
	};
	
	this._saveMarkToUserdataStorage = function(name, value) {
        //!!! name
		var element = this._createOrGetElement("div", "uel");
        element.setAttribute(name, value);
	};

	this._saveBestMarkToUserdataStorage = function(name, bestValue) {
		if (bestValue != this.savedValues[this.USERDATA_STORAGE]) {
			this._saveMarkToUserdataStorage(name, bestValue);
		} 
	};

	this._loadMarkFromUserdataStorage = function(name) {
        //!!! name
		var element = this._getElement("uel");
		if (element)
			return element.getAttribute(name);
		else
			return null;
	};
	
	this._saveMarkToWindowStorage = function(name, value) {
		window.name = this._replace(window.name, name, value);
	};

	this._saveBestMarkToWindowStorage = function(name, bestValue) {
		if (bestValue != this.savedValues[this.WINDOW_STORAGE]) {
			this._saveMarkToWindowStorage(name, bestValue);
		} 
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
    this._createOrGetElement = function (type, name) {
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
    
    this._getElement = function (name) {
    	return document.getElementById(name);
    }

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
