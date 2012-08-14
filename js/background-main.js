$(function () {

	//Поставить дефолтные значения при первом запуске
	var data;

	  if( ! localStorage['links'])
	  { 
		localStorage['links']= '{"files":[{"name":"jquery","link":"js/jquery-1.7.2.min.js"},{"name":"knockout","link":"js/knockout-2.1.0.js"}],"scripts":[{"name":"onliner for fun","link":"http://www.onliner.by/","action":"$(\'.top-search-input\').val(\'apple\');","fileItems":[{"name":"jquery","link":"js/jquery-1.7.2.min.js"}]}]}';
	  }
	  data = JSON.parse(localStorage['links']);

		if( ! localStorage['lang'])
		{
			//Получаем язык, используемый в браузере
			var lang = chrome.i18n.getMessage("@@ui_locale");
			if (lang == 'ru')
			{
				localStorage['lang'] = "en";
			}
			else
			{
				localStorage['lang'] = "en";
			}
	}
	
	function addFile(a)
	{
		chrome.tabs.executeScript(null, {file: a.link});
	}
	function addScript(a){
		for(var j in a.fileItems){
					addFile(a.fileItems[j]);
				}
				setTimeout(function(){chrome.tabs.executeScript(null,{code:a.action.toString()});},50);
	}
	chrome.webNavigation.onCompleted.addListener(function(details) {
		
		for(var i in data.scripts){
		var validUrl=details.url.match(new RegExp(data.scripts[i].link));
			if(validUrl!=null&&data.scripts[i].isEnable&&validUrl.length>0)
			{	
				addScript(data.scripts[i]);
			}
		}
	});
	//Добавляем listener, для приёма вызова со страницы опций, чтобы обновить время обновления цитат
	chrome.extension.onRequest.addListener(
			function(request, sender, sendResponse) {
				//Проверка, что данные пришли со страницы опций этого же плагина и параметр do равен update
				if (sender.tab.url == chrome.extension.getURL("options.html") && request.do == "update")
				{
					data = JSON.parse(localStorage['links']);
				}
			}
		);
});