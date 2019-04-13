var mytools = {
	getBody: function(){
		return {
			width : document.documentElement.clientWidth || document.body.clientWidt,
			height : document.documentElement.clientHeight || document.body.clientHeight
		};
	},
	
	center: function(obj){
		obj.style.position = "absolute";
		var cWidth = this.getBody().width,
			cHeight = this.getBody().height;
		function change(){
			obj.style.left = (cWidth - obj.offsetWidth)/2 + "px";
			obj.style.top = (cHeight - obj.offsetHeight)/2 + "px";
		}
		change();
		window.onresize = change;
	},
	
	/*
	拖拽
	 */
	drag: function(obj,title){
		
		var maxWidth = this.getBody().width - obj.offsetWidth,
			maxHeight = this.getBody().height - obj.offsetHeight;
		var tit = document.querySelector(title) || obj;
		tit.onmousedown = (e) =>{
			e = e || window.event;
			var disX = e.offsetX;
			var disY = e.offsetY;
			document.onmousemove = function(e){
				e = e || window.event;
				var _left = e.clientX-disX,
					_top = e.clientY-disY;
				if(_left > maxWidth) _left = maxWidth;
				if(_left < 0) _left = 0;
				if(_top > maxHeight) _top = maxHeight;
				if(_top < 0) _top = 0;
				obj.style.left = _left+"px";
				obj.style.top = _top+"px";
			}.bind(this);
			e.preventDefault();
		}
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	},
	
	/* cookie的操作（存取）
	 * @param key   string  存取的Name值
	 * @param [value] string  如果传入value，那么就是存cookie，不传就是取cookie
	 * @param [option] object  {expires, path}
	 * @return  string 取cookie的时候返回的当前cookie的值
	 */
	cookie : function(key,value,option){
		if(value === undefined){
			//取cookie
			var cookie = document.cookie;
			var arr = cookie.split("; ");
			var obj = {};
			arr.forEach(function(ele){
				var subArr = ele.split("=");
				obj[subArr[0]] = decodeURIComponent(subArr[1]);
			});
			return obj[key] ? obj[key]:"";
		}else{
			//存cookie
			var str = key+"="+encodeURIComponent(value);
			if(option){
				if(option.path){
					str += ";path="+option.path;
				}
				if(option.expires){
					var date = new Date();
					date.setDate(date.getDate()+option.expires);
					str += ";expires="+date;
				}
				document.cookie = str;
			}
		}
	},
	
	/* ajax请求get
	 * @param url     string   请求的路径
	 * @param query   object   请求的参数query
	 * @param succCb  function 请求成功之后的回调
	 * @param failCb  function 请求失败的回调
	 * @param isJson  boolean  true： 解析json  false：文本请求  默认值true 
	 */
	ajaxGET : function(url,query,succCb,failCb,isJson){
		if(query){
			url += "?";
			for(key in query){
				url += key +"="+ query[key] + "&";
			}
			url = url.slice(0,-1);
		}
		//创建对象
		var ajax = new XMLHttpRequest();
	
		ajax.open("get",url,true);
		//get方法的参数已经在url里了，故不需要再发送参数信息
		ajax.send(null);
	
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status === 200){
					if(isJson === undefined){
						isJson = true;
					}
					var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
					succCb && succCb(res);
				}else{
					failCb && failCb();
				}
			}
		}
	},
	
	/* ajax请求post
	 * @param url     string   请求的路径
	 * @param query   object   请求的参数query
	 * @param succCb  function 请求成功之后的回调
	 * @param failCb  function 请求失败的回调
	 * @param isJson  boolean  true： 解析json  false：文本请求  默认值true 
	 */
	ajaxPost : function(url,query,succCb,failCb,isJson){
		var ajax = new XMLHttpRequest();
		
		ajax.open("POST",url,true);
		
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		
		var str = "";
		for(key in query){
			str += key + "=" + query[key] + "&";
		}
		str = str.slice(0,-1);
		ajax.send(str);
		ajax.onreadystatechange = function(){
			if(ajax.readyState === 4){
				if(ajax.status === 200){
					isJson = isJson === undefined ? true : isJson;
					succCb && succCb(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
				}else{
					failCb && failCb();
				}
			}
		}
	},
	
	/* jsonp ajax请求
	 * @param  url  string 请求路径
	 * @param  cb    string  全局函数名
	 * @param  query  object  请求参数
	 */
	ajaxJsonp : function(url,cb,query){
		var script =document.createElement("script");
		url += "?cb"+cb;
		if(query){
			for(key in query){
				url += "&"+key+"="+query[key];
			}
		}
		script.src = url;
		document.body.appendChild(script);
	}
}
