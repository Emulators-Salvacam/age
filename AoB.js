var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var co = co || {}
if(!co.doubleduck) co.doubleduck = {}
co.doubleduck.BaseAssets = $hxClasses["co.doubleduck.BaseAssets"] = function() {
};
co.doubleduck.BaseAssets.__name__ = ["co","doubleduck","BaseAssets"];
co.doubleduck.BaseAssets._localizedAssets = null;
co.doubleduck.BaseAssets.loader = function() {
	if(co.doubleduck.BaseAssets._loader == null) {
		co.doubleduck.BaseAssets._loader = new createjs.LoadQueue(true);
		co.doubleduck.BaseAssets._loader.installPlugin(createjs.LoadQueue.SOUND);
		co.doubleduck.BaseAssets._loader.onFileLoad = co.doubleduck.BaseAssets.handleFileLoaded;
		co.doubleduck.BaseAssets._loader.onError = co.doubleduck.BaseAssets.handleLoadError;
		co.doubleduck.BaseAssets._loader.setMaxConnections(10);
	}
	return co.doubleduck.BaseAssets._loader;
}
co.doubleduck.BaseAssets.loadAndCall = function(uri,callbackFunc) {
	co.doubleduck.BaseAssets.loader().loadFile(uri);
	co.doubleduck.BaseAssets._loadCallbacks[uri] = callbackFunc;
}
co.doubleduck.BaseAssets.finishLoading = function(manifest,sounds) {
	if(co.doubleduck.SoundManager.available) {
		var _g1 = 0, _g = sounds.length;
		while(_g1 < _g) {
			var currSound = _g1++;
			manifest.push(sounds[currSound] + co.doubleduck.SoundManager.EXTENSION);
			co.doubleduck.SoundManager.initSound(sounds[currSound]);
		}
	}
	if(co.doubleduck.BaseAssets._useLocalStorage) co.doubleduck.BaseAssets.loadFromLocalStorage(manifest);
	if(manifest.length == 0) {
		if(co.doubleduck.BaseAssets.onLoadAll != null) co.doubleduck.BaseAssets.onLoadAll();
	}
	if(co.doubleduck.BaseGame.isLocalized && co.doubleduck.BaseAssets._localizedAssets != null) {
		var _g1 = 0, _g = manifest.length;
		while(_g1 < _g) {
			var itemIndex = _g1++;
			var currItem = manifest[itemIndex];
			currItem = co.doubleduck.BaseAssets.getLocalisedImage(currItem);
			manifest[itemIndex] = currItem;
		}
	}
	co.doubleduck.BaseAssets.loader().onProgress = co.doubleduck.BaseAssets.handleProgress;
	co.doubleduck.BaseAssets.loader().onFileLoad = co.doubleduck.BaseAssets.manifestFileLoad;
	co.doubleduck.BaseAssets.loader().loadManifest(manifest);
	co.doubleduck.BaseAssets.loader().load();
}
co.doubleduck.BaseAssets.loadAll = function(manifest,sounds) {
	manifest[manifest.length] = "images/duckling/orientation_error_port.png";
	manifest[manifest.length] = "images/duckling/orientation_error_land.png";
	manifest[manifest.length] = "images/duckling/page_marker.png";
}
co.doubleduck.BaseAssets.setLocalizedAssets = function(assets) {
	co.doubleduck.BaseAssets._localizedAssets = assets;
}
co.doubleduck.BaseAssets.audioLoaded = function(event) {
	co.doubleduck.BaseAssets._cacheData[event.item.src] = event;
}
co.doubleduck.BaseAssets.manifestFileLoad = function(event) {
	if(co.doubleduck.BaseAssets._useLocalStorage && event != null) {
		var utils = new ddjsutils();
		try {
			var fileName = event.item.src;
			if(HxOverrides.substr(fileName,fileName.length - 3,null) == "jpg") return;
			co.doubleduck.BasePersistence.setValue(event.item.src,utils.getBase64Image(event.result));
		} catch( err ) {
		}
	}
}
co.doubleduck.BaseAssets.loadFromLocalStorage = function(manifest) {
	var entriesToRemove = new Array();
	var _g1 = 0, _g = manifest.length;
	while(_g1 < _g) {
		var i = _g1++;
		var entry = manifest[i];
		var value = co.doubleduck.BasePersistence.getValue(entry);
		if(value != null) {
			var bmp = new createjs.Bitmap("data:image/png;base64," + value);
			co.doubleduck.BaseAssets._cacheData[entry] = bmp.image;
			entriesToRemove.push(manifest[i]);
		}
	}
	var _g1 = 0, _g = entriesToRemove.length;
	while(_g1 < _g) {
		var j = _g1++;
		HxOverrides.remove(manifest,entriesToRemove[j]);
	}
}
co.doubleduck.BaseAssets.handleProgress = function(event) {
	co.doubleduck.BaseAssets.loaded = event.loaded;
	if(event.loaded == event.total) {
		co.doubleduck.BaseAssets.loader().onProgress = null;
		co.doubleduck.BaseAssets.onLoadAll();
	}
}
co.doubleduck.BaseAssets.handleLoadError = function(event) {
}
co.doubleduck.BaseAssets.handleFileLoaded = function(event) {
	if(event != null) {
		co.doubleduck.BaseAssets._cacheData[event.item.src] = event.result;
		var callbackFunc = Reflect.field(co.doubleduck.BaseAssets._loadCallbacks,event.item.src);
		if(callbackFunc != null) callbackFunc();
	}
}
co.doubleduck.BaseAssets.getAsset = function(uri) {
	var cache = Reflect.field(co.doubleduck.BaseAssets._cacheData,uri);
	if(cache == null) {
		if(co.doubleduck.BaseAssets.loader().getResult(uri) != null) {
			cache = co.doubleduck.BaseAssets.loader().getResult(uri);
			co.doubleduck.BaseAssets._cacheData[uri] = cache;
		}
	}
	return cache;
}
co.doubleduck.BaseAssets.getLocalisedImage = function(image) {
	var currItem = image;
	if(co.doubleduck.BaseAssets._localizedAssets != null && Lambda.indexOf(co.doubleduck.BaseAssets._localizedAssets,currItem) != -1) {
		var delim = ".png";
		var delimIndex = currItem.indexOf(delim);
		var localisedItem = HxOverrides.substr(currItem,0,delimIndex);
		localisedItem += "-" + co.doubleduck.BaseGame.activeLocale + ".png";
		return localisedItem;
	}
	return currItem;
}
co.doubleduck.BaseAssets.getRawImage = function(uri) {
	uri = co.doubleduck.BaseAssets.getLocalisedImage(uri);
	var cache = co.doubleduck.BaseAssets.getAsset(uri);
	if(cache == null) {
		var bmp = new createjs.Bitmap(uri);
		co.doubleduck.BaseAssets._cacheData[uri] = bmp.image;
		cache = bmp.image;
		null;
	}
	return cache;
}
co.doubleduck.BaseAssets.getImage = function(uri,mouseEnabled) {
	if(mouseEnabled == null) mouseEnabled = false;
	var result = new createjs.Bitmap(co.doubleduck.BaseAssets.getRawImage(uri));
	result.mouseEnabled = mouseEnabled;
	return result;
}
co.doubleduck.BaseAssets.prototype = {
	__class__: co.doubleduck.BaseAssets
}
co.doubleduck.Assets = $hxClasses["co.doubleduck.Assets"] = function() {
	co.doubleduck.BaseAssets.call(this);
};
co.doubleduck.Assets.__name__ = ["co","doubleduck","Assets"];
co.doubleduck.Assets.loadAll = function() {
	var manifest = new Array();
	var sounds = new Array();
	co.doubleduck.BaseAssets.loadAll(manifest,sounds);
	var localisedAssets = [];
	sounds.push("sound/MenuMusic");
	sounds.push("sound/click");
	sounds.push("sound/EnemyDefeat1");
	sounds.push("sound/EnemyDefeat2");
	sounds.push("sound/LevelComplete");
	sounds.push("sound/LevelFail");
	sounds.push("sound/spellBoost");
	sounds.push("sound/spellFire");
	sounds.push("sound/spellFreeze");
	sounds.push("sound/star1");
	sounds.push("sound/star2");
	sounds.push("sound/star3");
	sounds.push("sound/placeTower");
	sounds.push("sound/waveStart");
	sounds.push("sound/baseHit");
	sounds.push("sound/ReceiveGold");
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		manifest.push("images/general/font_small/" + i + ".png");
	}
	manifest.push("images/general/font_small/comma.png");
	manifest.push("images/general/font_small/slash.png");
	manifest.push("images/session/bg.png");
	manifest.push("images/session/enemies/soldier.png");
	manifest.push("images/session/enemies/armed_soldier.png");
	manifest.push("images/session/enemies/armed_cavalry.png");
	manifest.push("images/session/enemies/cavalry.png");
	manifest.push("images/session/enemies/flying.png");
	manifest.push("images/session/enemies/armed_flying.png");
	manifest.push("images/session/enemies/hp_bar_red.png");
	manifest.push("images/session/enemies/hp_bar_green.png");
	manifest.push("images/session/magic/fire.png");
	manifest.push("images/session/magic/slow.png");
	manifest.push("images/session/tiles/road.png");
	manifest.push("images/session/ui/menu_circle.png");
	manifest.push("images/session/slot.png");
	manifest.push("images/session/ui/btn_ok.png");
	manifest.push("images/session/ui/btn_sell.png");
	manifest.push("images/session/ui/btn_upgrade.png");
	manifest.push("images/session/ui/btn_locked.png");
	manifest.push("images/session/tiles/base.png");
	manifest.push("images/session/magic/haze.png");
	manifest.push("images/session/end_game.png");
	localisedAssets.push("images/session/end_game.png");
	var _g = 0, _g1 = Type.getEnumConstructs(co.doubleduck.actors.TowerType);
	while(_g < _g1.length) {
		var tower = _g1[_g];
		++_g;
		var towerString = tower.toLowerCase();
		manifest.push("images/session/ui/towers/" + towerString + "/0.png");
		manifest.push("images/session/ui/towers/" + towerString + "/1.png");
		manifest.push("images/session/ui/towers/" + towerString + "/2.png");
		manifest.push("images/session/tiles/towers/" + towerString + ".png");
		manifest.push("images/session/projectiles/" + towerString + ".png");
		manifest.push("images/session/ui/description/towers/" + towerString + ".png");
		manifest.push("images/session/ui/description/towers/" + towerString + "1.png");
		manifest.push("images/session/ui/description/towers/" + towerString + "2.png");
		localisedAssets = localisedAssets.concat(["images/session/ui/description/towers/" + towerString + ".png","images/session/ui/description/towers/" + towerString + "1.png","images/session/ui/description/towers/" + towerString + "2.png"]);
		if(towerString == "cannon") {
			var _g2 = 1;
			while(_g2 < 4) {
				var i = _g2++;
				manifest.push("images/session/projectiles/" + towerString + i + ".png");
			}
		} else manifest.push("images/session/projectiles/" + towerString + ".png");
	}
	var _g = 1;
	while(_g < 7) {
		var i = _g++;
		manifest.push("images/session/tiles/debris" + i + ".png");
	}
	manifest.push("images/session/ui/description/magic/fire.png");
	manifest.push("images/session/ui/description/magic/slow.png");
	manifest.push("images/session/ui/description/magic/wardrum.png");
	localisedAssets = localisedAssets.concat(["images/session/ui/description/magic/fire.png","images/session/ui/description/magic/slow.png","images/session/ui/description/magic/wardrum.png"]);
	manifest.push("images/session/ui/magic/fire_button.png");
	manifest.push("images/session/ui/magic/slow_button.png");
	manifest.push("images/session/ui/magic/wardrum_button.png");
	manifest.push("images/session/ui/magic/magic_button.png");
	manifest.push("images/session/ui/price_tag.png");
	manifest.push("images/session/ui/radius.png");
	manifest.push("images/session/ui/spell_menu.png");
	var unlocks = ["blowdart","cannon","fire","witch","slow","wardrum"];
	var _g = 0;
	while(_g < unlocks.length) {
		var unlock = unlocks[_g];
		++_g;
		manifest.push("images/session/ui/unlocked/unlocked_" + unlock + ".png");
		localisedAssets.push("images/session/ui/unlocked/unlocked_" + unlock + ".png");
	}
	manifest.push("images/session/magic/haze.png");
	manifest.push("images/session/magic/fire.png");
	manifest.push("images/session/magic/wardrum.png");
	manifest.push("images/session/magic/slow.png");
	manifest.push("images/session/projectiles/explode.png");
	manifest.push("images/session/projectiles/magic_splash.png");
	manifest.push("images/session/magic/fire_ripple.png");
	manifest.push("images/session/magic/wardrum_ripple.png");
	manifest.push("images/session/magic/slow_ripple.png");
	manifest.push("images/session/ui/hud/btn_menu.png");
	manifest.push("images/session/ui/hud/btn_pause.png");
	manifest.push("images/session/ui/hud/btn_play.png");
	manifest.push("images/session/ui/hud/btn_restart.png");
	manifest.push("images/session/ui/hud/pause_bg.png");
	manifest.push("images/session/ui/hud/score_bg.png");
	manifest.push("images/session/ui/hud/wavestart.png");
	manifest.push("images/session/win_bg.png");
	manifest.push("images/session/lose_bg.png");
	manifest.push("images/session/ui/description/description_box.png");
	manifest.push("images/session/ui/hud/wave_dir.png");
	manifest.push("images/session/ui/hud/wave_icon.png");
	manifest.push("images/session/ui/hud/wave_timer1.png");
	manifest.push("images/session/ui/hud/wave_timer2.png");
	manifest.push("images/session/ui/hud/wave_timer3.png");
	localisedAssets = localisedAssets.concat(["images/session/win_bg.png","images/session/lose_bg.png","images/session/ui/hud/pause_bg.png","images/session/ui/hud/wave_timer1.png"]);
	manifest.push("images/session/star.png");
	manifest.push("images/menu/bg.png");
	manifest.push("images/menu/btn_lvl.png");
	manifest.push("images/menu/btn_arrow_r.png");
	manifest.push("images/menu/btn_help.png");
	manifest.push("images/menu/btn_sound.png");
	manifest.push("images/menu/help/bg.png");
	manifest.push("images/menu/help/btn_got_it.png");
	manifest.push("images/menu/help/btn_next.png");
	manifest.push("images/menu/help/help1.png");
	manifest.push("images/menu/help/help2.png");
	manifest.push("images/menu/help/help3.png");
	localisedAssets = localisedAssets.concat(["images/menu/help/btn_got_it.png","images/menu/help/btn_next.png","images/menu/help/help1.png","images/menu/help/help2.png","images/menu/help/help3.png"]);
	manifest.push("images/splash/arrow1.png");
	manifest.push("images/splash/arrow2.png");
	manifest.push("images/splash/bg1.png");
	manifest.push("images/splash/bg2.png");
	manifest.push("images/splash/cannon.png");
	manifest.push("images/splash/enemies1.png");
	manifest.push("images/splash/enemies2.png");
	manifest.push("images/splash/hill.png");
	manifest.push("images/splash/logo.png");
	manifest.push("images/splash/sun.png");
	manifest.push("images/splash/tap_to_play.png");
	localisedAssets.push("images/splash/tap_to_play.png");
	co.doubleduck.BaseAssets.setLocalizedAssets(localisedAssets);
	co.doubleduck.BaseAssets.finishLoading(manifest,sounds);
}
co.doubleduck.Assets.__super__ = co.doubleduck.BaseAssets;
co.doubleduck.Assets.prototype = $extend(co.doubleduck.BaseAssets.prototype,{
	__class__: co.doubleduck.Assets
});
co.doubleduck.BaseGame = $hxClasses["co.doubleduck.BaseGame"] = function(stage) {
	this._waitingToStart = false;
	this._orientError = null;
	this._prevWinSize = new createjs.Rectangle(0,0,1,1);
	if(co.doubleduck.BaseGame._wantLandscape) {
		co.doubleduck.BaseGame.MAX_HEIGHT = 320;
		co.doubleduck.BaseGame.MAX_WIDTH = 570;
	} else {
		co.doubleduck.BaseGame.MAX_HEIGHT = 570;
		co.doubleduck.BaseGame.MAX_WIDTH = 320;
	}
	if(co.doubleduck.BaseGame.DEBUG) co.doubleduck.BasePersistence.clearAll();
	var isGS3Stock = /Android 4.0.4/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && /GT-I9300/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && !/Chrome/.test(navigator.userAgent);
	if(isGS3Stock) {
		var loc = window.location.href;
		if(loc.lastIndexOf("index.html") != -1) loc = HxOverrides.substr(loc,0,loc.lastIndexOf("index.html"));
		loc += "error.html";
		window.location.href=loc;
		return;
	}
	co.doubleduck.Persistence.initGameData();
	co.doubleduck.BaseGame._stage = stage;
	co.doubleduck.BaseGame._stage.onTick = $bind(this,this.handleStageTick);
	co.doubleduck.BaseGame._viewport = new createjs.Rectangle(0,0,1,1);
	co.doubleduck.BaseGame.hammer = new Hammer(js.Lib.document.getElementById("stageCanvas"));
	viewporter.preventPageScroll = true;
	viewporter.change($bind(this,this.handleViewportChanged));
	if(viewporter.ACTIVE) {
		viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
		if(co.doubleduck.BaseGame._wantLandscape != viewporter.isLandscape()) {
			if(co.doubleduck.BaseGame._wantLandscape) co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.ORIENT_LAND_URI,$bind(this,this.waitForOrientation)); else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.ORIENT_PORT_URI,$bind(this,this.waitForOrientation));
		} else co.doubleduck.BaseAssets.loadAndCall(
		co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill)
			);
	} else co.doubleduck.BaseAssets.loadAndCall(
	co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill)
		);
};
co.doubleduck.BaseGame.__name__ = ["co","doubleduck","BaseGame"];
co.doubleduck.BaseGame._stage = null;
co.doubleduck.BaseGame._wantLandscape = null;
co.doubleduck.BaseGame.MAX_HEIGHT = null;
co.doubleduck.BaseGame.MAX_WIDTH = null;
co.doubleduck.BaseGame.activeLocale = null;
co.doubleduck.BaseGame.availableLocales = null;
co.doubleduck.BaseGame.defaultLocale = null;
co.doubleduck.BaseGame.hammer = null;
co.doubleduck.BaseGame.getViewport = function() {
	return co.doubleduck.BaseGame._viewport;
}
co.doubleduck.BaseGame.getScreenSize = function() {
	if(co.doubleduck.BaseGame._wantLandscape) return new createjs.Rectangle(0,0,Math.floor(co.doubleduck.BaseGame._viewport.width / co.doubleduck.BaseGame._scale),co.doubleduck.BaseGame.MAX_HEIGHT); else return new createjs.Rectangle(0,0,co.doubleduck.BaseGame.MAX_WIDTH,Math.floor(co.doubleduck.BaseGame._viewport.height / co.doubleduck.BaseGame._scale));
}
co.doubleduck.BaseGame.getScale = function() {
	return co.doubleduck.BaseGame._scale;
}
co.doubleduck.BaseGame.getStage = function() {
	return co.doubleduck.BaseGame._stage;
}
co.doubleduck.BaseGame.prototype = {
	setScale: function() {
		var fixedVal = co.doubleduck.BaseGame._viewport.width;
		var varVal = co.doubleduck.BaseGame._viewport.height;
		var idealFixed = co.doubleduck.BaseGame.MAX_WIDTH;
		var idealVar = co.doubleduck.BaseGame.MAX_HEIGHT;
		if(co.doubleduck.BaseGame._wantLandscape) {
			fixedVal = co.doubleduck.BaseGame._viewport.height;
			varVal = co.doubleduck.BaseGame._viewport.width;
			idealFixed = co.doubleduck.BaseGame.MAX_HEIGHT;
			idealVar = co.doubleduck.BaseGame.MAX_WIDTH;
		}
		var regScale = varVal / idealVar;
		if(fixedVal >= varVal) co.doubleduck.BaseGame._scale = regScale; else if(idealFixed * regScale < fixedVal) co.doubleduck.BaseGame._scale = fixedVal / idealFixed; else co.doubleduck.BaseGame._scale = regScale;
	}
	,handleViewportChanged: function() {
		if(co.doubleduck.BaseGame._wantLandscape != viewporter.isLandscape()) {
			if(this._orientError == null) {
				var err = co.doubleduck.BaseGame.ORIENT_PORT_URI;
				if(co.doubleduck.BaseGame._wantLandscape) err = co.doubleduck.BaseGame.ORIENT_LAND_URI;
				this._orientError = co.doubleduck.BaseAssets.getImage(err);
				this._orientError.regX = this._orientError.image.width / 2;
				this._orientError.regY = this._orientError.image.height / 2;
				this._orientError.x = co.doubleduck.BaseGame._viewport.height / 2;
				this._orientError.y = co.doubleduck.BaseGame._viewport.width / 2;
				co.doubleduck.BaseGame._stage.addChildAt(this._orientError,co.doubleduck.BaseGame._stage.getNumChildren());
				co.doubleduck.BaseGame._stage.update();
			}
		} else if(this._orientError != null) {
			co.doubleduck.BaseGame._stage.removeChild(this._orientError);
			this._orientError = null;
			if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame._stage.update();
			if(this._waitingToStart) {
				this._waitingToStart = false;
				co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
			}
		}
	}
	,focused: function() {
		co.doubleduck.SoundManager.unmute();
	}
	,blured: function(e) {
		co.doubleduck.SoundManager.mute();
	}
	,handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		co.doubleduck.BaseGame._stage.canvas.width = screenW;
		co.doubleduck.BaseGame._stage.canvas.height = screenH;
		var shouldResize = co.doubleduck.BaseGame._wantLandscape == viewporter.isLandscape() || !viewporter.ACTIVE;
		if(shouldResize) {
			if(isFirefox) {
				screenH = Math.floor(co.doubleduck.Main.getFFHeight());
				var ffEstimate = Math.ceil((js.Lib.window.screen.height - 110) * (screenW / js.Lib.window.screen.width));
				if(!isAndroid) ffEstimate = Math.ceil(js.Lib.window.screen.height * (screenW / js.Lib.window.screen.width));
				if(ffEstimate < screenH) screenH = Math.floor(ffEstimate);
			}
			var wrongSize = screenH < screenW;
			if(co.doubleduck.BaseGame._wantLandscape) wrongSize = screenH > screenW;
			if(!viewporter.ACTIVE || !wrongSize) {
				co.doubleduck.BaseGame._viewport.width = screenW;
				co.doubleduck.BaseGame._viewport.height = screenH;
				this.setScale();
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame._stage.update();
	}
	,handleBackToMenu: function() {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.BaseGame._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,handleRestart: function(properties) {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this.startSession(properties);
	}
	,handleSessionEnd: function() {
	}
	,handlePlayClick: function(properties) {
		co.doubleduck.BaseGame._stage.removeChild(this._menu);
		this.startSession(properties);
		this._menu.destroy();
		this._menu = null;
	}
	,startSession: function(properties) {
		this._session = new co.doubleduck.Session(properties);
		this._session.onBackToMenu = $bind(this,this.handleBackToMenu);
		this._session.onRestart = $bind(this,this.handleRestart);
		this._session.onSessionEnd = $bind(this,this.handleSessionEnd);
		co.doubleduck.BaseGame._stage.addChild(this._session);
	}
	,showMenu: function() {
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.BaseGame._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,alphaFade: function(fadeElement) {
		if(fadeElement != null && js.Boot.__instanceof(fadeElement,createjs.Bitmap)) this._fadedText = fadeElement; else if(this._fadedText == null) return;
		if(this._fadedText.alpha == 0) createjs.Tween.get(this._fadedText).to({ alpha : 1},750).call($bind(this,this.alphaFade)); else if(this._fadedText.alpha == 1) createjs.Tween.get(this._fadedText).to({ alpha : 0},1500).call($bind(this,this.alphaFade));
	}
	,showGameSplash: function() {
	}
	,splashEnded: function() {
		js.Lib.document.body.bgColor = "#000000";
		co.doubleduck.BaseGame._stage.removeChild(this._splash);
		this._splash = null;
		js.Lib.window.onresize = $bind(this,this.handleResize);
		this.handleResize(null);
		this.showGameSplash();
	}
	,handleDoneLoading: function() {
		createjs.Tween.get(this._splash).wait(200).to({ alpha : 0},800).call($bind(this,this.splashEnded));
		co.doubleduck.BaseGame._stage.removeChild(this._loadingBar);
		co.doubleduck.BaseGame._stage.removeChild(this._loadingStroke);
	}
	,updateLoading: function() {
		if(co.doubleduck.BaseAssets.loaded != 1) {
			this._loadingBar.visible = true;
			var percent = co.doubleduck.BaseAssets.loaded;
			var barMask = new createjs.Shape();
			barMask.graphics.beginFill("#00000000");
			barMask.graphics.drawRect(this._loadingBar.x - this._loadingBar.image.width / 2,this._loadingBar.y,this._loadingBar.image.width * percent | 0,this._loadingBar.image.height);
			barMask.graphics.endFill();
			this._loadingBar.mask = barMask;
			co.doubleduck.Utils.waitAndCall(this,1,$bind(this,this.updateLoading));
		}
	}
	,exitFocus: function() {
		var hidden = document.mozHidden;
		if(hidden) co.doubleduck.SoundManager.mute(false); else if(!co.doubleduck.SoundManager.getPersistedMute()) co.doubleduck.SoundManager.unmute(false);
	}
	,showSplash: function() {
		if(viewporter.ACTIVE) js.Lib.document.body.bgColor = "#00A99D"; else js.Lib.document.body.bgColor = "#D94D00";
		this._splash = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOGO_URI);
		this._splash.regX = this._splash.image.width / 2;
		this._splash.x = js.Lib.window.innerWidth / 2;
		if(co.doubleduck.BaseGame._wantLandscape) this._splash.y = 20; else this._splash.y = 90;
		co.doubleduck.BaseGame._stage.addChild(this._splash);
		this._loadingStroke = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOAD_STROKE_URI);
		this._loadingStroke.regX = this._loadingStroke.image.width / 2;
		co.doubleduck.BaseGame._stage.addChildAt(this._loadingStroke,0);
		this._loadingBar = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOAD_FILL_URI);
		this._loadingBar.regX = this._loadingBar.image.width / 2;
		co.doubleduck.BaseGame._stage.addChildAt(this._loadingBar,1);
		this._loadingBar.x = js.Lib.window.innerWidth / 2;
		this._loadingBar.y = this._splash.y + 192;
		this._loadingStroke.x = this._loadingBar.x;
		this._loadingStroke.y = this._loadingBar.y;
		this._loadingBar.visible = false;
		this.updateLoading();
		co.doubleduck.BaseGame._stage.canvas.width = js.Lib.window.innerWidth;
		co.doubleduck.BaseGame._stage.canvas.height = js.Lib.window.innerHeight;
		co.doubleduck.BaseAssets.onLoadAll = $bind(this,this.handleDoneLoading);
		co.doubleduck.Assets.loadAll();
	}
	,loadLocale: function() {
		if(co.doubleduck.BaseGame.isLocalized) {
			var lang = navigator.language;
			lang = HxOverrides.substr(lang.toLowerCase(),0,2);
			if(co.doubleduck.BaseGame.availableLocales != null && co.doubleduck.BaseGame.availableLocales.length > 0) {
				if(Lambda.indexOf(co.doubleduck.BaseGame.availableLocales,lang) != -1) {
					co.doubleduck.BaseGame.activeLocale = lang;
					this.showSplash();
					return;
				} else {
					co.doubleduck.BaseGame.activeLocale = co.doubleduck.BaseGame.defaultLocale;
					this.showSplash();
					return;
				}
			} else {
				co.doubleduck.BaseGame.activeLocale = co.doubleduck.BaseGame.defaultLocale;
				if(co.doubleduck.BaseGame.defaultLocale == null) throw "DDException: default locale not set";
			}
		}
		this.showSplash();
	}
	,waitForOrientation: function() {
		this._waitingToStart = true;
		if(this._orientError == null) {
			this._orientError = this.getErrorImage();
			this._orientError.regX = this._orientError.image.width / 2;
			this._orientError.regY = this._orientError.image.height / 2;
			this._orientError.x = js.Lib.window.innerWidth / 2;
			this._orientError.y = js.Lib.window.innerHeight / 2;
			co.doubleduck.BaseGame._stage.addChildAt(this._orientError,co.doubleduck.BaseGame._stage.getNumChildren());
		}
	}
	,getErrorImage: function() {
		if(co.doubleduck.BaseGame._wantLandscape) return co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.ORIENT_LAND_URI); else return co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.ORIENT_PORT_URI);
	}
	,loadBarStroke: function() {
		co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOAD_STROKE_URI,$bind(this,this.loadLocale));
	}
	,loadBarFill: function() {
		co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOAD_FILL_URI,$bind(this,this.loadBarStroke));
	}
	,handleStageTick: function() {
		if(js.Lib.window.innerWidth != this._prevWinSize.width || js.Lib.window.innerHeight != this._prevWinSize.height) {
			this._prevWinSize.width = js.Lib.window.innerWidth;
			this._prevWinSize.height = js.Lib.window.innerHeight;
			this.handleResize(null);
		}
	}
	,_prevWinSize: null
	,_fadedText: null
	,_loadingStroke: null
	,_loadingBar: null
	,_waitingToStart: null
	,_orientError: null
	,_session: null
	,_menu: null
	,_splash: null
	,__class__: co.doubleduck.BaseGame
}
co.doubleduck.BaseMenu = $hxClasses["co.doubleduck.BaseMenu"] = function() {
	createjs.Container.call(this);
};
co.doubleduck.BaseMenu.__name__ = ["co","doubleduck","BaseMenu"];
co.doubleduck.BaseMenu.__super__ = createjs.Container;
co.doubleduck.BaseMenu.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		this.onPlayClick = null;
	}
	,onPlayClick: null
	,__class__: co.doubleduck.BaseMenu
});
co.doubleduck.BasePersistence = $hxClasses["co.doubleduck.BasePersistence"] = function() { }
co.doubleduck.BasePersistence.__name__ = ["co","doubleduck","BasePersistence"];
co.doubleduck.BasePersistence.localStorageSupported = function() {
	var result = null;
	try {
		localStorage.setItem("test","test");
		localStorage.removeItem("test");
		result = true;
	} catch( e ) {
		result = false;
	}
	return result;
}
co.doubleduck.BasePersistence.getValue = function(key) {
	if(!co.doubleduck.BasePersistence.available) return "0";
	var val = localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.BasePersistence.setValue = function(key,value) {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key] = value;
}
co.doubleduck.BasePersistence.clearAll = function() {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage.clear();
}
co.doubleduck.BasePersistence.initVar = function(initedVar,defaultVal) {
	if(defaultVal == null) defaultVal = "0";
	var value = co.doubleduck.BasePersistence.getValue(initedVar);
	if(value == null) try {
		co.doubleduck.BasePersistence.setValue(initedVar,defaultVal);
	} catch( e ) {
		co.doubleduck.BasePersistence.available = false;
	}
}
co.doubleduck.BasePersistence.getDynamicValue = function(key) {
	if(!co.doubleduck.BasePersistence.available) return { };
	var val = localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.BasePersistence.setDynamicValue = function(key,value) {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key] = value;
}
co.doubleduck.BasePersistence.initDynamicVar = function(initedVar,defaultVal) {
	var value = co.doubleduck.BasePersistence.getDynamicValue(initedVar);
	if(value == null) try {
		co.doubleduck.BasePersistence.setDynamicValue(initedVar,defaultVal);
	} catch( e ) {
		co.doubleduck.BasePersistence.available = false;
	}
}
co.doubleduck.BasePersistence.printAll = function() {
	var ls = localStorage;
	var localStorageLength = ls.length;
	var _g = 0;
	while(_g < localStorageLength) {
		var entry = _g++;
		null;
	}
}
co.doubleduck.BaseSession = $hxClasses["co.doubleduck.BaseSession"] = function() {
	createjs.Container.call(this);
};
co.doubleduck.BaseSession.__name__ = ["co","doubleduck","BaseSession"];
co.doubleduck.BaseSession.__super__ = createjs.Container;
co.doubleduck.BaseSession.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		createjs.Ticker.removeListener(this);
		this.onRestart = null;
		this.onBackToMenu = null;
		this.onSessionEnd = null;
		this.onNextLevel = null;
	}
	,sessionEnded: function() {
		if(this.onSessionEnd != null) {
			createjs.Ticker.setPaused(false);
			this.onSessionEnd();
		}
	}
	,handleReplayClick: function(properties) {
		if(this.onRestart != null) {
			createjs.Ticker.setPaused(false);
			this.onRestart(properties);
		}
	}
	,handleMenuClick: function() {
		if(this.onBackToMenu != null) {
			createjs.Ticker.setPaused(false);
			this.onBackToMenu();
		}
	}
	,_replayBtn: null
	,_menuBtn: null
	,onNextLevel: null
	,onBackToMenu: null
	,onSessionEnd: null
	,onRestart: null
	,__class__: co.doubleduck.BaseSession
});
co.doubleduck.LabeledContainer = $hxClasses["co.doubleduck.LabeledContainer"] = function(bmp) {
	createjs.Container.call(this);
	this._bitmap = bmp;
	if(this._bitmap != null) {
		if(js.Boot.__instanceof(this._bitmap,createjs.Bitmap)) {
			this._bmp = this._bitmap;
			this.image = this._bmp.image;
		} else if(js.Boot.__instanceof(this._bitmap,createjs.BitmapAnimation)) {
			this.anim = this._bitmap;
			this.image = { width : this.anim.spriteSheet._frameWidth, height : this.anim.spriteSheet._frameHeight};
		}
	}
};
co.doubleduck.LabeledContainer.__name__ = ["co","doubleduck","LabeledContainer"];
co.doubleduck.LabeledContainer.__super__ = createjs.Container;
co.doubleduck.LabeledContainer.prototype = $extend(createjs.Container.prototype,{
	getLabel: function() {
		return this._label;
	}
	,addBitmap: function() {
		this.addChild(this._bitmap);
	}
	,addCenteredBitmap: function() {
		this._bitmap.regX = this.image.width / 2;
		this._bitmap.regY = this.image.height / 2;
		this._bitmap.x = this.image.width / 2;
		this._bitmap.y = this.image.height / 2;
		this.addChild(this._bitmap);
	}
	,addBitmapLabel: function(label,fontType,padding,centered) {
		if(centered == null) centered = true;
		if(padding == null) padding = 0;
		if(fontType == null) fontType = "";
		if(this._bitmapText != null) this.removeChild(this._bitmapText);
		var fontHelper = new co.doubleduck.FontHelper(fontType);
		this._bitmapText = fontHelper.getNumber(Std.parseInt(label),1,true,null,padding,centered);
		if(this.image != null) {
			this._bitmapText.x = this.image.width / 2;
			this._bitmapText.y = this.image.height / 2;
		}
		this._label = label;
		this.addChild(this._bitmapText);
	}
	,scaleBitmapFont: function(scale) {
		this._bitmapText.scaleX = this._bitmapText.scaleY = scale;
	}
	,shiftLabel: function(shiftX,shiftY) {
		this._bitmapText.x *= shiftX;
		this._bitmapText.y *= shiftY;
	}
	,setBitmapLabelY: function(ly) {
		this._bitmapText.y = ly;
	}
	,setBitmapLabelX: function(lx) {
		this._bitmapText.x = lx;
	}
	,getBitmapLabelWidth: function() {
		var maxWidth = 0;
		var _g1 = 0, _g = this._bitmapText.getNumChildren();
		while(_g1 < _g) {
			var digit = _g1++;
			var currentDigit = js.Boot.__cast(this._bitmapText.getChildAt(digit) , createjs.Bitmap);
			var endsAt = currentDigit.x + currentDigit.image.width;
			if(endsAt > maxWidth) maxWidth = endsAt;
		}
		return maxWidth;
	}
	,setLabelY: function(ly) {
		this._text.y = ly;
	}
	,setLabelX: function(lx) {
		this._text.x = lx;
	}
	,addLabel: function(label,color) {
		if(color == null) color = "#000000";
		if(this._text != null) this.removeChild(this._text);
		this._label = label;
		this._text = new createjs.Text(label,"bold 22px Arial",color);
		this._text.regY = this._text.getMeasuredHeight() / 2;
		this._text.textAlign = "center";
		if(this._bitmap != null) {
			this._text.x = this._bitmap.x;
			this._text.y = this._bitmap.y;
		}
		this.addChild(this._text);
	}
	,changeText: function(txt) {
	}
	,_bitmapText: null
	,_text: null
	,_bmp: null
	,_bitmap: null
	,_label: null
	,anim: null
	,image: null
	,__class__: co.doubleduck.LabeledContainer
});
co.doubleduck.Button = $hxClasses["co.doubleduck.Button"] = function(bmp,pauseAffected,clickType,clickSound) {
	if(clickType == null) clickType = 2;
	if(pauseAffected == null) pauseAffected = true;
	this._lastClickTime = 0;
	co.doubleduck.LabeledContainer.call(this,bmp);
	if(clickSound == null && co.doubleduck.Button._defaultSound != null) this._clickSound = co.doubleduck.Button._defaultSound; else this._clickSound = clickSound;
	this._bitmap.mouseEnabled = true;
	this._clickType = clickType;
	this._pauseAffected = pauseAffected;
	if(clickType == co.doubleduck.Button.CLICK_TYPE_TOGGLE) {
		var initObject = { };
		var size = this.image.width / 2;
		initObject.images = [this.image];
		initObject.frames = { width : size, height : this.image.height, regX : size / 2, regY : this.image.height / 2};
		this._states = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		this._states.gotoAndStop(0);
		this.onClick = $bind(this,this.handleToggle);
		this.addChild(this._states);
	} else this.addCenteredBitmap();
	this.onPress = $bind(this,this.handlePress);
};
co.doubleduck.Button.__name__ = ["co","doubleduck","Button"];
co.doubleduck.Button.setDefaultSound = function(sound) {
	co.doubleduck.Button._defaultSound = sound;
}
co.doubleduck.Button.__super__ = co.doubleduck.LabeledContainer;
co.doubleduck.Button.prototype = $extend(co.doubleduck.LabeledContainer.prototype,{
	handleEndPressTint: function() {
		co.doubleduck.Utils.tintBitmap(this._bmp,1,1,1,1);
		if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame.getStage().update();
	}
	,setToggle: function(flag) {
		if(flag) this._states.gotoAndStop(0); else this._states.gotoAndStop(1);
	}
	,handleToggle: function(e) {
		if(this.onToggle == null) return;
		if(this._lastClickPos == null) this._lastClickPos = new createjs.Point(0,0);
		if((this._lastClickPos.x < e.stageX + 1 || this._lastClickPos.x > e.stageX + 1) && (this._lastClickPos.y < e.stageY + 1 || this._lastClickPos.y > e.stageY + 1)) {
			var now = createjs.Ticker.getTime(true);
			if(now < this._lastClickTime + 500) return;
		}
		this._lastClickPos.x = e.stageX;
		this._lastClickPos.y = e.stageY;
		this._lastClickTime = createjs.Ticker.getTime(true);
		this._states.gotoAndStop(1 - this._states.currentFrame);
		this.onToggle();
	}
	,handlePress: function(event) {
		if(createjs.Ticker.getPaused() && this._pauseAffected) return;
		if(this._clickType == co.doubleduck.Button.CLICK_TYPE_HOLD) {
			if(this.onHoldStart != null) {
				this.onHoldStart();
				event.onMouseUp = this.onHoldFinish;
			}
		}
		if(this.onClick != null) {
			if(this._clickSound != null) co.doubleduck.SoundManager.playEffect(this._clickSound);
			switch(this._clickType) {
			case co.doubleduck.Button.CLICK_TYPE_TINT:
				if(this._bmp != null) {
					co.doubleduck.Utils.tintBitmap(this._bmp,0.55,0.55,0.55,1);
					var tween = createjs.Tween.get(this._bmp);
					tween.ignoreGlobalPause = true;
					tween.wait(200).call($bind(this,this.handleEndPressTint));
					if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame.getStage().update();
				}
				break;
			case co.doubleduck.Button.CLICK_TYPE_JUICY:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.25;
				this._bitmap.scaleY = startScaleY * 0.75;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},500,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_SCALE:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.18;
				this._bitmap.scaleY = startScaleY * 1.18;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},200,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_TOGGLE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_NONE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_HOLD:
				throw "Use onHoldStart with CLICK_TYPE_HOLD, not onClick";
				break;
			}
		}
	}
	,setNoSound: function() {
		this._clickSound = null;
	}
	,_lastClickPos: null
	,_lastClickTime: null
	,_clickSound: null
	,_juiceTween: null
	,_clickType: null
	,_pauseAffected: null
	,_states: null
	,onHoldFinish: null
	,onHoldStart: null
	,onToggle: null
	,__class__: co.doubleduck.Button
});
co.doubleduck.DataLoader = $hxClasses["co.doubleduck.DataLoader"] = function() {
};
co.doubleduck.DataLoader.__name__ = ["co","doubleduck","DataLoader"];
co.doubleduck.DataLoader.getEnemyData = function(enemyType) {
	var allEnemies = new GameplayDB().getGameplayData().enemies;
	var _g1 = 0, _g = allEnemies.length;
	while(_g1 < _g) {
		var enemyIndex = _g1++;
		var currEnemy = allEnemies[enemyIndex];
		if(currEnemy.type == enemyType[0].toLowerCase()) return currEnemy;
	}
	return null;
}
co.doubleduck.DataLoader.getTowerData = function(towerType) {
	var allTowers = co.doubleduck.DataLoader.getAllTowers();
	var _g1 = 0, _g = allTowers.length;
	while(_g1 < _g) {
		var towerIndex = _g1++;
		var currTower = allTowers[towerIndex];
		if(currTower.type == towerType[0].toLowerCase()) return currTower;
	}
	return null;
}
co.doubleduck.DataLoader.getMagicData = function(magicType) {
	var allMagic = co.doubleduck.DataLoader.getAllMagicSpells();
	var _g1 = 0, _g = allMagic.length;
	while(_g1 < _g) {
		var magicIndex = _g1++;
		var currMagic = allMagic[magicIndex];
		if(currMagic.type == magicType[0].toLowerCase()) return currMagic;
	}
	return null;
}
co.doubleduck.DataLoader.getLevelById = function(id) {
	var allLevels = co.doubleduck.DataLoader.getAllLevels();
	var _g1 = 0, _g = allLevels.length;
	while(_g1 < _g) {
		var levelIndex = _g1++;
		var currLevel = allLevels[levelIndex];
		if((currLevel.id | 0) == id) return currLevel;
	}
	return null;
}
co.doubleduck.DataLoader.getAllLevels = function() {
	return new LevelDB().getLevelData().levels;
}
co.doubleduck.DataLoader.getAllTowers = function() {
	return new GameplayDB().getGameplayData().towers;
}
co.doubleduck.DataLoader.getAllMagicSpells = function() {
	return new GameplayDB().getGameplayData().magic;
}
co.doubleduck.DataLoader.getMenuData = function() {
	return new GameplayDB().getMenuData();
}
co.doubleduck.DataLoader.getMenuLevelsByScreen = function(index) {
	return new GameplayDB().getMenuData().screens[index].levels;
}
co.doubleduck.DataLoader.getMenuLevelPosition = function(id) {
	var data = co.doubleduck.DataLoader.getMenuData();
	var screens = data.screens;
	var _g = 0;
	while(_g < screens.length) {
		var screen = screens[_g];
		++_g;
		var levels = screen.levels;
		var _g1 = 0;
		while(_g1 < levels.length) {
			var lvl = levels[_g1];
			++_g1;
			if(lvl.id == id) return new createjs.Point(lvl.x,lvl.y);
		}
	}
	return null;
}
co.doubleduck.DataLoader.prototype = {
	__class__: co.doubleduck.DataLoader
}
co.doubleduck.FontHelper = $hxClasses["co.doubleduck.FontHelper"] = function(type) {
	this._fontType = type;
};
co.doubleduck.FontHelper.__name__ = ["co","doubleduck","FontHelper"];
co.doubleduck.FontHelper.prototype = {
	getNumber: function(num,scale,forceContainer,dims,padding,centered) {
		if(centered == null) centered = true;
		if(padding == null) padding = 0;
		if(forceContainer == null) forceContainer = false;
		if(scale == null) scale = 1;
		if(num >= 0 && num < 10) {
			var result = new createjs.Container();
			var bmp = this.getDigit(num);
			bmp.scaleX = bmp.scaleY = scale;
			result.addChild(bmp);
			if(centered) {
				result.regX = bmp.image.width / 2;
				result.regY = bmp.image.height / 2;
			}
			if(forceContainer) {
				if(dims != null) {
					dims.width = bmp.image.width;
					dims.height = bmp.image.height;
				}
				return result;
			} else return bmp;
		} else {
			var result = new createjs.Container();
			var numString = "" + num;
			var digits = new Array();
			var totalWidth = 0;
			digits[digits.length] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,0,1)));
			digits[0].scaleX = digits[0].scaleY = scale;
			result.addChild(digits[0]);
			totalWidth += digits[0].image.width * scale;
			if(numString.length == 4 || numString.length == 7) {
				this._lastComma = this.getComma();
				this._lastComma.scaleX = this._lastComma.scaleY = scale;
				this._lastComma.x = digits[0].x + digits[0].image.width + padding;
				result.addChild(this._lastComma);
				totalWidth += this._lastComma.image.width * scale;
			}
			var _g1 = 1, _g = numString.length;
			while(_g1 < _g) {
				var i = _g1++;
				var index = digits.length;
				digits[index] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,i,1)));
				if(numString.length - i == 3 || numString.length - i == 6) digits[index].x = this._lastComma.x + this._lastComma.image.width + padding; else digits[index].x = digits[index - 1].x + digits[index - 1].image.width + padding;
				digits[index].scaleX = digits[index].scaleY = scale;
				result.addChild(digits[index]);
				totalWidth += digits[index].image.width * scale + padding;
				if(numString.length - i == 4 || numString.length - i == 7) {
					this._lastComma = this.getComma();
					this._lastComma.scaleX = this._lastComma.scaleY = scale;
					this._lastComma.x = digits[index].x + digits[index].image.width + padding;
					result.addChild(this._lastComma);
					totalWidth += this._lastComma.image.width * scale + padding;
				}
			}
			if(centered) {
				result.regX = totalWidth / 2;
				result.regY = digits[0].image.height / 2;
			}
			if(dims != null) {
				dims.width = totalWidth;
				dims.height = digits[0].image.height;
			}
			return result;
		}
	}
	,getDigit: function(digit) {
		var digit1 = co.doubleduck.BaseAssets.getImage(this._fontType + digit + ".png");
		return digit1;
	}
	,getComma: function() {
		return co.doubleduck.BaseAssets.getImage(this._fontType + "comma.png");
	}
	,_fontType: null
	,_lastComma: null
	,__class__: co.doubleduck.FontHelper
}
co.doubleduck.Game = $hxClasses["co.doubleduck.Game"] = function(stage) {
	co.doubleduck.BaseGame._wantLandscape = false;
	co.doubleduck.BaseGame.isLocalized = true;
	co.doubleduck.BaseGame.defaultLocale = "en";
	co.doubleduck.BaseGame.availableLocales = ["es","en"];
	co.doubleduck.BaseGame.call(this,stage);
};
co.doubleduck.Game.__name__ = ["co","doubleduck","Game"];
co.doubleduck.Game.__super__ = co.doubleduck.BaseGame;
co.doubleduck.Game.prototype = $extend(co.doubleduck.BaseGame.prototype,{
	handleNextLevel: function(properties) {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this.startSession(properties);
	}
	,startSession: function(properties) {
		this._session = new co.doubleduck.Session(properties);
		this._session.onBackToMenu = $bind(this,this.handleBackToMenu);
		this._session.onRestart = $bind(this,this.handleRestart);
		this._session.onSessionEnd = $bind(this,this.handleSessionEnd);
		this._session.onNextLevel = $bind(this,this.handleNextLevel);
		co.doubleduck.BaseGame._stage.addChild(this._session);
	}
	,handleSplashEnd: function() {
		co.doubleduck.BaseGame.getStage().removeChild(this._gameSplash);
		this._gameSplash = null;
		this.showMenu();
	}
	,showGameSplash: function() {
		co.doubleduck.BaseGame.getStage().scaleX = co.doubleduck.BaseGame.getStage().scaleY = co.doubleduck.BaseGame.getScale();
		co.doubleduck.BaseGame.prototype.showGameSplash.call(this);
		co.doubleduck.Button.setDefaultSound("sound/click");
		this._gameSplash = new co.doubleduck.Splash();
		co.doubleduck.BaseGame.getStage().addChild(this._gameSplash);
		this._gameSplash.onTap = $bind(this,this.handleSplashEnd);
	}
	,_gameSplash: null
	,__class__: co.doubleduck.Game
});
co.doubleduck.Grid = $hxClasses["co.doubleduck.Grid"] = function(width,height) {
	this._array = new Array();
	this._initialHeight = height;
	this._initialWidth = width;
	var _g1 = 0, _g = this.get_height();
	while(_g1 < _g) {
		var i = _g1++;
		var row = new Array();
		this._array.push(row);
	}
};
co.doubleduck.Grid.__name__ = ["co","doubleduck","Grid"];
co.doubleduck.Grid.posEquals = function(pos1,pos2) {
	if(pos1.x == pos2.x && pos1.y == pos2.y) return true;
	return false;
}
co.doubleduck.Grid.prototype = {
	indexToPos: function(index) {
		var x = index % this.get_width();
		var y = Math.floor(index / this.get_height());
		return { x : x, y : y};
	}
	,flatten: function() {
		var ret = [];
		var _g1 = 0, _g = this.get_height();
		while(_g1 < _g) {
			var row = _g1++;
			var _g3 = 0, _g2 = this.get_width();
			while(_g3 < _g2) {
				var col = _g3++;
				ret.push(this._array[row][col]);
			}
		}
		return ret;
	}
	,checkBounds: function(val,bounds) {
		if(val > bounds - 1 || val < 0) {
			if(co.doubleduck.Grid.traceErrors) {
				var err = "ERROR: Value " + val + " is out of bounds " + (bounds - 1) + ".";
				null;
			}
			return true;
		}
		return false;
	}
	,get_size: function() {
		return this.get_width() * this.get_height();
	}
	,get_height: function() {
		if(this._array.length == 0) return this._initialHeight;
		return this._array.length;
	}
	,get_width: function() {
		if(this._array[0] == null || this._array[0].length == 0) return this._initialWidth;
		return this._array[0].length;
	}
	,getPosFromLocation: function(loc,cellWidth,cellHeight) {
		if(cellHeight == null) cellHeight = -1;
		if(cellHeight == -1) cellHeight = cellWidth;
		var posX = Math.floor(loc.x / cellWidth);
		var posY = Math.floor(loc.y / cellHeight);
		return { x : posX, y : posY};
	}
	,getNeighbourPos: function(pos) {
		var ret = new Array();
		var temp = new Array();
		temp.push(this.offsetPos(pos,co.doubleduck.Grid.UP));
		temp.push(this.offsetPos(pos,co.doubleduck.Grid.RIGHT));
		temp.push(this.offsetPos(pos,co.doubleduck.Grid.DOWN));
		temp.push(this.offsetPos(pos,co.doubleduck.Grid.LEFT));
		var _g = 0;
		while(_g < temp.length) {
			var offset = temp[_g];
			++_g;
			if(offset.x >= 0) ret.push(offset);
		}
		return ret;
	}
	,toString: function() {
		var str = "\n";
		var _g1 = 0, _g = this.get_height();
		while(_g1 < _g) {
			var row = _g1++;
			str += " | ";
			var _g3 = 0, _g2 = this.get_width();
			while(_g3 < _g2) {
				var col = _g3++;
				str += Std.string(this._array[row][col]) + " | ";
			}
			str += "\n";
		}
		return str;
	}
	,flattenApplyAndRepack: function(handler) {
		var vals = this.flatten();
		handler(vals);
		var newArray = new Array();
		var count = 0;
		var _g1 = 0, _g = this.get_height();
		while(_g1 < _g) {
			var row = _g1++;
			newArray.push(new Array());
			var _g3 = 0, _g2 = this.get_width();
			while(_g3 < _g2) {
				var col = _g3++;
				newArray[row][col] = vals[count];
				count++;
			}
		}
		this._array = newArray;
	}
	,posOf: function(val) {
		var arr = this.flatten();
		var index = Lambda.indexOf(arr,val);
		if(index == -1) return { x : -1, y : -1};
		return this.indexToPos(index);
	}
	,resize: function(width,height) {
		var vals = this.flatten();
		var newArray = new Array();
		if(vals.length != width * height) {
			var err = "ERROR: Provided size does not fit provided values.";
			null;
		}
		var count = 0;
		var _g = 0;
		while(_g < height) {
			var row = _g++;
			newArray.push(new Array());
			var _g1 = 0;
			while(_g1 < width) {
				var col = _g1++;
				newArray[row][col] = vals[count];
				count++;
			}
		}
		this._array = newArray;
	}
	,isEdge: function(pos) {
		this.checkBounds(pos.x,this.get_width());
		this.checkBounds(pos.y,this.get_height());
		if(pos.y == 0 || pos.y == this.get_height() - 1 || pos.x == 0 || pos.x == this.get_width() - 1) return true;
		return false;
	}
	,offsetPos: function(from,offset) {
		this.checkBounds(from.x,this.get_width());
		this.checkBounds(from.y,this.get_height());
		var retX = from.x + offset.x;
		var retY = from.y + offset.y;
		if(retX < 0 || retX >= this.get_width() || retY < 0 || retY >= this.get_height()) return { x : -1, y : -1};
		return { x : retX, y : retY};
	}
	,getPosOffset: function(from,to) {
		this.checkBounds(from.x,this.get_width());
		this.checkBounds(from.y,this.get_height());
		this.checkBounds(to.x,this.get_width());
		this.checkBounds(to.y,this.get_height());
		var deltaX = to.x - from.x;
		var deltaY = to.y - from.y;
		return { x : deltaX, y : deltaY};
	}
	,getCol: function(x) {
		this.checkBounds(x,this.get_width());
		var ret = [];
		var _g1 = 0, _g = this.get_height();
		while(_g1 < _g) {
			var row = _g1++;
			ret.push(this.getRow(row)[x]);
		}
		return ret;
	}
	,getRow: function(y) {
		this.checkBounds(y,this.get_height());
		return this._array[y];
	}
	,getCell: function(x,y) {
		if(this.checkBounds(x,this.get_width()) || this.checkBounds(y,this.get_height())) return null;
		return this._array[y][x];
	}
	,getGrid: function() {
		return this._array;
	}
	,setCell: function(pos,val) {
		this._array[pos.y][pos.x] = val;
	}
	,cycle: function(handler) {
		var _g1 = 0, _g = this.get_height();
		while(_g1 < _g) {
			var row = _g1++;
			var y = row;
			var _g3 = 0, _g2 = this.get_width();
			while(_g3 < _g2) {
				var col = _g3++;
				var x = col;
				if(handler != null) handler(x,y);
			}
		}
	}
	,size: null
	,height: null
	,width: null
	,_initialHeight: null
	,_initialWidth: null
	,_array: null
	,__class__: co.doubleduck.Grid
	,__properties__: {get_width:"get_width",get_height:"get_height",get_size:"get_size"}
}
co.doubleduck.Helper = $hxClasses["co.doubleduck.Helper"] = function() { }
co.doubleduck.Helper.__name__ = ["co","doubleduck","Helper"];
co.doubleduck.Helper.getDistance = function(p1,p2) {
	var distX = p1.x - p2.x;
	var distY = p1.y - p2.y;
	var dist = Math.sqrt(distX * distX + distY * distY);
	return dist;
}
co.doubleduck.Helper.average = function(arr) {
	var sum = 0;
	var _g = 0;
	while(_g < arr.length) {
		var i = arr[_g];
		++_g;
		sum += i;
	}
	return sum / arr.length;
}
co.doubleduck.Helper.radToDeg = function(rad) {
	return rad * 180 / Math.PI;
}
co.doubleduck.Helper.degToRad = function(deg) {
	return deg * Math.PI / 180;
}
co.doubleduck.Helper.tan2 = function(angle) {
	var ret = new createjs.Point(0,0);
	var rad = angle;
	rad %= Math.PI / 2;
	rad = Math.abs(rad);
	var adj = Math.cos(rad);
	var opp = Math.sin(rad);
	if(Math.abs(angle) > Math.PI / 2) {
		ret.x = adj;
		ret.y = -opp;
	} else if(Math.abs(angle) < Math.PI / 2) {
		ret.x = opp;
		ret.y = adj;
	} else {
		ret.x = 1;
		ret.y = 0;
	}
	if(angle < 0) ret.x *= -1;
	return ret;
}
co.doubleduck.Helper.getUnpausedTween = function(target) {
	var t = createjs.Tween.get(target,{ onChange : co.doubleduck.Helper.updateStage});
	t.ignoreGlobalPause = true;
	return t;
}
co.doubleduck.Helper.updateStage = function() {
	if(createjs.Ticker.getPaused() == true) co.doubleduck.BaseGame.getStage().update();
}
co.doubleduck.Helper.sortChildren = function(a,b) {
	if(a.y < b.y) return -1; else if(a.y > b.y) return 1;
	return 0;
}
co.doubleduck.MagicHaze = $hxClasses["co.doubleduck.MagicHaze"] = function() {
	if(co.doubleduck.MagicHaze._spritesheet == null) this.initSpritesheet();
	createjs.BitmapAnimation.call(this,co.doubleduck.MagicHaze._spritesheet);
	this.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this.y = co.doubleduck.BaseGame.getScreenSize().height;
};
co.doubleduck.MagicHaze.__name__ = ["co","doubleduck","MagicHaze"];
co.doubleduck.MagicHaze.__super__ = createjs.BitmapAnimation;
co.doubleduck.MagicHaze.prototype = $extend(createjs.BitmapAnimation.prototype,{
	initSpritesheet: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/session/magic/haze.png");
		var imgWidth = 320;
		var imgHeight = 570;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight};
		initObject.animations = { };
		initObject.animations.anim = { frames : 0, frequency : 1};
		co.doubleduck.MagicHaze._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,animate: function() {
		this.gotoAndPlay("anim");
	}
	,__class__: co.doubleduck.MagicHaze
});
co.doubleduck.Main = $hxClasses["co.doubleduck.Main"] = function() { }
co.doubleduck.Main.__name__ = ["co","doubleduck","Main"];
co.doubleduck.Main._stage = null;
co.doubleduck.Main._game = null;
co.doubleduck.Main._ffHeight = null;
co.doubleduck.Main.main = function() {
	co.doubleduck.Main.testFFHeight();
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	co.doubleduck.Main._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	co.doubleduck.Main._game = new co.doubleduck.Game(co.doubleduck.Main._stage);
	createjs.Ticker.addListener(co.doubleduck.Main._stage);
	createjs.Touch.enable(co.doubleduck.Main._stage,true,false);
}
co.doubleduck.Main.testFFHeight = function() {
	var isAplicable = /Firefox/.test(navigator.userAgent);
	if(isAplicable && viewporter.ACTIVE) co.doubleduck.Main._ffHeight = js.Lib.window.innerHeight;
}
co.doubleduck.Main.getFFHeight = function() {
	return co.doubleduck.Main._ffHeight;
}
co.doubleduck.Map = $hxClasses["co.doubleduck.Map"] = function(levelId) {
	createjs.Container.call(this);
	this._routes = new IntHash();
	this._towerSlots = [];
	this._bases = [];
	this._grid = new co.doubleduck.Grid(co.doubleduck.Map.GRID_WIDTH,co.doubleduck.Map.GRID_HEIGHT);
	this.cellSize = Math.floor(co.doubleduck.BaseGame.getScreenSize().width / co.doubleduck.Map.GRID_WIDTH);
	var routesData = co.doubleduck.DataLoader.getLevelById(levelId).routes;
	var _g = 0;
	while(_g < routesData.length) {
		var routeData = routesData[_g];
		++_g;
		var id = routeData.id;
		if(!this._routes.exists(id)) this._routes.set(id,new Array());
		var pointsArr = routeData.points;
		var _g1 = 0;
		while(_g1 < pointsArr.length) {
			var point = pointsArr[_g1];
			++_g1;
			this._routes.get(id).push({ x : point.x, y : point.y});
		}
	}
	var slotsData = co.doubleduck.DataLoader.getLevelById(levelId).towerSlots;
	var _g = 0;
	while(_g < slotsData.length) {
		var slotData = slotsData[_g];
		++_g;
		this._towerSlots.push({ x : slotData.x, y : slotData.y});
	}
	var basesData = co.doubleduck.DataLoader.getLevelById(levelId).bases;
	var _g = 0;
	while(_g < basesData.length) {
		var baseData = basesData[_g];
		++_g;
		this._bases.push({ x : baseData.x, y : baseData.y});
	}
	var roadsheetData = { };
	roadsheetData.images = [co.doubleduck.BaseAssets.getRawImage("images/session/tiles/road.png")];
	roadsheetData.frames = { width : this.cellSize, height : this.cellSize};
	this._roadTilesheet = new createjs.SpriteSheet(roadsheetData);
};
co.doubleduck.Map.__name__ = ["co","doubleduck","Map"];
co.doubleduck.Map._instance = null;
co.doubleduck.Map.getInstance = function(levelId) {
	if(co.doubleduck.Map._instance == null) co.doubleduck.Map._instance = new co.doubleduck.Map(levelId);
	return co.doubleduck.Map._instance;
}
co.doubleduck.Map.__super__ = createjs.Container;
co.doubleduck.Map.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		co.doubleduck.Map._instance = null;
	}
	,indexOfPosInRoute: function(routeId,pos) {
		var ret = -1;
		var _g1 = 0, _g = this._routes.get(routeId).length;
		while(_g1 < _g) {
			var i = _g1++;
			if(co.doubleduck.Grid.posEquals(this._routes.get(routeId)[i],pos)) {
				ret = i;
				break;
			}
		}
		return ret;
	}
	,isPosInRoute: function(routeId,pos) {
		var _g = 0, _g1 = this._routes.get(routeId);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(co.doubleduck.Grid.posEquals(i,pos)) return true;
		}
		return false;
	}
	,reverseDirection: function(dir) {
		var retX = dir.x * -1;
		var retY = dir.y * -1;
		return { x : retX, y : retY};
	}
	,isLocInCellCenter: function(loc,radius,direction) {
		var posX = loc.x % this.cellSize;
		var posY = loc.y % this.cellSize;
		var minPos = this.cellSize / 2 - radius;
		var maxPos = this.cellSize / 2 + radius;
		var randomDesicionMaker = Std.random(100) > 97;
		if(direction.x != 0) {
			if(posX >= minPos && posX <= maxPos && randomDesicionMaker) return true;
			if(direction.x > 0 && posX >= maxPos || direction.x < 0 && posX <= minPos) return true;
		} else if(direction.y != 0) {
			if(posY >= minPos && posY <= maxPos && randomDesicionMaker) return true;
			if(direction.y > 0 && posY >= maxPos || direction.y < 0 && posY <= minPos) return true;
		}
		return false;
	}
	,getBasesLocations: function() {
		return this._bases;
	}
	,getTowerSlotsLocations: function() {
		return this._towerSlots;
	}
	,getEnemyProgress: function(enemy) {
		var currPos = this._grid.getPosFromLocation({ x : enemy.x, y : enemy.y},this.cellSize);
		var index = this.indexOfPosInRoute(enemy.get_routeId(),currPos);
		var enemyRoute = this._routes.get(enemy.get_routeId());
		return index / enemyRoute.length;
	}
	,getNextDirection: function(enemy) {
		var currPos = this._grid.getPosFromLocation({ x : enemy.x, y : enemy.y},this.cellSize);
		var enemyRoute = this._routes.get(enemy.get_routeId());
		var index = this.indexOfPosInRoute(enemy.get_routeId(),currPos);
		var nextPos = enemyRoute[index + 1];
		if(nextPos == null) return { x : 0, y : 0};
		if(enemy.get_direction().x != null) {
			if(!this.isLocInCellCenter({ x : enemy.x, y : enemy.y},Math.floor(this.cellSize / 2 - this.cellSize * 0.40),enemy.get_direction())) return enemy.get_direction();
		}
		var nextDirection = this._grid.getPosOffset(currPos,nextPos);
		return nextDirection;
	}
	,getWaveStartingPos: function(routeId) {
		var startingCell = this._routes.get(routeId)[0];
		var startingPos = new createjs.Point(0,0);
		startingPos.x = startingCell.x * this.cellSize + this.cellSize / 2;
		startingPos.y = startingCell.y * this.cellSize + this.cellSize / 2;
		var direction = this._grid.getPosOffset(startingCell,this._routes.get(routeId)[1]);
		return { pos : startingPos, direction : direction};
	}
	,getVirtualPosition: function(enemy,time,usePrecise) {
		if(usePrecise == null) usePrecise = false;
		if(time == null) time = 0;
		if(usePrecise) {
			var virtualEnemy = { };
			virtualEnemy.x = enemy.x;
			virtualEnemy.y = enemy.y;
			virtualEnemy.direction = enemy.get_direction();
			virtualEnemy.routeId = enemy.get_routeId();
			virtualEnemy.speed = enemy.getSpeed();
			virtualEnemy.get_direction = function() {
				return virtualEnemy.direction;
			};
			virtualEnemy.get_routeId = function() {
				return virtualEnemy.routeId;
			};
			virtualEnemy.get_speed = function() {
				return virtualEnemy.speed;
			};
			var ms = Math.floor(time * 1000);
			var _g = 0;
			while(_g < ms) {
				var i = _g++;
				var nextDir = this.getNextDirection(virtualEnemy);
				virtualEnemy.x += nextDir.x * (virtualEnemy.speed / 1000);
				virtualEnemy.y += nextDir.y * (virtualEnemy.speed / 1000);
			}
			return { x : virtualEnemy.x, y : virtualEnemy.y};
		} else {
			var ret = { x : enemy.x, y : enemy.y};
			var currPos = this._grid.getPosFromLocation({ x : enemy.x, y : enemy.y},this.cellSize);
			var modX = enemy.x % this.cellSize;
			var modY = enemy.y % this.cellSize;
			var enemyRoute = this._routes.get(enemy.get_routeId());
			var index = this.indexOfPosInRoute(enemy.get_routeId(),currPos);
			var distance = time * enemy.getSpeed();
			var modDist = distance % this.cellSize;
			var distanceInCells = Math.floor(distance / this.cellSize);
			var nextCell = enemyRoute[index + distanceInCells];
			if(nextCell != null) {
				var direction = this.getNextDirection(enemy);
				if(!co.doubleduck.Grid.posEquals(currPos,nextCell)) direction = this._grid.getPosOffset(enemyRoute[this.indexOfPosInRoute(enemy.get_routeId(),nextCell) - 1],nextCell);
				var offsetX = modX + modDist * direction.x;
				var offsetY = modY + modDist * direction.y;
				ret = { x : nextCell.x * this.cellSize + offsetX, y : nextCell.y * this.cellSize + offsetY};
			}
			return ret;
		}
	}
	,resetCells: function(x,y) {
		this._grid.setCell({ x : x, y : y},{ x : x, y : y, type : co.doubleduck.CellType.Empty});
	}
	,numOfSimilarNeighbours: function(cell) {
		var count = 0;
		var _g = 0, _g1 = this._grid.getNeighbourPos(cell);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(this._grid.getCell(i.x,i.y).type == cell.type) count++;
		}
		return count;
	}
	,getStartingPosition: function(enemy) {
		var startingCell = this._routes.get(enemy.get_routeId())[0];
		var startingPos = { };
		startingPos.x = startingCell.x * this.cellSize + Std.random(Math.floor(this.cellSize * 0.8));
		startingPos.y = startingCell.y * this.cellSize + Std.random(Math.floor(this.cellSize * 0.8));
		if(startingCell.x == 0) startingPos.x -= this.cellSize; else if(startingCell.x == this._grid.get_width() - 1) startingPos.x += this.cellSize; else if(startingCell.y == 0) startingPos.y -= this.cellSize; else if(startingCell.y == this._grid.get_height() - 1) startingPos.y += this.cellSize;
		return startingPos;
	}
	,getPathCell: function(edges) {
		var tile = new createjs.BitmapAnimation(this._roadTilesheet);
		var frame = 15;
		if(edges.right) frame = 4;
		if(edges.left) frame = 4;
		if(edges.up) frame = 9;
		if(edges.down) frame = 9;
		if(edges.right && edges.left) frame = 4;
		if(edges.up && edges.down) frame = 9;
		if(edges.up && edges.left) frame = 5;
		if(edges.up && edges.right) frame = 8;
		if(edges.right && edges.down) frame = 7;
		if(edges.left && edges.down) frame = 6;
		if(edges.right && edges.left && edges.up) frame = 13;
		if(edges.up && edges.down && edges.right) frame = 11;
		if(edges.right && edges.left && edges.down) frame = 12;
		if(edges.up && edges.down && edges.left) frame = 10;
		if(edges.right && edges.left && edges.up && edges.down) frame = 14;
		tile.gotoAndStop(frame);
		return tile;
	}
	,drawCell: function(x,y) {
		var currCell = this._grid.getCell(x,y);
		var piece = { };
		if(currCell.type == co.doubleduck.CellType.Empty) {
			if(x < 3 && y < 2) return;
			if(Math.random() > 0.93 && !this._grid.isEdge(currCell)) {
				piece = co.doubleduck.BaseAssets.getImage("images/session/tiles/debris" + (Std.random(6) + 1) + ".png");
				piece.x = x * this.cellSize;
				piece.y = y * this.cellSize;
				this.addChild(piece);
			}
			return;
		} else if(currCell.type == co.doubleduck.CellType.Way || currCell.type == co.doubleduck.CellType.Base) {
			var neigbours = [];
			var _g = 0, _g1 = this._grid.getNeighbourPos({ x : x, y : y});
			while(_g < _g1.length) {
				var pos = _g1[_g];
				++_g;
				neigbours.push(this._grid.getCell(pos.x,pos.y));
			}
			var edges = { };
			edges.up = false;
			edges.down = false;
			edges.left = false;
			edges.right = false;
			var _g = 0;
			while(_g < neigbours.length) {
				var neighbour = neigbours[_g];
				++_g;
				if(neighbour.type == currCell.type || neighbour.type == co.doubleduck.CellType.Base && currCell.type == co.doubleduck.CellType.Way || neighbour.type == co.doubleduck.CellType.Way && currCell.type == co.doubleduck.CellType.Base) {
					var offset = this._grid.getPosOffset({ x : currCell.x, y : currCell.y},{ x : neighbour.x, y : neighbour.y});
					if(co.doubleduck.Grid.posEquals(offset,co.doubleduck.Grid.UP)) edges.up = true;
					if(co.doubleduck.Grid.posEquals(offset,co.doubleduck.Grid.DOWN)) edges.down = true;
					if(co.doubleduck.Grid.posEquals(offset,co.doubleduck.Grid.RIGHT)) edges.right = true;
					if(co.doubleduck.Grid.posEquals(offset,co.doubleduck.Grid.LEFT)) edges.left = true;
				}
			}
			piece = this.getPathCell(edges);
		} else return;
		piece.x = x * this.cellSize;
		piece.y = y * this.cellSize;
		this.addChild(piece);
	}
	,sortRoutes: function() {
		var $it0 = this._routes.keys();
		while( $it0.hasNext() ) {
			var routeId = $it0.next();
			var route = this._routes.get(routeId);
			var sortedRoute = [];
			var _g = 0;
			while(_g < route.length) {
				var cell = route[_g];
				++_g;
				if(this._grid.isEdge(cell) && this.numOfSimilarNeighbours(this._grid.getCell(cell.x,cell.y)) == 1) {
					sortedRoute.push(cell);
					break;
				}
			}
			while(route.length > sortedRoute.length) {
				var lastCell = sortedRoute[sortedRoute.length - 1];
				var _g = 0;
				while(_g < route.length) {
					var c = route[_g];
					++_g;
					var neighbours = this._grid.getNeighbourPos(c);
					var _g1 = 0;
					while(_g1 < neighbours.length) {
						var neighbour = neighbours[_g1];
						++_g1;
						if(co.doubleduck.Grid.posEquals(this._grid.getCell(neighbour.x,neighbour.y),lastCell) && Lambda.indexOf(sortedRoute,c) == -1) {
							sortedRoute.push(c);
							break;
						}
					}
				}
			}
			var _g = 0, _g1 = this._grid.getNeighbourPos(sortedRoute[sortedRoute.length - 1]);
			while(_g < _g1.length) {
				var nearbyPos = _g1[_g];
				++_g;
				var _g2 = 0, _g3 = this._bases;
				while(_g2 < _g3.length) {
					var base = _g3[_g2];
					++_g2;
					if(co.doubleduck.Grid.posEquals(base,nearbyPos)) {
						sortedRoute.push(base);
						break;
					}
				}
			}
			this._routes.set(routeId,sortedRoute);
		}
	}
	,construct: function() {
		this._grid.cycle($bind(this,this.resetCells));
		var $it0 = this._routes.iterator();
		while( $it0.hasNext() ) {
			var route = $it0.next();
			var _g = 0;
			while(_g < route.length) {
				var cell = route[_g];
				++_g;
				this._grid.setCell({ x : cell.x, y : cell.y},{ x : cell.x, y : cell.y, type : co.doubleduck.CellType.Way});
			}
		}
		var _g = 0, _g1 = this._towerSlots;
		while(_g < _g1.length) {
			var towerSlot = _g1[_g];
			++_g;
			this._grid.setCell({ x : towerSlot.x, y : towerSlot.y},{ x : towerSlot.x, y : towerSlot.y, type : co.doubleduck.CellType.TowerSlot});
		}
		var _g = 0, _g1 = this._bases;
		while(_g < _g1.length) {
			var base = _g1[_g];
			++_g;
			this._grid.setCell({ x : base.x, y : base.y},{ x : base.x, y : base.y, type : co.doubleduck.CellType.Base});
		}
		this.sortRoutes();
		this._grid.cycle($bind(this,this.drawCell));
	}
	,_bases: null
	,_roadTilesheet: null
	,_towerSlots: null
	,_routes: null
	,_grid: null
	,cellSize: null
	,__class__: co.doubleduck.Map
});
co.doubleduck.CellType = $hxClasses["co.doubleduck.CellType"] = { __ename__ : ["co","doubleduck","CellType"], __constructs__ : ["Empty","Way","TowerSlot","Base"] }
co.doubleduck.CellType.Empty = ["Empty",0];
co.doubleduck.CellType.Empty.toString = $estr;
co.doubleduck.CellType.Empty.__enum__ = co.doubleduck.CellType;
co.doubleduck.CellType.Way = ["Way",1];
co.doubleduck.CellType.Way.toString = $estr;
co.doubleduck.CellType.Way.__enum__ = co.doubleduck.CellType;
co.doubleduck.CellType.TowerSlot = ["TowerSlot",2];
co.doubleduck.CellType.TowerSlot.toString = $estr;
co.doubleduck.CellType.TowerSlot.__enum__ = co.doubleduck.CellType;
co.doubleduck.CellType.Base = ["Base",3];
co.doubleduck.CellType.Base.toString = $estr;
co.doubleduck.CellType.Base.__enum__ = co.doubleduck.CellType;
co.doubleduck.Menu = $hxClasses["co.doubleduck.Menu"] = function() {
	co.doubleduck.BaseMenu.call(this);
	this._data = co.doubleduck.DataLoader.getMenuData();
	this._bg = co.doubleduck.BaseAssets.getImage("images/menu/bg.png");
	this._bg.regY = this._bg.image.height / 2;
	this._bg.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
	this.addChild(this._bg);
	this._currScreen = 0;
	this.setupLevels();
	this.showArrows();
	this.addButtons();
	co.doubleduck.BaseGame.hammer.onswipe = $bind(this,this.handleSwipe);
	this.addChild(co.doubleduck.Transition.getInstance());
	co.doubleduck.Transition.transitionIn();
	this._music = co.doubleduck.SoundManager.playMusic("sound/MenuMusic");
};
co.doubleduck.Menu.__name__ = ["co","doubleduck","Menu"];
co.doubleduck.Menu.__super__ = co.doubleduck.BaseMenu;
co.doubleduck.Menu.prototype = $extend(co.doubleduck.BaseMenu.prototype,{
	destroy: function() {
		co.doubleduck.BaseMenu.prototype.destroy.call(this);
		co.doubleduck.BaseGame.hammer.onswipe = null;
		this._music.stop();
	}
	,getMapScreenX: function(index) {
		var unit = this._bg.image.width / this._data.screens.length;
		return unit * index;
	}
	,tweenScreen: function(direction) {
		if(direction >= 0) direction = 1; else direction = -1;
		var nextIndex = this._currScreen += direction;
		var nextX = this.getMapScreenX(nextIndex);
		createjs.Tween.get(this._bg).to({ regX : nextX},300,createjs.Ease.sineOut);
		createjs.Tween.get(this._levels).to({ regX : nextX},300,createjs.Ease.sineOut);
		this._currScreen = nextIndex;
		this.showArrows();
	}
	,handleSwipe: function(e) {
		if(e.direction == "left" && this._currScreen != this._data.screens.length - 1) this.tweenScreen(1); else if(e.direction == "right" && this._currScreen != 0) this.tweenScreen(-1);
	}
	,handleArrowClick: function(e) {
		if(e.target.name == "right") this.tweenScreen(1); else if(e.target.name == "left") this.tweenScreen(-1);
	}
	,showArrows: function() {
		if(this._arrowLeft == null && this._arrowRight == null) {
			var bmp = co.doubleduck.BaseAssets.getImage("images/menu/btn_arrow_r.png");
			this._arrowRight = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/btn_arrow_r.png"));
			this._arrowRight.regX = bmp.image.width / 2;
			this._arrowRight.regY = bmp.image.height / 2;
			this._arrowRight.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
			this._arrowRight.x = co.doubleduck.BaseGame.getScreenSize().width - bmp.image.width / 2;
			this._arrowRight.name = "right";
			this._arrowRight.onClick = $bind(this,this.handleArrowClick);
			this.addChild(this._arrowRight);
			this._arrowLeft = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/btn_arrow_r.png"));
			this._arrowLeft.regX = bmp.image.width / 2;
			this._arrowLeft.regY = bmp.image.height / 2;
			this._arrowLeft.scaleX = -1;
			this._arrowLeft.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
			this._arrowLeft.x = bmp.image.width / 2;
			this._arrowLeft.name = "left";
			this._arrowLeft.onClick = $bind(this,this.handleArrowClick);
			this.addChild(this._arrowLeft);
		}
		if(this._currScreen == 0) this._arrowLeft.visible = false; else this._arrowLeft.visible = true;
		if(this._currScreen == this._data.screens.length - 1) this._arrowRight.visible = false; else this._arrowRight.visible = true;
	}
	,startSession: function(id) {
		if(this.onPlayClick != null) this.onPlayClick({ levelId : id});
	}
	,handleLvlBtnClick: function(e) {
		var id = Std.parseInt(e.target.name);
		if(id == 1) {
			this.showHelp(null,true);
			return;
		}
		var lastLockedLevel = co.doubleduck.Persistence.getUnlockedLevel();
		if(id > lastLockedLevel) return;
		e.target.onClick = null;
		co.doubleduck.Transition.transitionOut($bind(this,this.startSession),[id]);
	}
	,handlePlayFromHelp: function() {
		co.doubleduck.BaseGame.getStage().removeChild(this._blackOverlay);
		this._blackOverlay = null;
		co.doubleduck.BaseGame.getStage().removeChild(this._help);
		this._help = null;
		co.doubleduck.Transition.transitionOut($bind(this,this.startSession),[1]);
	}
	,getLevelGraphics: function(id) {
		var numStars = co.doubleduck.Persistence.getStarRating(id);
		var lastLockedLevel = co.doubleduck.Persistence.getUnlockedLevel();
		var isLocked = false;
		if(id > lastLockedLevel) isLocked = true;
		if(this._levelsSpritesheet == null) {
			var data = { };
			var img = co.doubleduck.BaseAssets.getRawImage("images/menu/btn_lvl.png");
			var numFrames = 5;
			var imageHeight = 0;
			var imageWidth = 0;
			if(img.width > img.height) {
				imageWidth = img.width / numFrames;
				imageHeight = img.height;
			} else {
				imageHeight = img.height / numFrames;
				imageWidth = img.width;
			}
			data.frames = { width : imageWidth, height : imageHeight};
			data.images = [img];
			this._levelsSpritesheet = new createjs.SpriteSheet(data);
		}
		var ret = new createjs.Container();
		var bg = new createjs.BitmapAnimation(this._levelsSpritesheet);
		if(isLocked) bg.gotoAndStop(0); else bg.gotoAndStop(numStars + 1);
		bg.mouseEnabled = true;
		ret.addChild(bg);
		ret.name = "" + id;
		ret.onClick = $bind(this,this.handleLvlBtnClick);
		return ret;
	}
	,setupLevels: function() {
		this._levels = new createjs.Container();
		this._levels.y = co.doubleduck.BaseGame.getScreenSize().height / 2 - this._bg.image.height / 2;
		var screens = this._data.screens;
		var _g1 = 0, _g = screens.length;
		while(_g1 < _g) {
			var scr = _g1++;
			var screen = screens[scr];
			var levels = co.doubleduck.DataLoader.getMenuLevelsByScreen(scr);
			var _g3 = 0, _g2 = levels.length;
			while(_g3 < _g2) {
				var lvl = _g3++;
				var level = levels[lvl];
				var unit = this.getMapScreenX(scr);
				var lvlPos = co.doubleduck.DataLoader.getMenuLevelPosition(level.id);
				lvlPos.x += unit;
				var levelBtn = this.getLevelGraphics(level.id);
				levelBtn.x = lvlPos.x;
				levelBtn.y = lvlPos.y;
				this._levels.addChild(levelBtn);
			}
		}
		this.addChild(this._levels);
	}
	,removeHelp: function() {
		this.mouseEnabled = true;
		co.doubleduck.BaseGame.getStage().removeChild(this._help);
		this._help = null;
		co.doubleduck.BaseGame.getStage().removeChild(this._blackOverlay);
		this._blackOverlay = null;
	}
	,closeHelpAndStart: function() {
		this._help.mouseEnabled = false;
		createjs.Tween.get(this._blackOverlay).to({ alpha : 0},300,createjs.Ease.sineOut);
		createjs.Tween.get(this._help).to({ alpha : 0},500,createjs.Ease.sineOut).call($bind(this,this.handlePlayFromHelp));
	}
	,closeHelp: function() {
		this._help.mouseEnabled = false;
		createjs.Tween.get(this._arrowLeft).to({ alpha : 1},500,createjs.Ease.sineOut);
		createjs.Tween.get(this._arrowRight).to({ alpha : 1},500,createjs.Ease.sineOut);
		createjs.Tween.get(this._blackOverlay).to({ alpha : 0},300,createjs.Ease.sineOut);
		createjs.Tween.get(this._help).to({ alpha : 0},500,createjs.Ease.sineOut).call($bind(this,this.removeHelp));
	}
	,showHelp: function(e,startGame) {
		if(startGame == null) startGame = false;
		this._blackOverlay = new createjs.Shape();
		this._blackOverlay.graphics.beginFill("#000000");
		this._blackOverlay.graphics.drawRect(0,0,co.doubleduck.BaseGame.getScreenSize().width,co.doubleduck.BaseGame.getScreenSize().height);
		this._blackOverlay.alpha = 0;
		createjs.Tween.get(this._blackOverlay).to({ alpha : 0.8},300,createjs.Ease.sineOut);
		co.doubleduck.BaseGame.getStage().addChild(this._blackOverlay);
		var pages = ["images/menu/help/help1.png","images/menu/help/help2.png","images/menu/help/help3.png"];
		this._help = new co.doubleduck.PagedHelp("images/menu/help/bg.png","images/menu/help/btn_next.png","images/menu/help/btn_got_it.png",pages);
		this.mouseEnabled = false;
		co.doubleduck.BaseGame.getStage().addChild(this._help);
		if(startGame) this._help.onGotIt = $bind(this,this.closeHelpAndStart); else this._help.onGotIt = $bind(this,this.closeHelp);
		createjs.Tween.get(this._arrowLeft).to({ alpha : 0},500,createjs.Ease.sineOut);
		createjs.Tween.get(this._arrowRight).to({ alpha : 0},500,createjs.Ease.sineOut);
		this._help.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
		this._help.y = co.doubleduck.BaseGame.getScreenSize().height * 0.5;
		this._help.setButtonsPos(0.8,0.9);
		this._help.setMarkersPos(0.88,0.5);
		this._help.alpha = 0;
		createjs.Tween.get(this._help).to({ alpha : 1},500,createjs.Ease.sineOut);
	}
	,addButtons: function() {
		this._muteButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/btn_sound.png"),true,4);
		this.addChild(this._muteButton);
		this._muteButton.x = co.doubleduck.BaseGame.getScreenSize().width * 0.25;
		this._muteButton.y = co.doubleduck.BaseGame.getScreenSize().height * 0.935;
		this._muteButton.setToggle(!co.doubleduck.SoundManager.isMuted());
		this._muteButton.onToggle = co.doubleduck.SoundManager.toggleMute;
		this._helpButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/btn_help.png"));
		co.doubleduck.Utils.setCenterReg(this._helpButton);
		this._helpButton.y = this._muteButton.y;
		this._helpButton.x = co.doubleduck.BaseGame.getScreenSize().width * 0.1;
		this.addChild(this._helpButton);
		this._helpButton.onClick = $bind(this,this.showHelp);
	}
	,_music: null
	,_currScreen: null
	,_blackOverlay: null
	,_help: null
	,_helpButton: null
	,_muteButton: null
	,_levelsSpritesheet: null
	,_levels: null
	,_arrowLeft: null
	,_arrowRight: null
	,_data: null
	,_bg: null
	,__class__: co.doubleduck.Menu
});
co.doubleduck.PagedHelp = $hxClasses["co.doubleduck.PagedHelp"] = function(backUri,nextBtnUri,gotItBtnUri,pages) {
	createjs.Container.call(this);
	this._background = co.doubleduck.BaseAssets.getImage(backUri);
	this.addChild(this._background);
	this.regX = this._background.image.width / 2;
	this.regY = this._background.image.height / 2;
	this._contentLayer = new createjs.Container();
	if(pages.length > 0) {
		var _g1 = 0, _g = pages.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.addPage(pages[i],i);
		}
		this.addChild(this._contentLayer);
		this._pagesCount = pages.length;
		this._mask = new createjs.Shape();
		this._mask.graphics.beginFill("#000000");
		this._mask.graphics.drawRect(20,20,this._background.image.width - 40,this._background.image.height - 40);
		this._mask.graphics.endFill();
		this._contentLayer.mask = this._mask;
	} else this._pagesCount = 0;
	if(nextBtnUri != null && nextBtnUri != "") {
		this._nextBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(nextBtnUri),true,co.doubleduck.Button.CLICK_TYPE_SCALE);
		this._nextBtn.regX = this._nextBtn.image.width / 2;
		this._nextBtn.regY = this._nextBtn.image.height / 2;
		this._nextBtn.onClick = $bind(this,this.handleNextClick);
		this.addChild(this._nextBtn);
	}
	this._gotItBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(gotItBtnUri),true,co.doubleduck.Button.CLICK_TYPE_SCALE);
	this._gotItBtn.regX = this._gotItBtn.image.width / 2;
	this._gotItBtn.regY = this._gotItBtn.image.height / 2;
	this._gotItBtn.onClick = $bind(this,this.handleGotItClick);
	this.addChild(this._gotItBtn);
	this.setButtonsPos();
	this._currPage = 0;
	this.enableSwipe();
	this.addPageMarkers();
	this.setButtonsVis();
};
co.doubleduck.PagedHelp.__name__ = ["co","doubleduck","PagedHelp"];
co.doubleduck.PagedHelp.__super__ = createjs.Container;
co.doubleduck.PagedHelp.prototype = $extend(createjs.Container.prototype,{
	createPageMarker: function() {
		var img = co.doubleduck.BaseAssets.getRawImage("images/duckling/page_marker.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : 16, height : 18};
		initObject.animations = { };
		initObject.animations.idle = { frames : 0, frequency : 20};
		initObject.animations.active = { frames : 1, frequency : 20};
		var pageMarker = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		pageMarker.gotoAndStop("idle");
		return pageMarker;
	}
	,handleNextClick: function() {
		this._currPage++;
		if(this._currPage >= this._pagesCount) {
			this._currPage = this._pagesCount - 1;
			return;
		}
		this._pageMarkers[this._currPage - 1].gotoAndStop("idle");
		this._pageMarkers[this._currPage].gotoAndStop("active");
		createjs.Tween.get(this._contentLayer).to({ x : -1 * this._background.image.width * this._currPage},200,createjs.Ease.sineOut);
		this.setButtonsVis();
	}
	,handlePrevClick: function() {
		this._currPage--;
		if(this._currPage < 0) {
			this._currPage = 0;
			return;
		}
		this._pageMarkers[this._currPage + 1].gotoAndStop("idle");
		this._pageMarkers[this._currPage].gotoAndStop("active");
		createjs.Tween.get(this._contentLayer).to({ x : -1 * this._background.image.width * this._currPage},200,createjs.Ease.sineOut);
		this.setButtonsVis();
	}
	,setButtonsVis: function() {
		if(this._pagesCount == 0) {
			this._gotItBtn.visible = true;
			return;
		}
		if(this._currPage == this._pagesCount - 1) {
			this._gotItBtn.visible = true;
			this._nextBtn.visible = false;
		} else {
			this._gotItBtn.visible = false;
			this._nextBtn.visible = true;
		}
	}
	,handleSwipe: function(event) {
		if(event.direction == "left") this.handleNextClick(); else if(event.direction == "right") this.handlePrevClick();
	}
	,handleGotItClick: function() {
		if(this.onGotIt != null) this.onGotIt();
	}
	,addPageMarkers: function() {
		if(this._pagesCount == 0) return;
		this._pageMarkers = new Array();
		var totalWidth = 0;
		this._markersLayer = new createjs.Container();
		var _g1 = 0, _g = this._pagesCount;
		while(_g1 < _g) {
			var currPage = _g1++;
			var pageMarker = this.createPageMarker();
			this._pageMarkers.push(pageMarker);
			if(currPage != 0) {
				pageMarker.x = this._pageMarkers[currPage - 1].x + this._pageMarkers[currPage - 1].spriteSheet._frameWidth + 5;
				totalWidth += 5;
			}
			totalWidth += pageMarker.spriteSheet._frameWidth;
			this._markersLayer.addChild(pageMarker);
		}
		this._markersLayer.y = this._background.image.height * 0.80;
		this._markersLayer.x = this._background.image.width / 2;
		this._markersLayer.regX = totalWidth / 2;
		this.addChild(this._markersLayer);
		this._pageMarkers[0].gotoAndStop("active");
	}
	,addPage: function(pageUri,index) {
		var page = co.doubleduck.BaseAssets.getImage(pageUri);
		page.x += this._background.image.width * index;
		this._contentLayer.addChild(page);
	}
	,goToPage: function(page) {
		this._pageMarkers[this._currPage].gotoAndStop("idle");
		this._currPage = page;
		this._pageMarkers[this._currPage].gotoAndStop("active");
		this._contentLayer.x = -1 * this._background.image.width * this._currPage;
		this.setButtonsVis();
	}
	,changeContentMask: function(topPad,bottomPad,leftPad,rightPad) {
		this._mask.graphics.clear();
		this._mask.graphics.beginFill("#000000");
		this._mask.graphics.drawRect(leftPad,topPad,this._background.image.width - (rightPad + leftPad),this._background.image.height - (bottomPad + topPad));
		this._mask.graphics.endFill();
	}
	,rewindPages: function() {
		this.goToPage(0);
	}
	,enableSwipe: function() {
		co.doubleduck.BaseGame.hammer.onswipe = $bind(this,this.handleSwipe);
	}
	,setMarkersPos: function(percentY,percentX) {
		if(percentX == null) percentX = 0.5;
		this._markersLayer.y = this._background.image.height * percentY;
		this._markersLayer.x = this._background.image.width * percentX;
	}
	,setButtonsPos: function(percentX,percentY) {
		if(percentY == null) percentY = 0.5;
		if(percentX == null) percentX = 0.5;
		if(this._nextBtn != null) {
			this._nextBtn.x = this._background.image.width * percentX;
			this._nextBtn.y = this._background.image.height * percentY;
		}
		this._gotItBtn.x = this._background.image.width * percentX;
		this._gotItBtn.y = this._background.image.height * percentY;
	}
	,_currPage: null
	,_pagesCount: null
	,_gotItBtn: null
	,_nextBtn: null
	,_pageMarkers: null
	,_markersLayer: null
	,_mask: null
	,_contentLayer: null
	,_background: null
	,onGotIt: null
	,__class__: co.doubleduck.PagedHelp
});
co.doubleduck.Persistence = $hxClasses["co.doubleduck.Persistence"] = function() { }
co.doubleduck.Persistence.__name__ = ["co","doubleduck","Persistence"];
co.doubleduck.Persistence.initGameData = function() {
	co.doubleduck.BasePersistence.GAME_PREFIX = "DDAOB_";
	if(!co.doubleduck.BasePersistence.available) return;
	co.doubleduck.BasePersistence.initVar("UnlockedLevel","1");
	var _g1 = 0, _g = co.doubleduck.DataLoader.getAllLevels().length;
	while(_g1 < _g) {
		var levelIndex = _g1++;
		var id = co.doubleduck.DataLoader.getAllLevels()[levelIndex].id | 0;
		co.doubleduck.BasePersistence.initVar("level" + id);
	}
}
co.doubleduck.Persistence.getUnlockedLevel = function() {
	return Std.parseInt(co.doubleduck.BasePersistence.getValue("UnlockedLevel"));
}
co.doubleduck.Persistence.setUnlockedLevel = function(level) {
	co.doubleduck.BasePersistence.setValue("UnlockedLevel","" + level);
}
co.doubleduck.Persistence.getStarRating = function(levelId) {
	return Std.parseInt(co.doubleduck.BasePersistence.getValue("level" + levelId));
}
co.doubleduck.Persistence.setStarRating = function(levelId,stars) {
	co.doubleduck.BasePersistence.setValue("level" + levelId,"" + stars);
}
co.doubleduck.Persistence.__super__ = co.doubleduck.BasePersistence;
co.doubleduck.Persistence.prototype = $extend(co.doubleduck.BasePersistence.prototype,{
	__class__: co.doubleduck.Persistence
});
co.doubleduck.Session = $hxClasses["co.doubleduck.Session"] = function(properties) {
	this._sessionEnded = false;
	this._wavesFinished = false;
	this._levelNum = properties.levelId | 0;
	co.doubleduck.BaseSession.call(this);
	co.doubleduck.Session._currSession = this;
	this._layerMap = new createjs.Container();
	this._layerBuildings = new createjs.Container();
	this._layerUI = new createjs.Container();
	this.addChild(this._layerMap);
	this._flyingEnemies = new createjs.Container();
	this._groundEnemies = new createjs.Container();
	this.addChild(this._groundEnemies);
	this.addChild(this._layerBuildings);
	this.addChild(this._flyingEnemies);
	this.addChild(this._layerUI);
	this._background = co.doubleduck.BaseAssets.getImage("images/session/bg.png");
	this._layerMap.addChild(this._background);
	var m = co.doubleduck.Map.getInstance(this._levelNum);
	m.construct();
	this._layerMap.addChild(m);
	this._enemies = [];
	this._wm = new co.doubleduck.WaveManager(this._levelNum);
	this._wm.onSpawnEnemy = $bind(this,this.spawnEnemy);
	this._wm.onAllWavesFinished = $bind(this,this.handleWavesFinished);
	this._wm.onNextWavePending = $bind(this,this.handleWavePending);
	this._wm.onWaveStart = $bind(this,this.handleWaveStart);
	this._wm.start();
	var slots = co.doubleduck.Map.getInstance().getTowerSlotsLocations();
	var _g = 0;
	while(_g < slots.length) {
		var slot = slots[_g];
		++_g;
		var s = new co.doubleduck.TowerSlot();
		s.onBuildingClicked = $bind(this,this.handleNewBuilding);
		s.x = slot.x * co.doubleduck.Map.getInstance().cellSize;
		s.y = slot.y * co.doubleduck.Map.getInstance().cellSize;
		s.x += co.doubleduck.Map.getInstance().cellSize / 2;
		s.y += co.doubleduck.Map.getInstance().cellSize / 2;
		this._layerBuildings.addChild(s);
	}
	this._towers = [];
	var bases = co.doubleduck.Map.getInstance().getBasesLocations();
	var _g = 0;
	while(_g < bases.length) {
		var base = bases[_g];
		++_g;
		var b = co.doubleduck.BaseAssets.getImage("images/session/tiles/base.png");
		b.regX = b.image.width / 2;
		b.x = base.x * co.doubleduck.Map.getInstance().cellSize + co.doubleduck.Map.getInstance().cellSize * 0.5;
		b.y = base.y * co.doubleduck.Map.getInstance().cellSize;
		this._layerMap.addChild(b);
	}
	this._magicData = co.doubleduck.DataLoader.getAllMagicSpells();
	var _g1 = 0, _g = this._magicData.length;
	while(_g1 < _g) {
		var magicIndex = _g1++;
		var currMagic = this._magicData[magicIndex];
		var magicName = currMagic.type;
		if((currMagic.unlockLevel | 0) <= co.doubleduck.Persistence.getUnlockedLevel()) {
			var magicType = Type.createEnum(co.doubleduck.actors.MagicType,magicName.toUpperCase());
			if(this._availableMagic == null) this._availableMagic = [];
			this._availableMagic.push(co.doubleduck.actors.Magic.create(magicType));
		}
	}
	this._selectedMagic = null;
	this._levelData = co.doubleduck.DataLoader.getLevelById(this._levelNum);
	this._baseHp = this._levelData.baseHp | 0;
	this._currBalance = this._levelData.balance | 0;
	this._currWaveNum = 0;
	this._totalWaveCount = this._levelData.waves.length | 0;
	this.addUI();
	this._layerUI.addChild(co.doubleduck.ui.ContextMenu.getContainer());
	this.addChild(co.doubleduck.Transition.getInstance());
	co.doubleduck.Transition.transitionIn();
};
co.doubleduck.Session.__name__ = ["co","doubleduck","Session"];
co.doubleduck.Session._currSession = null;
co.doubleduck.Session.getCurrSession = function() {
	return co.doubleduck.Session._currSession;
}
co.doubleduck.Session.__super__ = co.doubleduck.BaseSession;
co.doubleduck.Session.prototype = $extend(co.doubleduck.BaseSession.prototype,{
	destroy: function() {
		co.doubleduck.BaseSession.prototype.destroy.call(this);
		this._wm.stop();
		co.doubleduck.ui.ContextMenu.cleanUp();
		co.doubleduck.Map.getInstance().destroy();
	}
	,stopAll: function() {
		var _g = 0, _g1 = this._enemies;
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			enemy.disable();
		}
		var _g1 = 0, _g = this._layerBuildings.getNumChildren();
		while(_g1 < _g) {
			var i = _g1++;
			var t = this._layerBuildings.getChildAt(i);
			if(js.Boot.__instanceof(t,co.doubleduck.actors.Tower)) {
				var tower = t;
				tower.disable();
				createjs.Tween.removeTweens(tower);
			}
		}
		if(this._wm != null) this._wm.stop();
	}
	,removeEnemy: function(enemy) {
		HxOverrides.remove(this._enemies,enemy);
		enemy.disable();
		if(js.Boot.__instanceof(enemy,co.doubleduck.actors.FlyingEnemy) || js.Boot.__instanceof(enemy,co.doubleduck.actors.ArmedFlyingEnemy)) this._flyingEnemies.removeChild(enemy); else this._groundEnemies.removeChild(enemy);
		enemy = null;
	}
	,enableInteractions: function(enable) {
		this._hud.mouseEnabled = enable;
		this._layerUI.mouseEnabled = enable;
		this._layerBuildings.mouseEnabled = enable;
	}
	,handlePauseBtnClick: function() {
		this.enableInteractions(false);
	}
	,handleSessionEnd: function(win) {
		this.enableInteractions(false);
		this.stopAll();
		if(this._sessionEnded) return;
		this._sessionEnded = true;
		var modalType;
		if(win) modalType = co.doubleduck.ui.EndModalType.WIN; else modalType = co.doubleduck.ui.EndModalType.LOSE;
		var modal = new co.doubleduck.ui.EndModal(modalType);
		this.addChild(modal);
		modal.animateIn();
	}
	,handleEnemyDeath: function(enemy,reachedEnd) {
		if(reachedEnd) {
			var enemyDamage = enemy.getDamage();
			if(this._baseHp > 1) co.doubleduck.SoundManager.playEffect("sound/baseHit");
			this._baseHp -= enemyDamage;
		} else {
			var enemyPayout = enemy.getPayout();
			this._currBalance += enemyPayout;
			var activeMenu = co.doubleduck.ui.ContextMenu.getActiveMenu();
			if(activeMenu != null) activeMenu.recheckFunds();
			if(!(this._wavesFinished && this._enemies.length == 1)) {
				if(Math.random() < 0.2) {
					if(Math.random() > 0.5) co.doubleduck.SoundManager.playEffect("sound/EnemyDefeat1"); else co.doubleduck.SoundManager.playEffect("sound/EnemyDefeat2");
				}
			}
		}
		this.removeEnemy(enemy);
		if(this._baseHp <= 0) this.handleSessionEnd(false); else if(this._wavesFinished && this._enemies.length == 0) this.handleSessionEnd(true);
		this.updateHud();
	}
	,updateHud: function() {
		this._hud.setLiveCount(this._baseHp);
		this._hud.setMoney(this._currBalance);
		this._hud.setWaveCount(this._currWaveNum,this._totalWaveCount);
	}
	,alphaFade: function(fadeElement) {
		if(fadeElement == null) return;
		if(fadeElement.alpha == 0) createjs.Tween.get(fadeElement).to({ alpha : 1},750).call($bind(this,this.alphaFade),[fadeElement]); else if(fadeElement.alpha == 1) createjs.Tween.get(fadeElement).to({ alpha : 0},1500).call($bind(this,this.alphaFade),[fadeElement]);
	}
	,hideRoutes: function() {
		if(this._waveLocations == null) return;
		var _g = 0, _g1 = this._waveLocations;
		while(_g < _g1.length) {
			var loc = _g1[_g];
			++_g;
			createjs.Tween.removeTweens(loc);
			this._layerMap.removeChild(loc);
			loc = null;
		}
	}
	,showRoutes: function(routeIds) {
		if(this._waveLocations != null) this.hideRoutes();
		this._waveLocations = new Array();
		var _g = 0;
		while(_g < routeIds.length) {
			var route = routeIds[_g];
			++_g;
			var routeContainer = new createjs.Container();
			var routeImage = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/wave_dir.png");
			co.doubleduck.Utils.setCenterReg(routeImage);
			this._waveLocations.push(routeContainer);
			this.alphaFade(routeContainer);
			var data = co.doubleduck.Map.getInstance().getWaveStartingPos(route);
			routeContainer.x = data.pos.x;
			routeContainer.y = data.pos.y;
			routeContainer.addChild(routeImage);
			this._layerMap.addChild(routeContainer);
			var iconImage = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/wave_icon.png");
			co.doubleduck.Utils.setCenterReg(iconImage);
			routeContainer.addChild(iconImage);
			if(data.direction.x < 0) {
				routeImage.rotation = 90;
				iconImage.x -= 3;
			} else if(data.direction.x > 0) {
				routeImage.rotation = -90;
				iconImage.x += 3;
			} else if(data.direction.y < 0) routeImage.rotation = 180; else iconImage.y += 3;
		}
	}
	,handleWavePending: function(time,routeIds) {
		if(time > 2000) this._hud.showWaveNotice(time);
		this.showRoutes(routeIds);
	}
	,handleWaveStart: function() {
		this.hideRoutes();
		co.doubleduck.SoundManager.playEffect("sound/waveStart");
		this._currWaveNum++;
		this.updateHud();
	}
	,handleWavesFinished: function() {
		this._wavesFinished = true;
	}
	,spawnEnemy: function(enemy) {
		if(js.Boot.__instanceof(enemy,co.doubleduck.actors.FlyingEnemy) || js.Boot.__instanceof(enemy,co.doubleduck.actors.ArmedFlyingEnemy)) this._flyingEnemies.addChild(enemy); else this._groundEnemies.addChild(enemy);
		enemy.enable();
		this._enemies.push(enemy);
		enemy.onDeath = $bind(this,this.handleEnemyDeath);
		this._flyingEnemies.sortChildren(co.doubleduck.Helper.sortChildren);
		this._groundEnemies.sortChildren(co.doubleduck.Helper.sortChildren);
	}
	,restart: function() {
		if(this.onRestart != null) this.onRestart({ levelId : this._levelNum});
	}
	,nextLevel: function() {
		if(this.onNextLevel != null) this.onNextLevel({ levelId : this._levelNum + 1});
	}
	,backToMenu: function() {
		if(this.onBackToMenu != null) this.onBackToMenu();
	}
	,handleNextLevel: function() {
		this.addChild(co.doubleduck.Transition.getInstance());
		co.doubleduck.Transition.transitionOut($bind(this,this.nextLevel));
	}
	,handleBackToMenu: function() {
		this.addChild(co.doubleduck.Transition.getInstance());
		co.doubleduck.Transition.transitionOut($bind(this,this.backToMenu));
	}
	,handleRestart: function() {
		this.addChild(co.doubleduck.Transition.getInstance());
		co.doubleduck.Transition.transitionOut($bind(this,this.restart));
	}
	,forceNextWave: function() {
		this._wm.forceNextWave();
	}
	,getBaseHp: function() {
		return this._baseHp;
	}
	,getHud: function() {
		return this._hud;
	}
	,getCurrentBalance: function() {
		return this._currBalance;
	}
	,getLevelNum: function() {
		return this._levelNum;
	}
	,getTowers: function() {
		return this._towers;
	}
	,getEnemies: function() {
		return this._enemies;
	}
	,handleTowerSold: function(tower,price) {
		co.doubleduck.SoundManager.playEffect("sound/ReceiveGold");
		tower.deconstruct();
		this._layerBuildings.removeChild(tower);
		var s = new co.doubleduck.TowerSlot();
		s.onBuildingClicked = $bind(this,this.handleNewBuilding);
		s.x = tower.x + co.doubleduck.Map.getInstance().cellSize / 2;
		s.y = tower.y + co.doubleduck.Map.getInstance().cellSize / 2;
		this._layerBuildings.addChild(s);
		HxOverrides.remove(this._towers,tower);
		this._currBalance += tower.getSellingPrice();
		this.updateHud();
		tower = null;
	}
	,handleSlotClick: function(e) {
		co.doubleduck.ui.ContextMenu.getMenu(new createjs.Point(e.target.x + co.doubleduck.Map.getInstance().cellSize / 2,e.target.y + co.doubleduck.Map.getInstance().cellSize / 2),[]);
	}
	,handleTowerUpgrade: function(tower) {
		co.doubleduck.SoundManager.playEffect("sound/placeTower");
		this._currBalance -= tower.getPrice();
		this.updateHud();
	}
	,handleNewBuilding: function(s,type) {
		co.doubleduck.SoundManager.playEffect("sound/placeTower");
		var removedSlot = this._layerBuildings.removeChild(s);
		var newTower = co.doubleduck.actors.Tower.create(type);
		newTower.x = s.x - co.doubleduck.Map.getInstance().cellSize / 2;
		newTower.y = s.y - co.doubleduck.Map.getInstance().cellSize / 2;
		removedSlot = null;
		newTower.onSell = $bind(this,this.handleTowerSold);
		newTower.onUpgrade = $bind(this,this.handleTowerUpgrade);
		this._towers.push(newTower);
		this._layerBuildings.addChild(newTower);
		this._currBalance -= newTower.getPrice();
		this.updateHud();
		this._layerBuildings.sortChildren(co.doubleduck.Helper.sortChildren);
	}
	,handleMagicMenuClosed: function() {
		this._magicButton.mouseEnabled = true;
	}
	,removeCover: function() {
		if(this._stageCover != null) {
			this._layerUI.removeChild(this._stageCover);
			this._stageCover = null;
		}
	}
	,addCover: function() {
		if(this._stageCover != null) return;
		this._stageCover = new createjs.Shape();
		this._stageCover.graphics.beginFill("#000000");
		this._stageCover.graphics.drawRect(0,0,co.doubleduck.BaseGame.getScreenSize().width,co.doubleduck.BaseGame.getScreenSize().height);
		this._stageCover.graphics.endFill();
		this._stageCover.alpha = 0.01;
		this._layerUI.addChild(this._stageCover);
	}
	,removeRipple: function(ripple) {
		this._layerMap.removeChild(ripple);
	}
	,showMagicRipple: function(loc,ripple,maxRadius) {
		var myLoc = this.globalToLocal(loc.x,loc.y);
		ripple.x = myLoc.x;
		ripple.y = myLoc.y;
		ripple.alpha = 0;
		ripple.scaleX = ripple.scaleY = maxRadius / (ripple.image.width / 2);
		this._layerMap.addChild(ripple);
		createjs.Tween.get(ripple).to({ alpha : 0.7},300,createjs.Ease.sineOut).wait(400).to({ alpha : 0},300,createjs.Ease.sineOut).call($bind(this,this.removeRipple),[ripple]);
	}
	,handleMagicActivated: function(e) {
		this._hud.hideDesc();
		var pos = new createjs.Point(e.stageX,e.stageY);
		this.showMagicRipple(pos,this._selectedMagic.getRipple(),this._selectedMagic.getEffectRadius());
		this._layerBuildings.removeChild(this._magicHaze);
		this._magicHaze = null;
		this._selectedMagic.activate(pos);
		this._selectedMagic = null;
		this.removeCover();
	}
	,magicSelected: function(magic) {
		var magicDesc = "images/session/ui/description/magic/" + magic.getType()[0].toLowerCase() + ".png";
		this._hud.showDesc(magicDesc);
		this._magicHaze = new co.doubleduck.MagicHaze();
		this._magicHaze.animate();
		this._layerBuildings.addChild(this._magicHaze);
		this._selectedMagic = magic;
		this.addCover();
		this._stageCover.onClick = $bind(this,this.handleMagicActivated);
	}
	,handleMagicSelected: function(selection) {
		this._magicButton.mouseEnabled = true;
		var magic = null;
		var _g = 0, _g1 = this._availableMagic;
		while(_g < _g1.length) {
			var availMagic = _g1[_g];
			++_g;
			if(availMagic.getType() == selection.getType()) {
				magic = availMagic;
				break;
			}
		}
		this.magicSelected(magic);
	}
	,handleMagicClicked: function() {
		var buttons = [];
		var _g1 = 0, _g = this._magicData.length;
		while(_g1 < _g) {
			var magicIndex = _g1++;
			var currMagic = this._magicData[magicIndex];
			var unlocked = (currMagic.unlockLevel | 0) <= co.doubleduck.Persistence.getUnlockedLevel();
			var magicString = currMagic.type;
			var imageUrl = "images/session/ui/magic/" + magicString.toLowerCase() + "_button.png";
			if(!unlocked) imageUrl = "images/session/ui/btn_locked.png";
			var cooldownRemain = 0;
			var cooldownTotal = 0;
			var magicType = Type.createEnum(co.doubleduck.actors.MagicType,magicString.toUpperCase());
			if(this._availableMagic != null) {
				var _g2 = 0, _g3 = this._availableMagic;
				while(_g2 < _g3.length) {
					var magic = _g3[_g2];
					++_g2;
					if(magic.getType() == magicType) {
						cooldownRemain = magic.cooldownRemaining();
						cooldownTotal = magic.cooldownTotal();
						break;
					}
				}
			}
			var ctxButton = new co.doubleduck.ui.ContextButton(imageUrl,unlocked,0,"",true,cooldownRemain,cooldownTotal);
			ctxButton.setType(magicType);
			buttons.push(ctxButton);
		}
		var center = new createjs.Point(this._magicButton.x + 30,this._magicButton.y + 30);
		var menu = co.doubleduck.ui.ContextMenu.getMenu(center,buttons,true);
		menu.onSelectionMade = $bind(this,this.handleMagicSelected);
		menu.onClose = $bind(this,this.handleMagicMenuClosed);
		this._magicButton.mouseEnabled = false;
	}
	,addUI: function() {
		this._magicButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/magic/magic_button.png"));
		this._layerUI.addChild(this._magicButton);
		this._magicButton.x = co.doubleduck.BaseGame.getScreenSize().width * 0.83;
		this._magicButton.y = co.doubleduck.BaseGame.getScreenSize().height * 0.88;
		this._magicButton.onClick = $bind(this,this.handleMagicClicked);
		this._hud = new co.doubleduck.ui.HUD();
		this._hud.onPauseBtnClick = $bind(this,this.handlePauseBtnClick);
		this._layerUI.addChild(this._hud);
		this.updateHud();
	}
	,_background: null
	,_sessionEnded: null
	,_levelData: null
	,_wavesFinished: null
	,_totalWaveCount: null
	,_currWaveNum: null
	,_baseHp: null
	,_currBalance: null
	,_hud: null
	,_waveLocations: null
	,_stageCover: null
	,_magicButton: null
	,_layerUI: null
	,_layerBuildings: null
	,_groundEnemies: null
	,_flyingEnemies: null
	,_layerMap: null
	,_magicData: null
	,_magicHaze: null
	,_selectedMagic: null
	,_availableMagic: null
	,_wm: null
	,_levelNum: null
	,_towers: null
	,_enemies: null
	,__class__: co.doubleduck.Session
});
co.doubleduck.SoundType = $hxClasses["co.doubleduck.SoundType"] = { __ename__ : ["co","doubleduck","SoundType"], __constructs__ : ["WEB_AUDIO","AUDIO_FX","AUDIO_NO_OVERLAP","HOWLER","NONE"] }
co.doubleduck.SoundType.WEB_AUDIO = ["WEB_AUDIO",0];
co.doubleduck.SoundType.WEB_AUDIO.toString = $estr;
co.doubleduck.SoundType.WEB_AUDIO.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_FX = ["AUDIO_FX",1];
co.doubleduck.SoundType.AUDIO_FX.toString = $estr;
co.doubleduck.SoundType.AUDIO_FX.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP = ["AUDIO_NO_OVERLAP",2];
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.toString = $estr;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.HOWLER = ["HOWLER",3];
co.doubleduck.SoundType.HOWLER.toString = $estr;
co.doubleduck.SoundType.HOWLER.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.NONE = ["NONE",4];
co.doubleduck.SoundType.NONE.toString = $estr;
co.doubleduck.SoundType.NONE.__enum__ = co.doubleduck.SoundType;
if(!co.doubleduck.audio) co.doubleduck.audio = {}
co.doubleduck.audio.AudioAPI = $hxClasses["co.doubleduck.audio.AudioAPI"] = function() { }
co.doubleduck.audio.AudioAPI.__name__ = ["co","doubleduck","audio","AudioAPI"];
co.doubleduck.audio.AudioAPI.prototype = {
	setVolume: null
	,pause: null
	,stop: null
	,playMusic: null
	,playEffect: null
	,init: null
	,__class__: co.doubleduck.audio.AudioAPI
}
co.doubleduck.audio.WebAudioAPI = $hxClasses["co.doubleduck.audio.WebAudioAPI"] = function(src) {
	this._src = src;
	this.loadAudioFile(this._src);
};
co.doubleduck.audio.WebAudioAPI.__name__ = ["co","doubleduck","audio","WebAudioAPI"];
co.doubleduck.audio.WebAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.WebAudioAPI.context = null;
co.doubleduck.audio.WebAudioAPI.webAudioInit = function() {
	//co.doubleduck.audio.WebAudioAPI.context = new webkitAudioContext();
	co.doubleduck.audio.WebAudioAPI.context = new AudioContext();
}
co.doubleduck.audio.WebAudioAPI.saveBuffer = function(buffer,name) {
	co.doubleduck.audio.WebAudioAPI._buffers[name] = buffer;
}
co.doubleduck.audio.WebAudioAPI.decodeError = function() {
	null;
}
co.doubleduck.audio.WebAudioAPI.prototype = {
	setVolume: function(volume) {
		if(this._gainNode != null) this._gainNode.gain.value = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._source != null) this._source.stop(0);
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playBuffer: function(name,loop) {
		if(loop == null) loop = false;
		if(this._gainNode == null) {
			//this._gainNode = co.doubleduck.audio.WebAudioAPI.context.createGainNode();
			this._gainNode = co.doubleduck.audio.WebAudioAPI.context.createGain();
			this._gainNode.connect(co.doubleduck.audio.WebAudioAPI.context.destination);
		}
		this._buffer = Reflect.getProperty(co.doubleduck.audio.WebAudioAPI._buffers,this._src);
		if(this._buffer == null) return;
		this._source = co.doubleduck.audio.WebAudioAPI.context.createBufferSource();
		this._source.buffer = this._buffer;
		this._source.loop = loop;
		this._source.connect(this._gainNode);
		this._source.start(0);
	}
	,loadAudioFile: function(src) {
		var request = new XMLHttpRequest();
		request.open("get",src,true);
		request.responseType = "arraybuffer";
		request.onload = function() { co.doubleduck.audio.WebAudioAPI.context.decodeAudioData(request.response, function(decodedBuffer) { buffer = decodedBuffer; co.doubleduck.audio.WebAudioAPI.saveBuffer(buffer,src); }, co.doubleduck.audio.WebAudioAPI.decodeError) }
		request.send();
	}
	,init: function() {
	}
	,_source: null
	,_gainNode: null
	,_buffer: null
	,_src: null
	,__class__: co.doubleduck.audio.WebAudioAPI
}
co.doubleduck.SoundManager = $hxClasses["co.doubleduck.SoundManager"] = function() {
};
co.doubleduck.SoundManager.__name__ = ["co","doubleduck","SoundManager"];
co.doubleduck.SoundManager.engineType = null;
co.doubleduck.SoundManager.EXTENSION = null;
co.doubleduck.SoundManager.getPersistedMute = function() {
	var mute = co.doubleduck.BasePersistence.getValue("mute");
	if(mute == "0") {
		mute = "false";
		co.doubleduck.SoundManager.setPersistedMute(false);
	}
	return mute == "true";
}
co.doubleduck.SoundManager.setPersistedMute = function(mute) {
	var val = "true";
	if(!mute) val = "false";
	co.doubleduck.BasePersistence.setValue("mute",val);
}
co.doubleduck.SoundManager.isSoundAvailable = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	var isChrome = /Chrome/.test(navigator.userAgent);
	var isMobile = /Mobile/.test(navigator.userAgent);
	var isAndroid = /Android/.test(navigator.userAgent);
	var isAndroid4 = /Android 4/.test(navigator.userAgent);
	var isSafari = /Safari/.test(navigator.userAgent);
	var agent = navigator.userAgent;
	var reg = new EReg("iPhone OS 6","");
	var isIOS6 = reg.match(agent) && isSafari && isMobile;
	var isIpad = /iPad/.test(navigator.userAgent);
	isIpad = isIpad && /OS 6/.test(navigator.userAgent);
	isIOS6 = isIOS6 || isIpad;
	if(isFirefox) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_FX;
		co.doubleduck.SoundManager.EXTENSION = ".ogg";
		return true;
	}
	if(isChrome && (!isAndroid && !isMobile)) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".ogg";
		return true;
	}
	co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.NONE;
	co.doubleduck.BasePersistence.initVar("mute");
	return false;
}
co.doubleduck.SoundManager.mute = function(persisted) {
	if(persisted == null) persisted = true;
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = true;
	var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
	while(_g1 < _g) {
		var currSound = _g1++;
		var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
		if(mySound != null) mySound.setVolume(0);
	}
	if(persisted) co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.unmute = function(persisted) {
	if(persisted == null) persisted = true;
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = false;
	try {
		var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
		while(_g1 < _g) {
			var currSound = _g1++;
			var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
			if(mySound != null) mySound.setVolume(1);
		}
	} catch( e ) {
		null;
	}
	if(persisted) co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.toggleMute = function() {
	if(co.doubleduck.SoundManager._muted) co.doubleduck.SoundManager.unmute(); else co.doubleduck.SoundManager.mute();
}
co.doubleduck.SoundManager.isMuted = function() {
	co.doubleduck.SoundManager._muted = co.doubleduck.SoundManager.getPersistedMute();
	return co.doubleduck.SoundManager._muted;
}
co.doubleduck.SoundManager.getAudioInstance = function(src) {
	if(!co.doubleduck.SoundManager.available) return new co.doubleduck.audio.DummyAudioAPI();
	src += co.doubleduck.SoundManager.EXTENSION;
	var audio = Reflect.getProperty(co.doubleduck.SoundManager._cache,src);
	if(audio == null) {
		switch( (co.doubleduck.SoundManager.engineType)[1] ) {
		case 1:
			audio = new co.doubleduck.audio.AudioFX(src);
			break;
		case 0:
			audio = new co.doubleduck.audio.WebAudioAPI(src);
			break;
		case 2:
			audio = new co.doubleduck.audio.NonOverlappingAudio(src);
			break;
		case 3:
			audio = new co.doubleduck.audio.HowlerAudio(src);
			break;
		case 4:
			return new co.doubleduck.audio.DummyAudioAPI();
		}
		Reflect.setProperty(co.doubleduck.SoundManager._cache,src,audio);
	}
	return audio;
}
co.doubleduck.SoundManager.playEffect = function(src,volume,optional) {
	if(optional == null) optional = false;
	if(volume == null) volume = 1;
	if(optional && co.doubleduck.SoundManager.engineType == co.doubleduck.SoundType.AUDIO_NO_OVERLAP) return new co.doubleduck.audio.DummyAudioAPI();
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playEffect(playVolume);
	return audio;
}
co.doubleduck.SoundManager.playMusic = function(src,volume,loop) {
	if(loop == null) loop = true;
	if(volume == null) volume = 1;
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playMusic(playVolume,loop);
	return audio;
}
co.doubleduck.SoundManager.initSound = function(src) {
	co.doubleduck.SoundManager.getAudioInstance(src);
}
co.doubleduck.SoundManager.prototype = {
	__class__: co.doubleduck.SoundManager
}
co.doubleduck.Splash = $hxClasses["co.doubleduck.Splash"] = function() {
	createjs.Container.call(this);
	this._background = co.doubleduck.Utils.getCenteredImage("images/splash/bg1.png");
	this._background.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this._background.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
	this.addChild(this._background);
	this._background.mouseEnabled = true;
	this._sun = co.doubleduck.BaseAssets.getImage("images/splash/sun.png");
	this._sun.x = co.doubleduck.BaseGame.getScreenSize().width * 0.3;
	this._sun.y = 0;
	this.addChild(this._sun);
	this._background2 = co.doubleduck.Utils.getCenteredImage("images/splash/bg2.png");
	this._background2.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this._background2.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
	this._background2.visible = false;
	this._background2.alpha = 0;
	this.addChild(this._background2);
	this._enemies2 = co.doubleduck.BaseAssets.getImage("images/splash/enemies2.png");
	this._enemies2.regY = this._enemies2.image.height;
	this._enemies2.regX = this._enemies2.image.width / 2;
	this._enemies2.y = co.doubleduck.BaseGame.getScreenSize().height + 100;
	this._enemies2.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this.addChild(this._enemies2);
	this._enemies2.alpha = 0;
	this._enemies1 = co.doubleduck.BaseAssets.getImage("images/splash/enemies1.png");
	this._enemies1.regY = this._enemies1.image.height;
	this._enemies1.regX = this._enemies1.image.width / 2;
	this._enemies1.y = co.doubleduck.BaseGame.getScreenSize().height + 100;
	this._enemies1.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this.addChild(this._enemies1);
	this._enemies1.alpha = 0;
	this._hill = co.doubleduck.BaseAssets.getImage("images/splash/hill.png");
	this._hill.regY = this._hill.image.height;
	this._hill.y = co.doubleduck.BaseGame.getScreenSize().height + this._hill.image.height * 0.5;
	this.addChild(this._hill);
	this._logo = co.doubleduck.Utils.getCenteredImage("images/splash/logo.png");
	this.addChild(this._logo);
	this._logo.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this._logo.y = -this._logo.image.width / 2;
	this._cannon = co.doubleduck.BaseAssets.getImage("images/splash/cannon.png");
	this._cannon.regX = this._cannon.image.width;
	this._cannon.regY = this._cannon.image.height;
	this.addChild(this._cannon);
	this._cannon.x = co.doubleduck.BaseGame.getScreenSize().width + this._cannon.image.width;
	this._cannon.y = co.doubleduck.BaseGame.getScreenSize().height + this._cannon.image.height;
	this._arrow1 = co.doubleduck.BaseAssets.getImage("images/splash/arrow1.png");
	this._arrow1.regY = this._arrow1.image.height * 0.8;
	this._arrow1.y = co.doubleduck.BaseGame.getScreenSize().height + this._arrow1.image.height;
	this._arrow1.x -= 50;
	this.addChild(this._arrow1);
	this._arrow2 = co.doubleduck.BaseAssets.getImage("images/splash/arrow2.png");
	this._arrow2.regX = this._arrow2.image.width * 0.4;
	this._arrow2.regY = this._arrow2.image.height + 100;
	this._arrow2.y = co.doubleduck.BaseGame.getScreenSize().height + 100;
	this._arrow2.x -= this._arrow2.image.width;
	this.addChild(this._arrow2);
	this._fadedText = co.doubleduck.Utils.getCenteredImage("images/splash/tap_to_play.png");
	this._fadedText.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	this._fadedText.y = co.doubleduck.BaseGame.getScreenSize().height * 0.9;
	this.addChild(this._fadedText);
	this._fadedText.alpha = 0;
	this.showHill();
	this.moveSun();
};
co.doubleduck.Splash.__name__ = ["co","doubleduck","Splash"];
co.doubleduck.Splash.__super__ = createjs.Container;
co.doubleduck.Splash.prototype = $extend(createjs.Container.prototype,{
	showTapToPlay: function() {
		this.onClick = $bind(this,this.handleClick);
		this.alphaFade(this._fadedText);
	}
	,transformBackground: function() {
		this._background2.visible = true;
		createjs.Tween.get(this._background2).to({ alpha : 1},300,createjs.Ease.sineOut).wait(150).call($bind(this,this.showLogo)).wait(600).call($bind(this,this.showTapToPlay));
	}
	,showLogo: function() {
		createjs.Tween.get(this._logo).to({ y : co.doubleduck.BaseGame.getScreenSize().height * 0.19},500,createjs.Ease.sineOut).to({ y : co.doubleduck.BaseGame.getScreenSize().height * 0.17},300,createjs.Ease.sineOut);
	}
	,showWeapons: function() {
		this.showCannon();
		this.showFirstArrow();
		this.showSecondArrow();
	}
	,showSecondEnemies: function() {
		this._enemies2.alpha = 1;
		this._enemies2.scaleX = this._enemies2.scaleY = 0.8;
		createjs.Tween.get(this._enemies2).wait(200).to({ scaleX : 1, scaleY : 1, y : co.doubleduck.BaseGame.getScreenSize().height},800,createjs.Ease.sineOut).call($bind(this,this.showWeapons));
	}
	,showFirstEnemies: function() {
		this._enemies1.alpha = 1;
		this._enemies1.scaleX = this._enemies1.scaleY = 0.8;
		createjs.Tween.get(this._enemies1).call($bind(this,this.showSecondEnemies)).to({ scaleX : 1, scaleY : 1, y : co.doubleduck.BaseGame.getScreenSize().height},700,createjs.Ease.sineOut);
	}
	,showSecondArrow: function() {
		createjs.Tween.get(this._arrow2).wait(300).to({ x : 0, y : co.doubleduck.BaseGame.getScreenSize().height},200,createjs.Ease.sineOut);
	}
	,showFirstArrow: function() {
		createjs.Tween.get(this._arrow1).wait(200).to({ x : 0, y : co.doubleduck.BaseGame.getScreenSize().height},300,createjs.Ease.sineOut);
	}
	,showCannon: function() {
		createjs.Tween.get(this._cannon).to({ x : co.doubleduck.BaseGame.getScreenSize().width, y : co.doubleduck.BaseGame.getScreenSize().height},500,createjs.Ease.sineOut).call($bind(this,this.transformBackground));
	}
	,showHill: function() {
		createjs.Tween.get(this._hill).to({ y : co.doubleduck.BaseGame.getScreenSize().height},600,createjs.Ease.sineOut).wait(100).call($bind(this,this.showFirstEnemies));
	}
	,moveSun: function() {
		createjs.Tween.get(this._sun).to({ y : this._sun.y - 60},600,createjs.Ease.sineOut);
	}
	,alphaFade: function(fadeElement) {
		if(fadeElement != null && js.Boot.__instanceof(fadeElement,createjs.Bitmap)) this._fadedText = fadeElement; else if(this._fadedText == null) return;
		if(this._fadedText.alpha == 0) createjs.Tween.get(this._fadedText).to({ alpha : 1},750).call($bind(this,this.alphaFade)); else if(this._fadedText.alpha == 1) createjs.Tween.get(this._fadedText).to({ alpha : 0},1500).call($bind(this,this.alphaFade));
	}
	,handleClick: function(e) {
		if(this.onTap != null) this.onTap();
	}
	,_fadedText: null
	,_logo: null
	,_cannon: null
	,_arrow2: null
	,_arrow1: null
	,_enemies2: null
	,_enemies1: null
	,_hill: null
	,_sun: null
	,_background2: null
	,_background: null
	,onTap: null
	,__class__: co.doubleduck.Splash
});
co.doubleduck.TowerSlot = $hxClasses["co.doubleduck.TowerSlot"] = function() {
	createjs.Bitmap.call(this,co.doubleduck.BaseAssets.getRawImage("images/session/slot.png"));
	this.onPress = $bind(this,this.handleSlotClicked);
	this.enable();
	this.regX = this.image.width / 2;
	this.regY = this.image.height / 2;
};
co.doubleduck.TowerSlot.__name__ = ["co","doubleduck","TowerSlot"];
co.doubleduck.TowerSlot.__super__ = createjs.Bitmap;
co.doubleduck.TowerSlot.prototype = $extend(createjs.Bitmap.prototype,{
	handleContextMenuSelection: function(button) {
		co.doubleduck.Session.getCurrSession().getHud().hideDesc();
		var towerType = button.getType();
		if(this.onBuildingClicked != null) this.onBuildingClicked(this,towerType);
	}
	,handleContextMenuClose: function() {
		co.doubleduck.Session.getCurrSession().getHud().hideDesc();
		this.enable();
	}
	,handleSlotClicked: function(e) {
		this.disable();
		var buttons = [];
		var allTowers = co.doubleduck.DataLoader.getAllTowers();
		var _g1 = 0, _g = allTowers.length;
		while(_g1 < _g) {
			var towerIndex = _g1++;
			var towerData = allTowers[towerIndex];
			var towerTypeString = towerData.type;
			var imageUrl = "images/session/ui/towers/" + towerTypeString.toLowerCase() + "/0.png";
			var towerAvailable = (towerData.unlockLevel | 0) <= co.doubleduck.Persistence.getUnlockedLevel();
			if(!towerAvailable) imageUrl = "images/session/ui/btn_locked.png";
			var towerPrice = towerData.purchasePrice[0] | 0;
			var descUrl = "images/session/ui/description/towers/" + towerTypeString.toLowerCase() + ".png";
			var ctxButton = new co.doubleduck.ui.ContextButton(imageUrl,towerAvailable,towerPrice,descUrl);
			var towerType = Type.createEnum(co.doubleduck.actors.TowerType,towerTypeString.toUpperCase());
			ctxButton.setType(towerType);
			buttons.push(ctxButton);
		}
		var menu = co.doubleduck.ui.ContextMenu.getMenu(new createjs.Point(this.x,this.y),buttons);
		menu.onClose = $bind(this,this.handleContextMenuClose);
		menu.onSelectionMade = $bind(this,this.handleContextMenuSelection);
	}
	,disable: function() {
		this.mouseEnabled = false;
	}
	,enable: function() {
		this.mouseEnabled = true;
	}
	,onBuildingClicked: null
	,__class__: co.doubleduck.TowerSlot
});
co.doubleduck.Transition = $hxClasses["co.doubleduck.Transition"] = function() {
	createjs.Container.call(this);
	if(co.doubleduck.Transition._allowInstantiation == false) return;
	this.name = "Transition";
	this._blackOverlay = new createjs.Shape();
	this._blackOverlay.graphics.beginFill("#000000");
	this._blackOverlay.graphics.drawRect(0,0,co.doubleduck.BaseGame.getScreenSize().width,co.doubleduck.BaseGame.getScreenSize().height);
	this._blackOverlay.graphics.endFill();
	this.addChild(this._blackOverlay);
	this._blackOverlay.alpha = 0;
};
co.doubleduck.Transition.__name__ = ["co","doubleduck","Transition"];
co.doubleduck.Transition._instance = null;
co.doubleduck.Transition.getInstance = function() {
	co.doubleduck.Transition._allowInstantiation = true;
	if(co.doubleduck.Transition._instance != null) return co.doubleduck.Transition._instance;
	var instance = new co.doubleduck.Transition();
	co.doubleduck.Transition._instance = instance;
	return instance;
}
co.doubleduck.Transition.transitionIn = function() {
	if(co.doubleduck.Transition._instance == null) return;
	co.doubleduck.Transition._instance._blackOverlay.alpha = 1;
	createjs.Tween.get(co.doubleduck.Transition._instance._blackOverlay).to({ alpha : 0},1000);
}
co.doubleduck.Transition.transitionOut = function(handler,params) {
	if(co.doubleduck.Transition._instance == null) return;
	co.doubleduck.Transition._instance._blackOverlay.alpha = 0;
	createjs.Tween.get(co.doubleduck.Transition._instance._blackOverlay).to({ alpha : 1},500).call(handler,params);
}
co.doubleduck.Transition.__super__ = createjs.Container;
co.doubleduck.Transition.prototype = $extend(createjs.Container.prototype,{
	_blackOverlay: null
	,__class__: co.doubleduck.Transition
});
co.doubleduck.Utils = $hxClasses["co.doubleduck.Utils"] = function() { }
co.doubleduck.Utils.__name__ = ["co","doubleduck","Utils"];
co.doubleduck.Utils.dateDeltaInDays = function(day1,day2) {
	var delta = Math.abs(day2.getTime() - day1.getTime());
	return delta / 86400000;
}
co.doubleduck.Utils.getTodayDate = function() {
	var newDate = new Date();
	return HxOverrides.dateStr(newDate);
}
co.doubleduck.Utils.getHour = function() {
	var newDate = new Date();
	return newDate.getHours();
}
co.doubleduck.Utils.rectOverlap = function(r1,r2) {
	var r1TopLeft = new createjs.Point(r1.x,r1.y);
	var r1BottomRight = new createjs.Point(r1.x + r1.width,r1.y + r1.height);
	var r1TopRight = new createjs.Point(r1.x + r1.width,r1.y);
	var r1BottomLeft = new createjs.Point(r1.x,r1.y + r1.height);
	var r2TopLeft = new createjs.Point(r2.x,r2.y);
	var r2BottomRight = new createjs.Point(r2.x + r2.width,r2.y + r2.height);
	var r2TopRight = new createjs.Point(r2.x + r2.width,r2.y);
	var r2BottomLeft = new createjs.Point(r2.x,r2.y + r2.height);
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1BottomLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2BottomLeft)) return true;
	return false;
}
co.doubleduck.Utils.overlap = function(obj1,obj1Width,obj1Height,obj2,obj2Width,obj2Height) {
	var o1TopLeft = new createjs.Point(obj1.x - obj1.regX * co.doubleduck.BaseGame.getScale(),obj1.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1BottomRight = new createjs.Point(o1TopLeft.x - obj1.regX * co.doubleduck.BaseGame.getScale() + obj1Width * co.doubleduck.BaseGame.getScale(),o1TopLeft.y + obj1Height * co.doubleduck.BaseGame.getScale() - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1TopRight = new createjs.Point(o1BottomRight.x - obj1.regX * co.doubleduck.BaseGame.getScale(),o1TopLeft.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1BottomLeft = new createjs.Point(o1TopLeft.x - obj1.regX * co.doubleduck.BaseGame.getScale(),o1BottomRight.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o2TopLeft = new createjs.Point(obj2.x - obj2.regX * co.doubleduck.BaseGame.getScale(),obj2.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2BottomRight = new createjs.Point(o2TopLeft.x + obj2Width * co.doubleduck.BaseGame.getScale() - obj2.regX * co.doubleduck.BaseGame.getScale(),o2TopLeft.y + obj2Height * co.doubleduck.BaseGame.getScale() - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2TopRight = new createjs.Point(o2BottomRight.x - obj2.regX * co.doubleduck.BaseGame.getScale(),o2TopLeft.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2BottomLeft = new createjs.Point(o2TopLeft.x - obj2.regX * co.doubleduck.BaseGame.getScale(),o2BottomRight.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1BottomLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2BottomLeft)) return true;
	return false;
}
co.doubleduck.Utils.rectContainPoint = function(rectTopLeft,rectBottomRight,point) {
	return point.x >= rectTopLeft.x && point.x <= rectBottomRight.x && point.y >= rectTopLeft.y && point.y <= rectBottomRight.y;
}
co.doubleduck.Utils.objectContains = function(dyn,memberName) {
	return Reflect.hasField(dyn,memberName);
}
co.doubleduck.Utils.contains = function(arr,obj) {
	var _g = 0;
	while(_g < arr.length) {
		var element = arr[_g];
		++_g;
		if(element == obj) return true;
	}
	return false;
}
co.doubleduck.Utils.isMobileFirefox = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	return isFirefox && viewporter.ACTIVE;
}
co.doubleduck.Utils.get = function(x,y,tiles,columns) {
	return tiles[columns * y + x];
}
co.doubleduck.Utils.getBitmapLabel = function(label,fontType,padding) {
	if(padding == null) padding = 0;
	if(fontType == null) fontType = "";
	var fontHelper = new co.doubleduck.FontHelper(fontType);
	var bitmapText = fontHelper.getNumber(Std.parseInt(label),1,true,null,padding);
	return bitmapText;
}
co.doubleduck.Utils.concatWithoutDuplicates = function(array,otherArray) {
	var _g = 0;
	while(_g < otherArray.length) {
		var element = otherArray[_g];
		++_g;
		co.doubleduck.Utils.addToArrayWithoutDuplicates(array,element);
	}
	return array;
}
co.doubleduck.Utils.addToArrayWithoutDuplicates = function(array,element) {
	var _g = 0;
	while(_g < array.length) {
		var currElement = array[_g];
		++_g;
		if(currElement == element) return array;
	}
	array.push(element);
	return array;
}
co.doubleduck.Utils.getImageData = function(image) {
	var ctx = co.doubleduck.Utils.getCanvasContext();
	var img = co.doubleduck.BaseAssets.getImage(image);
	ctx.drawImage(img.image,0,0);
	return ctx.getImageData(0,0,img.image.width,img.image.height);
}
co.doubleduck.Utils.getCanvasContext = function() {
	var dom = js.Lib.document.createElement("Canvas");
	var canvas = dom;
	return canvas.getContext("2d");
}
co.doubleduck.Utils.joinArrays = function(a1,a2) {
	var arr = a1.slice();
	var _g = 0;
	while(_g < a2.length) {
		var el = a2[_g];
		++_g;
		arr.push(el);
	}
	return arr;
}
co.doubleduck.Utils.getRandomElement = function(arr) {
	return arr[Std.random(arr.length)];
}
co.doubleduck.Utils.splitArray = function(arr,parts) {
	var arrs = new Array();
	var _g = 0;
	while(_g < parts) {
		var p = _g++;
		arrs.push(new Array());
	}
	var currArr = 0;
	while(arr.length > 0) {
		arrs[currArr].push(arr.pop());
		currArr++;
		currArr %= parts;
	}
	return arrs;
}
co.doubleduck.Utils.map = function(value,aMin,aMax,bMin,bMax) {
	if(bMax == null) bMax = 1;
	if(bMin == null) bMin = 0;
	if(value <= aMin) return bMin;
	if(value >= aMax) return bMax;
	return (value - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
co.doubleduck.Utils.waitAndCall = function(parent,delay,func,args) {
	createjs.Tween.get(parent).wait(delay).call(func,args);
}
co.doubleduck.Utils.tintBitmap = function(src,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	var colorFilter = new createjs.ColorFilter(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
	src.cache(src.x,src.y,src.image.width,src.image.height);
	src.filters = [colorFilter];
	src.updateCache();
}
co.doubleduck.Utils.containBitmaps = function(bitmapList,spacing,isRow,dims) {
	if(isRow == null) isRow = true;
	if(spacing == null) spacing = 0;
	var totalWidth = 0;
	var totalHeight = 0;
	var result = new createjs.Container();
	var _g1 = 0, _g = bitmapList.length;
	while(_g1 < _g) {
		var currBitmap = _g1++;
		var bmp = bitmapList[currBitmap];
		bmp.regY = bmp.image.height / 2;
		if(currBitmap != 0) {
			if(isRow) {
				bmp.x = bitmapList[currBitmap - 1].x + bitmapList[currBitmap - 1].image.width + spacing;
				if(bmp.image.height > totalHeight) totalHeight = bmp.image.height;
				totalWidth += bmp.image.width + spacing;
			} else {
				bmp.y = bitmapList[currBitmap - 1].y + bitmapList[currBitmap - 1].image.height + spacing;
				if(bmp.image.width > totalWidth) totalWidth = bmp.image.width;
				totalHeight += bmp.image.height + spacing;
			}
		} else {
			totalWidth = bmp.image.width;
			totalHeight = bmp.image.height;
		}
		result.addChild(bmp);
	}
	result.regX = totalWidth / 2;
	result.regY = totalHeight / 2;
	if(dims != null) {
		dims.width = totalWidth;
		dims.height = totalHeight;
	}
	return result;
}
co.doubleduck.Utils.getCenteredImage = function(name,scaleToGame) {
	if(scaleToGame == null) scaleToGame = false;
	var img = co.doubleduck.BaseAssets.getImage(name);
	img.regX = img.image.width / 2;
	img.regY = img.image.height / 2;
	if(scaleToGame) img.scaleX = img.scaleY = co.doubleduck.BaseGame.getScale();
	return img;
}
co.doubleduck.Utils.setCenterReg = function(bmp) {
	bmp.regX = bmp.image.width / 2;
	bmp.regY = bmp.image.height / 2;
}
co.doubleduck.Utils.shuffleArray = function(arr) {
	var tmp, j, i = arr.length;
	while(i > 0) {
		j = Math.random() * i | 0;
		tmp = arr[--i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
}
co.doubleduck.Utils.scaleObject = function(obj) {
	obj.scaleX = obj.scaleY = co.doubleduck.BaseGame.getScale();
}
co.doubleduck.Utils.getRectangle = function(rect,color) {
	var ret = new createjs.Shape();
	ret.graphics.beginFill(color);
	ret.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
	ret.graphics.endFill();
	return ret;
}
co.doubleduck.Utils.getDistance = function(p1,p2) {
	var distX = p1.x - p2.x;
	var distY = p1.y - p2.y;
	var dist = Math.sqrt(distX * distX + distY * distY);
	return dist;
}
co.doubleduck.Utils.average = function(arr) {
	var sum = 0;
	var _g = 0;
	while(_g < arr.length) {
		var i = arr[_g];
		++_g;
		sum += i;
	}
	return sum / arr.length;
}
co.doubleduck.Utils.radToDeg = function(rad) {
	return rad * 180 / Math.PI;
}
co.doubleduck.Utils.degToRad = function(deg) {
	return deg * Math.PI / 180;
}
co.doubleduck.Utils.sign = function(num) {
	if(num < 0) return -1; else if(num > 0) return 1;
	return 0;
}
co.doubleduck.Utils.loadSpriteSheet = function(imgPath,numberOfFrames,animName,animFrequency,centerReg) {
	if(centerReg == null) centerReg = true;
	if(animFrequency == null) animFrequency = 1;
	var ret;
	var data = { };
	var img = co.doubleduck.BaseAssets.getRawImage(imgPath);
	var numFrames = numberOfFrames;
	var imageHeight = 0;
	var imageWidth = 0;
	if(img.width > img.height) {
		imageWidth = img.width / numFrames;
		imageHeight = img.height;
	} else {
		imageHeight = img.height / numFrames;
		imageWidth = img.width;
	}
	if(centerReg) data.frames = { width : imageWidth, height : imageHeight, regX : imageWidth / 2, regY : imageHeight / 2}; else data.frames = { width : imageWidth, height : imageHeight};
	data.images = [img];
	data.animations = { };
	var framesArr = [];
	var _g = 0;
	while(_g < numFrames) {
		var i = _g++;
		framesArr.push(i);
	}
	data[animName] = { frames : framesArr, frequency : 5};
	ret = new createjs.SpriteSheet(data);
	return ret;
}
co.doubleduck.WaveManager = $hxClasses["co.doubleduck.WaveManager"] = function(levelId) {
	this._isActive = false;
	this._waveData = co.doubleduck.DataLoader.getLevelById(levelId).waves;
	this._wavesAnounced = new Array();
	var _g1 = 0, _g = this._waveData.length;
	while(_g1 < _g) {
		var waveNum = _g1++;
		this._wavesAnounced[waveNum] = false;
	}
};
co.doubleduck.WaveManager.__name__ = ["co","doubleduck","WaveManager"];
co.doubleduck.WaveManager.prototype = {
	spawnNextGroup: function() {
		this._currentWaveDispatchedGroup += 1;
		var groupData = this._waveData[this._currentWave - 1].enemyGroups[this._currentWaveDispatchedGroup - 1];
		var _g1 = 0, _g = groupData.amount;
		while(_g1 < _g) {
			var enemyTypeIndex = _g1++;
			var enemyTypeString = groupData.enemyType;
			var type = Type.createEnum(co.doubleduck.actors.EnemyType,enemyTypeString.toUpperCase());
			var enemy = co.doubleduck.actors.Enemy.create(type);
			enemy.setRouteId(groupData.routeId);
			if(this.onSpawnEnemy != null) {
				var delay = groupData.spawnInterval;
				delay *= enemyTypeIndex * 1000;
				co.doubleduck.Utils.waitAndCall(this,delay | 0,this.onSpawnEnemy,[enemy]);
			}
		}
		var groupCount = this._waveData[this._currentWave - 1].enemyGroups.length;
		if(this._currentWaveDispatchedGroup == groupCount && this._currentWave == this._waveData.length) {
			if(this.onAllWavesFinished != null) {
				var delay = groupData.spawnInterval;
				delay *= (groupCount - 1) * 1000;
				co.doubleduck.Utils.waitAndCall(this,delay | 0,this.onAllWavesFinished);
			}
		}
	}
	,startNextWave: function() {
		this._currentWaveDispatchedGroup = 0;
		this._currentWave += 1;
		this._currWaveStartTime = createjs.Ticker.getTime(true);
		if(this.onWaveStart != null) this.onWaveStart(this._currentWave);
	}
	,getWaveCount: function() {
		return this._waveData.length;
	}
	,stop: function() {
		this._isActive = false;
		createjs.Ticker.removeListener(this);
		createjs.Tween.removeTweens(this);
	}
	,forceNextWave: function() {
		this.startNextWave();
	}
	,start: function() {
		this._currentWave = 0;
		this._currWaveStartTime = createjs.Ticker.getTime(true);
		this._isActive = true;
		createjs.Ticker.addListener(this);
	}
	,tick: function() {
		var now = createjs.Ticker.getTime(true);
		var nextWave = this._currentWave + 1;
		if(nextWave <= (this._waveData.length | 0)) {
			var nextWaveTime = this._currWaveStartTime + this._waveData[nextWave - 1].startTime * 1000;
			var waveTimeDelta = nextWaveTime - now;
			if(waveTimeDelta < 0) this.startNextWave(); else if(!this._wavesAnounced[nextWave - 1] && waveTimeDelta < this._waveData[nextWave - 1].noticeTime * 1000) {
				this._wavesAnounced[nextWave - 1] = true;
				if(this.onNextWavePending != null) {
					var routeIds = [];
					var _g1 = 0, _g = this._waveData[nextWave - 1].enemyGroups.length;
					while(_g1 < _g) {
						var waveGroup = _g1++;
						var groupRoute = this._waveData[nextWave - 1].enemyGroups[waveGroup].routeId | 0;
						routeIds.push(groupRoute);
					}
					this.onNextWavePending(waveTimeDelta,routeIds);
				}
			}
		}
		if(this._currentWave == 0) return;
		var nextEnemyGroup = this._currentWaveDispatchedGroup + 1;
		if(nextEnemyGroup <= (this._waveData[this._currentWave - 1].enemyGroups.length | 0)) {
			var nextDispatchTime = this._currWaveStartTime + (this._waveData[this._currentWave - 1].enemyGroups[nextEnemyGroup - 1].spawnTime | 0) * 1000;
			var dispatchDelta = nextDispatchTime - now;
			dispatchDelta /= 1000;
			if(dispatchDelta < 0) this.spawnNextGroup();
		}
	}
	,_currWaveStartTime: null
	,_wavesAnounced: null
	,_waveData: null
	,_currentWaveDispatchedGroup: null
	,_currentWave: null
	,_isActive: null
	,onNextWavePending: null
	,onAllWavesFinished: null
	,onWaveStart: null
	,onSpawnEnemy: null
	,__class__: co.doubleduck.WaveManager
}
if(!co.doubleduck.interfaces) co.doubleduck.interfaces = {}
co.doubleduck.interfaces.IConstructible = $hxClasses["co.doubleduck.interfaces.IConstructible"] = function() { }
co.doubleduck.interfaces.IConstructible.__name__ = ["co","doubleduck","interfaces","IConstructible"];
co.doubleduck.interfaces.IConstructible.prototype = {
	deconstruct: null
	,construct: null
	,__class__: co.doubleduck.interfaces.IConstructible
}
if(!co.doubleduck.actors) co.doubleduck.actors = {}
co.doubleduck.actors.Tower = $hxClasses["co.doubleduck.actors.Tower"] = function(imageUrl) {
	createjs.Container.call(this);
	this._lastAttackTime = 0;
	this._isActive = false;
	this._radiusDisplay = co.doubleduck.BaseAssets.getImage("images/session/ui/radius.png");
	this.addChild(this._radiusDisplay);
	co.doubleduck.Utils.setCenterReg(this._radiusDisplay);
	this._radiusDisplay.x = co.doubleduck.Map.getInstance().cellSize / 2;
	this._radiusDisplay.y = co.doubleduck.Map.getInstance().cellSize / 2;
	var img;
	var initObject;
	img = co.doubleduck.BaseAssets.getRawImage(imageUrl);
	var imgWidth = this.getTowerWidth();
	var imgHeight = this.getTowerHeight();
	initObject = { };
	initObject.images = [img];
	initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight};
	initObject.animations = { };
	initObject.animations.level0 = { frames : 0, frequency : 1};
	initObject.animations.level1 = { frames : 1, frequency : 1};
	initObject.animations.level2 = { frames : 2, frequency : 1};
	var spritesheet = new createjs.SpriteSheet(initObject);
	this._towerImage = new createjs.BitmapAnimation(spritesheet);
	this._towerImage.y = co.doubleduck.Map.getInstance().cellSize;
	this._towerImage.x = co.doubleduck.Map.getInstance().cellSize / 2;
	this.addChild(this._towerImage);
	this._towerImage.gotoAndStop("level0");
	var data = co.doubleduck.DataLoader.getTowerData(this._type);
	this._currUpgradeLevel = 0;
	this._attackSpeed = data.attackSpeed;
	this._attackRadius = data.attackRadius;
	this._attackCooldown = data.attackCooldown;
	this._attackDamage = data.attackDamage;
	this._attackDamageFactor = 1;
	this._buyingPrice = data.purchasePrice;
	this._sellingPrice = data.sellingRevenue;
	this.drawRadiusDisplay();
	this._isSelected = false;
	this._towerImage.onPress = $bind(this,this.handleTowerClicked);
};
co.doubleduck.actors.Tower.__name__ = ["co","doubleduck","actors","Tower"];
co.doubleduck.actors.Tower.__interfaces__ = [co.doubleduck.interfaces.IConstructible];
co.doubleduck.actors.Tower.create = function(type) {
	if(type == co.doubleduck.actors.TowerType.CANNON) return new co.doubleduck.actors.CannonTower(); else if(type == co.doubleduck.actors.TowerType.ARCHER) return new co.doubleduck.actors.ArcherTower(); else if(type == co.doubleduck.actors.TowerType.WITCH) return new co.doubleduck.actors.WitchTower(); else if(type == co.doubleduck.actors.TowerType.BLOWDART) return new co.doubleduck.actors.BlowdartTower();
	return null;
}
co.doubleduck.actors.Tower.__super__ = createjs.Container;
co.doubleduck.actors.Tower.prototype = $extend(createjs.Container.prototype,{
	getSellingPrice: function() {
		return this._sellingPrice[this._currUpgradeLevel];
	}
	,getPrice: function(level) {
		if(level == null) level = -1;
		if(level > 0) return this._buyingPrice[level];
		return this._buyingPrice[this._currUpgradeLevel];
	}
	,setUnselected: function() {
		this._isSelected = false;
		this.mouseEnabled = true;
		this._radiusDisplay.visible = false;
	}
	,setSelected: function() {
		this._isSelected = true;
		this.mouseEnabled = false;
		this._radiusDisplay.visible = true;
	}
	,deconstruct: function() {
		createjs.Tween.removeTweens(this);
		this.revertDamageFactor();
		this._towerImage.visible = false;
		this.disable();
	}
	,construct: function() {
		this._towerImage.visible = true;
		this.enable();
	}
	,setDamageFactor: function(factor,revertTime) {
		if(this._wardrumIcon == null) this.initWardrum();
		this.addChild(this._wardrumIcon);
		this._wardrumIcon.visible = true;
		this._wardrumIcon.gotoAndPlay("animate");
		this._attackDamageFactor = factor;
		co.doubleduck.Utils.waitAndCall(this,revertTime,$bind(this,this.revertDamageFactor));
	}
	,revertDamageFactor: function() {
		if(this._wardrumIcon != null) {
			this._wardrumIcon.visible = false;
			this.removeChild(this._wardrumIcon);
			this._wardrumIcon.stop();
		}
		this._attackDamageFactor = 1;
	}
	,upgrade: function() {
		this._currUpgradeLevel += 1;
		this._towerImage.gotoAndStop("level" + this._currUpgradeLevel);
		this.drawRadiusDisplay();
		if(this.onUpgrade != null) this.onUpgrade(this);
	}
	,handleContextMenuSelection: function(button) {
		if(button.getType() == "sell") {
			if(this.onSell != null) this.onSell(this,this._sellingPrice[this._currUpgradeLevel]);
		} else if(button.getType() == "upgrade") {
			this.setUnselected();
			this.upgrade();
		}
	}
	,handleContextMenuClose: function() {
		this.setUnselected();
	}
	,handleTowerClicked: function() {
		this.setSelected();
		var buttons = [];
		if(this._currUpgradeLevel < 2) {
			var price = this.getPrice(this._currUpgradeLevel + 1);
			var descUrl = "images/session/ui/description/towers/" + this._type[0].toLowerCase() + (this._currUpgradeLevel + 1) + ".png";
			var upgradeButton = new co.doubleduck.ui.ContextButton("images/session/ui/btn_upgrade.png",true,price,descUrl);
			upgradeButton.setType("upgrade");
			buttons.push(upgradeButton);
		}
		var sellButton = new co.doubleduck.ui.ContextButton("images/session/ui/btn_sell.png",true);
		sellButton.setType("sell");
		buttons.push(sellButton);
		var menu = co.doubleduck.ui.ContextMenu.getMenu(this.getCenterPos(),buttons);
		menu.onSelectionMade = $bind(this,this.handleContextMenuSelection);
		menu.onClose = $bind(this,this.handleContextMenuClose);
	}
	,inflictDamage: function(enemy) {
		enemy.takeHit(this._attackDamage[this._currUpgradeLevel] * this._attackDamageFactor | 0);
	}
	,animateAttack: function(enemy) {
	}
	,getShootingPos: function() {
		var x = this._towerImage.spriteSheet._frameWidth / 2;
		var y = this._towerImage.spriteSheet._frameHeight / 2;
		return new createjs.Point(x,y);
	}
	,attack: function(enemies) {
		var enemyToAttack = enemies[0];
		var progress = co.doubleduck.Map.getInstance().getEnemyProgress(enemyToAttack);
		var _g = 0;
		while(_g < enemies.length) {
			var enemy = enemies[_g];
			++_g;
			var currProgress = co.doubleduck.Map.getInstance().getEnemyProgress(enemy);
			if(currProgress > progress) {
				enemyToAttack = enemy;
				progress = currProgress;
			}
		}
		if(enemyToAttack != null) {
			this.animateAttack(enemyToAttack);
			co.doubleduck.Utils.waitAndCall(null,this._attackSpeed[this._currUpgradeLevel] * 1000,$bind(this,this.inflictDamage),[enemyToAttack]);
		}
	}
	,getCenterPos: function() {
		return new createjs.Point(this.x + co.doubleduck.Map.getInstance().cellSize / 2,this.y + co.doubleduck.Map.getInstance().cellSize / 2);
	}
	,scanForEnemies: function() {
		var now = createjs.Ticker.getTime(true);
		var currInterval = this._attackCooldown[this._currUpgradeLevel];
		if(this._lastAttackTime + currInterval * 1000 > now) return;
		var enemies = co.doubleduck.Session.getCurrSession().getEnemies();
		var attackables = [];
		var _g = 0;
		while(_g < enemies.length) {
			var enemy = enemies[_g];
			++_g;
			var ptThis = this.getCenterPos();
			var ptEnemy = new createjs.Point(enemy.x,enemy.y);
			var dist = co.doubleduck.Helper.getDistance(ptThis,ptEnemy);
			if(dist <= this._attackRadius[this._currUpgradeLevel] && Lambda.indexOf(enemy.getTakesDamageFrom(),this._type) != -1) attackables.push(enemy);
		}
		if(attackables.length > 0) {
			this.attack(attackables);
			this._lastAttackTime = now;
		}
	}
	,handleTick: function() {
		this.scanForEnemies();
	}
	,disable: function() {
		this._isActive = false;
		this.onTick = null;
	}
	,drawRadiusDisplay: function() {
		var radius = this._attackRadius[this._currUpgradeLevel];
		var scale = radius / (this._radiusDisplay.image.width / 2);
		this._radiusDisplay.scaleX = this._radiusDisplay.scaleY = scale;
		this._radiusDisplay.alpha = 0.3;
		this._radiusDisplay.visible = false;
	}
	,enable: function() {
		this._isActive = true;
		this.onTick = $bind(this,this.handleTick);
	}
	,initWardrum: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/session/magic/wardrum.png");
		var imgWidth = 34;
		var imgHeight = 33;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight};
		initObject.animations = { };
		initObject.animations.animate = { frames : [0,1], frequency : 10};
		var spritesheet = new createjs.SpriteSheet(initObject);
		this._wardrumIcon = new createjs.BitmapAnimation(spritesheet);
		this._wardrumIcon.x = this._towerImage.x + 3;
		this._wardrumIcon.y = 0;
	}
	,getTowerHeight: function() {
		return 0;
	}
	,getTowerWidth: function() {
		return 0;
	}
	,_wardrumIcon: null
	,_radiusDisplay: null
	,_towerImage: null
	,_isSelected: null
	,_lastAttackTime: null
	,_isActive: null
	,_currUpgradeLevel: null
	,_type: null
	,_sellingPrice: null
	,_buyingPrice: null
	,_attackSpeed: null
	,_attackRadius: null
	,_attackCooldown: null
	,_attackDamageFactor: null
	,_attackDamage: null
	,onUpgrade: null
	,onSell: null
	,__class__: co.doubleduck.actors.Tower
});
co.doubleduck.actors.ArcherTower = $hxClasses["co.doubleduck.actors.ArcherTower"] = function() {
	this._projectileUri = "images/session/projectiles/archer.png";
	this._type = co.doubleduck.actors.TowerType.ARCHER;
	co.doubleduck.actors.Tower.call(this,"images/session/tiles/towers/archer.png");
	this.construct();
	this.enable();
};
co.doubleduck.actors.ArcherTower.__name__ = ["co","doubleduck","actors","ArcherTower"];
co.doubleduck.actors.ArcherTower.__super__ = co.doubleduck.actors.Tower;
co.doubleduck.actors.ArcherTower.prototype = $extend(co.doubleduck.actors.Tower.prototype,{
	animateAttack: function(enemy) {
		var posInTime = co.doubleduck.Map.getInstance().getVirtualPosition(enemy,this._attackSpeed[this._currUpgradeLevel]);
		if(js.Boot.__instanceof(enemy,co.doubleduck.actors.FlyingEnemy) || js.Boot.__instanceof(enemy,co.doubleduck.actors.ArmedFlyingEnemy)) posInTime.y -= 30;
		var px = posInTime.x;
		var py = posInTime.y;
		var gtl = enemy.parent.localToLocal(px,py,this);
		var proj = co.doubleduck.Utils.getCenteredImage(this._projectileUri);
		this.addChild(proj);
		proj.x = this.getShootingPos().x;
		proj.y = this.getShootingPos().y;
		var distX = gtl.x - proj.x;
		var distY = gtl.y - proj.y;
		var rad = Math.atan2(distX,-distY);
		var angle = rad * 180 / Math.PI;
		proj.rotation = angle;
		createjs.Tween.get(proj).to({ x : gtl.x, y : gtl.y},this._attackSpeed[this._currUpgradeLevel] * 1000,createjs.Ease.sineOut).call($bind(this,this.removeChild),[proj]);
	}
	,getTowerHeight: function() {
		return 49;
	}
	,getTowerWidth: function() {
		return 45;
	}
	,getShootingPos: function() {
		var x = this._towerImage.spriteSheet._frameWidth / 2;
		var y = this._towerImage.spriteSheet._frameHeight / 2 - 10;
		return new createjs.Point(x,y);
	}
	,_projectileUri: null
	,__class__: co.doubleduck.actors.ArcherTower
});
co.doubleduck.actors.Enemy = $hxClasses["co.doubleduck.actors.Enemy"] = function(imageSpritesheet) {
	createjs.Container.call(this);
	this._isActive = false;
	this._isDead = false;
	var data = this.getEnemyData();
	this._hp = data.hp;
	this._currHp = this._hp;
	this._takesDamageFrom = new Array();
	var _g1 = 0, _g = data.takesDamageFrom.length;
	while(_g1 < _g) {
		var currBuildingIndex = _g1++;
		var currBuilding = data.takesDamageFrom[currBuildingIndex];
		var currBuildingType = Type.createEnum(co.doubleduck.actors.TowerType,currBuilding.toUpperCase());
		this._takesDamageFrom.push(currBuildingType);
	}
	this._speed = data.speed;
	this._payout = data.payout;
	this._speedFactor = 1;
	this._damage = data.damage | 0;
	this.initSpritesheet(imageSpritesheet);
	this._enemyImage = new createjs.BitmapAnimation(this._spritesheet);
	this._enemyImage.gotoAndStop("up");
	this.addChild(this._enemyImage);
	this._hpRed = co.doubleduck.BaseAssets.getImage("images/session/enemies/hp_bar_red.png");
	this._hpRed.regX = this._hpRed.image.width / 2;
	this._hpRed.y -= this._enemyImage.spriteSheet._frameHeight / 2 + 7;
	this.addChild(this._hpRed);
	this._hpGreen = co.doubleduck.BaseAssets.getImage("images/session/enemies/hp_bar_green.png");
	this._hpGreen.regX = this._hpGreen.image.width / 2;
	this._hpGreen.y = this._hpRed.y;
	this.addChild(this._hpGreen);
	this._hpMask = new createjs.Shape();
	this._hpMask.graphics.beginFill("#000000");
	this._hpMask.graphics.drawRect(this._hpGreen.x,this._hpGreen.y,this._hpGreen.image.width,this._hpGreen.image.height);
	this._hpMask.graphics.endFill();
	this._hpMask.regX = this._hpGreen.image.width / 2;
	this._hpGreen.mask = this._hpMask;
	this._direction = { x : null, y : null};
};
co.doubleduck.actors.Enemy.__name__ = ["co","doubleduck","actors","Enemy"];
co.doubleduck.actors.Enemy.create = function(type) {
	switch( (type)[1] ) {
	case 0:
		return new co.doubleduck.actors.SoldierEnemy();
	case 1:
		return new co.doubleduck.actors.ArmedSoldierEnemy();
	case 2:
		return new co.doubleduck.actors.CavalryEnemy();
	case 3:
		return new co.doubleduck.actors.ArmedCavalryEnemy();
	case 4:
		return new co.doubleduck.actors.FlyingEnemy();
	case 5:
		return new co.doubleduck.actors.ArmedFlyingEnemy();
	default:
		return null;
	}
	return null;
}
co.doubleduck.actors.Enemy.__super__ = createjs.Container;
co.doubleduck.actors.Enemy.prototype = $extend(createjs.Container.prototype,{
	payout: null
	,get_payout: function() {
		return this._payout;
	}
	,direction: null
	,get_direction: function() {
		return this._direction;
	}
	,routeId: null
	,get_routeId: function() {
		return this._routeId;
	}
	,speed: null
	,get_speed: function() {
		return this._speed;
	}
	,getPayout: function() {
		return this._payout;
	}
	,getDamage: function() {
		return this._damage;
	}
	,setSpeedFactor: function(factor,revertTime) {
		this._speedFactor = factor;
		var speedIcon = co.doubleduck.BaseAssets.getImage("images/session/magic/slow.png");
		speedIcon.regX = speedIcon.image.width / 2;
		speedIcon.regY = speedIcon.image.height;
		this.addChild(speedIcon);
		speedIcon.y -= this._enemyImage.spriteSheet._frameHeight / 2 + 5;
		co.doubleduck.Utils.waitAndCall(this,revertTime,$bind(this,this.revertSpeedFactor),[speedIcon]);
	}
	,setRouteId: function(id) {
		this._routeId = id;
	}
	,getTakesDamageFrom: function() {
		return this._takesDamageFrom;
	}
	,getEnemyData: function() {
		var data = co.doubleduck.DataLoader.getEnemyData(this._type);
		return data;
	}
	,removeMe: function(me) {
		this.removeChild(me);
		me = null;
	}
	,revertSpeedFactor: function(icon) {
		this._speedFactor = 1;
		createjs.Tween.get(icon).to({ alpha : 0},300).call($bind(this,this.removeMe),[icon]);
	}
	,setVisualDirection: function() {
		if(this._direction.x > 0) {
			this._enemyImage.gotoAndStop("sideways");
			this._enemyImage.scaleX = -1;
		} else if(this._direction.x < 0) {
			this._enemyImage.gotoAndStop("sideways");
			this._enemyImage.scaleX = 1;
		} else if(this._direction.y > 0) this._enemyImage.gotoAndStop("up"); else this._enemyImage.gotoAndStop("down");
	}
	,death: function(reachedBase) {
		if(reachedBase == null) reachedBase = false;
		this._isDead = true;
		this.disable();
		if(this.onDeath != null) this.onDeath(this,reachedBase);
	}
	,hitAnimation: function() {
	}
	,updateHpBar: function() {
		var hpPercent = this._currHp / this._hp;
		var delta = 1 - hpPercent;
		this._hpMask.x = -delta * this._enemyImage.spriteSheet._frameWidth / 2;
	}
	,initFireSpritesheet: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/session/magic/fire.png");
		var imgWidth = 12;
		var imgHeight = 17;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		initObject.animations.fire = { frames : [0,1,2], frequency : 5};
		co.doubleduck.actors.Enemy._fireSpritesheet = new createjs.SpriteSheet(initObject);
	}
	,removeFire: function(target) {
		target.stop();
		this.removeChild(target);
		target = null;
	}
	,takeFire: function(damage) {
		this.takeHit(damage);
		if(co.doubleduck.actors.Enemy._fireSpritesheet == null) this.initFireSpritesheet();
		var fireEffect = new createjs.BitmapAnimation(co.doubleduck.actors.Enemy._fireSpritesheet);
		this.addChild(fireEffect);
		fireEffect.gotoAndPlay("fire");
		createjs.Tween.get(fireEffect).wait(600).to({ alpha : 0},300);
		co.doubleduck.Utils.waitAndCall(this,800,$bind(this,this.removeFire),[fireEffect]);
	}
	,takeHit: function(damage) {
		if(this._isDead) return;
		this._currHp -= damage;
		if(this._currHp <= 0) this.death(); else {
			this.hitAnimation();
			this.updateHpBar();
		}
	}
	,getSpeed: function() {
		return this._speed * this._speedFactor;
	}
	,handleTick: function(elapsed) {
		if(createjs.Ticker.getPaused()) return;
		var newDirection = co.doubleduck.Map.getInstance().getNextDirection(this);
		if(!co.doubleduck.Grid.posEquals(newDirection,this._direction)) {
			this._direction = newDirection;
			this.setVisualDirection();
		}
		if(this._direction.x == 0 && this._direction.y == 0) this.death(true);
		var secElapsed = elapsed / 1000;
		this.x += this._direction.x * secElapsed * this.getSpeed();
		this.y += this._direction.y * secElapsed * this.getSpeed();
	}
	,initSpritesheet: function(loc) {
	}
	,disable: function() {
		this.onTick = null;
		this._isActive = false;
	}
	,enable: function() {
		var startingPos = co.doubleduck.Map.getInstance().getStartingPosition(this);
		this.x = startingPos.x;
		this.y = startingPos.y;
		this.onTick = $bind(this,this.handleTick);
		this._isActive = true;
	}
	,_spritesheet: null
	,_enemyImage: null
	,_hpMask: null
	,_hpGreen: null
	,_hpRed: null
	,_isDead: null
	,_isActive: null
	,_direction: null
	,_currHp: null
	,_takesDamageFrom: null
	,_payout: null
	,_damage: null
	,_hp: null
	,_routeId: null
	,_speedFactor: null
	,_speed: null
	,_type: null
	,onDeath: null
	,__class__: co.doubleduck.actors.Enemy
	,__properties__: {get_speed:"get_speed",get_routeId:"get_routeId",get_direction:"get_direction",get_payout:"get_payout"}
});
co.doubleduck.actors.ArmedCavalryEnemy = $hxClasses["co.doubleduck.actors.ArmedCavalryEnemy"] = function() {
	this._type = co.doubleduck.actors.EnemyType.ARMED_CAVALRY;
	co.doubleduck.actors.Enemy.call(this,"images/session/enemies/armed_cavalry.png");
};
co.doubleduck.actors.ArmedCavalryEnemy.__name__ = ["co","doubleduck","actors","ArmedCavalryEnemy"];
co.doubleduck.actors.ArmedCavalryEnemy.__super__ = co.doubleduck.actors.Enemy;
co.doubleduck.actors.ArmedCavalryEnemy.prototype = $extend(co.doubleduck.actors.Enemy.prototype,{
	initSpritesheet: function(loc) {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage(loc);
		var imgWidth = 33;
		var imgHeight = 30;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		initObject.animations.sideways = { frames : 0, frequency : 1};
		initObject.animations.up = { frames : 1, frequency : 1};
		initObject.animations.down = { frames : 2, frequency : 1};
		this._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,__class__: co.doubleduck.actors.ArmedCavalryEnemy
});
co.doubleduck.actors.ArmedFlyingEnemy = $hxClasses["co.doubleduck.actors.ArmedFlyingEnemy"] = function() {
	this._type = co.doubleduck.actors.EnemyType.ARMED_FLYING;
	co.doubleduck.actors.Enemy.call(this,"images/session/enemies/armed_flying.png");
	this._hpRed.y -= 20;
	this._hpGreen.y -= 20;
	this._hpMask.y -= 20;
};
co.doubleduck.actors.ArmedFlyingEnemy.__name__ = ["co","doubleduck","actors","ArmedFlyingEnemy"];
co.doubleduck.actors.ArmedFlyingEnemy.__super__ = co.doubleduck.actors.Enemy;
co.doubleduck.actors.ArmedFlyingEnemy.prototype = $extend(co.doubleduck.actors.Enemy.prototype,{
	initSpritesheet: function(loc) {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage(loc);
		var imgWidth = 48;
		var imgHeight = 42;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight};
		initObject.animations = { };
		initObject.animations.sideways = { frames : 0, frequency : 1};
		initObject.animations.up = { frames : 1, frequency : 1};
		initObject.animations.down = { frames : 2, frequency : 1};
		this._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,takeFire: function(damage) {
		this.takeHit(damage);
		if(co.doubleduck.actors.Enemy._fireSpritesheet == null) this.initFireSpritesheet();
		var fireEffect = new createjs.BitmapAnimation(co.doubleduck.actors.Enemy._fireSpritesheet);
		fireEffect.y -= 20;
		this.addChild(fireEffect);
		fireEffect.gotoAndPlay("fire");
		createjs.Tween.get(fireEffect).wait(500).to({ alpha : 0},300);
		co.doubleduck.Utils.waitAndCall(this,800,$bind(this,this.removeFire),[fireEffect]);
	}
	,setSpeedFactor: function(factor,revertTime) {
		this._speedFactor = factor;
		var speedIcon = co.doubleduck.BaseAssets.getImage("images/session/magic/slow.png");
		speedIcon.regX = speedIcon.image.width / 2;
		speedIcon.regY = speedIcon.image.height;
		this.addChild(speedIcon);
		speedIcon.y -= this._enemyImage.spriteSheet._frameHeight / 2 + 5;
		speedIcon.y -= 20;
		co.doubleduck.Utils.waitAndCall(this,revertTime,$bind(this,this.revertSpeedFactor),[speedIcon]);
	}
	,__class__: co.doubleduck.actors.ArmedFlyingEnemy
});
co.doubleduck.actors.ArmedSoldierEnemy = $hxClasses["co.doubleduck.actors.ArmedSoldierEnemy"] = function() {
	this._type = co.doubleduck.actors.EnemyType.ARMED_SOLDIER;
	co.doubleduck.actors.Enemy.call(this,"images/session/enemies/armed_soldier.png");
};
co.doubleduck.actors.ArmedSoldierEnemy.__name__ = ["co","doubleduck","actors","ArmedSoldierEnemy"];
co.doubleduck.actors.ArmedSoldierEnemy.__super__ = co.doubleduck.actors.Enemy;
co.doubleduck.actors.ArmedSoldierEnemy.prototype = $extend(co.doubleduck.actors.Enemy.prototype,{
	initSpritesheet: function(loc) {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage(loc);
		var imgWidth = 28;
		var imgHeight = 19;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		initObject.animations.sideways = { frames : 0, frequency : 1};
		initObject.animations.up = { frames : 1, frequency : 1};
		initObject.animations.down = { frames : 2, frequency : 1};
		this._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,__class__: co.doubleduck.actors.ArmedSoldierEnemy
});
co.doubleduck.actors.BlowdartTower = $hxClasses["co.doubleduck.actors.BlowdartTower"] = function() {
	this._projectileUri = "images/session/projectiles/blowdart.png";
	this._type = co.doubleduck.actors.TowerType.BLOWDART;
	co.doubleduck.actors.Tower.call(this,"images/session/tiles/towers/blowdart.png");
	var data = co.doubleduck.DataLoader.getTowerData(this._type);
	this._numOfEnemiesToAttack = data.enemiesToAttack;
	this.construct();
	this.enable();
};
co.doubleduck.actors.BlowdartTower.__name__ = ["co","doubleduck","actors","BlowdartTower"];
co.doubleduck.actors.BlowdartTower.__super__ = co.doubleduck.actors.Tower;
co.doubleduck.actors.BlowdartTower.prototype = $extend(co.doubleduck.actors.Tower.prototype,{
	animateAttack: function(enemy) {
		var posInTime = co.doubleduck.Map.getInstance().getVirtualPosition(enemy,this._attackSpeed[this._currUpgradeLevel]);
		var px = posInTime.x;
		var py = posInTime.y;
		var gtl = enemy.parent.localToLocal(px,py,this);
		var proj = co.doubleduck.Utils.getCenteredImage(this._projectileUri);
		this.addChild(proj);
		proj.x = this.getShootingPos().x;
		proj.y = this.getShootingPos().y;
		var distX = gtl.x - proj.x;
		var distY = gtl.y - proj.y;
		var rad = Math.atan2(distX,-distY);
		var angle = rad * 180 / Math.PI;
		proj.rotation = angle;
		createjs.Tween.get(proj).to({ x : gtl.x, y : gtl.y},this._attackSpeed[this._currUpgradeLevel] * 1000,createjs.Ease.sineOut).call($bind(this,this.removeChild),[proj]);
	}
	,attack: function(enemies) {
		var attackables = [];
		var amountToAttack = this._numOfEnemiesToAttack[this._currUpgradeLevel];
		if(enemies.length < amountToAttack) amountToAttack = enemies.length;
		while(attackables.length < amountToAttack) {
			var enemyToAttack = enemies[Std.random(enemies.length)];
			if(Lambda.indexOf(attackables,enemyToAttack) == -1) attackables.push(enemyToAttack);
		}
		if(attackables.length > 0) {
			var _g1 = 0, _g = attackables.length;
			while(_g1 < _g) {
				var i = _g1++;
				var attackedEnemy = attackables[i];
				var timeToAdd = (Std.random(50) + 50) * i;
				co.doubleduck.Utils.waitAndCall(null,timeToAdd,$bind(this,this.animateAttack),[attackedEnemy]);
				co.doubleduck.Utils.waitAndCall(null,timeToAdd + this._attackSpeed[this._currUpgradeLevel] * 1000,$bind(this,this.inflictDamage),[attackedEnemy]);
			}
		}
	}
	,getTowerHeight: function() {
		return 49;
	}
	,getTowerWidth: function() {
		return 43;
	}
	,_numOfEnemiesToAttack: null
	,_projectileUri: null
	,__class__: co.doubleduck.actors.BlowdartTower
});
co.doubleduck.actors.CannonTower = $hxClasses["co.doubleduck.actors.CannonTower"] = function() {
	this.setExplosionData();
	this._type = co.doubleduck.actors.TowerType.CANNON;
	var data = co.doubleduck.DataLoader.getTowerData(this._type);
	this._splashRadius = data.attackSplashRadius;
	this._attackInnerRadius = data.attackInnerRadius;
	co.doubleduck.actors.Tower.call(this,"images/session/tiles/towers/cannon.png");
	this._projectileUri = "images/session/projectiles/cannon" + (this._currUpgradeLevel + 1) + ".png";
	this.construct();
	this.enable();
};
co.doubleduck.actors.CannonTower.__name__ = ["co","doubleduck","actors","CannonTower"];
co.doubleduck.actors.CannonTower._explosionSpriteshhet = null;
co.doubleduck.actors.CannonTower.__super__ = co.doubleduck.actors.Tower;
co.doubleduck.actors.CannonTower.prototype = $extend(co.doubleduck.actors.Tower.prototype,{
	setExplosionData: function() {
		if(co.doubleduck.actors.CannonTower._explosionSpriteshhet == null) {
			var data = { };
			var img = co.doubleduck.BaseAssets.getRawImage("images/session/projectiles/explode.png");
			var numFrames = 5;
			var imageHeight = 0;
			var imageWidth = 0;
			if(img.width > img.height) {
				imageWidth = img.width / numFrames;
				imageHeight = img.height;
			} else {
				imageHeight = img.height / numFrames;
				imageWidth = img.width;
			}
			data.frames = { width : imageWidth, height : imageHeight, regX : imageWidth / 2, regY : imageHeight / 2};
			data.images = [img];
			data.animations = { };
			var framesArr = [];
			var _g = 0;
			while(_g < numFrames) {
				var i = _g++;
				framesArr.push(i);
			}
			data.animations.explode = { frames : framesArr, frequency : 5};
			co.doubleduck.actors.CannonTower._explosionSpriteshhet = new createjs.SpriteSheet(data);
		}
	}
	,handleExplosionEnd: function(bmp) {
		this.removeChild(bmp);
	}
	,explode: function(x,y) {
		var explosion = new createjs.BitmapAnimation(co.doubleduck.actors.CannonTower._explosionSpriteshhet);
		explosion.x = x;
		explosion.y = y;
		this.addChild(explosion);
		explosion.gotoAndPlay("explode");
		explosion.onAnimationEnd = $bind(this,this.handleExplosionEnd);
	}
	,getTowerHeight: function() {
		return 44;
	}
	,getTowerWidth: function() {
		return 45;
	}
	,animateAttack: function(enemy) {
		var posInTime = co.doubleduck.Map.getInstance().getVirtualPosition(enemy,this._attackSpeed[this._currUpgradeLevel]);
		var px = posInTime.x;
		var py = posInTime.y;
		var gtl = enemy.parent.localToLocal(px,py,this);
		var proj = co.doubleduck.Utils.getCenteredImage(this._projectileUri);
		this.addChild(proj);
		proj.x = this.getShootingPos().x;
		proj.y = this.getShootingPos().y;
		createjs.Tween.get(this._towerImage).to({ scaleY : 0.9},100,createjs.Ease.sineOut).to({ scaleY : 1},100,createjs.Ease.sineOut);
		createjs.Tween.get(proj).to({ y : this.getShootingPos().y + this._attackRadius[this._currUpgradeLevel] * -1.3},this.getProjectileSpeedMs() * 0.5,createjs.Ease.sineOut).to({ y : gtl.y},this.getProjectileSpeedMs() * 0.5,createjs.Ease.sineIn);
		createjs.Tween.get(proj).to({ x : gtl.x},this.getProjectileSpeedMs(),createjs.Ease.sineOut).call($bind(this,this.explode),[gtl.x,gtl.y]).call($bind(this,this.removeChild),[proj]);
	}
	,getProjectileSpeedMs: function() {
		return Math.floor(this._attackSpeed[this._currUpgradeLevel] * 1000);
	}
	,attack: function(enemies) {
		var enemyToAttack = enemies[0];
		var progress = co.doubleduck.Map.getInstance().getEnemyProgress(enemyToAttack);
		var _g = 0;
		while(_g < enemies.length) {
			var enemy = enemies[_g];
			++_g;
			var currProgress = co.doubleduck.Map.getInstance().getEnemyProgress(enemy);
			if(currProgress > progress) {
				enemyToAttack = enemy;
				progress = currProgress;
			}
		}
		var attackables = [];
		if(enemyToAttack != null) {
			var _g = 0, _g1 = co.doubleduck.Session.getCurrSession().getEnemies();
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				var ptEnemyToAttack = new createjs.Point(enemyToAttack.x,enemyToAttack.y);
				var ptEnemy = new createjs.Point(e.x,e.y);
				var dist = co.doubleduck.Helper.getDistance(ptEnemyToAttack,ptEnemy);
				if(dist <= this._splashRadius[this._currUpgradeLevel] && Lambda.indexOf(e.getTakesDamageFrom(),this._type) != -1) attackables.push(e);
			}
		}
		if(attackables.length > 0) {
			this.animateAttack(enemyToAttack);
			var _g = 0;
			while(_g < attackables.length) {
				var attackedEnemy = attackables[_g];
				++_g;
				co.doubleduck.Utils.waitAndCall(null,this.getProjectileSpeedMs(),$bind(this,this.inflictDamage),[attackedEnemy]);
			}
		}
	}
	,scanForEnemies: function() {
		var now = createjs.Ticker.getTime(true);
		var currInterval = this._attackCooldown[this._currUpgradeLevel];
		if(this._lastAttackTime + currInterval * 1000 > now) return;
		var enemies = co.doubleduck.Session.getCurrSession().getEnemies();
		var attackables = [];
		var _g = 0;
		while(_g < enemies.length) {
			var enemy = enemies[_g];
			++_g;
			var ptThis = this.getCenterPos();
			var ptEnemy = new createjs.Point(enemy.x,enemy.y);
			var dist = co.doubleduck.Helper.getDistance(ptThis,ptEnemy);
			if(dist <= this._attackRadius[this._currUpgradeLevel] && dist >= this.getInnerRadius() && Lambda.indexOf(enemy.getTakesDamageFrom(),this._type) != -1) attackables.push(enemy);
		}
		if(attackables.length > 0) {
			this.attack(attackables);
			this._lastAttackTime = now;
		}
	}
	,getInnerRadius: function() {
		return this._attackRadius[this._currUpgradeLevel] * this._attackInnerRadius[this._currUpgradeLevel];
	}
	,getShootingPos: function() {
		var x = this._towerImage.spriteSheet._frameWidth / 2 - 2;
		var y = this._towerImage.spriteSheet._frameHeight / 2 - 25;
		return new createjs.Point(x,y);
	}
	,_attackInnerRadius: null
	,_splashRadius: null
	,_projectileUri: null
	,__class__: co.doubleduck.actors.CannonTower
});
co.doubleduck.actors.CavalryEnemy = $hxClasses["co.doubleduck.actors.CavalryEnemy"] = function() {
	this._type = co.doubleduck.actors.EnemyType.CAVALRY;
	co.doubleduck.actors.Enemy.call(this,"images/session/enemies/cavalry.png");
};
co.doubleduck.actors.CavalryEnemy.__name__ = ["co","doubleduck","actors","CavalryEnemy"];
co.doubleduck.actors.CavalryEnemy.__super__ = co.doubleduck.actors.Enemy;
co.doubleduck.actors.CavalryEnemy.prototype = $extend(co.doubleduck.actors.Enemy.prototype,{
	initSpritesheet: function(loc) {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage(loc);
		var imgWidth = 33;
		var imgHeight = 30;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		initObject.animations.sideways = { frames : 0, frequency : 1};
		initObject.animations.up = { frames : 1, frequency : 1};
		initObject.animations.down = { frames : 2, frequency : 1};
		this._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,__class__: co.doubleduck.actors.CavalryEnemy
});
co.doubleduck.actors.EnemyType = $hxClasses["co.doubleduck.actors.EnemyType"] = { __ename__ : ["co","doubleduck","actors","EnemyType"], __constructs__ : ["SOLDIER","ARMED_SOLDIER","CAVALRY","ARMED_CAVALRY","FLYING","ARMED_FLYING"] }
co.doubleduck.actors.EnemyType.SOLDIER = ["SOLDIER",0];
co.doubleduck.actors.EnemyType.SOLDIER.toString = $estr;
co.doubleduck.actors.EnemyType.SOLDIER.__enum__ = co.doubleduck.actors.EnemyType;
co.doubleduck.actors.EnemyType.ARMED_SOLDIER = ["ARMED_SOLDIER",1];
co.doubleduck.actors.EnemyType.ARMED_SOLDIER.toString = $estr;
co.doubleduck.actors.EnemyType.ARMED_SOLDIER.__enum__ = co.doubleduck.actors.EnemyType;
co.doubleduck.actors.EnemyType.CAVALRY = ["CAVALRY",2];
co.doubleduck.actors.EnemyType.CAVALRY.toString = $estr;
co.doubleduck.actors.EnemyType.CAVALRY.__enum__ = co.doubleduck.actors.EnemyType;
co.doubleduck.actors.EnemyType.ARMED_CAVALRY = ["ARMED_CAVALRY",3];
co.doubleduck.actors.EnemyType.ARMED_CAVALRY.toString = $estr;
co.doubleduck.actors.EnemyType.ARMED_CAVALRY.__enum__ = co.doubleduck.actors.EnemyType;
co.doubleduck.actors.EnemyType.FLYING = ["FLYING",4];
co.doubleduck.actors.EnemyType.FLYING.toString = $estr;
co.doubleduck.actors.EnemyType.FLYING.__enum__ = co.doubleduck.actors.EnemyType;
co.doubleduck.actors.EnemyType.ARMED_FLYING = ["ARMED_FLYING",5];
co.doubleduck.actors.EnemyType.ARMED_FLYING.toString = $estr;
co.doubleduck.actors.EnemyType.ARMED_FLYING.__enum__ = co.doubleduck.actors.EnemyType;
co.doubleduck.actors.Magic = $hxClasses["co.doubleduck.actors.Magic"] = function() {
	createjs.Container.call(this);
	var data = co.doubleduck.DataLoader.getMagicData(this._type);
	this._effectCooldown = data.cooldown * 1000;
	this._effectRadius = data.radius | 0;
	this._isActive = false;
	this._lastActivationTime = createjs.Ticker.getTime(true) - this._effectCooldown;
	this._rippleImage = co.doubleduck.BaseAssets.getImage("images/session/magic/" + this._type[0].toLowerCase() + "_ripple.png");
	co.doubleduck.Utils.setCenterReg(this._rippleImage);
};
co.doubleduck.actors.Magic.__name__ = ["co","doubleduck","actors","Magic"];
co.doubleduck.actors.Magic.create = function(type) {
	switch( (type)[1] ) {
	case 0:
		return new co.doubleduck.actors.FireMagic();
	case 1:
		return new co.doubleduck.actors.SlowMagic();
	case 2:
		return new co.doubleduck.actors.WardrumMagic();
	}
	return null;
}
co.doubleduck.actors.Magic.__super__ = createjs.Container;
co.doubleduck.actors.Magic.prototype = $extend(createjs.Container.prototype,{
	getRipple: function() {
		return this._rippleImage;
	}
	,getType: function() {
		return this._type;
	}
	,destroy: function() {
		this.disable();
	}
	,getEffectRadius: function() {
		return this._effectRadius;
	}
	,cooldownTotal: function() {
		return this._effectCooldown;
	}
	,cooldownRemaining: function() {
		var now = createjs.Ticker.getTime(true);
		var delta = this._lastActivationTime + this._effectCooldown - now;
		if(delta < 0) delta = 0;
		return delta;
	}
	,activate: function(location) {
		this._lastActivationTime = createjs.Ticker.getTime(true);
	}
	,disable: function() {
		this._isActive = false;
	}
	,enable: function() {
		this._lastActivationTime = createjs.Ticker.getTime(true);
		this._isActive = true;
	}
	,_rippleImage: null
	,_lastActivationTime: null
	,_isActive: null
	,_effectCooldown: null
	,_effectRadius: null
	,_type: null
	,__class__: co.doubleduck.actors.Magic
});
co.doubleduck.actors.FireMagic = $hxClasses["co.doubleduck.actors.FireMagic"] = function() {
	this._type = co.doubleduck.actors.MagicType.FIRE;
	co.doubleduck.actors.Magic.call(this);
	var data = co.doubleduck.DataLoader.getMagicData(this._type);
	this._fireDamage = data.effectDamage | 0;
};
co.doubleduck.actors.FireMagic.__name__ = ["co","doubleduck","actors","FireMagic"];
co.doubleduck.actors.FireMagic.__super__ = co.doubleduck.actors.Magic;
co.doubleduck.actors.FireMagic.prototype = $extend(co.doubleduck.actors.Magic.prototype,{
	activate: function(location) {
		co.doubleduck.SoundManager.playEffect("sound/spellFire");
		co.doubleduck.actors.Magic.prototype.activate.call(this,location);
		var _g = 0, _g1 = co.doubleduck.Session.getCurrSession().getEnemies();
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			var ptThis = location;
			var ptEnemy = enemy.parent.localToGlobal(enemy.x,enemy.y);
			var dist = co.doubleduck.Helper.getDistance(ptThis,ptEnemy);
			if(dist <= this._effectRadius && enemy != null) enemy.takeFire(this._fireDamage);
		}
	}
	,_fireDamage: null
	,__class__: co.doubleduck.actors.FireMagic
});
co.doubleduck.actors.FlyingEnemy = $hxClasses["co.doubleduck.actors.FlyingEnemy"] = function() {
	this._type = co.doubleduck.actors.EnemyType.FLYING;
	co.doubleduck.actors.Enemy.call(this,"images/session/enemies/flying.png");
	this._hpRed.y -= 20;
	this._hpGreen.y -= 20;
	this._hpMask.y -= 20;
};
co.doubleduck.actors.FlyingEnemy.__name__ = ["co","doubleduck","actors","FlyingEnemy"];
co.doubleduck.actors.FlyingEnemy.__super__ = co.doubleduck.actors.Enemy;
co.doubleduck.actors.FlyingEnemy.prototype = $extend(co.doubleduck.actors.Enemy.prototype,{
	initSpritesheet: function(loc) {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage(loc);
		var imgWidth = 46;
		var imgHeight = 42;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight};
		initObject.animations = { };
		initObject.animations.sideways = { frames : 0, frequency : 1};
		initObject.animations.up = { frames : 1, frequency : 1};
		initObject.animations.down = { frames : 2, frequency : 1};
		this._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,takeFire: function(damage) {
		this.takeHit(damage);
		if(co.doubleduck.actors.Enemy._fireSpritesheet == null) this.initFireSpritesheet();
		var fireEffect = new createjs.BitmapAnimation(co.doubleduck.actors.Enemy._fireSpritesheet);
		fireEffect.y -= 20;
		this.addChild(fireEffect);
		fireEffect.gotoAndPlay("fire");
		createjs.Tween.get(fireEffect).wait(500).to({ alpha : 0},300);
		co.doubleduck.Utils.waitAndCall(this,800,$bind(this,this.removeFire),[fireEffect]);
	}
	,setSpeedFactor: function(factor,revertTime) {
		this._speedFactor = factor;
		var speedIcon = co.doubleduck.BaseAssets.getImage("images/session/magic/slow.png");
		speedIcon.regX = speedIcon.image.width / 2;
		speedIcon.regY = speedIcon.image.height;
		this.addChild(speedIcon);
		speedIcon.y -= this._enemyImage.spriteSheet._frameHeight / 2 + 5;
		speedIcon.y -= 20;
		co.doubleduck.Utils.waitAndCall(this,revertTime,$bind(this,this.revertSpeedFactor),[speedIcon]);
	}
	,__class__: co.doubleduck.actors.FlyingEnemy
});
co.doubleduck.actors.MagicType = $hxClasses["co.doubleduck.actors.MagicType"] = { __ename__ : ["co","doubleduck","actors","MagicType"], __constructs__ : ["FIRE","SLOW","WARDRUM"] }
co.doubleduck.actors.MagicType.FIRE = ["FIRE",0];
co.doubleduck.actors.MagicType.FIRE.toString = $estr;
co.doubleduck.actors.MagicType.FIRE.__enum__ = co.doubleduck.actors.MagicType;
co.doubleduck.actors.MagicType.SLOW = ["SLOW",1];
co.doubleduck.actors.MagicType.SLOW.toString = $estr;
co.doubleduck.actors.MagicType.SLOW.__enum__ = co.doubleduck.actors.MagicType;
co.doubleduck.actors.MagicType.WARDRUM = ["WARDRUM",2];
co.doubleduck.actors.MagicType.WARDRUM.toString = $estr;
co.doubleduck.actors.MagicType.WARDRUM.__enum__ = co.doubleduck.actors.MagicType;
co.doubleduck.actors.SlowMagic = $hxClasses["co.doubleduck.actors.SlowMagic"] = function() {
	this._type = co.doubleduck.actors.MagicType.SLOW;
	co.doubleduck.actors.Magic.call(this);
	var data = co.doubleduck.DataLoader.getMagicData(this._type);
	this._slowDuration = data.effectDuration;
	this._speedFactor = data.speedFactor;
};
co.doubleduck.actors.SlowMagic.__name__ = ["co","doubleduck","actors","SlowMagic"];
co.doubleduck.actors.SlowMagic.__super__ = co.doubleduck.actors.Magic;
co.doubleduck.actors.SlowMagic.prototype = $extend(co.doubleduck.actors.Magic.prototype,{
	activate: function(location) {
		co.doubleduck.SoundManager.playEffect("sound/spellFreeze");
		co.doubleduck.actors.Magic.prototype.activate.call(this,location);
		var _g = 0, _g1 = co.doubleduck.Session.getCurrSession().getEnemies();
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			var ptThis = location;
			var ptEnemy = enemy.parent.localToGlobal(enemy.x,enemy.y);
			var dist = co.doubleduck.Helper.getDistance(ptThis,ptEnemy);
			if(dist <= this._effectRadius && enemy != null) enemy.setSpeedFactor(this._speedFactor,this._slowDuration * 1000 | 0);
		}
	}
	,_speedFactor: null
	,_slowDuration: null
	,__class__: co.doubleduck.actors.SlowMagic
});
co.doubleduck.actors.SoldierEnemy = $hxClasses["co.doubleduck.actors.SoldierEnemy"] = function() {
	this._type = co.doubleduck.actors.EnemyType.SOLDIER;
	co.doubleduck.actors.Enemy.call(this,"images/session/enemies/soldier.png");
};
co.doubleduck.actors.SoldierEnemy.__name__ = ["co","doubleduck","actors","SoldierEnemy"];
co.doubleduck.actors.SoldierEnemy.__super__ = co.doubleduck.actors.Enemy;
co.doubleduck.actors.SoldierEnemy.prototype = $extend(co.doubleduck.actors.Enemy.prototype,{
	initSpritesheet: function(loc) {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage(loc);
		var imgWidth = 28;
		var imgHeight = 19;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		initObject.animations.sideways = { frames : 0, frequency : 1};
		initObject.animations.up = { frames : 1, frequency : 1};
		initObject.animations.down = { frames : 2, frequency : 1};
		this._spritesheet = new createjs.SpriteSheet(initObject);
	}
	,__class__: co.doubleduck.actors.SoldierEnemy
});
co.doubleduck.actors.TowerType = $hxClasses["co.doubleduck.actors.TowerType"] = { __ename__ : ["co","doubleduck","actors","TowerType"], __constructs__ : ["ARCHER","CANNON","WITCH","BLOWDART"] }
co.doubleduck.actors.TowerType.ARCHER = ["ARCHER",0];
co.doubleduck.actors.TowerType.ARCHER.toString = $estr;
co.doubleduck.actors.TowerType.ARCHER.__enum__ = co.doubleduck.actors.TowerType;
co.doubleduck.actors.TowerType.CANNON = ["CANNON",1];
co.doubleduck.actors.TowerType.CANNON.toString = $estr;
co.doubleduck.actors.TowerType.CANNON.__enum__ = co.doubleduck.actors.TowerType;
co.doubleduck.actors.TowerType.WITCH = ["WITCH",2];
co.doubleduck.actors.TowerType.WITCH.toString = $estr;
co.doubleduck.actors.TowerType.WITCH.__enum__ = co.doubleduck.actors.TowerType;
co.doubleduck.actors.TowerType.BLOWDART = ["BLOWDART",3];
co.doubleduck.actors.TowerType.BLOWDART.toString = $estr;
co.doubleduck.actors.TowerType.BLOWDART.__enum__ = co.doubleduck.actors.TowerType;
co.doubleduck.actors.WardrumMagic = $hxClasses["co.doubleduck.actors.WardrumMagic"] = function() {
	this._type = co.doubleduck.actors.MagicType.WARDRUM;
	co.doubleduck.actors.Magic.call(this);
	var data = co.doubleduck.DataLoader.getMagicData(this._type);
	this._boostDuration = data.effectDuration;
	this._damageFactor = data.damageFactor;
};
co.doubleduck.actors.WardrumMagic.__name__ = ["co","doubleduck","actors","WardrumMagic"];
co.doubleduck.actors.WardrumMagic.__super__ = co.doubleduck.actors.Magic;
co.doubleduck.actors.WardrumMagic.prototype = $extend(co.doubleduck.actors.Magic.prototype,{
	activate: function(location) {
		co.doubleduck.SoundManager.playEffect("sound/spellBoost");
		co.doubleduck.actors.Magic.prototype.activate.call(this,location);
		var _g = 0, _g1 = co.doubleduck.Session.getCurrSession().getTowers();
		while(_g < _g1.length) {
			var tower = _g1[_g];
			++_g;
			var towerGlobal = tower.parent.localToGlobal(tower.getCenterPos().x,tower.getCenterPos().y);
			var dist = co.doubleduck.Helper.getDistance(location,towerGlobal);
			if(dist <= this._effectRadius && tower != null) tower.setDamageFactor(this._damageFactor,this._boostDuration * 1000 | 0);
		}
	}
	,_damageFactor: null
	,_boostDuration: null
	,__class__: co.doubleduck.actors.WardrumMagic
});
co.doubleduck.actors.WitchTower = $hxClasses["co.doubleduck.actors.WitchTower"] = function() {
	this._projectileUri = "images/session/projectiles/witch.png";
	this.setExplosionData();
	this._type = co.doubleduck.actors.TowerType.WITCH;
	co.doubleduck.actors.Tower.call(this,"images/session/tiles/towers/witch.png");
	this.construct();
	this.enable();
};
co.doubleduck.actors.WitchTower.__name__ = ["co","doubleduck","actors","WitchTower"];
co.doubleduck.actors.WitchTower._explosionSpriteshhet = null;
co.doubleduck.actors.WitchTower.__super__ = co.doubleduck.actors.Tower;
co.doubleduck.actors.WitchTower.prototype = $extend(co.doubleduck.actors.Tower.prototype,{
	setExplosionData: function() {
		if(co.doubleduck.actors.WitchTower._explosionSpriteshhet == null) {
			var data = { };
			var img = co.doubleduck.BaseAssets.getRawImage("images/session/explosion.png");
			var numFrames = 10;
			var imageHeight = 0;
			var imageWidth = 0;
			if(img.width > img.height) {
				imageWidth = img.width / numFrames;
				imageHeight = img.height;
			} else {
				imageHeight = img.height / numFrames;
				imageWidth = img.width;
			}
			data.frames = { width : imageWidth, height : imageHeight, regX : imageWidth / 2, regY : imageHeight / 2};
			data.images = [img];
			data.animations = { };
			var framesArr = [];
			var _g = 0;
			while(_g < numFrames) {
				var i = _g++;
				framesArr.push(i);
			}
			data.animations.explode = { frames : framesArr, frequency : 1};
			co.doubleduck.actors.WitchTower._explosionSpriteshhet = new createjs.SpriteSheet(data);
		}
	}
	,handleExplosionEnd: function(bmp) {
		this.removeChild(bmp);
	}
	,explode: function(x,y) {
		var explosion = co.doubleduck.BaseAssets.getImage("images/session/projectiles/magic_splash.png");
		co.doubleduck.Utils.setCenterReg(explosion);
		explosion.x = x;
		explosion.y = y;
		this.addChild(explosion);
		explosion.scaleX = explosion.scaleY = 0.2;
		createjs.Tween.get(explosion).to({ scaleX : 1, scaleY : 1, alpha : 0.2},200,createjs.Ease.sineOut).call($bind(this,this.handleExplosionEnd),[explosion]);
	}
	,animateAttack: function(enemy) {
		var posInTime = co.doubleduck.Map.getInstance().getVirtualPosition(enemy,this._attackSpeed[this._currUpgradeLevel]);
		if(js.Boot.__instanceof(enemy,co.doubleduck.actors.FlyingEnemy) || js.Boot.__instanceof(enemy,co.doubleduck.actors.ArmedFlyingEnemy)) posInTime.y -= 30;
		var px = posInTime.x;
		var py = posInTime.y;
		var gtl = enemy.parent.localToLocal(px,py,this);
		var proj = co.doubleduck.Utils.getCenteredImage(this._projectileUri);
		this.addChild(proj);
		proj.x = this.getShootingPos().x;
		proj.y = this.getShootingPos().y;
		var distX = gtl.x - proj.x;
		var distY = gtl.y - proj.y;
		var rad = Math.atan2(distX,-distY);
		var angle = rad * 180 / Math.PI;
		proj.rotation = angle;
		createjs.Tween.get(proj).to({ x : gtl.x, y : gtl.y},this._attackSpeed[this._currUpgradeLevel] * 1000,createjs.Ease.sineOut).call($bind(this,this.explode),[gtl.x,gtl.y]).call($bind(this,this.removeChild),[proj]);
	}
	,getTowerHeight: function() {
		return 58;
	}
	,getTowerWidth: function() {
		return 55;
	}
	,getShootingPos: function() {
		var x = this._towerImage.spriteSheet._frameWidth / 2 - 10;
		var y = this._towerImage.spriteSheet._frameHeight / 2 - 35;
		return new createjs.Point(x,y);
	}
	,_projectileUri: null
	,__class__: co.doubleduck.actors.WitchTower
});
co.doubleduck.audio.AudioFX = $hxClasses["co.doubleduck.audio.AudioFX"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.AudioFX.__name__ = ["co","doubleduck","audio","AudioFX"];
co.doubleduck.audio.AudioFX.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.AudioFX._currentlyPlaying = null;
co.doubleduck.audio.AudioFX.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.setVolume(volume);
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,co.doubleduck.SoundManager.audioPoolSize);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		this._jsAudio = AudioFX(pathNoExtension, { loop: isLoop, pool: pool });
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.AudioFX
}
co.doubleduck.audio.DummyAudioAPI = $hxClasses["co.doubleduck.audio.DummyAudioAPI"] = function() {
};
co.doubleduck.audio.DummyAudioAPI.__name__ = ["co","doubleduck","audio","DummyAudioAPI"];
co.doubleduck.audio.DummyAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.DummyAudioAPI.prototype = {
	setVolume: function(volume) {
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
	}
	,init: function() {
	}
	,__class__: co.doubleduck.audio.DummyAudioAPI
}
co.doubleduck.audio.HowlerAudio = $hxClasses["co.doubleduck.audio.HowlerAudio"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.HowlerAudio.__name__ = ["co","doubleduck","audio","HowlerAudio"];
co.doubleduck.audio.HowlerAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.HowlerAudio._currentlyPlaying = null;
co.doubleduck.audio.HowlerAudio.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.volume = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,1);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		var myUrls = new Array();
		myUrls.push(this._src + ".mp3");
		myUrls.push(this._src + ".ogg");
		this._jsAudio = new Howl({urls: myUrls, loop: false});
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.HowlerAudio
}
co.doubleduck.audio.NonOverlappingAudio = $hxClasses["co.doubleduck.audio.NonOverlappingAudio"] = function(src) {
	this._src = src;
	this.load();
	this._isMusic = false;
};
co.doubleduck.audio.NonOverlappingAudio.__name__ = ["co","doubleduck","audio","NonOverlappingAudio"];
co.doubleduck.audio.NonOverlappingAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = null;
co.doubleduck.audio.NonOverlappingAudio.prototype = {
	getSrc: function() {
		return this._src;
	}
	,audio: function() {
		return this._audio;
	}
	,setVolume: function(volume) {
		if(this._audio != null) this._audio.volume = volume;
	}
	,pause: function() {
		if(this._audio != null) this._audio.pause();
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._isMusic) co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
		if(this._audio != null) {
			this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
			this._audio.currentTime = 0;
			this._audio.pause();
		}
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._isMusic = true;
		co.doubleduck.audio.NonOverlappingAudio._musicPlaying = true;
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
	}
	,handleEnded: function() {
		this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
		this._audio.currentTime = 0;
	}
	,handleTimeUpdate: function() {
		if(this._audio.currentTime >= this._audio.duration - 0.3) this.stop();
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._musicPlaying) return;
		if(overrideOtherEffects && co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
		co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = this;
	}
	,handleError: function() {
	}
	,handleCanPlay: function() {
	}
	,load: function() {
		this._audio = new Audio();
		this._audio.src = this._src;
		this._audio.initialTime = 0;
		this._audio.addEventListener("canplaythrough",$bind(this,this.handleCanPlay));
		this._audio.addEventListener("onerror",$bind(this,this.handleError));
	}
	,init: function() {
	}
	,_isMusic: null
	,_audio: null
	,_src: null
	,__class__: co.doubleduck.audio.NonOverlappingAudio
}
if(!co.doubleduck.ui) co.doubleduck.ui = {}
co.doubleduck.ui.ContextButton = $hxClasses["co.doubleduck.ui.ContextButton"] = function(imgUrl,active,price,descriptionImg,quick,cooldownRemain,cooldownTotal) {
	if(cooldownTotal == null) cooldownTotal = 0;
	if(cooldownRemain == null) cooldownRemain = 0;
	if(quick == null) quick = false;
	if(descriptionImg == null) descriptionImg = "";
	if(price == null) price = 0;
	createjs.Container.call(this);
	if(co.doubleduck.ui.ContextButton._fh == null) co.doubleduck.ui.ContextButton._fh = new co.doubleduck.FontHelper("images/general/font_small/");
	this._image = co.doubleduck.BaseAssets.getImage(imgUrl,true);
	co.doubleduck.Utils.setCenterReg(this._image);
	this.addChild(this._image);
	this._selectedImage = co.doubleduck.BaseAssets.getImage("images/session/ui/btn_ok.png");
	this._selectedImage.visible = false;
	co.doubleduck.Utils.setCenterReg(this._selectedImage);
	this.addChild(this._selectedImage);
	this._isUnlocked = active;
	this._isSelected = quick;
	this._price = price;
	this.mouseEnabled = active;
	this._descriptionImage = descriptionImg;
	if(cooldownRemain > 0) {
		this._isUnlocked = false;
		this.onTick = $bind(this,this.handleTick);
		this._cooldownRemain = cooldownRemain;
		this._cooldownTotal = cooldownTotal;
		this.mouseEnabled = false;
	}
	this.checkFunds();
	this._priceTag = new createjs.Container();
	if(this._isUnlocked && this._price > 0) this.addPriceTag();
};
co.doubleduck.ui.ContextButton.__name__ = ["co","doubleduck","ui","ContextButton"];
co.doubleduck.ui.ContextButton._fh = null;
co.doubleduck.ui.ContextButton.__super__ = createjs.Container;
co.doubleduck.ui.ContextButton.prototype = $extend(createjs.Container.prototype,{
	getType: function() {
		return this._type;
	}
	,setType: function(type) {
		this._type = type;
	}
	,setUnselected: function() {
		this._isSelected = false;
		this._selectedImage.visible = false;
		this._priceTag.visible = true;
	}
	,setSelected: function() {
		this._isSelected = true;
		this._selectedImage.visible = true;
		this._priceTag.visible = false;
	}
	,isSelected: function() {
		return this._isSelected;
	}
	,getPrice: function() {
		return this._price;
	}
	,getDescriptionImage: function() {
		return this._descriptionImage;
	}
	,getImage: function() {
		return this._image;
	}
	,destroy: function() {
		this.onTick = null;
	}
	,setProgress: function(progress) {
		if(progress == 0) return;
		if(this._cooldownOverlay == null) {
			this._cooldownOverlay = new createjs.Shape();
			this.addChild(this._cooldownOverlay);
		}
		var radius = this._selectedImage.image.width / 2;
		this._cooldownOverlay.graphics.clear();
		this._cooldownOverlay.graphics.beginFill("#333333");
		this._cooldownOverlay.alpha = 0.8;
		var startDeg = -90 * Math.PI / 180;
		var endDeg = (-90 + 360 * (1 - progress)) * Math.PI / 180;
		this._cooldownOverlay.graphics.arc(radius,radius,radius * 0.7,startDeg,endDeg,true);
		this._cooldownOverlay.graphics.lineTo(radius,radius);
		this._cooldownOverlay.graphics.closePath();
		this._cooldownOverlay.graphics.endFill();
		this._cooldownOverlay.x = -radius;
		this._cooldownOverlay.y = -radius;
	}
	,handleTick: function(elapsed) {
		this._cooldownRemain -= elapsed;
		if(this._cooldownRemain <= 0) {
			this.onTick = null;
			this._isUnlocked = true;
			this.mouseEnabled = true;
			this._cooldownOverlay.visible = false;
		} else {
			var progress = this._cooldownRemain / this._cooldownTotal;
			this.setProgress(progress);
		}
	}
	,addPriceTag: function() {
		var priceBg = co.doubleduck.BaseAssets.getImage("images/session/ui/price_tag.png");
		co.doubleduck.Utils.setCenterReg(priceBg);
		this._priceTag.addChild(priceBg);
		var dims = new createjs.Rectangle(0,0,0,0);
		var priceTxt = co.doubleduck.ui.ContextButton._fh.getNumber(this._price,1,true,dims);
		priceTxt.regX = dims.width / 2;
		priceTxt.regY = dims.height / 2;
		this._priceTag.addChild(priceTxt);
		this.addChild(this._priceTag);
		this._priceTag.y = this._image.image.height / 2 - priceBg.image.height * 0.05;
	}
	,checkFunds: function() {
		if(this._price == 0 || !this._isUnlocked) return;
		var currFunds = co.doubleduck.Session.getCurrSession().getCurrentBalance();
		if(currFunds < this._price) {
			this.mouseEnabled = false;
			this.alpha = 0.5;
		} else {
			this.mouseEnabled = true;
			this.alpha = 1;
		}
	}
	,_cooldownOverlay: null
	,_cooldownTotal: null
	,_cooldownRemain: null
	,_priceTag: null
	,_type: null
	,_isSelected: null
	,_isUnlocked: null
	,_price: null
	,_descriptionImage: null
	,_selectedImage: null
	,_image: null
	,__class__: co.doubleduck.ui.ContextButton
});
co.doubleduck.ui.ContextMenu = $hxClasses["co.doubleduck.ui.ContextMenu"] = function(pos,buttons,magicMenu) {
	this._circleImage = "images/session/ui/menu_circle.png";
	this._isMagicMenu = magicMenu;
	this._menu = new createjs.Container();
	this._pos = pos;
	this._buttons = buttons;
	var localPos = this._menu.globalToLocal(this._pos.x,this._pos.y);
	this._menu.regX = localPos.x;
	this._menu.regY = localPos.y;
	this._menu.x = localPos.x;
	this._menu.y = localPos.y;
	this._stage = co.doubleduck.BaseGame.getStage();
	this._stageCover = new createjs.Shape();
	this._stageCover.graphics.beginFill("#000000");
	this._stageCover.graphics.drawRect(0,0,co.doubleduck.BaseGame.getScreenSize().width,co.doubleduck.BaseGame.getScreenSize().height);
	this._stageCover.graphics.endFill();
	this._stageCover.alpha = 0.01;
	co.doubleduck.ui.ContextMenu._container.addChild(this._stageCover);
	this._stageCover.onClick = $bind(this,this.handleStageClick);
	if(this._isMagicMenu) this._circleImage = "images/session/ui/spell_menu.png";
	this._circle = co.doubleduck.Utils.getCenteredImage(this._circleImage,false);
	this._radius = this._circle.image.width / 2;
	this._circle.x = pos.x;
	this._circle.y = pos.y;
	this._circle.onClick = $bind(this,this.handleCircleClick);
	this._circle.mouseEnabled = true;
	this._menu.addChild(this._circle);
	this.placeButtons();
	co.doubleduck.ui.ContextMenu._container.addChild(this._menu);
	this.animateIn();
};
co.doubleduck.ui.ContextMenu.__name__ = ["co","doubleduck","ui","ContextMenu"];
co.doubleduck.ui.ContextMenu._activeMenu = null;
co.doubleduck.ui.ContextMenu.getMenu = function(pos,buttons,isMagic) {
	if(isMagic == null) isMagic = false;
	if(co.doubleduck.ui.ContextMenu._activeMenu != null) {
		co.doubleduck.ui.ContextMenu._activeMenu.destroy();
		co.doubleduck.ui.ContextMenu._activeMenu = null;
	}
	co.doubleduck.ui.ContextMenu._activeMenu = new co.doubleduck.ui.ContextMenu(pos,buttons,isMagic);
	return co.doubleduck.ui.ContextMenu._activeMenu;
}
co.doubleduck.ui.ContextMenu.getContainer = function() {
	if(co.doubleduck.ui.ContextMenu._container == null) co.doubleduck.ui.ContextMenu._container = new createjs.Container();
	return co.doubleduck.ui.ContextMenu._container;
}
co.doubleduck.ui.ContextMenu.getActiveMenu = function() {
	return co.doubleduck.ui.ContextMenu._activeMenu;
}
co.doubleduck.ui.ContextMenu.cleanUp = function() {
	if(co.doubleduck.ui.ContextMenu._activeMenu != null) {
		co.doubleduck.ui.ContextMenu._activeMenu.destroy();
		co.doubleduck.ui.ContextMenu._activeMenu = null;
	}
}
co.doubleduck.ui.ContextMenu.prototype = {
	remove: function() {
		co.doubleduck.ui.ContextMenu._container.removeChild(this._menu);
		if(this.onClose != null) {
			this.onClose();
			this.onClose = null;
		}
	}
	,recheckFunds: function() {
		var _g = 0, _g1 = this._buttons;
		while(_g < _g1.length) {
			var button = _g1[_g];
			++_g;
			button.checkFunds();
		}
	}
	,destroy: function() {
		if(this._buttons != null) {
			var _g = 0, _g1 = this._buttons;
			while(_g < _g1.length) {
				var button = _g1[_g];
				++_g;
				button.destroy();
			}
		}
		co.doubleduck.ui.ContextMenu._container.removeChild(this._stageCover);
		this._stage.onClick = null;
		this.animateOut();
		if(!this._isMagicMenu) co.doubleduck.Session.getCurrSession().getHud().hideDesc();
	}
	,handleStageClick: function(e) {
		this._stageCover.onClick = null;
		var mousePoint = co.doubleduck.Session.getCurrSession().globalToLocal(e.stageX,e.stageY);
		var objs = co.doubleduck.Session.getCurrSession().getObjectsUnderPoint(mousePoint.x,mousePoint.y);
		var clickableObj = null;
		var _g = 0;
		while(_g < objs.length) {
			var obj = objs[_g];
			++_g;
			if(obj.onPress != null) {
				clickableObj = obj;
				break;
			}
		}
		if(clickableObj != null) {
			var ce = { target : Dynamic};
			var pt = new createjs.Point(clickableObj.x,clickableObj.y);
			ce.target.x = pt.x;
			ce.target.y = pt.y;
			clickableObj.onPress(ce);
		} else this.destroy();
	}
	,handleCircleClick: function() {
		this.destroy();
	}
	,animateOut: function() {
		createjs.Tween.get(this._menu).to({ scaleX : 0, scaleY : 0},100,createjs.Ease.sineIn).call($bind(this,this.remove));
	}
	,animateIn: function() {
		this._menu.alpha = 0;
		this._menu.scaleX = this._menu.scaleY = 0.5;
		createjs.Tween.get(this._menu).to({ scaleX : 1, scaleY : 1, alpha : 1},200,createjs.Ease.sineOut);
	}
	,handleBtnClick: function(e) {
		var btn = e.target;
		if(btn.isSelected()) {
			if(this.onSelectionMade != null) {
				this.onSelectionMade(btn);
				this.destroy();
			}
		} else {
			var _g = 0, _g1 = this._buttons;
			while(_g < _g1.length) {
				var button = _g1[_g];
				++_g;
				button.setUnselected();
			}
			btn.setSelected();
			if(btn.getDescriptionImage() != "") co.doubleduck.Session.getCurrSession().getHud().showDesc(btn.getDescriptionImage());
		}
	}
	,getAngle: function() {
		var minAngle = 0;
		var maxAngle = 270;
		var top = false;
		var bottom = false;
		var left = false;
		var right = false;
		var paddingX = true;
		var paddingY = true;
		if(co.doubleduck.BaseGame.getScreenSize().width < this._pos.x + this.maxRadius(1)) {
			if(co.doubleduck.BaseGame.getScreenSize().width < this._pos.x + this._radius) paddingX = false;
			right = true;
		} else if(this._pos.x - this.maxRadius(1) < 0) {
			if(this._pos.x - this._radius < 0) paddingX = false;
			left = true;
		}
		if(co.doubleduck.BaseGame.getScreenSize().height < this._pos.y + this.maxRadius(1)) {
			if(co.doubleduck.BaseGame.getScreenSize().height < this._pos.y + this._radius) paddingY = false;
			bottom = true;
		} else if(this._pos.y - this.maxRadius(1) < 0) {
			if(this._pos.y - this._radius < 0) paddingY = false;
			top = true;
		}
		if(bottom && right) {
			minAngle = 0;
			maxAngle = 90;
			if(paddingX) maxAngle += 20;
			if(paddingY) minAngle -= 20;
		} else if(bottom && left) {
			minAngle = 90;
			maxAngle = 180;
			if(paddingX) minAngle -= 20;
			if(paddingY) maxAngle += 20;
		} else if(top && left) {
			minAngle = 180;
			maxAngle = 270;
			if(paddingX) maxAngle += 20;
			if(paddingY) minAngle -= 20;
		} else if(top && right) {
			minAngle = 270;
			maxAngle = 360;
			if(paddingX) minAngle -= 20;
			if(paddingY) maxAngle += 20;
		}
		if(right && !top && !bottom) {
			minAngle = 270;
			maxAngle = 450;
			if(paddingX) {
				minAngle -= 20;
				maxAngle += 20;
			}
		} else if(left && !top && !bottom) {
			minAngle = 90;
			maxAngle = 270;
			if(paddingX) {
				minAngle -= 20;
				maxAngle += 20;
			}
		} else if(top && !right && !left) {
			minAngle = 180;
			maxAngle = 360;
			if(paddingY) {
				minAngle -= 20;
				maxAngle += 20;
			}
		} else if(bottom && !right && !left) {
			minAngle = 0;
			maxAngle = 180;
			if(paddingY) {
				minAngle -= 20;
				maxAngle += 20;
			}
		}
		return { min : co.doubleduck.Helper.degToRad(minAngle), max : co.doubleduck.Helper.degToRad(maxAngle)};
	}
	,maxRadius: function(multiplier) {
		if(multiplier == null) multiplier = 1.5;
		return this._radius + this._buttons[0].getImage().image.width * multiplier;
	}
	,placeButtons: function() {
		var calc = this.getAngle();
		var minAngle = calc.min;
		var maxAngle = calc.max;
		var diff = 0;
		if(maxAngle == co.doubleduck.Helper.degToRad(270) && minAngle == 0) diff = Math.abs(Math.PI * 2 / this._buttons.length); else if(this._buttons.length > 1) diff = Math.abs((maxAngle - minAngle) / (this._buttons.length - 1)); else diff = Math.abs((maxAngle - minAngle) / 2);
		var _g1 = 0, _g = this._buttons.length;
		while(_g1 < _g) {
			var i = _g1++;
			var btn = this._buttons[i];
			var angle = minAngle + diff * i;
			var btn1 = this._buttons[i];
			var posX = this._pos.x - Math.cos(angle) * this._radius;
			var posY = this._pos.y - Math.sin(angle) * this._radius;
			btn1.x = posX;
			btn1.y = posY;
			btn1.onPress = $bind(this,this.handleBtnClick);
			this._menu.addChild(btn1);
		}
	}
	,_isMagicMenu: null
	,_buttons: null
	,_pos: null
	,_radius: null
	,_menu: null
	,_circle: null
	,_stageCover: null
	,_stage: null
	,_circleImage: null
	,onSelectionMade: null
	,onClose: null
	,__class__: co.doubleduck.ui.ContextMenu
}
co.doubleduck.ui.EndModal = $hxClasses["co.doubleduck.ui.EndModal"] = function(type) {
	this._isFinalLevel = false;
	this._unlockedNewLevel = false;
	createjs.Container.call(this);
	this._modal = new createjs.Container();
	this._duration = 500;
	this._type = type;
	this._stars = [];
	this._currLevel = co.doubleduck.Session.getCurrSession().getLevelNum();
	if(this._type == co.doubleduck.ui.EndModalType.WIN) {
		if(this._currLevel >= co.doubleduck.DataLoader.getAllLevels().length) this._isFinalLevel = true;
		this.constructWinModal();
		var stars = this.getNumStars();
		if(stars > co.doubleduck.Persistence.getStarRating(co.doubleduck.Session.getCurrSession().getLevelNum())) co.doubleduck.Persistence.setStarRating(co.doubleduck.Session.getCurrSession().getLevelNum(),this.getNumStars());
		var levelId = co.doubleduck.Session.getCurrSession().getLevelNum();
		var nextLevel = levelId + 1;
		if(nextLevel <= co.doubleduck.DataLoader.getAllLevels().length) {
			if(co.doubleduck.Persistence.getUnlockedLevel() < nextLevel) {
				this._unlockedNewLevel = true;
				co.doubleduck.Persistence.setUnlockedLevel(nextLevel);
			}
		}
	} else if(this._type == co.doubleduck.ui.EndModalType.LOSE) this.constructLoseModal();
};
co.doubleduck.ui.EndModal.__name__ = ["co","doubleduck","ui","EndModal"];
co.doubleduck.ui.EndModal.__super__ = createjs.Container;
co.doubleduck.ui.EndModal.prototype = $extend(createjs.Container.prototype,{
	darkenScreen: function() {
		this._overlay = new createjs.Shape();
		var og = this._overlay.graphics;
		og.beginFill("#000000");
		og.drawRect(0,0,co.doubleduck.BaseGame.getScreenSize().width,co.doubleduck.BaseGame.getScreenSize().height);
		og.endFill();
		this.addChild(this._overlay);
		this._overlay.alpha = 0;
		createjs.Tween.get(this._overlay).to({ alpha : 0.8},this._duration);
	}
	,playSound: function(num) {
		co.doubleduck.SoundManager.playEffect("sound/star" + num);
	}
	,dropFinalModal: function() {
		var finalModal = new createjs.Container();
		var bg = co.doubleduck.BaseAssets.getImage(this._imageUrl);
		finalModal.addChild(bg);
		finalModal.regX = bg.image.width / 2;
		finalModal.regY = bg.image.height / 2;
		var menuBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_menu.png"),false);
		menuBtn.onClick = $bind(this,this.handleMenuClicked);
		var buttonContainer = co.doubleduck.Utils.containBitmaps([menuBtn],10);
		finalModal.addChild(buttonContainer);
		buttonContainer.x = bg.image.width / 2;
		buttonContainer.y = bg.image.height / 2 + 50;
		this.addChild(finalModal);
		finalModal.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
		finalModal.y = -co.doubleduck.BaseGame.getScreenSize().height;
		createjs.Tween.get(finalModal).to({ y : co.doubleduck.BaseGame.getScreenSize().height / 2 + 25},this._duration,createjs.Ease.sineOut).to({ y : co.doubleduck.BaseGame.getScreenSize().height / 2},this._duration / 2,createjs.Ease.sineOut);
	}
	,handleEndScreenShown: function(event) {
		var endScreen = event.target;
		endScreen.mouseEnabled = true;
	}
	,showFinalModal: function() {
		var endScreen = co.doubleduck.Utils.getCenteredImage("images/session/end_game.png");
		endScreen.alpha = 0;
		endScreen.mouseEnabled = false;
		endScreen.onClick = $bind(this,this.handleMenuClicked);
		endScreen.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
		endScreen.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
		this.addChild(endScreen);
		createjs.Tween.get(endScreen).to({ alpha : 1},700,createjs.Ease.sineOut).call($bind(this,this.handleEndScreenShown));
	}
	,showUnlock: function() {
		if(this._type == co.doubleduck.ui.EndModalType.WIN && this._unlockedNewLevel) {
			var unlockName = "";
			var allTowers = co.doubleduck.DataLoader.getAllTowers();
			var allSpells = co.doubleduck.DataLoader.getAllMagicSpells();
			var _g1 = 0, _g = allTowers.length;
			while(_g1 < _g) {
				var towerNum = _g1++;
				var tower = allTowers[towerNum];
				if((tower.unlockLevel | 0) == this._currLevel + 1) unlockName = tower.type;
			}
			var _g1 = 0, _g = allSpells.length;
			while(_g1 < _g) {
				var spellNum = _g1++;
				var spell = allSpells[spellNum];
				if((spell.unlockLevel | 0) == this._currLevel + 1) unlockName = spell.type;
			}
			var bmp = co.doubleduck.BaseAssets.getImage("images/session/ui/unlocked/unlocked_" + unlockName + ".png");
			bmp.regX = bmp.image.width / 2;
			bmp.x = this._modalBackground.image.width / 2;
			bmp.y = this._modalBackground.image.height - bmp.image.height / 2 - 3;
			this._modal.addChildAt(bmp,0);
			bmp.scaleY = 0;
			bmp.y -= 20;
			createjs.Tween.get(bmp).to({ scaleY : 1.3, y : bmp.y + 20},300,createjs.Ease.sineOut).to({ scaleY : 1, y : bmp.y + 15},150,createjs.Ease.sineOut);
			createjs.Tween.get(this._modal).to({ y : this._modal.y - bmp.image.height / 2},300,createjs.Ease.sineOut);
		}
		if(this._isFinalLevel) this.showFinalModal();
	}
	,showStars: function() {
		if(this._type == co.doubleduck.ui.EndModalType.WIN) {
			var _g1 = 0, _g = this._stars.length;
			while(_g1 < _g) {
				var i = _g1++;
				var star = this._stars[i];
				co.doubleduck.Utils.setCenterReg(star);
				star.x += star.image.width / 2;
				star.y += star.image.height / 2;
				if(i == this._stars.length - 1) createjs.Tween.get(star).wait(400 * i).call($bind(this,this.playSound),[i + 1]).to({ scaleX : 2, scaleY : 2},150,createjs.Ease.sineOut).to({ scaleX : 1, scaleY : 1},300,createjs.Ease.sineOut).wait(300).call($bind(this,this.showUnlock)); else createjs.Tween.get(star).wait(400 * i).call($bind(this,this.playSound),[i + 1]).to({ scaleX : 2, scaleY : 2},150,createjs.Ease.sineOut).to({ scaleX : 1, scaleY : 1},300,createjs.Ease.sineOut);
			}
		}
	}
	,dropModal: function() {
		this.addChild(this._modal);
		if(this._type == co.doubleduck.ui.EndModalType.WIN) createjs.Tween.get(this._modal).to({ y : co.doubleduck.BaseGame.getScreenSize().height / 2 + 25},this._duration,createjs.Ease.sineOut).to({ y : co.doubleduck.BaseGame.getScreenSize().height / 2},this._duration / 2,createjs.Ease.sineOut).wait(300).call($bind(this,this.showStars)); else createjs.Tween.get(this._modal).to({ y : co.doubleduck.BaseGame.getScreenSize().height / 2 + 25},this._duration,createjs.Ease.sineOut).to({ y : co.doubleduck.BaseGame.getScreenSize().height / 2},this._duration / 2,createjs.Ease.sineOut);
	}
	,animateIn: function() {
		this._modal.y = -co.doubleduck.BaseGame.getScreenSize().height;
		this.darkenScreen();
		this.dropModal();
	}
	,handleNextClicked: function(e) {
		e.target.onClick = null;
		co.doubleduck.Session.getCurrSession().handleNextLevel();
	}
	,handleRestartClicked: function(e) {
		e.target.onClick = null;
		co.doubleduck.Session.getCurrSession().handleRestart();
	}
	,handleMenuClicked: function(e) {
		e.target.onClick = null;
		co.doubleduck.Session.getCurrSession().handleBackToMenu();
	}
	,getNumStars: function() {
		var ret = 0;
		var data = co.doubleduck.DataLoader.getLevelById(co.doubleduck.Session.getCurrSession().getLevelNum());
		var hp = co.doubleduck.Session.getCurrSession().getBaseHp();
		if(hp > 0) {
			ret = 1;
			if(hp >= data.twoStars) {
				ret = 2;
				if(hp >= data.threeStars) ret = 3;
			}
		}
		return ret;
	}
	,constructModal: function(nextBtn) {
		if(nextBtn == null) nextBtn = false;
		this._modalBackground = co.doubleduck.BaseAssets.getImage(this._imageUrl);
		this._modal.addChild(this._modalBackground);
		this._modal.regX = this._modalBackground.image.width / 2;
		this._modal.regY = this._modalBackground.image.height / 2;
		this._menuBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_menu.png"),false);
		this._menuBtn.onClick = $bind(this,this.handleMenuClicked);
		this._restartBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_restart.png"),false);
		this._restartBtn.onClick = $bind(this,this.handleRestartClicked);
		if(nextBtn) {
			this._nextBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_play.png"),false);
			this._nextBtn.onClick = $bind(this,this.handleNextClicked);
			this._buttonContainer = co.doubleduck.Utils.containBitmaps([this._menuBtn,this._restartBtn,this._nextBtn],2);
		} else this._buttonContainer = co.doubleduck.Utils.containBitmaps([this._menuBtn,this._restartBtn],10);
		this._modal.addChild(this._buttonContainer);
		this._buttonContainer.x = this._modalBackground.image.width / 2;
		this._buttonContainer.y = this._modalBackground.image.height / 2 + 50;
		this._modal.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
	}
	,constructWinModal: function() {
		co.doubleduck.SoundManager.playEffect("sound/LevelComplete");
		this._imageUrl = "images/session/win_bg.png";
		this.constructModal(true);
		var _g1 = 0, _g = this.getNumStars();
		while(_g1 < _g) {
			var i = _g1++;
			var star = co.doubleduck.BaseAssets.getImage("images/session/star.png");
			star.scaleX = star.scaleY = 0.01;
			this._stars.push(star);
		}
		var dims = new createjs.Rectangle(0,0,0,0);
		var starContainer;
		if(this.getNumStars() == 3) {
			starContainer = co.doubleduck.Utils.containBitmaps(this._stars,0);
			starContainer.y = this._modalBackground.image.height / 2 + 7;
			var secondStar = starContainer.getChildAt(1);
			secondStar.y -= secondStar.image.height / 2 - 5;
		} else {
			starContainer = co.doubleduck.Utils.containBitmaps(this._stars,this._stars[0].image.width * 0.1);
			starContainer.y = this._modalBackground.image.height / 2 + 4;
		}
		starContainer.x = this._modalBackground.image.width / 2;
		this._buttonContainer.y += 14;
		if(this._isFinalLevel) {
			this._buttonContainer.visible = false;
			starContainer.y += 7;
		}
		this._modal.addChild(starContainer);
	}
	,constructLoseModal: function() {
		co.doubleduck.SoundManager.playEffect("sound/LevelFail");
		this._imageUrl = "images/session/lose_bg.png";
		this.constructModal();
	}
	,_currLevel: null
	,_isFinalLevel: null
	,_unlockedNewLevel: null
	,_stars: null
	,_type: null
	,_duration: null
	,_imageUrl: null
	,_nextBtn: null
	,_menuBtn: null
	,_restartBtn: null
	,_modalBackground: null
	,_buttonContainer: null
	,_overlay: null
	,_modal: null
	,__class__: co.doubleduck.ui.EndModal
});
co.doubleduck.ui.EndModalType = $hxClasses["co.doubleduck.ui.EndModalType"] = { __ename__ : ["co","doubleduck","ui","EndModalType"], __constructs__ : ["WIN","LOSE"] }
co.doubleduck.ui.EndModalType.WIN = ["WIN",0];
co.doubleduck.ui.EndModalType.WIN.toString = $estr;
co.doubleduck.ui.EndModalType.WIN.__enum__ = co.doubleduck.ui.EndModalType;
co.doubleduck.ui.EndModalType.LOSE = ["LOSE",1];
co.doubleduck.ui.EndModalType.LOSE.toString = $estr;
co.doubleduck.ui.EndModalType.LOSE.__enum__ = co.doubleduck.ui.EndModalType;
co.doubleduck.ui.HUD = $hxClasses["co.doubleduck.ui.HUD"] = function() {
	createjs.Container.call(this);
	this.construct();
	this._font = new co.doubleduck.FontHelper("images/general/font_small/");
};
co.doubleduck.ui.HUD.__name__ = ["co","doubleduck","ui","HUD"];
co.doubleduck.ui.HUD.__super__ = createjs.Container;
co.doubleduck.ui.HUD.prototype = $extend(createjs.Container.prototype,{
	removePauseScreen: function() {
		if(this._waveNotice != null) this._waveNotice.mouseEnabled = true;
		var stage = co.doubleduck.BaseGame.getStage();
		this._pauseBtn.visible = true;
		stage.removeChild(this._blackOverlay);
		stage.removeChild(this._buttonContainer);
		stage.removeChild(this._pauseBackground);
		this._buttonContainer = null;
		this._blackOverlay = null;
		this._pauseBackground = null;
		this._restartBtn = null;
		this._menuBtn = null;
		createjs.Ticker.setPaused(false);
		co.doubleduck.Session.getCurrSession().enableInteractions(true);
	}
	,handlePlayClicked: function(e) {
		this.removePauseScreen();
	}
	,handleRestartClicked: function(e) {
		this.removePauseScreen();
		co.doubleduck.Session.getCurrSession().handleRestart();
	}
	,handleMenuClicked: function(e) {
		this.removePauseScreen();
		co.doubleduck.Session.getCurrSession().handleBackToMenu();
	}
	,handlePauseBtnClick: function(e) {
		if(this.onPauseBtnClick != null) this.onPauseBtnClick();
		if(this._waveNotice != null) this._waveNotice.mouseEnabled = false;
		var stage = co.doubleduck.BaseGame.getStage();
		this._blackOverlay = new createjs.Shape();
		this._blackOverlay.graphics.beginFill("#000000");
		this._blackOverlay.graphics.drawRect(0,0,co.doubleduck.BaseGame.getScreenSize().width,co.doubleduck.BaseGame.getScreenSize().height);
		this._blackOverlay.graphics.endFill();
		this._blackOverlay.alpha = 0.8;
		stage.addChild(this._blackOverlay);
		this._pauseBtn.visible = false;
		createjs.Ticker.setPaused(true);
		this._pauseBackground = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/pause_bg.png");
		co.doubleduck.Utils.setCenterReg(this._pauseBackground);
		this._pauseBackground.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
		this._pauseBackground.y = co.doubleduck.BaseGame.getScreenSize().height / 2;
		stage.addChild(this._pauseBackground);
		this._menuBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_menu.png"),false);
		this._menuBtn.onPress = $bind(this,this.handleMenuClicked);
		this._restartBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_restart.png"),false);
		this._restartBtn.onPress = $bind(this,this.handleRestartClicked);
		this._playBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_play.png"),false);
		this._playBtn.onPress = $bind(this,this.handlePlayClicked);
		this._buttonContainer = co.doubleduck.Utils.containBitmaps([this._menuBtn,this._restartBtn,this._playBtn],6);
		this._buttonContainer.x = co.doubleduck.BaseGame.getScreenSize().width / 2;
		this._buttonContainer.y = co.doubleduck.BaseGame.getScreenSize().height * 0.51;
		stage.addChild(this._buttonContainer);
		stage.update();
	}
	,construct: function() {
		this._pauseBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/ui/hud/btn_pause.png"));
		this._pauseBtn.x = co.doubleduck.BaseGame.getScreenSize().width * 0.85;
		this._pauseBtn.y = co.doubleduck.BaseGame.getScreenSize().height * 0.02;
		this._pauseBtn.onPress = $bind(this,this.handlePauseBtnClick);
		this.addChild(this._pauseBtn);
		this._scoreBackground = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/score_bg.png");
		this._scoreBackground.x = co.doubleduck.BaseGame.getScreenSize().width * 0.05;
		this._scoreBackground.y = this._pauseBtn.y;
		this.addChild(this._scoreBackground);
		this._wavesSeperator = co.doubleduck.BaseAssets.getImage("images/general/font_small/slash.png");
		this._wavesSeperator.x = this._scoreBackground.x + 67;
		this._wavesSeperator.y = this._scoreBackground.y + 33;
		this.addChild(this._wavesSeperator);
	}
	,handleWaveNoticeClicked: function(e) {
		this._waveNotice.mouseEnabled = false;
		createjs.Tween.get(this._waveNotice).to({ alpha : 0},300,createjs.Ease.sineOut).call($bind(this,this.removeWaveNotice));
		co.doubleduck.Session.getCurrSession().forceNextWave();
	}
	,removeWaveNotice: function() {
		createjs.Tween.removeTweens(this._waveNotice);
		this._waveNotice.destroy();
		this.removeChild(this._waveNotice);
		this._waveNotice = null;
	}
	,showWaveNotice: function(time) {
		if(this._waveNotice == null) {
			this._waveNotice = new co.doubleduck.ui.WaveNoticeButton(time);
			this._waveNotice.x = co.doubleduck.BaseGame.getScreenSize().width * 0.11;
			this._waveNotice.y = co.doubleduck.BaseGame.getScreenSize().height * 0.93;
			this.addChild(this._waveNotice);
			this._waveNotice.onPress = $bind(this,this.handleWaveNoticeClicked);
		}
		this._waveNotice.alpha = 0;
		createjs.Tween.get(this._waveNotice).to({ alpha : 1},500);
		co.doubleduck.Utils.waitAndCall(this._waveNotice,time | 0,$bind(this,this.removeWaveNotice));
	}
	,hideDesc: function() {
		if(this._activeDescription != null) {
			this.removeChild(this._activeDescription);
			this._activeDescription = null;
		}
	}
	,showDesc: function(url) {
		if(this._activeDescription != null) this.hideDesc();
		this._activeDescription = co.doubleduck.BaseAssets.getImage(url);
		co.doubleduck.Utils.setCenterReg(this._activeDescription);
		this._activeDescription.x = co.doubleduck.BaseGame.getScreenSize().width * 0.5;
		this._activeDescription.y = co.doubleduck.BaseGame.getScreenSize().height - this._activeDescription.image.height / 2;
		this.addChild(this._activeDescription);
	}
	,setLiveCount: function(count) {
		if(this._livesText != null) {
			this.removeChild(this._livesText);
			this._livesText = null;
		}
		var dims = new createjs.Rectangle(0,0,0,0);
		this._livesText = this._font.getNumber(count,1,true,dims,0);
		this._livesText.x = this._scoreBackground.x + 26;
		this._livesText.y = this._scoreBackground.y + 38;
		this.addChild(this._livesText);
	}
	,setWaveCount: function(count,total) {
		if(this._wavesCompleted != null) {
			this.removeChild(this._wavesCompleted);
			this._wavesCompleted = null;
		}
		if(this._wavesTotal != null) {
			this.removeChild(this._wavesTotal);
			this._wavesTotal = null;
		}
		var dims = new createjs.Rectangle(0,0,0,0);
		this._wavesCompleted = this._font.getNumber(count,1,true,dims,0);
		this._wavesCompleted.regX = dims.width;
		this._wavesCompleted.x = this._wavesSeperator.x - 1;
		this._wavesCompleted.y = this._wavesSeperator.y + 5;
		this.addChild(this._wavesCompleted);
		this._wavesTotal = this._font.getNumber(total,1,true,dims,0);
		this._wavesTotal.regX = 0;
		this._wavesTotal.x = this._wavesSeperator.x + this._wavesSeperator.image.width + 1;
		this._wavesTotal.y = this._wavesCompleted.y;
		this.addChild(this._wavesTotal);
	}
	,setMoney: function(money) {
		if(this._moneyText != null) {
			this.removeChild(this._moneyText);
			this._moneyText = null;
		}
		var dims = new createjs.Rectangle(0,0,0,0);
		this._moneyText = this._font.getNumber(money,1,true,dims,0);
		this._moneyText.x = this._scoreBackground.x + 57;
		this._moneyText.y = this._scoreBackground.y + 14;
		this.addChild(this._moneyText);
	}
	,_activeDescription: null
	,_waveNotice: null
	,onPauseBtnClick: null
	,_blackOverlay: null
	,_buttonContainer: null
	,_playBtn: null
	,_menuBtn: null
	,_restartBtn: null
	,_pauseBackground: null
	,_pauseBtn: null
	,_wavesSeperator: null
	,_wavesTotal: null
	,_wavesCompleted: null
	,_livesText: null
	,_moneyText: null
	,_scoreBackground: null
	,_font: null
	,__class__: co.doubleduck.ui.HUD
});
co.doubleduck.ui.WaveNoticeButton = $hxClasses["co.doubleduck.ui.WaveNoticeButton"] = function(time) {
	createjs.Container.call(this);
	this._layer1 = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/wave_timer3.png",true);
	this._layer2 = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/wave_timer2.png");
	this._layer3 = co.doubleduck.BaseAssets.getImage("images/session/ui/hud/wave_timer1.png");
	this._layer3.scaleX = -1;
	this._layer3.x += this._layer3.image.width;
	this.addChild(this._layer1);
	this.addChild(this._layer2);
	this.addChild(this._layer3);
	this._remainingTime = this._totalTime = time;
	this.onTick = $bind(this,this.handleTick);
	this.regX = this._layer1.image.width / 2;
	this.regY = this._layer1.image.height / 2;
	this._mask = new createjs.Shape();
	this._layer2.mask = this._mask;
	this.scaleX = -1;
};
co.doubleduck.ui.WaveNoticeButton.__name__ = ["co","doubleduck","ui","WaveNoticeButton"];
co.doubleduck.ui.WaveNoticeButton.__super__ = createjs.Container;
co.doubleduck.ui.WaveNoticeButton.prototype = $extend(createjs.Container.prototype,{
	setProgress: function(progress) {
		if(progress == 0) return;
		if(this._mask == null) {
			this._mask = new createjs.Shape();
			this.addChild(this._mask);
		}
		var radius = this._layer2.image.width / 2;
		this._mask.graphics.clear();
		this._mask.graphics.beginFill("#333333");
		var startDeg = -90 * Math.PI / 180;
		var endDeg = (-90 + 360 * (1 - progress)) * Math.PI / 180;
		this._mask.graphics.arc(radius,radius,radius,startDeg,endDeg,true);
		this._mask.graphics.lineTo(radius,radius);
		this._mask.graphics.closePath();
		this._mask.graphics.endFill();
	}
	,handleTick: function(elapsed) {
		if(elapsed == null) return;
		this._remainingTime -= elapsed;
		var progress = this._remainingTime / this._totalTime;
		this.setProgress(1 - progress);
	}
	,getHeight: function() {
		return this._layer1.image.height;
	}
	,destroy: function() {
		this.onTick = null;
	}
	,_remainingTime: null
	,_totalTime: null
	,_mask: null
	,_layer3: null
	,_layer2: null
	,_layer1: null
	,__class__: co.doubleduck.ui.WaveNoticeButton
});
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Public = $hxClasses["haxe.Public"] = function() { }
haxe.Public.__name__ = ["haxe","Public"];
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.Stack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += Std.string("\nCalled from ");
		haxe.Stack.itemToString(b,s);
	}
	return b.b;
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += Std.string("a C function");
		break;
	case 1:
		var m = $e[2];
		b.b += Std.string("module ");
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b += Std.string(" (");
		}
		b.b += Std.string(file);
		b.b += Std.string(" line ");
		b.b += Std.string(line);
		if(s1 != null) b.b += Std.string(")");
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += Std.string(".");
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += Std.string("local function #");
		b.b += Std.string(n);
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
if(!haxe.unit) haxe.unit = {}
haxe.unit.TestCase = $hxClasses["haxe.unit.TestCase"] = function() {
};
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.__interfaces__ = [haxe.Public];
haxe.unit.TestCase.prototype = {
	assertEquals: function(expected,actual,c) {
		this.currentTest.done = true;
		if(actual != expected) {
			this.currentTest.success = false;
			this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertFalse: function(b,c) {
		this.currentTest.done = true;
		if(b == true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected false but was true";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertTrue: function(b,c) {
		this.currentTest.done = true;
		if(b == false) {
			this.currentTest.success = false;
			this.currentTest.error = "expected true but was false";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,print: function(v) {
		haxe.unit.TestRunner.print(v);
	}
	,tearDown: function() {
	}
	,setup: function() {
	}
	,currentTest: null
	,__class__: haxe.unit.TestCase
}
haxe.unit.TestResult = $hxClasses["haxe.unit.TestResult"] = function() {
	this.m_tests = new List();
	this.success = true;
};
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype = {
	toString: function() {
		var buf = new StringBuf();
		var failures = 0;
		var $it0 = this.m_tests.iterator();
		while( $it0.hasNext() ) {
			var test = $it0.next();
			if(test.success == false) {
				buf.b += Std.string("* ");
				buf.b += Std.string(test.classname);
				buf.b += Std.string("::");
				buf.b += Std.string(test.method);
				buf.b += Std.string("()");
				buf.b += Std.string("\n");
				buf.b += Std.string("ERR: ");
				if(test.posInfos != null) {
					buf.b += Std.string(test.posInfos.fileName);
					buf.b += Std.string(":");
					buf.b += Std.string(test.posInfos.lineNumber);
					buf.b += Std.string("(");
					buf.b += Std.string(test.posInfos.className);
					buf.b += Std.string(".");
					buf.b += Std.string(test.posInfos.methodName);
					buf.b += Std.string(") - ");
				}
				buf.b += Std.string(test.error);
				buf.b += Std.string("\n");
				if(test.backtrace != null) {
					buf.b += Std.string(test.backtrace);
					buf.b += Std.string("\n");
				}
				buf.b += Std.string("\n");
				failures++;
			}
		}
		buf.b += Std.string("\n");
		if(failures == 0) buf.b += Std.string("OK "); else buf.b += Std.string("FAILED ");
		buf.b += Std.string(this.m_tests.length);
		buf.b += Std.string(" tests, ");
		buf.b += Std.string(failures);
		buf.b += Std.string(" failed, ");
		buf.b += Std.string(this.m_tests.length - failures);
		buf.b += Std.string(" success");
		buf.b += Std.string("\n");
		return buf.b;
	}
	,add: function(t) {
		this.m_tests.add(t);
		if(!t.success) this.success = false;
	}
	,success: null
	,m_tests: null
	,__class__: haxe.unit.TestResult
}
haxe.unit.TestRunner = $hxClasses["haxe.unit.TestRunner"] = function() {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
};
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found"); else d.innerHTML += msg;
}
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
}
haxe.unit.TestRunner.prototype = {
	runCase: function(t) {
		var old = haxe.Log.trace;
		haxe.Log.trace = haxe.unit.TestRunner.customTrace;
		var cl = Type.getClass(t);
		var fields = Type.getInstanceFields(cl);
		haxe.unit.TestRunner.print("Class: " + Type.getClassName(cl) + " ");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					field.apply(t,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					} else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				} catch( $e0 ) {
					if( js.Boot.__instanceof($e0,haxe.unit.TestStatus) ) {
						var e = $e0;
						haxe.unit.TestRunner.print("F");
						t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					} else {
					var e = $e0;
					haxe.unit.TestRunner.print("E");
					if(e.message != null) t.currentTest.error = "exception thrown : " + Std.string(e) + " [" + Std.string(e.message) + "]"; else t.currentTest.error = "exception thrown : " + Std.string(e);
					t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
		haxe.unit.TestRunner.print("\n");
		haxe.Log.trace = old;
	}
	,run: function() {
		this.result = new haxe.unit.TestResult();
		var $it0 = this.cases.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.runCase(c);
		}
		haxe.unit.TestRunner.print(this.result.toString());
		return this.result.success;
	}
	,add: function(c) {
		this.cases.add(c);
	}
	,cases: null
	,result: null
	,__class__: haxe.unit.TestRunner
}
haxe.unit.TestStatus = $hxClasses["haxe.unit.TestStatus"] = function() {
	this.done = false;
	this.success = false;
};
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype = {
	backtrace: null
	,posInfos: null
	,classname: null
	,method: null
	,error: null
	,success: null
	,done: null
	,__class__: haxe.unit.TestStatus
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
co.doubleduck.BaseAssets.onLoadAll = null;
co.doubleduck.BaseAssets._loader = null;
co.doubleduck.BaseAssets._cacheData = { };
co.doubleduck.BaseAssets._loadCallbacks = { };
co.doubleduck.BaseAssets.loaded = 0;
co.doubleduck.BaseAssets._useLocalStorage = false;
co.doubleduck.BaseGame._viewport = null;
co.doubleduck.BaseGame._scale = 1;
co.doubleduck.BaseGame.DEBUG = false;
co.doubleduck.BaseGame.LOGO_URI = "images/duckling/splash_logo.png";
co.doubleduck.BaseGame.LOAD_STROKE_URI = "images/duckling/loading_stroke.png";
co.doubleduck.BaseGame.LOAD_FILL_URI = "images/duckling/loading_fill.png";
co.doubleduck.BaseGame.ORIENT_PORT_URI = "images/duckling/orientation_error_port.png";
co.doubleduck.BaseGame.ORIENT_LAND_URI = "images/duckling/orientation_error_land.png";
co.doubleduck.BaseGame.isLocalized = false;
co.doubleduck.BasePersistence.GAME_PREFIX = "DUCK";
co.doubleduck.BasePersistence.available = co.doubleduck.BasePersistence.localStorageSupported();
co.doubleduck.Button.CLICK_TYPE_NONE = 0;
co.doubleduck.Button.CLICK_TYPE_TINT = 1;
co.doubleduck.Button.CLICK_TYPE_JUICY = 2;
co.doubleduck.Button.CLICK_TYPE_SCALE = 3;
co.doubleduck.Button.CLICK_TYPE_TOGGLE = 4;
co.doubleduck.Button.CLICK_TYPE_HOLD = 5;
co.doubleduck.Button._defaultSound = null;
co.doubleduck.Grid.UP = { x : 0, y : -1};
co.doubleduck.Grid.RIGHT = { x : 1, y : 0};
co.doubleduck.Grid.DOWN = { x : 0, y : 1};
co.doubleduck.Grid.LEFT = { x : -1, y : 0};
co.doubleduck.Grid.traceErrors = false;
co.doubleduck.MagicHaze._spritesheet = null;
co.doubleduck.Map.GRID_WIDTH = 8;
co.doubleduck.Map.GRID_HEIGHT = 10;
co.doubleduck.audio.WebAudioAPI._buffers = { };
co.doubleduck.SoundManager._muted = false;
co.doubleduck.SoundManager._cache = { };
co.doubleduck.SoundManager.audioPoolSize = 2;
co.doubleduck.SoundManager.available = co.doubleduck.SoundManager.isSoundAvailable();
co.doubleduck.Transition._allowInstantiation = false;
co.doubleduck.actors.Enemy._fireSpritesheet = null;
co.doubleduck.audio.AudioFX._muted = false;
co.doubleduck.audio.HowlerAudio._muted = false;
co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
co.doubleduck.ui.ContextMenu._container = new createjs.Container();
js.Lib.onerror = null;
co.doubleduck.Main.main();
