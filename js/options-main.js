$(function () {
    var optionsData = { update: "", get: "", updateNames:""};

    optionsData.update = function (e) {
        localStorage['links'] = e;
		chrome.extension.sendRequest({do: "update"});
    };

    optionsData.get = function () {
        return localStorage['links'];
    };
	
	optionsData.updateNames=function(){
		$("#local_editor_nav").text(chrome.i18n.getMessage("editor_nav"));
		$("#local_export_nav").text(chrome.i18n.getMessage("export_nav"));
		$(".save").text(chrome.i18n.getMessage("save"));
		$(".name").attr("placeholder",chrome.i18n.getMessage("name"));
        $(".path").attr("placeholder",chrome.i18n.getMessage("path"));
		$(".add").text(chrome.i18n.getMessage("add"));
        $(".back").text(chrome.i18n.getMessage("back"));
		$(".delete").text(chrome.i18n.getMessage("delete"));
	    $(".edit").text(chrome.i18n.getMessage("edit"));
		$(".files").text(chrome.i18n.getMessage("files"));
		$("#local_add_script").text(chrome.i18n.getMessage("add_script"));
		$("#local_available_scripts").text(chrome.i18n.getMessage("available_scripts"));
		$("#local_js_code").text(chrome.i18n.getMessage("js_code"));
		$("#local_export_as_JSON").text(chrome.i18n.getMessage("export_as_JSON"));
		$("#local_import_as_JSON").text(chrome.i18n.getMessage("import_as_JSON"));
		$(".upload").text(chrome.i18n.getMessage("upload"));
		$("#local_overwrite_all_data").text(chrome.i18n.getMessage("overwrite_all_data"));
		$("#local_add_remove").text(chrome.i18n.getMessage("add_remove"));
		$(".lang").text(chrome.i18n.getMessage("language"));
		$("#local_setting").text(chrome.i18n.getMessage("setting"));
	};
	
	optionsData.updateNames();
    ko.applyBindings(new ScriptListViewModel(optionsData));
});